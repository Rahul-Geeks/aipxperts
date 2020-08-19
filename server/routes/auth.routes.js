const express = require("express");

let authCtrl = require("../controllers/auth.controller");

let router = express.Router();

router.route("/")
    .get(authCtrl.getFrontPage());

    
router.route("/create-user")
    .post(authCtrl.register());
    
router.route("/login-user")
    .get(authCtrl.login());

module.exports = router;