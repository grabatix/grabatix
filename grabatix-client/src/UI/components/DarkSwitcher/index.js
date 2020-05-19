/** @format */

import React, { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

import './index.css'

const DarkSwitcher = () => {
  let initTheme =
    typeof window !== 'undefined' && window.__theme ? window.__theme : 'light'
  const [theme, setTheme] = useState(initTheme)
  useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => setTheme(window.__theme)
  }, [])
  return (
    <button
      className="dark-switcher"
      onClick={e =>
        window &&
        window.__setPreferredTheme(theme === 'dark' ? 'light' : 'dark')
      }
      aria-label={
        theme === 'dark'
          ? 'Click to Disable NightMode'
          : 'Click to Enable Night Mode'
      }
      title={theme === 'dark' ? 'Disable Night Mode' : 'Enable Night Mode'}
      tabIndex={0}
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  )
}

export default DarkSwitcher
