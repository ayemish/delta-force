"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const fine = window.matchMedia("(any-pointer:fine)").matches;
    if (!fine) return;

    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    const dot = document.createElement("div");
    dot.id = "gold-cursor";
    document.body.appendChild(dot);

    let lastTrail = 0;

    const handleMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      if (reduce) return;

      const now = Date.now();
      if (now - lastTrail > 38) {
        lastTrail = now;
        const t = document.createElement("div");
        t.className = "gold-trail";
        t.style.left = `${e.clientX}px`;
        t.style.top = `${e.clientY}px`;
        document.body.appendChild(t);

        let s = 1;
        const fade = setInterval(() => {
          s -= 0.12;
          if (s <= 0) {
            clearInterval(fade);
            t.remove();
            return;
          }
          t.style.opacity = (s * 0.5).toFixed(2);
          t.style.transform = `translate(-50%, -50%) scale(${s})`;
        }, 22);
      }
    };

    const handleDown = () => dot.classList.add("tap");
    const handleUp = () => dot.classList.remove("tap");
    const handleLeave = () => {
      dot.style.opacity = "0";
    };
    const handleEnter = () => {
      dot.style.opacity = "1";
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      dot.remove();
      document.querySelectorAll(".gold-trail").forEach((el) => el.remove());
    };
  }, []);

  return null;
}
