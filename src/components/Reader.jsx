import { useTheme } from '../context/ThemeContext'

const essayContent = {
    title: 'How to Do Great Work',
    author: 'Paul Graham',
    paragraphs: [
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
            text: 'The way to figure out what to work on is by working. If you\'re not sure what to work on, guess. But pick something and get started. You\'ll probably guess wrong, but that\'s fine. You\'ll learn something valuable about the world, about yourself, and about what you actually enjoy.'
        },
        {
            type: 'bullets',
            items: [
                'Choose work you have a natural aptitude for',
                'Pick something you have a deep interest in',
                'Make sure it offers scope to do great work',
                'Don\'t worry too much about the third — just start'
            ]
        },
        {
            type: 'paragraph',
            text: 'Curiosity is the key to all of this. If you\'re curious about something, follow it. Curiosity is not a static thing — it grows when you feed it and shrinks when you ignore it. The best way to find great work is to pay attention to what makes you curious, and then do that.'
        }
    ]
}

function Blockquote({ text, theme }) {
    return (
        <blockquote
            className="border-l-2 pl-5 my-6 italic text-app-muted relative"
            style={{ borderColor: theme.followBorder || theme.accent + '40' }}
        >
      <span
          className="absolute -left-1 top-0 text-5xl leading-none select-none"
          style={{ color: theme.accent + '20' }}
      >
        &ldquo;
      </span>
            <p className="text-base leading-relaxed">{text}</p>
        </blockquote>
    )
}

function BulletList({ items, theme }) {
    const bullet = theme.accentSecondary
        ? '✦'
        : '•'

    return (
        <ul className="space-y-2 my-5 pl-1">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base">
          <span className="mt-0.5 flex-shrink-0" style={{ color: theme.accent }}>
            {bullet}
          </span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}

export default function Reader() {
    const { theme } = useTheme()

    return (
        <div className="max-w-[840px] mx-auto py-16 px-8">
            {/* Meta header */}
            <div className="flex items-center justify-between mb-8 font-ui text-xs text-app-muted">
        <span className="px-3 py-1 rounded-full bg-app-card border border-app-border">
          12 min listen · imported from paulgraham.com · today
        </span>
            </div>

            {/* Title */}
            <h1
                className="text-[2.75rem] font-semibold leading-tight mb-2 tracking-tight"
                style={{ fontFamily: theme.fontBody || undefined }}
            >
                {essayContent.title}
            </h1>

            {/* Author */}
            <p className="text-lg text-app-muted mb-10 font-ui">
                {essayContent.author}
            </p>

            {/* Article body */}
            <div className="space-y-5">
                {essayContent.paragraphs.map((block, i) => {
                    if (block.type === 'paragraph') {
                        return (
                            <p key={i} className="text-base leading-relaxed">
                                {block.text}
                            </p>
                        )
                    }

                    if (block.type === 'highlighted') {
                        return (
                            <p
                                key={i}
                                className="p-4 rounded-xl text-base leading-relaxed transition-all"
                                style={{
                                    background: theme.followBox || 'rgba(0,0,0,0.05)',
                                    border: `1px solid ${theme.followBorder || 'transparent'}`,
                                }}
                            >
                                {block.text}
                            </p>
                        )
                    }

                    if (block.type === 'blockquote') {
                        return <Blockquote key={i} text={block.text} theme={theme} />
                    }

                    if (block.type === 'bullets') {
                        return <BulletList key={i} items={block.items} theme={theme} />
                    }

                    return null
                })}
            </div>
        </div>
    )
}