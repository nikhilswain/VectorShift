import {
  FiBox,
  FiCpu,
  FiDatabase,
  FiEdit,
  FiFilter,
  FiTerminal,
  FiType,
  FiCode,
  FiHash,
  FiList,
} from "react-icons/fi";

const getNodeIcon = (type) => {
  switch (type) {
    case "customInput":
      return <FiDatabase className="w-5 h-5 mb-1" />;
    case "llm":
      return <FiCpu className="w-5 h-5 mb-1" />;
    case "customOutput":
      return <FiTerminal className="w-5 h-5 mb-1" />;
    case "text":
      return <FiType className="w-5 h-5 mb-1" />;
    case "calculator":
      return <FiHash className="w-5 h-5 mb-1" />;
    case "filter":
      return <FiFilter className="w-5 h-5 mb-1" />;
    case "transformer":
      return <FiEdit className="w-5 h-5 mb-1" />;
    case "conditional":
      return <FiList className="w-5 h-5 mb-1" />;
    case "jsonParse":
      return <FiCode className="w-5 h-5 mb-1" />;
    default:
      return <FiBox className="w-5 h-5 mb-1" />;
  }
};

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="group relative">
      <div
        className="bg-gray-800 hover:bg-gray-700 rounded-md p-3 cursor-grab active:cursor-grabbing transition-colors duration-200 shadow-lg hover:shadow-xl"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = "grab")}
        draggable
      >
        <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
          {icon}
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-[150%] pointer-events-none transition-all duration-200 z-50">
        <div className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md shadow-xl whitespace-nowrap border border-gray-700/50 backdrop-blur-sm">
          {label}
        </div>
      </div>
    </div>
  );
};
