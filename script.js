const JAKARTA = {
    name: "Jakarta",
    admin1: "DKI Jakarta",
    country: "Indonesia",
    country_code: "ID",
    latitude: -6.2146,
    longitude: 106.8451,
};

const SIMPAN = "cuaca.tempat";

const ARAH = ["Utara", "Timur laut", "Timur", "Tenggara", "Selatan", "Barat daya", "Barat", "Barat laut"];

const NAMA = {
    0: "Cerah",
    1: "Cerah",
    2: "Berawan sebagian",
    3: "Mendung",
    45: "Berkabut",
    48: "Kabut beku",
    51: "Gerimis ringan",
    53: "Gerimis",
    55: "Gerimis lebat",
    56: "Gerimis beku",
    57: "Gerimis beku lebat",
    61: "Hujan ringan",
    63: "Hujan",
    65: "Hujan lebat",
    66: "Hujan beku",
    67: "Hujan beku lebat",
    71: "Salju ringan",
    73: "Salju",
    75: "Salju lebat",
    77: "Butiran salju",
    80: "Hujan sebentar",
    81: "Hujan sedang",
    82: "Hujan deras",
    85: "Salju sebentar",
    86: "Salju lebat",
    95: "Badai petir",
    96: "Badai petir dan hujan es",
    99: "Badai petir dan hujan es lebat",
};

const TEMA = {
    "cerah-siang": "#0c4eae",
    "cerah-malam": "#070b16",
    "berawan-siang": "#2d4154",
    "berawan-malam": "#10151d",
    "hujan-siang": "#0e1a28",
    "hujan-malam": "#0e1a28",
    "badai-siang": "#09090f",
    "badai-malam": "#09090f",
    "salju-siang": "#c5d6e8",
    "salju-malam": "#121820",
    "kabut-siang": "#b7c0c8",
    "kabut-malam": "#171b21",
};

const el = {
    formulir: document.getElementById("formulir"),
    kolom: document.getElementById("kolom"),
    saran: document.getElementById("saran"),
    lokasi: document.getElementById("lokasi"),
    panggung: document.getElementById("panggung"),
    kota: document.getElementById("kota"),
    wilayah: document.getElementById("wilayah"),
    tanggal: document.getElementById("tanggal"),
    pemisah: document.getElementById("pemisah"),
    jam: document.getElementById("jam"),
    ikon: document.getElementById("ikon"),
    angka: document.getElementById("angka"),
    kondisi: document.getElementById("kondisi"),
    ringkas: document.getElementById("ringkas"),
    pembaca: document.getElementById("pembaca"),
    status: document.getElementById("status"),
    statusTeks: document.getElementById("status-teks"),
    cobaLagi: document.getElementById("coba-lagi"),
    lembar: document.getElementById("lembar"),
    terasa: document.getElementById("terasa"),
    terasaRinci: document.getElementById("terasa-rinci"),
    lembab: document.getElementById("lembab"),
    lembabRinci: document.getElementById("lembab-rinci"),
    angin: document.getElementById("angin"),
    anginRinci: document.getElementById("angin-rinci"),
    kompas: document.getElementById("kompas"),
    hujanNilai: document.getElementById("hujan-nilai"),
    hujanRinci: document.getElementById("hujan-rinci"),
    uv: document.getElementById("uv"),
    uvRinci: document.getElementById("uv-rinci"),
    terbit: document.getElementById("terbit"),
    terbenam: document.getElementById("terbenam"),
    jamDaftar: document.getElementById("jam-daftar"),
    hariDaftar: document.getElementById("hari-daftar"),
    tema: document.querySelector('meta[name="theme-color"]'),
};

let offsetDetik = 7 * 3600;
let tempatAktif = null;
let cuacaKontrol = null;
let cariKontrol = null;
let cariTimer = null;
let saranData = [];
let saranAktif = -1;

function svg(dalam) {
    return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">${dalam}</svg>`;
}

