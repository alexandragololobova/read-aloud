import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function PasteModal({ isOpen, onClose, onSubmit }) {
    const { theme } = useTheme()
    const [text, setText] = useState('')
    const [title, setTitle] = useState('')

    const handlePaste = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText()
            if (clipboardText) {
                setText(clipboardText)
                // Auto-generate title from first line
                const firstLine = clipboardText.split('\n')[0].trim()
                setTitle(firstLine.slice(0, 60) || 'Untitled')
            }
        } catch {
            // Clipboard access denied — user can type manually
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!text.trim()) return
        onSubmit({
            title: title.trim() || 'Untitled',
            content: text.trim(),
            date: new Date().toISOString(),
        })
        setText('')
        setTitle('')
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
             style={{ backgroundColor: theme.ink + '60', backdropFilter: 'blur(4px)' }}
        >
            <div
                className="w-full max-w-lg rounded-2xl shadow-2xl p-6"
                style={{ backgroundColor: theme.bg, border: `1px solid ${theme.border || 'rgba(0,0,0,0.1)'}` }}
            >
                <h2 className="text-lg font-semibold mb-4 font-ui" style={{ color: theme.ink }}>
                    New Session
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title (optional)"
                        className="w-full px-3 py-2 rounded-lg text-sm font-ui mb-3 outline-none"
                        style={{
                            backgroundColor: theme.card,
                            border: `1px solid ${theme.border || 'rgba(0,0,0,0.1)'}`,
                            color: theme.ink,
                        }}
                    />

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste or type your text here..."
                        rows={12}
                        className="w-full px-3 py-3 rounded-lg text-sm leading-relaxed resize-none outline-none font-body"
                        style={{
                            backgroundColor: theme.card,
                            border: `1px solid ${theme.border || 'rgba(0,0,0,0.1)'}`,
                            color: theme.ink,
                        }}
                        autoFocus
                    />

                    <div className="flex items-center justify-between mt-4">
                        <button
                            type="button"
                            onClick={handlePaste}
                            className="text-xs font-ui underline"
                            style={{ color: theme.accent }}
                        >
                            Paste from clipboard
                        </button>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-full text-sm font-ui transition-colors"
                                style={{ color: theme.muted }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2 rounded-full text-sm font-semibold font-ui text-white transition-opacity hover:opacity-90 active:scale-95"
                                style={{ backgroundColor: theme.accent }}
                            >
                                Start Listening
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}