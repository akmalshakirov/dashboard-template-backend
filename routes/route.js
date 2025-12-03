const express = require("express");
const { getFunc, rootEndPoint } = require("../controller/login.controller.js");
const router = express.Router();

router.get("/", rootEndPoint);
router.post("/post", getFunc);

module.exports = router;
