/*
  Everything a family changes lives here. A new invite = a new copy of this file.
  Image names have no extension: the page looks for assets/<name>.webp / .jpg / .jpeg / .png,
  videos for assets/<name>.mp4 / .webm. Anything missing falls back to a drawn version.
*/
const INVITE = {
  couple: {
    initials: ["G", "S"],
    groom: {
      first: "Gourab",
      full: "Gourab Chattaraj",
      parents: "Bakul & Sakti Chattaraj",
      parentsBn: "শক্তি ও বকুল চট্টরাজের ছেলে",
      about: "",
    },
    bride: {
      first: "Shreya",
      full: "Shreya Mukherjee",
      parents: "Debashree & Chiranjib Mukherjee",
      parentsBn: "চিরঞ্জীব ও দেবাশ্রী মুখার্জির মেয়ে",
      about: "",
    },
  },
  houses: "Chattaraj bari · Mukherjee bari",
  families: "চট্টরাজ ও মুখার্জি পরিবার",

  wedding: {
    startISO: "2027-01-28T20:00:00+05:30",
    endISO: "2027-01-29T03:30:00+05:30",
    weekday: "Thursday",
    dateLine: "Thursday, 28 January 2027",
    short: "28 · 01 · 2027",
    city: "Serampore",
    bnDay: "বৃহস্পতিবার",
    bnDate: "২৮শে জানুয়ারি",
    bnYear: "২০২৭",
    bnLagna: "শুভ লগ্ন রাত ১টা ২০ মিনিট",
    lagna: "1:20 AM",
    // calendar card
    month: "January",
    year: 2027,
    monthIndex: 0,
    day: 28,
    // the family types the Bangla date themselves (never computed), e.g. "৮ই মাঘ ১৪৩৩"
    banglaDate: "১৪ই মাঘ ১৪৩৩",
  },

  // the printed-card letter that slides out of the envelope
  letter: {
    greeting: "সবিনয় নিবেদন,",
    body: [
      "আগামী ২৮শে জানুয়ারি ২০২৭, বৃহস্পতিবার, শুভ লগ্নে আমাদের পুত্র কল্যাণীয় গৌরবের সহিত শ্রী চিরঞ্জীব মুখার্জি ও শ্রীমতী দেবাশ্রী মুখার্জির কন্যা কল্যাণীয়া শ্রেয়ার শুভ বিবাহ অনুষ্ঠিত হইবে।",
      "উক্ত শুভানুষ্ঠানে আপনার সবান্ধব উপস্থিতি ও আশীর্বাদ একান্ত কাম্য।",
    ],
    sign: "বিনীত",
    from: "শক্তি ও বকুল চট্টরাজ",
    place: "শ্রীরামপুর",
  },

  // the printed wedding card that comes out of the envelope and turns its pages on scroll
  card: {
    groom: "গৌরব",
    bride: "শ্রেয়া",
    mantra: ["যদেতৎ হৃদয়ং তব", "তদস্তু হৃদয়ং মম।", "যদিদং হৃদয়ং মম", "তদস্তু হৃদয়ং তব॥"],
    mantraMeaning: "তোমার এই হৃদয় আমার হোক,\nআমার এই হৃদয় তোমার।",
    groomSide: {
      title: "বরপক্ষ",
      body: [
        "আগামী ২৮শে জানুয়ারি ২০২৭, বৃহস্পতিবার, শুভ লগ্নে আমাদের পুত্র কল্যাণীয় গৌরবের সহিত শ্রী চিরঞ্জীব মুখার্জি ও শ্রীমতী দেবাশ্রী মুখার্জির কন্যা কল্যাণীয়া শ্রেয়ার শুভ বিবাহ অনুষ্ঠিত হইবে।",
        "উক্ত শুভানুষ্ঠানে আপনার সবান্ধব উপস্থিতি ও আশীর্বাদ একান্ত কাম্য।",
      ],
      from: "শক্তি ও বকুল চট্টরাজ",
      place: "শ্রীরামপুর",
    },
    brideSide: {
      title: "কন্যাপক্ষ",
      body: [
        "আগামী ২৮শে জানুয়ারি ২০২৭, বৃহস্পতিবার, শুভ লগ্নে আমাদের কন্যা কল্যাণীয়া শ্রেয়ার সহিত শ্রী শক্তি চট্টরাজ ও শ্রীমতী বকুল চট্টরাজের পুত্র কল্যাণীয় গৌরবের শুভ বিবাহ অনুষ্ঠিত হইবে।",
        "উক্ত শুভানুষ্ঠানে আপনার সবান্ধব উপস্থিতি ও আশীর্বাদ একান্ত কাম্য।",
      ],
      from: "চিরঞ্জীব ও দেবাশ্রী মুখার্জি",
      place: "শ্রীরামপুর",
    },
  },


  // shape: "land" = 4:3 frame, "wide" = 3:2 frame, "port" = 3:4 portrait (match the photo)
  gallery: [
    { img: "kolkata-1", shape: "land", place: "প্রথম দেখা", caption: "যেখান থেকে শুরু হলো এক নতুন অধ্যায়" },
    { img: "kolkata-2", shape: "port", place: "বাড়িতে কালীপুজো", caption: "২৭.০১.২৭" },
    { img: "kolkata-3", shape: "port", place: "খুনসুটি আর আড্ডা", caption: "এক কাপ কফি আর হাজারো না বলা কথা" },
    { img: "kolkata-4", shape: "port", place: "একসাথে পথচলা", caption: "হাত ধরে আজীবন চলার মধুর অঙ্গীকার" },
    { img: "story-haan", shape: "port", place: "যেখানে 'হ্যাঁ' বলা", caption: "দুটো মন মিলেমিশে এক হওয়ার চিরন্তন মুহূর্ত" },
  ],

  eventsRange: "28 – 30 January 2027",
  events: [
    {
      bn: "আশীর্বাদ",
      en: "Ashirbad",
      img: "event-ashirbad",
      icon: "thala",
      when: "Wednesday, 27 January · 11:00 AM",
      where: "চট্টরাজ বাড়ি",
      mapQuery: "Serampore, Hooghly",
      note: "ধান-দুব্বো আর অনেকটা আশীর্বাদ নিয়ে আসবেন।",
    },
    {
      bn: "গায়ে হলুদ",
      en: "Gaye Holud",
      img: "event-holud",
      icon: "haldi",
      when: "Thursday, 28 January · 8:00 AM",
      where: "দু'বাড়িতেই",
      mapQuery: "Serampore, Hooghly",
      note: "পুরোনো জামা পরে আসাই ভালো, হলুদ লাগবেই।",
    },
    {
      bn: "বিয়ে",
      en: "Biye",
      img: "event-biye",
      icon: "topor",
      when: "Thursday, 28 January · 8:00 PM",
      where: "Ganges Vision, Serampore",
      mapQuery: "Ganges Vision, Serampore",
      note: "লগ্ন রাত ১টা ২০ মিনিটে।",
    },
    {
      bn: "বৌভাত",
      en: "Boubhat",
      img: "event-boubhat",
      icon: "kolapata",
      when: "Saturday, 30 January · 7:30 PM",
      where: "Bengai, West Bengal 722161",
      mapQuery: "https://maps.app.goo.gl/tWHADwV5ho5dBBMMA?g_st=ac",
      note: "ভাত-কাপড়ের পর জমিয়ে খাওয়াদাওয়া।",
    },
  ],

  night: [
    { time: "8:00 PM", title: "Bor Boron", bn: "বর বরণ", note: "শাঁখ আর উলু দিয়ে বরণ, গেটে সবাই হাজির।" },
    { time: "9:00 PM", title: "Dinner", bn: "খাওয়াদাওয়া", note: "ফিশ ফ্রাই থেকে মিষ্টি দই, পাত পেড়ে।" },
    { time: "1:20 AM", title: "Shubholagna & Biye", bn: "শুভ লগ্ন ও বিবাহ", note: "রাত ১টা ২০ মিনিটে শুভ লগ্ন।" },
    { time: "2:30 AM", title: "Sindoor Daan", bn: "সিঁদুরদান", note: "বিয়ের সবচেয়ে চুপচাপ মুহূর্ত। ফোনটা একটু নামিয়ে রাখবেন।" },
  ],

  venues: [
    {
      kicker: "বিবাহ বাসর",
      enKicker: "Wedding Ceremony",
      name: "Ganges Vision",
      address: "Serampore, Hooghly",
      when: "বৃহস্পতিবার, ২৮শে জানুয়ারি ২০২৭ · রাত ৮:০০ টা",
      lagna: "শুভ লগ্ন রাত ১টা ২০ মিনিট",
      note: "গঙ্গাবক্ষে অপরূপ পরিবেশ, পার্কিং ব্যবস্থা রয়েছে।",
      mapQuery: "Ganges Vision, Serampore",
      mapUrl: "https://share.google/JE14yvlLgCd84LQK3",
    },
    {
      kicker: "প্রীতিভোজ",
      enKicker: "Reception Party",
      name: "Bengai",
      address: "Bengai, West Bengal 722161",
      when: "শনিবার, ৩০শে জানুয়ারি ২০২৭ · সন্ধ্যা ৭:৩০ টা",
      lagna: "",
      note: "ভাত-কাপড়ের পর জমিয়ে খাওয়া-দাওয়া ও আনন্দানুষ্ঠান।",
      mapQuery: "Bengai, West Bengal 722161",
      mapUrl: "https://maps.app.goo.gl/tWHADwV5ho5dBBMMA?g_st=ac",
    },
  ],

  venue: {
    name: "Ganges Vision",
    address: "Serampore, Hooghly",
    mapQuery: "Ganges Vision, Serampore",
    mapUrl: "https://share.google/JE14yvlLgCd84LQK3",
    note: "গঙ্গাবক্ষে অপরূপ পরিবেশ, পার্কিং ব্যবস্থা রয়েছে।",
  },

  dress: {
    line: "লাল, সোনালি আর আইভরি। শাড়ি-পাঞ্জাবি হলে তো কথাই নেই।",
    swatches: [
      { name: "Oxblood", hex: "#4a0a12" },
      { name: "Crimson", hex: "#9e1b2b" },
      { name: "Gold", hex: "#c9a24a" },
      { name: "Ivory", hex: "#f3e9d6" },
    ],
  },

  closing: {
    line: "আসবেন কিন্তু",
  },

  // where the chandeliers sit in the stage pictures, as fractions of the picture (r = glow size / picture width)
  glows: {
    wide: [
      { x: 0.5, y: 0.13, r: 0.17 },
      { x: 0.249, y: 0.215, r: 0.12 },
      { x: 0.756, y: 0.215, r: 0.12 },
    ],
    tall: [{ x: 0.5, y: 0.14, r: 0.5 }],
  },
};

if (typeof window !== "undefined") {
  window.INVITE = INVITE;
}

export default INVITE;
