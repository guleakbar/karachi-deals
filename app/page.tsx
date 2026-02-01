// app/page.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaArrowRight,
  FaClock,
  FaFire,
  FaGlobe,
  FaMapMarkerAlt,
  FaPlane,
  FaTag,
  FaUsers,
} from "react-icons/fa"
import CosmicBackground from "@/components/CosmicBackground"

type HighlightRoute = {
  city: string
  code: string
  priceFrom: string
  savings: string
  image: string
  deals: number
  duration: string
}

const HIGHLIGHT_ROUTES: HighlightRoute[] = [
  {
    city: "Dubai",
    code: "DXB",
    priceFrom: "14,500",
    savings: "14,500",
    duration: "2h 15m",
    deals: 12,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&auto=format&fit=crop",
  },
  {
    city: "Istanbul",
    code: "IST",
    priceFrom: "42,000",
    savings: "48,000",
    duration: "5h 30m",
    deals: 8,
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=900&q=80&auto=format&fit=crop",
  },
  {
    city: "Bangkok",
    code: "BKK",
    priceFrom: "27,500",
    savings: "27,500",
    duration: "6h 45m",
    deals: 15,
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=900&q=80&auto=format&fit=crop",
  },
]

export default function Home() {
  const [now, setNow] = useState<Date | null>(null)
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    try {
      // plug real ESP here later
      await new Promise((r) => setTimeout(r, 900))
      setSubscribed(true)
      setEmail("")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen">
      <CosmicBackground />

      {/* Top bar */}
      <header className="app-container pt-6 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 border border-slate-700/60">
            <FaPlane className="text-cyan-300" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-slate-50">
              Furren
            </p>
            <p className="text-xs text-slate-400">
              Flight deals from Karachi, for real travelers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-400">
          {now && (
            <div className="hidden sm:flex items-center gap-2">
              <FaClock className="text-cyan-300" />
              <span>
                {now.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                PKT
              </span>
            </div>
          )}
          <Link
            href="/deals"
            className="hidden sm:inline-flex items-center gap-1 text-slate-200 hover:text-cyan-300 transition-colors"
          >
            View all deals
            <FaArrowRight className="h-3 w-3" />
          </Link>
          <Link
            href="/admin"
            className="text-slate-400 hover:text-slate-100 transition-colors"
          >
            Admin
          </Link>
        </div>
      </header>

      <main className="app-container pb-16">
        {/* Hero */}
        <section className="grid gap-10 pb-12 pt-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-xs text-slate-300 ring-1 ring-slate-700/70">
              <FaFire className="text-amber-300" />
              <span>Live round‑trip deals from Karachi</span>
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Find global flight deals
              <span className="block bg-gradient-to-r from-cyan-300 via-emerald-300 to-sky-400 bg-clip-text text-transparent">
                that actually make sense.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Furren monitors routes from Karachi and surfaces real, bookable
              round‑trip deals to major hubs. No fake “was” prices, no gimmicks
              – just clean, comparable deals you can open in Google Flights.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/deals"
                className="btn-primary text-sm sm:text-base"
              >
                Browse live deals
                <FaArrowRight className="h-4 w-4" />
              </Link>
              <span className="text-xs text-slate-400 sm:text-sm">
                Average savings on highlighted routes:{" "}
                <span className="font-semibold text-emerald-300">45–60%</span>
              </span>
            </div>

            {/* Small stats row */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md text-xs sm:text-sm">
              <div className="rounded-2xl bg-slate-900/80 px-4 py-3 ring-1 ring-slate-700/70">
                <div className="flex items-center gap-2 text-slate-400">
                  <FaGlobe className="text-cyan-300" />
                  <span>Destinations</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-slate-50">
                  40+
                </p>
              </div>
              <div className="rounded-2xl bg-slate-900/80 px-4 py-3 ring-1 ring-slate-700/70">
                <div className="flex items-center gap-2 text-slate-400">
                  <FaTag className="text-emerald-300" />
                  <span>Active deals</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-slate-50">
                  150+
                </p>
              </div>
              <div className="rounded-2xl bg-slate-900/80 px-4 py-3 ring-1 ring-slate-700/70">
                <div className="flex items-center gap-2 text-slate-400">
                  <FaUsers className="text-sky-300" />
                  <span>Travellers</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-slate-50">
                  12k+
                </p>
              </div>
            </div>
          </motion.div>

          {/* Highlight card stack */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-emerald-400/10 to-sky-500/20 blur-3xl" />
            <div className="relative space-y-4">
              {HIGHLIGHT_ROUTES.map((route, idx) => (
                <motion.article
                  key={route.code}
                  className="gradient-border rounded-2xl bg-slate-950/80 p-3 md:p-4 card-shadow"
                  initial={{ opacity: 0, x: 30, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.15 + idx * 0.07 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <div className="flex gap-3">
                    <div className="relative h-20 w-28 overflow-hidden rounded-xl md:h-24 md:w-32">
                      <img
                        src={route.image}
                        alt={route.city}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                            Karachi → {route.city}
                          </p>
                          <p className="text-sm font-semibold text-slate-50">
                            {route.city} ({route.code})
                          </p>
                        </div>
                        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-300">
                          {route.deals} deals
                        </span>
                      </div>

                      <div className="mt-3 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-[11px] text-slate-400">
                            From (round‑trip)
                          </p>
                          <p className="text-lg font-semibold text-slate-50">
                            PKR {route.priceFrom}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] text-emerald-300">
                            Save ~PKR {route.savings}
                          </p>
                          <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-slate-400">
                            <FaClock className="h-3 w-3 text-slate-400" />
                            <span>{route.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Newsletter */}
        <section className="mt-4 grid gap-8 rounded-3xl bg-slate-950/80 px-5 py-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:px-8 md:py-8 ring-1 ring-slate-800">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Email alerts
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-50 sm:text-2xl">
              Quiet, high‑signal flight alerts from Karachi.
            </h2>
            <p className="mt-3 text-xs text-slate-400 sm:text-sm">
              One concise email when we pick up a genuinely good round‑trip
              fare. No daily spam, no “only 2 seats left” theatrics.
            </p>
          </div>

          <div>
            {subscribed ? (
              <div className="rounded-2xl bg-emerald-950/60 px-4 py-4 text-sm text-emerald-200 ring-1 ring-emerald-500/40">
                <p className="font-semibold">You’re in.</p>
                <p className="mt-1 text-xs text-emerald-200/90">
                  We’ll send you the next round of Furren picks when we see
                  something that’s actually worth booking.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your best email for travel deals"
                  className="input-soft text-xs sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center text-xs sm:text-sm disabled:opacity-70"
                >
                  {submitting ? "Saving your spot…" : "Get deal alerts"}
                </button>
                <p className="text-[10px] text-slate-500">
                  Low‑frequency list. Unsubscribe any time with one click.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/80 py-4 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} Furren. Built for travelers leaving
        Karachi.
      </footer>
    </div>
  )
}
