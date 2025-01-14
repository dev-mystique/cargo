import Cookies from 'js-cookie';

function setAuthToken(token) {
    Cookies.set('authToken', token, { secure: true, sameSite: 'Strict' });
}

function getAuthToken() {
    return Cookies.get('authToken');
}

function removeAuthToken() {
    Cookies.remove('authToken');
}
