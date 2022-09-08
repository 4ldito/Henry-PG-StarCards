import React from "react";
import css from "./footer.module.css";
import logo from "../../img/logo-15.png"

export default function Footer () {

    return <div className={css.container}>
            {/* <h1>STARCARDS</h1> */}
            <img src={logo} alt="logo" className={css.img}/>
            <p className={css.allRights}>© All rights reserved</p>
           </div>
}