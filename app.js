require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const indexRouter = require("./routes/index");
const bodyParser = require("body-parser");

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Body-parser för att läsa POST-data
app.use(bodyParser.urlencoded({ extended: true }));

// Använd router
app.use("/", indexRouter);
app.use("/add", indexRouter);

// Starta servern
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
