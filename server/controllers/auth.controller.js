const bcrypt = require("bcrypt");
const user = require("../models/user.model");

module.exports.getFrontPage = (req, res, next) => {
    res.sendFile('D:/Rahul-Workspace/Aipxperts/index.html');
}

module.exports.register = (req, res, next) => {
    let body = req.body;
    if (body && body.name && body.email && body.password) {

        const saltRounds = 10;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hashPassword = bcrypt.hashSync(body.password, salt);
        let newUser = new User({
            "name": body.name,
            "email": body.email,
            "password": hashPassword,
        });
        user.create(newUser).then(user => {
            res.status(200).json(user);
        }).catch(error => {
            res.status(500).json({ "message": 'Error while registering a user', 'error': error });
        })
    }
}

module.exports.login = (req, res, next) => {
    if (req.query.userName) {
        user.find({ where: { name: req.query.userName } }).then(userObj => {
            if (bcrypt.compareSync(req.query.userName, userObj.password)) {
                res.status(200).json(userObj);
            }
            else {
                res.status(500).json({ 'message': 'Incorrect password' });
            }
        }).catch(error => {
            res.status(500).json({ 'message': 'User not found', 'error': error });
        })
    }
}