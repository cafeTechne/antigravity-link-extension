import { WebSocket } from 'ws';

export interface CDPContext {
    id: number;
    name: string;
    origin: string;
}

export interface CDPConnection {
    id: string;
    ws: WebSocket;
    call: (method: string, params: Record<string, unknown>, sessionId?: string) => Promise<any>;
    contexts: CDPContext[];
    title?: string;
    url?: string;
}

export interface CDPTarget {
    description: string;
    devtoolsFrontendUrl: string;
    id: string;
    title: string;
    type: string;
    url: string;
    webSocketDebuggerUrl: string;
}

export interface CDPInfo {
    id: string;
    port: number;
    url: string;
    title: string;
}

export interface CDPResult {
    id: number;
    result?: {
        value?: any;
    };
    error?: {
        message: string;
    };
}

export interface InjectResult {
    ok: boolean;
    method?: string;
    reason?: string;
    target?: string;
}

export interface Snapshot {
    html: string;
    controlsHtml?: string;
    css: string;
    backgroundColor: string;
    color: string;
    fontFamily: string;
    themeClass: string;
    themeAttr: string;
    colorScheme: string;
    bodyBg: string;
    bodyColor: string;
    error?: unknown;
}

export interface ClickResult {
    success: boolean;
    method?: string;
    target?: string;
    error?: string;
    reason?: string;
}
