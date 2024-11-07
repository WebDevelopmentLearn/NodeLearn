import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

export const authenticateJWTToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({
            message: "Unauthorized: Token not provided"
        })
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Forbidden: Invalid or expired token"
            })
        }
        req.user = user;
        next();
    })

}