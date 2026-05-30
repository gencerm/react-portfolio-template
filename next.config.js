/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Tarayıcının MIME türünü tahmin etmesini engeller (MIME sniffing koruması)
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Sayfanın başka bir sitede iframe içinde gösterilmesini engeller (clickjacking koruması)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },

  // Eski tarayıcılarda XSS filtresini zorla
  { key: "X-XSS-Protection", value: "1; mode=block" },

  // Referrer bilgisini dış sitelere sızdırma
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Kamera/mikrofon/konum gibi tarayıcı özelliklerine erişimi kısıtla
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },

  // Content Security Policy: hangi kaynaklardan içerik yüklenebileceğini tanımlar
  // 'unsafe-inline' → Tailwind ve GSAP inline stil/script gerektirir
  // fonts.googleapis.com + fonts.gstatic.com → Google Fonts
  // data: → base64 görseller için
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Tüm sayfalara uygula
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig
