// All copy for the site, in English and Indonesian.
// Facts (names, dates, companies, links) live in `profile` and are shared by both languages.

export const profile = {
  name: 'Yohana Oktavia',
  email: 'oktaviayohana00@gmail.com',
  whatsapp: '+62 878 6253 2553',
  whatsappUrl: 'https://wa.link/rv4r1f',
  linkedin: 'https://www.linkedin.com/in/yohana-oktavia95/',
  instagram: 'https://www.instagram.com/yohana.uiux/',
  instagramHandle: '@yohana.uiux',
  cv: '/Yohana-Oktavia-CV.pdf',
  location: 'Bali, Indonesia',
}

export const skills = [
  'Figma', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe After Effects',
  'Zeplin', 'HTML', 'CSS', 'JavaScript', 'Prototyping', 'User Research', 'Design Systems',
]

export const projects = [
  { id: 'fashion', title: 'Fashion Marketplace', tags: ['website', 'brand'], img: '/work/fashion.webp' },
  { id: 'nft', title: 'NFT Marketplace', tags: ['website', 'brand'], img: '/work/nft.webp' },
  { id: 'crypto', title: 'Crypto Wallet', tags: ['mobile', 'brand'], img: '/work/crypto.webp' },
  { id: 'tradebuy', title: 'TradeBuy E-commerce App', tags: ['mobile'], img: '/work/tradebuy.webp' },
  { id: 'smart-attendance', title: 'Smart Attendance', tags: ['website'], img: '/work/smart-attendance.webp' },
  { id: 'audiobook', title: 'Audio Book App', tags: ['mobile'], img: '/work/audiobook.webp' },
  { id: 'atech', title: 'ATech Brand Identity', tags: ['brand'], img: '/work/atech.webp' },
  { id: 'airport', title: 'Airport Operation App', tags: ['website'], img: '/work/airport.webp' },
  { id: 'online-course', title: 'Online Course Landing Page', tags: ['website'], img: '/work/online-course.webp' },
  { id: 'smart-hr', title: 'Smartbiz HR Mobile App', tags: ['mobile'], img: '/work/smart-hr.webp' },
  { id: 'yeps', title: 'YEPS Brochure', tags: ['brand'], img: '/work/yeps.webp' },
  { id: 'spools', title: 'Stationery Store Landing Page', tags: ['website'], img: '/work/spools.webp' },
]