const AWAN = `<path fill="currentColor" d="M7 16.2h10.2a3.7 3.7 0 0 0 .3-7.4 5 5 0 0 0-9.7 1.5A3.2 3.2 0 0 0 7 16.2z"/>`;

const IKON = {
    cerah: svg(`
        <circle cx="12" cy="12" r="3.7" fill="currentColor"/>
        <g stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <path d="M12 2.4v2.1M12 19.5v2.1M2.4 12h2.1M19.5 12h2.1M4.8 4.8l1.5 1.5M17.7 17.7l1.5 1.5M4.8 19.2l1.5-1.5M17.7 6.3l1.5-1.5"/>
        </g>`),
    malam: svg(`
        <path fill="currentColor" d="M14.2 3.1A7.6 7.6 0 1 0 20.6 15 6.1 6.1 0 1 1 14.2 3.1z"/>
        <circle cx="6.2" cy="6.4" r="0.7" fill="currentColor"/>
        <circle cx="8.6" cy="4.2" r="0.45" fill="currentColor"/>`),
    berawan: svg(`
        <circle cx="8" cy="8" r="2.5" fill="currentColor"/>
        <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
            <path d="M8 3.2v1.4M8 12.2v1.3M3.4 8H4.8M11.2 8h1.4M4.7 4.7l1 1M10.4 10.4"/>
        </g>
        <g transform="translate(1.2 3.2)">${AWAN}</g>`),
    "berawan-malam": svg(`
        <path fill="currentColor" d="M8.6 2.8A4.4 4.4 0 1 0 12.4 9.2 3.5 3.5 0 1 1 8.6 2.8z"/>
        <g transform="translate(1.2 3.2)">${AWAN}</g>`),
    mendung: svg(`<g transform="translate(0 2.4) scale(1.15)">${AWAN}</g>`),
    gerimis: svg(`
        <g transform="translate(0 -1.4)">${AWAN}</g>
        <g stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <path d="M8.5 16.2v2M12 17.2v2M15.4 16.2v1.7"/>
        </g>`),
    hujan: svg(`
        <g transform="translate(0 -1.6)">${AWAN}</g>
        <g stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <path d="M8 16.2l-1 3.1M12 16.6l-1 3.2M16 16.2l-1 3.1"/>
        </g>`),
    badai: svg(`
        <g transform="translate(0 -3.2) scale(0.86)">${AWAN}</g>
        <path fill="currentColor" d="M13.4 12.6 9.2 17.8h2.8l-1.7 4.8 6.2-6.4h-3l2.4-3.6h-2.5z"/>`),
    salju: svg(`
        <g transform="translate(0 -1.8)">${AWAN}</g>
        <g fill="currentColor">
            <circle cx="8.2" cy="17.6" r="1"/>
            <circle cx="12" cy="19.3" r="1"/>
            <circle cx="15.8" cy="17.4" r="1"/>
        </g>`),
    kabut: svg(`
        <g stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
            <path d="M4 8h16M5.5 12H20M4 16h13M7 20h12"/>
        </g>`),
};

function node(tag, className, teks) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (teks != null) item.textContent = teks;
    return item;
}

function namaCuaca(kode, siang) {
    if ((kode === 0 || kode === 1) && !siang) return "Malam cerah";
    return NAMA[kode] || "Cuaca berubah";
}

function jenisIkon(kode, siang) {
    if (kode <= 1) return siang ? "cerah" : "malam";
    if (kode === 2) return siang ? "berawan" : "berawan-malam";
    if (kode === 3) return "mendung";
    if (kode === 45 || kode === 48) return "kabut";
    if (kode >= 51 && kode <= 57) return "gerimis";
    if ((kode >= 71 && kode <= 77) || kode === 85 || kode === 86) return "salju";
    if (kode >= 95) return "badai";
    return "hujan";
}

