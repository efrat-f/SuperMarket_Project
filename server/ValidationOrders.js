const validation = {
    checkOrderId: (req, res, next) => {
        console.log("id");
        if (req.body.orderId == undefined) {
            res.status(500).send("orderId undefined!")
            res.end()
        } else
            return next();
    },
    checkAmount: (req, res, next) => {
        console.log("id");
        if (req.body.amount == undefined) {
            res.status(500).send("amount undefined!")
            res.end()
        } else
            return next();
    },
    checkProducts: (req, res, next) => {
        console.log("id");
        if (req.body.products != undefined) {
            res.status(500).send("can't append product, you must use appendProduct")
            res.end()
        } else
            return next();
    }
}

module.exports = validation;