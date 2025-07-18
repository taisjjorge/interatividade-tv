import React from 'react';
import './modal.css';

const Modal = ({ children, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="modal-close" onClick={onClose}> ← Voltar </button>
      {children}
    </div>
  </div>
);
export default Modal;