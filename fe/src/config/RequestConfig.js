import axios from 'axios';

import url from '~/config/ServerConfig';
import Cookies from 'universal-cookie';

const CustomAxios = axios.create({
    withCredentials: true,
    baseURL: url.SERVER_URL,
    headers: {
        token: `Bearer ${localStorage.getItem('access_token')}`,
    },
});

export const refreshToken = async () => {
    const cookies = new Cookies();
    const refreshToken = cookies.get('refresh_token');
    try {
        const res = await axios.get(`${url.SERVER_URL}/api/refresh`, {
            headers: {
                Cookies: `refreshToken=${refreshToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export default CustomAxios;
