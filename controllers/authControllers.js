import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import JWT from "jsonwebtoken"

// Register controller
export const registerController = async (req,res) => {
  try {
    const {name, email, password, phone, address, question} = req.body
    //validation
    if(!name){
      return res.send({message:'Name is Required'})
    }
    if(!email){
      return res.send({message:'Email is Required'})
    }
    if(!password){
      return res.send({message:'Password is Required'})
    }
    if(!phone){
      return res.send({message:'Phone is Required'})
    }
    if(!address){
      return res.send({message:'Address is Required'})
    }
    if(!question){
      return res.send({message:'friends Name is Required'})
    }

    //check user
    const existingUser = await userModel.findOne({email})
    //Existing user
    if(existingUser){
      return res.status(200).send({
        success:false,
        message:'Already Register please Login'
      })
    }

    //Register User
    const hashedPassword = await hashPassword(password)
    //save
    const user = await new userModel({name, email, phone, address, password:hashedPassword,question}).save()

    res.status(201).send({
      success:true,
      message: 'User Registered Successfully',
      user
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Error in Registration',
      error
    })
  }
}

//login controller
export const loginController = async (req,res) => {
  try {
    const {email, password} = req.body
    //validation 
    if(!email || !password){
      return res.status(404).send({
        success : false,
        messsage : 'Invalid email or password'
      })
    }
    //check User
    const user = await userModel.findOne({email})
    if(!user){
      return res.status(404).send({
        success : false,
        message : 'Email is required'
      })
    }
    const match = await comparePassword(password,user.password)
    if(!match){
      return res.status(200).send({
        success:false,
        message : 'Invalid Password'
      })
    }

    //token
    const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7 Days"})
    res.status(200).send({
      success:true,
      messgae:'Login Successfully',
      user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
        question:user.question,
        role:user.role
      },
      token
    })
    
  } catch (error) {
    console.log(error);
    
    res.status(500).send({
      success: false,
      message : 'Error in Login',
      error
    })
  }
}

//forget password controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, question, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!question) {
      res.status(400).send({ message: "question is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, question });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller
export const testController = async (req,res)=>{
  try {
    res.send('Protexted Routes')
  } catch (error) {
    console.log(error);
    res.send({error})
  }
}

//update profile controller
export const updateProfileController= async(req,res)=>{
  try {
    const {name,email,password,address,phone} =req.body
    const user = await userModel.findById(req.user._id)
    //password
    if(password && password.length < 6){
      return res.json({error:'Password is required and 6 character long'})
    }
    const hashedPassword = password ? await hashPassword(password):undefined
    const updateUser = await userModel.findByIdAndUpdate(req.user._id,{
      name : name || user.name,
      password : hashedPassword || user.password,
      phone : phone || user.phone,
      address: address || user.address
    },{new:true})
    res.status(200).send({
      success:true,
      message:'Profile update succeffuly',
      updateUser
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success:false,
      message:"Error in while updating use profile",
      error
    })
    
  }
}

// get user orders
export const getOrderController = async(req,res)=>{
 
}