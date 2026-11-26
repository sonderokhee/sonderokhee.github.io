import { createContext, useContext, useEffect, useState } from 'react'
import { copy } from './content.js'

const LangContext = createContext({ lang: 'en', t: copy.en, setLang: () => {} })

function initialLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'en' || saved === 'id') return saved
  } catch {}
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('id')) return 'id'
  return 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('lang', lang) } catch {}
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang, t: copy[lang] }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
