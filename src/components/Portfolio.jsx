import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../i18n.jsx'
import { projects } from '../content.js'
import { Arrow, Icon, Reveal, SectionHeader, ease } from './ui.jsx'

const groups = ['website', 'mobile', 'brand']

/** true once the element has scrolled into view (cards are "dealt" in) */
function useSeen(ref) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { rootMargin: '-10% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return seen
}

/** Spread k cards from a pivot below the row: the front card is brightest, each step back darker. */
function fanLayout(k) {
  return Array.from({ length: k }, (_, i) => {
    const u = k === 1 ? 0 : (i / (k - 1)) * 2 - 1 // -1..1
    const dist = Math.abs(u)
    return { r: u * 20, b: 1 - 0.68 * dist, z: 10 - Math.round(dist * 5), front: dist < 0.01 }
  })
}

function Hand({ id, index, items, open, onToggle, t }) {
  const ref = useRef(null)
  const seen = useSeen(ref)
  // first project of the stack sits in the middle (front) of the fan
  const shown = items.slice(0, 5)
  const order = shown.length >= 3 ? [shown[3], shown[1], shown[0], shown[2], shown[4]].filter(Boolean) : shown
  const layout = fanLayout(order.length)
  const g = t.groups[id]

  return (
    <div ref={ref} className={`${seen ? 'is-in' : ''} ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="work-drawer"
        className="hand-head flex w-full flex-col items-center text-left focus-visible:outline-none"
      >
        <span className="fan" aria-hidden="true">
          {order.map((p, i) => {
            const l = layout[i]
            return (
              <span
                key={p.id}
                className={`fan-card ${l.front ? 'front' : ''}`}
                style={{ '--r': `${l.r}deg`, '--b': l.b, '--z': l.z, '--d': `${0.06 * i}s` }}
              >
                <img src={p.img} alt="" loading="lazy" decoding="async" />
              </span>
            )
          })}
        </span>

        <span className="plate -mt-[calc(var(--ch)*0.24)] grid w-full max-w-[400px] grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[22px] px-5 py-4 text-cream">
          <span className="relative z-10 flex min-w-[3em] flex-col gap-1">
            <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-wine-soft">0{index + 1}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/45">
              {items.length} {t.works}
            </span>
          </span>
          <span className="relative z-10 flex min-w-0 flex-col items-center gap-1.5 text-center">
            <b className="whitespace-nowrap font-display text-lg font-bold uppercase leading-none tracking-[-0.02em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,.35)] lg:text-[22px]">
              {g.t}
            </b>
            <i className="text-[10px] uppercase not-italic leading-snug tracking-[0.14em] text-cream/55">{g.s}</i>
          </span>
          <span className="orb z-10" aria-hidden="true"><em /><em /></span>
        </span>
      </button>
    </div>
  )
}

function Lightbox({ project, onClose, t }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center bg-ink/85 p-4 backdrop-blur-lg md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.figure
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 10 }}
        transition={{ duration: 0.45, ease }}
        className="plate relative w-full max-w-5xl overflow-hidden rounded-3xl text-cream"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={project.img} alt={project.title} className="relative z-10 max-h-[72vh] w-full bg-black/30 object-contain" />
        <figcaption className="relative z-10 flex items-center justify-between gap-4 p-5 md:p-6">
          <div>
            <h3 className="text-xl font-semibold md:text-2xl">{project.title}</h3>
            <div className="mt-2 flex gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="label rounded-full bg-cream/10 px-2.5 py-1 text-cream/70">{t.tagNames[tag]}</span>
              ))}
            </div>
          </div>
          <button type="button" onClick={onClose} className="orb grid size-11! place-items-center" aria-label={t.close}>
            <Icon name="close" className="size-5 text-white" />
          </button>
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}

export default function Portfolio() {
  const { t } = useLang()
  const p = t.portfolio
  const [openGroup, setOpenGroup] = useState(null)
  const [lightbox, setLightbox] = useState(null)
  const drawer = useRef(null)
  const byGroup = Object.fromEntries(groups.map((g) => [g, projects.filter((x) => x.tags.includes(g))]))
  const list = openGroup ? byGroup[openGroup] : []

  const toggle = (g) => {
    const next = openGroup === g ? null : g
    setOpenGroup(next)
    if (next) setTimeout(() => drawer.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
  }

  return (
    <section id="portfolio" className="relative overflow-hidden bg-ink py-24 text-cream md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(139,38,53,0.28),transparent_70%)]" />
      <div className="bg-grid-dark mask-fade pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader index="04" kicker={p.kicker} title={p.title} dark className="mb-6! md:mb-8!" />
        <Reveal as="p" className="flex items-center gap-3 text-sm text-cream/55">
          <span className="block h-px w-8 shrink-0 bg-cream/25" />
          {p.hint}
        </Reveal>

        <div className="mt-14 grid gap-14 md:grid-cols-3 md:gap-6">
          {groups.map((g, i) => (
            <Hand key={g} id={g} index={i} items={byGroup[g]} open={openGroup === g} onToggle={() => toggle(g)} t={p} />
          ))}
        </div>

        {/* the opened stack, laid out */}
        <div id="work-drawer" ref={drawer} className="scroll-mt-24">
          <AnimatePresence mode="wait">
            {openGroup && (
              <motion.div
                key={openGroup}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease }}
                className="overflow-hidden"
              >
                <div className="pt-16">
                  <div className="mb-8 flex items-end justify-between gap-4 border-b border-cream/10 pb-5">
                    <div>
                      <span className="label text-wine-soft">0{groups.indexOf(openGroup) + 1} · {list.length} {p.works}</span>
                      <h3 className="mt-2 text-3xl font-semibold md:text-4xl">{p.groups[openGroup].t}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenGroup(null)}
                      className="label rounded-full border border-cream/15 px-4 py-2 text-cream/70 transition-colors hover:border-cream hover:text-cream"
                    >
                      {p.close} ✕
                    </button>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((item, i) => (
                      <motion.button
                        type="button"
                        key={item.id}
                        initial={{ opacity: 0, y: 40, rotate: ((i % 3) - 1) * 6 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.06 * i }}
                        onClick={() => setLightbox(item)}
                        className="work-tile group relative overflow-hidden rounded-[22px] p-2 text-left focus-visible:outline-2 focus-visible:outline-wine-soft"
                      >
                        <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-black/30">
                          <img
                            src={item.img}
                            alt={item.title}
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                          />
                          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.14),transparent_30%,transparent_60%,rgba(0,0,0,.45))]" />
                          <span className="label absolute left-3 top-3 rounded-full bg-black/35 px-2.5 py-1 text-cream/80 backdrop-blur">
                            {String(projects.indexOf(item) + 1).padStart(2, '0')}
                          </span>
                        </span>
                        <span className="flex items-center justify-between gap-3 px-3 pb-2 pt-4">
                          <span className="min-w-0">
                            <span className="block truncate font-display text-lg font-semibold text-cream">{item.title}</span>
                            <span className="label mt-1 block text-cream/45">{item.tags.map((tag) => p.tagNames[tag]).join(' · ')}</span>
                          </span>
                          <span className="orb grid place-items-center transition-transform group-hover:rotate-45">
                            <Arrow className="size-4 text-white" />
                          </span>
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>{lightbox && <Lightbox project={lightbox} t={p} onClose={() => setLightbox(null)} />}</AnimatePresence>
    </section>
  )
}
