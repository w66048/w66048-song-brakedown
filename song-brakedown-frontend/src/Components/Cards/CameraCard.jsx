import React from 'react';
import { FaCamera } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export const CameraCard = ({ camera, onDelete, onEdit }) => {
  const handleDelete = () => {
    onDelete(camera.id);
  };

  const handleEdit = () => {
    onEdit(camera);
  };

  return (
    <div className="w-full gap-2 flex items-center justify-center place-items-center text-white">
      <FaCamera className="text-2xl" />
      <p className="grow">{camera.name}</p>
      <MdEdit className="text-xl hover:cursor-pointer hover:text-red-600" onClick={handleEdit} />
      <FaTrash className="text-lg hover:cursor-pointer hover:text-red-600" onClick={handleDelete} />
    </div>
  );
};