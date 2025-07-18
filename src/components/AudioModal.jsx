import React from 'react';
import Modal from './Modal/Modal';

const AudioModal = ({ onClose }) => (
  <Modal onClose={onClose}>
    <h3>Multi-áudio :audio icon:</h3>
    <select>
      <option>Original</option>
      <option>Somente torcida</option>
    </select>
  </Modal>
);
export default AudioModal;






