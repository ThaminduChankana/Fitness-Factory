const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use("*", cors());

app.get("/", (req, res) => {
	res.send("API is Running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));
