import React from 'react'
import { useState } from "react";
import { storage } from "../../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import style from './CreatePacks.module.css'
import Swal from "sweetalert2";

import { createCardsAdmin } from '../../../redux/actions/cards/createCards';

function CreateCards() {
  const dispatch = useDispatch();
  const name2 = useRef(null);

  async function uploadFilePack(file, race, name) {
    const storageRef = ref(storage, `cardUnit/${race}/${name}`); //nombre de ref para la subida
    await uploadBytes(storageRef, file); //subida del archivo
    const url = await getDownloadURL(storageRef); //la url de la subida
    return url;
  }
  // const card = useSelector((state) => state.admin.card)
  const [errors, setErrors] = useState(null);
  //files
  const [file, setFile] = useState(null);

  const [input, setInput] = useState({
    name: '', Gdmg: '', Admg: '', life: '', ability: '', abilities: {}, race: '', cost: '', movement: '', image: null
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
        select2.current.value !== "0"
      ) {
        const result = await uploadFilePack(file, input.race, input.name); //obteninedo la url con el nombre
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
    console.log(first)
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
    let newMovement = input.movement.filter((r) => r !== e.target.value);
    setInput({ ...input, movement: newMovement });
  }

  function inputAbility(e) {
    if (!input.ability.includes(e.target.value)) {
      return setInput({ ...input, ability: [...input.ability, e.target.value] });
    }
    let newAbility = input.ability.filter((r) => r !== e.target.value);
    setInput({ ...input, ability: newAbility });
  }

  const all = (
    <div>hola</div>
  )

  return (
    <>
      <div className={style.container}>
        <h1>New Card</h1>
        <form onSubmit={handleSubmitPack}>
          <input type="text" name="name" onChange={(e) => handleChange(e)} placeholder="Name Card" required ref={name2} min="5" />
          {errors && <p>{errors}</p>}
          <input type="number" name="Gdmg" min="1" onChange={(e) => handleChange(e)} placeholder="Ground Damage" required />
          <input type="number" name="Admg" onChange={(e) => handleChange(e)} placeholder="Flying Damage" required min="1" />
          <input type="number" name="life" onChange={(e) => handleChange(e)} placeholder="Life" required min="1" />
          <div>
            <label>Race: </label>
            <label>Zerg: </label>
            <input value="Zerg" key="Zerg" type="radio"  name="race" onChange={(e) => inputRace(e)} />
            <label>Terran: </label>
            <input value="Terran" key="Terran" type="radio" name="race" onChange={(e) => inputRace(e)} />
            <label>Protoss: </label>
            <input value="Protoss" key="Protoss" type="radio" name="race" onChange={(e) => inputRace(e)} />
          </div>

          <input type="number" name="cost" onChange={(e) => handleChange(e)} placeholder="Cost" required min="1" />

          <div>
            <label>Movement: </label>
            <br />
            <label>Ground: </label>
            <input value="Ground" key="Ground" type="checkbox" onChange={(e) => inputMovement(e)} />
            <label>Flying: </label>
            <input value="Flying" key="Flying" type="checkbox" onChange={(e) => inputMovement(e)} />
          </div>

          <div>
            <label>Ability: </label>
            <br />
            <label>Always: </label>
            <input value="Always" key="Always" type="checkbox" onChange={(e) => inputAbility(e)} />
            <label>Attacker: </label>
            <input value="Attacker" key="Attacker" type="checkbox" onChange={(e) => inputAbility(e)} />
            <label>Neither: </label>
            <input value="Neither" key="Neither" type="checkbox" onChange={(e) => inputAbility(e)} />
          </div>
          {(input.ability === 'Neither') ? (
            <input value='poder' />
          ) : ('')

          }
          <input type="text" name="abilities" onChange={(e) => handleChange(e)} placeholder="Abilities" required min="1" />
          <input type="file" name="" onChange={(e) => setFile(e.target.files[0])} />
          <button>Create</button>
          {input.abilities.all ? (all) : ('')}
        </form>
      </div>
    </>
  )
}

export default CreateCards