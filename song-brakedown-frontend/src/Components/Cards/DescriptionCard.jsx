import React from 'react';
import { BsCardText } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export const DescriptionCard = ({ description, onDelete, onEdit }) => {
  const handleDelete = () => {
    onDelete(description.id);
  };

  const handleEdit = () => {
    onEdit(description);
  };

  return (
    <div className="w-full gap-2 flex items-center justify-center place-items-center text-white">
      <BsCardText className="text-2xl" />
      <p className="grow">{description.name}</p>
      <MdEdit className="text-xl hover:cursor-pointer hover:text-red-600" onClick={handleEdit} />
      <FaTrash className="text-lg hover:cursor-pointer hover:text-red-600" onClick={handleDelete} />
    </div>
  );
};