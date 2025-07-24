import React from 'react';
import { TbArrowBackUp } from "react-icons/tb";

const BackButton = ({ focused, onClick }) => (
  <button className={`back-button ${focused ? 'focused' : ''}`} onClick={onClick}>
    <TbArrowBackUp size={28} />
  </button>
);
export default BackButton;