# Media Database

Folder ini disiapkan untuk penyimpanan media saat aplikasi dipindahkan ke backend.

Pada versi web statis saat ini, file upload disimpan di IndexedDB browser
`skorkita-media-db`, object store `media`. Metadata setiap file:

- `id`
- `name`
- `category`
- `type`
- `size`
- `createdAt`
- `blob`

Kategori yang dipakai: `event-logo`, `team-logo`, `sponsor-logo`, dan
`background`.

## Desktop Offline

Versi Tauri membuat SQLite `skorkita.sqlite` di app data directory:

- macOS: `~/Library/Application Support/id.skorkita.scoreboard/`
- Windows: `%APPDATA%\id.skorkita.scoreboard\`

Migration versi 1 membuat:

- `app_state`: snapshot state terbaru beserta revision.
- `action_log`: revision dan sumber perubahan untuk audit sinkronisasi.
- `app_settings`: arsip pertandingan dan pengaturan aplikasi.
- `media_assets`: metadata file media yang disimpan pada folder app data.

Media tetap memakai IndexedDB WebView agar seluruh alur upload lama tetap
kompatibel. Migrasi blob media ke filesystem/database dapat dilakukan pada
versi berikutnya tanpa mengubah ID media yang tersimpan di state.
