<div dir="rtl">

# Antigravity Link (إضافة VS Code)

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**اقرأ بلغتك:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

مستودع GitHub: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

أحضر جلسات Antigravity إلى هاتفك. ارفع الملفات، وأملِ الأوامر النصية، وأوقف التوليد، وتحكم في محادثات Antigravity المتعددة النشطة عبر واجهة مناسبة للهاتف — أو أتمت كل ذلك عبر MCP أو HTTP API المحلي.

## لمن هذه الإضافة؟

- الفرق التي تريد رفيقاً محمولاً بسيطاً وآمناً لـ Antigravity IDE من Google.
- المستخدمون المتقدمون الذين يريدون رفع الملفات بسرعة واستخدام التعرف على الصوت في أي مكان.
- المطورون الذين يريدون أتمتة جلسات Antigravity أو دمجها عبر API أو MCP.
- المطورون الجدد الذين يريدون التفاعل مع جلسة Antigravity قيد التشغيل دون أي إعداد مسبق.

## ما الذي ستحصل عليه؟

- مرآة مباشرة للمحادثة النشطة في Antigravity — اقرأ وتفاعل من هاتفك.
- رفع الملفات إلى المحادثة النشطة في Antigravity.
- إدخال الصوت كنص من الهاتف (يتطلب HTTPS للحصول على أذونات الميكروفون).
- إيقاف التوليد من هاتفك بزر مخصص لذلك.
- التبديل بين النوافذ النشطة عند استخدام عدة نوافذ Antigravity.
- HTTP API محلي للأتمتة والتكاملات.
- خادم MCP لتكامل مساعدي الذكاء الاصطناعي.
- خادم محلي فقط مع مصادقة بالرمز المميز.
- واجهة متاحة بـ 16 لغة مع اكتشاف تلقائي ودعم الكتابة من اليمين إلى اليسار.

## البدء السريع

١) شغّل Antigravity مع تفعيل التصحيح عن بُعد. هذا إلزامي؛ الجلسات التي تُشغَّل بدون هذا الخيار لن يتمكن الامتداد من اكتشافها.

مثال (Windows):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

٢) في VS Code، نفّذ: `Antigravity Link: Start Server`

٣) ثم نفّذ: `Antigravity Link: Show QR Code`

٤) امسح رمز QR بهاتفك. الواجهة المحمولة جاهزة للاستخدام.

٥) قد يُحذّرك هاتفك من أن الاتصال غير آمن لأن الشهادة موقّعة ذاتياً. هذا أمر متوقع مع HTTPS المحلي. استخدم خيار «خيارات متقدمة» في متصفحك للمتابعة.

## الأوامر

| الأمر | الوصف |
| --- | --- |
| Antigravity Link: Start Server | يشغّل خادم الجسر المحلي. |
| Antigravity Link: Stop Server | يوقف الخادم. |
| Antigravity Link: Show QR Code | يعرض رمز QR للاتصال. |
| Antigravity Link: Select Network Interface | يختار واجهة الشبكة التي يُعلن عنها في رابط QR. |

## الـ API

تُوفّر الإضافة HTTP API محلياً على `https://localhost:3000`. جميع نقاط النهاية ما عدا `/ping` تتطلب ترويسة `Authorization: Bearer <token>`.

| الطريقة | نقطة النهاية | الوصف |
| --- | --- | --- |
| GET | `/ping` | فحص الصحة. لا يتطلب مصادقة. |
| GET | `/snapshot` | واجهة المحادثة الحالية: HTML وCSS والوضع/النموذج وisGenerating. |
| GET | `/instances` | يسرد نوافذ Antigravity النشطة. |
| POST | `/instance` | تبديل النافذة النشطة. الجسم: `{ "targetId": "..." }` |
| POST | `/send` | إرسال رسالة. الجسم: `{ "message": "..." }` |
| POST | `/click` | النقر على عنصر في الواجهة. الجسم: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | إيقاف توليد الذكاء الاصطناعي. |
| POST | `/upload` | رفع ملف (multipart/form-data). |
| GET | `/task` | قراءة وثيقة المهمة الحالية. |
| GET | `/walkthrough` | قراءة وثيقة الدليل الإرشادي الحالية. |
| GET | `/plan` | قراءة خطة التنفيذ الحالية. |

المخطط الكامل: [`openapi.yaml`](openapi.yaml)

## خادم MCP

أضف إلى إعدادات عميل MCP الخاص بك:

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

الأدوات المتاحة: `get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## الأمان والخصوصية

- يعمل الخادم محلياً ويُصادَق عليه بالرمز المميز.
- يكون HTTPS مفعّلاً افتراضياً للسماح بالوصول إلى الميكروفون على الأجهزة المحمولة.
- لا تُرسل هذه الإضافة أي بيانات إلى خدمات خارجية.

## استكشاف الأخطاء وإصلاحها

- **لا توجد نوافذ مكتشفة**: تأكد من تشغيل كل نافذة Antigravity بخيار `--remote-debugging-port`.
- **تعذّر الاتصال من الهاتف**: تحقق من أن هاتفك وجهازك الحاسوبي على نفس الشبكة.
- **التوقف عند «جارٍ التهيئة…»**: انتظر بضع ثوانٍ حتى تكتمل تهيئة اتصال CDP.

## التدويل وإمكانية الوصول

تكتشف الواجهة المحمولة لغة متصفحك تلقائياً وتعرض المحتوى بـ:
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

تُعرض اللغة العربية من اليمين إلى اليسار. يستخدم اكتشاف اللغة `navigator.language` دون الحاجة إلى أي إعداد.

## المساهمة

نقبل طلبات السحب (pull requests) ونبحث بنشاط عن مساهمين.
راجع `CONTRIBUTING.md` للاطلاع على تعليمات الإعداد وملاحظات PR.

## الرخصة

MIT. راجع `LICENSE`.

</div>
