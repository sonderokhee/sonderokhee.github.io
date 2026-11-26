import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { useLang } from '../i18n.jsx'
import { skills } from '../content.js'
import { Reveal, SectionHeader } from './ui.jsx'

function Timeline({ label, items, present, accent = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  return (
    <div ref={ref}>
      <Reveal className="label mb-8 text-cream/50">{label}</Reveal>
      <div className="relative pl-8">
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-cream/10" />
        <motion.div className="absolute left-[5px] top-2 bottom-2 w-px origin-top bg-wine-soft" style={{ scaleY: scrollYProgress }} />
        <div className="space-y-6">
          {items.map((it, i) => (
            <Reveal key={it.org} delay={0.08 * i}>
              <article className="group glass-dark relative rounded-2xl p-6 transition-colors hover:border-wine-soft/50 md:p-7">
                <span
                  className={`absolute -left-[31px] top-8 size-[11px] rounded-full border-2 border-ink ${
                    !it.to && accent ? 'bg-wine-soft animate-pulse-dot' : 'bg-cream/40'
                  }`}
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="label text-wine-soft">
                    {it.from} — {it.to ?? present}
                  </span>
                  {!it.to && (
                    <span className="label rounded-full bg-wine px-2.5 py-1 text-cream">{present}</span>
                  )}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-cream md:text-2xl">{it.role}</h3>
                <p className="mt-1 text-sm text-cream/55">{it.org}</p>
                {it.desc && <p className="mt-4 leading-relaxed text-cream/70">{it.desc}</p>}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  const { t } = useLang()
  const e = t.experience
  return (
    <section id="experience" className="relative overflow-hidden bg-ink py-24 text-cream md:py-36">
      <div className="bg-grid-dark mask-fade pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-20 size-[520px] rounded-full bg-wine/25 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader index="02" kicker={e.kicker} title={e.title} dark />

        <div className="grid gap-16 md:grid-cols-[1.25fr_1fr] md:gap-12">
          <Timeline label={e.workLabel} items={e.work} present={e.present} accent />
          <div className="space-y-16">
            <Timeline label={e.eduLabel} items={e.edu} present={e.present} />
            <div>
              <Reveal className="label mb-6 text-cream/50">{e.toolsLabel}</Reveal>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.03 * i, type: 'spring', stiffness: 300, damping: 22 }}
                    whileHover={{ y: -3 }}
                    className="rounded-full border border-cream/15 bg-cream/[0.03] px-4 py-2 text-sm text-cream/80 hover:border-wine-soft hover:text-cream"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
