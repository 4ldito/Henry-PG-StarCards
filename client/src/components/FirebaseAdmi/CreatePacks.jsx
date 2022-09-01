import React from 'react'
import { useState } from "react";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function CreatePacks() {
    //packs
    async function uploadFilePack(file, name) {
        const storageRef = ref(storage, `packs/${name}`); //nombre de ref para la subida
        await uploadBytes(storageRef, file); //subida del archivo
        const url = await getDownloadURL(storageRef); //la url de la subida
        return url;
    }

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
            [['']],
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
        if(input.race.includes(e.target.value)){
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
        const result = await uploadFilePack(file, namepack);
            console.log(result);
        } catch (error) {
            alert('intentelo otra vez');
        }
    };


    return (
        <form onSubmit={handleSubmitPack}>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={(e) => setNamepack(e.target.value)}
          placeholder="Name pack"
        />
        <input
          type="number"
          name="precio"
          min="1"
          max="3000"
          value={input.price}
          placeholder="Precio"
        />
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={(e) => setNamepack(e.target.value)}
          placeholder="Name pack"
        />
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={(e) => setNamepack(e.target.value)}
          placeholder="Name pack"
        />
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setRace(e.target.value)}
          placeholder="razas"
        />
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setRace(e.target.value)}
          placeholder="cantidad"
        />
        <input
          type="file"
          name=""
          id=""
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button>new Pack</button>
      </form>  
  )
}

export default CreatePacks