function jenisScene(kode) {
    if (kode <= 1) return "cerah";
    if (kode === 2 || kode === 3) return "berawan";
    if (kode === 45 || kode === 48) return "kabut";
    if ((kode >= 71 && kode <= 77) || kode === 85 || kode === 86) return "salju";
    if (kode >= 95) return "badai";
    return "hujan";
}

function arahAngin(derajat) {
    const normal = ((derajat % 360) + 360) % 360;
    return ARAH[Math.floor((normal + 22.5) / 45) % 8];
}

function bedaTerasa(suhu, terasa) {
    const selisih = Math.round(terasa) - Math.round(suhu);
    if (selisih === 0) return "Mirip suhu udara";
    if (selisih > 0) return `${selisih}° lebih hangat`;
    return `${Math.abs(selisih)}° lebih sejuk`;
}

function subjudul(tempat) {
    const bagian = [];
    if (tempat.admin1 && tempat.admin1 !== tempat.name) bagian.push(tempat.admin1);
    if (tempat.country && !bagian.includes(tempat.country)) bagian.push(tempat.country);
    return bagian.join(" · ");
}

function derajatBulat(nilai) {
    return `${Math.round(nilai)}°`;
}

function formatAngka(nilai, digit = 0) {
    return new Intl.NumberFormat("id-ID", { maximumFractionDigits: digit }).format(nilai);
}

function jamDariIso(iso) {
    return iso.slice(11, 16);
}

function tanggalUtc(iso) {
    const [tahun, bulan, hari] = iso.slice(0, 10).split("-").map(Number);
    return new Date(Date.UTC(tahun, bulan - 1, hari));
}

function formatTanggal(iso) {
    const teks = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: "UTC",
    }).format(tanggalUtc(iso));
    return teks.charAt(0).toUpperCase() + teks.slice(1);
}

function namaHari(iso, index) {
    if (index === 0) return "Hari ini";
    if (index === 1) return "Besok";
    const teks = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        timeZone: "UTC",
    }).format(tanggalUtc(iso));
    return teks.charAt(0).toUpperCase() + teks.slice(1);
}

function jamKota(offset) {
    const saatIni = new Date(Date.now() + offset * 1000);
    const jam = String(saatIni.getUTCHours()).padStart(2, "0");
    const menit = String(saatIni.getUTCMinutes()).padStart(2, "0");
    return `${jam}:${menit}`;
}

function kataLembap(nilai) {
    if (nilai < 30) return "Udara kering";
    if (nilai < 60) return "Cukup nyaman";
    if (nilai < 80) return "Agak lembap";
    return "Sangat lembap";
}

function kataUv(nilai) {
    if (nilai <= 2) return "Rendah";
    if (nilai <= 5) return "Sedang";
    if (nilai <= 7) return "Tinggi";
    if (nilai <= 10) return "Sangat tinggi";
    return "Ekstrem";
}


function keTempat(hasil) {
    return {
        name: hasil.name,
        admin1: hasil.admin1 || "",
        country: hasil.country || "",
        country_code: hasil.country_code || "",
        latitude: hasil.latitude,
        longitude: hasil.longitude,
    };
}

function tempatDariLokasi(data, latitude, longitude) {
    return {
        name: data.city || data.locality || "Lokasimu",
        admin1: data.principalSubdivision || "",
        country: data.countryName || "",
        country_code: data.countryCode || "",
        latitude,
        longitude,
    };
}

async function ambilJson(url, signal) {
    const respons = await fetch(url, { signal });
    if (!respons.ok) throw new Error(`HTTP ${respons.status}`);
    const data = await respons.json();
    if (data && data.error) throw new Error(data.reason || "Permintaan gagal");
    return data;
}

