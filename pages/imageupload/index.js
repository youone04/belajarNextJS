import { useState } from 'react';
import axios from 'axios';

export default function UploadImage(){
    const[urlImage , setUrlImage] = useState('')

    const handleSubmit =async (e) => {
        e.preventDefault();
        // console.log(urlImage)
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (event) => {
              console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
            },
          };
          
        const response = await axios.post('/api/image', urlImage , config);
        console.log(response);
        return response.data;

    }

    const handleUpload = (image) => {
        const formData = new FormData();
  
        Array.from(image.target.files).forEach((file) => {
          formData.append(image.target.name, file);
        });
        setUrlImage(formData)
        // console.log(image.target.files)
    }
    


    return(
        <>
         <form onSubmit={handleSubmit.bind(this)} encType="multipart/form-data">
             <input name="theFiles" type="file" onChange={handleUpload.bind(this)}/>
             <button type="submit">
                 Save
             </button>
         </form>
        </>
    )
}