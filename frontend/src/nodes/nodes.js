import { createNode } from "../components/CreateNode";

// original default nodes.
const nodeConfigs = {
  input: {
    title: "Input",
    width: 200,
    height: 80,
    backgroundColor: "white",
    border: "1px solid black",
    fields: [
      {
        key: "inputName",
        label: "Name",
        type: "text",
        defaultValue: "input_",
      },
      {
        key: "inputType",
        label: "Type",
        type: "select",
        defaultValue: "Text",
        options: [
          { value: "Text", label: "Text" },
          { value: "File", label: "File" },
        ],
      },
    ],
    outputs: [{ id: "value" }],
  },

  llm: {
    title: "LLM",
    description: "This is a LLM.",
    width: 200,
    height: 80,
    backgroundColor: "white",
    border: "1px solid black",
    inputs: [{ id: "system" }, { id: "prompt" }],
    outputs: [{ id: "response" }],
  },

  output: {
    title: "Output",
    width: 200,
    height: 80,
    backgroundColor: "white",
    border: "1px solid black",
    fields: [
      {
        key: "outputName",
        label: "Name",
        type: "text",
        defaultValue: "output_",
      },
      {
        key: "outputType",
        label: "Type",
        type: "select",
        defaultValue: "Text",
        options: [
          { value: "Text", label: "Text" },
          { value: "Image", label: "Image" },
        ],
      },
    ],
    inputs: [{ id: "value" }],
  },

  text: {
    title: "Text",
    enhanced: true,
    width: 200,
    height: 120,
    backgroundColor: "white",
    border: "1px solid black",
    fields: [
      {
        key: "text",
        label: "Text",
        type: "textarea",
        defaultValue: "{{input}}",
        rows: 5,
        placeholder: "Enter text with variables like {{input}}",
      },
    ],
    outputs: [{ id: "output" }],
  },
};

