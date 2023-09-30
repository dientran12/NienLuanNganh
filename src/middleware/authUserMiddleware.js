import jwt from "jsonwebtoken"
require('dotenv').config()


const adminAuth = (req, res, next) => {
    if (req.headers.token == null) {
        return res.status(404).json({
            message: 'Chua dang nhap',
            status: 'error'
        })
    } else {
        try {
            const token = req.headers.token.split(' ')[1]
        } catch (error) {
            console.log("Not token")
        }
        jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
            if (err) {
                return res.status(404).json({
                    message: 'The authentication',
                    status: 'error'
                })
            }
            if (user?.role == "admin") {
                next()
            } else {
                return res.status(404).json({
                    message: 'No admin rights',
                    status: 'error'
                })
            }
        });
    }
}

const memberAuth = (req, res, next) => {
    try {
        const token = req.headers.token.split(' ')[1]
    } catch (error) {
        console.log("Not token")
    }
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication con cac',
                status: 'error'
            })
        }
        if (user?.role == "admin" || user?.role == "admin" || user?.id == userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'No admin rights',
                status: 'error'
            })
        }
    });
}

export default {
    adminAuth, memberAuth
}
