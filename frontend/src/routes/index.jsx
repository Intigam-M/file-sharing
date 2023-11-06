import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '~/pages/login'
import { useSelector, useDispatch } from 'react-redux'
import { useMemo } from 'react'
import Home from "~/pages/home";
import MainLayout from "~/layouts";
import { useEffect } from 'react'
import { loginSuccess } from '~/store/auth'


function AppRoutes() {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            dispatch(loginSuccess(JSON.parse(user)));
        }
    }, [])

    const routes = useMemo(() => {
        if (isAuthenticated) {
            return (
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path='/*' element={<Navigate to="/" />} />
                    </Routes>
                </MainLayout>
            )
        } else {
            return (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path='/*' element={<Navigate to="/login" />} />
                </Routes>
            )
        }
    }, [isAuthenticated])


    return (
        <div>
            {routes}
        </div>
    );
}

export default AppRoutes;
