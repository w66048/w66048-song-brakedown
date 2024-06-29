import React, { useState, useEffect } from "react";
import { TeamsPageTemplate } from '../Components/TeamsPageTemplate.jsx';
import { FormTemplate } from '../Components/FormTemplate.jsx';
import { SongAddForm } from '../Components/Forms/SongAddForm.jsx';
import { SongEditForm } from '../Components/Forms/SongEditForm.jsx';
import { SongDeleteForm } from '../Components/Forms/SongDeleteForm.jsx';
import { CameraAddForm } from '../Components/Forms/CameraAddForm.jsx';
import { CameraEditForm } from '../Components/Forms/CameraEditForm.jsx';
import { CameraDeleteForm } from '../Components/Forms/CameraDeleteForm.jsx';
import { DescriptionAddForm } from '../Components/Forms/DescriptionAddForm.jsx';
import { DescriptionEditForm } from '../Components/Forms/DescriptionEditForm.jsx';
import { DescriptionDeleteForm } from '../Components/Forms/DescriptionDeleteForm.jsx';
import { ShotCard } from '../Components/Cards/ShotCard.jsx';
import { SongCard } from '../Components/Cards/SongCard.jsx';
import { CameraCard } from '../Components/Cards/CameraCard.jsx';
import { DescriptionCard } from '../Components/Cards/DescriptionCard.jsx';
import { Error } from '../Components/Error.jsx';

import { fetchSongs, addSong, updateSong, deleteSong } from '../Services/songService';
import { fetchCameras, addCamera, updateCamera, deleteCamera } from '../Services/cameraService';
import { fetchDescriptions, addDescription, updateDescription, deleteDescription } from '../Services/descriptionService';
import { fetchShotsBySong, addShot, updateShot, deleteShot } from '../Services/shotService';

