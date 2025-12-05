const router = require("express").Router();
const { loginController } = require("../controller/login.controller.js");

router.post("/login", loginController);
router.get("/admins", loginController);

module.exports = router;
