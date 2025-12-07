const router = require("express").Router();
const {
    getAdmins,
    getOneAdmin,
    updateAdmin,
    createAdmin,
} = require("../controller/admin.controller");
const { loginController } = require("../controller/login.controller");

router.get("/admins", getAdmins);
router.post("/create-admin", createAdmin);
router.get("/admin/:id", getOneAdmin);
router.put("/admin/:id", updateAdmin);
router.post("/login", loginController);

module.exports = router;
