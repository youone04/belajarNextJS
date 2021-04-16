import db from '../../../libs/db';

export default async function hanlder(req , res){
    if(req.method !== 'PUT') return res.status(405).end();
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