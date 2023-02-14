import * as React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { loginSuccess } from './redux/slice/authSlice';
import routes from '~/routes';

import DefaultLayout from '~/components/DefaultLayout';

import CustomAxios, { refreshToken } from '~/config/RequestConfig';
import localStorage from 'redux-persist/es/storage';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let userRoutes;
    let user = useSelector((state) => state.auth.login.currentUser);
    let role_symbol = Number.parseInt(user?.role_symbol);
    CustomAxios.interceptors.request.use(
        async (config) => {
            const access_token = await localStorage.getItem('access_token');
            if (access_token) {
                let date = new Date();
                const decodedToken = jwt_decode(access_token);
                if (decodedToken.exp < date.getTime() / 1000) {
                    const data = await refreshToken();
                    const refreshUser = {
                        ...user,
                        access_token: data.access_token,
                    };
                    dispatch(loginSuccess(refreshUser));
                    config.headers['token'] = 'Bearer ' + data.access_token;
                }
            } else {
                navigate('/login');
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    switch (role_symbol) {
        case 1:
            userRoutes = routes.adminRoutes;
            break;
        case 2:
            userRoutes = routes.studentRoutes;
            break;
        case 3:
            userRoutes = routes.teacherRoutes;
            break;
        case 4:
            userRoutes = routes.department1Routes;
            break;
        case 5:
            userRoutes = routes.department2Routes;
            break;
        case 6:
            userRoutes = routes.department3Routes;
            break;
        default:
            userRoutes = routes.defaultRoutes;
    }
    return (
        <div className="App">
            <Routes>
                {userRoutes.map((route, index) => {
                    const Page = route.component;
                    if (!route.defaultLayout) {
                        return <Route key={index} path={route.path} element={<Page />} />;
                    } else {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <DefaultLayout>
                                        <Page />
                                    </DefaultLayout>
                                }
                            />
                        );
                    }
                })}
            </Routes>
        </div>
    );
}

export default App;
