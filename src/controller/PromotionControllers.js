import * as services from '../services/PromotionServices.js'

export const addPromotion = async (req, res) => {
    try{
        const {promotionname} = req.body
        console.log({promotionname})
        if ( !promotionname ) return res.status(400).json({
            err: 1,
            mes: 'Missing payload'
        })
        const response = await services.addPromotion(req.body)
        return  res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Iternal server error'
        })
    }
}

export const updatePromotion = async (req, res) => {
    try {
        const promotionID = req.params.id
        const data = req.body
        if (!promotionID) {
            return res.status(200).json({
                status: "error",
                message: "The Id is required"
            })
        }
        const response = await services.updatePromotion(promotionID, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const deletePromotion = async (req, res) => {
    try {
        const promotionID = req.params.id
        if (!promotionID) {
            return res.status(200).json({
                status: "error",
                message: "The Id is required"
            })
        }
        const response = await services.deletePromotion(promotionID)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: "Iternal server error"
        })
    }
}

export const getPromotion = async (req, res) => {
    try {
        const promotionID = req.params.id
        const response = await services.getPromotion(promotionID)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: "con cac"
        })
    }
}