function urlPrakira(lat, lon) {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", lat);
    url.searchParams.set("longitude", lon);
    url.searchParams.set("current", [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "precipitation",
        "weather_code",
        "cloud_cover",
        "pressure_msl",
        "wind_speed_10m",
        "wind_direction_10m",
    ].join(","));
    url.searchParams.set("hourly", [
        "temperature_2m",
        "precipitation_probability",
        "weather_code",
        "is_day",
    ].join(","));
    url.searchParams.set("daily", [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "sunrise",
        "sunset",
        "precipitation_probability_max",
        "uv_index_max",
        "precipitation_sum",
    ].join(","));
    url.searchParams.set("timezone", "auto");
    url.searchParams.set("forecast_days", "7");
    url.searchParams.set("wind_speed_unit", "kmh");
    return url;
}

function bacaSimpan() {
    try {
        const mentah = localStorage.getItem(SIMPAN);
        if (!mentah) return null;
        const tempat = JSON.parse(mentah);
        if (!tempat || typeof tempat.latitude !== "number") return null;
        return tempat;
    } catch {
        return null;
    }
}

function simpan(tempat) {
    try {
        localStorage.setItem(SIMPAN, JSON.stringify(tempat));
    } catch {
        /* browser menolak penyimpanan */
    }
}

function tampilkanStatus(teks, jenis, bisaUlang) {
    el.status.hidden = false;
    el.status.className = `status status-${jenis}`;
    el.statusTeks.textContent = teks;
    el.cobaLagi.hidden = !bisaUlang;
}

function sembunyikanStatus() {
    el.status.hidden = true;
    el.cobaLagi.hidden = true;
}

function terapkanSuasana(kode, siang) {
    const scene = jenisScene(kode);
    const terang = siang && (scene === "salju" || scene === "kabut");
    document.body.className = `scene-${scene} ${siang ? "siang" : "malam"} ${terang ? "terang" : "gelap"}`;
    const kunci = `${scene}-${siang ? "siang" : "malam"}`;
    if (el.tema) el.tema.content = TEMA[kunci] || "#10151d";
}

function gambarJam(hourly, mulai) {
    el.jamDaftar.replaceChildren();
    const akhir = Math.min(hourly.time.length, mulai + 24);
    for (let i = mulai; i < akhir; i += 1) {
        const siang = hourly.is_day[i] === 1;
        const kode = hourly.weather_code[i];
        const peluang = hourly.precipitation_probability[i] ?? 0;
        const item = node("li", i === mulai ? "jam-item sekarang" : "jam-item");
        const ikon = node("span", "jam-ikon");
        ikon.innerHTML = IKON[jenisIkon(kode, siang)] || IKON.mendung;
        const bar = node("span", "hujan-mini");
        const isi = document.createElement("i");
        isi.style.height = `${Math.max(0, Math.min(100, peluang))}%`;
        bar.append(isi);
        item.append(
            node("span", "jam-label", i === mulai ? "Sekarang" : jamDariIso(hourly.time[i])),
            ikon,
            node("span", "jam-suhu", derajatBulat(hourly.temperature_2m[i])),
            bar,
            node("span", "jam-persen", `${peluang}%`),
        );
        el.jamDaftar.append(item);
    }
}

function gambarHari(daily) {
    el.hariDaftar.replaceChildren();
    const terendah = Math.min(...daily.temperature_2m_min);
    const tertinggi = Math.max(...daily.temperature_2m_max);
    const rentang = Math.max(1, tertinggi - terendah);

    daily.time.forEach((iso, i) => {
        const min = daily.temperature_2m_min[i];
        const max = daily.temperature_2m_max[i];
        const item = node("li", "hari-item");
        const ikon = node("span", "hari-ikon");
        ikon.innerHTML = IKON[jenisIkon(daily.weather_code[i], true)] || IKON.mendung;
        const batang = node("span", "batang");
        const isi = node("span", "isi");
        const kiri = ((min - terendah) / rentang) * 100;
        const lebar = Math.max(8, ((max - min) / rentang) * 100);
        isi.style.left = `${kiri}%`;
        isi.style.width = `${Math.min(lebar, 100 - kiri)}%`;
        batang.append(isi);
        item.append(
            node("span", "hari-nama", namaHari(iso, i)),
            ikon,
            node("span", "hari-hujan", `${daily.precipitation_probability_max[i] ?? 0}%`),
            node("span", "hari-min", derajatBulat(min)),
            batang,
            node("span", "hari-max", derajatBulat(max)),
        );
        el.hariDaftar.append(item);
    });
}

