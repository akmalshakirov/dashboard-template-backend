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

exports.loginController = async (req, res) => {
    try {
        const body = req.body;
        const { username, password } = body;

        if (username === "" || password === "") {
            return res.status(400).json({
                error: "All fields must be filled!",
            });
        }

        const existAdmin = ADMINS.find(
            (a) => a.username === username && a.password === password
        );

        if (!existAdmin) {
            return res.status(400).json({
                error: "No user found!",
            });
        }

        return res
            .status(200)
            .json({ message: "You're logined successfully!" });
    } catch (error) {
        console.log(error);
    }
};
