import { useState } from "react"
import { DarkModeSwitch } from "react-toggle-dark-mode"
import useDarkSide from "../../../hooks/useDarkSide"

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide()
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === "light" ? true : false)

  const toggleDarkMode = (checked: boolean) => {
    const isDark = checked ? true : false
    setTheme(isDark ? "dark" : "light")
    setDarkSide(isDark)
  }

  return (
    <>
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={30} />
    </>
  )
}
