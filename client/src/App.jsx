import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from './ProtectedRoutes'
import Login from './components/Registro/Login'
import UserProfile from "./components/UserProfile/UserProfile";
import LandingPage from "./components/LandingPage/LandingPage";
import Playroom from "./components/Playroom/Playroom";
import ShopCart from "./components/Shop/ShopCart/ShopCart";
import Shop from "./components/Shop/Shop";
import Detail from "./components/Detail/Detail";
import PurchaseCompleted from "./components/Shop/PurchaseCompleted";
import Nav from "./components/Nav/Nav";
import About from "./components/About/About";

import "./App.css";
import { resetReduxState } from "./redux/actions";
import Inventory from "./components/UserProfile/Inventory/Inventory";

import RecoveryPassword from './components/Registro/RecoveryPassword';
import Registro from './components/Registro/Registro';


function App() {
  const dispatch = useDispatch();
  function handleKeyboard(e) {
    if (e.repeat) return;
    if ((e.metaKey || e.ctrlKey) && e.key === "x") {
      dispatch(resetReduxState());
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, []);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/register' element={<Registro />} />
        <Route path='/login' element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/purchase-completed" element={<PurchaseCompleted />} />
        <Route path="/detail" element={<Detail />} />
        <Route path='/playroom' element={<Playroom />} />
        {/* <Route element={<ProtectedRoutes />}> */}
        <Route path='/shopcart' element={<ShopCart />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/recovery" element={<RecoveryPassword />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
