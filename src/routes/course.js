import express from 'express';
import { isAdmin, requiredSignin, userById } from '../middlewares/CheckAuth';

const router = express.Router();
router.get('/test',(req,res) => {
    res.send("hêlo");
});

// router.param('userId', userById);

module.exports = router;