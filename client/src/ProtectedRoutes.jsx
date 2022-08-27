import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LandingPage from "./components/LandingPage/LandingPage";
import React from "react";

const hasToken = (token) => {
    const Validtoken = token || false;
    return Validtoken;
}

const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.userReducer.token);
    const isAuth = hasToken(token);
    return isAuth ? <Outlet /> : <LandingPage></LandingPage> ;
}

export default ProtectedRoutes

