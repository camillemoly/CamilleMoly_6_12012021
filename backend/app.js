const express = require("express"); 
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express(); // create application express
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
const path = require("path");

// connect app to database
mongoose.connect("mongodb+srv://sopekocko:awuUApk2UIjKFyZu@sopekocko.wmof7.mongodb.net/SoPekocko?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// General middleware => add headers on response object : access origin to everybody, give authorization to use some headers
// and allow specifics methods
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
  });

app.use(bodyParser.json()); // transform request body in JSON

app.use("/images", express.static(path.join(__dirname, "images"))); // for requests to "/images", serves the static folder "images"
app.use("/api/sauces", saucesRoutes); // save router for all requests made to "/api/sauces"
app.use("/api/auth", userRoutes);

module.exports = app; // export app to access it from others files