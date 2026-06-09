"use client"

import { useEffect, useState, useRef, useCallback } from 'react'
import { Terminal as TermIcon, User, Folder, Server } from 'lucide-react'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'
import { Window } from '@/components/os/window'
import type { AppId } from '@/app/page'

const HOST = 'forge'
const USER = 'cielio'

// ── ASCII banner (solid block — single-glyph, renders cleanly) ──
const FORGE_ASCII = `██████  ██████  █████   ██████  ██████
██      ██  ██  ██  ██  ██      ██
█████   ██  ██  █████   ██ ███  █████
██      ██  ██  ██ ██   ██  ██  ██
██      ██████  ██  ██  ██████  ██████`

// ── Block model ─────────────────────────────────────────────────
type Tone = 'dim' | 'success' | 'error' | 'body' | 'comment' | 'warn' | 'quote' | 'key'
type Block =
  | { k: 'cmd'; dir: string; cmd: string }
  | { k: 'text'; text: string; tone?: Tone }
  | { k: 'ascii'; text: string }
  | { k: 'motd'; title: string; tagline: string; rows: { label: string; value: string }[] }
  | { k: 'tags'; tags: string[] }
  | { k: 'ls'; entries: { name: string; dir?: boolean }[] }
  | { k: 'spacer' }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Copy = any

// ── Boot / SSH handshake sequence ───────────────────────────────
function bootScript(t: Copy, lang: 'pt' | 'en'): { block: Block; delay: number }[] {
  const motdRows = [
    { label: 'OS', value: 'Rocky Linux 9.3' },
    { label: 'Kernel', value: '5.14.0-hpc' },
    { label: 'Scheduler', value: 'SLURM 23.02' },
    { label: 'Nodes', value: '12 / 12 online' },
    { label: 'Uptime', value: '287 days' },
    { label: 'Load avg', value: '0.42 0.39 0.40' },
  ]
  return [
    { block: { k: 'cmd', dir: '~', cmd: `ssh ${USER}@${HOST}` }, delay: 350 },
    { block: { k: 'text', text: `The authenticity of host '${HOST}' can't be established.`, tone: 'dim' }, delay: 520 },
    { block: { k: 'text', text: 'ED25519 key fingerprint is SHA256:aQ3v…Kz9.', tone: 'dim' }, delay: 160 },
    { block: { k: 'text', text: 'Are you sure you want to continue connecting? yes', tone: 'comment' }, delay: 420 },
    { block: { k: 'text', text: `Warning: Permanently added '${HOST}' to the list of known hosts.`, tone: 'warn' }, delay: 260 },
    { block: { k: 'text', text: `${USER}@${HOST}'s password: ••••••••`, tone: 'comment' }, delay: 500 },
    { block: { k: 'text', text: 'Authenticating…  ✔  connection established', tone: 'success' }, delay: 520 },
    { block: { k: 'spacer' }, delay: 200 },
    { block: { k: 'ascii', text: FORGE_ASCII }, delay: 120 },
    {
      block: {
        k: 'motd',
        title: `${HOST.toUpperCase()} · login node 01`,
        tagline: lang === 'pt' ? 'onde meus dados viram decisão' : 'where my data becomes decision',
        rows: motdRows,
      },
      delay: 260,
    },
    { block: { k: 'spacer' }, delay: 120 },
    { block: { k: 'text', text: `Last login: ${lastLogin()} from 10.0.0.2`, tone: 'dim' }, delay: 220 },
    {
      block: {
        k: 'text',
        text: lang === 'pt'
          ? 'ℹ  Digite `ls` para explorar  ·  `help` para ver os comandos.'
          : 'ℹ  Type `ls` to explore  ·  `help` for available commands.',
        tone: 'comment',
      },
      delay: 200,
    },
    { block: { k: 'spacer' }, delay: 120 },
  ]
}

