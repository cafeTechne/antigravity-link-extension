# Antigravity Link (расширение для VS Code)

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Читать на вашем языке:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

Репозиторий на GitHub: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

Перенесите свои сессии Antigravity на смартфон. Загружайте файлы, диктуйте промпты, останавливайте генерацию и управляйте несколькими активными чатами Antigravity через удобный мобильный интерфейс — или автоматизируйте их с помощью MCP или локального HTTP API.

## Для кого это расширение

- Команды, которым нужен простой и безопасный мобильный помощник для IDE Antigravity от Google.
- Опытные пользователи, желающие быстро загружать файлы и использовать голосовой ввод в любом месте.
- Разработчики, желающие автоматизировать или интегрировать сессии Antigravity через API или MCP.
- Начинающие разработчики, которым нужно взаимодействовать с запущенной сессией Antigravity без какой-либо настройки.

## Возможности

- Прямое отображение активного чата Antigravity — просматривайте и управляйте с телефона.
- Загрузка файлов в активный чат Antigravity.
- Голосовой ввод с мобильного устройства (для доступа к микрофону необходим HTTPS).
- Остановка генерации с телефона с помощью специальной кнопки.
- Переключение между активными экземплярами при нескольких окнах Antigravity.
- Локальный HTTP API для автоматизации и интеграций.
- MCP-сервер для интеграции с ИИ-ассистентами.
- Чисто локальный сервер с аутентификацией по токену.
- Интерфейс на 16 языках с автоопределением и поддержкой RTL.

## Быстрый старт

1) Запустите Antigravity с включённой удалённой отладкой. Это обязательное требование; сессии, запущенные без этого флага, расширение не обнаружит.

Пример (Windows):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) В VS Code выполните: `Antigravity Link: Start Server`

3) Затем выполните: `Antigravity Link: Show QR Code`

4) Отсканируйте QR-код смартфоном. Мобильный интерфейс готов к работе.

5) Смартфон может предупредить, что соединение небезопасно, поскольку сертификат самоподписанный. Это ожидаемо для локального HTTPS. Используйте параметр «Дополнительно» в браузере, чтобы продолжить.

## Команды

| Команда | Описание |
| --- | --- |
| Antigravity Link: Start Server | Запускает локальный сервер-мост. |
| Antigravity Link: Stop Server | Останавливает сервер. |
| Antigravity Link: Show QR Code | Отображает QR-код для подключения. |
| Antigravity Link: Select Network Interface | Выбор сетевого интерфейса, который будет указан в URL QR-кода. |

## API

Расширение предоставляет локальный HTTP API по адресу `https://localhost:3000`. Все эндпоинты, кроме `/ping`, требуют заголовка `Authorization: Bearer <token>`.

| Метод | Эндпоинт | Описание |
| --- | --- | --- |
| GET | `/ping` | Проверка работоспособности. Аутентификация не требуется. |
| GET | `/snapshot` | Текущий интерфейс чата: HTML, CSS, режим/модель, isGenerating. |
| GET | `/instances` | Список активных окон Antigravity. |
| POST | `/instance` | Переключение активного окна. Тело: `{ "targetId": "..." }` |
| POST | `/send` | Отправка сообщения. Тело: `{ "message": "..." }` |
| POST | `/click` | Клик по элементу интерфейса. Тело: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Остановка генерации ИИ. |
| POST | `/upload` | Загрузка файла (multipart/form-data). |
| GET | `/task` | Чтение текущего документа задачи. |
| GET | `/walkthrough` | Чтение текущего руководства. |
| GET | `/plan` | Чтение текущего плана реализации. |

Полная схема: [`openapi.yaml`](openapi.yaml)

## MCP-сервер

Добавьте в конфигурацию вашего MCP-клиента:

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

Доступные инструменты: `get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## Безопасность и конфиденциальность

- Сервер работает локально и защищён токеном аутентификации.
- HTTPS включён по умолчанию для доступа к микрофону с мобильных устройств.
- Расширение не отправляет данные сторонним сервисам.

## Устранение неполадок

- **Экземпляры не найдены**: убедитесь, что каждое окно Antigravity запущено с параметром `--remote-debugging-port`.
- **Не удаётся подключиться с мобильного**: убедитесь, что смартфон и компьютер находятся в одной сети.
- **Зависает на «Инициализация…»**: подождите несколько секунд, пока установится CDP-соединение.

## Интернационализация и доступность

Мобильный интерфейс автоматически определяет язык браузера и отображается на:
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

Арабский отображается справа налево. Определение языка использует `navigator.language` без какой-либо настройки.

## Участие в разработке

Мы принимаем pull request'ы и активно ищем участников.
Инструкции по настройке и требования к PR см. в файле `CONTRIBUTING.md`.

## Лицензия

MIT. См. `LICENSE`.
