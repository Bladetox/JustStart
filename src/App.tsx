import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowDown } from 'lucide-react'

type Accent = 'teal' | 'sand' | 'gold' | 'sage'

type Room = {
  id: string
  no: string
  eyebrow: string
  title: string
  titleEm: string
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
    title: 'Find the model',
    titleEm: 'that fits you.',
    description: 'Before the tools, before the funding — get clear on whether you are naturally product, service, or hybrid inclined.',
    cta: 'Take the 3-minute quiz',
    href: 'https://juststart-quizz.vercel.app',
    note: 'No sign-up. Instant result.',
    accent: 'teal',
  },
  {
    id: 'setup',
    no: '02',
    eyebrow: 'The first system',
    title: 'Start taking',
    titleEm: 'bookings today.',
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
    title: 'When manual starts',
    titleEm: 'costing you.',
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
    title: 'Fund what is',
    titleEm: 'already working.',
    description: 'Growth capital makes more sense when you have direction, a system, and a clear reason for the investment.',
    cta: 'Explore Vula funding',
    href: 'https://vula-lac.vercel.app',
    note: 'Funding for every stage.',
    accent: 'sage',
  },
]

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sectionRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { threshold: 0.6 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      {/* Logo */}
      <div className="logo" aria-label="Just Start">JS</div>

      {/* Progress dots */}
      <nav className="progress" aria-label="Room navigation">
        {rooms.map((r, i) => (
          <button
            key={r.id}
            className={`progress__dot progress__dot--${r.accent}${activeIndex === i ? ' active' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={r.eyebrow}
          />
        ))}
        <div
          className="progress__line"
          style={{ height: `${(activeIndex / (rooms.length - 1)) * 100}%` }}
        />
      </nav>

      {/* Rooms */}
      {rooms.map((room, i) => (
        <section
          key={room.id}
          ref={el => { sectionRefs.current[i] = el }}
          className={`room room--${room.accent}${activeIndex === i ? ' room--active' : ''}`}
        >
          {/* Background number */}
          <span className="room__bg-no" aria-hidden="true">{room.no}</span>

          {/* Ambient glow */}
          <div className={`room__glow room__glow--${room.accent}`} />

          <div className="room__content">
            <p className="room__eyebrow">
              <span className="room__eyebrow-no">{room.no}</span>
              {room.eyebrow}
            </p>

            <h2 className="room__title">
              {room.title}<br />
              <em className={`room__title-em room__title-em--${room.accent}`}>{room.titleEm}</em>
            </h2>

            <p className="room__description">{room.description}</p>

            <div className="room__actions">
              <a
                className={`room__cta room__cta--${room.accent}`}
                href={room.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {room.cta}
                <ArrowUpRight size={15} />
              </a>
              <span className="room__note">{room.note}</span>
            </div>
          </div>

          {/* Scroll hint — only on first room */}
          {i === 0 && (
            <div className="room__scroll-hint" aria-hidden="true">
              <ArrowDown size={16} />
              <span>scroll</span>
            </div>
          )}

          {/* Room number label bottom right */}
          <span className="room__label" aria-hidden="true">{room.no} / 04</span>
        </section>
      ))}

      {/* Entry hero — prepended before rooms via CSS order */}
    </div>
  )
}
