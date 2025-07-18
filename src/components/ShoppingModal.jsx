import React from 'react';
import Modal from './Modal/Modal';

const ShoppingModal = ({ onClose }) => (
  <Modal onClose={onClose}>
    <h3>Smart TV 50" :carousel produtos:</h3>
    <p>R$ 2,399,00</p>
    <p>LED Samsung 50DU770</p>
    <button>Comprar</button>
  </Modal>
);
export default ShoppingModal;
