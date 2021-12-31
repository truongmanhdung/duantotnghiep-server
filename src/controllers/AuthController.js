import jwt from "jsonwebtoken";

import User from '../models/User';


export const createOrUpdateUser = async (req, res) => {
    const { email, name, picture } = req.body;

    const user = await User.findOneAndUpdate({ email }, { email, name, picture }, { returnNewDocument: true });
    if (user) {
        res.json(user);
    } else {
        const newUser = await new User({
            email,
            name,
            picture
        }).save();
        res.json(newUser);
    }
}
export const currentUser = (req, res) => {
    const { email } = req.body;
    User.findOne({ email }).exec((err, user) => {
        if (err) throw new Error(err)
        res.json(user)
    });
}

export const signup = async (req,res) => {
    try {
        const {email, full_name,password} = req.body;
        const user = await new User({email, full_name,password}).save();
        res.json(user);
    } catch (error) {
        res.json({
            error: error,
            messenger: "Tạo tài khoản thất bại"
        })
    }
    
}
export const signin = async (req,res) => {
    const {email,password} = req.body;
   const user = await User.findOne({email}).exec();
   if (!user) {
        res.json({
            messenger: "Tài khoản không tồn tại"
        });
   }
   if (!user.authenticate(password)) {
       res.json({
           messenger: "Tài khoản hoặc mật khẩu không chính xác"
       });
   }

   const token = jwt.sign({_id: user._id},"123456");
   res.cookie("token",token,{expire: new Date() + 9999});

    res.json({
        token,
        user: {
            _id: user._id,
            full_name: user.full_name,
            role: user.role,
            avatar: user.avatar
        }
    });
}
export const signout = (req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Đăng xuất thành công"
    })
}
