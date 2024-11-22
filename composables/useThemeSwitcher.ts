import { useTheme } from "vuetify";

export function useThemeSwitcher() {
  const theme = useTheme();

  const updateTheme = () => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    theme.global.name.value = prefersDark ? "dark" : "light";
  };

  // Listen to changes in the system's theme preference
  const watchThemeChange = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateTheme);
  };

  return { updateTheme, watchThemeChange };
}
