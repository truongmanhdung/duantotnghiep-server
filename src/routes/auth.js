import express from 'express';
import { createOrUpdateUser, currentUser } from '../controllers/auth';
import { adminCheck, checkAuth } from '../middlewares/auth';
const router = express.Router();

router.post('/create-or-update-user',(req,res) => {
    console.log("ok");
});
module.exports = router;