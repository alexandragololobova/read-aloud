import { useEffect, useRef } from 'react'

const DRAFT_KEY = 'read-aloud-draft'

export function useAutoSave({ title, content, currentIndex, isPlaying, rate, voiceName }) {
    const timerRef = useRef(null)

    // Restore draft on mount
    const getSavedDraft = () => {
        try {
            const raw = localStorage.getItem(DRAFT_KEY)
            if (!raw) return null
            const draft = JSON.parse(raw)
            if (!draft.content) return null
            return draft
        } catch {
            return null
        }
    }

    // Save draft (debounced)
    useEffect(() => {
        if (!content) return

        // Clear any pending save
        if (timerRef.current) clearTimeout(timerRef.current)

        // Debounce: save after 1 second of no changes
        timerRef.current = setTimeout(() => {
            try {
                const draft = {
                    title: title || 'Untitled',
                    content,
                    currentIndex,
                    isPlaying,
                    rate,
                    voiceName: voiceName || null,
                    savedAt: Date.now(),
                }
                localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
            } catch (e) {
                // localStorage full or unavailable — silently fail
                console.warn('Failed to save draft:', e)
            }
        }, 1000)

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [content, title, currentIndex, isPlaying, rate, voiceName])

    // Clear draft
    const clearDraft = () => {
        try {
            localStorage.removeItem(DRAFT_KEY)
        } catch {}
    }

    return { getSavedDraft, clearDraft }
}