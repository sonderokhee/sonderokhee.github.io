import { motion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </M>
  )
}

export function SectionHeader({ index, kicker, title, dark = false, className = '' }) {
  return (
    <div className={`mb-14 md:mb-20 ${className}`}>
      <Reveal className={`label flex items-center gap-3 ${dark ? 'text-cream/60' : 'text-muted'}`}>
        <span className="text-wine-soft">{index}</span>
        <span className={`h-px w-10 ${dark ? 'bg-cream/25' : 'bg-ink/20'}`} />
        <span>{kicker}</span>
      </Reveal>
      <Reveal delay={0.08} as="h2" className={`mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl ${dark ? 'text-cream' : 'text-ink'}`}>
        {title}
      </Reveal>
    </div>
  )
}

export function Arrow({ className = 'size-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export function Icon({ name, className = 'size-5' }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" {...p} /><path d="m4 7 8 6 8-6" {...p} /></>,
    chat: <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z" {...p} />,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="4" {...p} /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" {...p} /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" {...p} /><circle cx="12" cy="12" r="4" {...p} /><path d="M17.5 6.5v.01" {...p} /></>,
    download: <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" {...p} />,
    research: <><circle cx="11" cy="11" r="6" {...p} /><path d="m20 20-4.5-4.5" {...p} /></>,
    brand: <path d="M12 3 4 7v6c0 4 3.4 7 8 8 4.6-1 8-4 8-8V7l-8-4Z" {...p} />,
    wire: <><rect x="3" y="4" width="18" height="16" rx="2" {...p} /><path d="M3 9h18M9 9v11" {...p} /></>,
    code: <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" {...p} />,
    pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" {...p} /><circle cx="12" cy="9.5" r="2.5" {...p} /></>,
    close: <path d="M6 6l12 12M18 6 6 18" {...p} />,
  }
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true">{paths[name]}</svg>
}
