import { response } from 'express';
import db from '../models'

export const addPromotion= ({promotionname}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Promotion.findOrCreate({
            where: {
                promotionname
            },
            defaults: {
                promotionname
            }
        })
        // console.log(response);
        resolve ({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'add promotion is successfully' : 'promotion already exists',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const updatePromotion = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const promotion = await db.Promotion.findByPk(id)
            if (!promotion) {
                resolve({
                    status: 'OK',
                    message: 'Promotion is not defined',
                })
            }
            await promotion.update(data);
            console.log(promotion)
            resolve({
                status: 'OK',
                message: 'Update Promotion SUCCESSFULLY',
                data: promotion 
            })
        } catch (e) {
            reject(e)
        }
    })
}

export const deletePromotion = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const promotion = await db.Promotion.findByPk(id)

            if (!promotion) {
                resolve({
                    status: 'OK',
                    message: 'The Promotion is not defined',
                })
            }
            await promotion.destroy();

            resolve({
                status: 'OK',
                message: `Delete Promotion SUCCESSFULLY`
            })
        } catch (e) {
            reject(e)
        }
    })
}

export const getPromotion = async (id) => new Promise(async (resolve, reject) => {
    try {
        const PromotionID = await db.Promotion.findOne({
            where: { id },
        })
        resolve({
            err: response ? 0:1,
            mes: response ? '':'',
            data: PromotionID
        })
    } catch (e) {
        reject(e)
    }
})
