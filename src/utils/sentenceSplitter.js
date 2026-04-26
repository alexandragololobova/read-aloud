/**
 * Splits text into an array of sentences.
 * Handles common abbreviations to avoid false splits.
 */
const ABBREVIATIONS = [
    'Mr', 'Mrs', 'Ms', 'Dr', 'Prof', 'Sr', 'Jr',
    'e.g', 'i.e', 'etc', 'vs', 'St', 'Jan', 'Feb',
    'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export function splitSentences(text) {
    if (!text || typeof text !== 'string') return []

    // Normalize whitespace
    const cleaned = text.replace(/\s+/g, ' ').trim()
    if (!cleaned) return []

    const sentences = []
    let current = ''
    const words = cleaned.split(' ')

    for (let i = 0; i < words.length; i++) {
        const word = words[i]
        current += (current ? ' ' : '') + word

        // Check if this word ends a sentence
        const lastChar = word.slice(-1)
        const prevWord = word.slice(0, -1)

        if (
            (lastChar === '.' || lastChar === '!' || lastChar === '?') &&
            !ABBREVIATIONS.includes(prevWord) &&
            !/^\d+\.$/.test(word) // not a numbered list like "1."
        ) {
            // Also check: if next word starts with lowercase, probably not a sentence end
            const nextWord = words[i + 1]
            if (nextWord && /^[a-z]/.test(nextWord)) {
                continue
            }
            sentences.push(current.trim())
            current = ''
        }
    }

    // Push any remaining text
    if (current.trim()) {
        sentences.push(current.trim())
    }

    return sentences.filter(s => s.length > 0)
}