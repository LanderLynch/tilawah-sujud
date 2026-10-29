// Semua teks & data halaman. Sumber: presentasi "Ayat Sajadah" (Praktikum Al-Qur'an, Kelompok 11).

export const hero = {
  label: "PRAKTIKUM AL-QUR'AN",
  title: ["AYAT", "SAJADAH"],
  subtitle: "Pengertian, Dalil, dan Tata Cara Sujud Tilawah",
  kelompok: "Kelompok 11",
  footer: "AYAT AL-QUR'AN • SUJUD TILAWAH • HIKMAH",
};

// Ganti nama/NIM anggota di sini
export const anggota = [
  { nama: "Jona Setiawan", nim: "2661201009" },
  { nama: "Arya Pratama", nim: "2661201073" },
  { nama: "Azhar Mohammad", nim: "2661201100" },
  { nama: "Siska Amanda", nim: "2661201008" },
  { nama: "Amon Setiadi", nim: "2661201080" },
  { nama: "Salman Al Farizi", nim: "2661201078" },
];

export const sections = [
  { id: "hero", label: "Beranda" },
  { id: "pengertian", label: "Pengertian" },
  { id: "ayat", label: "15 Ayat Sajadah" },
  { id: "dalil", label: "Contoh dan Dalil" },
  { id: "hukum", label: "Hukum" },
  { id: "tata-cara", label: "Tata Cara" },
  { id: "bacaan", label: "Bacaan" },
  { id: "hikmah", label: "Hikmah" },
  { id: "alur", label: "Alur Lengkap" },
  { id: "kesimpulan", label: "Kesimpulan" },
];

export const pengertian = {
  banner: "Ayat sajadah adalah ayat-ayat tertentu dalam Al-Qur'an yang berkaitan dengan sujud.",
  cards: [
    { title: "Disunnahkan Sujud", text: "Saat membaca atau mendengar ayat sajadah, disunnahkan melakukan sujud tilawah." },
    { title: "Tunduk dan Taat", text: "Mengingatkan manusia untuk tunduk dan taat kepada Allah SWT." },
  ],
  note: "Terdapat 15 ayat sajadah dalam Al-Qur'an, biasanya ditandai dengan simbol",
  symbol: "۩",
};

// Terjemahan pada 4 ayat dalil mengikuti terjemahan Kemenag RI (tambahan, bukan dari PDF).
// Urutan sesuai Buku Ajar Praktikum Al-Qur'an.
export const ayatSajadah = [
  { no: 1, surah: "Al-A'raf", ayat: 206, arab: "", ciri: "", arti: "" }, // TODO: isi dari mushaf
  { no: 2, surah: "Ar-Ra'd", ayat: 15, arab: "", ciri: "", arti: "" }, // TODO: isi dari mushaf
  { no: 3, surah: "An-Nahl", ayat: 49, arab: "", ciri: "", arti: "" }, // TODO: isi dari mushaf
  { no: 4, surah: "Al-Isrā'", ayat: 107, arab: "", ciri: "", arti: "" }, // TODO: isi dari mushaf
  { no: 5, surah: "Maryam", ayat: 58, arab: "", ciri: "", arti: "" }, // TODO: isi dari mushaf
  { no: 6, surah: "Al-Hajj", ayat: 18, arab: "", ciri: "", arti: "" }, // TODO: isi dari mushaf
  { no: 7, surah: "Al-Hajj", ayat: 77, arab: "", ciri: "", arti: "" }, // TODO: isi dari mushaf
  { no: 8, surah: "Al-Furqān", ayat: 60, arab: "", ciri: "", arti: "" }, // TODO: isi dari mushaf
  { no: 9, surah: "An-Naml", ayat: 25, arab: "", ciri: "", arti: "" }, // TODO: isi dari mushaf
  {
    no: 10, surah: "As-Sajdah", ayat: 15,
    arab: "خَرُّوا سُجَّدًا وَسَبَّحُوا بِحَمْدِ رَبِّهِمْ",
    ciri: "Orang beriman bersujud dan bertasbih",
    arti: "… mereka menyungkur sujud dan bertasbih serta memuji Tuhannya …",
  },
  { no: 11, surah: "Fushshilat", ayat: 37, arab: "", ciri: "", arti: "" }, // TODO: isi dari mushaf
  { no: 12, surah: "Shaad", ayat: 24, arab: "", ciri: "", arti: "" }, // TODO: isi dari mushaf
  {
    no: 13, surah: "An-Najm", ayat: 62,
    arab: "فَاسْجُدُوا لِلَّهِ وَاعْبُدُوا",
    ciri: "Perintah untuk sujud",
    arti: "Maka bersujudlah kepada Allah dan sembahlah (Dia).",
  },
  {
    no: 14, surah: "Al-Insyiqaq", ayat: 21,
    arab: "وَإِذَا قُرِئَ عَلَيْهِمُ الْقُرْآنُ لَا يَسْجُدُونَ",
    ciri: "Teguran bagi yang tidak bersujud",
    arti: "Dan apabila Al-Qur'an dibacakan kepada mereka, mereka tidak (mau) bersujud.",
  },
  {
    no: 15, surah: "Al-'Alaq", ayat: 19,
    arab: "كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِبْ",
    ciri: "Perintah untuk sujud",
    arti: "Sekali-kali tidak! Janganlah kamu patuh kepadanya; dan sujudlah serta dekatkanlah (dirimu kepada Allah).",
  },
];

