import { ThemeProvider, useTheme } from './context/ThemeContext'
import ThemeSwitcher from './components/ThemeSwitcher'

function AppContent() {
    const { theme } = useTheme()
    return (
        <div
            className="min-h-screen font-body text-app-ink transition-colors duration-300"
        >
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-4xl font-semibold mb-4 font-ui">Read Aloud</h1>
                <p className="text-lg text-app-muted mb-8">Listen to anything you read.</p>

                <ThemeSwitcher />

                <div className="mt-8 p-6 rounded-3xl bg-app-card border border-app-border shadow-sm">
                    <h2 className="text-2xl font-semibold mb-2">Sample paragraph</h2>
                    <p className="mb-4">
                        If you collected lists of techniques for doing great work in a lot of different fields,
                        what would the intersection look like? I decided to find out by making it.
                    </p>
                    <p
                        className="p-3 rounded-xl transition-all"
                        style={{
                            background: theme.followBox || 'rgba(0,0,0,0.05)',
                            border: `1px solid ${theme.followBorder || 'transparent'}`,
                        }}
                    >
                        In practice you don't have to worry much about the third criterion.
                        Ambitious people are if anything too conservative about it.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    )
}