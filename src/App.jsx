import { ThemeProvider } from './context/ThemeContext'
import ThemeSwitcher from './components/ThemeSwitcher'
import Sidebar from './components/Sidebar'

function AppContent() {
    return (
        <div className="flex h-screen overflow-hidden font-body text-app-ink transition-colors duration-300">
            <Sidebar />

            {/* Reader area — will be replaced with Reader component next */}
            <main className="flex-1 overflow-y-auto p-12">
                <ThemeSwitcher />
                <p className="text-app-muted mt-4 font-ui">Reader will go here</p>
            </main>
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