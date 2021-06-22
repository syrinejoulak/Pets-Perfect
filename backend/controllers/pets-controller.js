const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

const { v4: uuidv4 } = require("uuid");

const Pet = require("../models/pet");
const User = require("../models/user");

const mongoose = require("mongoose");

const getAllPets = async (req, res, next) => {
  let pets;
  try {
    pets = await Pet.find();
  } catch (err) {
    const error = new HttpError("Could not find pets", 404);
    return next(error);
  }

  res.json(pets);
};

const getPetById = async (req, res, next) => {
  const pid = req.params.pid;

  let pet;
  try {
    pet = await Pet.findById(pid);
  } catch (err) {
    const error = new HttpError("Could not find pet by id", 404);
    return next(error);
  }

  res.json({ pet: pet.toObject({ getters: true }) });
};

const createPetPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data", 422)
    );
  }
  const { name, image, type, breed, birthDate, vaccinated, userId, gender } =
    req.body;

  const createdPetPost = new Pet({
    name,
    image,
    type,
    breed,
    birthDate,
    vaccinated,
    userId,
    gender,
  });

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Creating new post failed, user id not found.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user with provided id.", 500);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPetPost.save({ session: sess });
    user.userPets.push(createdPetPost);
    await user.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating new post failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ pet: createdPetPost.toObject({ getters: true }) });
};

const updatePetPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data", 422)
    );
  }
  const { name, image, type, breed, birthDate, vaccinated, gender } = req.body;
  const pid = req.params.pid;

  let updatedPetPost;
  try {
    updatedPetPost = await Pet.findById(pid);
  } catch (err) {
    const error = new HttpError("Could not update pet post.", 500);
    return next(error);
  }

  updatedPetPost.name = name;
  updatedPetPost.image = image;
  updatedPetPost.type = type;
  updatedPetPost.breed = breed;
  updatedPetPost.birthDate = birthDate;
  updatedPetPost.vaccinated = vaccinated;
  updatedPetPost.gender = gender;

  try {
    await updatedPetPost.save();
  } catch (err) {
    const error = new HttpError("Could not update pet post!", 500);
    return next(error);
  }

  res
    .status(200)
    .json({ updatedPetPost: updatedPetPost.toObject({ getters: true }) });
};

const deletePetPost = async (req, res, next) => {
  const pid = req.params.pid;

  let pet;

  try {
    pet = await Pet.findById(pid).populate("userId");
  } catch (err) {
    const error = new HttpError("Could not find pet post to delete it", 500);
    return next(error);
  }

  if (!pet) {
    const error = new HttpError("Could not find pet post to delete it", 500);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await pet.remove({ session: sess });
    pet.userId.userPets.pull(pet);
    await pet.userId.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete pet post",
      500
    );
    return next(error);
  }

  res.status(200).send({ message: `${pet.name} has been deleted` });
};

exports.getAllPets = getAllPets;
exports.createPetPost = createPetPost;
exports.updatePetPost = updatePetPost;
exports.deletePetPost = deletePetPost;
exports.getPetById = getPetById;
