import { useState } from 'react';
import Router from 'next/router'
import { authPage } from '../middleware/authorization'
import Nav from '../../components/nav';

export async function getServerSideProps(ctx){
    // authoriation
    const {token} = await authPage(ctx);

    return {
        props: {
            token
        }
    }
}


export default function PostCreate(props){
    const[fileds , setFields] = useState({
        title: '',
        content:''
    });

    const handleSubmit = async (e) =>{
        e.preventDefault();
       const dataSend = await fetch('/api/posts/create',{
           method: 'POST',
           body: JSON.stringify(fileds),
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + props.token
           }
       })
        const dataResult = await dataSend.json();
       console.log(dataResult);
       if(!dataSend.ok) return;
        if(dataResult){
            Router.push('/posts');
        }
      
    }


    const handleChange = (e) => {
        const name = e.target.getAttribute('name');
        setFields({
            ...fileds,
            [name] : e.target.value
        })


    }

    return(
        <>
            <Nav/>
            <h1>Crate Posts</h1>
            <form onSubmit={handleSubmit.bind(this)}>
                <input name="title" type="text" placeholder="Title" onChange={handleChange.bind(this)} /> <br/>
                <textarea name="content" placeholder="Content" defaultValue="" onChange={handleChange.bind(this)} /> <br/>
                <button type="submit" >
                    Save
                </button>
            </form>
        </>
    )   
}