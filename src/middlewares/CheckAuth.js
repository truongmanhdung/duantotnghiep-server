import expressJwt from "express-jwt";
import User from "../models/User";

export const requiredSignin = expressJwt({
    secret: "123456",
    algorithms: ["HS256"],
    userProperty: "auth"
});


export const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!user) {
        res.status(403).json({
            messenger: "Truy cập bị từ chối"
        })
    }
    next();
}
export const isAdmin = (req, res, next) => {
    console.log(req.profile.role);
    if (req.profile.role === 0) {
        return res.status(403).json({
            messenger: "Bạn không có quyền truy cập"
        })
    }
    next();
}
export const userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id).exec(); // tìm user dựa trên ID
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