import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";
import { useLanguage } from "../context/LanguageContext";
// Data
import data from "../data/portfolio.json";
const { name, showBio, bio } = data;

const Bio = () => {
  const router = useRouter();
  const theme = useTheme();
  const { lang, t } = useLanguage();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    if (!showBio) {
      router.push("/");
    }
  }, []);
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => router.push("/edit")} type={"primary"}>
            Edit Bio
          </Button>
        </div>
      )}
      {data.showCursor && <Cursor />}
      <div
        className={`container mx-auto mb-10 ${
          data.showCursor && "cursor-none"
        }`}
      >
        <Header isBlog />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className={`w-full ${
                mount && theme.theme === "dark" ? "bg-slate-800" : "bg-gray-50"
              } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
            >
              <h1 className="text-3xl font-bold">{name}</h1>
              <h2 className="text-xl mt-5">{bio.tagline[lang]}</h2>
              <h2 className="w-4/5 text-xl mt-5 opacity-50">
                {bio.description[lang]}
              </h2>
              <div className="mt-2">
                <Socials />
              </div>
              {bio.showExperiences && (
              <div className="mt-5">
                <h1 className="text-2xl font-bold">{t("bio.experienceHeading")}</h1>

                {bio.experiences.map(
                  ({ id, dates, type, position, bullets }) => (
                    <ProjectResume
                      key={id}
                      dates={dates}
                      type={type}
                      position={position}
                      bullets={bullets}
                    ></ProjectResume>
                  )
                )}
              </div>
              )}
              <div className="mt-5">
                <h1 className="text-2xl font-bold">{t("bio.educationHeading")}</h1>
                {bio.education.map((edu) => (
                  <div className="mt-2" key={edu.id}>
                    <h2 className="text-lg">{edu.universityName[lang]}</h2>
                    <h3 className="text-sm opacity-75">{edu.universityDate}</h3>
                    <p className="text-sm mt-2 opacity-50">
                      {edu.universityPara[lang]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">{t("bio.skillsHeading")}</h1>
                <div className="flex mob:flex-col desktop:flex-row justify-between">
                  {bio.tools && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">{t("bio.toolsHeading")}</h2>
                      <ul className="list-disc">
                        {bio.tools.map((tool, index) => (
                          <li key={index} className="ml-5 py-2">
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {bio.expertise && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">{t("bio.expertiseHeading")}</h2>
                      <ul className="list-disc">
                        {bio.expertise[lang].map((item, index) => (
                          <li key={index} className="ml-5 py-2">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {bio.services && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">{t("bio.servicesHeading")}</h2>
                      <ul className="list-disc">
                        {bio.services[lang].map((service, index) => (
                          <li key={index} className="ml-5 py-2">
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Bio;
