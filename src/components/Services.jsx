import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useLang } from '../i18n.jsx'
import { Icon, Reveal, SectionHeader } from './ui.jsx'

const icons = ['research', 'brand', 'wire', 'code']

function ServiceCard({ item, i }) {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const glow = useMotionTemplate`radial-gradient(320px circle at ${x}px ${y}px, rgba(139,38,53,0.14), transparent 70%)`
  return (
    <Reveal delay={0.08 * i} className="h-full">
      <div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          x.set(e.clientX - r.left)
          y.set(e.clientY - r.top)
        }}
        onPointerLeave={() => { x.set(-200); y.set(-200) }}
        className="group relative h-full overflow-hidden rounded-3xl border border-ink/10 bg-cream p-7 transition-all duration-500 hover:-translate-y-1 hover:border-wine/30 hover:shadow-2xl hover:shadow-wine/10 md:p-8"
      >
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />
        <div className="relative flex items-start justify-between">
          <span className="grid size-14 place-items-center rounded-2xl bg-ink text-cream transition-colors duration-500 group-hover:bg-wine">
            <Icon name={icons[i]} className="size-6" />
          </span>
          <span className="label text-ink/35">0{i + 1}</span>
        </div>
        <h3 className="relative mt-10 text-2xl font-semibold">{item.t}</h3>
        <p className="relative mt-3 leading-relaxed text-ink/65">{item.d}</p>
        <div className="relative mt-8 h-px w-full overflow-hidden bg-ink/10">
          <span className="absolute inset-y-0 left-0 w-0 bg-wine transition-all duration-700 group-hover:w-full" />
        </div>
      </div>
    </Reveal>
  )
}

export default function Services() {
  const { t } = useLang()
  const s = t.services
  return (
    <section id="services" className="relative bg-sand py-24 md:py-36">
      <div className="bg-grid mask-fade pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader index="03" kicker={s.kicker} title={s.title} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((item, i) => (
            <ServiceCard key={i} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
