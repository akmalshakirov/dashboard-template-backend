exports.rootEndPoint = async (req, res) => {
    try {
        const body = req.headers;
        return res.status(200).json({ message: body });
    } catch (error) {
        console.log(error);
    }
};

exports.getFunc = async (req, res) => {
    try {
        const body = req.body;
        return res.status(200).json({ message: body });
    } catch (error) {
        console.log(error);
    }
};
