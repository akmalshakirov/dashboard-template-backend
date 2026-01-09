const router = require("express").Router();
const {
    getAdmins,
    getOneAdmin,
    updateAdmin,
    createAdmin,
    deleteAdmin,
} = require("../controller/admin.controller");
const {
    loginController,
    searchDomain,
} = require("../controller/login.controller");

router
    .get("/admins", getAdmins)
    .post("/create-admin", createAdmin)
    .delete("/delete-admin/:id", deleteAdmin)
    .get("/admin/:id", getOneAdmin)
    .put("/admin/:id", updateAdmin)
    .post("/login", loginController)
    .post("/domain", searchDomain);

module.exports = router;
