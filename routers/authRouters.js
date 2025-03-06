import express from "express";
import {
  forgotPasswordController,
  getOrderController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//REGISTER
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//Test Route
router.get("/test", requireSignIn, isAdmin, testController);

//Forget Passowrd
router.post("/forget-password", forgotPasswordController);

//protected route auth for user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected auth route for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Update Profile
router.put('/profile',requireSignIn,updateProfileController)

//order Route
router.get('/orders',requireSignIn,getOrderController)

export default router;
