/**
 * Strips markdown/formatting artifacts from plain text.
 * Keeps the text readable — removes **, ##, ~~, etc.
 */
export function cleanPlainText(text) {
    if (!text) return ''

    return text
        // Remove headers
        .replace(/^#{1,6}\s+/gm, '')
        // Remove bold/italic markers
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/__(.+?)__/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/_(.+?)_/g, '$1')
        // Remove strikethrough
        .replace(/~~(.+?)~~/g, '$1')
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`(.+?)`/g, '$1')
        // Remove link formatting, keep text
        .replace(/\[(.+?)\]\(.+?\)/g, '$1')
        // Remove blockquote markers
        .replace(/^>\s+/gm, '')
        // Remove list markers
        .replace(/^[\s]*[-*+]\s+/gm, '')
        .replace(/^[\s]*\d+\.\s+/gm, '')
        // Remove horizontal rules
        .replace(/^[-*_]{3,}\s*$/gm, '')
        // Collapse multiple newlines
        .replace(/\n{3,}/g, '\n\n')
        .trim()
}