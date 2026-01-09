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

        const existAdmin = ADMINS.find((a) => a.username === username);
        if (!existAdmin) {
            return res.status(404).json({
                error: "No user found!",
            });
        }

        const matchedAdmin = ADMINS.find(
            (a) => existAdmin && a.password === password
        );
        if (!matchedAdmin) {
            return res.status(400).json({
                error: "Incorrect password!",
            });
        }

        const token = Math.random().toString(32);

        setTimeout(() => {
            return res.status(200).json({
                message: "You just logined successfully!",
                token: token,
            });
        }, 1111);
    } catch (error) {
        console.log(error);
    }
};

exports.searchDomain = (req, res) => {
    try {
        const { body } = req;
        const { domain, domainZone, price } = body;

        if (!body)
            return res.status(400).json({
                error: "Body wasn't found!",
            });

        if (!domain || !domainZone) {
            return res.status(400).json({
                error: "domain and domainZone are required fields!",
            });
        }

        const newDomain = {
            name: domain,
            domainZone: domainZone,
            price: Math.floor(Math.random() * 100000),
        };

        setTimeout(() => {
            return res.status(200).json({
                message: `Domain name not found: ${domain}`,
                newDomain,
            });
        }, 4444);
    } catch (error) {
        console.log(error);
    }
};
