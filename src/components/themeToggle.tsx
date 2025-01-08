import { useState, useEffect } from "react";
import "../styles/themeToggle.scss";

export default function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const setTheme = (themeName: string) => {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
  };

  const toggleTheme = (): void => {
    const newTheme = isDarkMode ? "theme-light" : "theme-dark";
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const hours = new Date().getHours();

    if (savedTheme) {
      setIsDarkMode(savedTheme === "theme-dark");
      setTheme(savedTheme);
    } else {
      const themeToSet =
        hours >= 18 || hours < 6 || prefersDarkScheme
          ? "theme-dark"
          : "theme-light";
      setIsDarkMode(themeToSet === "theme-dark");
      setTheme(themeToSet);
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? "theme-dark" : "theme-light";
      setTheme(newTheme);
      setIsDarkMode(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <label id="switch" className="switch">
      <input
        type="checkbox"
        onChange={toggleTheme}
        id="slider"
        checked={isDarkMode}
      />
      <span className="slider round"></span>
    </label>
  );
}
