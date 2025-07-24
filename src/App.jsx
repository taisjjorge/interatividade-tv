import React, { useEffect, useState } from 'react';
import './App.css';
import { RiShoppingBasket2Line, RiMenu4Fill } from "react-icons/ri";
import { PiMusicNoteSimple } from "react-icons/pi";
import { LuCheckCheck } from "react-icons/lu";

import Menu from './components/Menu';
import AudioModal from './components/AudioModal';
import PollModal from './components/PollModal';
import ShoppingModal from './components/ShoppingModal';

const ICONS = [
  { label: 'audio', icon: <PiMusicNoteSimple size={24} /> },
  { label: 'poll', icon: <LuCheckCheck size={24} /> },
  { label: 'shopping', icon: <RiShoppingBasket2Line size={24} /> },
];

const MODALS = {
  audio: AudioModal,
  poll: PollModal,
  shopping: ShoppingModal,
};

const App = () => {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [menuFocused, setMenuFocused] = useState(false);
  const [closeFocused, setCloseFocused] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  
  useEffect(() => {
    const handleKeyUp = (e) => {
      // botão de voltar do controle remoto  responde a Escape e Backspace
      // e também aos códigos de tecla específicos para TVs Samsung e LG
      const BACK_KEYS = ['Escape', 'Backspace'];
      const TV_BACK_KEYCODES = [10009, 461]; // Samsung e LG
      
      const isBackPressed = BACK_KEYS.includes(e.key) || TV_BACK_KEYCODES.includes(e.keyCode);
      if (activeModal && isBackPressed) {
        setActiveModal(null);
        return;
      }
     
      if (!open && !activeModal) {
        if (e.key === 'ArrowUp') {
          setMenuFocused(true);
        } else if (e.key === 'ArrowDown') {
          setMenuFocused(false);
        } else if (menuFocused && e.key === 'Enter') {
          setOpen(true);
          setFocusedIndex(0);
          setMenuFocused(false);
        }
        return;
      }
      
      if (open && !activeModal) {
        if (closeFocused) {
          if (e.key === 'ArrowLeft') {
            setCloseFocused(false);
            setFocusedIndex(ICONS.length - 1);
          } else if (e.key === 'Enter') {
            setOpen(false);
            setCloseFocused(false);
            setMenuFocused(true);
          }
          return;
        }
        switch (e.key) {
          case 'ArrowLeft':
            if (focusedIndex === 0) {
              setCloseFocused(true);
              setFocusedIndex(-1);
            } else {
              setFocusedIndex(prev => (prev - 1 + ICONS.length) % ICONS.length);
            }
            break;
          case 'ArrowRight':
            if (focusedIndex === ICONS.length - 1) {
              setCloseFocused(true);
              setFocusedIndex(-1);
            } else {
              setFocusedIndex(prev => (prev + 1) % ICONS.length);
            }
            break;
          case 'Enter':
            setActiveModal(ICONS[focusedIndex].label);
            break;
          default:
            break;
        }
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [open, focusedIndex, activeModal, menuFocused, closeFocused]);
  
  const ActiveModalComponent = activeModal ? MODALS[activeModal] : null;

  return (
    <div className="container">
      {!activeModal && (
        <button
          className={`menu-toggle ${menuFocused || closeFocused ? 'focused' : ''}`}
          onClick={() => {
            if (open) {
              setOpen(false);
              setCloseFocused(false);
              setMenuFocused(true);
            } else {
              setOpen(true);
              setMenuFocused(false);
              setFocusedIndex(0);
            }
          }}
        >
          {open ? '✕' :
            <div className="menu-icon">
              <RiMenu4Fill size={28} style={{ transform: 'scaleY(-1)' }} />
            </div>}
        </button>
      )}
      {open && !activeModal && (
        <Menu icons={ICONS} focusedIndex={focusedIndex} />
      )}
      {activeModal && (
        <ActiveModalComponent onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
};
export default App;

