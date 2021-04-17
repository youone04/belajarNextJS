
import { authPage } from '../middleware/authorization'

export async function getServerSideProps(ctx){
    const auth = await authPage(ctx)
    console.log(auth)
    return {
        props:{}
    }
}
const PostIndex = () => {
    return(
        <div>
            <h1>Page Post</h1>
        </div>
    )
}
export default PostIndex;