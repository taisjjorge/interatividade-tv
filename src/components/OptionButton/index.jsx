import React from 'react';
import './optionButton.css';

const OptionButton = ({ label, focused, onClick }) => (
  <div className="option-button-container">
    <button
      className={`option-button ${focused ? 'focused' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  </div>
);
export default OptionButton;