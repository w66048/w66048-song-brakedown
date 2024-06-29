const API_URL = 'http://localhost:3000/cameras';

export const fetchCameras = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addCamera = async (name) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  return response.json();
};

export const updateCamera = async (id, name) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  return response.text();
};

export const deleteCamera = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    return Promise.reject(new Error(errorMessage));
  }

  return response.text();
};