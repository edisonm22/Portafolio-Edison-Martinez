import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

/* ── Snippet de 18 líneas: React + Node real-world component ── */
const CODE_LINES = [
  { text: 'import { useState, useEffect } from \'react\'', lang: 'js' },
  { text: 'import { api } from \'@/services/api\'', lang: 'js' },
  { text: '', lang: 'js' },
  { text: '/**', lang: 'js' },
  { text: ' * UserDashboard — Panel de usuario', lang: 'js' },
  { text: ' */', lang: 'js' },
  { text: 'export function UserDashboard({ userId }) {', lang: 'js' },
  { text: '  const [user, setUser] = useState(null)', lang: 'js' },
  { text: '  const [loading, setLoading] = useState(true)', lang: 'js' },
  { text: '', lang: 'js' },
  { text: '  useEffect(() => {', lang: 'js' },
  { text: '    async function fetchData() {', lang: 'js' },
  { text: '      const data = await api.get(`/users/${userId}`)', lang: 'js' },
  { text: '      setUser(data)', lang: 'js' },
  { text: '      setLoading(false)', lang: 'js' },
  { text: '    }', lang: 'js' },
  { text: '    fetchData()', lang: 'js' },
  { text: '  }, [userId])', lang: 'js' },
]

/* ── Tokenizer: convierte línea en array de { text, type } ── */
const KEYWORDS = new Set([
  'import', 'from', 'export', 'default', 'function', 'return',
  'const', 'let', 'var', 'async', 'await', 'new', 'try', 'catch',
  'finally', 'if', 'else', 'true', 'false', 'null', 'undefined',
  'throw', 'typeof', 'instanceof',
])

/**
 * Colorea una línea de código JavaScript.
 * Retorna array de fragmentos con su tipo.
 */
function tokenizeLine(text) {
  if (!text) return [{ text: '', type: 'plain' }]

  const tokens = []
  let i = 0

  while (i < text.length) {
    // 1. Comment `// ...`
    if (text[i] === '/' && text[i + 1] === '/') {
      tokens.push({ text: text.slice(i), type: 'comment' })
      return tokens
    }

    // 2. Template literal backtick
    if (text[i] === '`') {
      const end = text.indexOf('`', i + 1)
      const content = end === -1 ? text.slice(i) : text.slice(i, end + 1)
      tokens.push({ text: content, type: 'string' })
      i += content.length
      continue
    }

    // 3. Single/double quoted string
    if (text[i] === "'" || text[i] === '"') {
      const quote = text[i]
      let j = i + 1
      while (j < text.length && text[j] !== quote) {
        if (text[j] === '\\') j++ // skip escaped
        j++
      }
      if (j < text.length) j++ // include closing quote
      tokens.push({ text: text.slice(i, j), type: 'string' })
      i = j
      continue
    }

    // 4. JSX tag `<...>`
    if (text[i] === '<' && /[a-zA-Z/]/.test(text[i + 1] || '')) {
      const end = text.indexOf('>', i + 1)
      if (end !== -1) {
        tokens.push({ text: text.slice(i, end + 1), type: 'tag' })
        i = end + 1
        continue
      }
    }

    // 5. Number literal
    if (/\d/.test(text[i]) && (i === 0 || !/\w/.test(text[i - 1]))) {
      let j = i
      while (j < text.length && /[\d.]/.test(text[j])) j++
      tokens.push({ text: text.slice(i, j), type: 'number' })
      i = j
      continue
    }

    // 6. Word (identifiers/keywords)
    if (/\w/.test(text[i]) || text[i] === '$') {
      let j = i
      while (j < text.length && /\w/.test(text[j])) j++
      const word = text.slice(i, j)
      if (KEYWORDS.has(word)) {
        tokens.push({ text: word, type: 'keyword' })
      } else if (word[0] === word[0]?.toUpperCase() && word[0] !== word[0]?.toLowerCase()) {
        // Component names (PascalCase)
        tokens.push({ text: word, type: 'class' })
      } else {
        tokens.push({ text: word, type: 'plain' })
      }
      i = j
      continue
    }

    // 7. Punctuation / operators
    tokens.push({ text: text[i], type: 'punct' })
    i++
  }

  return tokens
}

/* ── Color map ── */
const COLORS = {
  keyword: 'text-purple-400',
  string: 'text-emerald-400',
  comment: 'text-surface-500 italic',
  number: 'text-amber-400',
  tag: 'text-cyan-400',
  class: 'text-yellow-400',
  punct: 'text-surface-400',
  plain: 'text-surface-200',
}

/**
 * CodeShowcase — Fragmento de código con syntax highlighting
 * y revelación línea por línea mediante IntersectionObserver.
 */
export default function CodeShowcase({ reduced: _reduced } = {}) {
  const [visibleLines, setVisibleLines] = useState(new Set())
  const containerRef = useRef(null)
  const lineRefs = useRef([])
  const reduced = _reduced ?? useReducedMotion()

  /* ── Line-by-line reveal ── */
  useEffect(() => {
    if (reduced) {
      // Mostrar todo inmediatamente
      setVisibleLines(new Set(CODE_LINES.map((_, i) => i)))
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Revelar líneas progresivamente
          CODE_LINES.forEach((_, idx) => {
            setTimeout(() => {
              setVisibleLines((prev) => {
                const next = new Set(prev)
                next.add(idx)
                return next
              })
            }, idx * 80)
          })
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [reduced])

  return (
    <div
      ref={containerRef}
      className="relative font-mono text-sm leading-relaxed rounded-2xl bg-surface-950/90 border border-surface-800/60 overflow-hidden shadow-xl"
      role="code"
      aria-label="Fragmento de código de ejemplo"
    >
      {/* ── Editor gutter bar ── */}
      <div className="flex border-b border-surface-800/60 bg-surface-950 px-4 py-2.5 gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500/60" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <span className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="ml-3 text-[11px] text-surface-400 tracking-wide">dashboard.jsx</span>
      </div>

      {/* ── Code lines ── */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        {CODE_LINES.map((line, idx) => {
          const isVisible = reduced || visibleLines.has(idx)
          const tokens = tokenizeLine(line.text)

          return (
            <div
              key={idx}
              ref={(el) => { lineRefs.current[idx] = el }}
              className={`flex transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4'
              }`}
              style={{
                transitionDelay: reduced ? '0ms' : `${idx * 60}ms`,
              }}
            >
              {/* Line number */}
              <span className="shrink-0 w-8 text-right text-surface-600 select-none mr-4 text-[13px]">
                {idx + 1}
              </span>

              {/* Highlighted code */}
              <span className="whitespace-pre">
                {tokens.map((token, ti) => (
                  <span key={ti} className={COLORS[token.type] || 'text-surface-200'}>
                    {token.text}
                  </span>
                ))}
              </span>
            </div>
          )
        })}
      </div>

      {/* ── Blur gradient fade (bottom) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-surface-950/80 to-transparent pointer-events-none" />
    </div>
  )
}
