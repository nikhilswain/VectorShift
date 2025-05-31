import { DraggableNode } from "./draggableNode";
import {
  FiDatabase,
  FiCpu,
  FiTerminal,
  FiType,
  FiHash,
  FiFilter,
  FiEdit2,
  FiCode,
  FiBox,
} from "react-icons/fi";

export const PipelineToolbar = () => {
  return (
    <div className="bg-gray-900 py-3 px-4 border-b border-gray-800">
      <div className="flex items-center space-x-4 overflow-x-auto hide-scrollbar">
        <div className="flex-shrink-0 px-3 py-1 text-gray-400 text-sm font-medium">
          Components
        </div>
        <div className="flex items-center space-x-3">
          <DraggableNode
            type="customInput"
            label="Input"
            icon={<FiDatabase className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="llm"
            label="LLM"
            icon={<FiCpu className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="customOutput"
            label="Output"
            icon={<FiTerminal className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="text"
            label="Text"
            icon={<FiType className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="calculator"
            label="Calculator"
            icon={<FiHash className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="filter"
            label="Filter"
            icon={<FiFilter className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="transformer"
            label="Transformer"
            icon={<FiEdit2 className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="conditional"
            label="Conditional"
            icon={<FiBox className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="jsonParse"
            label="Json Parser"
            icon={<FiCode className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="counter"
            label="Counter"
            icon={<FiHash className="w-5 h-5 mb-1" />}
          />
        </div>
      </div>
    </div>
  );
};
