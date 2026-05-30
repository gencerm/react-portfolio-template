import { useEffect } from "react";
import { createPortal } from "react-dom";
import data from "../../data/portfolio.json";

const ContactModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  // Email linkini socials'dan al, yoksa fallback
  const emailSocial = data.socials.find((s) => s.title === "Email");
  const emailHref = emailSocial?.link || "mailto:";

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <div
        className="relative z-10 w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl animate-page-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Get in Touch"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 opacity-40 hover:opacity-100 text-2xl leading-none transition-opacity"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-2xl font-medium mb-2">Get in Touch</h2>
        <p className="opacity-50 text-sm mb-6">
          {"Send an email and I'll get back to you as soon as possible."}
        </p>

        <a
          href={emailHref}
          className="block w-full text-center py-3 px-6 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:opacity-80 transition-opacity"
        >
          Send Email
        </a>

        {/* Sosyal linkler */}
        <div className="mt-6 flex justify-center gap-4">
          {data.socials
            .filter((s) => !s.hidden && s.link && s.title !== "Email")
            .map((s) => (
              <a
                key={s.id}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              >
                {s.title}
              </a>
            ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;
