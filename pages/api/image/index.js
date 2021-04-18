import nextConnect from 'next-connect';
import multer from 'multer';
import db from '../../../libs/db';

const upload = multer({
    storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, Date.now() + "-" +
   file.originalname),
  }),
});

const hanlder = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },

});

hanlder.use(upload.array('theFiles'));

hanlder.post(async (req, res) => {
  const result = JSON.parse(JSON.stringify(req.body))
  // console.log('data body => ',result.data);
  // console.log('data file => ', req.files[0].filename);
  await db('tbl_img').insert({
    url_img:req.files[0].filename,
    descripsi: result.data
});
  res.status(200).json({data: 'success' });
});

export default hanlder;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};