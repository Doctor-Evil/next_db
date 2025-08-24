"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const TRANSITION_DURATION = 700; // ms

export default function DarkModeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [circleStyle, setCircleStyle] = useState({});
  const buttonRef = useRef(null);

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    if (!buttonRef.current) return;

    // Центр кнопки
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Радиус для покрытия всего экрана
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);

    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    const bgColor = currentTheme === "dark" ? "#fff" : "#000";

    // Стартовое состояние круга
    setCircleStyle({
      clipPath: `circle(0px at ${x}px ${y}px)`,
      background: bgColor,
    });
    setAnimating(true);

    // Запускаем анимацию
    requestAnimationFrame(() => {
      setCircleStyle({
        clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
        background: bgColor,
        transition: `clip-path ${TRANSITION_DURATION}ms ease-in-out`,
      });
    });

    // По завершении анимации переключаем тему
    setTimeout(() => {
      setTheme(nextTheme);
      setAnimating(false);
    }, TRANSITION_DURATION);
  };

  if (!mounted) return null;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition hover:scale-110 cursor-pointer"
      >
        {currentTheme === "dark" ? (
          <MdLightMode className="text-xl transition-colors duration-500 hover:text-amber-500 text-yellow-400" />
        ) : (
          <MdDarkMode className="text-xl transition-colors duration-500 hover:text-amber-500 text-gray-900" />
        )}
      </button>

      {animating && (
        <div
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={circleStyle}
        />
      )}
    </>
  );
}
