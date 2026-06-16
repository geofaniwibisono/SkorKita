# SkorKita

Scoreboard web statis untuk sepak bola, futsal, basket, badminton, dan bola voli.
Aplikasi terdiri dari controller operator dan output scoreboard pada jendela terpisah.

Branch `scoreboard-app-offline` menambahkan aplikasi desktop Tauri tanpa
menghapus versi web statis yang sudah ada.

## Arsitektur

- `index.html`: controller dan match setup.
- `scoreboard.html`: output videotron/LED.
- `app.js`: state pertandingan, kontrol operator, history, ekspor, dan sinkronisasi.
- `scoreboard.js`: renderer output dan penerima realtime state.
- `styles.css`: UI controller bersama.
- `scoreboard.css`: template dan animasi output.
- `desktop-runtime.js`: adapter Tauri, role, SQLite, dan WebSocket/LAN.
- `desktop.css`: tampilan mode desktop dan pembatasan Field Control.
- `src-tauri`: backend desktop, database SQLite, pop-out Viewer, dan server LAN.
- `scripts/build_frontend.py`: menyalin aset web ke `dist` untuk packaging.

Tidak ada framework atau backend. State live disimpan pada `localStorage`
dengan key `skorkita-state`, sedangkan arsip pertandingan memakai
`skorkita-match-history`. Media upload disimpan sebagai Blob pada IndexedDB
`skorkita-media-db`. Sinkronisasi antarlayar menggunakan `postMessage` dan
event/polling storage.

Schema state versi 7 tetap menggabungkan data lama dengan nilai default baru,
sehingga pertandingan dari versi sebelumnya tetap dapat dibuka.

Pada aplikasi desktop, salinan state terbaru juga disimpan ke SQLite
`skorkita.sqlite` pada app data directory sistem. `localStorage` dan IndexedDB
tetap aktif sebagai fallback serta menjaga kompatibilitas versi web.

## Reliability

- Match clock memakai timestamp sehingga tetap akurat setelah tab tidak aktif,
  laptop sleep, atau controller direload.
- Input waktu manual hanya mengubah posisi clock; durasi periode tetap diatur
  melalui Match Setup atau pengaturan extra time.
- Sponsor, foul, dan pergantian menyimpan waktu berakhir sehingga overlay tidak
  tertinggal setelah reload.
- Counter substitusi bola voli terpisah dari team foul.
- Sinkronisasi browser memakai `postMessage` tervalidasi, `BroadcastChannel`,
  dan event storage tanpa polling 200 ms.
- Satu browser hanya mengizinkan satu tab controller aktif; tab controller lain
  otomatis menjadi mode pantau untuk mencegah state saling menimpa.
- Object URL media dibersihkan ketika tidak lagi dipakai atau halaman ditutup.
- Font menggunakan font lokal sistem sehingga controller dan Viewer tidak
  memerlukan akses Google Fonts.

## Mode Aplikasi

- **Administrator**: seluruh setup pertandingan, perangkat, visual, sponsor,
  running text, history, dan ekspor.
- **Field Control**: hanya skor, timer, periode, timeout, foul, dan buzzer.
- **Scoreboard Viewer**: output display-only tanpa tombol kontrol.
- **Single Operator**: kontrol penuh dengan tombol membuka Viewer sebagai
  jendela terpisah atau langsung fullscreen pada monitor kedua.

Administrator menampilkan alamat Field Control dan Viewer pada jaringan lokal.
Perangkat lain yang berada pada Wi-Fi/LAN yang sama dapat membuka alamat
tersebut tanpa internet.

## Menjalankan

Buka `index.html`, lalu tekan **Buka Scoreboard**. Untuk hasil lebih konsisten,
jalankan melalui server statis:

```bash
python3 -m http.server 8080
```

- Controller: `http://localhost:8080`
- Scoreboard: `http://localhost:8080/scoreboard.html`

### Desktop Development

Prerequisite:

- Node.js 20 atau lebih baru.
- Rust stable dan Cargo.
- Prerequisite Tauri 2 untuk sistem operasi terkait.

```bash
npm install
npm run dev
```

Perintah ini membangun aset statis ke `dist`, menjalankan backend Rust, membuka
Administrator, membuat SQLite lokal, dan menyalakan server LAN pada port `3847`.

Versi web lama tetap dapat dijalankan dengan:

```bash
npm run dev:web
```

Pemeriksaan JavaScript:

```bash
npm run check:js
```

Script pemeriksaan memakai Node.js sistem atau runtime Node bawaan Codex jika
tersedia.

### Build macOS

Build harus dijalankan pada macOS:

```bash
npm install
npm run build
```

Hasil `.app` dan `.dmg` berada di `src-tauri/target/release/bundle`.
Distribusi publik memerlukan Apple Developer signing dan notarization.

### Preview DMG Tanpa Toolchain Tauri

Untuk uji tampilan offline pada Mac Apple Silicon, tersedia pembungkus native
ringan yang memakai UI web yang sama:

```bash
python3 scripts/build_macos_preview.py
```

Hasil utamanya berada di:

```text
outputs/macos-preview/SkorKita-Offline-Preview-arm64.dmg
```

