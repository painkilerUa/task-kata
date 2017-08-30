const router = require('express').Router();
const models = require('../models');

function initRoute(io){
    router.get('/', (req, res) => {
        res.send('Ok')
})
    router.post('/order', (req, res) => {
        models.sales.findAll({
            attributes: ['id', 'value', 'full_price', 'free_item_id']
        }).then((data) => {
            models.products.findAll({
                attributes: ['id', 'sku', 'attr_id']
            }).then((products) => {
                let obj = {};
                for(sale of req.body){
                    if(obj[sale.sku]){
                        obj[sale.sku].value ++;
                    }else{
                        obj[sale.sku].value = 1;
                        obj[sale.sku].attr_id = sale.attr_id;
                        obj[sale.sku].weight = sale.weight ? sale.weight : null;
                    }
                }
                obj
                // products
                // data
                req.body
            })
        }).catch((err) => {
            console.log(err)
        })
    })
    router.get('/products', (req, res) => {
        models.products.findAll({
            attributes: ['id', 'sku', 'attr_id']
        }).then((data) => {
            res.send(data);
        }).catch((err) => {
            console.log(err)
        })
    })
    return router;
}

// class Checkout {
//     constructor(order){
//         this.order = order;
//     }
//
// }

module.exports = initRoute;
