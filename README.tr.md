
# Antigravity Link (VS Code Uzantısı)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Bunu kendi dilinizde okuyun:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **v1.0.13'teki yenilikler** — Mobil cihazdan oluşturmayı durdurma, MCP sunucusu + OpenAPI spesifikasyonu, 15 dilli kullanıcı arayüzü, dosya yükleme iyileştirmeleri. Bkz. [CHANGELOG](CHANGELOG.md).

---

## İçindekiler

- [Demo](#demo)
- [Ne elde edeceksin](#ne-elde-edeceksin)
- [Kurulum](#kurulum)
- [Önkoşullar](#önkoşullar)
- [Hızlı başlangıç](#hızlı-başlangıç)
- [Komutlar](#komutlar)
- [Ayarlar](#ayarlar)
- [Temsilci inşaatçılar için](#temsilci-inşaatçılar-için)
- [Nasıl çalışır?](#nasıl-çalışır-yüksek-seviye)
- [Hesap güvenliği](#hesap-güvenliği)
- [Sorun giderme](#sorun-giderme)
- [SSS](#sss)
- [Uluslararasılaştırma ve erişilebilirlik](#uluslararasılaştırma-ve-erişilebilirlik)
- [Katkıda Bulunmak](#katkıda-bulunmak)
- [API referansı](#apisi)
- [MCP sunucu referansı](#mcp-sunucusu)

---

Bir Antigravity oturumu yürütüyorsunuz ve masanızdan uzaklaşmanız gerekiyor. Yapay zeka orta nesildir. Bilgisayarınıza geri dönmeden telefonunuzdan onu izlemek, yeniden yönlendirmek, bir dosya yüklemek veya sadece yazdıklarını okumak istiyorsunuz.

Antigravity Link bunu mümkün kılıyor. Bir QR kodunu tarayın ve telefonunuz aktif sohbetin canlı bir aynası haline gelir: yanıtları akış halinde okuyun, mesaj gönderin, oluşturmayı durdurun, dosya yükleyin, sesle dikte edin ve birden fazla Antigravity penceresi arasında geçiş yapın; bunların tümü yerel ağınızdaki bir mobil tarayıcıdan yapılabilir.

Otomasyon için uzantı aynı zamanda yerel bir HTTP API'yi ve bir MCP sunucusunu kullanıma sunar, böylece aracılar ve harici araçlar Antigravity oturumlarını programlı olarak yönlendirebilir.

## Demo

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>Ekran görüntüleri</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## Ne elde edeceksin

- Aktif Antigravity sohbetinin canlı aynası — telefonunuzdan okuyun ve etkileşim kurun.
- Etkin Antigravity sohbetine dosya yükleme.
- Mobil cihazdan sesten metne giriş (mikrofon izinleri için HTTPS gereklidir).
- Özel bir durdurma çipi ile telefonunuzdan üretime son verin.
- Birden çok Antigravity penceresi için etkin örnek değiştirme.
- Otomasyon ve entegrasyonlar için yerel HTTP API'si (bkz. [API](#api)).
- Yapay zeka asistanı entegrasyonu için MCP sunucusu (bkz. [MCP server](#mcp-server)).
- Belirteç kimlik doğrulamasına sahip yalnızca yerel sunucu.
- Otomatik algılama ve RTL desteğiyle 16 dilde arayüz mevcuttur.

## Kurulum

Antigravity uzantı pazarından yükleyin — **Antigravity Link** veya [install directly from Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension) arayın.

## Önkoşullar

- **Antigravity IDE** kurulu ve çalışıyor.
- **Aynı Wi-Fi ağına bağlı bir telefon ve bilgisayar.**
- **Antigravity uzaktan hata ayıklama bayrağıyla başlatıldı.** Uzantının oturumunuzu keşfedip ona bağlanması için bu gereklidir. Aşağıdaki Hızlı başlangıç ​​bölümündeki başlatma komutuna bakın.

## Hızlı başlangıç

1) Uzaktan hata ayıklama etkinken Antigravity'yi başlatın. Bu gereklidir; bu işaret olmadan başlatılan oturumlar uzantı tarafından keşfedilemez.

**Windows** (Başlat Menüsü kısayolu):
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

Birden fazla Antigravity oturumu desteklenir ancak her pencerenin bu komutla başlatılması gerekir.

2) VS Code'de şunu çalıştırın:
`Antigravity Link: Start Server`

3) Sonra çalıştırın:
`Antigravity Link: Show QR Code`

4) QR kodunu telefonunuzla tarayın. Mobil kullanıcı arayüzünüz hazır.

5) Sertifika kendinden imzalı olduğundan telefonunuz bağlantının güvenli olmadığı konusunda uyarı verebilir. Bu yerel HTTPS için bekleniyor. Devam etmek için tarayıcınızın "Gelişmiş" veya benzer seçeneğini kullanın (ifadeler Safari/Chrome/Firefox arasında farklılık gösterir).

## Komutlar

| Emretmek | Tanım |
| --- | --- |
| Antigravity Link: Start Server | Yerel köprü sunucusunu başlatır. |
| Antigravity Link: Stop Server | Sunucuyu durdurur. |
| Antigravity Link: Show QR Code | Bağlantı QR kodunu görüntüler. |
| Antigravity Link: Select Network Interface | QR URL'sinin hangi ağ arayüzünü tanıtacağını seçin. |

## Ayarlar

| Ayar | Varsayılan | Tanım |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | Yerel köprü sunucusunun bağlantı noktası. |
| `antigravityLink.autoStart` | `false` | Sunucuyu VS Code açılışında başlatın. |
| `antigravityLink.useHttps` | `true` | Mikrofon erişimi için HTTPS üzerinden servis yapın. |
| `antigravityLink.preferredHost` | `""` | QR URL'sinde reklam vermek için isteğe bağlı LAN IPv4 (örnek: `192.168.1.101`). |
| `antigravityLink.strictWorkbenchOnly` | `true` | Kararlılık için yalnızca `workbench.html` CDP hedeflerine bağlanın. |
| `antigravityLink.includeFallbackTargets` | `false` | Katı mod devre dışı bırakıldığında jetski/launchpad geri dönüş hedeflerine izin ver. |

## Temsilci inşaatçılar için

Hızlı bir şekilde entegre olmak istiyorsanız şu sırayı kullanın:

1) Uzantı sunucusunu başlatın ve belirteci QR URL'sinden (`?token=...`) kopyalayın.
2) MCP araçlarını (`mcp-server.mjs`) veya `https://localhost:3000`'ye karşı doğrudan HTTP çağrılarını kullanın.
3) `/snapshot`, `/send` ve `/stop` ile kontrol akışını doğrulayın.

OpenAPI örneği:

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

MCP istemci yapılandırma örneği:

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

`<extension-dir>`'yi kurulu uzantının yolu ile değiştirin:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## Nasıl çalışır (yüksek seviye)

- Uzantı yerel bir sunucuyu (HTTP veya HTTPS) başlatır.
- Antigravity hedeflerini Chrome DevTools Protokolü (CDP) aracılığıyla keşfeder.
- Telefonunuz mobil kullanıcı arayüzüne bağlanır ve yükleme/komut istekleri gönderir.
- Uzantı seçilen sohbet hedefine enjekte edilir ve dosyaları `uploads/`'ye kaydeder.

## Hesap güvenliği

Antigravity Link'nin bilinen bir yasaklama durumu yoktur ve bu şekilde kalacak şekilde tasarlanmıştır.

Uzantı, Antigravity'nin kendi makinenizde gösterdiği bir hata ayıklama bağlantı noktasına bağlanarak çalışır; bu, VS Code'nin yerleşik hata ayıklayıcısı ve tarayıcı geliştirme araçları tarafından kullanılan Chrome DevTools Protokolünün aynısıdır. Yerel kullanıcı arayüzünüzü okur ve sanki klavyenizin başında oturuyormuşsunuz gibi tuşlara basma ve tıklama işlemlerini simüle eder.

Bunun pratikte anlamı:
- **Google'ın sunucularına Antigravity'nin zaten gönderdiğinin ötesinde hiçbir istek yapılmaz. Uzantının LAN'ınız dışında ağ erişimi yoktur.
- **Antigravity'nin ağ trafiğine hiçbir şey eklenmez.** Uzantı, ekranınızı okur ve düzenleyicinize yazar; API çağrılarını engellemez veya değiştirmez.
- **Hiçbir Antigravity dosyası değiştirilmez.** Herhangi bir yama, kanca veya ikili değişiklik yoktur.
- **Sunucu tamamen makinenizde çalışır.** Sunucuyu açıkça harici olarak kullanıma sunmadığınız sürece istemleriniz, sohbet geçmişiniz ve dosyalarınız asla yerel ağınızdan ayrılmaz.
- **Bu uzantı tarafından üçüncü taraf hizmetlerine hiçbir veri gönderilmez**.

Kaynak kodu MIT lisanslıdır ve tamamen denetlenebilir: https://github.com/cafeTechne/antigravity-link-extension

## Sorun giderme

- **Örnek bulunamadı**: Her Antigravity penceresinin yukarıda gösterilen `--remote-debugging-port` komutuyla başlatıldığından emin olun.
- **Cep telefonundan bağlanılamıyor**: Telefonunuzun ve bilgisayarınızın aynı ağda olduğundan emin olun.
- **Yüklemeler kaydediliyor ancak sohbette görünmüyor**: Mobil kullanıcı arayüzünde doğru Etkin Örneğe geçin.
- **"Başlatılıyor…" aşamasında takıldınız**: Sunucuya ulaşılabilir ancak sohbet yüzeyi henüz yakalanmadı. CDP bağlantısının başlatılması için birkaç saniye bekleyin.

## SSS

**Bu iOS ve Android'de çalışıyor mu?**
Evet. Mobil kullanıcı arayüzü herhangi bir modern mobil tarayıcıda çalışır; iOS'ta Safari, Android'de Chrome ve diğerleri çalışır.

**Bu, hücresel veya VPN üzerinden çalışıyor mu?**
Varsayılan olarak değil; sunucu yalnızca LAN'dır. Uzaktan erişim için onu ngrok gibi bir tünel aracılığıyla açığa çıkarmanız gerekir. Belirteç kimlik doğrulaması ve HTTPS ne olursa olsun yerinde kalır.

**Kendinden imzalı sertifika uyarısının kabul edilmesi güvenli midir?**
Evet. Sertifika, sunucu başlangıcında makinenizde yerel olarak oluşturulur. Uyarı, bağlantının güvenli olmaması nedeniyle değil, genel sertifika yetkilisi tarafından verilmediği için görüntülenir.

**Bunu otomasyon için kullanabilir miyim?**
Evet. Yerel HTTP API ve MCP sunucusu tam olarak bunun için tasarlanmıştır. [API](#api) ve [MCP server](#mcp-server) bölümlerine bakın.

## Uluslararasılaştırma ve erişilebilirlik

Mobil arayüz, tarayıcınızın dilini otomatik olarak algılar ve şu dillerde oluşturulur:

İngilizce · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

Arapça otomatik olarak sağdan sola dönüştürülür. Dil algılama, hiçbir yapılandırma gerektirmeden `navigator.language` kullanır.

Arayüz anlamsal HTML, ARIA rolleri, bağlantı durumu için `aria-live` bölgeleri, klavyede gezinme ve ekran okuyucuyla uyumlu etiketlerle oluşturulmuştur.

## Katkıda Bulunmak

Çekme istekleri kabul edilir. Büyük değişikliklere başlamadan önce fikirleri tartışmak için kod tabanındaki YAPILACAKLAR'ı kontrol edin veya bir GitHub konusu açın.
Kurulum ve PR notları için `CONTRIBUTING.md`'ye bakın.

---

## API'si

Uzantı, `https://localhost:3000`'de (veya yapılandırılmış bağlantı noktanızda) yerel bir HTTP API'sini kullanıma sunar. `/ping` dışındaki tüm uç noktalar bir `Authorization: Bearer <token>` başlığı gerektirir. Belirteç, QR kod URL'sindeki `?token=`'den sonraki değerdir.

| Yöntem | Uç nokta | Tanım |
| --- | --- | --- |
| ELDE ETMEK | `/ping` | Durum kontrolü — `pong` değerini döndürür. Kimlik doğrulama gerekmez. |
| ELDE ETMEK | `/snapshot` | Mevcut sohbet yüzeyi: HTML, CSS, mod/model, `isGenerating`. |
| ELDE ETMEK | `/instances` | Etkin Antigravity pencerelerini listeleyin. |
| POSTALAMAK | `/instance` | Etkin pencereyi değiştir. Gövde: `{ "targetId": "..." }` |
| POSTALAMAK | `/send` | Bir mesaj gönderin. Gövde: `{ "message": "..." }` |
| POSTALAMAK | `/click` | Bir kullanıcı arayüzü öğesine tıklayın. Gövde: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POSTALAMAK | `/stop` | Yapay zeka üretimini durdurun. |
| POSTALAMAK | `/upload` | Bir dosya yükleyin (çok parçalı/form-veri, alan adı `file`). |
| ELDE ETMEK | `/task` | Mevcut görev belgesini okuyun. |
| ELDE ETMEK | `/walkthrough` | Mevcut izlenecek yol belgesini okuyun. |
| ELDE ETMEK | `/plan` | Mevcut uygulama planını okuyun. |

Tam şema: [`openapi.yaml`](openapi.yaml)

## MCP sunucusu

Antigravity Link, yapay zeka asistanlarının Antigravity oturumunuzu doğrudan yönlendirmesine olanak tanıyan bir MCP (Model Bağlam Protokolü) sunucusu sunar.

**Kurmak**

Aşağıdakileri MCP istemci yapılandırmanıza ekleyin (örn. `claude_desktop_config.json`):

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

`<extension-dir>`'yi kurulu uzantının yolu ile değiştirin:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

Belirteç, QR kod URL'sindeki `?token=`'den sonraki değerdir. MCP istemcisi bağlanmadan önce uzantı sunucusunun çalışıyor olması gerekir.

**Mevcut araçlar**

| Alet | Tanım |
| --- | --- |
| `get_snapshot` | Mevcut sohbet durumunu, modunu, modelini ve oluşturma durumunu alın. |
| `send_message` | Aktif sohbete bir mesaj gönderin. |
| `stop_generation` | Etkin AI oluşturma işlemini iptal edin. |
| `get_instances` | Kullanılabilir Antigravity pencerelerini listeleyin. |
| `switch_instance` | Farklı bir Antigravity penceresine geçin. |
| `click_element` | Seçiciye, metne veya koordinatlara göre bir kullanıcı arayüzü öğesine tıklayın. |
| `get_task` | Mevcut görev belgesini okuyun. |
| `get_walkthrough` | Mevcut izlenecek yol belgesini okuyun. |
| `get_plan` | Mevcut uygulama planını okuyun. |

## Bağımsız ve çalışma alanı varlıkları

Bu uzantı bağımsızdır. Kendi `public/` varlıklarını ve `uploads/` klasörünü gönderir ve ana `npm run dev` yapısını gerektirmez.

*Çalışma alanınız* `public/` veya `uploads/` içeriyorsa uzantı bu yolları otomatik olarak tercih edecektir. Bu, mobil kullanıcı arayüzünü özelleştirmenizi veya yüklemeleri proje kökünüzde tutmanızı kolaylaştırır, ancak aynı zamanda davranışların çalışma alanları arasında farklılık gösterebileceği anlamına da gelir.

---

## Yıldız geçmişi

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## Teşekkür

Aşağıdakiler de dahil olmak üzere ilk topluluk projelerinden ilham alınmıştır:
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
