'use strict';
var express = require('express');
var router = express.Router();
var validation = require('./ValidationUser.js')
var token = require('./Token.js')
var validationToken = require('./ValidationToken.js')


const uri = 'mongodb+srv://shop:0000@cluster0.rxqa7.mongodb.net/shop?retryWrites=true&w=majority'
const MongoClient = require("mongodb").MongoClient;
const email = require('./Email.js');
MongoClient.connect(uri, { useUnifiedTopology: true }).then(client => {
    const db = client.db('shop')
    const usersCollection = db.collection('users')
    const ordersCollection = db.collection('orders')

    router.get('/', [
        // token.checkToken,
        // validationToken.checkManager
    ], (req, res) => {
        usersCollection.find({ "userId": req.body.userId }).toArray().then((user)=>
            {if(user.length>0){
                res.send(user[0])
            }
        else res.send("user does not exist")}
        )
    })
        .post('/', [
            validation.checkID,
            /* validation.checkUserName, */
            validation.checkEmail,
            validation.checkPhone,
            validation.checkPassword,
            validation.checkConfirmPassword/* ,
            validation.checkType */
        ], (req, res) => {
            console.log("post")
            usersCollection.find({ userId: req.body.userId }).toArray()
                .then((item) => {
                    if (item.length > 0) {
                        res.send({err: "user exist!"}).end();
                    }
                    else {
                        const token1 = token.createToken(req);
                        usersCollection.insertOne({ ...{userId: req.body.userId},
                                                    ...{userName: req.body.userName},
                                                    ...{phone: req.body.phone},
                                                    ...{email: req.body.email},
                                                    ...{password: req.body.password},
                                                    ...{ token: token1 }
                                                })
                            .then(() => {
                                email.sendEmail(req.body.email);
                                res.send({token: token1});
                            })
                            .catch((err)=>{
                                res.status(500).json({err: err}).end();
                            })
                    }
                })

        })
    router.put('/', [
        validation.checkID,
        validation.checkUserName,
        validation.checkFirstName,
        validation.checkLastName,
        validation.checkEmail,
        validation.checkPhone,
        validation.checkPassword,
        validation.checkType/* ,
        token.checkToken */
    ], (req, res) => {
        usersCollection.find({ userId: req.body.userId }).toArray()
            .then((user) => {
                if (user.length > 0) {
                    usersCollection.find({ token: req.headers['token'] }).toArray()
                        .then((user) => {
                            if (user.length > 0) {
                                if (user[0].type === 'manager' || user[0].userId === req.body.userId) {
                                    usersCollection.updateOne({ "userId": req.body.userId }, { $set: req.body })
                                    res.end()
                                } else
                                    res.send('only manager users or the client himself can update registration information‏').end()
                            } else res.send('token ilegal').end()
                        })
                } else res.send('user does not exist').end()
            })
    })
        .post('/login', (req, res) => {
            usersCollection.find({ $and: [{ "userId": req.body.userId }, { "password": req.body.password }] })
                .toArray()
                .then((item) => {
                    if (item.length > 0) {
                        var token1 = token.createToken(req);
                        usersCollection.updateOne({ "userId": req.body.userId }, { $set: { token: token1 } })
                        .then(()=>{
                            res.send({token: token1, userName: item[0].userName}).end();
                        })
                        .catch((err)=>{
                            res.status(500).json({err: err}).end();
                        })
                    }
                    else {
                        res.status(300).send({err:"user doesn't exist!"}).end();
                    }
                })

        })
        .delete('/', /* [token.checkToken, validationToken.checkManager], */ (req, res) => {
            usersCollection.deleteOne({ userId: req.body.userId });
            ordersCollection.deleteMany({userId: req.body.userId});
            res.send("remove sucsses").end();
        })
        .post('/sendEmail', [token.checkToken], (req, res)=>{
            usersCollection.find({ token: req.headers['token'] }).toArray().then((user) => {
                if (user.length > 0) {     
                    email.sendEmail(user[0].email)
                    res.send({err: "success"})
                } else res.send({err: "token ilegal"}).status(500).end()
            })
            
        })
})

module.exports = router;