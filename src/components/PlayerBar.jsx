import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function PlayerBar({
                                      isPlaying,
                                      onTogglePlay,
                                      onSkipForward,
                                      onSkipBack,
                                      rate,
                                      onChangeRate,
                                      voice,
                                      availableVoices,
                                      onChangeVoice,
                                      currentIndex,
                                      sentences,
                                  }) {
    const { theme } = useTheme()
    const [showVoicePicker, setShowVoicePicker] = useState(false)

    const speeds = [0.75, 1, 1.25, 1.5, 2]
    const currentSpeedIndex = speeds.indexOf(rate)
    const nextSpeed = speeds[(currentSpeedIndex + 1) % speeds.length]

    const toggleSpeed = () => {
        onChangeRate(nextSpeed)
    }

    const isCCActive = true // always on for now

    return (
        <div
            className="fixed bottom-0 left-[280px] right-0 z-50"
            style={{ maxWidth: '840px', margin: '0 auto' }}
        >
            {/* Caption strip */}
            <div className="flex justify-center mb-3">
                <div
                    className="px-4 py-2 rounded-full text-sm font-medium font-ui backdrop-blur-md max-w-[600px] truncate"
                    style={{
                        backgroundColor: theme.ink + 'F2',
                        color: '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    {currentIndex >= 0 && sentences[currentIndex]
                        ? sentences[currentIndex]
                        : 'Press play to begin'}
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
                                width: sentences.length > 0
                                    ? `${((currentIndex + 1) / sentences.length) * 100}%`
                                    : '0%',
                                backgroundColor: theme.accent,
                            }}
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                                left: sentences.length > 0
                                    ? `${((currentIndex + 1) / sentences.length) * 100}%`
                                    : '0%',
                                backgroundColor: theme.accent,
                                boxShadow: `0 0 0 4px ${theme.accent}30`,
                            }}
                        />
                    </div>
                    <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-app-muted font-ui tabular-nums">
              {currentIndex >= 0 ? currentIndex + 1 : 0}
            </span>
                        <span className="text-[10px] text-app-muted font-ui tabular-nums">
              {sentences.length}
            </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between px-5 pb-3 pt-1">
                    {/* Voice picker */}
                    <div className="relative">
                        <button
                            onClick={() => setShowVoicePicker(!showVoicePicker)}
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
                            <span>{voice ? voice.name.split(' ')[0] : 'Voice'}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>

                        {/* Voice popover */}
                        {showVoicePicker && (
                            <div
                                className="absolute bottom-full left-0 mb-2 w-48 rounded-xl shadow-xl p-1.5 z-50"
                                style={{
                                    backgroundColor: theme.card,
                                    border: `1px solid ${theme.border || 'rgba(0,0,0,0.1)'}`,
                                }}
                            >
                                {availableVoices.slice(0, 6).map((v) => (
                                    <button
                                        key={v.name}
                                        onClick={() => {
                                            onChangeVoice(v)
                                            setShowVoicePicker(false)
                                        }}
                                        className="w-full text-left px-3 py-2 rounded-lg text-sm font-ui transition-colors"
                                        style={{
                                            color: voice?.name === v.name ? theme.accent : theme.ink,
                                            backgroundColor: voice?.name === v.name ? theme.accent + '15' : 'transparent',
                                        }}
                                    >
                                        {v.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Transport controls */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onSkipBack}
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
                            onClick={onTogglePlay}
                            className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                            style={{
                                backgroundColor: theme.accent,
                                boxShadow: `0 8px 24px -6px ${theme.accent}60`,
                            }}
                        >
                            {isPlaying ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <rect x="6" y="4" width="4" height="16" rx="1" />
                                    <rect x="14" y="4" width="4" height="16" rx="1" />
                                </svg>
                            ) : (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                            )}
                        </button>

                        <button
                            onClick={onSkipForward}
                            className="p-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                            style={{ color: theme.muted }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 4 15 12 5 20 5 4" />
                                <line x1="19" y1="5" x2="19" y2="19" />
                            </svg>
                        </button>
                    </div>

                    {/* Speed + CC */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleSpeed}
                            className="px-2.5 py-1 rounded-full border text-xs font-semibold font-ui transition-all duration-200 hover:scale-105 active:scale-95"
                            style={{
                                borderColor: theme.border || 'rgba(0,0,0,0.1)',
                                color: theme.ink,
                            }}
                        >
                            {rate}x
                        </button>

                        <button
                            className={`p-1.5 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 ${
                                isCCActive ? '' : 'opacity-50'
                            }`}
                            style={{
                                borderColor: isCCActive ? (theme.accentSecondary || theme.accent) : (theme.border || 'rgba(0,0,0,0.1)'),
                                backgroundColor: isCCActive ? (theme.accentSecondary || theme.accent) + '20' : 'transparent',
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isCCActive ? theme.accent : theme.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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