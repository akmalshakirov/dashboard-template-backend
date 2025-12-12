const { adminModel } = require("../models/admins.model");
const { adminCreateSchema } = require("../validator/admin.validator");
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

// exports.getAdmins = (req, res) => {
//     try {
//         if (ADMINS.length === 0) {
//             return res.status(404).json({
//                 error: "Admins not found!",
//             });
//         }

//         setTimeout(() => {
//             return res.status(200).json({
//                 admins: ADMINS,
//             });
//         }, 1111);
//     } catch (error) {
//         console.log(error);
//     }
// };

exports.getOneAdmin = (req, res) => {
    try {
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                error: "Id is invalid!",
            });
        }

        if (ADMINS.length === 0) {
            return res.status(404).json({
                error: "Admins not found!",
            });
        }

        const admin = ADMINS.find((a) => a.id == id);

        if (!admin) {
            return res.status(404).json({
                error: "No admin with this ID was found!",
            });
        }

        setTimeout(() => {
            return res.status(200).json({ admin });
        }, 1111);
    } catch (error) {
        console.log(error);
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params;
        console.log(id, "id \n\n\n\n\n");

        if (typeof id !== "string") {
            return res.status(400).json({
                error: "Id is invalid!",
            });
        }

        const admin = ADMINS.find((a) => a.id == id);

        admin.username = await body.username;
        admin.name = await body.name;
        admin.password = await body.password;
        admin.role = await body.role;

        console.log(admin, "updated ADMIN FJIOFJJFRIJ \n\n\n\n\n");

        setTimeout(() => {
            return res.status(200).json({
                message: "Admin updated successfully!",
            });
        }, 1111);
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

        const admin = ADMINS.find((a) => a.id == id);

        if (!admin) {
            return res.status(404).json({
                error: "Admin not found!",
            });
        }

        ADMINS.splice(id - 1, 1);

        console.log(admin.id, "deleted admin");

        setTimeout(() => {
            return res.status(200).json({
                message: "Admin deleted successfully!",
            });
        }, 1111);
    } catch (error) {
        console.log(error);
    }
};
