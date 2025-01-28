import userCtrl from '../controllers/users.controller';

export default function handler(req, res) {
    if (req.method === 'POST' && req.url === '/login') {
        userCtrl.login(req, res);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}