import { useEffect, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, ChevronRight, DoorOpen, Menu, Moon, Sun, X } from 'lucide-react'

type Accent = 'teal' | 'sand' | 'gold' | 'sage'

type Room = {
  id: string
  no: string
  eyebrow: string
  title: React.ReactNode
  description: string
  cta: string
  href: string
  note: string
  accent: Accent
}

const rooms: Room[] = [
  {
    id: 'start',
    no: '01',
    eyebrow: 'The starting point',
    title: <>Find the model<br />that <em>fits you.</em></>,
    description: 'Before the tools, before the funding. Get clear on whether you are naturally product, service, or hybrid inclined.',
    cta: 'Take the 3-minute quiz',
    href: 'https://juststart-quizz.vercel.app',
    note: 'No sign-up. Instant result.',
    accent: 'teal',
  },
  {
    id: 'setup',
    no: '02',
    eyebrow: 'The first system',
    title: <>Start taking<br /><em>bookings today.</em></>,
    description: 'A simple Google Forms and Calendar setup for service businesses that need a working first system, not more complexity.',
    cta: 'Open the free setup',
    href: 'https://docs.google.com/document/d/1-BhoqVYTL_RICL1SofUBMZC2_5Qp6ZDZkPx-RyMTVPw/edit?usp=drivesdk',
    note: 'Free. Built to use today.',
    accent: 'sand',
  },
  {
    id: 'nextslot',
    no: '03',
    eyebrow: 'The main room',
    title: <>When manual<br />starts costing <em>you.</em></>,
    description: 'You have demand. Your free setup did its job. Now use a booking system made for South African service businesses ready to grow.',
    cta: 'Enter NextSlot',
    href: 'https://www.nextslot.co.za',
    note: 'Bookings with more clarity.',
    accent: 'gold',
  },
  {
    id: 'funding',
    no: '04',
    eyebrow: 'The capital room',
    title: <>Fund what is<br /><em>already working.</em></>,
    description: 'Growth capital makes more sense when you have direction, a system, and a clear reason for the investment.',
    cta: 'Explore Vula funding',
    href: 'https://vula-lac.vercel.app',
    note: 'Funding for every stage.',
    accent: 'sage',
  },
]

function Mark() {
  return (
    <div className="mark" aria-label="Just Start">
      <i>J</i><span>S</span>
    </div>
  )
}

function Arrow() {
  return (
    <span className="arrow-icon" aria-hidden="true">
      <ArrowUpRight size={16} />
    </span>
  )
}

function RoomCard({ room, onEnter }: { room: Room; onEnter: (room: Room) => void }) {
  return (
    <article className={`room-card room-card--${room.accent}`} data-id={room.id}>
      <div className="room-card__eyebrow">
        <span className="room-card__no">{room.no}</span>
        <span>{room.eyebrow}</span>
      </div>
      <h2 className="room-card__title">{room.title}</h2>
      <p className="room-card__description">{room.description}</p>
      <div className="room-card__footer">
        <button className="room-card__cta" onClick={() => onEnter(room)}>
          {room.cta} <Arrow />
        </button>
        <span className="room-card__note">
          <Check size={12} /> {room.note}
        </span>
      </div>
    </article>
  )
}

function RoomModal({ room, onClose }: { room: Room; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className={`modal modal--${room.accent}`} role="dialog" aria-modal="true" aria-label={`Room ${room.no}`}>
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__panel">
        <button className="modal__back" onClick={onClose}>
          <ArrowLeft size={16} /> Back
        </button>
        <div className="modal__eyebrow">
          <DoorOpen size={14} />
          <span>{room.eyebrow}</span>
        </div>
        <h2 className="modal__title">{room.title}</h2>
        <p className="modal__description">{room.description}</p>
        <a
          className="modal__cta"
          href={room.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {room.cta} <ArrowUpRight size={16} />
        </a>
        <p className="modal__note">
          <Check size={12} /> {room.note}
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeRoom, setActiveRoom] = useState<Room | null>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    document.body.style.overflow = activeRoom ? 'hidden' : ''
  }, [activeRoom])

  return (
    <div className="app">
      {/* Nav */}
      <nav className="nav">
        <Mark />
        <div className="nav__actions">
          <button className="nav__icon-btn" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="nav__icon-btn" onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && (
          <div className="nav__dropdown">
            {rooms.map(r => (
              <button key={r.id} className="nav__dropdown-item" onClick={() => { setActiveRoom(r); setMenuOpen(false) }}>
                <span className="nav__dropdown-no">{r.no}</span>
                {r.eyebrow}
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <header className="hero">
        <p className="hero__eyebrow">A place to begin</p>
        <h1 className="hero__title">
          Every business starts<br />with a <em>single step.</em>
        </h1>
        <p className="hero__sub">Four rooms. One direction. Your starting point is here.</p>
        <div className="hero__scroll" aria-hidden="true">
          <ArrowDown size={18} />
        </div>
      </header>

      {/* Rooms grid */}
      <main className="rooms">
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} onEnter={setActiveRoom} />
        ))}
      </main>

      {/* Footer */}
      <footer className="footer">
        <Mark />
        <p>Just Start &mdash; Find your starting point.</p>
      </footer>

      {/* Modal */}
      {activeRoom && (
        <RoomModal room={activeRoom} onClose={() => setActiveRoom(null)} />
      )}
    </div>
  )
}
