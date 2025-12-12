const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    password: String,
    role: String,
});

exports.adminModel = mongoose.model("admins", adminSchema);
