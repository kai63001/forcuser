import axios from 'axios'
// import cookieCutter from 'cookie-cutter'

axios.interceptors.request.use((config) => {

    return config;
});

export default axios