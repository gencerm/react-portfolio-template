import React from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaRss,
  FaAddressCard,
} from "react-icons/fa";

import yourData from "../../data/portfolio.json";

// portfolio.json'daki "title" değeri → hangi ikon gösterilsin
// Yeni bir sosyal eklemek istersen buraya bir satır eklemen yeterli
const ICON_MAP = {
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  Twitter: FaTwitter,
  Email: FaEnvelope,
  Blog: FaRss,
  "Digital Business Card": FaAddressCard,
};

const Socials = ({ className }) => {
  return (
    <div className={`${className} flex flex-wrap gap-4 mt-2`}>
      {yourData.socials.map((social) => {
        // hidden:true olan girişleri atla (silmeden gizlemek için)
        if (social.hidden) return null;

        // title'a karşılık gelen ikon component'ini bul
        // Bulamazsa null döner ve o buton render edilmez
        const Icon = ICON_MAP[social.title];
        if (!Icon) return null;

        return (
          <a
            key={social.id}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.title}
            className="p-2 rounded-full border border-gray-300 dark:border-white/20 hover:border-gray-500 dark:hover:border-white/60 transition-colors duration-200"
          >
            <Icon size={22} />
          </a>
        );
      })}
    </div>
  );
};

export default Socials;
