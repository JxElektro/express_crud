//import express and the controllers
import express from "express";
import { register, login } from "..//controllers/auth.js";

const router = express.Router();

// Route register

router.post("auth/register", register);
router.post("/auth/login", login);


// export router
export default router;
