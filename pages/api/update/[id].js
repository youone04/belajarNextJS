import db from '../../../libs/db';
import authorization from '../../../middleware/authorization';

export default async function hanlder(req , res){
    if(req.method !== 'PUT') return res.status(405).end();
    const auth = await authorization(req, res);
    console.log(auth)
    const { id } = req.query;
    const {title , content} = req.body;
    const update = await db('posts')
                        .where({id})
                        .update({
                            title,
                            content
                        });

    res.status(200);
    res.json({
        message: "update data success",
        update
    });
}