import React from "react";

// CSS 3D flip kartı — fare üzerine gelince 180° döner
// frontSrc: ön yüz görseli, backSrc: arka yüz görseli
const FlipCard = ({ frontSrc, backSrc, title, description }) => {
  return (
    <div className="overflow-hidden rounded-lg p-2 laptop:p-4">
      {/*
        [perspective:1000px] → 3D derinlik efekti için gerekli.
        group → hover durumunu çocuk elementlere bildirmek için Tailwind'in "group" sistemi.
        group-hover ile arka yüzü "görünmez ebeveyn"in hover'ına göre döndüreceğiz.
      */}
      <div className="group [perspective:1000px] cursor-pointer">

        {/*
          Dönen kart gövdesi.
          [transform-style:preserve-3d] → ön/arka yüzlerin 3D uzayda durmasını sağlar.
          transition-transform duration-700 → 700ms smooth geçiş.
          group-hover:[transform:rotateY(180deg)] → ebeveyne hover gelince bu element döner.
        */}
        <div
          className="relative w-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]"
          style={{ height: "420px" }}
        >
          {/* Ön yüz — varsayılan konumu rotateY(0deg) */}
          <div className="absolute inset-0 rounded-lg overflow-hidden [backface-visibility:hidden] bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
            <img
              src={frontSrc}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Arka yüz — baştan 180° dönük, hover'da karta bakıyor */}
          <div className="absolute inset-0 rounded-lg overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
            <img
              src={backSrc}
              alt={`${title} arka`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <h1 className="mt-5 text-3xl font-medium">{title}</h1>
      <h2 className="text-xl opacity-50">{description}</h2>
    </div>
  );
};

export default FlipCard;
