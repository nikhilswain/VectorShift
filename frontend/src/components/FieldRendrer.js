import React from "react";

const defaultInputStyles = {
  backgroundColor: "rgb(17 24 39)",
  border: "1px solid rgb(55 65 81)",
  borderRadius: "4px",
  color: "white",
  fontSize: "0.875rem",
  padding: "4px 8px",
  width: "100%",
  outline: "none",
};

// AutoResizeTextarea component
const AutoResizeTextarea = React.memo(({ value, onChange, field }) => {
  const textareaRef = React.useRef(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
      if (field.onResize) {
        field.onResize(scrollHeight);
      }
    }
  }, [value, field]);

  return (
    <textarea
      ref={textareaRef}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      rows={field.rows || 3}
      style={{
        ...defaultInputStyles,
        minHeight: "60px",
        maxHeight: "300px",
        resize: "none",
        overflow: "hidden",
        transition: "height 0.1s ease",
        ...field.inputStyle,
      }}
    />
  );
});

const Fields = {
  text: ({ value, onChange, field }) => (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      style={{ ...defaultInputStyles, ...field.inputStyle }}
    />
  ),

  textarea: (props) => <AutoResizeTextarea {...props} />, // Use AutoResizeTextarea component

  select: ({ value, onChange, field }) => (
    <select
      value={value || field.defaultValue}
      onChange={(e) => onChange(e.target.value)}
      style={{
        ...defaultInputStyles,
        appearance: "none",
        paddingRight: "24px",
        ...field.inputStyle,
      }}
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
      style={{ ...defaultInputStyles, ...field.inputStyle }}
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

// Main field renderer
export const FieldRenderer = ({
  field,
  value,
  onChange,
  nodeState,
  setNodeState,
}) => {
  const FieldComponent = Fields[field.type];
  if (!FieldComponent) {
    console.warn(`Unknown field type: ${field.type}`);
    return null;
  }

  return <FieldComponent field={field} value={value} onChange={onChange} />;
};
