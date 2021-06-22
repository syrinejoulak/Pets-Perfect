const express = require("express");

const router = express.Router();

const { check } = require("express-validator");

const petsControllers = require("../controllers/pets-controller");

const fileUpload = require("../middleware/file-upload");

const checkAuth = require("../middleware/check-auth");

router.get("/:pid", petsControllers.getPetById);

router.get("/", petsControllers.getAllPets);

// router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("name").isLength({ min: 2, max: 10 }),
    check("image").notEmpty(),
    check("birthDate").notEmpty(),
    check("vaccinated").notEmpty(),
    check("gender").notEmpty(),
  ],
  petsControllers.createPetPost
);

router.patch(
  "/:pid",
  [
    check("name").isLength({ min: 2, max: 10 }),
    check("image").notEmpty(),
    check("birthDate").notEmpty(),
    check("vaccinated").notEmpty(),
    check("gender").notEmpty(),
  ],
  petsControllers.updatePetPost
);

router.delete("/:pid", petsControllers.deletePetPost);

module.exports = router;