Jika layanan DiskImages macOS tidak tersedia pada environment build, skrip akan
membuat fallback yang tetap bisa dibuka Finder:

```text
outputs/macos-preview/SkorKita-Offline-Preview-arm64.app.zip
```

Buka DMG, tarik aplikasi ke folder **Applications**, lalu klik kanan dan pilih
**Open** pada pembukaan pertama jika macOS menampilkan peringatan pengembang.
Untuk fallback `.app.zip`, ekstrak zip terlebih dahulu, pindahkan aplikasi ke
**Applications**, lalu buka dengan cara yang sama. Build ini ditandatangani
secara ad-hoc untuk pengujian lokal dan belum dinotarisasi.

Preview DMG mendukung controller, penyimpanan browser offline, serta viewer
pop-out pada satu Mac. SQLite, pemantauan perangkat, dan sinkronisasi LAN
WebSocket tetap memerlukan build Tauri penuh.

### Build Windows

Build installer Windows harus dijalankan pada Windows dengan Microsoft C++
Build Tools dan WebView2:

```powershell
npm install
npm run build
```

Hasil installer MSI/NSIS berada di `src-tauri\target\release\bundle`.

## Realtime Lokal

- Backend Tauri membuka HTTP dan WebSocket pada `0.0.0.0:3847`.
- State dari Administrator atau Field Control disimpan ke SQLite lalu
  disiarkan ke seluruh Viewer.
- Viewer yang baru tersambung langsung menerima state terakhir.
- Daftar perangkat aktif dapat dipantau dari Administrator.
- LAN controller selalu dipaksa menjadi Field Control; Administrator hanya
  tersedia pada aplikasi desktop utama.

## Fitur MVP

- Match setup: event, olahraga, tim, logo, warna, durasi, dan format periode.
- Kontrol skor +1/+2/+3/-1, skor manual, undo, timer, period, timeout, dan foul.
- Buzzer realtime, pergantian pemain, review, foul event, dan running text.
- Event/sponsor logo, sponsor slide mode, high contrast, dan custom background.
- Template Modern Clean, Broadcast Sport, High Contrast LED, dan Retro Pixel.
- Output 16:9, 4:3, atau rasio LED custom.
- Preview visual draft dan publikasi melalui **Go Live**.
- Score history, status pertandingan, penyimpanan arsip, CSV, dan laporan cetak/PDF.
- Profil operator per cabang olahraga:
  - Sepak bola: gol, clock maju, VAR, kartu, pergantian IFAB, extra time, dan adu penalti.
  - Futsal: stop-clock, timeout per babak, akumulasi foul, rolling substitution,
    extra time, dan adu penalti.
  - Basket: 1/2/3 poin, timeout per paruh, team foul per kuarter, dan overtime.
  - Badminton: rally point/game, challenge, tanpa match clock atau pergantian.
  - Bola voli: rally point/set, timeout dan maksimal 6 pergantian reguler per set.
- Nama dan logo event memakai alur draft lalu **Apply**, sehingga tidak langsung
  mengubah layar penonton.
- Upload logo, foto, dan video maksimal 10 MB. File tersimpan di pustaka media
  browser dan dapat dipakai ulang atau dihapus dari menu asalnya.
- Folder `database/media` disiapkan sebagai struktur penyimpanan ketika aplikasi
  memakai backend; versi statis menggunakan IndexedDB agar browser dapat
  menyimpan file secara persisten.
- Sponsor memiliki tiga template animasi bertema olahraga dan otomatis tertutup
  setelah maksimal 4 detik tanpa countdown bar.
- Preview visual memakai kanvas virtual sesuai rasio output agar seluruh
  scoreboard terlihat tanpa cropping.
- Sepak bola dan futsal dapat menampilkan tambahan waktu normal Babak 1 dan 2
  sebagai clock `+MM:SS` yang terpisah dari extra time.

## Pengujian

1. Buka controller dan scoreboard berdampingan.
2. Isi match setup dan pastikan event, nama, logo, serta warna muncul di display.
3. Uji semua tombol skor, skor manual, lalu **Undo skor**.
4. Uji timer start/pause/reset, period, timeout, foul, dan buzzer.
5. Buka menu Visual, ganti template/layout/background. Pastikan perubahan hanya
   terlihat pada preview sebelum **Go Live**.
6. Aktifkan sponsor mode dan pastikan output berganti tanpa refresh.
7. Selesaikan dan simpan pertandingan, lalu ekspor CSV dan PDF.
8. Refresh kedua halaman dan pastikan state pertandingan tetap pulih.

## Keterbatasan

- Penyimpanan hanya berada pada browser/perangkat yang sama dan tidak cocok untuk
  sinkronisasi melalui jaringan antarkomputer.
- Ekspor PDF menggunakan dialog cetak browser; pilih **Save as PDF**.
- Audio buzzer dapat diblokir browser sampai layar display pernah menerima
  interaksi pengguna.
- Logo dan media besar dapat memenuhi kuota `localStorage`; background tidak
  disalin ke arsip pertandingan untuk mengurangi penggunaan ruang.
