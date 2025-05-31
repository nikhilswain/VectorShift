// baseNode.js
import { useState } from "react";
import { Handle, Position } from "reactflow";
import { FieldRenderer } from "./FieldRendrer";

export const BaseNode = ({ id, data, config }) => {
  // Initialize state
  const [nodeState, setNodeState] = useState(() => {
    const initialState = {};
    config.fields?.forEach((field) => {
      const key = field.key;
      const defaultValue =
        data?.[key] !== undefined ? data[key] : field.defaultValue;
      initialState[key] = defaultValue;
    });
    return initialState;
  });

  // Handle field changes
  const handleFieldChange = (fieldKey, value) => {
    setNodeState((prev) => {
      const newState = { ...prev, [fieldKey]: value };

      // Call field-specific onChange if provided
      const field = config.fields?.find((f) => f.key === fieldKey);
      if (field?.onChange) {
        field.onChange(value, newState, setNodeState);
      }

      // Call global node onChange if provided
      if (config.onChange) {
        config.onChange(fieldKey, value, newState, setNodeState);
      }

      return newState;
    });
  };

  // Calculate handle positions
  const calculateHandlePosition = (index, total) => {
    if (total === 1) return "50%";
    return `${((index + 1) * 100) / (total + 1)}%`;
  };

  // Render handles
  const renderHandles = () => {
    const handles = [];

    // Input handles
    config.inputs?.forEach((input, index) => {
      handles.push(
        <Handle
          key={`input-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top: calculateHandlePosition(index, config.inputs.length),
            ...input.style,
          }}
        />
      );
    });

    // Output handles
    config.outputs?.forEach((output, index) => {
      handles.push(
        <Handle
          key={`output-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            top: calculateHandlePosition(index, config.outputs.length),
            ...output.style,
          }}
        />
      );
    });

    console.log("configHandles", config.inputs, config.outputs);
    return handles;
  };

  // Custom render function support
  const renderCustomContent = () => {
    if (config.customRenderer) {
      return config.customRenderer({
        nodeState,
        setNodeState,
        handleFieldChange,
        id,
        data,
        config,
      });
    }
    return null;
  };

  const nodeStyle = {
    width: config.width || 200,
    height: config.height || "auto",
    minHeight: config.minHeight || 80,
    border: config.border || "1px solid black",
    borderRadius: config.borderRadius || "4px",
    padding: config.padding || "8px",
    backgroundColor: config.backgroundColor || "white",
    fontFamily: config.fontFamily || "inherit",
    ...config.customStyles,
  };

  return (
    <div style={nodeStyle} className={config.className}>
      {renderHandles()}

      {/* Custom content takes precedence */}
      {config.customRenderer ? (
        renderCustomContent()
      ) : (
        <>
          {/* Header */}
          {config.title && (
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "4px",
                color: config.headerColor || "black",
                fontSize: config.headerSize || "14px",
                ...config.headerStyle,
              }}
            >
              {config.icon && (
                <span style={{ marginRight: "4px" }}>{config.icon}</span>
              )}
              {config.title}
            </div>
          )}

          {/* Description */}
          {config.description && (
            <div
              style={{
                fontSize: "12px",
                color: "#666",
                marginBottom: "8px",
                ...config.descriptionStyle,
              }}
            >
              {config.description}
            </div>
          )}

          {/* Fields */}
          {config.fields?.map((field) => (
            <div
              key={field.key}
              style={{
                marginBottom: field.marginBottom || "4px",
                ...field.containerStyle,
              }}
            >
              {field.label && (
                <label
                  style={{
                    fontSize: "12px",
                    display: field.labelInline ? "inline-block" : "block",
                    marginRight: field.labelInline ? "8px" : "0",
                    ...field.labelStyle,
                  }}
                >
                  {field.label}:
                </label>
              )}
              <FieldRenderer
                field={field}
                value={nodeState[field.key]}
                onChange={(value) => handleFieldChange(field.key, value)}
                nodeState={nodeState}
                setNodeState={setNodeState}
              />
            </div>
          ))}

          {/* Custom component after fields */}
          {config.afterFields &&
            config.afterFields({ nodeState, setNodeState, id })}
        </>
      )}
    </div>
  );
};

// enhanced Text Node component that extends BaseNode functionality
export const EnhancedTextNode = ({ id, data, config }) => {
  const [dynamicInputs, setDynamicInputs] = useState([]);
  const [nodeSize, setNodeSize] = useState({
    width: config.width || 200,
    height: config.height || 80,
  });

  // Extract variables from text (e.g., {{variable_name}})
  const extractVariables = (text) => {
    if (!text) return [];
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const variables = [];
    let match;

    while ((match = variableRegex.exec(text)) !== null) {
      const varName = match[1].trim();
      if (!variables.includes(varName)) {
        variables.push(varName);
      }
    }
    return variables;
  };

  // Custom onChange handler for text field
  const handleTextChange = (value, newState, setNodeState) => {
    const variables = extractVariables(value);
    const newInputs = variables.map((varName) => ({
      id: varName,
      label: varName,
    }));
    setDynamicInputs(newInputs);

    // Calculate dynamic size
    const lines = (value || "").split("\n");
    const longestLine = lines.reduce(
      (a, b) => (a.length > b.length ? a : b),
      ""
    );
    const charWidth = 8;
    const minWidth = 200;
    const maxWidth = 600;
    const calculatedWidth = Math.min(
      maxWidth,
      Math.max(minWidth, longestLine.length * charWidth + 40)
    );

    const lineHeight = 20;
    const minHeight = 100;
    const maxHeight = 400;
    const calculatedHeight = Math.min(
      maxHeight,
      Math.max(minHeight, lines.length * lineHeight + 80)
    );

    setNodeSize({
      width: calculatedWidth,
      height: calculatedHeight,
    });
  };

  const enhancedConfig = {
    ...config,
    inputs: [...(config.inputs || []), ...dynamicInputs],
    width: nodeSize.width,
    height: nodeSize.height,
    fields: config.fields?.map((field) => {
      if (field.key === "text") {
        return {
          ...field,
          onChange: handleTextChange,
          inputStyle: {
            width: "100%",
            minHeight: "60px",
            resize: "none",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "4px",
            fontSize: "12px",
            fontFamily: "monospace",
            ...field.inputStyle,
          },
        };
      }
      return field;
    }),
    afterFields: ({ nodeState }) => {
      if (dynamicInputs.length > 0) {
        return (
          <div style={{ fontSize: "10px", color: "#666", marginTop: "4px" }}>
            Variables: {dynamicInputs.map((input) => input.id).join(", ")}
          </div>
        );
      }
      return null;
    },
  };

  console.log("enhancedConfig", enhancedConfig);
  return <BaseNode id={id} data={data} config={enhancedConfig} />;
};
