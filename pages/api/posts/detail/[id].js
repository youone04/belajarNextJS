import db from '../../../../libs/db';
// import jwt from 'jsonwebtoken';
import authorization from '../../../../middleware/authorization';


// get data
export default async function handler(req , res){
    if(req.method !== 'GET') return res.status(405).end();
    const {id} = req.query;

    const auth = await authorization(req, res);
    console.log(auth)

    const data = await db('posts').where({ id }).first();
    if(!data) return res.status(404).end();
    res.status(200);
    res.json({
        message: 'get data succes',
        data
    })
}