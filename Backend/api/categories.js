import categoriesCtrl from '../controllers/categories.controller';

export default function handler(req, res) {
    if (req.method === 'GET') {
        categoriesCtrl.findAll(req, res);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}