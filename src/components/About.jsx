import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useLang } from '../i18n.jsx'
import { skills } from '../content.js'
import { Reveal, SectionHeader } from './ui.jsx'

export function Marquee() {
  const row = [...skills, ...skills]
  return (
    <div className="relative overflow-hidden border-y border-cream/10 bg-ink py-5 text-cream">
      <div className="mask-fade-x">
        <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
          {row.map((s, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-xl font-medium md:text-2xl">
              {s}
              <svg viewBox="0 0 24 24" className="size-4 text-wine-soft" aria-hidden="true"><path fill="currentColor" d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" /></svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const { t } = useLang()
  const a = t.about
  const photo = useRef(null)
  const { scrollYProgress } = useScroll({ target: photo, offset: ['start end', 'end start'] })
  const py = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="about" className="relative bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader index="01" kicker={a.kicker} title={a.title} />

        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal>
            <div ref={photo} className="hud relative aspect-[4/5] overflow-hidden rounded-[28px] bg-ink">
              <motion.img
                src="/media/about.webp"
                alt="Yohana Oktavia"
                loading="lazy"
                style={{ y: py }}
                className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover object-[86%_62%] grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-wine/30 via-transparent to-transparent mix-blend-screen" />
              <span className="label absolute left-5 top-5 text-cream/60">Bali · ID</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
              {a.facts.map((f) => (
                <div key={f.k} className="bg-cream p-4">
                  <div className="label text-muted">{f.k}</div>
                  <div className="mt-1 text-sm font-medium text-ink">{f.v}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="flex flex-col justify-between gap-12">
            <div className="space-y-6">
              {a.body.map((p, i) => (
                <Reveal key={i} delay={0.08 * i} as="p" className={i === 0 ? 'font-display text-2xl leading-snug text-ink md:text-3xl' : 'text-lg leading-relaxed text-ink/70'}>
                  {p}
                </Reveal>
              ))}
            </div>

            <div className="grid grid-cols-3 border-t border-ink/10">
              {a.stats.map((s, i) => (
                <Reveal key={s.l} delay={0.1 * i} className={`pt-6 ${i ? 'border-l border-ink/10 pl-4 md:pl-6' : 'pr-4'}`}>
                  <div className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                    {s.n}
                    <span className="text-wine">.</span>
                  </div>
                  <div className="mt-2 text-xs leading-snug text-muted md:text-sm">{s.l}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
