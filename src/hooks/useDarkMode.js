import { useEffect, useState } from "react"

export const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.theme === 'dark')
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    useEffect(() => {
        const root = window.document.documentElement
        const prev = isDarkMode ? 'light' : 'dark'
        root.classList.remove(prev)
        const next = isDarkMode ? 'dark' : 'light'
        root.classList.add(next)
        localStorage.setItem('theme', next)
    }, [isDarkMode])

    return [isDarkMode, toggleDarkMode]
}