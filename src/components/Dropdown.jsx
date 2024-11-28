import React from 'react';
import './Dropdown.css';

const Dropdown = ({ label, options, selected, onChange }) => {
  return (
    <div className="dropdown">
      <label>{label}:</label>
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
