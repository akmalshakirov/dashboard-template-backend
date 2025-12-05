const router = require("express").Router();
const { getAdmins } = require("../controller/admin.controller.js");
const { loginController } = require("../controller/login.controller.js");

router.get("/admins", getAdmins);
router.post("/login", loginController);

module.exports = router;
