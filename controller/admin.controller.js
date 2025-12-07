let ADMINS = [
    {
        id: 1,
        username: "admin",
        password: "admin",
        role: "ADMIN",
        name: "admin",
    },
    {
        id: 2,
        username: "awd",
        password: "superadmin",
        role: "SUPERADMIN",
        name: "Hasker",
    },
    {
        id: 3,
        username: "test",
        password: "test12",
        role: "ADMIN",
        name: "test",
    },
];

exports.getAdmins = (req, res) => {
    try {
        if (ADMINS.length === 0) {
            return res.status(404).json({
                error: "Admins not found!",
            });
        }

        setTimeout(() => {
            return res.status(200).json({
                admins: ADMINS,
            });
        }, 1111);
    } catch (error) {
        console.log(error);
    }
};

exports.getOneAdmin = (req, res) => {
    try {
        const { id } = req.params;

        if (typeof id !== "string" || isNaN(id)) {
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

        if (typeof id !== "string" || isNaN(id)) {
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

        return res.status(200).json({
            message: "Admin updated successfully!",
        });
    } catch (error) {
        console.log(error);
    }
};
