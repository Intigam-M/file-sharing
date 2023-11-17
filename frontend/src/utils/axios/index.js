import axios from "axios";

const baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api' : 'http://127.0.0.1:8000/api'

const iaxios = axios.create({
    baseURL: baseURL,
});

export default iaxios


export function setTokenToAxios(token) {
    iaxios.defaults.headers.common['Authorization'] = `Token ${token}`
}

export function removeTokenFromAxios() {
    delete iaxios.defaults.headers.common['Authorization']
}