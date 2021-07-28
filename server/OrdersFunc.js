const uri = 'mongodb+srv://shop:0000@cluster0.rxqa7.mongodb.net/shop?retryWrites=true&w=majority'
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(uri, { useUnifiedTopology: true }).then(client => {
    const db = client.db('shop')
    const ordersCollection = db.collection('orders');
    const productsCollection = db.collection('products')
    module.exports.calcTotalPrice = (orderId, userId) => {
        let totalPrice = 0;
        ordersCollection.updateOne({orderId:orderId, userId: userId},{$set:{totalPrice:totalPrice}})
        ordersCollection.aggregate([
            { $unwind: "$products" },
            { $match: { orderId: orderId, userId: userId } }
        ]).toArray().then((orders => {
            let amount;
            let price = 0;
            orders.map((order) => {
                productsCollection.find({ productId: order.products.productId }).toArray().then(
                    (products) => {
                        amount = order.products.amount
                        price = products[0].price;
                        totalPrice += amount * price
                        ordersCollection.updateOne({orderId:orderId, userId: userId},{$set:{totalPrice:totalPrice}})
                    }
                );
            })
        }))
        return totalPrice;
    }
})
