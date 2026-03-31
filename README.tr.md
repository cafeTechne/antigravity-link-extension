# Antigravity Link (VS Code Uzantısı)

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Kendi dilinizde okuyun:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

GitHub deposu: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

Antigravity oturumlarınızı telefonunuza taşıyın. Mobil dostu bir arayüz üzerinden dosya yükleyin, komut dikte edin, üretimi durdurun ve birden fazla aktif Antigravity sohbetini yönetin — ya da bunları MCP veya yerel HTTP API aracılığıyla otomatikleştirin.

## Bu kimler için?

- Google'ın Antigravity IDE'si için basit ve güvenli bir mobil yardımcı isteyen ekipler.
- Hareket halindeyken hızlı dosya yükleme ve sesli giriş kullanmak isteyen ileri düzey kullanıcılar.
- Antigravity oturumlarını API veya MCP aracılığıyla otomatikleştirmek ya da entegre etmek isteyen geliştiriciler.
- Çalışan bir Antigravity oturumuyla sıfır yapılandırmayla etkileşim kurmak isteyen yeni geliştiriciler.

## Neler sunuluyor?

- Aktif Antigravity sohbetinin canlı yansıması — telefonunuzdan okuyun ve kontrol edin.
- Aktif Antigravity sohbetine dosya yükleme.
- Mobil cihazdan sesli metin girişi (mikrofon izinleri için HTTPS gereklidir).
- Özel bir durdurma düğmesiyle telefonunuzdan üretimi durdurma.
- Birden fazla Antigravity penceresi için aktif örnek geçişi.
- Otomasyon ve entegrasyonlar için yerel HTTP API.
- Yapay zeka asistanı entegrasyonu için MCP sunucusu.
- Token kimlik doğrulamasıyla yalnızca yerel çalışan sunucu.
- Otomatik algılama ve RTL desteğiyle 16 dilde arayüz.

## Hızlı başlangıç

1) Antigravity'yi uzaktan hata ayıklama etkinleştirilmiş şekilde başlatın. Bu zorunludur; bu bayrak olmadan başlatılan oturumlar uzantı tarafından keşfedilemez.

Örnek (Windows):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) VS Code'da şunu çalıştırın: `Antigravity Link: Start Server`

3) Ardından şunu çalıştırın: `Antigravity Link: Show QR Code`

4) QR kodunu telefonunuzla tarayın. Mobil kullanıcı arayüzü hazır.

5) Sertifika kendinden imzalı olduğundan telefonunuz bağlantının güvensiz olduğu konusunda uyarı verebilir. Bu, yerel HTTPS için beklenen bir durumdur. Devam etmek için tarayıcınızın «Gelişmiş» seçeneğini kullanın.

## Komutlar

| Komut | Açıklama |
| --- | --- |
| Antigravity Link: Start Server | Yerel köprü sunucusunu başlatır. |
| Antigravity Link: Stop Server | Sunucuyu durdurur. |
| Antigravity Link: Show QR Code | Bağlantı QR kodunu görüntüler. |
| Antigravity Link: Select Network Interface | QR URL'sinin duyurduğu ağ arabirimini seçer. |

## API

Uzantı, `https://localhost:3000` adresinde yerel bir HTTP API sunar. `/ping` dışındaki tüm uç noktalar için `Authorization: Bearer <token>` başlığı gereklidir.

| Yöntem | Uç Nokta | Açıklama |
| --- | --- | --- |
| GET | `/ping` | Sağlık kontrolü. Kimlik doğrulama gerekmez. |
| GET | `/snapshot` | Mevcut sohbet yüzeyi: HTML, CSS, mod/model, isGenerating. |
| GET | `/instances` | Aktif Antigravity pencerelerini listeler. |
| POST | `/instance` | Aktif pencereyi değiştirir. Gövde: `{ "targetId": "..." }` |
| POST | `/send` | Mesaj gönderir. Gövde: `{ "message": "..." }` |
| POST | `/click` | Bir kullanıcı arayüzü öğesine tıklar. Gövde: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Yapay zeka üretimini durdurur. |
| POST | `/upload` | Dosya yükler (multipart/form-data). |
| GET | `/task` | Mevcut görev belgesini okur. |
| GET | `/walkthrough` | Mevcut kılavuzu okur. |
| GET | `/plan` | Mevcut uygulama planını okur. |

Tam şema: [`openapi.yaml`](openapi.yaml)

## MCP sunucusu

MCP istemci yapılandırmanıza ekleyin:

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

Kullanılabilir araçlar: `get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## Güvenlik ve gizlilik

- Sunucu yerel olarak çalışır ve bir token ile kimlik doğrulaması yapılır.
- Mobil cihazlarda mikrofon erişimine izin vermek için HTTPS varsayılan olarak etkindir.
- Bu uzantı, üçüncü taraf hizmetlere herhangi bir veri göndermez.

## Sorun giderme

- **Örnek bulunamadı**: Her Antigravity penceresinin `--remote-debugging-port` ile başlatıldığından emin olun.
- **Mobil cihazdan bağlanamıyorum**: Telefonunuz ve bilgisayarınızın aynı ağda olduğundan emin olun.
- **«Başlatılıyor…» ekranında takılı kalıyor**: CDP bağlantısının başlatılması için birkaç saniye bekleyin.

## Uluslararasılaştırma ve erişilebilirlik

Mobil arayüz, tarayıcı dilinizi otomatik olarak algılar ve şu dillerde görüntülenir:
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

Arapça sağdan sola görüntülenir. Dil algılama, herhangi bir yapılandırma gerektirmeden `navigator.language` kullanır.

## Katkıda bulunma

Pull request kabul ediyoruz ve aktif olarak katkıda bulunanlar arıyoruz.
Kurulum ve PR notları için `CONTRIBUTING.md` dosyasına bakın.

## Lisans

MIT. Bkz. `LICENSE`.
