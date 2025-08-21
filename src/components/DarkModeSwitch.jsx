"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const TRANSITION_DURATION = 600; // ms

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

    // Координаты центра кнопки
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Радиус для полного экрана
    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);

    // Начало анимации (маленький круг)
    setCircleStyle({
      clipPath: `circle(0px at ${x}px ${y}px)`,
      background: currentTheme === "dark" ? "#fff" : "#000",
    });
    setAnimating(true);

    // Следующий кадр → расширяем круг
    requestAnimationFrame(() => {
      setCircleStyle({
        clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
        background: currentTheme === "dark" ? "#fff" : "#000",
        transition: `clip-path ${TRANSITION_DURATION}ms ease-in-out`,
      });
    });

    // По окончании → меняем тему
    setTimeout(() => {
      setTheme(currentTheme === "dark" ? "light" : "dark");
      setAnimating(false);
    }, TRANSITION_DURATION);
  };

  if (!mounted) return null;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-110 transition"
      >
        {currentTheme === "dark" ? (
          <MdLightMode className='text-xl cursor-pointer hover:text-amber-500' />
        ) : (
          <MdDarkMode className='text-xl cursor-pointer hover:text-amber-500' />
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
