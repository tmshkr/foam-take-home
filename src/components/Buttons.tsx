import axios from "axios";
import classNames from "classnames";
import { useState } from "react";

export const Buttons = ({ item }) => {
  const { key } = item;
  const [isFoaming, setIsFoaming] = useState(item.is_foaming);

  const classes = [
    "inline-flex",
    "items-center",
    "px-4",
    "py-2",
    "border",
    "border-gray-300",
    "text-sm",
    "font-medium",
    "text-gray-700",
    "hover:bg-gray-50",
    "focus:z-10",
    "focus:outline-none",
    "focus:ring-1",
    "focus:ring-indigo-500",
    "focus:border-indigo-500",
  ];

  return (
    <div className="flex justify-center mt-3 shadow-sm rounded-md">
      <button
        type="button"
        className={classNames(classes, "rounded-l-md", {
          "bg-cyan-200": isFoaming,
          "hover:bg-cyan-300": isFoaming,
        })}
        onClick={() => {
          axios
            .put("/api/updateItem", { key, is_foaming: true })
            .then((res) => setIsFoaming(true));
        }}
      >
        🍺&nbsp;&nbsp;Foaming
      </button>
      <button
        type="button"
        className={classNames(classes, "rounded-r-md", {
          "bg-cyan-200": !isFoaming && isFoaming !== null,
          "hover:bg-cyan-300": !isFoaming && isFoaming !== null,
        })}
        onClick={() => {
          axios
            .put("/api/updateItem", { key, is_foaming: false })
            .then((res) => setIsFoaming(false));
        }}
      >
        🧪&nbsp;&nbsp;Not Foaming
      </button>
    </div>
  );
};
