import bcrypt from 'bcryptjs';
import db from '../models/index'
import JwtService from "./JwtService"

const salt = bcrypt.genSaltSync(10);
const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email } = data;
            const checkUser = await db.User.findOne({
                where: {
                    email: email
                }
            })
            let name = data.name
            if (checkUser === null) {
                const hassUserPasswordFromBcrypt = bcrypt.hashSync(data.password, salt);

                if (!name) {
                    const usernameFromEmail = email.split('@')[0];

                    let checkUsername = await db.User.findOne({
                        where: {
                            name: usernameFromEmail
                        }
                    });
                    if (checkUsername) {

                        let randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
                        let newUsername = `${usernameFromEmail}${randomDigits}`;
                        while (checkUsername) {
                            randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
                            newUsername = `${usernameFromEmail}${randomDigits}`;
                            checkUsername = await db.User.findOne({
                                where: {
                                    name: newUsername
                                }
                            });
                        }

                        name = newUsername;
                    } else {
                        name = usernameFromEmail;
                    }
                }
                console.log('Email:', email);
                console.log('name:', name);

                const newUser = await db.User.create({
                    name: name,
                    password: hassUserPasswordFromBcrypt,
                    email: data.email,
                    address: data.address,
                    phone: data.phone,
                    isAdmin: data.isAdmin,
                    gender: data.gender
                });
                if (newUser) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: newUser
                    })
                }
            } else {
                resolve({
                    status: 'error',
                    message: 'Email already used',
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = data;
            const checkUser = await db.User.findOne({
                where: {
                    email: email
                }
            })

            if (checkUser === null) {
                resolve({
                    status: 'error',
                    message: 'The user is not defined',
                })
            } else {
                const comparePassword = bcrypt.compareSync(password, checkUser.password);
                if (!comparePassword) {
                    resolve({
                        status: 'error',
                        message: 'The password or user is incorrect',
                    })
                }
                const accessToken = await JwtService.genneralAccessToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })
                const refreshToken = await JwtService.genneralRefreshToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })
                console.log("email", email)
                console.log("password", password)
                console.log("accessToken", accessToken)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    accessToken,
                    refreshToken
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findByPk(id)
            console.log('user' + id + 'dataUpdate in backend', data)
            if (user === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                })
            }
            const updatedUser = await user.update(data);
            resolve({
                status: 'OK',
                message: 'Update user SUCCESSFULLY',
                data: updatedUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const user = await db.User.findByPk(id)

            if (!user) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined',
                })
            }
            const deletedUser = await user.destroy();

            resolve({
                status: 'OK',
                message: `Delete user SUCCESSFULLY`
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allUser = await db.User.findAll()
            resolve({
                status: 'OK',
                message: 'Get All Users Successfully',
                data: allUser
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getDetailsUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const user = await db.User.findByPk(id)

            if (!user) {
                resolve({
                    status: 'error',
                    message: 'The user is not defined',
                })
            }
            // console.log('user in getuser backend; ' + user.avatar)
            resolve({
                status: 'OK',
                message: 'Get details user SUCCESSFULLY',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

export default {
    createNewUser,
    getAllUsers,
    loginUser,
    updateUser,
    deleteUser,
    getDetailsUser,
}
