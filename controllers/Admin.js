import UserModel from "../models/users.js"


const Getuser=async(req,res)=>{
    try {
        const users=await UserModel.find()
         res.status(200).json({users})
    } catch (error) {
        res.status(500).json({message:"intenral server error"})
        console.log(error)
    }
}

const deletUser=async(req,res)=>{
    try {
        const userId=req.params.id
              const checkAdmin=await UserModel.findById(userId)

              if (checkAdmin.role =='admin') {
                return  res.status(409).json({message:"you can not delet youselfe"})
              }
        const user=await UserModel.findByIdAndDelete(userId)
        if (!user) {
          return  res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user delet successfully ",user})
    } catch (error) {
        res.status(500).json({message:"intenral server error"})
        console.log(error)
    }
}

const updateUserRole = async (req, res) => {
    try {
        const requester = req.user; // from JWT middleware
        const targetUserId = req.params.id;
        const { role } = req.body;

        // Only admins can update roles
        if (requester.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // Prevent admin from changing their own role
        if (requester._id === targetUserId) {
            return res.status(403).json({ message: 'You cannot change your own role' });
        }

        // Allowed roles in the system
        const allowedRoles = ['admin', 'author', 'reader'];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        // Update the role
        const updatedUser = await UserModel.findByIdAndUpdate(
            targetUserId,
            { role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: `Role updated to '${role}' successfully`,
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
};


const getUserbyID = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user });
            } catch (error) {
                res.status(500).json({ message: 'Internal server error' });
                console.log(error);
                }
}


export {Getuser,deletUser, updateUserRole, getUserbyID};