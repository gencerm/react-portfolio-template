import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const DIMENSIONS = 30;
const TARGET_SELECTOR = ".link";
const MOVEMENT_SMOOTHING = 0.2;
const SCALE_SMOOTHING = 0.1;
const TARGET_SCALE = 2;
const TARGET_OPACITY = 0.5;
const BASE_OPACITY = 0.5;

const lerp = (start, end, amount) => start + (end - start) * amount;

const Cursor = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dotRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const rendered = useRef({ x: 0, y: 0, scale: 1 });
  const hovering = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return undefined;
    const el = dotRef.current;
    if (!el) return undefined;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const handleEnter = () => {
      hovering.current = true;
    };
    const handleLeave = () => {
      hovering.current = false;
    };

    const targets = document.querySelectorAll(TARGET_SELECTOR);
    targets.forEach((target) => {
      target.addEventListener("mouseenter", handleEnter);
      target.addEventListener("mouseleave", handleLeave);
    });
    window.addEventListener("mousemove", handleMouseMove);

    let rafId;
    const render = () => {
      rendered.current.x = lerp(rendered.current.x, mouse.current.x, MOVEMENT_SMOOTHING);
      rendered.current.y = lerp(rendered.current.y, mouse.current.y, MOVEMENT_SMOOTHING);
      rendered.current.scale = lerp(
        rendered.current.scale,
        hovering.current ? TARGET_SCALE : 1,
        SCALE_SMOOTHING
      );
      el.style.transform = `translate3d(${rendered.current.x - DIMENSIONS / 2}px, ${
        rendered.current.y - DIMENSIONS / 2
      }px, 0) scale(${rendered.current.scale})`;
      el.style.opacity = hovering.current ? TARGET_OPACITY : BASE_OPACITY;
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", handleEnter);
        target.removeEventListener("mouseleave", handleLeave);
      });
      cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="custom-cursor-wrapper">
      <svg
        ref={dotRef}
        height={DIMENSIONS}
        width={DIMENSIONS}
        viewBox={`0 0 ${DIMENSIONS} ${DIMENSIONS}`}
      >
        <circle
          cx={DIMENSIONS / 2}
          cy={DIMENSIONS / 2}
          r={DIMENSIONS / 4}
          fill={theme === "dark" ? "#fff" : "#000"}
        />
      </svg>
    </div>
  );
};

export default Cursor;
