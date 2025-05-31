import React from "react";

// fields
const Fields = {
  text: ({ value, onChange, field }) => (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      style={field.inputStyle}
    />
  ),

  textarea: ({ value, onChange, field }) => (
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      rows={field.rows || 2}
      style={field.inputStyle}
    />
  ),

  select: ({ value, onChange, field }) => (
    <select
      value={value || field.defaultValue}
      onChange={(e) => onChange(e.target.value)}
      style={field.inputStyle}
    >
      {field.options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),

  number: ({ value, onChange, field }) => (
    <input
      type="number"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      min={field.min}
      max={field.max}
      step={field.step}
      style={field.inputStyle}
    />
  ),

  checkbox: ({ value, onChange, field }) => (
    <input
      type="checkbox"
      checked={value || false}
      onChange={(e) => onChange(e.target.checked)}
      style={field.inputStyle}
    />
  ),

  slider: ({ value, onChange, field }) => (
    <div>
      <input
        type="range"
        value={value || field.defaultValue || 0}
        onChange={(e) => onChange(Number(e.target.value))}
        min={field.min || 0}
        max={field.max || 100}
        step={field.step || 1}
        style={field.inputStyle}
      />
      <span style={{ fontSize: "12px", marginLeft: "8px" }}>
        {value || field.defaultValue || 0}
      </span>
    </div>
  ),

  color: ({ value, onChange, field }) => (
    <input
      type="color"
      value={value || field.defaultValue || "#000000"}
      onChange={(e) => onChange(e.target.value)}
      style={field.inputStyle}
    />
  ),
};

// main field renderer
export const FieldRenderer = ({
  field,
  value,
  onChange,
  nodeState,
  setNodeState,
}) => {
  // Use default field components
  const FieldComponent = Fields[field.type];
  if (!FieldComponent) {
    console.warn(`Unknown field type: ${field.type}`);
    return null;
  }

  return <FieldComponent field={field} value={value} onChange={onChange} />;
};
