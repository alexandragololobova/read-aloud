import { createContext, useContext, useState, useEffect } from 'react'

const themes = {
    original: {
        name: 'Warm Paper',
        bg: '#FAF6F0',
        sidebar: '#F4EFE6',
        card: '#EAE2D5',
        border: '#E6DEC8',
        ink: '#1F1A17',
        muted: '#8C7A6B',
        accent: '#D97757',
        accentSecondary: '#D97757',
        accentGradient: null,
        followBox: 'rgba(217,119,87,0.15)',
        followBorder: 'rgba(217,119,87,0.3)',
        fontBody: "'Georgia', 'Times New Roman', serif",
        fontUI: "'Inter', system-ui, sans-serif",
        selectionColor: '#D9775730',
    },
    pastel: {
        name: 'Pastel Pinterest',
        bg: '#FBEFE8',
        sidebar: '#FAF3F7',
        card: '#FFFFFF',
        border: '#F3E1EB',
        ink: '#3B2A36',
        muted: '#4A3B47B3',
        accent: '#F4A6A1',
        accentSecondary: '#F8C8D6',
        accentGradient: 'linear-gradient(135deg, #F4A6A1 0%, #F8C8D6 100%)',
        followBox: 'linear-gradient(135deg, #F4A6A130, #F8C8D630)',
        followBorder: '#F8C8D6',
        fontBody: "'Fraunces', 'Georgia', serif",
        fontUI: "'Plus Jakarta Sans', system-ui, sans-serif",
        selectionColor: '#F4A6A130',
    },
    sage: {
        name: 'Sage Garden',
        bg: '#F2EEE3',
        sidebar: '#ECE6D8',
        card: '#FBF8F0',
        border: '#A7B8A133',
        ink: '#23302A',
        muted: '#5B6B5F',
        accent: '#6F8B6F',
        accentSecondary: '#C28868',
        accentGradient: null,
        followBox: 'linear-gradient(90deg, #CFE0C299, #E8D8A899)',
        followBorder: '#A7B8A1',
        fontBody: "'Cormorant Garamond', 'Georgia', serif",
        fontUI: "'Inter', system-ui, sans-serif",
        selectionColor: '#6F8B6F30',
    },
    lavender: {
        name: 'Lavender Dusk',
        bg: '#EFE7F1',
        sidebar: '#E5DCEE66',
        card: '#FAF6F2',
        border: '#C9B5D633',
        ink: '#2D2235',
        muted: '#3D2E47',
        accent: '#A8A8D0',
        accentSecondary: '#E8B89A',
        accentGradient: 'linear-gradient(135deg, #A8A8D0 0%, #E8B89A 100%)',
        followBox: 'linear-gradient(90deg, #F4C8B640, #DCC4E440)',
        followBorder: '#A8A8D0',
        fontBody: "'Newsreader', 'Georgia', serif",
        fontUI: "'Plus Jakarta Sans', system-ui, sans-serif",
        selectionColor: '#A8A8D030',
    },
}

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [themeKey, setThemeKey] = useState(() => {
        return localStorage.getItem('read-aloud-theme') || 'original'
    })

    useEffect(() => {
        localStorage.setItem('read-aloud-theme', themeKey)
        const t = themes[themeKey]
        const root = document.documentElement
        root.style.setProperty('--font-family-body', t.fontBody)
        root.style.setProperty('--font-family-ui', t.fontUI)
        root.style.setProperty('--color-app-bg', t.bg)
        root.style.setProperty('--color-app-sidebar', t.sidebar)
        root.style.setProperty('--color-app-card', t.card)
        root.style.setProperty('--color-app-border', t.border)
        root.style.setProperty('--color-app-ink', t.ink)
        root.style.setProperty('--color-app-muted', t.muted)
        root.style.setProperty('--color-app-accent', t.accent)
        root.style.setProperty('--color-app-accent-secondary', t.accentSecondary)
        root.style.setProperty('--follow-box', t.followBox)
        root.style.setProperty('--follow-border', t.followBorder)
        root.style.setProperty('--selection-color', t.selectionColor)
    }, [themeKey])

    const value = {
        theme: themes[themeKey],
        themeKey,
        setThemeKey,
        themesList: Object.keys(themes).map(k => ({ key: k, name: themes[k].name })),
    }

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    return useContext(ThemeContext)
}