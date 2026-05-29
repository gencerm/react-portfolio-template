import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import WorkCard from "../../components/WorkCard";
import FlipCard from "../../components/FlipCard";
import Lightbox from "../../components/Lightbox";
import Cursor from "../../components/Cursor";
import data from "../../data/portfolio.json";

export default function CategoryPage({ category, projects }) {
  const router = useRouter();

  // Hangi proje lightbox'ta açık? null = kapalı
  // State burada (üst component'te) çünkü hem WorkCard hem Lightbox bunu kullanıyor
  const [lightboxProject, setLightboxProject] = useState(null);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{category.title} — {data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={() => router.push("/#work")}
          handleAboutScroll={() => router.push("/#about")}
        />

        <div className="mt-10 laptop:mt-20 p-2 laptop:p-0">
          <button
            onClick={() => router.back()}
            className="opacity-50 hover:opacity-100 transition-opacity text-sm mb-8 flex items-center gap-1"
          >
            ← Back
          </button>

          <h1 className="text-3xl tablet:text-5xl laptop:text-6xl font-medium">
            {category.title}.
          </h1>
          <p className="mt-2 opacity-50">{projects.length} works</p>

          {projects.length === 0 ? (
            <p className="mt-20 opacity-30 text-center">
              No works in this category yet.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
              {projects.map((project) =>
                project.flipSrc ? (
                  <FlipCard
                    key={project.id}
                    frontSrc={project.imageSrc}
                    backSrc={project.flipSrc}
                    title={project.title}
                    description={project.description}
                  />
                ) : (
                  <WorkCard
                    key={project.id}
                    img={project.imageSrc}
                    name={project.title}
                    description={project.description}
                    // URL varsa dışarı aç, yoksa lightbox'ı aç
                    onClick={() =>
                      project.url
                        ? window.open(project.url)
                        : setLightboxProject(project)
                    }
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* lightboxProject null değilse Lightbox render et */}
      {lightboxProject && (
        <Lightbox
          project={lightboxProject}
          onClose={() => setLightboxProject(null)}
        />
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = data.categories.map((cat) => ({
    params: { category: cat.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const category = data.categories.find((c) => c.slug === params.category);
  const projects = data.projects.filter((p) => p.category === params.category);
  if (!category) return { notFound: true };
  return { props: { category, projects } };
}
