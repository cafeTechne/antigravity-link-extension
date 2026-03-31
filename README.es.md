# Antigravity Link (Extensión de VS Code)

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Leer en tu idioma:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

Repositorio en GitHub: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

Lleva tus sesiones de Antigravity a tu teléfono. Sube archivos, dicta prompts, detén la generación y controla múltiples chats activos de Antigravity desde una interfaz adaptada para móviles — o automatízalos mediante MCP o la API HTTP local.

## Para quién es esto

- Equipos que quieren un compañero móvil sencillo y seguro para el IDE Antigravity de Google.
- Usuarios avanzados que desean subidas rápidas de archivos y voz a texto cuando están en movimiento.
- Desarrolladores que quieren automatizar o integrar sesiones de Antigravity mediante API o MCP.
- Desarrolladores nuevos que quieren interactuar con una sesión de Antigravity en curso sin ninguna configuración.

## Qué obtienes

- Espejo en vivo del chat de Antigravity activo — lee e interactúa desde tu teléfono.
- Subida de archivos al chat de Antigravity activo.
- Entrada de voz a texto desde el móvil (se requiere HTTPS para los permisos del micrófono).
- Detener la generación desde tu teléfono con un botón dedicado.
- Cambio de instancia activa para múltiples ventanas de Antigravity.
- API HTTP local para automatización e integraciones.
- Servidor MCP para la integración con asistentes de IA.
- Servidor solo local con autenticación por token.
- Interfaz disponible en 16 idiomas con detección automática y soporte RTL.

## Inicio rápido

1) Inicia Antigravity con la depuración remota habilitada. Esto es obligatorio; las sesiones iniciadas sin este parámetro no son detectables por la extensión.

Ejemplo (Windows):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) En VS Code, ejecuta: `Antigravity Link: Start Server`

3) Luego ejecuta: `Antigravity Link: Show QR Code`

4) Escanea el código QR con tu teléfono. La interfaz móvil está lista.

5) Tu teléfono puede advertir que la conexión no es segura porque el certificado es autofirmado. Esto es esperado para HTTPS local. Usa la opción «Avanzado» de tu navegador para continuar.

## Comandos

| Comando | Descripción |
| --- | --- |
| Antigravity Link: Start Server | Inicia el servidor puente local. |
| Antigravity Link: Stop Server | Detiene el servidor. |
| Antigravity Link: Show QR Code | Muestra el código QR de conexión. |
| Antigravity Link: Select Network Interface | Elige qué interfaz de red anuncia la URL del QR. |

## API

La extensión expone una API HTTP local en `https://localhost:3000`. Todos los endpoints excepto `/ping` requieren un encabezado `Authorization: Bearer <token>`.

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `/ping` | Verificación de estado. No requiere autenticación. |
| GET | `/snapshot` | Superficie de chat actual: HTML, CSS, modo/modelo, isGenerating. |
| GET | `/instances` | Lista las ventanas activas de Antigravity. |
| POST | `/instance` | Cambia la ventana activa. Cuerpo: `{ "targetId": "..." }` |
| POST | `/send` | Envía un mensaje. Cuerpo: `{ "message": "..." }` |
| POST | `/click` | Hace clic en un elemento de la interfaz. Cuerpo: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Detiene la generación de IA. |
| POST | `/upload` | Sube un archivo (multipart/form-data). |
| GET | `/task` | Lee el documento de tarea actual. |
| GET | `/walkthrough` | Lee el documento de guía paso a paso actual. |
| GET | `/plan` | Lee el plan de implementación actual. |

Esquema completo: [`openapi.yaml`](openapi.yaml)

## Servidor MCP

Añade a la configuración de tu cliente MCP:

```json
{
  "antigravity-link": {
    "command": "node",
    "args": ["/path/to/antigravity-link-extension/mcp-server.mjs"],
    "env": {
      "AG_BRIDGE_URL": "https://localhost:3000",
      "AG_BRIDGE_TOKEN": "<your-token>"
    }
  }
}
```

Herramientas disponibles: `get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## Seguridad y privacidad

- El servidor se ejecuta localmente y está autenticado con un token.
- HTTPS está habilitado por defecto para permitir el acceso al micrófono en dispositivos móviles.
- Esta extensión no envía ningún dato a servicios de terceros.

## Solución de problemas

- **No se encontraron instancias**: Asegúrate de que cada ventana de Antigravity se haya iniciado con `--remote-debugging-port`.
- **No se puede conectar desde el móvil**: Verifica que tu teléfono y tu computadora estén en la misma red.
- **Atascado en «Inicializando…»**: Espera unos segundos a que se inicialice la conexión CDP.

## Internacionalización y accesibilidad

La interfaz móvil detecta automáticamente el idioma de tu navegador y se muestra en:
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

El árabe se muestra de derecha a izquierda. La detección de idioma usa `navigator.language` sin ninguna configuración.

## Contribuir

Aceptamos pull requests y buscamos activamente colaboradores.
Consulta `CONTRIBUTING.md` para instrucciones de configuración y notas sobre PR.

## Licencia

MIT. Ver `LICENSE`.
