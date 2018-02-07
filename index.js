const 	express 		= require("express");
		app				= express(),
		bodyParser		= require("body-parser"),
		methodOverride	= require("method-override"),
		Sequelize  		= require("sequelize");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

// import user model into app
// database configs is imported by model
// const sequelize = require("./database/dbconfig");
// const User = require("./database/models/user.js");
var db = require('./database/models');

//Include Admin-LTE static requirements
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use("/font-awesome", express.static("node_modules/font-awesome"));
app.use("/ionicons", express.static("node_modules/ionicons/dist"));
app.use("/admin-lte", express.static("node_modules/admin-lte/dist"));
app.use("/jquery", express.static("node_modules/jquery/dist"));

//Root Route
app.get("/", (req, res) => {
	res.render("temp");
});

app.get("/template", (req, res) => {
	res.render("home");
});

app.get("/database/MySQL", (req, res) => {
	db.User.findAll().then( (users) => {
	  		res.render("users", {users: users} );
	  })
	  .catch(err => {
	   	res.send('Unable to connect to the database:', err);
	  });
});

app.listen(process.env.PORT, function() {
	console.log("Server started and listenting on port " + process.env.port);
	db.sequelize.sync();
});