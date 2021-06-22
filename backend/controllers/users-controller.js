const HttpError = require("../models/http-error");

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

const Pet = require("../models/pet");
const User = require("../models/user");

const getUserProfilByUserId = async (req, res, next) => {
  const uid = req.params.uid;

  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    const error = new HttpError("Could not find user by id", 404);
    return next(error);
  }

  res.json({ user: user });
};

const getAllPets = async (req, res, next) => {
  let allPets;
  try {
    allPets = await Pet.find();
  } catch (err) {
    return next(new HttpError("Could not find pets", 404));
  }

  res.json({ allPets: allPets.toObject({ getters: true }) });
};

const getAllUsers = async (req, res, next) => {
  let allUsers;
  try {
    allUsers = await User.find();
  } catch (err) {
    return next(new HttpError("Could not find users", 404));
  }

  res.json(allUsers);
};

const getUserPetsByUserId = async (req, res, next) => {
  const uid = req.params.uid;

  let userWithPets;
  try {
    userWithPets = await User.findById(uid).populate("userPets");
  } catch (err) {
    const error = new HttpError(
      "Could not find the user pets for the provided user id.",
      404
    );
    return next(error);
  }

  res.json({
    userPets: userWithPets.userPets.map((userPet) =>
      userPet.toObject({ getters: true })
    ),
  });
};

const updateUserProfil = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data", 422)
    );
  }

  const { name, city } = req.body;
  const uid = req.params.uid;

  let updatedUserProfil;
  try {
    updatedUserProfil = await User.findById(uid);
  } catch (err) {
    return next(new HttpError("Something went wrong, please, try again", 422));
  }

  updatedUserProfil.name = name;
  updatedUserProfil.city = city;

  try {
    await updatedUserProfil.save();
  } catch (err) {
    const error = new HttpError("Could not update user profil!", 500);
    return next(error);
  }

  res.status(200).json({ updatedUserProfil });
};
//prob
// const addToFavorites = async (req, res, next) => {
//   const uid = req.params.uid;

//   let user;
//   try {
//     user = await User.findById(uid);
//   } catch (err) {
//     return next(new HttpError("Something went wrong, please, try again", 422));
//   }

//   const addedToFavorites = req.body;

//   try {
//     user.favoritePets.push(addedToFavorites);
//     await user.save();
//   } catch (err) {
//     return next(new HttpError("Couldn't add pet to favorites", 422));
//   }

//   res.status(200).json({ addedToFavorites });
// };

// const deletePetFromFavorites = (req, res, next) => {
//   const uid = req.params.uid;
//   const user = allUsers.find((u) => u.userId === uid);
//   const {
//     name,
//     image,
//     type,
//     breed,
//     birthDate,
//     vaccinated,
//     petId,
//     userId,
//     gender,
//   } = req.body;
//   const removedFromFavorites = {
//     petId,
//     name,
//     image,
//     type,
//     breed,
//     birthDate,
//     vaccinated,
//     userId,
//     gender,
//   };

//   if (!user.favoritePets.find((p) => p.petId === removedFromFavorites.petId)) {
//     return next(new HttpError("Could not find favorite pet", 404));
//   }
//   user.favoritePets = user.favoritePets.filter(
//     (p) => p.petId !== removedFromFavorites.petId
//   );
//   res.status(200).send({
//     message: `${removedFromFavorites.name} has been removed from favorites`,
//   });
// };

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data", 422)
    );
  }
  const { name, email, password, phoneNumber, city, zipCode } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Creating new user account failed, please try again!",
      500
    );
    return next(error);
  }

  if (existingUser) {
    return next(
      new HttpError("Could not create user, email already exists", 422)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Couldn't create user, please try again", 500);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    city,
    zipCode,
    userPets: [],
    favoritePets: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Creating new user account failed, please try again.",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "super_secret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).send({
    userId: createdUser.id,
    email: createdUser.email,
    city: createdUser.city,
    name: createdUser.name,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again.", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check you credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Invalid password, could not log you in", 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "super_secret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again.", 500);
    return next(error);
  }

  res.send({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

const deleteUserProfil = async (req, res, next) => {
  const uid = req.params.uid;

  let user;
  try {
    user = await User.findById(uid);
  } catch (err) {
    const error = new HttpError("Could not find user to delete it", 500);
    return next(error);
  }
  if (!user) {
    return next(
      new HttpError(
        "Could not find a user for the provided id to delete it",
        404
      )
    );
  }

  try {
    await Pet.deleteMany({ userId: uid });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user pets!",
      500
    );
    return next(error);
  }

  try {
    await user.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user account!",
      500
    );
    return next(error);
  }

  res.status(200).send({ message: `${user.name} has been deleted` });
};

exports.getUserPetsByUserId = getUserPetsByUserId;
exports.getUserProfilByUserId = getUserProfilByUserId;
exports.updateUserProfil = updateUserProfil;
// exports.addToFavorites = addToFavorites;
exports.deleteUserProfil = deleteUserProfil;
// exports.deletePetFromFavorites = deletePetFromFavorites;
exports.getAllPets = getAllPets;
exports.getAllUsers = getAllUsers;
exports.signUp = signUp;
exports.login = login;
