const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) 
        return res.status(401).json({ message: 'No token provided' });

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) 
        return res.status(401).json({ message: 'Invalid token format' }); 

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ message: 'Token is not valid' });
        };
        req.user = user;
        next();
    })
};


const authorizeRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden: Not the correct role' });
        }
        next();
    };
}
    
module.exports = {authenticateJWT, authorizeRole};
// This code defines two middleware functions for authentication and authorization in a Node.js application.