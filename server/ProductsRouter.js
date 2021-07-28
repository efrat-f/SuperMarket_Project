'use strict';
var express = require('express');
var token = require('./Token.js');
var validationToken = require('./ValidationToken.js');
var validation = require('./ValidationProduct.js');
var ordersFunc = require('./OrdersFunc');

var router = express.Router();

const uri = 'mongodb+srv://shop:0000@cluster0.rxqa7.mongodb.net/shop?retryWrites=true&w=majority'
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(uri, { useUnifiedTopology: true }).then(client => {
    const db = client.db('shop')
    const productsCollection = db.collection('products')
    const ordersCollection = db.collection('orders')

    router.get('/', [validation.checkProductId], (req, res) => {
        productsCollection.find({ "productId": req.body.productId })
            .toArray()
            .then((item) => {
                if (item.length > 0) {
                    res.send(item[0]).end()
                } else {
                    res.send({err: "products not found"}).status(500).end()
                }
            })
    })
    .post('/allProducts',  (req, res) => {
        productsCollection.find({})
            .toArray()
            .then((item) => {
                    res.send(item).end();
            })
            .catch((err)=>{
                res.status(500).send({err:err});
            })
    })
    .post('/category', (req, res) => {
        productsCollection.find({categories: req.body.category})
            .toArray()
            .then((item) => {
                    res.send(item).end();
            })
            .catch((err)=>{
                res.status(500).send({err:err});
            })
    })
})

module.exports = router;