const extraNodesConfigs = {
  calculator: {
    title: "Calculator",
    icon: "🧮",
    width: 220,
    height: 120,
    backgroundColor: "#ffe8e8",
    border: "1px solid #d32f2f",
    borderRadius: "8px",
    fields: [
      {
        key: "operation",
        label: "Operation",
        type: "select",
        defaultValue: "add",
        options: [
          { value: "add", label: "Add (+)" },
          { value: "subtract", label: "Subtract (-)" },
          { value: "multiply", label: "Multiply (×)" },
          { value: "divide", label: "Divide (÷)" },
        ],
      },
    ],
    inputs: [{ id: "operand1" }, { id: "operand2" }],
    outputs: [{ id: "result" }],
  },
  filter: {
    title: "Filter",
    icon: "🔍",
    width: 240,
    height: 140,
    backgroundColor: "#f3e5f5",
    border: "1px solid #7b1fa2",
    borderRadius: "8px",
    fields: [
      {
        key: "condition",
        label: "Condition",
        type: "select",
        defaultValue: "contains",
        options: [
          { value: "contains", label: "Contains" },
          { value: "equals", label: "Equals" },
          { value: "greater_than", label: "Greater Than" },
          { value: "less_than", label: "Less Than" },
        ],
      },
      {
        key: "value",
        label: "Filter Value",
        type: "text",
        placeholder: "Enter filter value",
      },
      {
        key: "caseSensitive",
        label: "Case Sensitive",
        type: "checkbox",
        defaultValue: false,
      },
    ],
    inputs: [{ id: "data" }],
    outputs: [{ id: "filtered" }],
  },
  transformer: {
    title: "Data Transformer",
    icon: "🔄",
    width: 260,
    height: 160,
    backgroundColor: "#e8f5e8",
    border: "1px solid #2e7d32",
    borderRadius: "8px",
    fields: [
      {
        key: "transformType",
        label: "Transform",
        type: "select",
        defaultValue: "uppercase",
        options: [
          { value: "uppercase", label: "To Uppercase" },
          { value: "lowercase", label: "To Lowercase" },
          { value: "trim", label: "Trim Whitespace" },
          { value: "reverse", label: "Reverse String" },
          { value: "length", label: "Get Length" },
          { value: "split", label: "Split by Delimiter" },
        ],
      },
      {
        key: "delimiter",
        label: "Delimiter (for split)",
        type: "text",
        defaultValue: ",",
        placeholder: "Enter delimiter",
      },
      {
        key: "preserveCase",
        label: "Preserve Original Case",
        type: "checkbox",
        defaultValue: false,
      },
    ],
    inputs: [{ id: "input" }],
    outputs: [{ id: "transformed" }],
  },
  conditional: {
    title: "Conditional",
    icon: "🔀",
    width: 280,
    height: 180,
    backgroundColor: "#fff3e0",
    border: "1px solid #f57c00",
    borderRadius: "8px",
    fields: [
      {
        key: "condition",
        label: "Condition",
        type: "select",
        defaultValue: "if_true",
        options: [
          { value: "if_true", label: "If True" },
          { value: "if_false", label: "If False" },
          { value: "if_empty", label: "If Empty" },
          { value: "if_contains", label: "If Contains" },
          { value: "if_equals", label: "If Equals" },
        ],
      },
      {
        key: "comparisonValue",
        label: "Compare To",
        type: "text",
        placeholder: "Value to compare against",
      },
      {
        key: "defaultOutput",
        label: "Default Output",
        type: "text",
        defaultValue: "false",
      },
    ],
    inputs: [{ id: "condition" }, { id: "true_value" }, { id: "false_value" }],
    outputs: [{ id: "result" }],
  },
  jsonParser: {
    title: "JSON Parser",
    icon: "📋",
    width: 250,
    height: 140,
    backgroundColor: "#e1f5fe",
    border: "1px solid #0277bd",
    borderRadius: "8px",
    fields: [
      {
        key: "operation",
        label: "Operation",
        type: "select",
        defaultValue: "parse",
        options: [
          { value: "parse", label: "Parse JSON" },
          { value: "stringify", label: "Stringify to JSON" },
          { value: "extract", label: "Extract Key" },
        ],
      },
      {
        key: "keyPath",
        label: "Key Path",
        type: "text",
        placeholder: "e.g., user.name or items[0].title",
      },
      {
        key: "prettyPrint",
        label: "Pretty Print",
        type: "checkbox",
        defaultValue: true,
      },
    ],
    inputs: [{ id: "json_input" }],
    outputs: [{ id: "result" }],
  },
  counter: {
    title: "Counter",
    icon: "🔢",
    width: 220,
    height: 140,
    backgroundColor: "#fce4ec",
    border: "1px solid #c2185b",
    borderRadius: "8px",
    fields: [
      {
        key: "operation",
        label: "Operation",
        type: "select",
        defaultValue: "increment",
        options: [
          { value: "increment", label: "Increment (+1)" },
          { value: "decrement", label: "Decrement (-1)" },
          { value: "add", label: "Add Value" },
          { value: "reset", label: "Reset to 0" },
          { value: "set", label: "Set Value" },
        ],
      },
      {
        key: "value",
        label: "Value",
        type: "number",
        defaultValue: 1,
        placeholder: "Amount to add/set",
      },
      {
        key: "initialValue",
        label: "Initial Value",
        type: "number",
        defaultValue: 0,
      },
    ],
    inputs: [{ id: "trigger" }, { id: "reset" }],
    outputs: [{ id: "count" }],
  },
};

// Create your original nodes using the new system
export const InputNode = createNode(nodeConfigs.input);
export const LLMNode = createNode(nodeConfigs.llm);
export const OutputNode = createNode(nodeConfigs.output);
export const TextNode = createNode(nodeConfigs.text);
export const CalculatorNode = createNode(extraNodesConfigs.calculator);
export const FilterNode = createNode(extraNodesConfigs.filter);
export const TransformerNode = createNode(extraNodesConfigs.transformer);
export const ConditionalNode = createNode(extraNodesConfigs.conditional);
export const JsonParserNode = createNode(extraNodesConfigs.jsonParser);
export const CounterNode = createNode(extraNodesConfigs.counter);
