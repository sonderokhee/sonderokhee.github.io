import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useLang } from '../i18n.jsx'
import { profile } from '../content.js'
import { Icon, ease } from './ui.jsx'

const ids = ['about', 'experience', 'services', 'portfolio', 'contact']

export function LangSwitch({ dark = false }) {
  const { lang, setLang, t } = useLang()
  return (
    <div
      role="group"
      aria-label={t.lang}
      className={`relative flex w-fit items-center rounded-full p-1 font-mono text-[11px] font-medium tracking-widest ${dark ? 'bg-cream/10' : 'bg-ink/[0.06]'}`}
    >
      {['en', 'id'].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-10 rounded-full px-3 py-1.5 uppercase transition-colors ${
            lang === l ? 'text-cream' : dark ? 'text-cream/60 hover:text-cream' : 'text-ink/60 hover:text-ink'
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId={`lang-pill-${dark ? 'd' : 'l'}`}
              className="nav-on absolute inset-0 -z-10 rounded-full"
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            />
          )}
          {l}
        </button>
      ))}
    </div>
  )
}

const socials = [
  { icon: 'linkedin', href: profile.linkedin, label: 'LinkedIn' },
  { icon: 'instagram', href: profile.instagram, label: 'Instagram' },
  { icon: 'mail', href: `mailto:${profile.email}`, label: 'Email' },
]

function Mark() {
  return (
    <a href="#top" className="flex items-center gap-3">
      <span className="nav-on grid size-10 place-items-center rounded-full font-display text-sm font-bold tracking-tight text-white">YO</span>
      <span className="hidden leading-tight sm:block">
        <span className="block text-sm font-semibold text-ink">Yohana Oktavia</span>
        <span className="block text-[10px] text-muted">UI/UX · Front-End</span>
      </span>
    </a>
  )
}

export default function Nav() {
  const { t } = useLang()
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    const top = () => window.scrollY < 200 && setActive('')
    window.addEventListener('scroll', top, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', top) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-wine" style={{ scaleX: progress }} />

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-4 py-4 md:px-8"
      >
        <div className="pointer-events-auto"><Mark /></div>

        {/* the pill */}
        <nav aria-label="Main" className="glass-ink pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 rounded-full p-[5px] lg:block">
          <ul className="relative z-10 flex gap-1">
            {ids.map((id) => {
              const on = active === id
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={on ? 'true' : undefined}
                    className={`relative isolate block rounded-full px-[18px] py-[9px] text-[12.5px] font-semibold uppercase tracking-[0.04em] transition-colors duration-300 ${
                      on ? 'text-white' : 'text-cream/60 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-on"
                        className="nav-on absolute inset-0 -z-10 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {t.nav[id]}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="pointer-events-auto flex items-center gap-2">
          <div className="glass-ink rounded-full p-[3px]">
            <div className="relative z-10"><LangSwitch dark /></div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Menu"
            aria-expanded={open}
            className="glass-ink grid size-[42px] place-items-center rounded-full text-cream lg:hidden"
          >
            <span className="relative z-10 flex flex-col gap-1.5">
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-3 self-end bg-current" />
            </span>
          </button>
        </div>
      </motion.header>

      {/* mobile / tablet drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              className="glass-ink fixed inset-y-3 right-3 z-[80] flex w-[82%] max-w-sm flex-col rounded-[28px] p-6 text-cream lg:hidden"
              initial={{ x: '110%' }}
              animate={{ x: 0 }}
              exit={{ x: '110%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="relative z-10 flex items-center justify-between">
                <span className="label text-cream/50">Menu</span>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="nav-on grid size-10 place-items-center rounded-full text-white">
                  <Icon name="close" className="size-4" />
                </button>
              </div>
              <ul className="relative z-10 mt-10 space-y-1">
                {ids.map((id, i) => (
                  <motion.li key={id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1, ease }}>
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-4 rounded-2xl px-4 py-3 font-display text-2xl font-semibold uppercase tracking-tight ${
                        active === id ? 'nav-on text-white' : 'text-cream/75'
                      }`}
                    >
                      <span className="font-mono text-[10px] tracking-widest opacity-60">0{i + 1}</span>
                      {t.nav[id]}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="relative z-10 mt-auto space-y-4">
                <a href="#contact" onClick={() => setOpen(false)} className="nav-on block rounded-full px-4 py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-white">
                  {t.nav.cta}
                </a>
                <div className="flex justify-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.icon}
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/70"
                    >
                      <Icon name={s.icon} className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
