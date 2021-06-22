const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  vaccinated: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  gender: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pet", petSchema);
