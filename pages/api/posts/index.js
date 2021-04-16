import db from '../../../libs/db';
// import jwt from 'jsonwebtoken';
import authorization from '../../../middleware/authorization';


// get data
export default async function handler(req , res){
    if(req.method !== 'GET') return res.status(405).end();

    const auth = await authorization(req, res);
    console.log(auth)

    const data = await db('posts');
    res.status(200);
    res.json({
        message: 'get data succes',
        data
    })
}