import { useState } from 'react';
import axios from 'axios';
import { authPage } from '../middleware/authorization';
import Nav from '../../components/nav';

export async function getServerSideProps(ctx){
    // authoriation
    const {token} = await authPage(ctx);
    
    return {
        props: {
        }
    }
}

export default function UploadImage(){
    const[urlImage , setUrlImage] = useState('');
    const[descrips , setDescripsi] = useState('decripsi');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (event) => {
              console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
            },
          };
        const response = await axios.post('/api/image', urlImage  , config);
        console.log(response);
        return response.data;

    }

    const handleUpload = (image) => {
        const formData = new FormData();
        Array.from(image.target.files).forEach((file) => {
          formData.append(image.target.name, file);
          formData.set('data', descrips);
        });
        setUrlImage(formData)
    }

    return(
        <>
        <Nav/>
        <h1>Page Upload Image</h1>
        <form onSubmit={handleSubmit.bind(this)} encType="multipart/form-data">
             <input type="text" name="descripsi" onChange={(e) => setDescripsi(e.target.value)} placeholder="Descripsi" /> <br/>
             <input name="theFiles" type="file" onChange={handleUpload.bind(this)}/>
             <button type="submit">
                 Save
             </button>
         </form>
        </>
    )
}