function lastLogin(): string {
  const d = new Date()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const p = (n: number) => String(n).padStart(2, '0')
  return `${days[d.getDay()]} ${mon[d.getMonth()]} ${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

// ── Home filesystem ─────────────────────────────────────────────
const HOME_ENTRIES = [
  { name: 'about.md' },
  { name: 'now.txt' },
  { name: 'contact.vcf' },
  { name: 'toolbox/', dir: true },
  { name: 'skills/', dir: true },
  { name: 'scheduler/', dir: true },
]

const TOOLBOX = ['neovim', 'tmux', 'zsh', 'docker', 'k9s', 'htop', 'terraform', 'ansible', 'git', 'grafana']

// ── Command processor ───────────────────────────────────────────
function runCommand(raw: string, t: Copy, lang: 'pt' | 'en'): { blocks: Block[]; clear?: boolean } {
  const input = raw.trim()
  const cmd = input.toLowerCase().replace(/\/+$/, '')
  const txt = (text: string, tone?: Tone): Block => ({ k: 'text', text, tone })

  if (cmd === '') return { blocks: [] }

  if (cmd === 'clear' || cmd === 'cls') return { blocks: [], clear: true }

  if (cmd === 'help') {
    return {
      blocks: [
        txt(lang === 'pt' ? 'Comandos disponíveis:' : 'Available commands:', 'key'),
        txt('  ls                 ' + (lang === 'pt' ? 'lista os arquivos e diretórios' : 'list files and directories')),
        txt('  cat about.md       ' + (lang === 'pt' ? 'quem eu sou' : 'who I am')),
        txt('  cat now.txt        ' + (lang === 'pt' ? 'no que estou trabalhando' : 'what I am working on')),
        txt('  cat contact.vcf    ' + (lang === 'pt' ? 'como falar comigo' : 'how to reach me')),
        txt('  ls toolbox/        ' + (lang === 'pt' ? 'ferramentas que eu uso' : 'tools I use')),
        txt('  ls skills/         ' + (lang === 'pt' ? 'minha stack técnica' : 'my technical stack')),
        txt('  sinfo              ' + (lang === 'pt' ? 'partições do cluster (áreas de atuação)' : 'cluster partitions (focus areas)')),
        txt('  neofetch           ' + (lang === 'pt' ? 'info do sistema' : 'system info')),
        txt('  whoami · pwd · date · clear'),
      ],
    }
  }

  if (cmd === 'ls' || cmd === 'll' || cmd === 'ls -la' || cmd === 'ls -l') {
    return { blocks: [{ k: 'ls', entries: HOME_ENTRIES }] }
  }

  if (cmd === 'ls toolbox' || cmd === 'toolbox' || cmd === 'cat toolbox') {
    return {
      blocks: [
        txt('# ' + (lang === 'pt' ? 'ferramentas do dia a dia' : 'daily drivers'), 'comment'),
        { k: 'tags', tags: TOOLBOX },
      ],
    }
  }

  if (cmd === 'ls skills' || cmd === 'skills' || cmd === 'cat skills.json' || cmd === 'cat skills') {
    const out: Block[] = []
    for (const g of t.skills.groups) {
      out.push(txt(`"${g.title}":`, 'key'))
      out.push({ k: 'tags', tags: Array.from(g.items as string[]) })
    }
    return { blocks: out }
  }

  if (cmd === 'cat about.md' || cmd === 'cat about' || cmd === 'about' || cmd === 'whoami -v') {
    const out: Block[] = [txt('# about.md', 'comment')]
    t.about.notes.forEach((n: string) => out.push(txt(n, 'body')))
    return { blocks: out }
  }

  if (cmd === 'cat now.txt' || cmd === 'now') {
    const role = t.about.cards.find((c: Copy) => /atua|current/i.test(c.title)) ?? t.about.cards[1]
    const dir = t.about.cards.find((c: Copy) => /dire|direction/i.test(c.title)) ?? t.about.cards[3]
    return {
      blocks: [
        txt('# now.txt — ' + (lang === 'pt' ? 'atualizado' : 'updated') + ' ' + new Date().toISOString().slice(0, 10), 'comment'),
        txt('▸ ' + role.title, 'key'),
        txt('  ' + role.text, 'body'),
        txt('▸ ' + dir.title, 'key'),
        txt('  ' + dir.text, 'body'),
        txt('▸ ' + (lang === 'pt' ? 'Disponibilidade' : 'Availability'), 'key'),
        txt('  ' + t.contact.summary, 'body'),
      ],
    }
  }

  if (cmd === 'cat contact.vcf' || cmd === 'contact' || cmd === 'cat contact') {
    const out: Block[] = [txt('# contact.vcf', 'comment')]
    const map: Record<string, string> = {
      LinkedIn: 'linkedin.com/in/cieliocas',
      GitHub: 'github.com/cieliocas',
      Email: 'hamtarf2@gmail.com',
      Telefone: '+55 (86) 9 8821-7293',
      Phone: '+55 (86) 9 8821-7293',
    }
    t.contact.links.forEach((l: Copy) => {
      out.push(txt(`${l.label.padEnd(10)} ${map[l.label] ?? l.value}`, 'body'))
    })
    return { blocks: out }
  }

  if (cmd === 'sinfo' || cmd === 'ls scheduler' || cmd === 'scheduler') {
    return {
      blocks: [
        txt('PARTITION  AVAIL  NODES  STATE  FOCUS', 'key'),
        txt('infra*     up     4      idle   Linux · Proxmox · SLURM', 'body'),
        txt('cloud      up     3      mix    Docker · K8s · CI/CD', 'body'),
        txt('hpc        up     5      alloc  GPU · NVIDIA · Observability', 'body'),
      ],
    }
  }

  if (cmd === 'neofetch' || cmd === 'fetch') {
    const b = bootScript(t, lang)
    return { blocks: [b[8].block, b[9].block] } // ascii + motd
  }

  if (cmd === 'whoami') return { blocks: [txt(USER)] }
  if (cmd === 'pwd') return { blocks: [txt(`/home/${USER}`)] }
  if (cmd === 'date') return { blocks: [txt(new Date().toString())] }
  if (cmd === 'uname' || cmd === 'uname -a') return { blocks: [txt(`Linux ${HOST} 5.14.0-hpc x86_64 GNU/Linux`)] }
  if (cmd.startsWith('cd')) {
    const target = input.slice(2).trim().replace(/\/+$/, '')
    if (!target || target === '~' || target === '/home/' + USER) return { blocks: [] }
    if (['toolbox', 'skills', 'scheduler'].includes(target))
      return { blocks: [txt(`${lang === 'pt' ? 'dica: use' : 'tip: use'} \`ls ${target}/\``, 'comment')] }
    return { blocks: [txt(`cd: ${target}: ${lang === 'pt' ? 'diretório inexistente' : 'no such directory'}`, 'error')] }
  }
  if (cmd === 'sudo' || cmd.startsWith('sudo ')) {
    return { blocks: [txt(`${USER} ${lang === 'pt' ? 'não está no arquivo sudoers. Este incidente será reportado.' : 'is not in the sudoers file. This incident will be reported.'}`, 'error')] }
  }
  if (cmd === 'exit' || cmd === 'logout') {
    return { blocks: [txt(lang === 'pt' ? 'Conexão com forge encerrada. (recarregue para reconectar)' : 'Connection to forge closed. (reload to reconnect)', 'dim')] }
  }

  // unknown
  return {
    blocks: [
      txt(
        `${lang === 'pt' ? 'comando não encontrado' : 'command not found'}: ${input.split(' ')[0]} — ${lang === 'pt' ? 'digite' : 'type'} \`help\``,
        'error',
      ),
    ],
  }
}

