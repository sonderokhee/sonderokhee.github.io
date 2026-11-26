import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

const spring = { stiffness: 140, damping: 16, mass: 0.7 }
const clamp = (v) => Math.max(-1, Math.min(1, v))

/**
 * The animated character in a 3D card that tilts toward the cursor and is
 * pulled a little toward it ("magnetic"). Chips float on separate depth layers,
 * so they parallax against the video while the card turns.
 */
export default function WaveCard({ chips = [], hint }) {
  const zone = useRef(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, spring)
  const sy = useSpring(my, spring)

  const rotateY = useTransform(sx, [-1, 1], [-16, 16])
  const rotateX = useTransform(sy, [-1, 1], [13, -13])
  const x = useTransform(sx, [-1, 1], [-22, 22])
  const y = useTransform(sy, [-1, 1], [-16, 16])
  const glareX = useTransform(sx, [-1, 1], [10, 90])
  const glareY = useTransform(sy, [-1, 1], [5, 85])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.42), rgba(255,255,255,0) 50%)`
  const shadowX = useTransform(sx, [-1, 1], [30, -30])
  const shadowY = useTransform(sy, [-1, 1], [50, 20])
  const shadow = useMotionTemplate`${shadowX}px ${shadowY}px 80px -20px rgba(30,25,22,0.45)`

  function onMove(e) {
    if (reduce || e.pointerType === 'touch') return
    const r = zone.current.getBoundingClientRect()
    mx.set(clamp(((e.clientX - r.left) / r.width - 0.5) * 2))
    my.set(clamp(((e.clientY - r.top) / r.height - 0.5) * 2))
  }
  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={zone}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative flex w-full items-center justify-center py-6"
      style={{ perspective: 1200 }}
    >
      {/* idle float */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          style={{ rotateX, rotateY, x, y, transformStyle: 'preserve-3d' }}
          className="relative"
        >
          {/* orbit ring behind the card */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 size-[125%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-wine/35 animate-spin-slow"
            style={{ transform: 'translateZ(-90px)' }}
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 size-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-wine/25 blur-3xl"
            style={{ transform: 'translateZ(-120px)' }}
          />

          {/* the card */}
          <motion.div
            style={{ boxShadow: shadow }}
            className="hud relative aspect-[2/3] w-[min(62vw,380px)] md:w-[min(76vw,380px)] overflow-hidden rounded-[28px] bg-clay ring-1 ring-ink/10"
          >
            <video
              className="absolute inset-0 size-full object-cover"
              src="/media/yohana_wave.mp4"
              poster="/media/yohana_wave_poster.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Animated Pixar-style illustration of Yohana waving hello"
            />
            <motion.div className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: glare }} />
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 label text-ink/55">
              <span>YO—2026</span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-wine animate-pulse-dot" /> live
              </span>
            </div>
          </motion.div>

          {/* floating chips on their own depth layers */}
          {chips.map((c, i) => (
            <div
              key={c}
              className={`glass pointer-events-none absolute whitespace-nowrap rounded-full px-4 py-2 font-display text-sm font-medium text-ink shadow-lg shadow-ink/10 ${
                ['-left-10 top-[18%] md:-left-16', '-right-8 top-[46%] md:-right-14', '-left-6 bottom-[12%] md:-left-12'][i % 3]
              }`}
              style={{ transform: `translateZ(${[90, 130, 70][i % 3]}px)` }}
            >
              <span className="mr-2 inline-block size-1.5 rounded-full bg-wine align-middle" />
              {c}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {hint && (
        <span className="label pointer-events-none absolute -bottom-2 left-1/2 hidden -translate-x-1/2 text-muted md:block">
          ↖ {hint} ↗
        </span>
      )}
    </div>
  )
}
