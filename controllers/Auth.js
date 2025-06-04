import  jwt  from "jsonwebtoken";
import UserModel from "../models/users.js";
import bcryptjs from 'bcryptjs'




const register = async(req, res) => {
    try {
        const {name,email,password} = req.body
        const existUser = await UserModel.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "Email already exists" });
            }
        const hashedpassword = await bcryptjs.hash(password, 10);
        const Newuser = new UserModel({ name, email, password: hashedpassword });
        await Newuser.save();
        res.status(201).json({ message: "User created successfully",Newuser });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log (error);
    
        
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
            }
            const isValidPassword = await bcryptjs.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: "Invalid email or password" });
                }
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE)
                res.cookie('token',token,{
                    httpOnly: true,
                    secure: false,
                    maxAge: 3600000,
                    });
                    res.status(200).json({ message: "Logged in successfully",user, token });
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log (error);

    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
            console.log (error);

            }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password } = req.body;
        // Hash the new password if it's provided
        let updatedFields = { name, email };
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields.password = hashedPassword;
        }
        // Update the user
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            updatedFields,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
};

const CheckUser=async(req,res)=>{
    try {
        const user=req.user
        if (!user) {
            res.status(404).json({message:'User not found'})
        }
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        console.log(error)
        
    }
}

export {register,login,logout,CheckUser, updateUser}