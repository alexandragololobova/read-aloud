import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
import Reader from './components/Reader'
import PlayerBar from './components/PlayerBar'
import MobileLayout from './components/MobileLayout'

function AppContent() {
    return (
        <>
            {/* Desktop — md and up */}
            <div className="hidden md:flex h-screen overflow-hidden font-body text-app-ink transition-colors duration-300">
                <Sidebar />
                <main className="flex-1 overflow-y-auto pb-32">
                    <Reader />
                </main>
                <PlayerBar />
            </div>

            {/* Mobile — below md */}
            <div className="md:hidden">
                <MobileLayout />
            </div>
        </>
    )
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    )
}