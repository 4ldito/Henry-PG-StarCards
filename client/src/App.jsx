import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./components/UserProfile/UserProfile";
import LandingPage from "./components/LandingPage/LandingPage";
import Playroom from "./components/Playroom/Playroom";
import ShopCart from "./components/Shop/ShopCart/ShopCart";
import Shop from "./components/Shop/Shop";
import Detail from "./components/Detail/Detail";
import PurchaseCompleted from "./components/Shop/PurchaseCompleted";
import Nav from "./Components/Nav/Nav";
import About from "./Components/About/About";

import "./App.css";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/playroom" element={<Playroom />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/shopcart" element={<ShopCart />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/purchase-completed" element={<PurchaseCompleted />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
