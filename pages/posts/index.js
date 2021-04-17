
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

            posts : dataResultFetch.data
        }
    }
}
const PostIndex = (props) => {
    return(
        <div>
            <h1>Page Post</h1>
            {
                props.posts.map((data , key) => (
                        <div key={key}>
                            <ul>
                                <li>Judul : {data.title}</li>
                                <li>content : {data.content}</li>
                            </ul>
                        </div>
                ))
            }
        </div>
    )
}
export default PostIndex;