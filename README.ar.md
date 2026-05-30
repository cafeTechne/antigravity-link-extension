<div dir="rtl">

# Antigravity Link (إضافة VS Code)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**اقرأ بلغتك:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **الجديد في الإصدار v1.0.13** — إيقاف التوليد من الهاتف، خادم MCP + مواصفات OpenAPI، واجهة بـ ١٥ لغة، تحسينات رفع الملفات. راجع [CHANGELOG](CHANGELOG.md).

---

## المحتويات

- [عرض تجريبي](#عرض-تجريبي)
- [ما الذي ستحصل عليه](#ما-الذي-ستحصل-عليه)
- [التثبيت](#التثبيت)
- [المتطلبات الأساسية](#المتطلبات-الأساسية)
- [البدء السريع](#البدء-السريع)
- [الأوامر](#الأوامر)
- [الإعدادات](#الإعدادات)
- [لمطوري الوكلاء](#لمطوري-الوكلاء)
- [آلية العمل](#آلية-العمل-نظرة-عامة)
- [أمان الحساب](#أمان-الحساب)
- [استكشاف الأخطاء وإصلاحها](#استكشاف-الأخطاء-وإصلاحها)
- [الأسئلة الشائعة](#الأسئلة-الشائعة)
- [التدويل وإمكانية الوصول](#التدويل-وإمكانية-الوصول)
- [المساهمة](#المساهمة)
- [مرجع الـ API](#api)
- [مرجع خادم MCP](#خادم-mcp)

---

أنت تشغّل جلسة Antigravity وتحتاج إلى مغادرة مكتبك. يعمل الذكاء الاصطناعي في منتصف عملية التوليد. تريد مراقبته، وإعادة توجيهه، ورفع ملف، أو مجرد قراءة ما كتبه — من هاتفك، دون الحاجة إلى العودة إلى الحاسوب.

Antigravity Link يجعل ذلك ممكناً. امسح رمز QR ويصبح هاتفك مرآةً مباشرةً للمحادثة النشطة: اقرأ الردود أثناء بثّها، وأرسل الرسائل، وأوقف التوليد، وارفع الملفات، وأملِ عبر الصوت، وتنقّل بين عدة نوافذ Antigravity — كل ذلك من متصفح الهاتف، على شبكتك المحلية.

للأتمتة، توفّر الإضافة أيضاً HTTP API محلياً وخادم MCP ليتمكن الوكلاء والأدوات الخارجية من التحكم في جلسات Antigravity برمجياً.

## عرض تجريبي

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>لقطات الشاشة</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## ما الذي ستحصل عليه

- مرآة مباشرة للمحادثة النشطة في Antigravity — اقرأ وتفاعل من هاتفك.
- رفع الملفات إلى المحادثة النشطة في Antigravity.
- إدخال الصوت كنص من الهاتف (يتطلب HTTPS للحصول على أذونات الميكروفون).
- إيقاف التوليد من هاتفك بزر مخصص لذلك.
- التبديل بين النوافذ النشطة عند استخدام عدة نوافذ Antigravity.
- HTTP API محلي للأتمتة والتكاملات (راجع [API](#api)).
- خادم MCP لتكامل مساعدي الذكاء الاصطناعي (راجع [خادم MCP](#خادم-mcp)).
- خادم محلي فقط مع مصادقة بالرمز المميز.
- واجهة متاحة بـ ١٦ لغة مع اكتشاف تلقائي ودعم الكتابة من اليمين إلى اليسار.

## التثبيت

ثبّت من سوق إضافات Antigravity — ابحث عن **Antigravity Link** — أو [ثبّت مباشرةً من Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension).

## المتطلبات الأساسية

- **Antigravity IDE** مثبّت وقيد التشغيل.
- **هاتف وحاسوب على نفس شبكة Wi-Fi.**
- **إطلاق Antigravity مع خيار التصحيح عن بُعد.** هذا ضروري لكي تتمكن الإضافة من اكتشاف جلستك والاتصال بها. راجع أمر التشغيل في قسم البدء السريع أدناه.

## البدء السريع

١) شغّل Antigravity مع تفعيل التصحيح عن بُعد. هذا إلزامي؛ الجلسات التي تُشغَّل بدون هذا الخيار لن يتمكن الامتداد من اكتشافها.

**Windows** (اختصار Start Menu):
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

يُدعم تشغيل عدة جلسات Antigravity، لكن يجب إطلاق كل نافذة بهذا الأمر.

٢) في VS Code، نفّذ:
`Antigravity Link: Start Server`

٣) ثم نفّذ:
`Antigravity Link: Show QR Code`

٤) امسح رمز QR بهاتفك. الواجهة المحمولة جاهزة للاستخدام.

٥) قد يُحذّرك هاتفك من أن الاتصال غير آمن لأن الشهادة موقّعة ذاتياً. هذا أمر متوقع مع HTTPS المحلي. استخدم خيار «خيارات متقدمة» أو ما يماثله في متصفحك للمتابعة (تتفاوت الصياغة بين Safari وChrome وFirefox).

## الأوامر

| الأمر | الوصف |
| --- | --- |
| Antigravity Link: Start Server | يشغّل خادم الجسر المحلي. |
| Antigravity Link: Stop Server | يوقف الخادم. |
| Antigravity Link: Show QR Code | يعرض رمز QR للاتصال. |
| Antigravity Link: Select Network Interface | يختار واجهة الشبكة التي يُعلن عنها في رابط QR. |

## الإعدادات

| الإعداد | القيمة الافتراضية | الوصف |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | المنفذ لخادم الجسر المحلي. |
| `antigravityLink.autoStart` | `false` | تشغيل الخادم تلقائياً عند إطلاق VS Code. |
| `antigravityLink.useHttps` | `true` | التقديم عبر HTTPS للسماح بالوصول إلى الميكروفون. |
| `antigravityLink.preferredHost` | `""` | عنوان IPv4 اختياري للشبكة المحلية للإعلان عنه في رابط QR (مثال: `192.168.1.101`). |
| `antigravityLink.strictWorkbenchOnly` | `true` | الربط فقط بأهداف CDP الخاصة بـ `workbench.html` لضمان الاستقرار. |
| `antigravityLink.includeFallbackTargets` | `false` | السماح بالأهداف الاحتياطية jetski/launchpad عند تعطيل الوضع الصارم. |

## لمطوري الوكلاء

إذا كنت تريد التكامل بسرعة، استخدم هذا التسلسل:

١) شغّل خادم الإضافة وانسخ الرمز المميز من رابط QR (`?token=...`).
٢) استخدم أدوات MCP (`mcp-server.mjs`) أو استدعاءات HTTP مباشرة إلى `https://localhost:3000`.
٣) تحقق من تدفق التحكم عبر `/snapshot` و`/send` و`/stop`.

مثال OpenAPI:

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

مثال إعداد عميل MCP:

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

استبدل `<extension-dir>` بمسار الإضافة المثبّتة:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## آلية العمل (نظرة عامة)

- تشغّل الإضافة خادماً محلياً (HTTP أو HTTPS).
- تكتشف الإضافة أهداف Antigravity عبر Chrome DevTools Protocol (CDP).
- يتصل هاتفك بالواجهة المحمولة ويرسل طلبات الرفع والأوامر.
- تحقن الإضافة في هدف المحادثة المحدد وتحفظ الملفات في `uploads/`.

## أمان الحساب

لا تتضمن Antigravity Link أي حالات حظر معروفة، وهي مصمَّمة للحفاظ على ذلك.

تعمل الإضافة بالاتصال بمنفذ التصحيح الذي يفتحه Antigravity على جهازك — نفس Chrome DevTools Protocol الذي يستخدمه مصحح أخطاء VS Code المدمج وأدوات المطورين في المتصفح. تقرأ الإضافة واجهتك المحلية وتحاكي ضغطات المفاتيح والنقرات، تماماً كأنك جالس أمام لوحة مفاتيحك.

ما يعنيه ذلك عملياً:
- **لا تُرسَل أي طلبات إلى خوادم Google** بخلاف ما يرسله Antigravity أصلاً. لا تملك الإضافة وصولاً للشبكة خارج شبكتك المحلية.
- **لا يُحقن أي شيء في حركة مرور شبكة Antigravity.** تقرأ الإضافة شاشتك وتكتب في محررك — ولا تعترض مكالمات API أو تعدّلها.
- **لا يُعدَّل أي ملف من ملفات Antigravity.** لا توجد تصحيحات ولا خطافات ولا تعديلات ثنائية.
- **يعمل الخادم بالكامل على جهازك.** لا تغادر مطالباتك وسجل محادثاتك وملفاتك شبكتك المحلية إلا إذا أخضعت الخادم للوصول الخارجي بشكل صريح.
- **لا تُرسَل أي بيانات إلى خدمات خارجية** من قِبل هذه الإضافة.

الكود المصدري مرخَّص بـ MIT وقابل للمراجعة الكاملة: https://github.com/cafeTechne/antigravity-link-extension

## استكشاف الأخطاء وإصلاحها

- **لا توجد نوافذ مكتشفة**: تأكد من تشغيل كل نافذة Antigravity بخيار `--remote-debugging-port` الموضّح أعلاه.
- **تعذّر الاتصال من الهاتف**: تحقق من أن هاتفك وجهازك الحاسوبي على نفس الشبكة.
- **الملفات تُحفظ لكنها لا تظهر في المحادثة**: بدّل إلى Active Instance الصحيح في الواجهة المحمولة.
- **التوقف عند «جارٍ التهيئة…»**: الخادم قابل للوصول لكن سطح المحادثة لم يُلتقط بعد. انتظر بضع ثوانٍ حتى تكتمل تهيئة اتصال CDP.

## الأسئلة الشائعة

**هل يعمل على iOS وAndroid؟**
نعم. تعمل الواجهة المحمولة في أي متصفح حديث — Safari على iOS وChrome على Android وغيرهما.

**هل يعمل عبر الشبكة الخلوية أو VPN؟**
لا بشكل افتراضي — الخادم مخصص للشبكة المحلية فقط. للوصول عن بُعد تحتاج إلى تعريض الخادم عبر نفق مثل ngrok. تبقى مصادقة الرمز المميز وHTTPS سارية في جميع الأحوال.

**هل من الآمن قبول تحذير الشهادة الموقّعة ذاتياً؟**
نعم. تُولَّد الشهادة محلياً على جهازك عند بدء تشغيل الخادم. يظهر التحذير لأنها ليست صادرة عن جهة إصدار شهادات عامة، لا لأن الاتصال غير آمن.

**هل يمكنني استخدام هذا للأتمتة؟**
نعم. صُمِّم HTTP API المحلي وخادم MCP لهذا الغرض تحديداً. راجع قسمي [API](#api) و[خادم MCP](#خادم-mcp).

## التدويل وإمكانية الوصول

تكتشف الواجهة المحمولة لغة متصفحك تلقائياً وتعرض المحتوى بـ:

English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

تُعرض اللغة العربية من اليمين إلى اليسار تلقائياً. يستخدم اكتشاف اللغة `navigator.language` دون الحاجة إلى أي إعداد.

الواجهة مبنية بـ HTML دلالي وأدوار ARIA ومناطق `aria-live` لحالة الاتصال والتنقل بلوحة المفاتيح وتسميات متوافقة مع برامج قراءة الشاشة في كل أنحائها.

## المساهمة

طلبات السحب مرحّب بها. تحقق من قائمة TODO في قاعدة الكود أو افتح GitHub issue لمناقشة الأفكار قبل الشروع في تغييرات كبيرة.
راجع `CONTRIBUTING.md` للاطلاع على تعليمات الإعداد وملاحظات PR.

## الرخصة

MIT. راجع `LICENSE`.

---

## API

تُوفّر الإضافة HTTP API محلياً على `https://localhost:3000` (أو المنفذ الذي تُهيّئه). جميع نقاط النهاية ما عدا `/ping` تتطلب ترويسة `Authorization: Bearer <token>`. الرمز المميز هو القيمة التي تلي `?token=` في رابط رمز QR.

| الطريقة | نقطة النهاية | الوصف |
| --- | --- | --- |
| GET | `/ping` | فحص الصحة — يُعيد `pong`. لا يتطلب مصادقة. |
| GET | `/snapshot` | سطح المحادثة الحالي: HTML وCSS والوضع/النموذج و`isGenerating`. |
| GET | `/instances` | يسرد نوافذ Antigravity النشطة. |
| POST | `/instance` | تبديل النافذة النشطة. الجسم: `{ "targetId": "..." }` |
| POST | `/send` | إرسال رسالة. الجسم: `{ "message": "..." }` |
| POST | `/click` | النقر على عنصر في الواجهة. الجسم: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | إيقاف توليد الذكاء الاصطناعي. |
| POST | `/upload` | رفع ملف (multipart/form-data، اسم الحقل `file`). |
| GET | `/task` | قراءة وثيقة المهمة الحالية. |
| GET | `/walkthrough` | قراءة وثيقة الدليل الإرشادي الحالية. |
| GET | `/plan` | قراءة خطة التنفيذ الحالية. |

المخطط الكامل: [`openapi.yaml`](openapi.yaml)

## خادم MCP

تأتي Antigravity Link مزوّدةً بخادم MCP (Model Context Protocol) يتيح لمساعدي الذكاء الاصطناعي التحكم في جلسة Antigravity مباشرةً.

**الإعداد**

أضف ما يلي إلى إعدادات عميل MCP الخاص بك (مثلاً `claude_desktop_config.json`):

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

استبدل `<extension-dir>` بمسار الإضافة المثبّتة:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

الرمز المميز هو القيمة التي تلي `?token=` في رابط رمز QR. يجب أن يكون خادم الإضافة قيد التشغيل قبل اتصال عميل MCP.

**الأدوات المتاحة**

| الأداة | الوصف |
| --- | --- |
| `get_snapshot` | الحصول على حالة المحادثة الحالية والوضع والنموذج وحالة التوليد. |
| `send_message` | إرسال رسالة إلى المحادثة النشطة. |
| `stop_generation` | إلغاء توليد الذكاء الاصطناعي النشط. |
| `get_instances` | سرد نوافذ Antigravity المتاحة. |
| `switch_instance` | التبديل إلى نافذة Antigravity مختلفة. |
| `click_element` | النقر على عنصر في الواجهة عبر محدد أو نص أو إحداثيات. |
| `get_task` | قراءة وثيقة المهمة الحالية. |
| `get_walkthrough` | قراءة وثيقة الدليل الإرشادي الحالية. |
| `get_plan` | قراءة خطة التنفيذ الحالية. |

## مستقل مقابل أصول workspace

هذه الإضافة مكتفية بذاتها. تشحن مع أصول `public/` الخاصة بها وحقيبة `uploads/` ولا تتطلب بناء `npm run dev` الأصلي.

إذا كان *workspace* الخاص بك يحتوي على `public/` أو `uploads/`، ستُفضّل الإضافة تلك المسارات تلقائياً. هذا يسهّل تخصيص الواجهة المحمولة أو الاحتفاظ بالرفوعات في جذر مشروعك، لكنه يعني أيضاً أن السلوك قد يختلف بين workspaces.

---

## سجل النجوم

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## شكر وتقدير

مستوحى من مشاريع مجتمعية مبكرة تشمل:
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat

</div>
