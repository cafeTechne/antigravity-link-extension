
# Antigravity Link (расширение VS Code)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Прочитайте это на своем языке:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **Что нового в версии 1.0.13** — прекращение генерации с мобильных устройств, сервер MCP + спецификация OpenAPI, 15-язычный интерфейс, улучшения в загрузке файлов. См. [CHANGELOG](CHANGELOG.md).

---

## Содержание

- [Демо](#демо)
- [Что вы получаете](#что-вы-получаете)
- [Установка](#установка)
- [Предварительные условия](#предварительные-условия)
- [Быстрый старт](#быстрый-старт)
- [Команды](#команды)
- [Настройки](#настройки)
- [Для агентов-строителей](#для-агентов-строителей)
- [Как это работает](#как-это-работает-высокий-уровень)
- [Безопасность аккаунта](#безопасность-аккаунта)
- [Поиск неисправностей](#поиск-неисправностей)
- [Часто задаваемые вопросы](#часто-задаваемые-вопросы)
- [Интернационализация и доступность](#интернационализация-и-доступность)
- [Содействие](#содействие)
- [Справочник по API](#api)
- [Ссылка на сервер MCP](#mcp-сервер)

---

Вы проводите сеанс Antigravity, и вам нужно отойти от стола. ИИ среднего поколения. Вы хотите отслеживать его, перенаправлять, загружать файл или просто читать написанное — со своего телефона, не возвращаясь к компьютеру.

Antigravity Link делает это возможным. Отсканируйте код QR, и ваш телефон станет живым зеркалом активного чата: читайте ответы в потоковом режиме, отправляйте сообщения, останавливайте генерацию, загружайте файлы, диктуйте голосом и переключайтесь между несколькими окнами Antigravity — и все это из мобильного браузера в вашей локальной сети.

Для автоматизации расширение также предоставляет локальный HTTP API и сервер MCP, чтобы агенты и внешние инструменты могли программно управлять сеансами Antigravity.

## Демо

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>Скриншоты</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## Что вы получаете

- Живое зеркало активного чата Antigravity — читайте и общайтесь со своего телефона.
- Загрузка файла в активный чат Antigravity.
- Преобразование голоса в текст с мобильного телефона (для разрешения микрофона требуется HTTPS).
- Остановите генерацию с вашего телефона с помощью специального чипа остановки.
- Активное переключение экземпляров для нескольких окон Antigravity.
- Локальный HTTP API для автоматизации и интеграции (см. [API](#api)).
- Сервер MCP для интеграции помощника искусственного интеллекта (см. [MCP server](#mcp-server)).
- Локальный сервер с аутентификацией по токену.
- Интерфейс доступен на 16 языках с автоматическим определением и поддержкой RTL.

## Установка

Установите из магазина расширений Antigravity — выполните поиск **Antigravity Link** — или [install directly from Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension).

## Предварительные условия

- **Antigravity IDE** установлена ​​и работает.
- **Телефон и компьютер в одной сети Wi-Fi.**
- **Antigravity запущен с флагом удаленной отладки.** Это необходимо, чтобы расширение обнаружило ваш сеанс и подключилось к нему. См. команду запуска в разделе «Быстрый запуск» ниже.

## Быстрый старт

1) Запустите Antigravity с включенной удаленной отладкой. Это необходимо; сеансы, запущенные без этого флага, не обнаруживаются расширением.

**Windows** (ярлык меню «Пуск»):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

**macOS:**
```bash
open -a Antigravity --args --remote-debugging-port=9000
```

**Линукс:**
```bash
antigravity --remote-debugging-port=9000
```

Поддерживаются несколько сеансов Antigravity, но каждое окно должно запускаться с помощью этой команды.

2) В VS Code запустите:
`Antigravity Link: Start Server`

3) Затем запустите:
`Antigravity Link: Show QR Code`

4) Отсканируйте код QR с помощью телефона. Ваш мобильный интерфейс готов.

5) Ваш телефон может предупредить, что соединение небезопасно, поскольку сертификат является самоподписанным. Это ожидается для локального HTTPS. Для продолжения используйте опцию «Дополнительно» или аналогичную опцию вашего браузера (в Safari/Chrome/Firefox формулировка различается).

## Команды

| Команда | Описание |
| --- | --- |
| Antigravity Link: Start Server | Запускает локальный сервер моста. |
| Antigravity Link: Stop Server | Останавливает сервер. |
| Antigravity Link: Show QR Code | Отображает код подключения QR. |
| Antigravity Link: Select Network Interface | Выберите, какой сетевой интерфейс рекламирует URL-адрес QR. |

## Настройки

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | Порт для локального сервера моста. |
| `antigravityLink.autoStart` | `false` | Запустите сервер при запуске VS Code. |
| `antigravityLink.useHttps` | `true` | Подавайте через HTTPS для доступа к микрофону. |
| `antigravityLink.preferredHost` | `""` | Дополнительный IPv4 локальной сети для рекламы по URL-адресу QR (пример: `192.168.1.101`). |
| `antigravityLink.strictWorkbenchOnly` | `true` | Для стабильности привязывайтесь только к целям `workbench.html` CDP. |
| `antigravityLink.includeFallbackTargets` | `false` | Разрешить резервные цели для гидроцикла/панели запуска, когда строгий режим отключен. |

## Для агентов-строителей

Если вы хотите быстро интегрироваться, используйте следующую последовательность:

1) Запустите сервер расширений и скопируйте токен из URL-адреса QR (`?token=...`).
2) Используйте либо инструменты MCP (`mcp-server.mjs`), либо прямые HTTP-вызовы к `https://localhost:3000`.
3) Проверьте поток управления с помощью `/snapshot`, `/send` и `/stop`.

Пример OpenAPI:

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

Пример конфигурации клиента MCP:

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

Замените `<extension-dir>` на путь к установленному расширению:
- **Окна:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## Как это работает (высокий уровень)

- Расширение запускает локальный сервер (HTTP или HTTPS).
- Он обнаруживает цели Antigravity через протокол Chrome DevTools (CDP).
- Ваш телефон подключается к мобильному пользовательскому интерфейсу и отправляет запросы на загрузку/команды.
- Расширение внедряется в выбранную цель чата и сохраняет файлы в `uploads/`.

## Безопасность аккаунта

У Antigravity Link нет известных случаев бана, и он таким и останется.

Расширение работает путем подключения к порту отладки, который Antigravity предоставляет на вашем компьютере — тот же протокол Chrome DevTools, который используется встроенным отладчиком VS Code и инструментами разработчика браузера. Он читает ваш локальный пользовательский интерфейс и имитирует нажатия клавиш и щелчки, точно так же, как если бы вы сидели за клавиатурой.

Что это означает на практике:
- **На серверы Google не поступают никакие запросы**, кроме тех, которые уже отправляет Antigravity. Расширение не имеет доступа к сети за пределами вашей локальной сети.
- **Ничего не вводится в сетевой трафик Antigravity.** Расширение читает ваш экран и вводит данные в редактор — оно не перехватывает и не изменяет вызовы API.
- **Файлы Antigravity не изменяются.** Никаких патчей, перехватчиков или двоичных модификаций нет.
- **Сервер полностью работает на вашем компьютере.** Ваши запросы, история чата и файлы никогда не покинут вашу локальную сеть, если только вы явно не предоставите доступ к серверу извне.
- **Это расширение не отправляет данные сторонним службам**.

Исходный код имеет лицензию MIT и полностью проверяемый: https://github.com/cafeTechne/antigravity-link-extension.

## Поиск неисправностей

- **Экземпляры не найдены**. Убедитесь, что каждое окно Antigravity запускалось с помощью команды `--remote-debugging-port`, показанной выше.
- **Невозможно подключиться с мобильного устройства**. Убедитесь, что ваш телефон и компьютер находятся в одной сети.
- **Загрузки сохраняются, но не отображаются в чате**: переключитесь на правильный активный экземпляр в мобильном интерфейсе.
- **Зависло на «Инициализации…»**: сервер доступен, но поверхность чата еще не захвачена. Подождите несколько секунд, пока соединение CDP инициализируется.

## Часто задаваемые вопросы

**Работает ли это на iOS и Android?**
Да. Мобильный пользовательский интерфейс работает в любом современном мобильном браузере: Safari на iOS, Chrome на Android и другие работают.

**Это работает через сотовую связь или через VPN?**
Не по умолчанию — сервер работает только в локальной сети. Для удаленного доступа вам необходимо открыть его через туннель, например ngrok. Аутентификация токена и HTTPS остаются в силе независимо от этого.

**Безопасно ли принимать предупреждение о самоподписанном сертификате?**
Да. Сертификат генерируется локально на вашем компьютере при запуске сервера. Предупреждение появляется потому, что оно не выдано общедоступным центром сертификации, а не потому, что соединение небезопасно.

**Могу ли я использовать это для автоматизации?**
Да. Локальный HTTP API и сервер MCP созданы именно для этого. См. разделы [API](#api) и [MCP server](#mcp-server).

## Интернационализация и доступность

Мобильный интерфейс автоматически определяет язык вашего браузера и отображает его на:

Английский · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · عربية

Арабский язык автоматически отображается справа налево. Для определения языка используется `navigator.language`, настройка не требуется.

Интерфейс построен с использованием семантического HTML, ролей ARIA, регионов `aria-live` для состояния соединения, навигации с помощью клавиатуры и меток, совместимых с программой чтения с экрана.

## Содействие

Запросы на вытягивание приветствуются. Прежде чем приступать к крупным изменениям, проверьте TODO в базе кода или откройте выпуск GitHub, чтобы обсудить идеи.
См. `CONTRIBUTING.md` для установки и примечаний к PR.

---

## API

Расширение предоставляет локальный HTTP API по адресу `https://localhost:3000` (или настроенный вами порт). Для всех конечных точек, кроме `/ping`, требуется заголовок `Authorization: Bearer <token>`. Токен — это значение после `?token=` в URL-адресе кода QR.

| Метод | Конечная точка | Описание |
| --- | --- | --- |
| ПОЛУЧАТЬ | `/ping` | Проверка работоспособности — возвращает `pong`. Никакой авторизации не требуется. |
| ПОЛУЧАТЬ | `/snapshot` | Текущая поверхность чата: HTML, CSS, режим/модель, `isGenerating`. |
| ПОЛУЧАТЬ | `/instances` | Вывести список активных окон Antigravity. |
| ПОЧТА | `/instance` | Переключить активное окно. Тело: `{ "targetId": "..." }` |
| ПОЧТА | `/send` | Отправьте сообщение. Тело: `{ "message": "..." }` |
| ПОЧТА | `/click` | Щелкните элемент пользовательского интерфейса. Тело: `{ "selector"?, "text"?, "x"?, "y"? }` |
| ПОЧТА | `/stop` | Остановить поколение ИИ. |
| ПОЧТА | `/upload` | Загрузите файл (multipart/form-data, имя поля `file`). |
| ПОЛУЧАТЬ | `/task` | Прочтите документ текущего задания. |
| ПОЛУЧАТЬ | `/walkthrough` | Прочтите текущий пошаговый документ. |
| ПОЛУЧАТЬ | `/plan` | Ознакомьтесь с текущим планом реализации. |

Полная схема: [`openapi.yaml`](openapi.yaml)

## MCP сервер

Antigravity Link поставляется с сервером MCP (Model Context Protocol), который позволяет помощникам искусственного интеллекта напрямую управлять вашим сеансом Antigravity.

**Настраивать**

Добавьте следующее в конфигурацию клиента MCP (например, `claude_desktop_config.json`):

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

Замените `<extension-dir>` на путь к установленному расширению:
- **Окна:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

Токен — это значение после `?token=` в URL-адресе кода QR. Сервер расширений должен быть запущен до подключения клиента MCP.

**Доступные инструменты**

| Инструмент | Описание |
| --- | --- |
| `get_snapshot` | Получите текущее состояние чата, режим, модель и статус генерации. |
| `send_message` | Отправьте сообщение в активный чат. |
| `stop_generation` | Отменить активную генерацию ИИ. |
| `get_instances` | Вывести список доступных окон Antigravity. |
| `switch_instance` | Переключитесь в другое окно Antigravity. |
| `click_element` | Щелкните элемент пользовательского интерфейса с помощью селектора, текста или координат. |
| `get_task` | Прочтите документ текущего задания. |
| `get_walkthrough` | Прочтите текущий пошаговый документ. |
| `get_plan` | Ознакомьтесь с текущим планом реализации. |

## Автономные и рабочие ресурсы

Это расширение является автономным. Он поставляется со своими собственными ресурсами `public/` и папкой `uploads/` и не требует родительской сборки `npm run dev`.

Если ваше *рабочее пространство* содержит `public/` или `uploads/`, расширение автоматически отдаст предпочтение этим путям. Это упрощает настройку мобильного пользовательского интерфейса или сохранение загрузок в корне вашего проекта, но это также означает, что поведение может различаться в разных рабочих областях.

---

## Звездная история

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## Благодарности

Вдохновлен ранними общественными проектами, в том числе:
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
