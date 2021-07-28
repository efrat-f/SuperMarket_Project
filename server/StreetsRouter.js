'use strict';
var express = require('express');
var router = express.Router();

const uri = 'mongodb+srv://shop:0000@cluster0.rxqa7.mongodb.net/shop?retryWrites=true&w=majority'
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(uri, { useUnifiedTopology: true }).then(client => {
    const db = client.db('shop')
    const streetsCollection = db.collection('streets')

    router.get('/', [], (req, res) => {
        streetsCollection.find({}).toArray()
        .then((item)=>{
            res.send(item).end();
        }
        ).catch((err)=>{
            res.status(500).send({err: err});
        })
    });
});


module.exports = router ;
