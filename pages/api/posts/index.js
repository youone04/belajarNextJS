import db from '../../../libs/db';

// get data
export default async function handler(req , res){
    if(req.method !== 'GET') return res.status(405).end();
    const data = await db('posts');
    res.status(200);
    res.json({
        message: 'get data succes',
        data
    })
}