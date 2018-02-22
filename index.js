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
app.use("/logs", express.static("iisnode"));

// -----------------------------------------------------

var forge = require('node-forge');

// openssl enc -des3 -in input.txt -out input.enc
function encrypt(password, unencryptedData) {
  var input = unencryptedData;

  // 3DES key and IV sizes
  var keySize = 24;
  var ivSize = 8;

  // get derived bytes
  // Notes:
  // 1. If using an alternative hash (eg: "-md sha1") pass
  //   "forge.md.sha1.create()" as the final parameter.
  // 2. If using "-nosalt", set salt to null.
  var salt = forge.random.getBytesSync(8);
  // var md = forge.md.sha1.create(); // "-md sha1"
  var derivedBytes = forge.pbe.opensslDeriveBytes(
    password, salt, keySize + ivSize/*, md*/);
  var buffer = forge.util.createBuffer(derivedBytes);
  var key = buffer.getBytes(keySize);
  var iv = buffer.getBytes(ivSize);

  var cipher = forge.cipher.createCipher('3DES-CBC', key);
  cipher.start({iv: iv});
  cipher.update(forge.util.createBuffer(input, 'binary'));
  cipher.finish();

  var output = forge.util.createBuffer();

  // if using a salt, prepend this to the output:
  if(salt !== null) {
    output.putBytes('Salted__'); // (add to match openssl tool output)
    output.putBytes(salt);
  }
  output.putBuffer(cipher.output);

  return output.data;
}

// openssl enc -d -des3 -in input.enc -out input.dec.txt
function decrypt(password, encryptedData) {
  var input = encryptedData;

  // parse salt from input
  input = forge.util.createBuffer(input, 'binary');
  // skip "Salted__" (if known to be present)
  input.getBytes('Salted__'.length);
  // read 8-byte salt
  var salt = input.getBytes(8);

  // Note: if using "-nosalt", skip above parsing and use
  // var salt = null;

  // 3DES key and IV sizes
  var keySize = 24;
  var ivSize = 8;

  var derivedBytes = forge.pbe.opensslDeriveBytes(
    password, salt, keySize + ivSize);
  var buffer = forge.util.createBuffer(derivedBytes);
  var key = buffer.getBytes(keySize);
  var iv = buffer.getBytes(ivSize);

  var decipher = forge.cipher.createDecipher('3DES-CBC', key);
  decipher.start({iv: iv});
  decipher.update(input);
  var result = decipher.finish(); // check 'result' for true/false

  return decipher.output.data;
}

// -----------------------------------------------------

//Root Route
app.get("/", (req, res) => {
	res.render("temp");
});

//display iisnode log files
app.get("/logs", (req, res) => {
	res.sendFile('/logs/index.html');
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
	db.Asset.findAll( { include: [db.Device], individualHooks: true } ).then( (assets) => {

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
					individualHooks: true,
					attributes: [] // specify no column information to pull from the user_devices table
				}
			}]
		})
	.then( (devices) => {
		devices.forEach((device => {
			device.Users.forEach(user => {
				user.dataValues.username = decrypt('secretKey', user.dataValues.username);
			});
		}));
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
					attributes: [] // specify no column information to pull from the user_devices table
				},
			}],
		})
	.then( (user) => {
		res.render("usershow", {user : user} );
   		// res.send(JSON.stringify(user));
	})
	.catch(err => {
		res.send('Unable to connect to the database:', err)
	});
});

// Basic implimentation of Forge Encryption
app.get("/encryption/forge-basic", (req, res) => {
	res.render("examples/encryption-basic");
});

app.post("/encryption/forge-basic", (req, res) => {
	var encryptedData = encrypt('secretPass',req.body.secret);
	var decryptedData = decrypt('secretPass',encryptedData);
	res.render("examples/encryption-result", { unencryptedData:req.body.secret, encryptedData:encryptedData, decryptedData:decryptedData });
});

app.listen(process.env.PORT, function() {
	// console.log("Server started and listenting on port " + process.env.port); // "Causes log files to be created, must handle that differently"
	// db.sequelize.sync(); // "Causes the database to try and re-create the defined model tables."
});