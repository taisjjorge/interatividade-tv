import React from 'react';
import Modal from './Modal/Modal';

const PollModal = ({ onClose }) => (
  <Modal onClose={onClose}>
    <h3>Enquetes :poll icon:</h3>
    <p>O que você está achando de votar na transmissão?</p>
    <button>Estou amando</button>
    <button>Não tenho certeza</button>
  </Modal>
);
export default PollModal;