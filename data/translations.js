// UI chrome (JSX'e gömülü sabit metinler) için sözlük — nav etiketleri,
// bölüm başlıkları, buton metinleri, boş-durum mesajları.
// data/portfolio.json'daki kullanıcı içeriğinden farkı: bu dosya /edit
// GUI'siyle değil, elle (veya asistan tarafından) düzenlenir.
//
// Kullanım: const { t } = useLanguage(); t("nav.work")
// Interpolasyon: t("footer.copyright", { year, name }) -> "{year}"/"{name}" değişir.

const translations = {
  // Header / nav etiketleri
  "nav.home": { tr: "Ana Sayfa", en: "Home" },
  "nav.work": { tr: "Çalışmalar", en: "Work" },
  "nav.about": { tr: "Hakkımda", en: "About" },
  "nav.blog": { tr: "Blog", en: "Blog" },
  "nav.bio": { tr: "Biyografi", en: "Bio" },
  "nav.contact": { tr: "İletişim", en: "Contact" },
  "languageToggle.ariaLabel": { tr: "Dil", en: "Language" },

  // Ana sayfa bölüm başlıkları
  "home.workHeading": { tr: "Çalışmalarım.", en: "Work." },
  "home.servicesHeading": { tr: "Hizmetlerim.", en: "Services." },
  "home.aboutHeading": { tr: "Hakkımda.", en: "About." },

  // Bio sayfası bölüm başlıkları
  "bio.experienceHeading": { tr: "Deneyim", en: "Experience" },
  "bio.educationHeading": { tr: "Eğitim", en: "Education" },
  "bio.skillsHeading": { tr: "Yetenekler", en: "Skills" },
  "bio.toolsHeading": { tr: "Araçlar", en: "Tools" },
  "bio.expertiseHeading": { tr: "Uzmanlık Alanları", en: "Expertise" },
  "bio.servicesHeading": { tr: "Hizmetler", en: "Services" },

  // Work / kategori sayfası
  "work.back": { tr: "← Geri", en: "← Back" },
  "work.noWorksYet": {
    tr: "Bu kategoride henüz çalışma yok.",
    en: "No works in this category yet.",
  },
  // CategoryCard ve work/[category].js'de aynı ifade — ortak anahtar
  "worksCount": { tr: "{n} çalışma", en: "{n} works" },

  // CategoryCard
  "categoryCard.noContentYet": { tr: "Henüz içerik yok", en: "No content yet" },

  // Footer
  "footer.contactHeading": { tr: "İletişim.", en: "Contact." },
  "footer.readyToConnect": {
    tr: "Birlikte çalışmaya hazır mısınız? Hadi bağlantı kuralım!",
    en: "Ready to work together? Let's connect!",
  },
  "footer.copyright": {
    tr: "© {year} {name}. Tüm hakları saklıdır.",
    en: "© {year} {name}. All rights reserved.",
  },
  "footer.attribution": {
    tr: "Chetan Verma'nın React Portfolio Template'inden ilham alınmıştır.",
    en: "Inspired by Chetan Verma's React Portfolio Template.",
  },

  // Footer "Get in Touch" butonu + ContactModal başlığı/aria-label'ı — ortak
  "common.getInTouch": { tr: "İletişime Geç", en: "Get in Touch" },
  // ContactModal + Lightbox kapatma butonu — ortak
  "common.close": { tr: "Kapat", en: "Close" },

  // ContactModal
  "contactModal.sendEmailDescription": {
    tr: "Bana bir e-posta gönderin, en kısa sürede dönüş yapayım.",
    en: "Send an email and I'll get back to you as soon as possible.",
  },
  "contactModal.sendEmail": { tr: "E-posta Gönder", en: "Send Email" },

  // Lightbox
  "lightbox.visit": { tr: "Ziyaret Et →", en: "Visit →" },
};

export default translations;
