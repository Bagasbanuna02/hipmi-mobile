// badWordsIndonesia.js (Versi Lengkap)

const badWordsIndonesia = [
  // 🐶 Kata Kasar & Vulgar
  'anjing', 'babi', 'bangsat', 'bodoh', 'goblok', 'idiot', 'jancok', 'jembut', 'kampret',
  'kontol', 'memek', 'ngentot', 'peler', 'puki', 'sialan', 'tai', 'tolol', 'wibu',
  'anjingg', 'babbii', 'bangsaat', 'gobllokk', 'jancokk', 'kontoll', 'memekk', 'ngentott',
  'pelerr', 'puuki', 'sialann', 'taii', 'tololl', 'wibuu', 'cicing',

  // 🔥 Kata Sindiran & Penghinaan
  'bego', 'dungu', 'edan', 'gila', 'goblog', 'kampang', 'kampret', 'keparat', 'lonte',
  'monyet', 'najis', 'ngeyel', 'ngibul', 'ngomong seenaknya', 'ngurangin',
  'ngutang', 'ngurusin urusan orang', 'pemalas', 'pengecut', 'penipu', 'sinting',
  'begoo', 'dunguu', 'goblogg', 'kampangg', 'keparatt', 'lontee', 'monyyet', 'najiss',
  'ngeyell', 'ngibull', 'ngomongg seenaknya', 'nguranginn', 'ngutangg', 'pemalass',
  'pengecutt', 'penipuu', 'sintting',

  // ⚖️ Kata SARA & Diskriminasi
  'cina', 'kafir', 'kampungan', 'kacung', 'mampus', 'menghina', 'racist', 'sara',
  'setan', 'syiah', 'waria', 'wong jowo', 'wong sunda', 'wong madura',
  'chinna', 'kafiir', 'kampungann', 'kacungg', 'mampuss', 'menghinna', 'racisst',
  'saraa', 'setann', 'syiahh', 'wariia', 'wong jowoo', 'wong sundaa', 'wong maduraa',

  // 💸 Kata Spam / Promosi Ilegal
  'judi', 'togel', 'slot', 'casino', 'poker', 'qq', 'bandar', 'agen', 'link', 'wa',
  'deposit', 'withdraw',
  'judii', 'togell', 'slotss', 'casinoo', 'pokerr', 'qqq', 'bandarr', 'agenn', 'linkk',
  'waa',
  'depositt', 'withdraww', 'rpp',

  // 🧩 Variasi Penulisan (Bypass Filter)
  'a*njing', 'b*b*i', 'b*ngsat', 'g*blok', 'k*nt*l', 'm*m*k', 'n*g*nt*t', 'p*l*r',
  't*i', 't*l*l', 'j*n*c*k', 'j*m*b*t', 'k*m*p*r*t', 's*i*l*a*n', 'w*b*u', 
  'a.n.j.i.n.g', 'b.a.b.i', 'b.a.n.g.s.a.t', 'g.o.b.l.o.k', 'k.o.n.t.o.l', 'm.e.m.e.k',
  'n.g.e.n.t.o.t', 'p.e.l.e.r', 't.a.i', 't.o.l.o.l', 'j.a.n.c.o.k', 'j.e.m.b.u.t',
  'k.a.m.p.r.e.t', 's.i.a.l.a.n', 'w.i.b.u', 'c.i.c.i.n.g',

  // 📱 Variasi dengan Angka & Simbol
  '4nj1ng', 'b4b1', 'b4ngs4t', 'g0bl0k', 'k0nt0l', 'm3m3k', 'ng3nt0t', 'p3l3r',
  't4i', 't0l0l', 'j4nc0k', 'j3mbut', 'k4mpr3t', 's14l4n', 'w1bu',
  '4nj1ngg', 'b4b11', 'b4ngs4tt', 'g0bl0kk', 'k0nt0ll', 'm3m3kk', 'ng3nt0tt',
  'p3l3rr', 't4ii', 't0l0ll', 'j4nc0kk', 'j3mbutt', 'k4mpr3tt', 's14l4nn', 'w1buu',

  // 🗣️ Kata yang Sering Digunakan dalam Konteks Negatif
  'dasar bodoh', 'dasar goblok', 'dasar bangsat', 'dasar idiot', 'dasar sialan',
  'dasar bego', 'dasar dungu', 'dasar edan', 'dasar gila', 'dasar sinting',
  'dasar pemalas', 'dasar pengecut', 'dasar penipu', 'dasar najis', 'dasar kampret',

  // 🚫 Kata yang Mengandung Unsur Seksual
  'porno', 'seks', 'mesum', 'bugil', 'telanjang', 'payudara', 'pantat', 'vagina', 'penis',
  'pornoo', 'sekss', 'mesumm', 'bugill', 'telanjangg', 'payudaraa', 'pantatt', 'vaginna',
  'peniss', 'pornoografi', 'pornografi', 'porno graf i', 'seksual', 'seksualitas',
  'pornoograffii', 'pornografffii', 'porno graf ii', 'seksuall', 'seksualitass',

  // 🤬 Kata Kasar dari Bahasa Daerah (Sunda, Jawa, dll)
  'kampret', 'kacung', 'mampus', 'sialan', 'bangsat', 'goblok', 'bodoh', 'tolol',
  'kamprett', 'kacungg', 'mampuss', 'sialann', 'bangsaatt', 'gobllokk', 'bodooh', 'tololl',
  'kampret sunda', 'kacung jawa', 'mampus batak', 'sialan minang', 'bangsat lampung',
  'goblok palembang', 'bodoh medan', 'tolol makassar',

  // 📉 Kata yang Sering Digunakan untuk Menjelekkan Orang
//   'jelek', 'buruk', 'tidak pantas', 'tidak sopan', 'tidak beretika', 'tidak beradab',
//   'jelekk', 'burukk', 'tidak pantass', 'tidak sopann', 'tidak beretikaa', 'tidak beradabb',
//   'jelek banget', 'buruk banget', 'tidak pantas banget', 'tidak sopan banget',
//   'tidak beretika banget', 'tidak beradab banget',

  // 🛑 Kata yang Sering Digunakan untuk Menyebarkan Hoax
//   'hoax', 'bohong', 'palsu', 'tipu', 'menipu', 'menyesatkan', 'menjerumuskan',
//   'hoaxx', 'bohongg', 'palsuu', 'tipuu', 'menipuu', 'menyesatkanng', 'menjerumuskanng',
//   'hoax besar', 'bohong besar', 'palsu besar', 'tipu besar', 'menipu besar',
//   'menyesatkan besar', 'menjerumuskan besar'
];

// Normalisasi teks
const normalizeText = (text: string) => {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
};

// Cek apakah teks mengandung kata buruk
const isBadContent = (text: string) => {
  const normalized = normalizeText(text);
  for (let word of badWordsIndonesia) {
    if (normalized.includes(word)) {
      return true;
    }
  }
  return false;
};

// Saring teks (ganti dengan asterisk)
const censorText = (text: string) => {
  let result = text;
  for (let word of badWordsIndonesia) {
    const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    result = result.replace(regex, '*'.repeat(word.length));
  }
  return result;
};

export {
  badWordsIndonesia,
  isBadContent,
  censorText,
  normalizeText
};