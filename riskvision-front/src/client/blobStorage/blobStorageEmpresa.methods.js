const API_BASE_URL = 'http://localhost:8000/storageEmpresa';

export async function listFiles(path) {
  const encodedPath = path ? encodeURIComponent(path) : '';
  const response = await fetch(`${API_BASE_URL}/list?path=${encodedPath}`);
  if (!response.ok) {
    throw new Error('Failed to fetch files');
  }
  return response.json();
}

export async function uploadFile(path, file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', path);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }
}

export async function deleteFile(path, fileName) {
  const response = await fetch(`${API_BASE_URL}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ path, fileName }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete file');
  }
}
