#!/usr/bin/env node
/**
 * Antigravity Link — MCP Server
 *
 * Exposes the Antigravity Link extension's local HTTP API as Model Context
 * Protocol tools so AI assistants (Claude, etc.) can drive Antigravity sessions.
 *
 * Usage:
 *   AG_BRIDGE_URL=https://localhost:3000 AG_BRIDGE_TOKEN=<token> node mcp-server.mjs
 *
 * Or add to your MCP client config (e.g. claude_desktop_config.json):
 *   {
 *     "antigravity-link": {
 *       "command": "node",
 *       "args": ["/path/to/antigravity-link-extension/mcp-server.mjs"],
 *       "env": {
 *         "AG_BRIDGE_URL": "https://localhost:3000",
 *         "AG_BRIDGE_TOKEN": "<your-token>"
 *       }
 *     }
 *   }
 *
 * The token is the value after `?token=` in the QR code URL shown by
 * "Antigravity Link: Show QR Code".
 */

import readline from 'readline';
import https from 'https';

const BASE_URL = (process.env.AG_BRIDGE_URL || 'https://127.0.0.1:3000').replace(/\/$/, '');
const TOKEN = process.env.AG_BRIDGE_TOKEN || '';

// Ignore self-signed certificate errors for the local HTTPS server.
const agent = new https.Agent({ rejectUnauthorized: false });

async function api(path, method = 'GET', body = null) {
  const url = `${BASE_URL}${path}`;
  const headers = { 'Content-Type': 'application/json' };
  if (TOKEN) headers['Authorization'] = `Bearer ${TOKEN}`;

  const opts = { method, headers };
  if (url.startsWith('https://')) opts.agent = agent;
  if (body !== null) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${JSON.stringify(data)}`);
  return data;
}

// ── Tool definitions ────────────────────────────────────────────────────────

const TOOLS = [
  {
    name: 'get_snapshot',
    description:
      'Get the current state of the active Antigravity chat session. Returns rendered HTML, ' +
      'active mode/model, whether the AI is generating, and available controls (stop, task, walkthrough).',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'send_message',
    description: 'Send a text message to the active Antigravity chat session.',
    inputSchema: {
      type: 'object',
      required: ['message'],
      properties: {
        message: { type: 'string', description: 'The message text to send.' }
      }
    }
  },
  {
    name: 'stop_generation',
    description:
      'Stop the AI generation currently in progress. Uses Language Server RPC and a ' +
      'direct DOM click on the cancel button for reliability.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'get_instances',
    description:
      'List all running Antigravity windows available for connection. ' +
      'Each window must have been launched with --remote-debugging-port.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'switch_instance',
    description: 'Switch the active connection to a different Antigravity window.',
    inputSchema: {
      type: 'object',
      required: ['targetId'],
      properties: {
        targetId: {
          type: 'string',
          description: 'The CDP target ID from get_instances.'
        }
      }
    }
  },
  {
    name: 'click_element',
    description:
      'Click a UI element in the active Antigravity window. Identify the element by ' +
      'CSS selector, visible text, or approximate coordinates.',
    inputSchema: {
      type: 'object',
      properties: {
        selector: { type: 'string', description: 'CSS selector for the element.' },
        text: { type: 'string', description: 'Visible text content to match.' },
        tag: { type: 'string', description: 'HTML tag name (e.g. "button").' },
        x: { type: 'number', description: 'Approximate X coordinate.' },
        y: { type: 'number', description: 'Approximate Y coordinate.' }
      }
    }
  },
  {
    name: 'get_task',
    description: 'Read the current task document from the Antigravity brain directory.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'get_walkthrough',
    description: 'Read the current walkthrough document from the Antigravity brain directory.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'get_plan',
    description: 'Read the current implementation plan from the Antigravity brain directory.',
    inputSchema: { type: 'object', properties: {} }
  }
];

// ── Tool handlers ───────────────────────────────────────────────────────────

async function callTool(name, input) {
  switch (name) {
    case 'get_snapshot':
      return api('/snapshot');

    case 'send_message':
      if (!input.message) throw new Error('"message" is required');
      return api('/send', 'POST', { message: input.message });

    case 'stop_generation':
      return api('/stop', 'POST');

    case 'get_instances':
      return api('/instances');

    case 'switch_instance':
      if (!input.targetId) throw new Error('"targetId" is required');
      return api('/instance', 'POST', { targetId: input.targetId });

    case 'click_element': {
      const body = {};
      if (input.selector) body.selector = input.selector;
      if (input.text) body.text = input.text;
      if (input.tag) body.tag = input.tag;
      if (input.x !== undefined) body.x = input.x;
      if (input.y !== undefined) body.y = input.y;
      return api('/click', 'POST', body);
    }

    case 'get_task':
      return api('/task');

    case 'get_walkthrough':
      return api('/walkthrough');

    case 'get_plan':
      return api('/plan');

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ── MCP JSON-RPC handler ────────────────────────────────────────────────────

async function handleRequest(msg) {
  const id = msg.id ?? null;
  try {
    if (msg.method === 'initialize') {
      return {
        jsonrpc: '2.0', id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'antigravity-link', version: '1.0.13' }
        }
      };
    }

    if (msg.method === 'tools/list') {
      return { jsonrpc: '2.0', id, result: { tools: TOOLS } };
    }

    if (msg.method === 'tools/call') {
      const name = msg.params?.name;
      const input = msg.params?.arguments || {};
      const result = await callTool(name, input);
      return {
        jsonrpc: '2.0', id,
        result: { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] }
      };
    }

    if (msg.method === 'notifications/initialized') {
      return null; // no response for notifications
    }

    return {
      jsonrpc: '2.0', id,
      error: { code: -32601, message: `Method not found: ${msg.method}` }
    };
  } catch (e) {
    return {
      jsonrpc: '2.0', id,
      error: { code: -32000, message: String(e.message || e) }
    };
  }
}

// ── Stdio transport ─────────────────────────────────────────────────────────

const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on('line', async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let msg;
  try {
    msg = JSON.parse(trimmed);
  } catch {
    process.stdout.write(JSON.stringify({
      jsonrpc: '2.0', id: null,
      error: { code: -32700, message: 'Parse error' }
    }) + '\n');
    return;
  }
  const resp = await handleRequest(msg);
  if (resp !== null) {
    process.stdout.write(JSON.stringify(resp) + '\n');
  }
});
