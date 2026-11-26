import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useLang } from '../i18n.jsx'
import { profile } from '../content.js'
import WaveCard from './WaveCard.jsx'
import { Arrow, Icon, ease } from './ui.jsx'

function RoleTicker({ roles }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [roles.length])
  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[i]}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.55, ease }}
          className="block whitespace-nowrap text-wine"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  const { t } = useLang()
  const h = t.hero
  const { scrollY } = useScroll()
  const fade = useTransform(scrollY, [0, 500], [1, 0])
  const lift = useTransform(scrollY, [0, 500], [0, -80])

  const word = {
    hidden: { y: '105%' },
    show: (d) => ({ y: '0%', transition: { duration: 1, ease, delay: 0.15 + d } }),
  }

  return (
    <section id="top" className="grain relative isolate overflow-hidden bg-cream pt-28 md:pt-32">
      {/* backdrop */}
      <div className="bg-grid mask-fade pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute -right-40 top-10 -z-10 size-[620px] rounded-full bg-wine/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 size-[520px] rounded-full bg-sand blur-[100px]" />

      <motion.div style={{ opacity: fade, y: lift }} className="mx-auto grid max-w-6xl items-center gap-6 px-6 pb-16 md:grid-cols-[1.15fr_1fr] md:pb-24">
        <div className="order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-sm text-ink/80"
          >
            <span className="size-2 rounded-full bg-wine animate-pulse-dot" />
            {h.status}
          </motion.div>

          <p className="label mt-8 text-muted">{h.hello}</p>
          <h1 className="mt-3 font-display text-[clamp(3.4rem,9vw,7.4rem)] font-bold leading-[0.9] tracking-[-0.04em]">
            <span className="block overflow-hidden pb-1">
              <motion.span className="block" variants={word} initial="hidden" animate="show" custom={0}>Yohana</motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]"
                variants={word}
                initial="hidden"
                animate="show"
                custom={0.1}
              >
                Oktavia<span className="text-wine [-webkit-text-stroke:0]">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 font-display text-2xl font-medium md:text-3xl"
          >
            <RoleTicker roles={h.roles} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease }}
            className="mt-5 max-w-md text-base leading-relaxed text-ink/70 md:text-lg"
          >
            {h.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#portfolio" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-wine">
              {h.primary}
              <span className="grid size-6 place-items-center rounded-full bg-cream/15 transition-transform group-hover:rotate-45">
                <Arrow className="size-3.5" />
              </span>
            </a>
            <a href={profile.cv} download className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5">
              <Icon name="download" className="size-4" />
              {h.secondary}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 flex items-center gap-2 text-sm text-muted"
          >
            <Icon name="pin" className="size-4 text-wine" />
            {h.based}, Indonesia
          </motion.div>
        </div>

        <motion.div
          className="order-1 md:order-2"
          initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
        >
          <WaveCard chips={h.chips} hint={h.hint} />
        </motion.div>
      </motion.div>

      <a href="#about" className="label absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex">
        {h.scroll}
        <span className="relative h-9 w-[1px] overflow-hidden bg-ink/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-wine"
            animate={{ y: [-12, 36] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </a>
    </section>
  )
}
