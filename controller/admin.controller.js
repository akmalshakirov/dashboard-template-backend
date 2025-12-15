const { adminModel } = require("../models/admins.model");
const {
    adminCreateSchema,
    adminUpdateSchema,
} = require("../validator/admin.validator");
const { hash } = require("bcrypt");

exports.createAdmin = async (req, res) => {
    try {
        const { error, value } = adminCreateSchema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            const notAllowedErrors = error.details.filter(
                (d) => d.type === "object.unknown"
            );

            if (notAllowedErrors.length > 0) {
                return res.status(400).json({
                    error: "You've sent wrong information!",
                });
            }

            return res.status(400).json({
                error: error.message,
            });
        }

        const existUsername = await adminModel.findOne({
            username: value.username,
        });

        if (existUsername) {
            return res.status(400).json({
                error: "This username is already taken!",
            });
        }

        const hashPassword = await hash(value.password, 10);

        const admin = await adminModel.create({
            name: value.name,
            username: value.username,
            role: value.role,
            password: hashPassword,
        });

        return res.status(201).json({
            message: "Admin created successfully!",
            admin,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find();

        if (admins.length === 0 || !admins) {
            return res.status(404).json({
                error: "Admins not found!",
            });
        }

        return res.status(200).json({
            admins,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getOneAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                error: "Id is invalid!",
            });
        }

        const admin = await adminModel.findById(id, {
            password: false,
        });

        if (!admin) {
            return res.status(404).json({
                error: "No admin with this ID was found!",
            });
        }

        return res.status(200).json({ admin });
    } catch (error) {
        console.log(error);
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                error: "Id is invalid!",
            });
        }

        const admin = await adminModel.findById(id);

        if (!admin) {
            return res.status(404).json({
                error: "Admin not found!",
            });
        }

        const { error, value } = adminUpdateSchema.validate(body, {
            abortEarly: false,
        });

        if (error) {
            const notAllowedErrors = error.details.filter(
                (d) => d.type === "object.unknown"
            );

            if (notAllowedErrors.length > 0) {
                return res.status(400).json({
                    error: "You've sent wrong information!",
                });
            }

            return res.status(400).json({
                error: error.message,
            });
        }

        let updatedAdmin = {
            name: value.name,
            username: value.username,
            role: value.role,
        };

        if (value.password) {
            updatedAdmin.password = await hash(value.password, 10);
        }

        await adminModel.findByIdAndUpdate(id, updatedAdmin);

        return res.status(200).json({
            message: "Admin updated successfully!",
        });
    } catch (error) {
        console.log(error);
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                error: "Id is invalid!",
            });
        }

        const admin = await adminModel.findById(id);

        if (!admin) {
            return res.status(404).json({
                error: "Admin not found!",
            });
        }

        await adminModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Admin deleted successfully!",
        });
    } catch (error) {
        console.log(error);
    }
};
