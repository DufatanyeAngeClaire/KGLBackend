const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user id and role to request
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
}

// Middleware to check for Manager role
function isManager(req, res, next) {
    if (req.user.role !== 'Manager') {
        return res.status(403).json({ message: 'Access denied. Managers only.' });
    }
    next();
}

// Middleware to check for Sales Agent role
function isSalesAgent(req, res, next) {
    if (req.user.role !== 'Sales Agent') {
        return res.status(403).json({ message: 'Access denied. Sales Agents only.' });
    }
    next();
}

module.exports = { authenticateToken, isManager, isSalesAgent };
