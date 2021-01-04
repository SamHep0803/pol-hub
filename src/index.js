const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const routes = require("./routes");
const usersModel = require("./models/users.model");
const passport = require("passport");

const app = express();

mongoose.connect(
	"mongodb://localhost:27017/polhub",
	{
		useFindAndModify: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			return console.log(err);
		} else {
			console.log("💾 MongoDB Database successfully connected.");

			app.listen(3000, () => {
				console.log("🚀 Express application running at http://localhost:3000");
			});
		}
	}
);

app.set("view engine", "ejs");

app.use(bodyParser.json());

app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: "nofurryshithere",
	})
);

app.use("/users", routes.users);

app.use(passport.initialize());
app.use(passport.session());

passport.use(usersModel.createStrategy());
passport.serializeUser(usersModel.serializeUser());
passport.deserializeUser(usersModel.deserializeUser());
