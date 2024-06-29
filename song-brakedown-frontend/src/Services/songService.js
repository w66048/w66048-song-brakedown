const API_URL = 'http://localhost:3000/songs';

export const fetchSongs = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addSong = async (name) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  return response.json();
};

export const updateSong = async (id, name) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  return response.text();
};

export const deleteSong = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.text();
};
