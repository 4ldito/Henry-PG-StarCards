import React from 'react'
import { useState } from "react";
import { storage } from "../../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import createCardsAdmin from './../../../redux/actions/cards/createCards'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


function CreateCards() {
    async function uploadFilePack(file, race, name) {
        const storageRef = ref(storage, `cards/${race}/${name}`); //nombre de ref para la subida
        await uploadBytes(storageRef, file); //subida del archivo
        const url = await getDownloadURL(storageRef); //la url de la subida
        return url;
    }

    const dispatch = useDispatch();

    //hooks
    //files
    const [file, setFile] = useState(null);

    const [input, setInput] = useState({

    })

    return(
        <h1>hola xD</h1>
    )
}

export default CreateCards