import React from 'react';
import '../styles/ToggleSwitch.css';

const ToggleSwitch = ({ id, checked, onChange, label }) => (
  <div className="toggle-switch">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id}>{label}</label>
    <span>{label}</span>
  </div>
);

export default ToggleSwitch;
