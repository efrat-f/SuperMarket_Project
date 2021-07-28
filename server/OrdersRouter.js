'use strict';
var express = require('express');
var router = express.Router();
var token = require('./Token');
var validation = require('./ValidationOrders.js');
var ordersFunc = require('./OrdersFunc');

const uri = 'mongodb+srv://shop:0000@cluster0.rxqa7.mongodb.net/shop?retryWrites=true&w=majority'
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(uri, { useUnifiedTopology: true }).then(client => {
    const db = client.db('shop')
    const ordersCollection = db.collection('orders')
    const usersCollection = db.collection('users')
    const productsCollection = db.collection('products')

    const checkProduct = (req, res, next) => {
        productsCollection.find({productId: req.body.productId})
            .toArray()
            .then((item) => {
                if (item.length > 0) {
                    next()
                } else {
                    res.send({err: "product not found"}).status(500).end()
                }
            })
    }

    router.post('/getOrder', [token.checkToken, validation.checkOrderId], (req, res) => {
        usersCollection.find({ token: req.headers['token'] }).toArray().then((user) => {
            if (user.length > 0) {     
                ordersCollection.find({ userId: user[0].userId }, { orderId: req.body.orderId })
                    .toArray()
                    .then((item) => {
                        if (item.length > 0) {
                            res.send(item[0]).end()
                        } else {
                            res.send({err: "order not found"}).status(500).end()
                        }
                    })
            } else res.send({err: "token ilegal"}).status(500).end()
        })
    });
    router.post('/', [token.checkToken, validation.checkOrderId, validation.checkProducts], (req, res) => {
        usersCollection.find({ token: req.headers['token'] }).toArray().then((user) => {
            if (user.length > 0) {
                ordersCollection.updateOne({ "orderId": req.body.orderId, "userId": user[0].userId }, { $setOnInsert: { ...req.body,...{products:[]}, ...{ userId: user[0].userId }, ... { date: new Date() } } }, { upsert: true })
                    .then(message=>{
                        if(message.upsertedCount>0){
                            res.send({err: "sucsess insert"}).end()
                        }
                        else res.send({err:"order already exist"})})
            } else res.send({err: "token ilegal"}).status(500).end()
        });
    })
    router.put('/setAmountProduct', [token.checkToken, checkProduct, validation.checkOrderId, validation.checkAmount], (req, res) => {
        usersCollection.find({ token: req.headers['token'] }).toArray().then((user) => {
            if (user.length > 0) {
                ordersCollection.updateOne({ orderId: req.body.orderId, userId: user[0].userId, "products.productId": req.body.productId },
                 { $set: { ... { date: new Date() }, ...{ "products.$.amount": req.body.amount } } })
                .then((item)=>{
                    if(item.result.nModified <=0){
                        ordersCollection.updateOne({ orderId: req.body.orderId, userId: user[0].userId }, { $addToSet: { products: { productId: req.body.productId, amount: req.body.amount } }, $set: { ... { date: new Date() } } })
                    }
                    res.send({err: "sucsess update"}).end()
                })
            } else res.send({err: "token ilegal"}).status(400).end()
        });
    });
    router.delete('/removeProduct', [token.checkToken, checkProduct, validation.checkOrderId], (req, res) => {
        usersCollection.find({ token: req.headers['token'] }).toArray().then((user) => {
            if (user.length > 0) {
                ordersCollection.updateOne({ orderId: req.body.orderId, userId: user[0].userId }
                    , { $pull: { products: { productId: req.body.productId } }, $set: { ... { date: new Date() } } }, { multi: true })
                    .then(()=>{
                        res.send({err: "remove sucsess"}).end()
                    })
            } else res.send({err: "token ilegal"}).status(400).end()
        });

    });
    router.delete('/', [token.checkToken, validation.checkOrderId], (req, res) => {
        usersCollection.find({ token: req.headers['token'] }).toArray().then((user) => {
            if (user.length > 0) {
                ordersCollection.deleteOne({ "orderId": req.body.orderId, "userId": user[0].userId })
                    .then(res.send({err: "sucsess remove"}).end())
            } else res.send({err: "token ilegal"}).status(500).end()
        });
    });
})

module.exports = router;