export const ayatNote = "Ciri umum: kalimat tasbih dan kata yasjuduun, yasjudu, sajada, sujjada, usjuduu. Daftar sesuai Buku Ajar Praktikum Al-Qur'an.";

export const dalil = [10, 13, 15, 14].map((no) => ayatSajadah.find((a) => a.no === no));

export const hukum = {
  circleLabel: "muakkadah menurut mayoritas ulama",
  tabs: [
    { id: "mayoritas", label: "Mayoritas ulama", text: "Mayoritas (Syafi'i, Maliki, Hanbali): sunnah, bukan wajib. Dikerjakan berpahala, ditinggalkan tidak berdosa." },
    { id: "hanafi", label: "Mazhab Hanafi", text: "Mazhab Hanafi: wajib bagi yang membaca maupun mendengarnya." },
    { id: "jamaah", label: "Dalam shalat berjamaah", text: "Dalam shalat berjamaah, makmum mengikuti imam. Imam tidak sujud, makmum tidak perlu sujud." },
  ],
  note: "Tuntunan Tarjih Muhammadiyah: sujud tilawah hukumnya sunnah.",
};

export const tataCara = {
  steps: [
    { no: 1, title: "Takbir", text: "Dianjurkan bertakbir terlebih dahulu." },
    { no: 2, title: "Sujud 1×", text: "Sujud tilawah hanya dilakukan sekali." },
    { no: 3, title: "Baca Doa", text: "Membaca doa sujud tilawah." },
  ],
  phases: {
    berdiri: { step: 1, label: "Bertemu ayat sajadah ۩" },
    takbir: { step: 1, label: "Takbir — Allāhu Akbar" },
    turun: { step: 2, label: "Turun menuju sujud" },
    sujud: { step: 2, label: "Sujud 1×" },
    doa: { step: 3, label: "Membaca doa dalam sujud" },
    selesai: { step: 3, label: "Selesai" },
  },
  note: "Di luar shalat tidak perlu wudhu, asalkan pakaian suci dan bersih. Di dalam shalat, ikuti imam.",
};

export const doa = {
  arab: "سَجَدَ وَجْهِيَ لِلَّذِي خَلَقَهُ وَصَوَّرَهُ وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ",
  transliterasi: "Sajada wajhii lil-ladzii khalaqahu wa shawwarahu wa syaqqa sam'ahu wa basharahu wa bi haulihi wa quwwatihi.",
  arti: "Wajahku sujud kepada Dzat yang menjadikan dan membentuknya, dan yang memberi pendengaran dan penglihatan dengan kekuatan dan kekuasaan-Nya.",
};

export const hikmah = {
  items: [
    { icon: "HandHeart", anim: "wiggle", title: "Rendah Hati", text: "Sujud mengajarkan agar tidak sombong di hadapan Allah." },
    { icon: "TrendingUp", anim: "bob", title: "Iman Meningkat", text: "Merespons ayat Allah dengan sujud menunjukkan keyakinan." },
    { icon: "ChevronsDown", anim: "bob", title: "Tunduk kepada Allah", text: "Sujud adalah simbol kepatuhan hamba kepada Penciptanya." },
    { icon: "Sun", anim: "spin", title: "Ingat Kebesaran Allah", text: "Segala sesuatu berada di bawah kekuasaan-Nya." },
    { icon: "ShieldCheck", anim: "pulse", title: "Setan Menjauh Ketika Manusia Bersujud", text: "Setan menyesal dan menangis ketika manusia bersujud." },
    { icon: "TreePalm", anim: "wiggle", title: "Jaminan Surga", text: "Hadis: bagi yang bersujud ketika diperintah, baginya surga." },
  ],
  note: "Rasulullah SAW bersabda tentang setan yang menangis ketika manusia sujud (HR. Ahmad, Muslim, Ibnu Majah).",
};

export const alur = {
  start: "Bertemu Ayat Sajadah",
  question: "Sedang shalat?",
  ya: "Ikuti imam",
  tidak: ["Takbir", "Sujud 1×", "Doa"],
  note: "Sujud tilawah hukumnya sunnah; di luar shalat tidak perlu wudhu asal pakaian suci.",
};

export const kesimpulan = {
  items: [
    { icon: "BookOpen", text: "Ayat sajadah mengingatkan kita untuk tunduk kepada Allah SWT." },
    { icon: "HeartHandshake", text: "Sujud tilawah adalah bentuk penghambaan dan penghormatan kepada ayat-ayat Al-Qur'an." },
    { icon: "Scale", text: "Hukumnya sunnah menurut mayoritas ulama, dan di dalam shalat kita mengikuti imam." },
  ],
  thanks: "Terima kasih",
  salam: "Wassalamu'alaikum warahmatullahi wabarakatuh.",
};
