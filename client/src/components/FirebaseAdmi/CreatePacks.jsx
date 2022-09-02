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
    console.log(allcards);

    useEffect(()=>{
      dispatch(getAllCards());
    }, [dispatch])


    //hooks
    const [file, setFile] = useState(null);
    //packs
    const [namepack, setNamepack] = useState('');
    const [errors, setErrors] = useState('')

    const [input, setInput] = useState({
        name: '',
        price: '',
        race: [],
        cards: 
            [[]],
        stock: '',
        image: '',
        amount: ''
    });

    const handleChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    const handleSelect = (e)=>{
        if(input.cards.includes(e.target.value)){
            alert('Otra raza');
        }else{
            if(input.cards.includes(e.target.value)){
                alert('Otra carta literal')
            }else{
                setInput({
                    ...input,
                    cards:[...input.cards, e.target.value],
                });
                e.target.value = 'Select Card'
            }
        }
    }

    const handleSubmitPack = async (e) => {
        e.preventDefault();
        try {
          
        const result = await uploadFilePack(input.image, input.name);
            //console.log(result);
        input.image = result
        dispatch(createPackCardsAdmin(input))
        } catch (error) {
            alert('intentelo otra vez');
        }
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
        <input
          type="text"
          name="race"
          value={input.race}
          onChange={(e) => handleChange(e)}
          placeholder="razas"
        />
        <div>
        <select
          onChange={(e)=>{handleSelect(e);}}
        >
          <option>Select cards</option>
          {allcards?.map((e)=>{
            return (
              <option value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
          </div>

        <input
          type="file"
          name="image"
          value={input.image}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button>new Pack</button>
      </form>  
    </>
  )
}

export default CreatePacks