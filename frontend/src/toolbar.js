// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        {/* extra nodes */}
        <DraggableNode type="calculator" label="Calculator" />
        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="transformer" label="Transformer" />
        <DraggableNode type="conditional" label="Conditional" />
        <DraggableNode type="jsonParse" label="Json Parser" />
        <DraggableNode type="counter" label="Counter" />
      </div>
    </div>
  );
};
