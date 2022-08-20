import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./components/UserProfile/UserProfile";
import LandingPage from "./components/LandingPage/LandingPage";
import Playroom from "./components/Playroom/Playroom";
import ShopCart from "./components/Shop/ShopCart/ShopCart";
import Shop from "./components/Shop/Shop";
import Detail from "./components/Detail/Detail";
import Inventory from "./components/Inventory/Inventory";
import PurchaseCompleted from "./components/Shop/PurchaseCompleted";

import "./App.css";
import Nav from "./Components/Nav/Nav";
// import Profile from './components/Profile/Profile'

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/playroom" element={<Playroom />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shopcart" element={<ShopCart />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/purchase-completed" element={<PurchaseCompleted />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
