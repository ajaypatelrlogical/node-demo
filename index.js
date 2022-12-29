const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("errorhandler");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const auth = require("./middleware/auth.js")();

const User = require("./models/User");

//Initiate .env
dotenv.config();

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

//Configure Mongoose
mongoose.connect(process.env.DB_CONNECT_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("debug", true);

const con = mongoose.connection;
con.on("open", () => {
  console.log("db connected!");
});

//Initiate our app
const app = express();

//Support JSON
app.use(express.json());

//Configure our app
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.initialize());

// Passport Config
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(
  session({
    secret: process.env.API_AUTH_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Import Routes
const authRoute = require("./routes/auth");
const productRouter = require("./routes/product");

// Call Route Middlewares
app.use("/api", authRoute);
app.use("/api/products", productRouter);

if (!isProduction) {
  app.use(errorHandler());
}

app.listen(8000, () => console.log("Server running on http://localhost:8000/"));
