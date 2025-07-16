import React, { useEffect, useState } from 'react'
import './menu.css'
import { RiShoppingBasket2Line } from "react-icons/ri";
import { PiMusicNoteSimple } from "react-icons/pi";
import { FaPoll } from 'react-icons/fa'

const App = () => {
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(0)

  const ICONS = [
    { label: 'Áudio', icon: <PiMusicNoteSimple size={28} /> },
    { label: 'Enquete', icon: <FaPoll size={28} /> },
    { label: 'Loja', icon: <RiShoppingBasket2Line size={28} /> },
  ]

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (!open) {
        if (e.key === 'Enter' || e.key === 'ArrowUp') {
          setOpen(true)
          setFocusedIndex(0)
        }
        return
      }
      switch (e.key) {
        case 'ArrowLeft':
          setFocusedIndex(prev => (prev - 1 + ICONS.length) % ICONS.length)
          break
        case 'ArrowRight':
          setFocusedIndex(prev => (prev + 1) % ICONS.length)
          break
        case 'Enter':
          const selected = ICONS[focusedIndex]
          console.log('Selecionado:', selected.label)
          if (selected.label === 'Fechar') setOpen(false)
          break
        case 'ArrowDown':
        case 'Escape':
        case 'Backspace':
          setOpen(false)
          break
        default:
          break
      }
    }
    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [open, focusedIndex])
  return (
    <div className="container">
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        {open ? '✕' : '☰'}
      </button>
      {open && (
        <div className="menu">
          {ICONS.map((item, index) => (
            <button
              key={item.label}
              className={`menu-item ${focusedIndex === index ? 'focused' : ''}`}
            >
              {item.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
export default App