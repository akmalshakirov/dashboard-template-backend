const express = require("express");
const app = express();
const routes = require("./routes/route");

app.use(express.json());
app.use("/", routes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running port at ${PORT}`);
});
