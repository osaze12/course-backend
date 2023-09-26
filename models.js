const mongoose = require("mongoose");

// Schema for AddressBook
const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  videoUrl: { type: String, required: true },
  price: { type: String, required: true },
  duration: { type: String, required: true },
  likes: { type: String, required: false },
  noOfStudents: { type: String, required: false },
});

//Creating the collection Course
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