export const copy = {
  en: {
    nav: { about: 'About', experience: 'Experience', services: 'Services', portfolio: 'Portfolio', contact: 'Contact', cta: "Let's talk" },
    hero: {
      status: 'Available for freelance projects',
      hello: 'Hello, I’m',
      roles: ['UI/UX Designer', 'Front-End Developer', 'Traveler'],
      lead: 'I turn ideas into calm, useful digital products — from the first user interview to the last pixel shipped.',
      primary: 'See my work',
      secondary: 'Download CV',
      based: 'Based in Bali',
      scroll: 'Scroll',
      chips: ['UI/UX', 'Front-End', 'Bali · ID'],
      hint: 'Move your cursor',
    },
    about: {
      kicker: 'About',
      title: 'Design with a sharp eye, built with clean code.',
      body: [
        'I’m Yohana Oktavia, a visual UI/UX designer and front-end developer working as a freelancer from Bali, Indonesia.',
        'For years I’ve been designing interfaces and building websites that follow the latest design standards. I help turn a vision into a meaningful, usable product — and a sharp eye for how a product evolves helps me prioritise, iterate fast and deliver faster.',
      ],
      facts: [
        { k: 'Name', v: 'Yohana Oktavia' },
        { k: 'Based in', v: 'Bali, Indonesia' },
        { k: 'Focus', v: 'UI/UX · Front-End' },
        { k: 'Working since', v: '2016' },
      ],
      stats: [
        { n: '2016', l: 'Building digital products since' },
        { n: '12', l: 'Selected projects on this page' },
        { n: '3', l: 'Disciplines: research, design, code' },
      ],
    },
    experience: {
      kicker: 'Experience',
      title: 'Where I’ve worked & studied',
      workLabel: 'Work',
      eduLabel: 'Education',
      present: 'Present',
      work: [
        {
          role: 'UI/UX Designer', org: 'Independent Business Group', from: '2019', to: null,
          desc: 'Design interfaces for digital platforms and products, oversee multiple projects at the same time, and run digital research that improves product design.',
        },
        {
          role: 'Assistant Project Manager', org: 'Daksa Digital Teknologi', from: '2016', to: '2019',
          desc: 'Started as a front-end developer, took part in the company’s rebranding, developed marketing strategies and led projects to uncover their key drivers.',
        },
      ],
      edu: [
        { role: 'Bachelor’s Degree, Information Systems', org: 'STMIK Primakara Technopreneur Campus', from: '2014', to: '2018' },
        { role: 'Vocational High School, Multimedia Design', org: 'SMK IKOM Ganesha Udayana', from: '2010', to: '2013' },
      ],
      toolsLabel: 'Toolkit',
    },
    services: {
      kicker: 'Services',
      title: 'What I can do for you',
      items: [
        { t: 'Research', d: 'Understand what users really need, and turn those insights into a clear concept to build on.' },
        { t: 'Branding', d: 'High-quality visual identity — logos, websites, apps and digital content that feel like one brand.' },
        { t: 'Wireframe & Prototype', d: 'Blueprints, user flows, UI mock-ups and clickable prototypes to test ideas before they’re built.' },
        { t: 'Front-End Development', d: 'Responsive, fast websites built from the design — so what ships matches what was designed.' },
      ],
    },
    portfolio: {
      kicker: 'Portfolio',
      title: 'Selected work',
      filters: { all: 'All', brand: 'Brand', mobile: 'Mobile', website: 'Website' },
      tagNames: { brand: 'Brand', mobile: 'Mobile', website: 'Website' },
      view: 'View',
      close: 'Close',
    },
    contact: {
      kicker: 'Contact',
      title: 'Have a project in mind?',
      titleAccent: 'Let’s make it real.',
      body: 'I’m always open to freelance work when the right project comes along. Tell me about your idea — let’s see how I can help.',
      email: 'Email',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      copy: 'Copy',
      copied: 'Copied!',
      cv: 'Download CV',
    },
    footer: { rights: 'All rights reserved.', made: 'Designed & built in Bali', top: 'Back to top' },
    lang: 'Language',
  },

  id: {
    nav: { about: 'Tentang', experience: 'Pengalaman', services: 'Layanan', portfolio: 'Portofolio', contact: 'Kontak', cta: 'Ayo ngobrol' },
    hero: {
      status: 'Terbuka untuk proyek freelance',
      hello: 'Halo, saya',
      roles: ['UI/UX Designer', 'Front-End Developer', 'Traveler'],
      lead: 'Saya mengubah ide menjadi produk digital yang nyaman dan bermanfaat — dari wawancara pengguna pertama sampai piksel terakhir dirilis.',
      primary: 'Lihat karya saya',
      secondary: 'Unduh CV',
      based: 'Berbasis di Bali',
      scroll: 'Gulir',
      chips: ['UI/UX', 'Front-End', 'Bali · ID'],
      hint: 'Gerakkan kursor',
    },
    about: {
      kicker: 'Tentang',
      title: 'Desain dengan mata yang jeli, dibangun dengan kode yang rapi.',
      body: [
        'Saya Yohana Oktavia, UI/UX designer dan front-end developer yang bekerja sebagai freelancer dari Bali, Indonesia.',
        'Selama bertahun-tahun saya merancang antarmuka dan membangun website yang mengikuti standar desain terkini. Saya membantu mengubah visi menjadi produk yang bermakna dan mudah digunakan — dan kepekaan terhadap perkembangan produk membantu saya menentukan prioritas, beriterasi cepat, dan menyelesaikan pekerjaan lebih cepat.',
      ],
      facts: [
        { k: 'Nama', v: 'Yohana Oktavia' },
        { k: 'Lokasi', v: 'Bali, Indonesia' },
        { k: 'Fokus', v: 'UI/UX · Front-End' },
        { k: 'Berkarya sejak', v: '2016' },
      ],
      stats: [
        { n: '2016', l: 'Membangun produk digital sejak' },
        { n: '12', l: 'Proyek pilihan di halaman ini' },
        { n: '3', l: 'Bidang: riset, desain, kode' },
      ],
    },
    experience: {
      kicker: 'Pengalaman',
      title: 'Tempat saya bekerja & belajar',
      workLabel: 'Pekerjaan',
      eduLabel: 'Pendidikan',
      present: 'Sekarang',
      work: [
        {
          role: 'UI/UX Designer', org: 'Independent Business Group', from: '2019', to: null,
          desc: 'Merancang antarmuka platform dan produk digital, mengawasi beberapa proyek sekaligus, serta melakukan riset digital untuk meningkatkan desain produk.',
        },
        {
          role: 'Asisten Project Manager', org: 'Daksa Digital Teknologi', from: '2016', to: '2019',
          desc: 'Berawal sebagai front-end developer, ikut dalam rebranding perusahaan, menyusun strategi pemasaran, dan memimpin proyek untuk menemukan faktor kunci keberhasilannya.',
        },
      ],
      edu: [
        { role: 'Sarjana Sistem Informasi', org: 'STMIK Primakara Technopreneur Campus', from: '2014', to: '2018' },
        { role: 'SMK, Desain Multimedia', org: 'SMK IKOM Ganesha Udayana', from: '2010', to: '2013' },
      ],
      toolsLabel: 'Perangkat',
    },
    services: {
      kicker: 'Layanan',
      title: 'Yang bisa saya bantu',
      items: [
        { t: 'Riset', d: 'Memahami kebutuhan pengguna yang sebenarnya, lalu mengubah temuan itu menjadi konsep yang jelas.' },
        { t: 'Branding', d: 'Identitas visual berkualitas — logo, website, aplikasi, dan konten digital yang terasa sebagai satu brand.' },
        { t: 'Wireframe & Prototipe', d: 'Blueprint, user flow, mock-up UI, dan prototipe interaktif untuk menguji ide sebelum dibangun.' },
        { t: 'Front-End Development', d: 'Website responsif dan cepat yang dibangun langsung dari desain — hasil rilis sama dengan rancangannya.' },
      ],
    },
    portfolio: {
      kicker: 'Portofolio',
      title: 'Karya pilihan',
      filters: { all: 'Semua', brand: 'Brand', mobile: 'Mobile', website: 'Website' },
      tagNames: { brand: 'Brand', mobile: 'Mobile', website: 'Website' },
      view: 'Lihat',
      close: 'Tutup',
    },
    contact: {
      kicker: 'Kontak',
      title: 'Punya proyek yang ingin diwujudkan?',
      titleAccent: 'Ayo kita mulai.',
      body: 'Saya selalu terbuka untuk proyek freelance yang tepat. Ceritakan ide Anda — mari kita lihat bagaimana saya bisa membantu.',
      email: 'Email',
      whatsapp: 'WhatsApp',
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      copy: 'Salin',
      copied: 'Tersalin!',
      cv: 'Unduh CV',
    },
    footer: { rights: 'Hak cipta dilindungi.', made: 'Dirancang & dibangun di Bali', top: 'Kembali ke atas' },
    lang: 'Bahasa',
  },
}
