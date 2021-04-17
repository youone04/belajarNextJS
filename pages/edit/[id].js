import { useState } from 'react';
import Router from 'next/router'
import { authPage } from '../middleware/authorization'

export async function getServerSideProps(ctx){
    // authoriation
    const {token} = await authPage(ctx);
    const { id } = ctx.query;

    const requestDetail = await fetch(`http://localhost:3000/api/posts/detail/${id}`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer '+ token
        }
    })
    const result = await requestDetail.json();
    // console.log(result);

    return {
        props: {
            token,
            result
        }
    }
}


export default function PostEdit(props){
    const { data } = props.result;
    const[fileds , setFields] = useState({
        title: data.title,
        content:data.content
    });

    const handleSubmit = async (e) =>{
        e.preventDefault();
       const dataSend = await fetch(`/api/update/${data.id}`,{
           method: 'PUT',
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
        <div>
            <h1>Edit Posts</h1>
            <form onSubmit={handleSubmit.bind(this)}>
                <input name="title" type="text" placeholder="Title" onChange={handleChange.bind(this)} defaultValue={data.title} /> <br/>
                <textarea name="content" placeholder="Content" defaultValue={data.content} onChange={handleChange.bind(this)} ></textarea> <br/>
                <button type="submit" >
                    Save
                </button>
            </form>
        </div>
    )   
}