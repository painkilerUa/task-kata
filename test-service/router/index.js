"use strict";
const router = require('express').Router();
const models = require('../models');

function initRoute(){
    router.get('/', (req, res) => {
        res.send('Ok')
})
    router.post('/order', (req, res) => {
        models.sales.findAll({
            attributes: ['sku', 'value', 'full_price', 'free_item_sku']
        }).then((data) => {
            models.products.findAll({
                attributes: ['id', 'sku', 'price', 'attr_id']
            }).then((products) => {
                let obj = {};
                for(let item of req.body){
                    let sku = item.sku;
                    if(obj[sku]){
                        if(obj[sku].weight){
                            obj[sku].weight += item.weight;
                            continue;
                        }
                        obj[sku].value ++;
                    }else{
                        obj[sku]= {
                            value: 1,
                            attr_id: item.attr_id,
                            weight: item.weight ? item.weight : null
                        }
                    }
                }
                for(let sale of data){
                    let sku = sale.sku;
                    if(!obj[sku]) continue;
                    let pakage = Math.floor(obj[sku]['value'] / sale.value)
                    obj[sku]['count'] = obj[sku]['value'] - pakage * sale.value;
                    obj[sku]['total_price'] = pakage * sale.full_price;
                    obj[sku]['free_item_sku'] = sale['free_item_sku']

                }

                for(let product of products){
                    let sku = product.sku;
                    if(!obj[sku]) continue;
                    if(obj[sku]['weight']){
                        obj[sku]['total_price'] = Math.round(obj[sku]['weight'] * product.price)/1000
                        continue;
                    }
                    if(obj[sku]['count'] !== undefined){
                        obj[sku]['total_price'] += obj[sku]['count'] * product.price;
                    }else{
                        obj[sku]['total_price'] = obj[sku]['value'] * product.price;
                    }
                }
                res.send(obj)
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
