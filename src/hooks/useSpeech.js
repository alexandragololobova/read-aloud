import { useState, useRef, useCallback, useEffect } from 'react'
import { splitSentences } from '../utils/sentenceSplitter'

export function useSpeech() {
    const [sentences, setSentences] = useState([])
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [isPlaying, setIsPlaying] = useState(false)
    const [rate, setRate] = useState(1)
    const [voice, setVoice] = useState(null)
    const [availableVoices, setAvailableVoices] = useState([])

    const utteranceRef = useRef(null)
    const sentencesRef = useRef([])
    const rateRef = useRef(1)
    const voiceRef = useRef(null)
    const activeRef = useRef(false)

    // Keep refs in sync
    useEffect(() => { sentencesRef.current = sentences }, [sentences])
    useEffect(() => { rateRef.current = rate }, [rate])
    useEffect(() => { voiceRef.current = voice }, [voice])

    // Load available voices
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices()
            setAvailableVoices(voices)
            if (!voiceRef.current && voices.length > 0) {
                setVoice(voices[0])
                voiceRef.current = voices[0]
            }
        }

        loadVoices()
        window.speechSynthesis.onvoiceschanged = loadVoices

        return () => {
            window.speechSynthesis.cancel()
        }
    }, [])

    // Speak a specific sentence
    const speakSentence = useCallback((index) => {
        const currentSentences = sentencesRef.current
        if (index < 0 || index >= currentSentences.length) {
            setIsPlaying(false)
            setCurrentIndex(-1)
            return
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(currentSentences[index])
        utterance.rate = rateRef.current
        if (voiceRef.current) utterance.voice = voiceRef.current

        utterance.onstart = () => {
            setCurrentIndex(index)
            setIsPlaying(true)
            activeRef.current = true
        }

        utterance.onend = () => {
            if (!activeRef.current) return
            const nextIndex = index + 1
            if (nextIndex < currentSentences.length) {
                speakSentence(nextIndex)
            } else {
                setIsPlaying(false)
                setCurrentIndex(-1)
                activeRef.current = false
            }
        }

        utterance.onerror = (e) => {
            if (e.error === 'canceled' || e.error === 'interrupted') {
                // Expected — don't log
            } else {
                console.error('Speech error:', e.error)
            }
            setIsPlaying(false)
            activeRef.current = false
        }

        utteranceRef.current = utterance
        window.speechSynthesis.speak(utterance)
    }, [])

    // Load text and split into sentences — ALWAYS cancels and resets
    const loadText = useCallback((text) => {
        window.speechSynthesis.cancel()
        activeRef.current = false
        const split = splitSentences(text)
        setSentences(split)
        sentencesRef.current = split
        setCurrentIndex(-1)
        setIsPlaying(false)
    }, [])

    // Play from current position or beginning
    const play = useCallback(() => {
        const currentSentences = sentencesRef.current
        if (currentSentences.length === 0) return
        const startIndex = currentIndex >= 0 && currentIndex < currentSentences.length ? currentIndex : 0
        activeRef.current = true
        speakSentence(startIndex)
    }, [currentIndex, speakSentence])

    // Pause
    const pause = useCallback(() => {
        window.speechSynthesis.pause()
        setIsPlaying(false)
        activeRef.current = false
    }, [])

    // Resume
    const resume = useCallback(() => {
        window.speechSynthesis.resume()
        setIsPlaying(true)
        activeRef.current = true
    }, [])

    // Toggle play/pause
    const togglePlay = useCallback(() => {
        if (isPlaying) {
            pause()
        } else if (currentIndex >= 0 && window.speechSynthesis.paused) {
            resume()
        } else {
            play()
        }
    }, [isPlaying, currentIndex, pause, resume, play])

    // Skip to next sentence
    const skipForward = useCallback(() => {
        window.speechSynthesis.cancel()
        const currentSentences = sentencesRef.current
        const next = Math.min(currentIndex + 1, currentSentences.length - 1)
        if (next >= 0 && next < currentSentences.length) {
            activeRef.current = true
            speakSentence(next)
        }
    }, [currentIndex, speakSentence])

    // Skip to previous sentence
    const skipBack = useCallback(() => {
        window.speechSynthesis.cancel()
        const currentSentences = sentencesRef.current
        const prev = Math.max(currentIndex - 1, 0)
        if (prev < currentSentences.length) {
            activeRef.current = true
            speakSentence(prev)
        }
    }, [currentIndex, speakSentence])

    // Change speed
    const changeRate = useCallback((newRate) => {
        setRate(newRate)
        rateRef.current = newRate
        // Restart current sentence with new rate if playing
        if (isPlaying && currentIndex >= 0) {
            window.speechSynthesis.cancel()
            setTimeout(() => {
                speakSentence(currentIndex)
            }, 50)
        }
    }, [isPlaying, currentIndex, speakSentence])

    // Change voice
    const changeVoice = useCallback((newVoice) => {
        setVoice(newVoice)
        voiceRef.current = newVoice
    }, [])

    // Stop completely and reset
    const stop = useCallback(() => {
        window.speechSynthesis.cancel()
        activeRef.current = false
        setIsPlaying(false)
        setCurrentIndex(-1)
    }, [])

    // Jump to a specific sentence (without playing)
    const jumpTo = useCallback((index) => {
        setCurrentIndex(index)
    }, [])

    return {
        sentences,
        currentIndex,
        isPlaying,
        rate,
        voice,
        availableVoices,
        loadText,
        play,
        pause,
        resume,
        togglePlay,
        skipForward,
        skipBack,
        changeRate,
        changeVoice,
        stop,
        jumpTo,
    }
}