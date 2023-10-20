import React, { useContext } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeItem } from "../../redux/mainSlice";
import { ThemeContext } from "../context/ThemeContext";

const ListItem = ({ item, editModalOpen, setEditModalOpen, setEditItemID, editItemID }) => {
  const dispatch = useDispatch();
  
  const handleEdit = () => {
    setEditModalOpen(!editModalOpen);
    setEditItemID(item.id);
  };
  const { theme } = useContext(ThemeContext);

  return (         

    <div className="flex gap-9 p-3 items-center justify-between border-b border-gray-300 hover:bg-gray-200 cursor-pointer" >
      <div className="flex gap-9 justify-start" >
        <div className="text-gray-500 w-[100px]">{item.category}</div>
        <div className="text-gray-500 w-[100px]">{item.name}</div>
        <div className="text-gray-500 flex-1">{item.text}</div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleEdit}
          className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-green-500 hover:bg-green-700 text-white"
        >
          <FaPen className="text-[12px]" />
        </button>
        <button
          className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-green-500 hover:bg-green-700 text-white"
          onClick={() => {
            dispatch(removeItem(item.id));
          }}
        >
          <FaTrash className="text-[12px]" />
        </button>
      </div>
    </div>
  );
};

export default ListItem;
