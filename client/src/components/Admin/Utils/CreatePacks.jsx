import React from "react";
import { useState } from "react";
import { storage } from "../../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import getAllCards from "./../../../redux/actions/cards/getAllCards";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import css from "./CreatePacks.module.css";
import Swal from "sweetalert2";
import {
  createPackCardsAdmin,
  cleanCreatePackCardsAdmin,
} from "../../../redux/actions/admin/cardPacksMod";

function CreatePacks() {
  //packs
  const name2 = useRef(null);
  const price = useRef(null);
  const amount = useRef(null);
  const stock = useRef(null);
  const select2 = useRef(null);
  async function uploadFilePack(file, name) {
    const storageRef = ref(storage, `packs/${name}`); //nombre de ref para la subida
    await uploadBytes(storageRef, file); //subida del archivo
    const url = await getDownloadURL(storageRef); //la url de la subida
    return url;
  }

  const dispatch = useDispatch();
  const allcards = useSelector((state) => state.album.cards);
  const packCard = useSelector((state) => state.admin.packCard);

  useEffect(() => {
    if (Object.keys(packCard).length !== 0) {
      Swal.fire({
        background:
          "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
        color: "white",
        title: "PackCard Created!",
        text: "Created successful",
        icon: "success",
      });
      dispatch(cleanCreatePackCardsAdmin());
      setInput({
        name: "",
        price: "",
        race: [],
        cards: [],
        percent: [],
        stock: "",
        image: null,
        amount: "",
      });
      name2.current.value = "";
      price.current.value = "";
      amount.current.value = "";
      stock.current.value = "";
      select2.current.value = "0";
    }
  }, [packCard]);

  useEffect(() => {
    dispatch(getAllCards());
  }, [dispatch]);

  //hooks
  const [file, setFile] = useState(null);
  //packs
  const [errors, setErrors] = useState(null);

  const [input, setInput] = useState({
    name: "",
    price: "",
    race: [],
    cards: [],
    stock: "",
    image: null,
    amount: "",
  });

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
        setErrors("only letters");
      }
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSelectRace = (e) => {
    setInput({
      ...input,
      race: [e.target.value],
    });
  };

  const handleSelectCards = (e) => {
    for (const card of input.cards) {
      if (card[0] === e.target.value) {
        return;
      }
    }
    setInput({
      ...input,
      cards: [...input.cards, [e.target.value]],
    });
  };

  const handleSubmitPack = async (e) => {
    e.preventDefault();

    try {
      if (!errors && select2.current.value !== "0") {
        const result = await uploadFilePack(file, input.name); //obteninedo la url con el nombre
        input.image = result; //obteniendo en el input.image el url
        const valorespack = input;
        const total = input.cards.reduce((a, e) => a + e[1], 0);
        input.cards.forEach(
          (c) => (c[1] = Math.round((c[1] / total) * 10) / 10)
        );
        dispatch(createPackCardsAdmin(valorespack));
      } else {
        errors
          ? Swal.fire({
              background:
                "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
              color: "white",
              title: "Error!",
              text: "Enter a valid name",
              icon: "error",
            })
          : Swal.fire({
              background:
                "linear-gradient( 135deg, rgba(7, 110, 153, 1) 0%, rgba(43, 0, 110, 1) 100% )",
              color: "white",
              title: "Error!",
              text: "Complete all fields",
              icon: "error",
            });
      }
    } catch (error) {
      alert("Retry");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      cards: input.cards.filter((card) => card[0] !== e.target.value),
    });
  };

  function inputCard(e, c) {
    e.preventDefault();
    input.cards.find((e) => e[0] === c[0])[1] = e.target.value;
  }

  function inputRace(e) {
    if (!input.race.includes(e.target.value)) {
      return setInput({ ...input, race: [...input.race, e.target.value] });
    }
    let newRace = input.race.filter((r) => r !== e.target.value);
    setInput({ ...input, race: newRace });
  }

  return (
    <>
      <div className={css.container}>
        <h1>New Pack</h1>
        <form className={css.form} onSubmit={handleSubmitPack}>
          <input
            type="text"
            name="name"
            className={css.input}
            onChange={(e) => handleChange(e)}
            placeholder="Name pack"
            required
            ref={name2}
            min="5"
          />
          {errors && <p>{errors}</p>}
          <input
            type="number"
            name="price"
            className={css.input}
            min="1"
            max="3000"
            onChange={(e) => handleChange(e)}
            placeholder="Price"
            ref={price}
            required
          />
          <input
            type="number"
            name="amount"
            className={css.input}
            onChange={(e) => handleChange(e)}
            placeholder="Amount"
            required
            ref={amount}
            min="1"
          />
          <input
            type="number"
            name="stock"
            className={css.input}
            onChange={(e) => handleChange(e)}
            placeholder="stock"
            required
            min="1"
            ref={stock}
          />
          <div className={css.checkList}>
            <label>Race</label>
            <br />
            <label>Zerg</label>
            <input
              value="Zerg"
              key="Zerg"
              type="checkbox"
              onChange={(e) => inputRace(e)}
            ></input>
            <br />
            <label>Terran </label>
            <input
              value="Terran"
              key="Terran"
              type="checkbox"
              onChange={(e) => inputRace(e)}
            ></input>
            <br />
            <label>Protoss </label>
            <input
              value="Protoss"
              key="Protoss"
              type="checkbox"
              onChange={(e) => inputRace(e)}
            ></input>
          </div>
          <div>
            <label>Select one option:</label>
            <select
              onChange={(e) => {
                handleSelectCards(e);
              }}
              ref={select2}
              required
            >
              <option value="0" hidden={true} key="option"></option>
              {allcards?.map((e) => {
                return (
                  <option value={e.name} key={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={css.divProbabiliti}>
            {input.cards?.map((c, i) => {
              return (
                <div key={i}>
                  <span>{c[0]}: </span>
                  <section>
                    <input
                      type="number"
                      min="0"
                      onChange={(e) => inputCard(e, c)}
                      className={css.probabilidad}
                    />
                    <button
                      value={c}
                      onClick={(e) => {
                        handleDelete(e);
                      }}
                      className={css.x}
                    >
                      x
                    </button>
                  </section>
                </div>
              );
            })}
          </div>

          <input
            type="file"
            className={css.file}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button>Create</button>
        </form>
      </div>
    </>
  );
}

export default CreatePacks;