// ── Prompt powerline ────────────────────────────────────────────
function Prompt({ dir }: { dir: string }) {
  return (
    <>
      <span className="ps-user">
        <User className="w-3 h-3" strokeWidth={2.5} /> {USER}
      </span>
      <span className="ps-host">
        <Server className="w-3 h-3" strokeWidth={2.5} /> {HOST}
      </span>
      <span className="ps-dir">
        <Folder className="w-3 h-3" strokeWidth={2.5} /> {dir}
      </span>
    </>
  )
}

type Props = { onNavigate: (app: AppId) => void }

export function TerminalApp({ onNavigate }: Props) {
  const { language } = useSiteSettings()
  const t = siteCopy[language]

  const [blocks, setBlocks] = useState<Block[]>([])
  const [bootDone, setBootDone] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Boot sequence (re-runs on language change)
  useEffect(() => {
    setBlocks([])
    setBootDone(false)
    const script = bootScript(t, language)
    const timers: ReturnType<typeof setTimeout>[] = []
    let acc = 300
    script.forEach(({ block, delay }) => {
      acc += delay
      timers.push(setTimeout(() => setBlocks((b) => [...b, block]), acc))
    })
    timers.push(setTimeout(() => setBootDone(true), acc + 200))
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [blocks, bootDone])

  // Focus input when interactive
  useEffect(() => {
    if (bootDone) inputRef.current?.focus()
  }, [bootDone])

  const submit = useCallback(
    (value: string) => {
      const { blocks: out, clear } = runCommand(value, t, language)
      if (clear) {
        setBlocks([])
      } else {
        setBlocks((b) => [...b, { k: 'cmd', dir: '~', cmd: value }, ...out, { k: 'spacer' }])
      }
      if (value.trim()) setHistory((h) => [...h, value])
      setHistIdx(-1)
      setInput('')
    },
    [t, language],
  )

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(idx)
      setInput(history[idx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx === -1) return
      const idx = histIdx + 1
      if (idx >= history.length) {
        setHistIdx(-1)
        setInput('')
      } else {
        setHistIdx(idx)
        setInput(history[idx])
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setBlocks([])
    }
  }

  const renderBlock = (block: Block, i: number) => {
    switch (block.k) {
      case 'spacer':
        return <div key={i} className="h-2.5" />
      case 'cmd':
        return (
          <div key={i} className="prompt-row mt-1">
            <Prompt dir={block.dir} />
            <span className="ps-cmd">{block.cmd}</span>
          </div>
        )
      case 'ascii':
        return <pre key={i} className="term-ascii">{block.text}</pre>
      case 'motd':
        return (
          <div key={i} className="term-motd">
            <div className="term-motd-head">
              <span className="term-motd-title">{block.title}</span>
              <span className="term-motd-tag">“{block.tagline}”</span>
            </div>
            <div className="term-motd-grid">
              {block.rows.map((r) => (
                <div key={r.label} className="term-motd-cell">
                  <span className="term-motd-label">{r.label}</span>
                  <span className="term-motd-value">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        )
      case 'tags':
        return (
          <div key={i} className="flex flex-wrap gap-0 pl-4 mb-1 mt-0.5">
            {block.tags.map((tag) => (
              <span key={tag} className="term-tag">{tag}</span>
            ))}
          </div>
        )
      case 'ls':
        return (
          <div key={i} className="term-ls pl-1">
            {block.entries.map((e) => (
              <span key={e.name} className={e.dir ? 'term-ls-dir' : 'term-ls-file'}>
                {e.name}
              </span>
            ))}
          </div>
        )
      case 'text': {
        const toneClass: Record<string, string> = {
          dim: 'term-line-dim',
          success: 'term-line-success',
          error: 'term-line-error',
          comment: 'term-line-comment',
          warn: 'term-line-warn',
          quote: 'term-line-quote',
          key: 'term-line-key',
          body: 'term-line-body',
        }
        return (
          <div key={i} className={`term-line ${block.tone ? toneClass[block.tone] : ''}`}>
            {block.text}
          </div>
        )
      }
      default:
        return null
    }
  }

  return (
    <div className="term-wrap">
      <Window
        title={`${USER}@${HOST} — ssh — 80×24`}
        titleIcon={<TermIcon className="w-3 h-3" />}
        rightSlot={
          <span className="term-conn" title="connection status">
            <span className="term-conn-dot" />
            <span className="hidden sm:inline">{HOST}</span>
          </span>
        }
      >
        <div
          ref={scrollRef}
          className="term-body"
          style={{ maxHeight: 'calc(100dvh - 170px)', overflowY: 'auto' }}
          onClick={() => bootDone && inputRef.current?.focus()}
        >
          {blocks.map(renderBlock)}

          {/* Active interactive prompt */}
          {bootDone && (
            <div className="prompt-row mt-1">
              <Prompt dir="~" />
              <span className="ps-cmd term-input-wrap">
                <input
                  ref={inputRef}
                  className="term-input"
                  value={input}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="terminal input"
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                />
                {input.length === 0 && <span className="term-cursor" />}
              </span>
            </div>
          )}

          {/* Boot cursor (before interactive) */}
          {!bootDone && (
            <div className="prompt-row mt-1">
              <Prompt dir="~" />
              <span className="ps-cmd"><span className="term-cursor" /></span>
            </div>
          )}
        </div>
      </Window>
      {/* keep onNavigate referenced for future quick-actions */}
      <span hidden aria-hidden onClick={() => onNavigate('projects')} />
    </div>
  )
}
