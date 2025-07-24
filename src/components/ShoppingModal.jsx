import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import OptionButton from './OptionButton';
import BackButton from './BackButton';
import { RiShoppingBasket2Line } from "react-icons/ri";
const OPTIONS = ["Comprar"];
const ShoppingModal = ({ onClose }) => {
  const [focused, setFocused] = useState(0); // Comprar: 0 e voltar: 1
  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === 'ArrowRight') setFocused(1);
      if (e.key === 'ArrowLeft') setFocused(0);
      if (e.key === 'Enter') {
        if (focused === 1) onClose();
        else console.log('Compra efetuada!');
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [focused, onClose]);
  return (
    <Modal>
      <div className="modal-window">
        <h3><RiShoppingBasket2Line size={28} /> Smart TV 50"</h3>
        <p>R$ 2.399,00</p>
        <p>LED Samsung 50DU770</p>
        {OPTIONS.map((label, idx) => (
          <OptionButton
            key={label}
            label={label}
            focused={focused === idx}
            onClick={() => console.log(label)}
          />
        ))}
      </div>
      <BackButton focused={focused === 1} onClick={onClose} />
    </Modal>
  );
};
export default ShoppingModal;
