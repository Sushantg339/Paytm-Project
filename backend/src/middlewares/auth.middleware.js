const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config')

const authMiddleware = async (req , res, next)=>{
    try {
        const {token} = req.cookies
        if(!token){
            return res.status(404).json({
                msg : "token missing!"
            })
        }

        const decoded = jwt.verify(token, JWT_SECRET)

        req.userId = decoded.userId

        next()
    } catch (error) {
        return res.status(403).json({});
    }
}

module.exports = authMiddleware