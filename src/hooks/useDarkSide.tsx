import { useState, useEffect, Dispatch, SetStateAction } from "react";

type Theme = "dark" | "light";

export default function useDarkSide(): [Theme, Dispatch<SetStateAction<Theme>>] {
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "light");

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const colorTheme: Theme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
}
