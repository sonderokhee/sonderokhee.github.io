import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n.jsx'
import { profile } from '../content.js'
import { Arrow, Icon, Reveal, SectionHeader } from './ui.jsx'
import { LangSwitch } from './Nav.jsx'

function ContactRow({ icon, label, value, href, extra, i }) {
  return (
    <Reveal delay={0.06 * i}>
      <div className="group relative flex items-center gap-5 border-b border-cream/10 py-6 transition-colors hover:border-wine-soft/60">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-cream/[0.06] text-cream transition-colors group-hover:bg-wine">
          <Icon name={icon} />
        </span>
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="min-w-0 flex-1">
          <span className="label block text-cream/45">{label}</span>
          <span className="mt-1 block truncate font-display text-lg text-cream md:text-2xl">{value}</span>
          <span className="absolute inset-0" aria-hidden="true" />
        </a>
        {extra}
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-cream/15 text-cream/70 transition-all group-hover:rotate-45 group-hover:border-wine-soft group-hover:text-cream">
          <Arrow />
        </span>
      </div>
    </Reveal>
  )
}

export default function Contact() {
  const { t } = useLang()
  const c = t.contact
  const [copied, setCopied] = useState(false)

  const copy = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-ink pt-24 text-cream md:pt-36">
      <div className="bg-grid-dark mask-fade pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-32 top-1/3 size-[560px] rounded-full bg-wine/30 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          index="05"
          kicker={c.kicker}
          dark
          title={
            <>
              {c.title} <span className="text-wine-soft">{c.titleAccent}</span>
            </>
          }
        />

        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal as="p" className="text-lg leading-relaxed text-cream/70">{c.body}</Reveal>
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-wine px-6 py-3.5 text-sm font-medium text-cream shadow-lg shadow-wine/30"
              >
                {profile.email}
                <Arrow className="size-3.5" />
              </motion.a>
              <a href={profile.cv} download className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:border-cream">
                <Icon name="download" className="size-4" />
                {c.cv}
              </a>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 flex items-center gap-2 text-sm text-cream/55">
              <Icon name="pin" className="size-4 text-wine-soft" />
              {profile.location}
            </Reveal>
          </div>

          <div className="border-t border-cream/10">
            <ContactRow
              i={0}
              icon="mail"
              label={c.email}
              value={profile.email}
              href={`mailto:${profile.email}`}
              extra={
                <button
                  type="button"
                  onClick={copy}
                  className="label relative z-10 hidden rounded-full border border-cream/15 px-3 py-1.5 text-cream/70 transition-colors hover:border-cream hover:text-cream sm:block"
                >
                  {copied ? c.copied : c.copy}
                </button>
              }
            />
            <ContactRow i={1} icon="chat" label={c.whatsapp} value={profile.whatsapp} href={profile.whatsappUrl} />
            <ContactRow i={2} icon="linkedin" label={c.linkedin} value="Yohana Oktavia" href={profile.linkedin} />
            <ContactRow i={3} icon="instagram" label={c.instagram} value={profile.instagramHandle} href={profile.instagram} />
          </div>
        </div>

        {/* giant wordmark */}
        <div className="pointer-events-none mt-24 select-none overflow-hidden">
          <motion.div
            initial={{ y: '40%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gradient-to-b from-cream/20 to-cream/0 bg-clip-text text-center font-display text-[19vw] font-bold leading-[0.8] tracking-[-0.06em] text-transparent md:text-[15rem]"
          >
            yohana.
          </motion.div>
        </div>

        <footer className="flex flex-col items-center justify-between gap-4 border-t border-cream/10 py-8 text-sm text-cream/50 md:flex-row">
          <span>© {new Date().getFullYear()} {profile.name}. {t.footer.rights}</span>
          <span className="label">{t.footer.made}</span>
          <div className="flex items-center gap-4">
            <LangSwitch dark />
            <a href="#top" className="transition-colors hover:text-cream">{t.footer.top} ↑</a>
          </div>
        </footer>
      </div>
    </section>
  )
}
