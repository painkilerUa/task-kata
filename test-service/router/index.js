"use strict";
const router = require('express').Router();
const models = require('../models');
const fs = require('fs');

function initRoute(){
    router.get('/', (req, res) => {
        fs.readFile('./test-service/public/index.html', (err, data) => {
            if (err){
                console.log(err)
                res.status(501).send('Error 501')
            }
            res.end(data)
        });

    })

    router.post('/order', (req, res) => {
        models.sales.findAll({
            attributes: ['sku', 'value', 'full_price', 'free_item_sku']
        }).then((data) => {
            models.products.findAll({
                attributes: ['id', 'sku', 'price', 'attr_id']
            }).then((products) => {
                let order = {};
                for(let item of req.body){
                    let sku = item.sku;
                    if(order[sku]){
                        if(order[sku].weight){
                            order[sku].weight += item.weight;
                            continue;
                        }
                        order[sku].value ++;
                    }else{
                        order[sku]= {
                            value: 1,
                            attr_id: item.attr_id,
                            weight: item.weight ? item.weight : null
                        }
                    }
                }

                for(let sale of data){
                    let sku = sale.sku;
                    if(!order[sku]) continue;
                    let pakage = Math.floor(order[sku]['value'] / sale.value)
                    order[sku]['count'] = order[sku]['value'] - pakage * sale.value;
                    order[sku]['total_price'] = pakage * sale.full_price;
                    order[sku]['free_item_sku'] = order[sku]['value'] >= sale.value ? sale.free_item_sku : null

                }

                for(let product of products){
                    let sku = product.sku;
                    if(!order[sku]) continue;
                    if(order[sku]['weight']){
                        order[sku]['total_price'] = Math.round(order[sku]['weight'] * product.price)/1000
                        continue;
                    }
                    if(order[sku]['count'] !== undefined){
                        order[sku]['total_price'] += order[sku]['count'] * product.price;
                    }else{
                        order[sku]['total_price'] = order[sku]['value'] * product.price;
                    }
                }
                res.send(order)
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


module.exports = initRoute;
