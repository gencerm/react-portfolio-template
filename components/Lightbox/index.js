import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../../context/LanguageContext";

// Lightbox: blur overlay + ortalanmış tam görseli gösteren modal
// project: { imageSrc, title, description, url } — title/description {tr,en}
// onClose: dışarıya kapanma sinyali veren fonksiyon
const Lightbox = ({ project, onClose }) => {
  const { lang, t } = useLanguage();
  const title = project.title[lang];
  const description = project.description?.[lang];

  // Escape tuşuyla kapat
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Cleanup: lightbox kapanınca listener'ı kaldır
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Scroll'u kilitle (arka sayfa kaymasın)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // createPortal → bu JSX'i <body>'nin direkt altına render et,
  // böylece hiçbir parent'ın z-index/overflow'u bizi etkilemez
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 tablet:p-10"
      onClick={onClose}
    >
      {/* Blur'lu arka plan overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Modal içerik — tıklamayı overlay'e geçirme */}
      <div
        className="relative z-10 flex flex-col items-center animate-page-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Kapat butonu */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white text-3xl leading-none transition-colors"
          aria-label={t("common.close")}
        >
          ✕
        </button>

        {/* mp4 ise video oynatıcı, değilse görsel */}
        {project.imageSrc && project.imageSrc.endsWith(".mp4") ? (
          <video
            src={project.imageSrc}
            className="max-h-[80vh] max-w-full rounded-lg shadow-2xl"
            controls
            autoPlay
            playsInline
          />
        ) : (
          <img
            src={project.imageSrc}
            alt={title}
            className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
          />
        )}

        {/* Başlık ve açıklama */}
        <div className="mt-4 text-center text-white">
          <h2 className="text-xl font-medium">{title}</h2>
          {description && (
            <p className="mt-1 opacity-60 text-sm">{description}</p>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block px-5 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/80 transition-colors"
            >
              {t("lightbox.visit")}
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Lightbox;
