# Antigravity Link (Ekstensi VS Code)

[![Open VSX Version](https://img.shields.io/open-vsx/v/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/cafetechne/antigravity-link-extension)](https://open-vsx.org/extension/cafetechne/antigravity-link-extension)
[![GitHub Stars](https://img.shields.io/github/stars/cafeTechne/antigravity-link-extension)](https://github.com/cafeTechne/antigravity-link-extension/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Baca dalam bahasa Anda:**
[日本語](README.ja.md) · [中文（简体）](README.zh-CN.md) · [中文（繁體）](README.zh-TW.md) · [한국어](README.ko.md) · [Deutsch](README.de.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português](README.pt.md) · [Русский](README.ru.md) · [Italiano](README.it.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [العربية](README.ar.md)

---

Repositori GitHub: https://github.com/cafeTechne/antigravity-link-extension

Open VSX: https://open-vsx.org/extension/cafetechne/antigravity-link-extension

Bawa sesi Antigravity Anda ke ponsel. Unggah file, dikte prompt, hentikan generasi, dan kendalikan beberapa obrolan Antigravity yang aktif dari antarmuka yang ramah ponsel — atau otomatiskan melalui MCP atau HTTP API lokal.

## Untuk siapa ini?

- Tim yang menginginkan pendamping mobile yang sederhana dan aman untuk IDE Antigravity dari Google.
- Pengguna tingkat lanjut yang ingin mengunggah file dengan cepat dan menggunakan suara ke teks saat bepergian.
- Pengembang yang ingin mengotomatiskan atau mengintegrasikan sesi Antigravity melalui API atau MCP.
- Pengembang baru yang ingin berinteraksi dengan sesi Antigravity yang sedang berjalan tanpa konfigurasi apa pun.

## Yang Anda dapatkan

- Cerminan langsung dari obrolan Antigravity yang aktif — baca dan berinteraksi dari ponsel Anda.
- Unggah file ke dalam obrolan Antigravity yang aktif.
- Input suara ke teks dari ponsel (HTTPS diperlukan untuk izin mikrofon).
- Hentikan generasi dari ponsel Anda dengan tombol stop khusus.
- Pergantian instansi aktif untuk beberapa jendela Antigravity.
- HTTP API lokal untuk otomatisasi dan integrasi.
- Server MCP untuk integrasi asisten AI.
- Server hanya lokal dengan autentikasi token.
- Antarmuka tersedia dalam 16 bahasa dengan deteksi otomatis dan dukungan RTL.

## Mulai cepat

1) Jalankan Antigravity dengan remote debugging yang diaktifkan. Ini wajib; sesi yang dijalankan tanpa flag ini tidak dapat ditemukan oleh ekstensi.

Contoh (Windows):
```powershell
& "C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Antigravity\Antigravity.lnk" --remote-debugging-port=9000
```

2) Di VS Code, jalankan: `Antigravity Link: Start Server`

3) Kemudian jalankan: `Antigravity Link: Show QR Code`

4) Pindai kode QR dengan ponsel Anda. Antarmuka mobile sudah siap.

5) Ponsel Anda mungkin memberi peringatan bahwa koneksi tidak aman karena sertifikat bersifat self-signed. Ini wajar untuk HTTPS lokal. Gunakan opsi «Lanjutan» di browser Anda untuk melanjutkan.

## Perintah

| Perintah | Deskripsi |
| --- | --- |
| Antigravity Link: Start Server | Memulai server bridge lokal. |
| Antigravity Link: Stop Server | Menghentikan server. |
| Antigravity Link: Show QR Code | Menampilkan kode QR koneksi. |
| Antigravity Link: Select Network Interface | Memilih antarmuka jaringan yang diiklankan di URL QR. |

## API

Ekstensi mengekspos HTTP API lokal di `https://localhost:3000`. Semua endpoint kecuali `/ping` memerlukan header `Authorization: Bearer <token>`.

| Metode | Endpoint | Deskripsi |
| --- | --- | --- |
| GET | `/ping` | Pemeriksaan kesehatan. Tidak perlu autentikasi. |
| GET | `/snapshot` | Tampilan obrolan saat ini: HTML, CSS, mode/model, isGenerating. |
| GET | `/instances` | Daftar jendela Antigravity yang aktif. |
| POST | `/instance` | Ganti jendela aktif. Body: `{ "targetId": "..." }` |
| POST | `/send` | Kirim pesan. Body: `{ "message": "..." }` |
| POST | `/click` | Klik elemen UI. Body: `{ "selector"?, "text"?, "x"?, "y"? }` |
| POST | `/stop` | Hentikan generasi AI. |
| POST | `/upload` | Unggah file (multipart/form-data). |
| GET | `/task` | Baca dokumen tugas saat ini. |
| GET | `/walkthrough` | Baca dokumen panduan langkah demi langkah saat ini. |
| GET | `/plan` | Baca rencana implementasi saat ini. |

Skema lengkap: [`openapi.yaml`](openapi.yaml)

## Server MCP

Tambahkan ke konfigurasi klien MCP Anda:

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

Alat yang tersedia: `get_snapshot`, `send_message`, `stop_generation`, `get_instances`, `switch_instance`, `click_element`, `get_task`, `get_walkthrough`, `get_plan`

## Keamanan dan privasi

- Server berjalan secara lokal dan diautentikasi dengan token.
- HTTPS diaktifkan secara default untuk mengizinkan akses mikrofon di ponsel.
- Ekstensi ini tidak mengirim data ke layanan pihak ketiga.

## Pemecahan masalah

- **Tidak ada instansi yang ditemukan**: pastikan setiap jendela Antigravity dijalankan dengan `--remote-debugging-port`.
- **Tidak dapat terhubung dari ponsel**: pastikan ponsel dan komputer berada di jaringan yang sama.
- **Tertahan di "Menginisialisasi…"**: tunggu beberapa detik agar koneksi CDP selesai diinisialisasi.

## Internasionalisasi dan aksesibilitas

Antarmuka mobile secara otomatis mendeteksi bahasa browser Anda dan ditampilkan dalam:
English · 日本語 · 中文（简体）· 中文（繁體）· 한국어 · Deutsch · Français · Español · Português · Русский · Italiano · Polski · Türkçe · Tiếng Việt · Bahasa Indonesia · العربية

Bahasa Arab ditampilkan dari kanan ke kiri. Deteksi bahasa menggunakan `navigator.language` tanpa konfigurasi apa pun.

## Berkontribusi

Kami menerima pull request dan aktif mencari kontributor.
Lihat `CONTRIBUTING.md` untuk panduan pengaturan dan catatan PR.

## Lisensi

MIT. Lihat `LICENSE`.
