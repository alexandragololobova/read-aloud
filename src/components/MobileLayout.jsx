import { useTheme } from '../context/ThemeContext'

const sessions = [
    { id: 5, title: 'Marcus Aurelius, Book 5', snippet: 'At dawn, when you have trouble...', duration: '1h 05m', date: 'Mar 14' },
    { id: 6, title: 'Smith2023.pdf', snippet: 'Abstract: We present a novel...', duration: '2h 10m', date: 'Mar 12' },
]

const essayContent = {
    title: 'How to Do Great Work',
    author: 'Paul Graham',
    paragraphs: [
        {
            type: 'subhead',
            text: 'The Recipe'
        },
        {
            type: 'paragraph',
            text: 'If you collected lists of techniques for doing great work in a lot of different fields, what would the intersection look like? I decided to find out by making it.'
        },
        {
            type: 'paragraph',
            text: 'Partly my goal was to create a guide that could be used by someone working in any field. But I was also curious about the shape of the intersection. And one thing this exercise shows is that it does have a definite shape; it\'s not just a point. So "how to do great work" is not just an abstract concept.'
        },
        {
            type: 'paragraph',
            text: 'There are techniques that apply specifically to it.'
        },
        {
            type: 'paragraph',
            text: 'The first step is to decide what to work on. The work you choose needs to have three qualities: it has to be something you have a natural aptitude for, that you have a deep interest in, and that offers scope to do great work.'
        },
        {
            type: 'highlighted',
            text: 'In practice you don\'t have to worry much about the third criterion. Ambitious people are if anything too conservative about it.'
        },
        {
            type: 'blockquote',
            text: 'The way to figure out what to work on is by working. If you\'re not sure what to work on, guess. But pick something and get started.'
        },
        {
            type: 'paragraph',
            text: 'Curiosity is the key to all of this. If you\'re curious about something, follow it. The best way to find great work is to pay attention to what makes you curious, and then do that.'
        }
    ]
}

export default function MobileShell() {
    const { theme, themeKey, setThemeKey, themesList } = useTheme()

    return (
        <div
            className="h-screen flex flex-col overflow-hidden"
            style={{ backgroundColor: theme.bg, color: theme.ink }}
        >
            {/* App bar */}
            <div
                className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                style={{ borderBottom: `1px solid ${theme.border || 'rgba(0,0,0,0.06)'}` }}
            >
                <button style={{ color: theme.ink }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
                <div className="text-center">
                    <p className="text-sm font-semibold font-ui">{essayContent.title}</p>
                    <p className="text-[10px] font-ui" style={{ color: theme.muted }}>{essayContent.author}</p>
                </div>
                <button style={{ color: theme.ink }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="5" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="19" r="1.5" />
                    </svg>
                </button>
            </div>

            {/* Reader */}
            <div className="flex-1 overflow-y-auto px-5 pt-4 pb-44">
                {/* Meta pill */}
                <div
                    className="inline-block px-3 py-1 rounded-full text-[10px] font-ui mb-5"
                    style={{
                        backgroundColor: theme.card,
                        border: `1px solid ${theme.border || 'rgba(0,0,0,0.06)'}`,
                        color: theme.muted,
                    }}
                >
                    12 min listen · today
                </div>

                {essayContent.paragraphs.map((block, i) => {
                    if (block.type === 'subhead') {
                        return (
                            <h2 key={i} className="text-lg font-semibold mb-4 mt-6 font-ui">
                                {block.text}
                            </h2>
                        )
                    }

                    if (block.type === 'paragraph') {
                        return (
                            <p key={i} className="text-[15px] leading-relaxed mb-4">
                                {block.text}
                            </p>
                        )
                    }

                    if (block.type === 'highlighted') {
                        return (
                            <div key={i} className="mb-4">
                                <div
                                    className="px-4 py-3 rounded-xl text-[15px] leading-relaxed"
                                    style={{
                                        background: theme.followBox || 'rgba(0,0,0,0.05)',
                                        border: `1px solid ${theme.followBorder || 'transparent'}`,
                                    }}
                                >
                                    {block.text}
                                </div>
                            </div>
                        )
                    }

                    if (block.type === 'blockquote') {
                        return (
                            <blockquote
                                key={i}
                                className="border-l-2 pl-4 my-4 italic text-[15px] leading-relaxed"
                                style={{
                                    borderColor: theme.followBorder || theme.accent + '40',
                                    color: theme.muted,
                                }}
                            >
                                {block.text}
                            </blockquote>
                        )
                    }

                    return null
                })}
            </div>

            {/* Floating player */}
            <div
                className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3 z-50"
                style={{
                    background: `linear-gradient(transparent 0%, ${theme.bg} 20%, ${theme.bg} 100%)`,
                    borderTop: `1px solid ${theme.border || 'rgba(0,0,0,0.06)'}`,
                }}
            >
                {/* Progress bar */}
                <div
                    className="w-full h-[2px] rounded-full mb-3"
                    style={{ backgroundColor: theme.border || 'rgba(0,0,0,0.1)' }}
                >
                    <div
                        className="h-full rounded-full"
                        style={{ width: '35%', backgroundColor: theme.accent }}
                    />
                </div>
                <div className="flex justify-between mb-3">
                    <span className="text-[10px] font-ui tabular-nums" style={{ color: theme.muted }}>4:12</span>
                    <span className="text-[10px] font-ui tabular-nums" style={{ color: theme.muted }}>12:38</span>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                    <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-ui"
                        style={{ borderColor: theme.border || 'rgba(0,0,0,0.1)' }}
                    >
                        <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: theme.accent }} />
                        Aria
                    </button>

                    <div className="flex items-center gap-4">
                        <button style={{ color: theme.muted }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="19 20 9 12 19 4 19 20" />
                                <line x1="5" y1="19" x2="5" y2="5" />
                            </svg>
                        </button>
                        <button
                            className="w-[48px] h-[48px] rounded-full flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: theme.accent, boxShadow: `0 8px 24px -6px ${theme.accent}60` }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                        </button>
                        <button style={{ color: theme.muted }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="5 4 15 12 5 20 5 4" />
                                <line x1="19" y1="5" x2="19" y2="19" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            className="p-1.5 rounded-full border"
                            style={{
                                borderColor: theme.accentSecondary || theme.accent,
                                backgroundColor: theme.accentSecondary || theme.accent + '20',
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="M7 10l2 2-2 2" />
                                <path d="M11 14h4" />
                                <path d="M15 10l2 2-2 2" />
                            </svg>
                        </button>
                        <span className="text-xs font-semibold font-ui">1.25x</span>
                    </div>
                </div>

                {/* Theme switcher — compact for mobile */}
                <div className="flex justify-center gap-1.5 mt-4">
                    {themesList.map(t => (
                        <button
                            key={t.key}
                            onClick={() => setThemeKey(t.key)}
                            className="w-5 h-5 rounded-full border-2 transition-all"
                            style={{
                                backgroundColor: themeKey === t.key ? 'var(--color-app-accent)' : 'transparent',
                                borderColor: themeKey === t.key ? 'var(--color-app-accent)' : (theme.border || '#ccc'),
                            }}
                            title={t.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}