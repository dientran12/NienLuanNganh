import * as services from '../services/CartServices.js'

export const addtocart = async (req, res) => {
    try{
        const {productname,quantity} = req.body
        console.log({productname,quantity})
        if (!productname) return res.status(400).json({
            err: 1,
            mes: 'Missing payload'
        })
        const response = await services.addtocart(req.body)
        return  res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Iternal server error'
        })
    }
}

export const updatecart = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(200).json({
                status: "error",
                message: "The Id is required"
            })
        }
        const response = await services.updatecart(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

export const deletecart = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: "error",
                message: "The Id is required"
            })
        }
        const response = await services.deletecart(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: "Iternal server error"
        })
    }
}
