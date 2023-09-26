const bodyParser = require("body-parser");

const mongoose = require("mongoose");
var cors = require("cors");

// parse application/x-www-form-urlencoded

const express = require("express");
const Course = require("./models");

//Initialize express app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//Initialize the sever
app.listen(3000, () => {
  console.log("sever listening on port:3000");
});

// Connecting to DB
mongoose
  .connect("mongodb://localhost:27017/Courses", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

//retrieve all

app.get("/courses", async (req, res) => {
  try {
    const data = await Course.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Adding a User to AddressBook
app.post("/create", bodyParser.json(), async (req, res) => {
  let newCourse = new Course({
    title: req.body.title,
    description: req.body.description,
    instructor: req.body.instructor,
    videoUrl: req.body.videoUrl,
    price: req.body.price,
    duration: req.body.duration,
    ...(req.body.likes ? { likes: req.body.likes } : {}),
    ...(req.body.noOfStudents ? { noOfStudents: req.body.noOfStudents } : {}),
  });

  try {
    const dataToSave = await newCourse.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Reading a Uder from AddressBook
app.get("/course/:id", async (req, res) => {
  try {
    const data = await Course.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Updating the User
app.post("/course/update/:id", bodyParser.json(), async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Course.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Deleting the User from AddressBook
app.delete("/course/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Course.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
