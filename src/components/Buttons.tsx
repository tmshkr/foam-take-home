import axios from "axios";

export const Buttons = ({ item }) => {
  const { key, is_foaming } = item;
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        onClick={() => {
          axios
            .put("/api/updateItem", { key, is_foaming: true })
            .then((res) => console.log(res.data));
        }}
      >
        🍺&nbsp;&nbsp;Foaming
      </button>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        onClick={() => {
          axios
            .put("/api/updateItem", { key, is_foaming: false })
            .then((res) => console.log(res.data));
        }}
      >
        🧪&nbsp;&nbsp;Not Foaming
      </button>
    </>
  );
};
