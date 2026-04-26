import { useTheme } from '../context/ThemeContext'

export default function ThemeSwitcher() {
    const { themeKey, setThemeKey, themesList } = useTheme()

    return (
        <div className="flex flex-wrap gap-1.5">
            {themesList.map(t => (
                <button
                    key={t.key}
                    onClick={() => setThemeKey(t.key)}
                    className={`px-2.5 py-1 rounded-full border transition-colors text-[11px] font-ui
            ${themeKey === t.key
                        ? 'bg-app-accent text-white border-app-accent'
                        : 'bg-transparent text-app-muted border-app-border hover:bg-app-card'
                    }`}
                >
                    {t.name}
                </button>
            ))}
        </div>
    )
}