"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const toggleDarkMode = () => {
    if (theme === "dark") {
      setTheme("light");
      setIsDarkMode(false);
    } else {
      setTheme("dark");
      setIsDarkMode(true);
    }
  };
  return (
    <div>
      <DarkModeSwitch
        className="w-4 lg:w-8"
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={120}
      />
    </div>
  );
}
