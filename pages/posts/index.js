
import { authPage } from '../middleware/authorization'

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
           console.log(dataResult);
       }


    }
    return(
        <div>
            <h1 style={{textAlign:'center'}}>Page Post</h1>
            {
                props.posts.map((data , key) => (
                        <div key={key}>
                            <ul>
                                <li>Judul : {data.title}</li>
                                <li>content : {data.content}</li>
                            </ul>
                            <div>
                                <button>edit</button>
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