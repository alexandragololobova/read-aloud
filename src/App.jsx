import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
import Reader from './components/Reader'
import PlayerBar from './components/PlayerBar'

function AppContent() {
    return (
        <div className="flex h-screen overflow-hidden font-body text-app-ink transition-colors duration-300">
            <Sidebar />

            <main className="flex-1 overflow-y-auto pb-32">
                <Reader />
            </main>

            <PlayerBar />
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