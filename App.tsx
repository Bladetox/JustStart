import { useEffect, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, ChevronRight, DoorOpen, Menu, Moon, Sun, X } from 'lucide-react'

type Room = { id: string; no: string; eyebrow: string; title: React.ReactNode; description: string; cta: string; href: string; note: string; accent: 'teal' | 'sand' | 'gold' | 'sage' }

const rooms: Room[] = [
  { id:'start', no:'01', eyebrow:'The starting point', title:<>Find the model<br/>that <em>fits you.</em></>, description:'Before the tools, before the funding—get clear on whether you are naturally product, service, or hybrid inclined.', cta:'Take the 3-minute quiz', href:'https://juststart-quizz.vercel.app', note:'No sign-up. Instant result.', accent:'teal' },
  { id:'setup', no:'02', eyebrow:'The first system', title:<>Start taking<br/><em>bookings today.</em></>, description:'A simple Google Forms and Calendar setup for service businesses that need a working first system, not more complexity.', cta:'Open the free setup', href:'https://docs.google.com/document/d/1-BhoqVYTL_RICL1SofUBMZC2_5Qp6ZDZkPx-RyMTVPw/edit?usp=drivesdk', note:'Free. Built to use today.', accent:'sand' },
  { id:'nextslot', no:'03', eyebrow:'The main room', title:<>When manual<br/>starts costing <em>you.</em></>, description:'You have demand. Your free setup did its job. Now use a booking system made for South African service businesses ready to grow.', cta:'Enter NextSlot', href:'https://www.nextslot.co.za', note:'Bookings with more clarity.', accent:'gold' },
  { id:'funding', no:'04', eyebrow:'The capital room', title:<>Fund what is<br/><em>already working.</em></>, description:'Growth capital makes more sense when you have direction, a system, and a clear reason for the investment.', cta:'Explore Vula funding', href:'https://vula-lac.vercel.app', note:'Funding for every stage.', accent:'sage' },
]

function Mark(){ return <div className="mark" aria-label="Just Start"><i>J</i><span>S</span></div> }
function Arrow(){ return <
