const express = require("express");
const router = express.Router();
const userController = require("../controller/User.controller");
const verifyToken = require("../middlewares/auth");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/profile", verifyToken, userController.getProfile);
router.get("/users", userController.getAllUsers);
router.put("/profile", verifyToken, userController.updateProfile);

router.delete("/profile", verifyToken, userController.deleteProfile);

module.exports = router;
