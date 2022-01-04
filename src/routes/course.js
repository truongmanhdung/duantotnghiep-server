import express from 'express';
import { isAdmin, isAuth, requiredSignin, userById } from '../middlewares/CheckAuth';

const router = express.Router();


router.post('/course/:userId', requiredSignin,isAuth,isAdmin,(req,res) => {
    console.log("this is the course");
});

router.param('userId', userById);

module.exports = router;