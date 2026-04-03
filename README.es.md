
# Antigravity Link (Extensión VS Code)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Lee esto en tu idioma:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **Novedades de v1.0.13**: parada de generación desde dispositivos móviles, servidor MCP + especificación OpenAPI, interfaz de usuario en 15 idiomas, mejoras en la carga de archivos. Ver [CHANGELOG](CHANGELOG.md).

---

## Contenido

- [Manifestación](#manifestación)
- [lo que obtienes](#lo-que-obtienes)
- [Instalación](#instalación)
- [Requisitos previos](#requisitos-previos)
- [Inicio rápido](#inicio-rápido)
- [Comandos](#comandos)
- [Ajustes](#ajustes)
- [Para creadores de agentes](#para-creadores-de-agentes)
- [como funciona](#cómo-funciona-nivel-alto)
- [Seguridad de la cuenta](#seguridad-de-la-cuenta)
- [Solución de problemas](#solución-de-problemas)
- [Preguntas frecuentes](#preguntas-frecuentes)
- [Internacionalización y accesibilidad](#internacionalización-y-accesibilidad)
- [Contribuyendo](#contribuyendo)
- [Referencia API](#api)
- [Referencia del servidor MCP](#servidor-mcp)

---

Estás ejecutando una sesión Antigravity y necesitas alejarte de tu escritorio. La IA es de generación media. Quiere monitorearlo, redirigirlo, cargar un archivo o simplemente leer lo que escribió, desde su teléfono, sin tener que volver a su computadora.

Antigravity Link lo hace posible. Escanee un código QR y su teléfono se convierte en un espejo en vivo del chat activo: lea las respuestas a medida que se transmiten, envíe mensajes, detenga la generación, cargue archivos, dicte por voz y cambie entre múltiples ventanas Antigravity, todo desde un navegador móvil, en su red local.

Para la automatización, la extensión también expone una API HTTP local y un servidor MCP para que los agentes y las herramientas externas puedan controlar las sesiones de Antigravity mediante programación.

## Manifestación

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

zxqph0xz
<summary>Capturas de pantalla</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

zxqph0xz

## lo que obtienes

- Espejo en vivo del chat activo Antigravity: lea e interactúe desde su teléfono.
- Carga de archivos en el chat activo Antigravity.
- Entrada de voz a texto desde el móvil (se requiere HTTPS para permisos de micrófono).
- Detén la generación desde tu teléfono con un chip de parada dedicado.
- Cambio de instancia activa para múltiples ventanas Antigravity.
- API HTTP local para automatización e integraciones (ver [API](#api)).
- Servidor MCP para la integración del asistente de IA (ver [MCP server](#mcp-server)).
- Servidor solo local con autenticación de token.
- Interfaz disponible en 16 idiomas con detección automática y soporte RTL.

## Instalación

Instálelo desde el mercado de extensiones Antigravity (busque **Antigravity Link**) o [install directly from Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension).

## Requisitos previos

- **Antigravity IDE** instalado y ejecutándose.
- **Un teléfono y una computadora en la misma red Wi-Fi.**
- **Antigravity se inició con el indicador de depuración remota.** Esto es necesario para que la extensión descubra y se conecte a su sesión. Consulte el comando de inicio en Inicio rápido a continuación.

## Inicio rápido

1) Inicie Antigravity con la depuración remota habilitada. Esto es necesario; Las sesiones iniciadas sin este indicador no son detectables por la extensión.

**Windows** (atajo del menú Inicio):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

**macOS:**
```bash
open -a Antigravity --args --remote-debugging-port=9000
```

**Linux:**
```bash
antigravity --remote-debugging-port=9000
```

Se admiten varias sesiones de Antigravity, pero cada ventana debe iniciarse con este comando.

2) En VS Code, ejecute:
zxqph0xz

3) Luego ejecuta:
zxqph0xz

4) Escanea el código QR con tu teléfono. Su interfaz de usuario móvil está lista.

5) Es posible que su teléfono le advierta que la conexión no es segura porque el certificado está autofirmado. Esto es lo esperado para el HTTPS local. Utilice la opción "Avanzada" de su navegador o una opción similar para continuar (la redacción difiere entre Safari/Chrome/Firefox).

## Comandos

| Dominio | Descripción |
| --- | --- |
| zxqph0xz | Inicia el servidor puente local. |
| zxqph0xz | Detiene el servidor. |
| zxqph0xz | Muestra el código de conexión QR. |
| zxqph0xz | Elija qué interfaz de red anuncia la URL QR. |

## Ajustes

| Configuración | Por defecto | Descripción |
| --- | --- | --- |
| zxqph0xz | zxqph0xz | Puerto para el servidor puente local. |
| zxqph0xz | zxqph0xz | Inicie el servidor al iniciar VS Code. |
| zxqph0xz | zxqph0xz | Sirve a través de HTTPS para acceder al micrófono. |
| zxqph0xz | zxqph0xz | LAN IPv4 opcional para anunciar en la URL QR (ejemplo: `192.168.1.101`). |
| zxqph0xz | zxqph0xz | Solo vincúlese a objetivos `workbench.html` CDP para mayor estabilidad. |
| zxqph0xz | zxqph0xz | Permitir objetivos de reserva de jetski/launchpad cuando el modo estricto está deshabilitado. |

## Para creadores de agentes

Si desea integrarse rápidamente, utilice esta secuencia:

1) Inicie el servidor de extensión y copie el token de la URL QR (`?token=...`).
2) Utilice herramientas MCP (`mcp-server.mjs`) o llamadas HTTP directas contra `https://localhost:3000`.
3) Valide el flujo de control con `/snapshot`, `/send` y `/stop`.

Ejemplo de OpenAPI:

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

Ejemplo de configuración del cliente MCP:

```json
{
  "antigravity-link": {
    "command": "node",
    "args": ["<extension-dir>/mcp-server.mjs"],
    "env": {
      "AG_BRIDGE_URL": "https://localhost:3000",
      "AG_BRIDGE_TOKEN": "<token>"
    }
  }
}
```

Reemplace `<extension-dir>` con la ruta a la extensión instalada:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## Cómo funciona (nivel alto)

- La extensión inicia un servidor local (HTTP o HTTPS).
- Descubre objetivos Antigravity a través del protocolo Chrome DevTools (CDP).
- Su teléfono se conecta a la interfaz de usuario móvil y envía solicitudes de carga/comando.
- La extensión se inyecta en el objetivo de chat seleccionado y guarda archivos en `uploads/`.

## Seguridad de la cuenta

Antigravity Link no tiene casos de prohibición conocidos y está diseñado para permanecer así.

La extensión funciona conectándose a un puerto de depuración que Antigravity expone en su propia máquina: el mismo protocolo Chrome DevTools utilizado por el depurador integrado y las herramientas de desarrollo del navegador de VS Code. Lee su interfaz de usuario local y simula pulsaciones de teclas y clics, exactamente como si estuviera sentado frente a su teclado.

Qué significa esto en la práctica:
- **No se realizan solicitudes a los servidores de Google** más allá de las que ya envía Antigravity. La extensión no tiene acceso a la red fuera de su LAN.
- **No se inyecta nada en el tráfico de red de Antigravity.** La extensión lee su pantalla y escribe en su editor; no intercepta ni modifica las llamadas API.
- **No se modifican archivos Antigravity.** No hay parches, ganchos ni modificaciones binarias.
- **El servidor se ejecuta completamente en su máquina.** Sus mensajes, historial de chat y archivos nunca abandonan su red local a menos que exponga explícitamente el servidor externamente.
- **Esta extensión no envía datos a servicios de terceros**.

El código fuente tiene licencia MIT y es totalmente auditable: https://github.com/cafeTechne/antigravity-link-extension

## Solución de problemas

- **No se encontraron instancias**: asegúrese de que cada ventana de Antigravity se haya iniciado con el comando `--remote-debugging-port` que se muestra arriba.
- **No se puede conectar desde el móvil**: asegúrese de que su teléfono y computadora estén en la misma red.
- **Las cargas se guardan pero no aparecen en el chat**: cambie a la instancia activa correcta en la interfaz de usuario móvil.
- **Atascado en "Inicializando..."**: Se puede acceder al servidor pero aún no se ha capturado la superficie de chat. Espere unos segundos hasta que se inicialice la conexión CDP.

## Preguntas frecuentes

**¿Esto funciona en iOS y Android?**
Sí. La interfaz de usuario móvil se ejecuta en cualquier navegador móvil moderno: Safari en iOS, Chrome en Android y otros funcionan.

**¿Esto funciona a través de celular o VPN?**
No de forma predeterminada: el servidor es solo LAN. Para acceso remoto, deberá exponerlo a través de un túnel como ngrok. La autenticación del token y HTTPS permanecen vigentes independientemente.

**¿Es seguro aceptar la advertencia del certificado autofirmado?**
Sí. El certificado se genera localmente en su máquina al iniciar el servidor. La advertencia aparece porque no la emite una autoridad de certificación pública, no porque la conexión sea insegura.

**¿Puedo usar esto para automatización?**
Sí. La API HTTP local y el servidor MCP están diseñados exactamente para esto. Consulte las secciones [API](#api) y [MCP server](#mcp-server).

## Internacionalización y accesibilidad

La interfaz móvil detecta automáticamente el idioma de su navegador y se muestra en:

Inglés · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

El árabe se traduce automáticamente de derecha a izquierda. La detección de idioma utiliza `navigator.language` sin necesidad de configuración.

La interfaz está construida con HTML semántico, roles ARIA, regiones `aria-live` para el estado de la conexión, navegación con el teclado y etiquetas compatibles con lectores de pantalla.

## Contribuyendo

Las solicitudes de extracción son bienvenidas. Verifique los TODO en el código base o abra una edición de GitHub para discutir ideas antes de comenzar cambios importantes.
Consulte `CONTRIBUTING.md` para obtener notas de configuración y relaciones públicas.

---

## API

La extensión expone una API HTTP local en `https://localhost:3000` (o su puerto configurado). Todos los puntos finales excepto `/ping` requieren un encabezado `Authorization: Bearer <token>`. El token es el valor después de `?token=` en la URL del código QR.

| Método | Punto final | Descripción |
| --- | --- | --- |
| CONSEGUIR | zxqph0xz | Comprobación de estado: devuelve `pong`. No se requiere autenticación. |
| CONSEGUIR | zxqph0xz | Superficie de chat actual: HTML, CSS, modo/modelo, `isGenerating`. |
| CONSEGUIR | zxqph0xz | Lista de ventanas Antigravity activas. |
| CORREO | zxqph0xz | Cambiar ventana activa. Cuerpo: `{ "targetId": "..." }` |
| CORREO | zxqph0xz | Envía un mensaje. Cuerpo: `{ "message": "..." }` |
| CORREO | zxqph0xz | Haga clic en un elemento de la interfaz de usuario. Cuerpo: `{ "selector"?, "text"?, "x"?, "y"? }` |
| CORREO | zxqph0xz | Detener la generación de IA. |
| CORREO | zxqph0xz | Cargue un archivo (multipart/form-data, nombre de campo `file`). |
| CONSEGUIR | zxqph0xz | Lea el documento de tarea actual. |
| CONSEGUIR | zxqph0xz | Lea el documento tutorial actual. |
| CONSEGUIR | zxqph0xz | Lea el plan de implementación actual. |

Esquema completo: [`openapi.yaml`](openapi.yaml)

## Servidor MCP

Antigravity Link incluye un servidor MCP (Protocolo de contexto modelo) que permite a los asistentes de IA controlar su sesión Antigravity directamente.

**Configuración**

Agregue lo siguiente a la configuración de su cliente MCP (por ejemplo, `claude_desktop_config.json`):

```json
{
  "antigravity-link": {
    "command": "node",
    "args": ["<extension-dir>/mcp-server.mjs"],
    "env": {
      "AG_BRIDGE_URL": "https://localhost:3000",
      "AG_BRIDGE_TOKEN": "<your-token>"
    }
  }
}
```

Reemplace `<extension-dir>` con la ruta a la extensión instalada:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

El token es el valor después de `?token=` en la URL del código QR. El servidor de extensión debe estar ejecutándose antes de que se conecte el cliente MCP.

**Herramientas disponibles**

| Herramienta | Descripción |
| --- | --- |
| zxqph0xz | Obtenga el estado actual del chat, el modo, el modelo y el estado de generación. |
| zxqph0xz | Envía un mensaje al chat activo. |
| zxqph0xz | Cancelar la generación activa de IA. |
| zxqph0xz | Lista de ventanas Antigravity disponibles. |
| zxqph0xz | Cambie a una ventana Antigravity diferente. |
| zxqph0xz | Haga clic en un elemento de la interfaz de usuario mediante selector, texto o coordenadas. |
| zxqph0xz | Lea el documento de tarea actual. |
| zxqph0xz | Lea el documento tutorial actual. |
| zxqph0xz | Lea el plan de implementación actual. |

## Activos independientes frente a activos de espacio de trabajo

Esta extensión es autónoma. Incluye sus propios activos `public/` y carpeta `uploads/` y no requiere la compilación principal `npm run dev`.

Si su *espacio de trabajo* contiene `public/` o `uploads/`, la extensión preferirá esas rutas automáticamente. Esto facilita personalizar la interfaz de usuario móvil o mantener las cargas en la raíz de su proyecto, pero también significa que el comportamiento puede diferir entre espacios de trabajo.

---

## Historia de las estrellas

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## Expresiones de gratitud

Inspirado en los primeros proyectos comunitarios que incluyen:
- zxqph0xz
- zxqph0xz
- zxqph0xz
