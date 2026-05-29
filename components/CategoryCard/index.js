import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CategoryCard = ({ slug, title, projects }) => {
  const router = useRouter();

  // mp4 dosyalarını önizlemeden hariç tut — tarayıcı video thumbnail gösteremiyor
  const previewProjects = projects.filter(
    (p) => !p.imageSrc?.endsWith(".mp4")
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (previewProjects.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % previewProjects.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [previewProjects.length]);

  return (
    <div
      className="overflow-hidden rounded-lg p-2 laptop:p-4 cursor-pointer link"
      onClick={() => router.push(`/work/${slug}`)}
    >
      <div className="relative rounded-lg overflow-hidden h-40 laptop:h-52">
        {previewProjects.length === 0 ? (
          <div className="h-full w-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="opacity-30 text-sm">No content yet</span>
          </div>
        ) : (
          previewProjects.map((project, index) => (
            <img
              key={project.id}
              src={project.imageSrc}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
              style={{ opacity: index === activeIndex ? 1 : 0 }}
            />
          ))
        )}

        {previewProjects.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {previewProjects.map((_, index) => (
              <span
                key={index}
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <h1 className="mt-5 text-3xl font-medium">{title}</h1>
      <h2 className="text-xl opacity-50">{projects.length} works</h2>
    </div>
  );
};

export default CategoryCard;
