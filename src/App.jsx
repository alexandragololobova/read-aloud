import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
import Reader from './components/Reader'
import PlayerBar from './components/PlayerBar'
import MobileLayout from './components/MobileLayout'
import PasteModal from './components/PasteModal'
import { useSpeech } from './hooks/useSpeech'
import { cleanPlainText } from './utils/cleanText'

function AppContent() {
    const [showPasteModal, setShowPasteModal] = useState(false)
    const [session, setSession] = useState({
        title: 'How to Do Great Work',
        content: null, // null means use the default hardcoded essay
    })

    const speech = useSpeech()

    const handleNewSession = (data) => {
        const cleaned = cleanPlainText(data.content)
        setSession({ title: data.title, content: cleaned })
        speech.loadText(cleaned)
        // Auto-play
        setTimeout(() => speech.play(), 300)
    }

    return (
        <>
            {/* Desktop */}
            <div className="hidden md:flex h-screen overflow-hidden font-body text-app-ink transition-colors duration-300">
                <Sidebar onNewSession={() => setShowPasteModal(true)} />
                <main className="flex-1 overflow-y-auto pb-32">
                    <Reader
                        title={session.title}
                        content={session.content}
                        currentSentence={speech.currentIndex}
                        sentences={speech.sentences}
                    />
                </main>
                <PlayerBar
                    isPlaying={speech.isPlaying}
                    onTogglePlay={speech.togglePlay}
                    onSkipForward={speech.skipForward}
                    onSkipBack={speech.skipBack}
                    rate={speech.rate}
                    onChangeRate={speech.changeRate}
                    voice={speech.voice}
                    availableVoices={speech.availableVoices}
                    onChangeVoice={speech.changeVoice}
                    currentIndex={speech.currentIndex}
                    sentences={speech.sentences}
                />
            </div>

            {/* Mobile */}
            <div className="md:hidden">
                <MobileLayout
                    title={session.title}
                    content={session.content}
                    currentSentence={speech.currentIndex}
                    sentences={speech.sentences}
                    isPlaying={speech.isPlaying}
                    onTogglePlay={speech.togglePlay}
                    onSkipForward={speech.skipForward}
                    onSkipBack={speech.skipBack}
                    rate={speech.rate}
                    onChangeRate={speech.changeRate}
                    voice={speech.voice}
                    availableVoices={speech.availableVoices}
                    onChangeVoice={speech.changeVoice}
                    onNewSession={() => setShowPasteModal(true)}
                />
            </div>

            {/* Paste modal */}
            <PasteModal
                isOpen={showPasteModal}
                onClose={() => setShowPasteModal(false)}
                onSubmit={handleNewSession}
            />
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