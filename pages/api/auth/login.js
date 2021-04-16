import db from '../../../libs/db';
import bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function hanlder(req , res) {
    if(req.method !== 'POST') return res.status(405).end();
    const{email , password} = req.body;
    const cekUser = await db('users')
                          .where({email})
                          .first();

   if(!cekUser) return res.status(401).end()
   const cekPassword  = await bcrypt.compare(password, cekUser.password);
   if(!cekPassword) return res.status(401).end();

   const token  = jwt.sign({
       id: cekUser.id,
       email: cekUser.email
   },'123',{
       expiresIn:'1d'
   })

    res.status(200);
    res.json({
        message: 'login success',
        token
    })
}