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

  // Default handle styles
  const defaultHandleStyle = {
    width: 12,
    height: 12,
    border: "3px solid rgb(31 41 55)",
    backgroundColor: "#60A5FA",
    borderRadius: "50%",
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
            ...defaultHandleStyle,
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
            ...defaultHandleStyle,
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
    border: config.border || "1px solid rgb(55 65 81)",
    borderRadius: config.borderRadius || "8px",
    padding: config.padding || "12px",
    backgroundColor: config.backgroundColor || "rgb(31 41 55)",
    fontFamily: config.fontFamily || "inherit",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    color: "white",
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

// Enhanced Text Node component that extends BaseNode functionality
export const EnhancedTextNode = ({ id, data, config }) => {
  const [dynamicInputs, setDynamicInputs] = useState([]);
  const [nodeSize, setNodeSize] = useState({
    width: config.width || 240,
    height: "auto",
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
    // Only update dynamic inputs if the variables have actually changed
    const hasInputsChanged =
      JSON.stringify(variables) !==
      JSON.stringify(dynamicInputs.map((i) => i.id));
    if (hasInputsChanged) {
      const newInputs = variables.map((varName) => ({
        id: varName,
        label: varName,
        style: {
          backgroundColor: "#60a5fa", // Blue color for variable inputs
          border: "3px solid rgb(31 41 55)",
        },
      }));
      setDynamicInputs(newInputs);
    }
  };

  // Handle textarea resize
  const handleResize = (height) => {
    // Account for padding, header, and variables list
    const headerHeight = 40; // title + padding
    const extraPadding = 40; // top + bottom padding
    const variablesHeight = dynamicInputs.length > 0 ? 44 : 0;
    const totalExtraHeight = headerHeight + extraPadding + variablesHeight;

    const newHeight = Math.min(400, Math.max(140, height + totalExtraHeight));
    setNodeSize((prev) => ({
      ...prev,
      height: newHeight,
    }));
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
          onResize: handleResize,
          inputStyle: {
            width: "100%",
            minHeight: "80px",
            maxHeight: "320px",
            resize: "none",
            fontSize: "13px",
            lineHeight: "1.4",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
            ...field.inputStyle,
          },
        };
      }
      return field;
    }),
    afterFields: ({ nodeState }) => {
      if (dynamicInputs.length > 0) {
        return (
          <div
            style={{
              fontSize: "11px",
              color: "#94a3b8",
              marginTop: "8px",
              padding: "4px 6px",
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "4px",
              display: "flex",
              gap: "4px",
              flexWrap: "wrap",
            }}
          >
            {dynamicInputs.map((input) => (
              <span
                key={input.id}
                style={{
                  backgroundColor: "rgba(96,165,250,0.1)",
                  border: "1px solid rgba(96,165,250,0.2)",
                  padding: "1px 6px",
                  borderRadius: "4px",
                  fontSize: "10px",
                }}
              >
                {input.id}
              </span>
            ))}
          </div>
        );
      }
      return null;
    },
  };

  return <BaseNode id={id} data={data} config={enhancedConfig} />;
};
