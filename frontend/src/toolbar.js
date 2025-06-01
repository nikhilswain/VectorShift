import { DraggableNode } from "./draggableNode";
import { FiCpu, FiType, FiHash, FiFilter, FiCode, FiBox } from "react-icons/fi";
import { MdInput, MdOutlineOutput, MdOutlineTransform } from "react-icons/md";
import { ImCalculator } from "react-icons/im";
import { VscDebugPause } from "react-icons/vsc";

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
            icon={<MdInput className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="llm"
            label="LLM"
            icon={<FiCpu className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="customOutput"
            label="Output"
            icon={<MdOutlineOutput className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="text"
            label="Text"
            icon={<FiType className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="calculator"
            label="Calculator"
            icon={<ImCalculator className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="filter"
            label="Filter"
            icon={<FiFilter className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="transformer"
            label="Transformer"
            icon={<MdOutlineTransform className="w-5 h-5 mb-1" />}
          />
          <DraggableNode
            type="conditional"
            label="Conditional"
            icon={<VscDebugPause className="w-5 h-5 mb-1" />}
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
