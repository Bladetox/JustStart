import { useEffect, useRef, useState } from 'react'

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
  bg: string
}

const rooms: Room[] = [
  {
    id: 'start',
    no: '01',
    eyebrow: 'The starting point',
    title: 'Find the model',
    titleEm: 'that fits you.',
    description: 'Before the tools, before the funding. Get clear on whether you are naturally product, service, or hybrid inclined.',
    cta: 'Take the 3-minute quiz',
    href: 'https://juststart-quiz.vercel.app',
    note: 'No sign-up. Instant result.',
    accent: 'teal',
    bg: 'https://iili.io/C1Y1Lla.jpg',
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
    bg: 'https://iili.io/C1Y1PiF.jpg',
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
    bg: 'https://iili.io/C1YvVna.jpg',
  },
  {
    id: 'funding',
    no: '04',
    eyebrow: 'The capital room',
    title: 'Fund what is',
    titleEm: 'already working.',
    description: 'Growth capital makes more sense when you have direction, a system, and a clear reason for the investment.',
    cta: 'Explore Funding',
    href: 'https://vula-lac.vercel.app',
    note: 'Funding for every stage of your business.',
    accent: 'sage',
    bg: 'https://iili.io/C1YvWMJ.jpg',
  },
]

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [entered, setEntered] = useState(false)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (!entered) return
    const observers: IntersectionObserver[] = []
    sectionRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [entered])

  const scrollTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!entered) {
    return (
      <div className="entry">
        <div
          className="entry__bg"
          style={{ backgroundImage: 'url(https://iili.io/C1Y1sKg.jpg)' }}
        />
        <div className="entry__noise" />
        <div className="entry__vignette" />
        <div className="entry__content">
          <p className="entry__label">Just Start</p>
          <h1 className="entry__title">Find your<br /><em>starting point.</em></h1>
          <button className="entry__door" onClick={() => setEntered(true)}>
            <span className="entry__door-frame">
              <span className="entry__door-text">Enter</span>
            </span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="logo">Just Start</div>

      <nav className="progress" aria-label="Rooms">
        {rooms.map((r, i) => (
          <button
            key={r.id}
            className={`progress__dot progress__dot--${r.accent}${activeIndex === i ? ' active' : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={r.eyebrow}
          />
        ))}
      </nav>

      {rooms.map((room, i) => (
        <section
          key={room.id}
          ref={el => { sectionRefs.current[i] = el }}
          className={`room room--${room.accent}${activeIndex === i ? ' room--active' : ''}`}
        >
          {/* Background image */}
          <div
            className="room__bg"
            style={{ backgroundImage: `url(${room.bg})` }}
          />

          {/* Overlay layers */}
          <div className="room__overlay" />
          <div className="room__noise" />
          <div className="room__vignette" />
          <div className="room__scanlines" />
          <div className={`room__light room__light--${room.accent}`} />

          {/* Left title block */}
          <div className="room__left">
            <p className="room__no">{room.no} <span>/</span> 04</p>
            <h2 className="room__title">
              {room.title}<br />
              <em className={`room__em--${room.accent}`}>{room.titleEm}</em>
            </h2>
            <p className="room__desc">{room.description}</p>
          </div>

          {/* Right door */}
          <div className="room__right">
            <a
              href={room.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`door door--${room.accent}`}
            >
              <span className="door__inner">
                <span className="door__cta">{room.cta}</span>
                <span className="door__note">{room.note}</span>
              </span>
            </a>
          </div>

          {/* Floor plaque */}
          <div className="room__plaque">
            <span className={`room__plaque-line room__plaque-line--${room.accent}`} />
            <span className="room__plaque-text">{room.eyebrow}</span>
            <span className={`room__plaque-line room__plaque-line--${room.accent}`} />
          </div>
        </section>
      ))}
    </div>
  )
}
