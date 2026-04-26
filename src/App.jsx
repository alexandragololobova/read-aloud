import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
import Reader from './components/Reader'
import PlayerBar from './components/PlayerBar'
import MobileLayout from './components/MobileLayout'
import PasteModal from './components/PasteModal'
import { useSpeech } from './hooks/useSpeech'
import { useAutoSave } from './hooks/useAutoSave'
import { cleanPlainText } from './utils/cleanText'

function AppContent() {
    const [showPasteModal, setShowPasteModal] = useState(false)
    const [session, setSession] = useState({
        title: 'How to Do Great Work',
        content: null,
    })

    const speech = useSpeech()
    const { getSavedDraft, clearDraft } = useAutoSave({
        title: session.title,
        content: session.content,
        currentIndex: speech.currentIndex,
        isPlaying: speech.isPlaying,
        rate: speech.rate,
        voiceName: speech.voice?.name || null,
    })

    // Restore draft on first mount
    useEffect(() => {
        const draft = getSavedDraft()
        if (!draft || !draft.content) return

        setSession({ title: draft.title, content: draft.content })
        speech.loadText(draft.content)

        if (draft.rate) speech.changeRate(draft.rate)

        if (draft.currentIndex >= 0) {
            speech.jumpTo(draft.currentIndex)
        }

        // Restore voice — may need to wait for voices to load
        if (draft.voiceName) {
            const trySetVoice = () => {
                const voices = window.speechSynthesis.getVoices()
                const savedVoice = voices.find(v => v.name === draft.voiceName)
                if (savedVoice) {
                    speech.changeVoice(savedVoice)
                } else if (voices.length === 0) {
                    setTimeout(trySetVoice, 200)
                }
            }
            trySetVoice()
        }
    }, [])

    const handleNewSession = (data) => {
        clearDraft()
        const cleaned = cleanPlainText(data.content)
        speech.stop()
        speech.changeRate(1)
        setSession({ title: data.title, content: cleaned })
        // Small delay to ensure cancel completes before loading new text
        setTimeout(() => {
            speech.loadText(cleaned)
            setTimeout(() => speech.play(), 200)
        }, 50)
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