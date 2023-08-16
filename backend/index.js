//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const redis = require("redis");
const app = express();
const cloudinary = require("cloudinary").v2;
var jwt = require("jsonwebtoken");
const jwtkey = process.env.JWT_KEY;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.use(express.json({ limit: "50mb" }));

app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true,
  })
);

app.use(express.json());

const Port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
  image: String,
  firstname: String,
  lastname: String,
  username: String,
  phone: String,
  bio: String,
  password: String,
  skills: Array,
  certification: Array,
  experience: Array,
  education: Array,
});

const User = mongoose.model("User", userSchema);

const connectionSchema = new mongoose.Schema(
  {
    username: String,
    connection: Array,
    removed: Array,
  },
  { collection: "connection" }
);

const Connection = mongoose.model("Connection", connectionSchema);

//redis connection
// let redisClient;
// const redisConfig = {
//   host: "localhost",
//   port: "8080",
//   pass: "",
// };

// (async () => {
//   redisClient = redis.createClient(redisConfig);

//   redisClient.on("error", (error) => console.error(`Error : ${error}`));

//   await redisClient.connect();
// })();

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get("/connection", verifyToken, (req, res) => {
  Connection.find()
    .then((data) => {
      res.send({ result: data, alert: true });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/dashboard", verifyToken, (req, res) => {
  // redisClient.get("dashboardUser").then((data) => {
  //   if (data) {
  //     res.send({ alert: true, result: JSON.parse(data), message: "user data" });
  //   } else {
  //   }
  // });
  const token = req.headers["authorization"];
  const decode = jwt.decode(token);

  User.find({ username: decode.username })
    .then((data) => {
      res.send({ result: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        res.send("Session Expired login Again");
      } else {
        next();
      }
    });
  } else {
    res.send("Add token with header");
  }
}

app.patch("/editEduData", verifyToken, (req, res) => {
  const field = req.body.field;
  const updates = req.body.education;

  User.updateOne(
    { _id: req.body._id, "education.id": req.body.education.id },
    { $set: { "education.$": updates } }
  ).then((response) => {
    res.send({ message: "Profile Updated", alert: true });
  });
});

app.patch("/deleteEduData", verifyToken, (req, res) => {
  const field = req.body.field;
  const updates = req.body.education;
  
  User.updateOne({ _id: req.body._id }, { $pull: { education: updates } }).then(
    (response) => {
      res.send({ message: "Profile Updated", alert: true });
    }
  );
});

app.patch("/deleteskillData", verifyToken, (req, res) => {
  const field = req.body.field;
  const updates = req.body.skills;
 
  User.updateOne({ _id: req.body._id }, { $pull: { skills: updates } }).then(
    (response) => {
      res.send({ message: "Profile Updated", alert: true });
    }
  );
});

app.patch("/editExpData", verifyToken, (req, res) => {
  const field = req.body.field;
  const updates = req.body.experience;

  User.updateOne(
    { _id: req.body._id, "experience.id": req.body.experience.id },
    { $set: { "experience.$": updates } }
  ).then((response) => {
    res.send({ message: "Profile Updated", alert: true });
  });
});

app.patch("/deleteExpData", verifyToken, (req, res) => {
  const field = req.body.field;
  const updates = req.body.experience;
 
  User.updateOne(
    { _id: req.body._id },
    { $pull: { experience: updates } }
  ).then((response) => {
    res.send({ message: "Profile Updated", alert: true });
  });
});
app.patch("/deleteCertiData", verifyToken, (req, res) => {
  const field = req.body.field;
  const updates = req.body.certification;
  
  User.updateOne(
    { _id: req.body._id },
    { $pull: { certification: updates } }
  ).then((response) => {
    res.send({ message: "Profile Updated", alert: true });
  });
});

app.patch("/editCertiData", verifyToken, (req, res) => {
  const field = req.body.field;
  const updates = req.body.certification;

  User.updateOne(
    { _id: req.body._id, "certification.id": req.body.certification.id },
    { $set: { "certification.$": updates } }
  ).then((response) => {
    res.send({ message: "Profile Updated", alert: true });
  });
});

app.patch("/connectionDelete", verifyToken, (req, res) => {
  const updates = req.body.user;
  
  Connection.updateOne(
    { _id: req.body._id },
    { $pull: { connection: updates } }
  )
    .then(() => {
      Connection.updateOne(
        { _id: req.body._id },
        { $push: { removed: updates } }
      )
        .then(() => {
          res.send({ message: "Connection Removed", alert: true });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.patch("/connectionData", verifyToken, (req, res) => {
  const updates = req.body.user;
 
  Connection.updateOne(
    { _id: req.body._id },
    { $push: { connection: updates } }
  )
    .then(() => {
      Connection.updateOne(
        { _id: req.body._id },
        { $pull: { removed: updates } }
      )
        .then(() => {
          res.send({ message: "Connection Added", alert: true });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.patch("/profileData", verifyToken, (req, res) => {
  const updates = req.body;
 
  User.updateOne({ _id: req.body._id }, { $set: updates }).then((response) => {
    res.send({ message: "Profile Updated", alert: true });
  });
});

app.patch("/profileImg", verifyToken, (req, res) => {
  const updates = req.body;
  const img = req.body.image;
  cloudinary.uploader
    .upload(img, {
      public_id: "dashboardUser",
      overwrite: true,
      faces: true,
      folder: "dashboardUser",
    })
    .then((result) => {
      User.updateOne({ _id: req.body._id }, { $set: { image: result.url } })
        .then((response) => {
          User.findOne({ _id: req.body._id}).then((result) => {
          
            res.send({
              message: "Profile Updated",
              alert: true,
              result: result,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

 
});

app.post("/register", (req, res) => {

  const { image, email, password, firstname, lastname } = req.body;
  const strfirst = firstname;
  const firstNamecapital = strfirst.charAt(0);
  const strlast = lastname;
  const lastNamecapital = strlast.charAt(0);

  User.findOne({ username: email }).then((data) => {
    if (data == null) {
      cloudinary.uploader
        .upload(image, {
          public_id: "dashboardUser",
          overwrite: true,
          faces: true,
          folder: "dashboardUser",
        })
        .then((result) => {
         
          const hash = bcrypt.hashSync(password, saltRounds);
          const newUser = new User({
            firstname: firstNamecapital,
            lastname: lastNamecapital,
            username: email,
            phone: req.body.phone,
            bio: req.body.bio,
            password: hash,
            image: result.url,
          });
          newUser.save().then(() => {
            res.send({ message: "Succefully Sign Up", alert: true });
          });
        });
    } else {
      res.send({ message: "User Alredy exits", alert: false });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ username: email }).then((data) => {
    if (!data) {
      res.send({ message: "User not registered" });
    } else {
      bcrypt.compare(password, data.password, async (err, result) => {
        if (result) {
          const dataSend = {
            id: data._id,
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            phone: data.phone,
            bio: data.bio,
            image: data.image,
          };
          const token = jwt.sign(dataSend, jwtkey);
         
          res.send({
            message: "Logged In successfully",
            alert: true,
            result: token,
          });

          //
        } else {
          res.send({ message: "password does not match" });
        }
      });
    }
  });
});

app.listen(Port, () => {
  console.log("Server running on port 8080");
});
