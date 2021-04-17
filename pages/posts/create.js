import { useState } from 'react';
import Cookies from 'js-cookie';

import { authPage } from '../middleware/authorization'

export async function getServerSideProps(ctx){
    // authoriation
    const {token} = await authPage(ctx);
}


export default function PostCreate(){
    const[fileds , setFields] = useState({
        title: '',
        content:''
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const token = Cookies.get('token');
       const dataSend = await fetch('/api/posts/create',{
           method: 'POST',
           body: JSON.stringify(fileds),
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + token
           }
       })
       const dataResult = await dataSend.json();
       console.log(dataResult);
    }

    const handleChange = (e) => {
        const name = e.target.getAttribute('name');
        setFields({
            ...fileds,
            [name] : e.target.value
        })


    }

    return(
        <div>
            <h1>Crate Posts</h1>
            <form onSubmit={handleSubmit.bind(this)}>
                <input name="title" type="text" placeholder="Title" onChange={handleChange.bind(this)} /> <br/>
                <textarea name="content" placeholder="Content" value={fileds.content} onChange={handleChange.bind(this)} > </textarea> <br/>
                <button type="submit" >
                    Save
                </button>
            </form>
        </div>
    )   
}