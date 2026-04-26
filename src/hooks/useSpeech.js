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
    const indexRef = useRef(-1)

    // Load available voices
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices()
            setAvailableVoices(voices)
            if (!voice && voices.length > 0) {
                setVoice(voices[0])
            }
        }

        loadVoices()
        window.speechSynthesis.onvoiceschanged = loadVoices

        return () => {
            window.speechSynthesis.cancel()
        }
    }, [])

    // Load text and split into sentences
    const loadText = useCallback((text) => {
        window.speechSynthesis.cancel()
        const split = splitSentences(text)
        setSentences(split)
        setCurrentIndex(-1)
        setIsPlaying(false)
        indexRef.current = -1
    }, [])

    // Speak a single sentence
    const speakSentence = useCallback((index) => {
        if (index < 0 || index >= sentences.length) {
            setIsPlaying(false)
            setCurrentIndex(-1)
            return
        }

        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(sentences[index])
        utterance.rate = rate
        if (voice) utterance.voice = voice

        utterance.onstart = () => {
            setCurrentIndex(index)
            indexRef.current = index
            setIsPlaying(true)
        }

        utterance.onend = () => {
            const nextIndex = index + 1
            if (nextIndex < sentences.length) {
                speakSentence(nextIndex)
            } else {
                setIsPlaying(false)
                setCurrentIndex(-1)
                indexRef.current = -1
            }
        }

        utterance.onerror = (e) => {
            if (e.error !== 'canceled' && e.error !== 'interrupted') {
                console.error('Speech error:', e.error)
            }
            setIsPlaying(false)
        }

        utteranceRef.current = utterance
        window.speechSynthesis.speak(utterance)
    }, [sentences, rate, voice])

    // Play from current position or beginning
    const play = useCallback(() => {
        if (sentences.length === 0) return
        const startIndex = currentIndex >= 0 ? currentIndex : 0
        speakSentence(startIndex)
    }, [sentences, currentIndex, speakSentence])

    // Pause
    const pause = useCallback(() => {
        window.speechSynthesis.pause()
        setIsPlaying(false)
    }, [])

    // Resume
    const resume = useCallback(() => {
        window.speechSynthesis.resume()
        setIsPlaying(true)
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
        const next = Math.min(currentIndex + 1, sentences.length - 1)
        if (next >= 0) {
            speakSentence(next)
        }
    }, [currentIndex, sentences.length, speakSentence])

    // Skip to previous sentence
    const skipBack = useCallback(() => {
        const prev = Math.max(currentIndex - 1, 0)
        speakSentence(prev)
    }, [currentIndex, speakSentence])

    // Set speed
    const changeRate = useCallback((newRate) => {
        setRate(newRate)
    }, [])

    // Set voice
    const changeVoice = useCallback((newVoice) => {
        setVoice(newVoice)
    }, [])

    // Stop completely
    const stop = useCallback(() => {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
        setCurrentIndex(-1)
        indexRef.current = -1
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
    }
}