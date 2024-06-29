import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";

export const ShotCard = ({ shot, cameras, descriptions, onUpdate, onDelete }) => {
  const [cameraId, setCameraId] = useState(shot.camera_id);
  const [descriptionId, setDescriptionId] = useState(shot.description_id);
  const [duration, setDuration] = useState(shot.duration);

  useEffect(() => {
    setCameraId(shot.camera_id);
    setDescriptionId(shot.description_id);
  }, [shot.camera_id, shot.description_id]);

  const handleCameraChange = (e) => {
    const newCameraId = e.target.value === "None" ? null : e.target.value;
    setCameraId(newCameraId);
    onUpdate(shot.id, newCameraId, descriptionId, duration);
  };

  const handleDescriptionChange = (e) => {
    const newDescriptionId = e.target.value === "None" ? null : e.target.value;
    setDescriptionId(newDescriptionId);
    onUpdate(shot.id, cameraId, newDescriptionId, duration);
  };

  const handleDurationChange = (e) => {
    const newDuration = e.target.value;
    setDuration(newDuration);
    onUpdate(shot.id, cameraId, descriptionId, newDuration);
  };

  const handleDelete = () => {
    onDelete(shot.id);
  };

  return (
    <div className="bg-[#201616] bg-opacity-50 w-full gap-2 flex rounded-lg items-center justify-center place-items-center text-white p-1 px-2">
        <select className="text-white bg-[#1A1A1A] rounded-md w-48 text-center items-center justify-center place-items-center" value={cameraId !== null ? cameraId : "None"} onChange={handleCameraChange}>
          {cameraId === null && <option value="None">None</option>}
          {cameras.map(camera => (
            <option key={camera.id} value={camera.id}>
              {camera.name}
            </option>
          ))}
        </select>
        <div className='grow'></div>
        <select className="text-white bg-[#1A1A1A] rounded-md w-48 text-center items-center justify-center place-items-center" value={descriptionId !== null ? descriptionId : "None"} onChange={handleDescriptionChange}>
          {descriptionId === null && <option value="None">None</option>}
          {descriptions.map(description => (
            <option key={description.id} value={description.id}>
              {description.name}
            </option>
          ))}
        </select>
        <div className='grow'></div>
        <input
            type="text"
            value={duration}
            onChange={handleDurationChange}
            className="bg-[#1A1A1A] w-16 border text-white text-center"
        />
        <IoClose className="text-3xl hover:cursor-pointer hover:text-red-600" onClick={handleDelete} />
    </div>
  );
};