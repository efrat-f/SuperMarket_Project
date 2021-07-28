const validation = {
    checkProductId: (req, res, next) => {
        if (req.body.productId == undefined) {
            res.status(500).send("productId undefined!")
            res.end()
        } else
            return next();
    },
    checkProductPrice: (req, res, next) => {
        if (req.body.price == undefined) {
            res.status(500).send("price undefined!")
            res.end()
        } else
            return next();
    },
    checkProductName: (req, res, next) => {
        if (req.body.name == undefined) {
            res.status(500).send("name undefined!")
            res.end()
        } else
            return next();
    }
}

module.exports = validation;