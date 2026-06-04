import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectedRoute = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer token
        if (!token) {
            return res.status(401).json({ message: "Access token missing" });
        }
        // Verify token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid access token" });
            }
            // Find user by id in token
            const user = await User.findById(decoded.userId).select('-hashedPassword');
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // Return user info in response
            req.user = user;
            next();
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}