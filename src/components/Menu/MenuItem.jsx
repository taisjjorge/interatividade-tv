import React from 'react';

const MenuItem = ({ icon, focused }) => (
  <button className={`menu-item ${focused ? 'focused' : ''}`}>
    {icon}
  </button>
);
export default MenuItem;