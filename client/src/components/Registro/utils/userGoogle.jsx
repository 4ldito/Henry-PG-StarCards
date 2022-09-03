import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../../redux/actions/user";
import React from "react";


export default async function createOrGetUserGoogle (user) {
  const decoded = jwt_decode(user.credential)

  const dispatch = useDispatch();

function asd(){
     dispatch(signIn({
      password: "$2a$11$NLo50EA2piHpl/zn2KCW5uqmBc9IWWY0aC.xQaW4Fe1QLIepqW/ba",
      email: em,
    }))
}
  const { email, name, picture } = decoded;
  const userObject = {
    username: name,
    email,
    profileImg: picture,
    loginGoogle: true
  }
  localStorage.setItem("userInfo", JSON.stringify(userObject));
  await axios.post("/createuser", userObject);
  
    const infoGuest = await axios.post("/createuser", userObject); // esta ruta es la que crea  tu guest o user en base de datos
    localStorage.setItem("userInfo", JSON.stringify(infoGuest.data));
    const em= infoGuest.data.user.email
    console.log(em)
    asd()

};