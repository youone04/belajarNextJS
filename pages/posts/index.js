
import { useState } from 'react';
import { authPage } from '../middleware/authorization';
import Router from 'next/router';

export async function getServerSideProps(ctx){
    // authoriation
    const {token} = await authPage(ctx)    
    // feth data
    const fethData = await fetch('http://localhost:3000/api/posts',{
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

   const dataResultFetch = await fethData.json();

    return {
        props:{
            token,
            posts : dataResultFetch.data
        }
    }
}
const PostIndex = (props) => {
    const[tmpData , setTmpData] = useState(props.posts);
   
    async function handleDelete(id, e){
        e.preventDefault();
       const ask = confirm('Apakah data akan dihapus?');

       if(ask){
           const deleteData = await fetch(`/api/delete/${id}` , {
               method:'DELETE',
               headers: {
                   'Authorization': 'Bearer '+ props.token
               }
           });
           const dataResult = await deleteData.json();
           if(dataResult){
            const deleteFilter = tmpData.filter(data => {
                return data.id !== id && data;
            })
            setTmpData(deleteFilter)
           }

       }
    }

  function handleRedirect(id){
     Router.push(`/edit/${id}`);
  }
    return(
        <div>
            <h1 style={{textAlign:'center'}}>Page Post</h1>
            {
                tmpData.map((data , key) => (
                        <div key={key}>
                            <ul>
                                <li>Judul : {data.title}</li>
                                <li>content : {data.content}</li>
                            </ul>
                            <div>
                                <button onClick={handleRedirect.bind(this, data.id)}>edit</button>
                                <button style={{marginLeft: 5}} onClick={handleDelete.bind(this, data.id)}>delete</button>
                            </div>
                            <hr/>
                        </div>
                ))
            }
        </div>
    )
}
export default PostIndex;