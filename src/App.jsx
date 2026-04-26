import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
import Reader from './components/Reader'

function AppContent() {
    return (
        <div className="flex h-screen overflow-hidden font-body text-app-ink transition-colors duration-300">
            <Sidebar />

            <main className="flex-1 overflow-y-auto">
                <Reader />
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