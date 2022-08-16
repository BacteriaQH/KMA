import axios from 'axios';

import { loginStart, loginSuccess, loginFailure, logoutStart, logoutSuccess, logoutFailure } from './slice/authSlice';

import url from '~/config/ServerConfig';
import CustomAxios from '~/config/RequestConfig';
import Cookies from 'universal-cookie';
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const cookies = new Cookies();
        axios
            .post(`${url.SERVER_URL}/api/login`, user)
            .then((res) => {
                const { refresh_token, access_token, ...others } = res.data;
                cookies.set('refresh_token', refresh_token, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                });
                localStorage.setItem('access_token', access_token);
                dispatch(loginSuccess(others));
                navigate('/home');
                window.location.reload();
            })
            .catch((err) => {
                dispatch(loginFailure(err.response.data));
            });
    } catch (error) {
        dispatch(loginFailure(error));
    }
};

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        CustomAxios.post(`/api/logout`)
            .then((res) => {
                dispatch(logoutSuccess(res.data));
                navigate('/login');
            })
            .catch((err) => {
                dispatch(logoutFailure(err.response.data));
            });
    } catch (error) {
        dispatch(logoutFailure(error));
    }
};
