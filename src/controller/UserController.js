import JwtService from '../services/JwtService.js';
import UserService from '../services/UserService.js';

const createUser = async (req, res) => {
    try {
        const { password, confirmPassword, email } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email)
        if (!password || !confirmPassword || !email) {
            return res.status(200).json({
                status: 'error',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'error',
                message: 'Invalid email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'error',
                message: 'confirm Password must match Password'
            })
        } else {
            const response = await UserService.createNewUser(req.body)
            return res.status(200).json(response)
        }
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reg = /^[^\s@]+@(?:[^\s@]+\.)+[a-zA-Z]{2,}$/;
        const isCheckEmail = reg.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: 'error',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'error',
                message: 'Invalid email'
            })
        }

        const response = await UserService.loginUser(req.body)
        const { refreshToken, ...newResponse } = response
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })
        return res.status(200).json(newResponse)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: "error",
                message: "The userId is required"
            })
        }
        // console.log("userId: " + userId)
        // console.log('user' + userId + 'dataUpdate in backend at useController', data)
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: "error",
                message: "The userId is required"
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: "con cac"
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const response = await UserService.getAllUsers()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: "con cac"
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: "error",
                message: "The userId is required"
            })
        }
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: "con cac"
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken
        if (!token) {
            return res.status(200).json({
                status: "error",
                message: "The token is required"
            })
        }
        const response = await JwtService.refreshTokendService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: "con cac"
        })
    }
}

const logoutnUser = async (req, res) => {
    try {
        res.clearCookie('refreshToken')
        return res.status(200).json({
            status: 'OK',
            message: 'The user has logged out'
        })
    } catch (e) {
        return res.status(404).json({
            message: "con cac"
        })
    }
}

export default {
    createUser, loginUser, updateUser, deleteUser, getAllUsers, getDetailsUser, refreshToken, logoutnUser
}
