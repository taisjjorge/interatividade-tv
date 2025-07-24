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
        if (e.key === 'Enter' || e.key === 'ArrowUp') {
          setOpen(true);
          setFocusedIndex(0);
        }
        return;
      }
      if (open && !activeModal) {
        switch (e.key) {
          case 'ArrowLeft':
            setFocusedIndex(prev => (prev - 1 + ICONS.length) % ICONS.length);
            break;
          case 'ArrowRight':
            setFocusedIndex(prev => (prev + 1) % ICONS.length);
            break;
          case 'Enter':
            setActiveModal(ICONS[focusedIndex].label);
            break;
          case 'ArrowDown':
          case 'Escape':
          case 'Backspace':
            setOpen(false);
            break;
          default:
            break;
        }
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [open, focusedIndex, activeModal]);
  
  const ActiveModalComponent = activeModal ? MODALS[activeModal] : null;

  return (
    <div className="container">
      {!activeModal && (
        <button className="menu-toggle" onClick={() => setOpen(!open)}>
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

