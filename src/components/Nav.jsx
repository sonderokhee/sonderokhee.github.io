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
              className="absolute inset-0 -z-10 rounded-full bg-wine"
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

function NavLinks({ active, onPick, big = false }) {
  const { t } = useLang()
  return (
    <ul className={big ? 'space-y-1' : 'space-y-0.5'}>
      {ids.map((id, i) => {
        const on = active === id
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={onPick}
              className={`group relative isolate flex items-center gap-3 rounded-xl px-3 transition-colors ${big ? 'py-3' : 'py-2.5'} ${
                on ? 'text-ink' : 'text-ink/50 hover:text-ink'
              }`}
            >
              {on && (
                <motion.span
                  layoutId={big ? 'side-active-m' : 'side-active'}
                  className="absolute inset-0 -z-10 rounded-xl bg-sand"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`font-mono text-[10px] tracking-widest ${on ? 'text-wine' : 'text-ink/30'}`}>0{i + 1}</span>
              <span className={big ? 'font-display text-3xl font-semibold' : 'text-sm font-medium'}>{t.nav[id]}</span>
              <span className={`ml-auto h-px bg-wine transition-all duration-500 ${on ? 'w-4' : 'w-0 group-hover:w-2'}`} />
            </a>
          </li>
        )
      })}
    </ul>
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
      {/* ---------- desktop: fixed side rail ---------- */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="fixed inset-y-0 left-0 z-50 hidden w-60 p-4 lg:block"
      >
        <nav className="glass relative flex h-full flex-col overflow-hidden rounded-[28px] p-4 shadow-xl shadow-ink/5">
          {/* scroll progress along the rail's edge */}
          <div className="absolute inset-y-8 right-0 w-0.5 bg-ink/5">
            <motion.div className="h-full w-full origin-top bg-wine" style={{ scaleY: progress }} />
          </div>

          <a href="#top" className="flex items-center gap-3 px-3 pt-2">
            <span className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-ink font-display text-lg font-bold text-cream">
              Y
              <span className="absolute bottom-2 right-2 size-1.5 rounded-full bg-wine-soft" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base font-bold tracking-tight text-ink">yohana<span className="text-wine">.</span></span>
              <span className="label block whitespace-nowrap text-[8.5px] tracking-[0.14em] text-muted">UI/UX · Front-End</span>
            </span>
          </a>

          <div className="mx-3 my-6 h-px bg-ink/10" />
          <span className="label mb-3 px-3 text-[9px] text-ink/35">Menu</span>
          <NavLinks active={active} />

          <div className="mt-auto space-y-4 px-3">
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="size-2 shrink-0 rounded-full bg-wine animate-pulse-dot" />
              <span className="leading-tight">{t.hero.status}</span>
            </div>
            <a
              href="#contact"
              className="block rounded-2xl bg-ink px-4 py-3 text-center text-sm font-medium text-cream transition-colors hover:bg-wine"
            >
              {t.nav.cta}
            </a>
            <div className="flex items-center justify-between">
              <LangSwitch />
              <div className="flex">
                {socials.map((s) => (
                  <a
                    key={s.icon}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-8 place-items-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-wine"
                  >
                    <Icon name={s.icon} className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </motion.aside>

      {/* ---------- mobile: slim top bar + side drawer ---------- */}
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-wine lg:hidden" style={{ scaleX: progress }} />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:hidden">
        <div className="glass flex items-center justify-between rounded-full py-2 pl-5 pr-2 shadow-lg shadow-ink/5">
          <a href="#top" className="font-display text-lg font-bold tracking-tight text-ink">
            yohana<span className="text-wine">.</span>
          </a>
          <div className="flex items-center gap-2">
            <LangSwitch />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Menu"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full bg-ink text-cream"
            >
              <span className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-4 bg-current" />
                <span className="block h-0.5 w-3 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

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
              className="fixed inset-y-0 left-0 z-[80] flex w-[82%] max-w-sm flex-col rounded-r-[28px] bg-cream p-6 shadow-2xl lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold">yohana<span className="text-wine">.</span></span>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid size-10 place-items-center rounded-full bg-ink text-cream">
                  <Icon name="close" className="size-4" />
                </button>
              </div>
              <div className="mt-10">
                <NavLinks active={active} onPick={() => setOpen(false)} big />
              </div>
              <div className="mt-auto space-y-4">
                <a href="#contact" onClick={() => setOpen(false)} className="block rounded-2xl bg-ink px-4 py-3.5 text-center text-sm font-medium text-cream">
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
                      className="grid size-10 place-items-center rounded-full border border-ink/10 text-ink/60"
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
