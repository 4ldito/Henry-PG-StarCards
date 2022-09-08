import { useState } from "react";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Firebase() {
  //cards
  async function uploadFileCard(file, name, race) {
    const storageRef = ref(storage, `cardUnit/${race}/${name}`); //nombre de ref para la subida
    await uploadBytes(storageRef, file); //subida del archivo
    const url = await getDownloadURL(storageRef); //la url de la subida
    return url;
  }

  //packs
  async function uploadFilePack(file, name) {
    const storageRef = ref(storage, `perfil/${name}`); //nombre de ref para la subida
    await uploadBytes(storageRef, file); //subida del archivo
    const url = await getDownloadURL(storageRef); //la url de la subida
    return url;
  }

  //hooks
  const [file, setFile] = useState(null);

  //zerg/terran/prottoss
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  //packs
  const [namepack, setNamepack] = useState("");

  const handleSubmitCard = async (e) => {
    e.preventDefault();
    try {
      const result = await uploadFileCard(file, name, race);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPack = async (e) => {
    e.preventDefault();
    try {
      const result = await uploadFilePack(file, namepack);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    /*
      <form onSubmit={handleSubmitCard}>
        <input type='text' name='' id='' placeholder='nombre'
          onChange={(e)=>setName(e.target.value)}
        />
        <input type='text' name='' id='' placeholder='raza'
          onChange={(e)=>setRace(e.target.value)}
        />
        <input type='file' name='' 
              id='' 
              onChange={(e)=>setFile(e.target.files[0])} />
        <button>new Card</button>
      </form>*/
    //packs xD
    <>
      <br />
      <br />

      <form onSubmit={handleSubmitPack}>
        <input
          type="text"
          name=""
          id=""
          onChange={(e) => setNamepack(e.target.value)}
          placeholder="img perfil"
        />
        <input
          type="file"
          name=""
          id=""
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button>Upload</button>
      </form>
    </>
  );
}

export default Firebase;
