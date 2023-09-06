const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

const signupController = async (req, res) => {
    try {
        const data = JSON.parse(req.headers.data);
        const { firstName, lastName, userName, email, password } = data.formObject;

        if (!email || !password || !firstName || !lastName || !userName){
            return res.send(error(400, "All fields are required"));
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            // return res.status(409).send("User is already registered");
            return res.send(error(409, "User is already registered"));
        }


        const user = await User.create({
            email,
            password,
            firstName,
            lastName,
            userName
        });

        return  res.send(success(201,user));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send(error(400, "All fields are required"));
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.send(error(404, "User is not registered"));
        }

        if (password !== user.password) {
            return res.send(error(403, "incorrect password"));
        }

        const accessToken = generateAccessToken({
            _id: user._id,
        });


        return res.send(success(200, { accessToken }));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};


//internal functions
const generateAccessToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: "1d",
        });
        console.log(token);
        return token;
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    signupController,
    loginController,
};