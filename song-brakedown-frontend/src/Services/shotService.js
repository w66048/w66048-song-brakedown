const API_URL = 'http://localhost:3000/shots';

export const fetchShotsBySong = async (songId) => {
  const response = await fetch(`${API_URL}/${songId}`);
  return response.json();
};

export const addShot = async (songId) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ song_id: songId, camera_id: null, description_id: null, duration: 0 }),
  });
  return response.json();
};

export const updateShot = async (id, camera_id, description_id, duration) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ camera_id, description_id, duration }),
  });

  if (!response.ok) {
    throw new Error(`Error updating shot: ${response.statusText}`);
  }

  return response.text();
};

export const deleteShot = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.text();
};