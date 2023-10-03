import db from '../models'

export const addtocart = ({productname}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.CartItem.findOrCreate({
            where: {productname} ,
            defaults: {
                productname,
                quantity: "1"
            }
        })
        console.log(response);
        resolve ({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'add product is successfully' : 'product already exists'
        })
        ({
            mes: 'add product on!!!'
        })
    } catch (error) {
        reject(error)
    }
})

export const updatecart = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await db.CartItem.findByPk(id)
            console.log('product ' + id + ' dataUpdate in backend ', data)
            if (!products) {
                resolve({
                    status: 'OK',
                    message: 'Product is not defined',
                })
            }
            await products.update(data);
            console.log(products)
            resolve({
                status: 'OK',
                message: 'Update product SUCCESSFULLY',
                data: products 
            })
        } catch (e) {
            reject(e)
        }
    })
}

export const deletecart = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const products = await db.CartItem.findByPk(id)

            if (!products) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined',
                })
            }
            await products.destroy();

            resolve({
                status: 'OK',
                message: `Delete product SUCCESSFULLY`
            })
        } catch (e) {
            reject(e)
        }
    })
}


