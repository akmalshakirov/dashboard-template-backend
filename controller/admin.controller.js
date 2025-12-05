const ADMINS = [
    {
        id: 1,
        username: "admin",
        password: "admin",
        role: "ADMIN",
    },
    {
        id: 2,
        username: "awd",
        password: "superadmin",
        role: "SUPERADMIN",
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
