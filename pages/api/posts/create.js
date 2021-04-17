import db from '../../../libs/db';
import authorization from '../../../middleware/authorization';


// insert data
export default async function handler(req , res){
    if(req.method !== 'POST') return res.status(405).end();
    const auth = await authorization(req, res);
    
    const {title , content} = req.body;
    const insert = await db('posts').insert({
        title,
        content,
    });
    const result = await db('posts').where('id',insert ).first();
    res.status(200);
    res.json({
        message: 'input data  berhasil',
        data: result
    });
}