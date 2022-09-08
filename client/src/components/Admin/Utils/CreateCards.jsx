import React from 'react'
import { useState } from "react";
import { storage } from "../../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRef } from 'react';
import style from './CreatePacks.module.css'
import Swal from "sweetalert2";

import {
    createCardsAdmin,
    cleanCreateCardsAdmin
} from '../../../redux/actions/cards/createCards';


function CreateCards() {
    const name2 = useRef(null);
    const price = useRef(null);
    


    async function uploadFilePack(file, race, name) {
        const storageRef = ref(storage, `cardUnit/${race}/${name}`); //nombre de ref para la subida
        await uploadBytes(storageRef, file); //subida del archivo
        const url = await getDownloadURL(storageRef); //la url de la subida
        return url;
    }

    const dispatch = useDispatch();
    const card = useSelector((state)=> state.admin.card)

    /*useEffect(() => {
        if (Object.keys(card).length !== 0) {
          Swal.fire({
            title: "Card Created!",
            text: "Created successful",
            icon: "success",
          });
          dispatch(cleanCreateCardsAdmin());
          setInput({
            name: '',
            Gdmg: '',
            Admg: '',
            life: '',
            ability: '',
            abilities: [],
            race: '',
            cost: '',
            movement: '',
            image: null
          });
          name2.current.value = "";
          price.current.value = "";
        }
      }, [card]);*/
    //hooks
    const [errors, setErrors] = useState(null);
    //files
    const [file, setFile] = useState(null);

    const [input, setInput] = useState({
        name: '',
        Gdmg: '',
        Admg: '',
        life: '',
        ability: '',
        abilities: [],
        race: '',
        cost: '',
        movement: '',
        image: null
    })

    const handleChange = (e) => {
        let name = name2.current.value;
        setErrors("");
        if (name) {
          if (/^[A-Z]+$/i.test(name)) {
            setInput({
              ...input,
              [e.target.name]: e.target.value,
            });
          } else {
            setErrors("solo letras");
          }
        } else {
          setInput({
            ...input,
            [e.target.name]: e.target.value,
          });
        }
    };

    const handleSubmitPack = async (e) => {
        e.preventDefault();
    
        try {
          if (
            !errors &&
            // select1.current.value !== "0"
            //  &&
            select2.current.value !== "0"
          ) {
            const result = await uploadFilePack(file,input.race ,input.name); //obteninedo la url con el nombre
            input.image = result; //obteniendo en el input.image el url
            const valorespack = input;
            
            dispatch(createCardsAdmin(valorespack));
          } else {
            errors
              ? Swal.fire({
                  title: "Error!",
                  text: "Enter a valid name",
                  icon: "error",
                })
              : Swal.fire({
                  title: "Error!",
                  text: "Complete all fields",
                  icon: "error",
                });
          }
        } catch (error) {
          alert("Retry");
        }
      };
    
    function inputRace(e) {
        if (!input.race.includes(e.target.value)) {
          return setInput({ ...input, race: [...input.race, e.target.value] });
        }
        let newRace = input.race.filter((r) => r !== e.target.value);
        setInput({ ...input, race: newRace });
    }
    
    function inputMovement(e) {
        if (!input.movement.includes(e.target.value)) {
          return setInput({ ...input, movement: [...input.movement, e.target.value] });
        }
        let newRace = input.movement.filter((r) => r !== e.target.value);
        setInput({ ...input, movement: newRace });
    }

    const all = (
        <div>hola</div>
    )


    return(
        <>
        <div className={style.container}>
          <h1>New Pack</h1>
          <form onSubmit={handleSubmitPack}>
            <input
              type="text"
              name="name"
              onChange={(e) => handleChange(e)}
              placeholder="Name pack"
              required
              ref={name2}
              min="5"
            />
            {errors && <p>{errors}</p>}
            <input
              type="number"
              name="Gdmg"
              min="1"
              onChange={(e) => handleChange(e)}
              placeholder="Ground Damage"
              //ref={price}
              required
            />
            <input
              type="number"
              name="Admg"
              onChange={(e) => handleChange(e)}
              placeholder="Flying Damage"
              required
              //ref={amount}
              min="1"
            />
            <input
              type="number"
              name="life"
              onChange={(e) => handleChange(e)}
              placeholder="Life"
              required
              min="1"
              //ref={stock}
            />
            <div>
              <label>Race: </label>
              <br />
              <label>Zerg: </label>
              <input
                value="Zerg"
                key="Zerg"
                type="checkbox"
                onChange={(e) => inputRace(e)}
              ></input>
              <label>Terran: </label>
              <input
                value="Terran"
                key="Terran"
                type="checkbox"
                onChange={(e) => inputRace(e)}
              ></input>
              <label>Protoss: </label>
              <input
                value="Protoss"
                key="Protoss"
                type="checkbox"
                onChange={(e) => inputRace(e)}
              ></input>
            </div>
            
            <input
              type="number"
              name="cost"
              onChange={(e) => handleChange(e)}
              placeholder="Cost"
              required
              min="1"
              //ref={stock}
            />

            <div>
              <label>Movement: </label>
              <br />
              <label>Ground: </label>
              <input
                value="Ground"
                key="Ground"
                type="checkbox"
                onChange={(e) => inputMovement(e)}
              ></input>
              <label>Flying: </label>
              <input
                value="Flying"
                key="Flying"
                type="checkbox"
                onChange={(e) => inputMovement(e)}
              ></input>
            </div>


            <input
              type="file"
              name=""
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button>Create</button>

            {input.abilities.all?(all):('')}

          </form>
        </div>
      </>
    )
}

export default CreateCards