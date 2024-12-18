import React from "react";

function InputField({ label, type, id, name, value, onChange, placeholder, min, max }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="mb-2">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
      />
    </div>
  );
}
export default InputField;
