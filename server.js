const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const CategoryService = require("./services/CategoryService");
const categoryService = new CategoryService("./data/categories.json");

//Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//API routes
app.use("/", require("./routes/index")({ categoryService }));

app.listen(PORT, () => {
  console.log(`Server started at PORT-> ${PORT}`);
});
