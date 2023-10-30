import jwt from "jsonwebtoken"
require('dotenv').config()

const genneralAccessToken = async (payload) => {
    const accessToken = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '30s' });
    return accessToken
}

const genneralRefreshToken = async (payload) => {
    console.log("payload", payload)
    const refreshToken = jwt.sign({
        ...payload,
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
    return refreshToken
}

const refreshTokendService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'error',
                        message: 'The refreshTokendService'
                    })
                } else {
                    const accessToken = await genneralAccessToken({
                        id: user?.id,
                        role: user?.role
                    })
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        accessToken
                    })
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

export default {
    genneralAccessToken, genneralRefreshToken, refreshTokendService
}

