const mongoose = require("mongoose");
const { dbURL } = require("../config/config");

function Connect() {
    mongoose
        .connect(dbURL)
        .then(() => console.log("DB CONNECTED"))
        .catch((error) => console.log(error));
}

module.exports = Connect;
