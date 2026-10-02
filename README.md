# Cuaca

Cuaca kota, langsung di browser. Cari nama kota atau pakai lokasimu, lalu lihat suhu, angin, dan prakiraan. Langit di halaman ikut berubah: cerah, mendung, hujan, badai, salju, atau kabut.

## Tampilan

![Tampilan aplikasi Cuaca](tampilan.png)

## Fitur

- Cuaca saat ini: suhu, terasa seperti, kelembapan, angin, hujan, UV, dan waktu matahari
- Cari kota di seluruh dunia
- Tombol lokasi untuk cuaca di tempatmu
- Prakiraan 24 jam dan 7 hari
- Langit bergerak mengikuti kondisi dan siang atau malam
- Kota terakhir diingat di browser

## Cara menjalankan

Buka `index.html` di browser. Butuh koneksi internet.

Kalau cuacanya tidak muncul, browser itu memblokir permintaan dari file yang dibuka langsung. Dari folder ini, jalankan `py -m http.server` lalu buka `http://localhost:8000`.

Data cuaca disediakan oleh [Open-Meteo](https://open-meteo.com/). Nama tempat dari tombol lokasi memakai BigDataCloud.