export const Library = () => {
    const [songs, setSongs] = useState([]);
    const [cameras, setCameras] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [shots, setShots] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [currentForm, setCurrentForm] = useState(null);
    const [currentCamera, setCurrentCamera] = useState(null);
    const [currentDescription, setCurrentDescription] = useState(null);
    const [selectedSongId, setSelectedSongId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOnClose = () => setShowPopup(false);

    const openAddSong = () => {
        setCurrentForm('addSong');
        setShowPopup(true);
    };

    const openEditSong = (song) => {
        setCurrentSong(song);
        setCurrentForm('editSong');
        setShowPopup(true);
    };

    const openDeleteSong = (song) => {
        setCurrentSong(song);
        setCurrentForm('deleteSong');
        setShowPopup(true);
    };

    const openAddCamera = () => {
        setCurrentForm('addCamera');
        setShowPopup(true);
    };

    const openEditCamera = (camera) => {
        setCurrentCamera(camera);
        setCurrentForm('editCamera');
        setShowPopup(true);
    };

    const openDeleteCamera = (camera) => {
        setCurrentCamera(camera);
        setCurrentForm('deleteCamera');
        setShowPopup(true);
    };

    const openAddDescription = () => {
        setCurrentForm('addDescription');
        setShowPopup(true);
    };

    const openEditDescription = (description) => {
        setCurrentDescription(description);
        setCurrentForm('editDescription');
        setShowPopup(true);
    };

    const openDeleteDescription = (description) => {
        setCurrentDescription(description);
        setCurrentForm('deleteDescription');
        setShowPopup(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            const songData = await fetchSongs();
            setSongs(songData);

            const cameraData = await fetchCameras();
            setCameras(cameraData);

            const descriptionData = await fetchDescriptions();
            setDescriptions(descriptionData);
        };
        fetchData();
    }, []);

    const handleAddSong = async (name) => {
        const newSong = await addSong(name);
        setSongs([...songs, newSong]);
        setCurrentSong(newSong);
        setSelectedSongId(newSong.id);
        fetchShots(newSong.id);
    };
    

    const handleUpdateSong = async (id, name) => {
        await updateSong(id, name);
        setSongs(songs.map(song => (song.id === id ? { ...song, name } : song)));
        if (currentSong && currentSong.id === id) {
            setCurrentSong({ ...currentSong, name });
        }
    };    

    const handleDeleteSong = async (id) => {
        await deleteSong(id);
        setSongs(songs.filter(song => song.id !== id));
        setShots(shots.filter(shot => shot.song_id !== id));
        if (currentSong && currentSong.id === id) {
            setCurrentSong(null);
        }
    };    

    const handleAddCamera = async (name) => {
        const newCamera = await addCamera(name);
        setCameras([...cameras, newCamera]);
    };

    const handleUpdateCamera = async (id, name) => {
        await updateCamera(id, name);
        setCameras(cameras.map(camera => (camera.id === id ? { ...camera, name } : camera)));
    };

    const handleDeleteCamera = async (id) => {
        try {
            await deleteCamera(id);
            setCameras(cameras.filter(camera => camera.id !== id));
        } catch (error) {
            if (error.message.includes('Cannot delete camera')) {
                setErrorMessage('This Camera is being used!');
            } else {
                setErrorMessage('Error deleting camera');
            }
        }
    };

    const handleAddDescription = async (name) => {
        const newDescription = await addDescription(name);
        setDescriptions([...descriptions, newDescription]);
    };

    const handleUpdateDescription = async (id, name) => {
        await updateDescription(id, name);
        setDescriptions(descriptions.map(description => (description.id === id ? { ...description, name } : description)));
    };

    const handleDeleteDescription = async (id) => {
        try {
            await deleteDescription(id);
            setDescriptions(descriptions.filter(description => description.id !== id));
        } catch (error) {
            if (error.message.includes('Cannot delete description')) {
                setErrorMessage('This Description is being Used!');
            } else {
                setErrorMessage('Error deleting description');
            }
        }
    };

    const fetchShots = async (songId) => {
        const shotData = await fetchShotsBySong(songId);
        setShots(shotData);
    };

    const handleAddShot = async (songId) => {
        const newShot = await addShot(songId);
        setShots([...shots, newShot]);
    };

    const handleUpdateShot = async (id, camera_id, description_id, duration) => {
        await updateShot(id, camera_id, description_id, duration);
        setShots(shots.map(shot => (shot.id === id ? { ...shot, camera_id, description_id, duration } : shot)));
    };

    const handleDeleteShot = async (id) => {
        await deleteShot(id);
        setShots(shots.filter(shot => shot.id !== id));
    };

    const handleSongClick = (song) => {
        setCurrentSong(song);
        setSelectedSongId(song.id);
        fetchShots(song.id);
    };    

    const closeErrorPopup = () => {
        setErrorMessage('');
    };

    return (
        <TeamsPageTemplate>
            <div className="h-auto overflow-auto xl:h-full w-full p-2 scrollbar-none">
                <div className="flex flex-wrap gap-2 h-auto xl:h-full w-full">
                    <div className="min-w-[300px] flex flex-col bg-[#292929] bg-opacity-80 w-full lg:w-1/5 h-96 xl:h-full rounded-lg">
                        <div className="flex p-3 border-b border-white border-opacity-50">
                            <p className="grow text-white text-2xl font-medium">Library</p>
                            <button onClick={openAddSong} className="p-1 rounded-md bg-[#cc8111] text-white text-sm font-medium">Add Song</button>
                        </div>
                        <div className="overflow-auto scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-zinc-50 overflow-y-scroll p-3 flex flex-col gap-2">
                            {songs.map(song => (
                                <SongCard
                                    key={song.id}
                                    song={song}
                                    onDelete={() => openDeleteSong(song)}
                                    onEdit={openEditSong}
                                    onClick={() => handleSongClick(song)}
                                    selectedSongId={selectedSongId}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col md:min-w-[640px] w-full lg:flex-1 bg-[#292929] bg-opacity-80 h-96 xl:h-full rounded-lg">
                        <div className="flex p-3 border-b border-white border-opacity-50">
                            <p className=" text-white text-2xl font-medium">{currentSong ? currentSong.name : 'Select Song'}</p>
                            <p className="grow text-white text-2xl font-medium text-center">Shots</p>
                            <button onClick={() => handleAddShot(currentSong.id)} className="p-1 rounded-md bg-[#cc8111] text-white text-sm font-medium">Add Shot</button>
                        </div>
                        <div className="flex p-3 w-full bg-[#201616] bg-opacity-50 gap-2 rounded-lg items-center justify-center place-items-center text-white pl-14 pr-14">
                            <p className=" text-white text-xl font-medium text-center">Camera Name</p>
                            <p className="grow pl-8 text-white text-xl font-medium text-center">Shot Descripion</p>
                            <p className=" text-white text-xl font-medium text-center">Duration</p>
                        </div>
                        <div className="overflow-auto scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-zinc-50 overflow-y-scroll p-3 flex flex-col gap-2">
                            {shots.map(shot => (
                                <ShotCard
                                    key={shot.id}
                                    shot={shot}
                                    cameras={cameras}
                                    descriptions={descriptions}
                                    onUpdate={handleUpdateShot}
                                    onDelete={handleDeleteShot}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="min-w-[300px] w-full xl:w-1/5 h-auto md:h-full rounded-lg flex flex-col md:flex-row xl:flex-col gap-2">
                        <div className="flex flex-col bg-[#292929] bg-opacity-80 w-full h-80 xl:h-1/2 rounded-lg overflow-auto">
                            <div className="flex p-3 border-b border-white border-opacity-50">
                                <p className="grow text-white text-2xl font-medium">Cameras</p>
                                <button onClick={openAddCamera} className="p-1 rounded-md bg-[#cc8111] text-white text-sm font-medium">Add Camera</button>
                            </div>
                            <div className="overflow-auto scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-zinc-50 overflow-y-scroll p-3 flex flex-col gap-6">  
                                {cameras.map(camera => (
                                    <CameraCard 
                                        key={camera.id} 
                                        camera={camera} 
                                        onDelete={() => openDeleteCamera(camera)} 
                                        onEdit={openEditCamera} 
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col bg-[#292929] bg-opacity-80 w-full h-80 xl:h-1/2 rounded-lg overflow-auto">
                            <div className="flex p-3 border-b border-white border-opacity-50">
                                <p className="grow text-white text-2xl font-medium">Descriptions</p>
                                <button onClick={openAddDescription} className="p-1 rounded-md bg-[#cc8111] text-white text-sm font-medium">Add Description</button>
                            </div>
                            <div className="overflow-auto scrollbar scrollbar-w-1.5 scrollbar-thumb-rounded-full scrollbar-thumb-zinc-50 overflow-y-scroll p-3 flex flex-col gap-6">
                                {descriptions.map(description => (
                                    <DescriptionCard 
                                        key={description.id} 
                                        description={description} 
                                        onDelete={() => openDeleteDescription(description)} 
                                        onEdit={openEditDescription} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FormTemplate onClose={handleOnClose} visible={showPopup}>
                {currentForm === 'addSong' && <SongAddForm onClose={handleOnClose} onAddSong={handleAddSong} />}
                {currentForm === 'editSong' && <SongEditForm onClose={handleOnClose} song={currentSong} onUpdateSong={handleUpdateSong} />}
                {currentForm === 'deleteSong' && <SongDeleteForm onClose={handleOnClose} song={currentSong} onDelete={handleDeleteSong} />}
                {currentForm === 'addCamera' && <CameraAddForm onClose={handleOnClose} onAddCamera={handleAddCamera} />}
                {currentForm === 'editCamera' && <CameraEditForm onClose={handleOnClose} camera={currentCamera} onUpdateCamera={handleUpdateCamera} />}
                {currentForm === 'deleteCamera' && <CameraDeleteForm onClose={handleOnClose} camera={currentCamera} onDelete={handleDeleteCamera} />}
                {currentForm === 'addDescription' && <DescriptionAddForm onClose={handleOnClose} onAddDescription={handleAddDescription} />}
                {currentForm === 'editDescription' && <DescriptionEditForm onClose={handleOnClose} description={currentDescription} onUpdateDescription={handleUpdateDescription} />}
                {currentForm === 'deleteDescription' && <DescriptionDeleteForm onClose={handleOnClose} description={currentDescription} onDelete={handleDeleteDescription} />}
            </FormTemplate>
            {errorMessage && <Error message={errorMessage} onClose={closeErrorPopup} />}
        </TeamsPageTemplate>
    );
}