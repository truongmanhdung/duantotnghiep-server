import express from 'express';
import {createOrUpdateUser, currentUser,signup,signin, signout} from "../controllers/AuthController";

const router = express.Router();


router.post('/create-or-update-user', createOrUpdateUser);
router.post('/current-user', currentUser);

router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",signout);

module.exports = router;