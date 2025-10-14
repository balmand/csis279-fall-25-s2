const API_BASE_URL = 'http://localhost:4000/api';

async function request(path, { method = 'GET', body, headers = {}, token } = {}) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined) {
    config.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, config);

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorData = await response.json();
      if (errorData?.message) {
        message = errorData.message;
      }
    } catch {
      // Ignore JSON parse errors
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const authService = {
  login(credentials) {
    return request('/auth/login', {
      method: 'POST',
      body: credentials
    });
  },
  register(payload) {
    return request('/auth/register', {
      method: 'POST',
      body: payload
    });
  },
  getProfile(token) {
    return request('/auth/me', {
      token
    });
  },
  logout(token) {
    return request('/auth/logout', {
      method: 'POST',
      token
    });
  }
};
