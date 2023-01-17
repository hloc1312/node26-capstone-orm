const express = require("express");
require("dotenv").config();

const cors = require("cors");
const { sequelize } = require("./models");
const v1 = require("./routes");
const { handleError } = require("./middlewares/handle_error");
const app = express();

// Sync các model của sequelize với DB
sequelize.sync({ alter: true });

// expres cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// parse body
app.use(express.json());

// Convert array to json
app.use(express.urlencoded({ extended: true }));

// middleware routes
app.use("/api/v1", v1);

// middleware handle error
app.use(handleError);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