function tampilkan(tempat, data) {
    const kini = data.current;
    const siang = kini.is_day === 1;
    const suhu = kini.temperature_2m;
    const nama = namaCuaca(kini.weather_code, siang);
    const arah = arahAngin(kini.wind_direction_10m);
    const angin = Math.round(kini.wind_speed_10m);
    const peluang = data.daily.precipitation_probability_max[0] ?? 0;
    const uv = data.daily.uv_index_max[0];

    offsetDetik = data.utc_offset_seconds ?? offsetDetik;
    tempatAktif = tempat;
    terapkanSuasana(kini.weather_code, siang);

    el.kota.textContent = tempat.name;
    el.wilayah.textContent = subjudul(tempat);
    el.tanggal.textContent = formatTanggal(kini.time);
    el.pemisah.hidden = false;
    el.jam.textContent = jamKota(offsetDetik);
    el.jam.dateTime = kini.time;
    el.ikon.innerHTML = IKON[jenisIkon(kini.weather_code, siang)] || IKON.mendung;
    el.angka.textContent = Math.round(suhu);
    el.kondisi.textContent = nama;
    el.ringkas.textContent = `Terasa seperti ${Math.round(kini.apparent_temperature)}°. Angin ${arah.toLowerCase()} ${angin} km/jam. Peluang hujan hari ini ${peluang}%.`;
    el.pembaca.textContent = `${tempat.name}, ${nama}, ${Math.round(suhu)} derajat.`;
    document.title = `${Math.round(suhu)}° ${tempat.name} — Cuaca`;

    el.terasa.textContent = derajatBulat(kini.apparent_temperature);
    el.terasaRinci.textContent = bedaTerasa(suhu, kini.apparent_temperature);
    el.lembab.textContent = `${kini.relative_humidity_2m}%`;
    el.lembabRinci.textContent = kataLembap(kini.relative_humidity_2m);
    el.angin.textContent = `${angin} km/jam`;
    el.anginRinci.textContent = `dari ${arah.toLowerCase()}`;
    el.kompas.style.setProperty("--arah", `${kini.wind_direction_10m}deg`);
    el.hujanNilai.textContent = `${formatAngka(data.daily.precipitation_sum[0] || 0, 1)} mm`;
    el.hujanRinci.textContent = `Peluang ${peluang}%`;
    el.uv.textContent = uv == null ? "—" : String(Math.round(uv));
    el.uvRinci.textContent = uv == null ? "" : kataUv(uv);
    el.terbit.textContent = jamDariIso(data.daily.sunrise[0]);
    el.terbenam.textContent = `Terbenam ${jamDariIso(data.daily.sunset[0])}`;

    const kunciJam = kini.time.slice(0, 13);
    let indeks = data.hourly.time.findIndex((waktu) => waktu.slice(0, 13) === kunciJam);
    if (indeks < 0) indeks = 0;
    gambarJam(data.hourly, indeks);
    gambarHari(data.daily);

    el.lembar.hidden = false;
    el.panggung.classList.remove("masuk");
    void el.panggung.offsetWidth;
    el.panggung.classList.add("masuk");
}

async function muat(tempat) {
    cuacaKontrol?.abort();
    const kontrol = new AbortController();
    cuacaKontrol = kontrol;
    try {
        const data = await ambilJson(urlPrakira(tempat.latitude, tempat.longitude), kontrol.signal);
        simpan(tempat);
        tampilkan(tempat, data);
        sembunyikanStatus();
    } catch (err) {
        if (err.name === "AbortError") return;
        tampilkanStatus("Cuaca tidak bisa dimuat. Periksa koneksi internet, lalu coba lagi.", "galat", true);
        if (!tempatAktif) {
            el.kondisi.textContent = "Cuaca belum bisa dibaca";
            el.kota.textContent = tempat.name;
        }
    }
}

