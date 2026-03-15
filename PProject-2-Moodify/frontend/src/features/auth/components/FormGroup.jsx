import React from "react";

const FormGroup = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="form-group">
      <h3>{label}</h3>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormGroup;
