
import jwtDecode from 'jwt-decode';

export const getUser = () => {
    const auth = JSON.parse(window.localStorage.getItem('satnam.auth'));
    if (auth) {
        const [,payload,] = auth.access.split('.');
        const decoded = window.atob(payload);
        return JSON.parse(decoded);
    }
    return undefined;
};

export const getAccessToken = () => {
    const auth = JSON.parse(window.localStorage.getItem('satnam.auth'));
    if (auth) {
        return auth.access;
    }
    return undefined;
};

export const getRefreshToken = () => {
    const auth = JSON.parse(window.localStorage.getItem('satnam.auth'));
    if (auth) {
        return auth.refresh;
    }
    return undefined;
};

export const isTokenExpired = () => {
    const token = getAccessToken();
    if (!token) return true; // If there is no token, consider it expired
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime; // Return true if token is expired
  };


export const isStaff = () => {
    const user = getUser();
    return user && user.is_staff === 'true';
};



