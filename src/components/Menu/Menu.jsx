import React from 'react';
import MenuItem from './MenuItem';

const Menu = ({ icons, focusedIndex }) => (
  <div className="menu">
    {icons.map((item, index) => (
      <MenuItem
        key={item.label}
        icon={item.icon}
        focused={focusedIndex === index}
      />
    ))}
  </div>
);
export default Menu;