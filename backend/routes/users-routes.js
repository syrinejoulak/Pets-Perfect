const express = require("express");

const router = express.Router();

const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controller");

const checkAuth = require("../middleware/check-auth");

router.get("/pets", usersControllers.getAllPets);

router.get("/", usersControllers.getAllUsers);

router.get("/profil/:uid", usersControllers.getUserProfilByUserId);

// router.post("/favorites/:uid", usersControllers.addToFavorites);

// router.delete("/favorites/:uid", usersControllers.deletePetFromFavorites);

router.post(
  "/signup",
  [
    check("name").isLength({ min: 2, max: 10 }),
    check("email").normalizeEmail().isEmail(),
    check("city").notEmpty(),
    check("password").isLength({ min: 6, max: 20 }),
  ],
  usersControllers.signUp
);

router.post("/login", usersControllers.login);

// router.use(checkAuth);

router.get("/pets/:uid", usersControllers.getUserPetsByUserId);

router.patch(
  "/profil/:uid",
  [check("name").isLength({ min: 2, max: 10 }), check("city").notEmpty()],
  usersControllers.updateUserProfil
);

router.delete("/profil/:uid", usersControllers.deleteUserProfil);

module.exports = router;
