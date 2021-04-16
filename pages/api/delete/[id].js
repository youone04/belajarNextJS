import db from '../../../libs/db';
import authorization from '../../../middleware/authorization';


export default async function hanlder(req , res){
    if(req.method !== 'DELETE') return res.status(405).end();
    const auth = await authorization(req, res);
    console.log(auth)
    const{ id } = req.query;
    await db('posts').where({id}).del();
    res.status(200);
    res.json({
        message : 'data succes delete'
    })
}