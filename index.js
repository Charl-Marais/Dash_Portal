const 	express 		= require("express");
		app				= express(),
		bodyParser		= require("body-parser"),
		methodOverride	= require("method-override");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

//Include Admin-LTE static requirements
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use("/font-awesome", express.static("node_modules/font-awesome"));
app.use("/ionicons", express.static("node_modules/ionicons/dist"));
app.use("/admin-lte", express.static("node_modules/admin-lte/dist"));
app.use("/jquery", express.static("node_modules/jquery/dist"));


app.get("/", function (req, res) {
	res.render("home");
});

app.listen(process.env.PORT, function() {
	console.log("Server started and listenting on port " + process.env.port);
});