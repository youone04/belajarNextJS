import db from '../../../libs/db';
import authorization from '../../../middleware/authorization';

export default async function handler(req , res){
    if(req.method !== 'GET') return res.status(405).end();
    const auth = await authorization(req, res);
    console.log(auth);
    const data = await db('tbl_img');
    res.status(200);
    res.json({
        message: 'get data image succes',
        data
    })

}