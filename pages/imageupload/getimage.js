import Nav from "../../components/nav";
import { authPage } from '../middleware/authorization';
import Image from 'next/image'


export async function getServerSideProps(ctx){
    // authoriation
    const {token} = await authPage(ctx)    
    // feth data
    const fethData = await fetch('http://localhost:3000/api/image/getimage',{
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

   const dataResultFetch = await fethData.json();

    return {
        props:{
            dataResultFetch
        }
    }
}

export default function GetImaget(props){
    const{ dataResultFetch } = props;

    return(
        <>
        <Nav/>
        <div style={{paddingTop: 30}}></div>
        <h1>Page See Image</h1>
        {
            dataResultFetch.data.map((data , key) => {
                return(
                    <div key={key}>
                        <div>
                            {/* {console.log(data.url_img)} */}
                            <Image
                                src={`/uploads/${data.url_img}`}
                                alt="Picture of the author"
                                width={100}
                                height={100}
                            />
                        </div>
                        <p>{data.descripsi}</p>
                        <hr/>
                    </div>
                )
            })
        }
        </>
    )

}