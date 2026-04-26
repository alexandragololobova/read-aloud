import { useTheme } from '../context/ThemeContext'

export default function PlayerBar() {
    const { theme } = useTheme()

    return (
        <div
            className="fixed bottom-0 left-[280px] right-0 z-50"
            style={{ maxWidth: '840px', margin: '0 auto' }}
        >
            {/* Caption strip */}
            <div className="flex justify-center mb-3">
                <div
                    className="px-4 py-2 rounded-full text-sm font-medium font-ui backdrop-blur-md"
                    style={{
                        backgroundColor: theme.ink + 'F2',
                        color: '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    In practice you don't have to worry much about the third criterion.
                </div>
            </div>

            {/* Player bar */}
            <div
                className="mx-4 mb-4 rounded-2xl backdrop-blur-md shadow-lg transition-all duration-300"
                style={{
                    backgroundColor: theme.bg + 'F2',
                    boxShadow: `0 20px 40px -15px ${theme.ink}20`,
                    border: `1px solid ${theme.border || 'rgba(0,0,0,0.06)'}`,
                }}
            >
                {/* Progress bar */}
                <div className="px-5 pt-3">
                    <div className="w-full h-[3px] rounded-full bg-app-border relative group cursor-pointer">
                        <div
                            className="h-full rounded-full transition-all duration-200"
                            style={{
                                width: '35%',
                                backgroundColor: theme.accent,
                            }}
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                                left: '35%',
                                backgroundColor: theme.accent,
                                boxShadow: `0 0 0 4px ${theme.accent}30`,
                            }}
                        />
                    </div>
                    <div className="flex justify-between mt-1.5">
                        <span className="text-[10px] text-app-muted font-ui tabular-nums">4:12</span>
                        <span className="text-[10px] text-app-muted font-ui tabular-nums">12:38</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between px-5 pb-3 pt-1">
                    {/* Left: Voice picker placeholder */}
                    <button
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 font-ui text-sm"
                        style={{
                            borderColor: theme.border || 'rgba(0,0,0,0.1)',
                            color: theme.ink,
                        }}
                    >
                        <div
                            className="w-5 h-5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: theme.accent }}
                        />
                        <span>Aria</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>

                    {/* Center: Transport controls */}
                    <div className="flex items-center gap-4">
                        {/* Skip back */}
                        <button
                            className="p-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                            style={{ color: theme.muted }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="19 20 9 12 19 4 19 20" />
                                <line x1="5" y1="19" x2="5" y2="5" />
                            </svg>
                        </button>

                        {/* Play/Pause */}
                        <button
                            className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                            style={{
                                backgroundColor: theme.accent,
                                boxShadow: `0 8px 24px -6px ${theme.accent}60`,
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                        </button>

                        {/* Skip forward */}
                        <button
                            className="p-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                            style={{ color: theme.muted }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 4 15 12 5 20 5 4" />
                                <line x1="19" y1="5" x2="19" y2="19" />
                            </svg>
                        </button>
                    </div>

                    {/* Right: Speed + CC */}
                    <div className="flex items-center gap-2">
                        {/* Speed */}
                        <button
                            className="px-2.5 py-1 rounded-full border text-xs font-semibold font-ui transition-all duration-200 hover:scale-105 active:scale-95"
                            style={{
                                borderColor: theme.border || 'rgba(0,0,0,0.1)',
                                color: theme.ink,
                            }}
                        >
                            1.25x
                        </button>

                        {/* CC toggle */}
                        <button
                            className="p-1.5 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95"
                            style={{
                                borderColor: theme.accentSecondary || theme.accent,
                                backgroundColor: theme.accentSecondary || theme.accent + '20',
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="M7 10l2 2-2 2" />
                                <path d="M11 14h4" />
                                <path d="M15 10l2 2-2 2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}