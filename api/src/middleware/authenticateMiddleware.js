import jwt from 'jsonwebtoken';

class authenticateMiddleware {
    
    authenticate(req, res, next) {
        
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ message: 'Token is required' });
        }

        
        const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

        
        jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.user = { userId: decoded.userId, role: decoded.role };
            next();
        });
    }


}

export default new authenticateMiddleware();