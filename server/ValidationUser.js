var isIsraeliIdValid = require('israeli-id-validator');
var validator = require('validator');
var passwordValidator = require('password-validator');
var schema = new passwordValidator();

schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digits
    .has().not().spaces()                           // Should not have spaces

const validation = {   
 checkID : (req, res, next) => {
    if (req.body.userId == undefined) {
        res.status(500).send("userId undefined!")
        res.end()
    }
    else if (!isIsraeliIdValid(req.body.userId)) {
        res.status(500).send("invalid userId!")
        res.end()
    } else {
        return next();
    }
},
 checkPhone : (req, res, next) => {
    if (req.body.phone == undefined) {
        res.status(500).send("phone undefined!")
        res.end()
    }
    else if (!validator.isMobilePhone(req.body.phone)) {
        res.status(500).send("invalid phone!")
            .end()
    }
    else {
        return next();
    }
},
 checkPassword : (req, res, next) => {
    if (req.body.password == undefined) {
        res.status(500).send("password undefined!")
        res.end()
    }
    else if (!schema.validate(req.body.password)) {
        res.send("invalid Password! password must contain at least 8 character,\
most 100 character, 1 uppercase, 1 lowercase, 1 digit \
and should not have spaces.")
            .status(500)
            .end()
    } else {
        return next();
    }
},
checkConfirmPassword : (req, res, next) => {
    if (req.body.confirmPassword != req.body.password) {
        res.status(500).send("invalid confirm password!").end()
    } else {
        return next();
    }
},
 checkUserName : (req, res, next) => {
    if (req.body.userName == undefined) {
        res.status(500).send("userName undefined!")
        res.end()
    }
    else if (!validator.isAlpha(req.body.userName)) {
        res.send("invalid user name!")
        status(500).end()
    } else {
        return next();
    }
},
 checkFirstName : (req, res, next) => {
    if (req.body.firstName == undefined) {
        res.status(500).send("firstName undefined!")
        res.end()
    }
    else if (!validator.isAlpha(req.body.firstName)) {
        res.status(500).send("invalid first name!")
            .end()
    } else {
        return next();
    }
},
 checkLastName : (req, res, next) => {
    if (req.body.lastName == undefined) {
        res.status(500).send("lastName undefined!")
        res.end()
    }
    else if (!validator.isAlpha(req.body.lastName)) {
        res.status(500).send("invalid lastName!")
            .end()
    } else {
        return next();
    }
},

 checkEmail : (req, res, next) => {
    if (req.body.email == undefined) {
        res.status(500).send("email undefined!")
            .end()
    }
    else if (validator.isEmail(req.body.email)) {
        return next();

    } else {
        res.status(500).send("invalid email!")
            .end()
    }
},
 checkType : (req, res, next) => {
    if (req.body.type === undefined) {
        res.status(500).send("type undefined!")
        res.end()
    }
    else if (req.body.type === "client" || req.body.type === "manager") {
        return next();

    } else {
        res.status(500).send("type must be client/manager")
            .end()
    }
}
}
module.exports = validation