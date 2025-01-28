import multer from '../middlewares/multer-config';
import auth from '../middlewares/auth';
import checkWork from '../middlewares/checkWork';
import workCtrl from '../controllers/works.controller';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await auth(req, res, () => {});
            await multer(req, res, () => {});
            await checkWork(req, res, () => {});
            return workCtrl.create(req, res);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        return workCtrl.findAll(req, res);
    } else if (req.method === 'DELETE') {
        return workCtrl.delete(req, res);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}