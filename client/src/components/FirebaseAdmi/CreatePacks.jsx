import React from 'react'
import { useState } from "react";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import createPackCardsAdmin from './../../redux/actions/admin/cardPacksMod'
import getAllCards from './../../redux/actions/cards/getAllCards';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function CreatePacks() {
    //packs
    async function uploadFilePack(file, name) {
        const storageRef = ref(storage, `packs/${name}`); //nombre de ref para la subida
        await uploadBytes(storageRef, file); //subida del archivo
        const url = await getDownloadURL(storageRef); //la url de la subida
        return url;
    }

    const dispatch = useDispatch();
    const allcards = useSelector((state)=>state.album.cards);

    useEffect(()=>{
      dispatch(getAllCards());
    }, [dispatch])


    //hooks
    const [file, setFile] = useState(null);
    //packs
    const [errors, setErrors] = useState('')

    const [input, setInput] = useState({
        name: '',
        price: '',
        race: [],
        cards: 
            [],
        stock: '',
        image: null,
        amount: ''
    });

    const handleChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    const handleSelectRace = (e)=>{
        if(input.race.includes(e.target.value)){
            alert('Otra raza');
        }else{
            if(input.race.includes(e.target.value)){
                alert('Otra raza literal')
            }else{
                setInput({
                    ...input,
                    race: [...input.race, e.target.value],
                });
                e.target.value = 'Select Race'
            }
        }
    }

    const handleSelectCards = (e)=>{
      if(input.cards.includes(e.target.value)){
          alert('Otra raza');
      }else{
          if(input.cards.includes(e.target.value)){
              alert('Otra carta literal')
          }else{
              setInput({
                  ...input,
                  cards:[...input.cards,[e.target.value]],
              });
              e.target.value = 'Select Card'
          }
      }
    }

    const handleSubmitPack = async (e) => {
        e.preventDefault();
        try {
        console.log(porcentaje);
        
        const result = await uploadFilePack(file, input.name);//obteninedo la url con el nombre
            //console.log(result);
        input.image = result//obteniendo en el input.image el url
        const valorespack = input

        console.log(valorespack);
        dispatch(createPackCardsAdmin(input))
        } catch (error) {
            alert('intentelo otra vez');
        }
    };

    const handleDelete = (e)=>{
      setInput({
        ...input,
        cards: input.cards.filter((card)=>card!==e)
      });
    };


    return (
      <>
      <h1>New Pack</h1>
        <form onSubmit={handleSubmitPack}>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={(e) => handleChange(e)}
          placeholder="Name pack"
        />
        <input
          type="number"
          name="price"
          min="1"
          max="3000"
          value={input.price}
          onChange={(e) => handleChange(e)}
          placeholder="Precio"
        />
        <input
          type="text"
          name="amount"
          value={input.amount}
          onChange={(e) => handleChange(e)}
          placeholder="Amount"
        />
        <input
          type="number"
          name="stock"
          value={input.stock}
          onChange={(e) => handleChange(e)}
          placeholder="stock"
        />
        <div>
          <select 
            onChange={(e)=>handleSelectRace(e)}
          >
            <option disabled selected key="raza">Raza:</option>
            <option value="Zerg" key="Zerg">Zerg</option>
            <option value="Terran" key="Terran">Terran</option>
            <option value="Protoss" key="Protoss">Protoss</option>
          </select>
        </div>
        <div>
        <select
          onChange={(e)=>{handleSelectCards(e);}}
        >
           <option disabled selected key="option">Selecciona una opción</option>
          {allcards?.map((e)=>{
            return (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            );
          })}
        </select>
          </div>

        <input
          type="file"
          name=""
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button>new Pack</button>

        <div>
        {input.cards?.map((e)=>{
          return(
            <div>
              <p>{e}</p>
              <input type="number" 
              value={porcentaje}
              onChange={(e)=>handleChange(e)} />
              <button 
                onClick={()=>{
                  handleDelete(e);
                }}
              >
                x
              </button>
            </div>
          )
        })}
      </div>
      </form>

      {/* muestra */}
      <div>
        {input.cards?.map((e)=>{
          return(
            <div>
              <p>{e}</p>
              <input type="number" 
              value={porcentaje}
              onChange={(e)=>handleChange(e)} />
              <button 
                onClick={()=>{
                  handleDelete(e);
                }}
              >
                x
              </button>
            </div>
          )
        })}
      </div>


    </>
  )
}

export default CreatePacks