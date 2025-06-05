import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const TOKEN = 'token';

export const saveToken = (token) => {
    Cookies.set(TOKEN, token);
};

export const getToken = () => {
    return Cookies.get(TOKEN) || null;
};

export const decodeToken = () => {
    const token = getToken();
    if (!token) 
        return null;
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export const isAdminLoggedIn = () => {
    const decodedToken = decodeToken();
    return decodedToken?.role === 'admin';
}

export const isUserLoggedIn = () => {
    const decodedToken = decodeToken();
    return decodedToken?.role === 'customer';
}

export const removeToken = () => {
    Cookies.remove(TOKEN);
}
