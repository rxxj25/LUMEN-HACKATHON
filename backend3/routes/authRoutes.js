// routes/authRoutes.js
import express from "express";
import { register, login } from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();

// Register validators (simple)
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  register
);

router.post("/login", login);

export default router;
