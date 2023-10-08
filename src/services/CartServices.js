import { response } from 'express';
import db from '../models'

export const getCart = async (id) => new Promise(async (resolve, reject) => {
    try {
        const cartID = await db.Cart.findOne({
            where: { id },
            include:[{ model: db.User, as: 'userdata', attributes:{exclude: ['password']}}]
        })
        resolve({
            err: response ? 0:1,
            mes: response ? '':'',
            "cartdata":cartID
        })
    } catch (e) {
        reject(e)
    }
})
