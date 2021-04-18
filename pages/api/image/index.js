import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
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

hanlder.post((req, res) => {
    console.log(res)
  res.status(200).json({ data: 'success' });
});

export default hanlder;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};