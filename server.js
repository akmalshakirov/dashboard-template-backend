const express = require("express");
const app = express();
const routes = require("./routes/route");
const cors = require("cors");
const connect = require("./db/connect");

connect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running port at ${PORT}`);
});