function tutupSaran() {
    el.saran.hidden = true;
    el.saran.replaceChildren();
    el.kolom.setAttribute("aria-expanded", "false");
    saranData = [];
    saranAktif = -1;
}

function sorot(index) {
    saranAktif = index;
    [...el.saran.querySelectorAll("button")].forEach((tombol, i) => {
        const aktif = i === index;
        tombol.classList.toggle("aktif", aktif);
        if (aktif) {
            tombol.setAttribute("aria-selected", "true");
            el.kolom.setAttribute("aria-activedescendant", tombol.id);
            tombol.scrollIntoView({ block: "nearest" });
        } else {
            tombol.removeAttribute("aria-selected");
        }
    });
}

function tampilSaran(hasil) {
    saranData = hasil.map(keTempat);
    saranAktif = -1;
    el.saran.replaceChildren();
    el.kolom.removeAttribute("aria-activedescendant");

    if (!saranData.length) {
        el.saran.append(node("li", "saran-kosong", "Tidak ada kota dengan nama itu."));
        el.saran.hidden = false;
        el.kolom.setAttribute("aria-expanded", "true");
        return;
    }

    saranData.forEach((tempat, i) => {
        const butir = node("li");
        const tombol = node("button");
        tombol.type = "button";
        tombol.id = `saran-${i}`;
        tombol.setAttribute("role", "option");
        const baris = node("span", "baris-nama");
        if (tempat.country_code) baris.append(node("span", "kode-negara", tempat.country_code));
        baris.append(node("span", "", tempat.name));
        const wilayah = node("small", "", subjudul(tempat));
        tombol.append(baris, wilayah);
        tombol.addEventListener("click", () => pilih(tempat));
        tombol.addEventListener("mousemove", () => sorot(i));
        butir.append(tombol);
        el.saran.append(butir);
    });

    el.saran.hidden = false;
    el.kolom.setAttribute("aria-expanded", "true");
}

async function jalankanCari() {
    const kueri = el.kolom.value.trim();
    cariKontrol?.abort();
    if (kueri.length < 2) {
        tutupSaran();
        return;
    }
    const kontrol = new AbortController();
    cariKontrol = kontrol;
    const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
    url.searchParams.set("name", kueri);
    url.searchParams.set("count", "6");
    url.searchParams.set("language", "id");
    url.searchParams.set("format", "json");
    try {
        const data = await ambilJson(url, kontrol.signal);
        if (el.kolom.value.trim() !== kueri) return;
        tampilSaran(data.results || []);
    } catch (err) {
        if (err.name === "AbortError") return;
        tampilSaran([]);
    }
}

function jadwalkanCari() {
    clearTimeout(cariTimer);
    cariTimer = setTimeout(jalankanCari, 280);
}

function pilih(tempat) {
    el.kolom.value = tempat.name;
    tutupSaran();
    muat(tempat);
}

function mintaLokasi() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 8000,
            maximumAge: 600000,
        });
    });
}

async function balikkan(latitude, longitude) {
    const url = new URL("https://api.bigdatacloud.net/data/reverse-geocode-client");
    url.searchParams.set("latitude", latitude);
    url.searchParams.set("longitude", longitude);
    url.searchParams.set("localityLanguage", "id");
    try {
        const data = await ambilJson(url);
        return tempatDariLokasi(data, latitude, longitude);
    } catch {
        return {
            name: "Lokasimu",
            admin1: "",
            country: "",
            country_code: "",
            latitude,
            longitude,
        };
    }
}

