import { useTheme } from '../context/ThemeContext'

const sessions = {
    today: [
        { id: 1, title: 'How to Do Great Work', snippet: 'If you collected lists of...', duration: '1h 12m', date: 'Today' },
        { id: 2, title: 'Lecture 4 — Metabolism', snippet: 'Cellular respiration is the set...', duration: '45m', date: 'Today' },
    ],
    yesterday: [
        { id: 3, title: 'The Tail End', snippet: "It's easy to forget how little time...", duration: '22m', date: 'Yesterday' },
        { id: 4, title: 'Annie Dillard essay', snippet: 'How we spend our days is...', duration: '34m', date: 'Yesterday' },
    ],
    earlier: [
        { id: 5, title: 'Marcus Aurelius, Book 5', snippet: 'At dawn, when you have trouble...', duration: '1h 05m', date: 'Mar 14' },
        { id: 6, title: 'Smith2023.pdf', snippet: 'Abstract: We present a novel...', duration: '2h 10m', date: 'Mar 12' },
    ],
}

function SessionGroup({ title, items }) {
    return (
        <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-app-muted mb-3 px-1 font-ui">
                {title}
            </h3>
            <div className="space-y-1">
                {items.map(session => (
                    <div
                        key={session.id}
                        className="group p-3 rounded-xl cursor-pointer transition-all duration-200
              hover:bg-app-card hover:shadow-sm border border-transparent hover:border-app-border"
                    >
                        <p className="text-sm font-medium text-app-ink truncate font-ui">
                            {session.title}
                        </p>
                        <p className="text-xs text-app-muted truncate mt-0.5">
                            {session.snippet}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] text-app-muted font-ui">{session.duration}</span>
                            <span className="text-[10px] text-app-muted font-ui">· {session.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function Sidebar() {
    return (
        <aside className="w-[280px] h-screen flex flex-col border-r border-app-border bg-app-sidebar">
            {/* Wordmark */}
            <div className="p-5 pb-4">
                <h1 className="text-lg font-semibold text-app-ink font-ui tracking-tight">
                    Read Aloud
                </h1>
            </div>

            {/* New session button */}
            <div className="px-4 mb-5">
                <button className="w-full py-2.5 rounded-full bg-app-accent text-white text-sm font-semibold font-ui
          hover:opacity-90 transition-opacity active:scale-95">
                    + New session
                </button>
            </div>

            {/* Session lists */}
            <div className="flex-1 overflow-y-auto px-4">
                <SessionGroup title="Today" items={sessions.today} />
                <SessionGroup title="Yesterday" items={sessions.yesterday} />
                <SessionGroup title="Earlier" items={sessions.earlier} />
            </div>

            {/* User pill */}
            <div className="p-4 border-t border-app-border">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-app-accent flex items-center justify-center text-white text-xs font-semibold font-ui">
                        MC
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-app-ink truncate font-ui">Maya Chen</p>
                        <p className="text-[11px] text-app-muted font-ui">Settings</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}