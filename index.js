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

// display template file
app.get("/template", (req, res) => {
	res.render("home");
});

// retrive a single table
app.get("/database/MySQL", (req, res) => {
	db.User.findAll().then( (users) => {
	  		res.render("users", {users: users} );
	  })
	  .catch(err => {
	   	res.send('Unable to connect to the database:', err);
	  });
});

//find items that have a 1 to 1 relation
app.get("/database/MySQL/1t1", (req, res) => {
	db.Asset.findAll( { include: [db.Device] } ).then( (assets) => {
	  		res.render("assets", {assets: assets} );
	  		//res.send(JSON.stringify(assets));
	  })
	  .catch(err => {
	   	res.send('Unable to connect to the database:', err);
	  });
});

// Find items that have a 1 to many relation
app.get("/database/MySQL/1tn", (req, res) => {
	db.Device.findAll( { include: [db.Application] } ).then( (devices) => {
	 		res.render("devices", {devices : devices} );
	   		// res.send(JSON.stringify(devices));
	})
	.catch(err => {
		res.send('Unable to connect to the database:', err);
	});
});

// Find all items in a manay to many relation. Select certain columns from the table
app.get("/database/MySQL/ntn", (req, res) => {
	db.Device.findAll( 
		{ include: 
			[{
				model:db.User, 
				as: 'Users', 
				attributes: ['id','username'], 
				through: { 
					attributes: [] // specify no column information to pull from the user_devices table
				}
			}] 
		})
	.then( (devices) => {
 		res.render("mysqlntn", {devices : devices} );
   		// res.send(JSON.stringify(devices));
	})
	.catch(err => {
		res.send('Unable to connect to the database:', err);
	});
});

// Find item that a single item in a many to many relation table
app.get("/database/MySQL/user/:id", (req, res) => {
	db.User.findById(req.params.id,
		{ include:
			[{
				model:db.Device,
				as: 'Devices',
				attributes: ['id','serial','make','model'],
				through: {
					attributes: []
				}
			}]
		})
	.then( (user) => {
		res.render("usershow", {user : user} );
   		// res.send(JSON.stringify(user));
	})
	.catch(err => {
		res.send('Unable to connect to the database:', err)
	});
})

app.listen(process.env.PORT, function() {
	console.log("Server started and listenting on port " + process.env.port);
	db.sequelize.sync();
});