import * as services from '../services/CartServices.js'

export const getCart = async (req, res) => {
    try {
        const cartID = req.params.id
        const response = await services.getCart(cartID)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: "con cac"
        })
    }
}