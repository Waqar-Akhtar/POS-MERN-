import User from "../models/userModel.js";


//for login
export const loginController = async (req, res) => {
    try {

        const {userId, password} = req.body;
        const user = await User.findOne({userId, password});
        // console.log(user)
        if(user) {
            res.status(200).send(user);
        } else {
            res.status(401).json({
                message: "Login Fail",
                user,
            });
        }

    } catch(error) {
        console.log(error);
    }
}

//for register
export const registerController = async (req, res) => {
    const {userId} = req.body

    try {
        const userExist = await User.findOne({userId: userId})
        if(userExist){
            res.status(410).send("UserId already exist!");
        }else
        {
        const newUser = new User({...req.body, verified: true});
        await newUser.save();
        res.status(200).send("New User Added Successfully!");
    }

    } catch(error) {
        console.log(error);
    }

}