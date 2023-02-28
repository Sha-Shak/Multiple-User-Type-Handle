const express = require("express");
const mongoose = require("mongoose");
const User = require("./db");

const uri =
  "mongodb+srv://akram123:test123@cluster0.obt6fow.mongodb.net/FlyAway?retryWrites=true&w=majority";
const router = express.Router();

const app = express();

app.use(express.json());
app.use(router);

router.post("/users", async (req, res) => {
  const { name, age, email, password, userType } = req.body;

  try {
    let user;
    switch (userType) {
      case "Lawyer":
        user = new User.Lawyer({
          name,
          age,
          email,
          password,
          userType,
          licenseNo: req.body.licenseNo,
        });
        break;
      default:
        user = new User({ name, age, email, password, userType });
    }

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

(async function bootstrap() {
  try {
    await mongoose.connect(uri);
    console.log("Database Connected");
    app.listen(3333, () => {
      console.log(`Server running on 3333`);
    });
  } catch (error) {
    console.log(error);
  }
})();
