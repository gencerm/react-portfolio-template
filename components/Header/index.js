import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
// Local Data
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name, showBlog, showResume } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && theme === "dark" ? "/images/darkMode_logo.svg" : "/images/logo.svg";

  return (
    <>
      {/* Mobile Header */}
      <div className="block tablet:hidden sticky top-3 z-10 mx-3 mt-3 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-black/80 border border-gray-200/30 dark:border-white/10 dark:text-white shadow-sm">
        <Popover>
          {({ open }) => (
            <>
              <div className="flex items-center justify-between px-4 py-3">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => router.push("/")}
                >
                  <img
                    className="h-8 logo-glow"
                    src={logoSrc}
                    alt="Logo"
                  />
                  <span className="font-medium text-sm tablet:text-base">
                    {name}.
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {data.darkMode && (
                    <Button
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    >
                      <img
                        className="h-6"
                        src={`/images/${
                          theme === "dark" ? "moon.svg" : "sun.svg"
                        }`}
                      />
                    </Button>
                  )}

                  <Popover.Button>
                    <img
                      className="h-5"
                      src={`/images/${
                        !open
                          ? theme === "dark"
                            ? "menu-white.svg"
                            : "menu.svg"
                          : theme === "light"
                          ? "cancel.svg"
                          : "cancel-white.svg"
                      }`}
                    />
                  </Popover.Button>
                </div>
              </div>

              <Popover.Panel
                className={`absolute left-0 right-0 z-10 px-4 py-2 rounded-b-2xl ${
                  theme === "dark"
                    ? "bg-black/80 backdrop-blur-md"
                    : "bg-white/80 backdrop-blur-md"
                } border-t border-gray-200/30 dark:border-white/10 shadow-lg`}
              >
                {!isBlog ? (
                  <div className="grid grid-cols-1 py-2">
                    <Button onClick={handleWorkScroll}>Work</Button>
                    <Button onClick={handleAboutScroll}>About</Button>
                    {showBlog && (
                      <Button onClick={() => router.push("/blog")}>Blog</Button>
                    )}
                    {showResume && (
                      <Button onClick={() => router.push("/resume")}>
                        Resume
                      </Button>
                    )}
                    <Button
                      onClick={() => window.open("mailto:esrakarademirgencer@gmail.com")}
                    >
                      Contact
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 py-2">
                    <Button onClick={() => router.push("/")}>Home</Button>
                    {showBlog && (
                      <Button onClick={() => router.push("/blog")}>Blog</Button>
                    )}
                    {showResume && (
                      <Button onClick={() => router.push("/resume")}>
                        Resume
                      </Button>
                    )}
                    <Button
                      onClick={() => window.open("mailto:esrakarademirgencer@gmail.com")}
                    >
                      Contact
                    </Button>
                  </div>
                )}
              </Popover.Panel>
            </>
          )}
        </Popover>
      </div>

      {/* Desktop Header */}
      <div className="hidden tablet:flex flex-row items-center justify-between sticky top-4 z-10 px-5 py-2 mx-4 mt-4 rounded-2xl backdrop-blur-md bg-white/60 dark:bg-black/80 border border-gray-200/30 dark:border-white/10 dark:text-white shadow-sm">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img
            className="h-24 logo-glow"
            src={logoSrc}
            alt="Logo"
          />
          <span className="font-medium text-base">
            {name}.
          </span>
        </div>

        {!isBlog ? (
          <div className="flex items-center">
            <Button onClick={handleWorkScroll}>Work</Button>
            <Button onClick={handleAboutScroll}>About</Button>
            {showBlog && (
              <Button onClick={() => router.push("/blog")}>Blog</Button>
            )}
            {showResume && (
              <Button
                onClick={() => router.push("/resume")}
                classes="first:ml-1"
              >
                Resume
              </Button>
            )}
            <Button onClick={() => window.open("mailto:esrakarademirgencer@gmail.com")}>
              Contact
            </Button>
            {mounted && theme && data.darkMode && (
              <Button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <img
                  className="h-6"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex items-center">
            <Button onClick={() => router.push("/")}>Home</Button>
            {showBlog && (
              <Button onClick={() => router.push("/blog")}>Blog</Button>
            )}
            {showResume && (
              <Button
                onClick={() => router.push("/resume")}
                classes="first:ml-1"
              >
                Resume
              </Button>
            )}
            <Button onClick={() => window.open("mailto:esrakarademirgencer@gmail.com")}>
              Contact
            </Button>
            {mounted && theme && data.darkMode && (
              <Button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <img
                  className="h-6"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                />
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
