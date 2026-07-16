import { useState, useEffect, useRef } from 'react'

const COMMANDS = [
  { cmd: 'whoami', output: 'edison_martinez', delay: 600 },
  { cmd: 'cat skills.txt', lines: [
    '> Full-Stack Developer',
    '> React / Next.js',
    '> Node.js / Express',
    '> MongoDB / PostgreSQL',
    '> Docker / AWS',
  ], delay: 800 },
]

/**
 * InteractiveTerminal — Terminal animada con auto‑typing.
 * Dos comandos: whoami, cat skills.txt.
 * Velocidad variable por carácter. Cursor blink.
 * reduced-motion: muestra contenido final inmediato.
 */
export default function InteractiveTerminal({ reduced = false }) {
  const [lines, setLines] = useState([])
  const [cursorVisible, setCursorVisible] = useState(true)
  const [phase, setPhase] = useState(0) // 0=typing, 1=done
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  /* ── Blinking cursor (siempre activo) ── */
  useEffect(() => {
    const ci = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 530)
    return () => clearInterval(ci)
  }, [])

  /* ── Typing sequence ── */
  useEffect(() => {
    if (reduced) {
      // Reduced motion: mostrar todo inmediatamente
      setLines([
        { type: 'cmd', text: '$ whoami' },
        { type: 'output', text: 'edison_martinez' },
        { type: 'cmd', text: '$ cat skills.txt' },
        ...COMMANDS[1].lines.map((l) => ({ type: 'line', text: l })),
      ])
      setPhase(1)
      return
    }

    let cancelled = false
    const allOutput = []

    async function run() {
      // ── Comando 1: whoami ──
      allOutput.push({ type: 'cmd', text: '' })
      setLines([...allOutput])

      // Type "$ whoami"
      const cmd1 = '$ whoami'
      for (let i = 0; i <= cmd1.length && !cancelled; i++) {
        allOutput[allOutput.length - 1] = { type: 'cmd', text: cmd1.slice(0, i) }
        setLines([...allOutput])
        const speed = 20 + Math.random() * 30
        await new Promise((r) => setTimeout(r, speed))
      }

      await new Promise((r) => setTimeout(r, COMMANDS[0].delay))

      // Output de whoami
      allOutput.push({ type: 'output', text: '' })
      setLines([...allOutput])
      const out1 = COMMANDS[0].output
      for (let i = 0; i <= out1.length && !cancelled; i++) {
        allOutput[allOutput.length - 1] = { type: 'output', text: out1.slice(0, i) }
        setLines([...allOutput])
        const speed = 15 + Math.random() * 25
        await new Promise((r) => setTimeout(r, speed))
      }

      await new Promise((r) => setTimeout(r, COMMANDS[1].delay))

      // ── Comando 2: cat skills.txt ──
      allOutput.push({ type: 'cmd', text: '' })
      setLines([...allOutput])
      const cmd2 = '$ cat skills.txt'
      for (let i = 0; i <= cmd2.length && !cancelled; i++) {
        allOutput[allOutput.length - 1] = { type: 'cmd', text: cmd2.slice(0, i) }
        setLines([...allOutput])
        const speed = 20 + Math.random() * 30
        await new Promise((r) => setTimeout(r, speed))
      }

      await new Promise((r) => setTimeout(r, 500))

      // Líneas de skills
      const skillLines = COMMANDS[1].lines
      for (let li = 0; li < skillLines.length && !cancelled; li++) {
        allOutput.push({ type: 'line', text: '' })
        setLines([...allOutput])
        const line = skillLines[li]
        for (let ci = 0; ci <= line.length && !cancelled; ci++) {
          allOutput[allOutput.length - 1] = { type: 'line', text: line.slice(0, ci) }
          setLines([...allOutput])
          const speed = 10 + Math.random() * 20
          await new Promise((r) => setTimeout(r, speed))
        }
        await new Promise((r) => setTimeout(r, 100 + Math.random() * 200))
      }

      if (!cancelled) {
        setPhase(1)
      }
    }

    run()

    return () => { cancelled = true }
  }, [reduced])

  return (
    <div
      className="font-mono text-sm leading-relaxed rounded-xl bg-surface-950/80 border border-surface-800/60 p-4 sm:p-5 overflow-x-auto shadow-inner"
      style={{
        maxWidth: '100%',
        minHeight: '200px',
      }}
      aria-label="Terminal interactiva con información del desarrollador"
      role="code"
    >
      {/* ── Prompt estático inicial ── */}
      {lines.length === 0 && !reduced && (
        <div>
          <span className="text-primary">$</span>
          <span className="text-surface-500 ml-2">_</span>
        </div>
      )}

      {/* ── Líneas renderizadas ── */}
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {line.type === 'cmd' && (
            <>
              <span className="text-primary font-semibold">$</span>
              <span className="text-surface-200 ml-2">{line.text}</span>
            </>
          )}
          {line.type === 'output' && (
            <span className="text-accent ml-4">{line.text}</span>
          )}
          {line.type === 'line' && (
            <span className="text-surface-400 ml-4">{line.text}</span>
          )}
        </div>
      ))}

      {/* ── Cursor parpadeante al final ── */}
      {phase < 1 && (
        <span
          className={`inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle transition-opacity duration-100 ${
            cursorVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* ── Terminal ready prompt ── */}
      {phase === 1 && (
        <div className="mt-1">
          <span className="text-primary font-semibold">$</span>
          <span className={`inline-block w-[2px] h-[1em] bg-primary ml-1.5 align-middle transition-opacity duration-100 ${
            cursorVisible ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>
      )}
    </div>
  )
}
