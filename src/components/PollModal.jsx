import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import OptionButton from './OptionButton';
import BackButton from './BackButton';
import { LuCheckCheck } from "react-icons/lu";
const OPTIONS = ["Estou amando", "Não tenho certeza"];
const PollModal = ({ onClose }) => {
  const [focused, setFocused] = useState(0); // opções: 0,1 e voltar: 2
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === 'ArrowRight') setFocused(2);
      if (e.key === 'ArrowLeft') setFocused(0);
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        if (focused === 2) return;
        setFocused(prev => (prev === 0 ? 1 : 0));
      }
      if (e.key === 'Enter') {
        if (focused === 2) onClose();
        else console.log('Voto:', OPTIONS[focused]);
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [focused, onClose]);
  return (
    <Modal>
      <div className="modal-window">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#CCCCCC', padding: '8px', borderRadius: '50%' }}>
            <LuCheckCheck size={24} />
          </div>
          <h3 style={{ color: '#fff' }}>Enquetes</h3>
        </div>
        <hr />
        <div>
          <p style={{ color: '#EEEEEE', fontWeight: 500, width: '226px' }}>
          O que você está achando de votar na transmissão?
          </p>
          {OPTIONS.map((label, idx) => (
            <OptionButton
              key={label}
              label={label}
              focused={focused === idx}
              onClick={() => console.log(label)}
            />
          ))}
        </div>
      </div>
      <BackButton focused={focused === 2} onClick={onClose} />
    </Modal>
  );
};
export default PollModal;