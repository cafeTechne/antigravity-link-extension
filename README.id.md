# Antigravity Link (Ekstensi VS Code)

[![CI](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/cafeTechne/antigravity-link-extension/actions/workflows/ci.yml)
[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![npm version](https://img.shields.io/npm/v/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![npm downloads](https://img.shields.io/npm/dw/antigravity-link-extension)](https://www.npmjs.com/package/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Baca dalam bahasa Anda:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

> **Yang baru di v1.0.13** — Hentikan generasi dari ponsel, server MCP + spesifikasi OpenAPI, antarmuka 15 bahasa, peningkatan unggahan file. Lihat [CHANGELOG](CHANGELOG.md).

---

## Daftar Isi

- [Demo](#demo)
- [Yang Anda dapatkan](#yang-anda-dapatkan)
- [Instalasi](#instalasi)
- [Prasyarat](#prasyarat)
- [Mulai cepat](#mulai-cepat)
- [Perintah](#perintah)
- [Pengaturan](#pengaturan)
- [Untuk pembangun agen](#untuk-pembangun-agen)
- [Cara kerja](#cara-kerja-gambaran-umum)
- [Keamanan akun](#keamanan-akun)
- [Pemecahan masalah](#pemecahan-masalah)
- [FAQ](#faq)
- [Internasionalisasi dan aksesibilitas](#internasionalisasi-dan-aksesibilitas)
- [Berkontribusi](#berkontribusi)
- [Referensi API](#api)
- [Referensi server MCP](#server-mcp)

---

Anda sedang menjalankan sesi Antigravity dan perlu meninggalkan meja. AI sedang di tengah-tengah proses generasi. Anda ingin memantaunya, mengarahkannya kembali, mengunggah file, atau sekadar membaca apa yang ditulisnya — dari ponsel Anda, tanpa harus kembali ke komputer.

Antigravity Link membuat hal itu menjadi mungkin. Pindai kode QR dan ponsel Anda menjadi cermin langsung dari obrolan yang aktif: baca respons saat dialirkan, kirim pesan, hentikan generasi, unggah file, dikte melalui suara, dan beralih di antara beberapa jendela Antigravity — semuanya dari browser ponsel, di jaringan lokal Anda.

Untuk otomatisasi, ekstensi juga menyediakan HTTP API lokal dan server MCP agar agen dan alat eksternal dapat mengendalikan sesi Antigravity secara terprogram.

## Demo

https://github.com/user-attachments/assets/43c7d029-a598-474f-949e-5da333c9a3f2

<details>
<summary>Tangkapan layar</summary>

| | | |
| --- | --- | --- |
| ![Demo 1](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391120745-IMG_0857.png) | ![Demo 2](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391144709-IMG_0856.png) | ![Demo 3](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391155346-IMG_0855.png) |
| ![Demo 4](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391162186-IMG_0854.png) | ![Demo 5](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391172827-IMG_0853.png) | ![Demo 6](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391181215-IMG_0852.png) |
| ![Demo 7](https://raw.githubusercontent.com/cafeTechne/antigravity-link-extension/main/demo_photos/1769391189291-IMG_0851.png) | | |

</details>

## Yang Anda dapatkan

- Cerminan langsung dari obrolan Antigravity yang aktif — baca dan berinteraksi dari ponsel Anda.
- Unggah file ke dalam obrolan Antigravity yang aktif.
- Input suara ke teks dari ponsel (HTTPS diperlukan untuk izin mikrofon).
- Hentikan generasi dari ponsel Anda dengan tombol stop khusus.
- Pergantian instansi aktif untuk beberapa jendela Antigravity.
- HTTP API lokal untuk otomatisasi dan integrasi (lihat [API](#api)).
- Server MCP untuk integrasi asisten AI (lihat [Server MCP](#server-mcp)).
- Server hanya lokal dengan autentikasi token.
- Antarmuka tersedia dalam 16 bahasa dengan deteksi otomatis dan dukungan RTL.

## Instalasi

Instal dari marketplace ekstensi Antigravity — cari **Antigravity Link** — atau [instal langsung dari Open VSX](https://open-vsx.org/extension/cafetechne/antigravity-link-extension).

## Prasyarat

- **Antigravity IDE** sudah terinstal dan berjalan.
- **Ponsel dan komputer terhubung ke jaringan Wi-Fi yang sama.**
- **Antigravity diluncurkan dengan flag remote debugging.** Ini diperlukan agar ekstensi dapat menemukan dan terhubung ke sesi Anda. Lihat perintah peluncuran di bagian Mulai cepat di bawah.

## Mulai cepat

1) Jalankan Antigravity dengan remote debugging yang diaktifkan. Ini wajib; sesi yang dijalankan tanpa flag ini tidak dapat ditemukan oleh ekstensi.

**Windows** (pintasan Start Menu):
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

Beberapa sesi Antigravity didukung, tetapi setiap jendela harus diluncurkan dengan perintah ini.

2) Di VS Code, jalankan:
`Antigravity Link: Start Server`

3) Kemudian jalankan:
`Antigravity Link: Show QR Code`

4) Pindai kode QR dengan ponsel Anda. Antarmuka mobile sudah siap.

5) Ponsel Anda mungkin memberi peringatan bahwa koneksi tidak aman karena sertifikat bersifat self-signed. Ini wajar untuk HTTPS lokal. Gunakan opsi «Lanjutan» atau sejenisnya di browser Anda untuk melanjutkan (kata-katanya berbeda di Safari/Chrome/Firefox).

## Perintah

| Perintah | Deskripsi |
| --- | --- |
| Antigravity Link: Start Server | Memulai server bridge lokal. |
| Antigravity Link: Stop Server | Menghentikan server. |
| Antigravity Link: Show QR Code | Menampilkan kode QR koneksi. |
| Antigravity Link: Select Network Interface | Memilih antarmuka jaringan yang diiklankan di URL QR. |

## Pengaturan

| Pengaturan | Default | Deskripsi |
| --- | --- | --- |
| `antigravityLink.port` | `3000` | Port untuk server bridge lokal. |
| `antigravityLink.autoStart` | `false` | Mulai server saat VS Code diluncurkan. |
| `antigravityLink.useHttps` | `true` | Sajikan melalui HTTPS untuk akses mikrofon. |
| `antigravityLink.preferredHost` | `""` | IPv4 LAN opsional untuk diiklankan di URL QR (contoh: `192.168.1.101`). |
| `antigravityLink.strictWorkbenchOnly` | `true` | Hanya ikat ke target CDP `workbench.html` demi stabilitas. |
| `antigravityLink.includeFallbackTargets` | `false` | Izinkan target cadangan jetski/launchpad saat mode ketat dinonaktifkan. |

## Untuk pembangun agen

Jika ingin mengintegrasikan dengan cepat, gunakan urutan ini:

1) Mulai server ekstensi dan salin token dari URL QR (`?token=...`).
2) Gunakan alat MCP (`mcp-server.mjs`) atau panggilan HTTP langsung ke `https://localhost:3000`.
3) Validasi alur kontrol dengan `/snapshot`, `/send`, dan `/stop`.

Contoh OpenAPI:

```bash
curl -k https://localhost:3000/snapshot \
  -H "Authorization: Bearer <token>"
```

Contoh konfigurasi klien MCP:

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

Ganti `<extension-dir>` dengan path ke ekstensi yang terinstal:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

## Cara kerja (gambaran umum)

- Ekstensi memulai server lokal (HTTP atau HTTPS).
- Ekstensi menemukan target Antigravity melalui Chrome DevTools Protocol (CDP).
- Ponsel Anda terhubung ke antarmuka mobile dan mengirimkan permintaan unggah/perintah.
- Ekstensi menyuntikkan ke target obrolan yang dipilih dan menyimpan file ke `uploads/`.

## Keamanan akun

Antigravity Link tidak memiliki kasus ban yang diketahui dan dirancang untuk tetap demikian.

Ekstensi bekerja dengan terhubung ke port debug yang dibuka Antigravity di mesin Anda sendiri — Chrome DevTools Protocol yang sama digunakan oleh debugger bawaan VS Code dan browser devtools. Ekstensi membaca antarmuka lokal Anda dan mensimulasikan penekanan tombol dan klik, persis seperti jika Anda sedang duduk di depan keyboard.

Artinya dalam praktik:
- **Tidak ada permintaan yang dikirim ke server Google** di luar apa yang sudah dikirim Antigravity. Ekstensi tidak memiliki akses jaringan di luar LAN Anda.
- **Tidak ada yang disuntikkan ke lalu lintas jaringan Antigravity.** Ekstensi membaca layar Anda dan mengetik ke editor Anda — ekstensi tidak mencegat atau memodifikasi panggilan API.
- **Tidak ada file Antigravity yang dimodifikasi.** Tidak ada patch, hook, atau modifikasi biner.
- **Server berjalan sepenuhnya di mesin Anda.** Prompt, riwayat obrolan, dan file Anda tidak pernah meninggalkan jaringan lokal kecuali Anda sengaja mengekspos server ke luar.
- **Tidak ada data yang dikirim ke layanan pihak ketiga** oleh ekstensi ini.

Kode sumber berlisensi MIT dan dapat diaudit sepenuhnya: https://github.com/cafeTechne/antigravity-link-extension

## Pemecahan masalah

- **Tidak ada instansi yang ditemukan**: Pastikan setiap jendela Antigravity diluncurkan dengan perintah `--remote-debugging-port` yang ditunjukkan di atas.
- **Tidak dapat terhubung dari ponsel**: Pastikan ponsel dan komputer Anda berada di jaringan yang sama.
- **Unggahan tersimpan tetapi tidak muncul di obrolan**: Beralih ke Active Instance yang benar di antarmuka mobile.
- **Tertahan di "Menginisialisasi…"**: Server dapat dijangkau tetapi permukaan obrolan belum berhasil diambil. Tunggu beberapa detik agar koneksi CDP selesai diinisialisasi.

## FAQ

**Apakah ini berfungsi di iOS dan Android?**
Ya. Antarmuka mobile berjalan di browser mobile modern mana pun — Safari di iOS, Chrome di Android, dan browser lainnya semuanya berfungsi.

**Apakah ini berfungsi melalui jaringan seluler atau VPN?**
Tidak secara default — server hanya untuk LAN. Untuk akses jarak jauh, Anda perlu mengeksposnya melalui terowongan seperti ngrok. Autentikasi token dan HTTPS tetap berlaku.

**Apakah aman menerima peringatan sertifikat self-signed?**
Ya. Sertifikat dibuat secara lokal di mesin Anda saat server dimulai. Peringatan muncul karena sertifikat tidak diterbitkan oleh otoritas sertifikat publik, bukan karena koneksinya tidak aman.

**Bisakah saya menggunakan ini untuk otomatisasi?**
Ya. HTTP API lokal dan server MCP dirancang untuk tepat ini. Lihat bagian [API](#api) dan [Server MCP](#server-mcp).

## Internasionalisasi dan aksesibilitas

Antarmuka mobile secara otomatis mendeteksi bahasa browser Anda dan ditampilkan dalam:

English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

Bahasa Arab ditampilkan dari kanan ke kiri secara otomatis. Deteksi bahasa menggunakan `navigator.language` tanpa konfigurasi apa pun.

Antarmuka dibangun dengan HTML semantik, peran ARIA, wilayah `aria-live` untuk status koneksi, navigasi keyboard, dan label yang kompatibel dengan pembaca layar di seluruh bagian.

## Berkontribusi

Pull request disambut baik. Periksa TODO di codebase atau buka GitHub issue untuk mendiskusikan ide sebelum memulai perubahan besar.
Lihat `CONTRIBUTING.md` untuk panduan pengaturan dan catatan PR.

## Lisensi

MIT. Lihat `LICENSE`.

---

## API

Ekstensi mengekspos HTTP API lokal di `https://localhost:3000` (atau port yang Anda konfigurasi). Semua endpoint kecuali `/ping` memerlukan header `Authorization: Bearer <token>`. Token adalah nilai setelah `?token=` di URL kode QR.

| Metode | Endpoint | Deskripsi |
| --- | --- | --- |
| GET | `/ping` | Pemeriksaan kesehatan — mengembalikan `pong`. Tidak perlu autentikasi. |
| GET | `/snapshot` | Permukaan obrolan saat ini: HTML, CSS, mode/model, `isGenerating`. |
| GET | `/instances` | Daftar jendela Antigravity yang aktif. |
| POST | `/instance` | Ganti jendela aktif. Body: `{ "targetId": "..." }` |
| POST | `/send` | Kirim pesan. Body: `{ "message": "..." }` |
| POST | `/click` | Klik elemen UI. Body: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Hentikan generasi AI. |
| POST | `/upload` | Unggah file (multipart/form-data, nama field `file`). |
| GET | `/task` | Baca dokumen tugas saat ini. |
| GET | `/walkthrough` | Baca dokumen panduan langkah demi langkah saat ini. |
| GET | `/plan` | Baca rencana implementasi saat ini. |

Skema lengkap: [`openapi.yaml`](openapi.yaml)

## Server MCP

Antigravity Link dilengkapi dengan server MCP (Model Context Protocol) yang memungkinkan asisten AI mengendalikan sesi Antigravity Anda secara langsung.

**Pengaturan**

Tambahkan berikut ini ke konfigurasi klien MCP Anda (misalnya `claude_desktop_config.json`):

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

Ganti `<extension-dir>` dengan path ke ekstensi yang terinstal:
- **Windows:** `%USERPROFILE%\.antigravity\extensions\cafetechne.antigravity-link-extension-1.0.13`
- **macOS/Linux:** `~/.antigravity/extensions/cafetechne.antigravity-link-extension-1.0.13`

Token adalah nilai setelah `?token=` di URL kode QR. Server ekstensi harus berjalan sebelum klien MCP terhubung.

**Alat yang tersedia**

| Alat | Deskripsi |
| --- | --- |
| `get_snapshot` | Dapatkan status obrolan saat ini, mode, model, dan status generasi. |
| `send_message` | Kirim pesan ke obrolan yang aktif. |
| `stop_generation` | Batalkan generasi AI yang sedang aktif. |
| `get_instances` | Daftar jendela Antigravity yang tersedia. |
| `switch_instance` | Beralih ke jendela Antigravity yang berbeda. |
| `click_element` | Klik elemen UI berdasarkan selector, teks, atau koordinat. |
| `get_task` | Baca dokumen tugas saat ini. |
| `get_walkthrough` | Baca dokumen panduan langkah demi langkah saat ini. |
| `get_plan` | Baca rencana implementasi saat ini. |

## Mandiri vs aset workspace

Ekstensi ini bersifat mandiri. Ekstensi dilengkapi dengan aset `public/` sendiri dan folder `uploads/` serta tidak memerlukan build `npm run dev` dari induknya.

Jika *workspace* Anda berisi `public/` atau `uploads/`, ekstensi akan mengutamakan path tersebut secara otomatis. Ini memudahkan kustomisasi antarmuka mobile atau menyimpan unggahan di root proyek Anda, tetapi juga berarti perilaku dapat berbeda antar workspace.

---

## Riwayat bintang

[![Star History Chart](https://api.star-history.com/svg?repos=cafeTechne/antigravity-link-extension&type=Date&theme=dark)](https://star-history.com/#cafeTechne/antigravity-link-extension&Date)

## Penghargaan

Terinspirasi dari proyek komunitas awal termasuk:
- https://github.com/Mario4272/ag_bridge
- https://github.com/gherghett/Antigravity-Shit-Chat
- https://github.com/lukasz-wronski/Antigravity-Shit-Chat
