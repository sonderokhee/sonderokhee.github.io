import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useLang } from '../i18n.jsx'
import { projects } from '../content.js'
import { Arrow, Icon, SectionHeader, ease } from './ui.jsx'

const filters = ['all', 'website', 'mobile', 'brand']

function Lightbox({ project, onClose, t }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[70] grid place-items-center bg-ink/85 p-4 backdrop-blur-lg md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.figure
        layoutId={`card-${project.id}`}
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-cream"
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: 0.5, ease }}
      >
        <img src={project.img} alt={project.title} className="max-h-[75vh] w-full bg-sand object-contain" />
        <figcaption className="flex items-center justify-between gap-4 p-5 md:p-6">
          <div>
            <h3 className="text-xl font-semibold md:text-2xl">{project.title}</h3>
            <div className="mt-2 flex gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="label rounded-full bg-sand px-2.5 py-1 text-ink/70">{t.tagNames[tag]}</span>
              ))}
            </div>
          </div>
          <button type="button" onClick={onClose} className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-cream transition-colors hover:bg-wine" aria-label={t.close}>
            <Icon name="close" className="size-5" />
          </button>
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}

export default function Portfolio() {
  const { t } = useLang()
  const p = t.portfolio
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)
  const list = projects.filter((x) => filter === 'all' || x.tags.includes(filter))

  return (
    <section id="portfolio" className="relative bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader index="04" kicker={p.kicker} title={p.title} className="mb-0!" />
          <LayoutGroup id="filters">
            <div className="glass flex w-fit flex-wrap gap-1 rounded-full p-1.5">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === f ? 'text-cream' : 'text-ink/60 hover:text-ink'}`}
                >
                  {filter === f && (
                    <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{p.filters[f]}</span>
                  <span className={`relative ml-1.5 font-mono text-[10px] ${filter === f ? 'text-cream/60' : 'text-ink/35'}`}>
                    {f === 'all' ? projects.length : projects.filter((x) => x.tags.includes(f)).length}
                  </span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        <motion.div layout className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((item, i) => (
              <motion.button
                type="button"
                key={item.id}
                layout
                layoutId={`card-${item.id}`}
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease, delay: 0.03 * (i % 6) }}
                onClick={() => setOpen(item)}
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-sand text-left ring-1 ring-ink/5 focus-visible:outline-2 focus-visible:outline-wine"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <div className="label text-cream/60">{item.tags.map((tag) => p.tagNames[tag]).join(' · ')}</div>
                    <h3 className="mt-1.5 text-lg font-semibold text-cream">{item.title}</h3>
                  </div>
                  <span className="grid size-10 shrink-0 translate-y-2 place-items-center rounded-full bg-cream text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:bg-wine group-hover:text-cream group-hover:opacity-100">
                    <Arrow />
                  </span>
                </div>
                <span className="label absolute left-4 top-4 rounded-full bg-cream/85 px-2.5 py-1 text-ink/70 backdrop-blur">
                  {String(projects.indexOf(item) + 1).padStart(2, '0')}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{open && <Lightbox project={open} t={p} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
