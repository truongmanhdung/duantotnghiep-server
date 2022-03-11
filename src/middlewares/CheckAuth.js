import expressJwt from "express-jwt";
import User from "../models/User";

export const requiredSignin = expressJwt({
    secret: "123456",
    algorithms: ["HS256"],
    userProperty: "auth"
});

export const isAdmin = (req, res, next) => {
    console.log(req.profile.role);
    if (req.profile.role == 2) {
        next();
    }
    return res.status(403).json({
        messenger: "Bạn không có quyền truy cập"
    })
}
export const userById = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email}).exec();
        req.profile = user;
        next();
    } catch (error) {
        res.status(400).json({
            msg: 'User không tồn tại'
        })
    }

}
export const read = (req, res) => {
    const user = req.profile;
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
}