const uri = 'mongodb+srv://shop:0000@cluster0.rxqa7.mongodb.net/shop?retryWrites=true&w=majority'
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(uri, { useUnifiedTopology: true }).then(client => {
    const db = client.db('shop')
    const usersCollection = db.collection('users')
    module.exports.checkManager = (req, res, next) => {
        usersCollection.find({ token: req.headers['token'] }).toArray()
            .then((user) => {
                if (user.length > 0) {
                    if (user[0].type !== 'manager') {
                        res.send('only manager can do it').end()
                    } else
                        return next()
                } else res.send('token ilegal').end()
            })
    }
})
