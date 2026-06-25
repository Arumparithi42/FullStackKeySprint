const API_URL = 'https://fullstackkeysprint.onrender.com/api';

export async function registerUser({ username, email, password, repeatPassword }) {
  if (password !== repeatPassword) {
    throw new Error('Passwords do not match');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  const user = await response.json();
  localStorage.setItem('user', JSON.stringify(user));
  return user;
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  const user = await response.json();
  localStorage.setItem('user', JSON.stringify(user));
  return user;
}

export async function getUserProfile(uid) {
  const response = await fetch(`${API_URL}/user/${uid}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch profile');
  }

  return response.json();
}

export async function updateUserProfile(uid, profileData) {
  const response = await fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, ...profileData }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update profile');
  }

  return response.json();
}

export async function updateUserPassword(uid, currentPassword, newPassword) {
  const response = await fetch(`${API_URL}/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, currentPassword, newPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update password');
  }

  return response.json();
}

export async function getUserStats(uid) {
  const response = await fetch(`${API_URL}/user/${uid}/stats`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch stats');
  }

  return response.json();
}

export async function saveTestResult(uid, testData) {
  const response = await fetch(`${API_URL}/user/${uid}/test-result`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save test result');
  }

  return response.json();
}
