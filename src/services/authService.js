import http from '../api/http';

export const login = async (username, password) => {
    // Backend expects username as query param and password in X-Password header (URL encoded)
    const response = await http.post(`/auth/login?username=${encodeURIComponent(username)}`, null, {
        headers: {
            'X-Password': encodeURIComponent(password)
        }
    });

    // Save token (response.data is the raw token string)
    const token = response.data;
    if (token) {
        localStorage.setItem('fb_token', token);
        localStorage.setItem('fb_username', username);
    }

    return token;
};

export const logout = async () => {
    localStorage.removeItem('fb_token');
    localStorage.removeItem('fb_username');
    await http.post('/auth/logout');
};
