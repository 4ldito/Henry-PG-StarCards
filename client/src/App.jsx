import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Registro/Login";
import UserProfile from "./components/UserProfile/UserProfile";
import LandingPage from "./components/LandingPage/LandingPage";
import Playroom from "./components/Playroom/Playroom";
import Shop from "./components/Shop/Shop";
import PurchaseCompleted from "./components/Shop/PurchaseCompleted";
import Nav from "./components/Nav/Nav";
import Game from "./components/Game/Game";
import About from "./components/About/About";
import PrivateChat from "./components/UserProfile/PrivateChat/PrivateChat";
import { resetReduxState } from "./redux/actions";
import Inventory from "./components/UserProfile/Inventory/Inventory";
import RecoveryPassword from "./components/Registro/RecoveryPassword";
import Registro from "./components/Registro/Registro";
import Firebase from "./components/FirebaseAdmi/Firebase";

import "./App.css";

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
        <Route path="/firebase" element={<Firebase />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/recovery" element={<RecoveryPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/game" element={<Game />} />
        <Route path="/purchase-completed" element={<PurchaseCompleted />} />
        <Route path="/playroom" element={<Playroom />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/recovery" element={<RecoveryPassword />} />
        <Route path="/privateChat" element={<PrivateChat />} />
      </Routes>
    </div>
  );
}

export default App;