function siapkanLangit() {
    const hujan = document.getElementById("hujan");
    const salju = document.getElementById("salju");
    const bintang = document.getElementById("bintang");
    for (let i = 0; i < 60; i += 1) {
        const titik = document.createElement("span");
        titik.style.left = `${Math.random() * 100}%`;
        titik.style.animationDuration = `${0.7 + Math.random() * 0.75}s`;
        titik.style.animationDelay = `${-Math.random() * 2.2}s`;
        titik.style.height = `${46 + Math.random() * 74}px`;
        titik.style.opacity = String(0.3 + Math.random() * 0.55);
        hujan.append(titik);
    }
    for (let i = 0; i < 42; i += 1) {
        const titik = document.createElement("span");
        const ukuran = 3 + Math.random() * 5;
        titik.style.left = `${Math.random() * 100}%`;
        titik.style.width = `${ukuran}px`;
        titik.style.height = `${ukuran}px`;
        titik.style.animationDuration = `${7 + Math.random() * 9}s`;
        titik.style.animationDelay = `${-Math.random() * 12}s`;
        titik.style.opacity = String(0.45 + Math.random() * 0.5);
        titik.style.setProperty("--geser", `${-36 + Math.random() * 72}px`);
        salju.append(titik);
    }
    const bayangan = [];
    const lebar = Math.max(window.innerWidth, 1200);
    const tinggi = Math.max(window.innerHeight, 800);
    for (let i = 0; i < 80; i += 1) {
        const x = Math.floor(Math.random() * lebar);
        const y = Math.floor(Math.random() * tinggi * 0.72);
        const radius = Math.random() > 0.88 ? 1.4 : 0.6;
        const alpha = (0.35 + Math.random() * 0.65).toFixed(2);
        bayangan.push(`${x}px ${y}px 0 ${radius}px rgba(255,255,255,${alpha})`);
    }
    bintang.style.boxShadow = bayangan.join(", ");
}

el.kolom.addEventListener("input", jadwalkanCari);
el.formulir.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!el.saran.hidden && saranAktif >= 0) {
        pilih(saranData[saranAktif]);
        return;
    }
    await jalankanCari();
    if (saranData[0]) pilih(saranData[0]);
});

el.kolom.addEventListener("keydown", (event) => {
    if (el.saran.hidden || !saranData.length) {
        if (event.key === "Escape") tutupSaran();
        return;
    }
    if (event.key === "ArrowDown") {
        event.preventDefault();
        sorot((saranAktif + 1) % saranData.length);
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        sorot((saranAktif - 1 + saranData.length) % saranData.length);
    } else if (event.key === "Escape") {
        tutupSaran();
    } else if (event.key === "Enter" && saranAktif >= 0) {
        event.preventDefault();
        pilih(saranData[saranAktif]);
    }
});

document.addEventListener("click", (event) => {
    if (!el.formulir.contains(event.target)) tutupSaran();
});

el.lokasi.addEventListener("click", async () => {
    if (!navigator.geolocation) {
        tampilkanStatus("Browser ini tidak mendukung lokasi. Cari nama kota saja.", "info", false);
        return;
    }
    el.lokasi.disabled = true;
    tampilkanStatus("Mencari lokasimu…", "info", false);
    try {
        const posisi = await mintaLokasi();
        const tempat = await balikkan(posisi.coords.latitude, posisi.coords.longitude);
        el.kolom.value = tempat.name === "Lokasimu" ? "" : tempat.name;
        sembunyikanStatus();
        await muat(tempat);
    } catch (err) {
        const ditolak = err && err.code === 1;
        tampilkanStatus(
            ditolak
                ? "Izin lokasi ditolak. Cari nama kota di kolom pencarian."
                : "Lokasi tidak ketemu. Coba lagi, atau cari nama kota.",
            "galat",
            false,
        );
    } finally {
        el.lokasi.disabled = false;
    }
});

el.cobaLagi.addEventListener("click", () => {
    muat(tempatAktif || bacaSimpan() || JAKARTA);
});

setInterval(() => {
    if (!el.pemisah.hidden) el.jam.textContent = jamKota(offsetDetik);
}, 1000);

siapkanLangit();
muat(bacaSimpan() || JAKARTA);
