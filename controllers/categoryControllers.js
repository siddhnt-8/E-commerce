import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"
import userModel from "../models/userModel.js"

export const createCategoryController= async(req,res)=>{
  try {
    const {name} = req.body
    if(!name){
      return res.status(401).send({message:'Name is required'})
    }
    const existingcategory = await categoryModel.findOne({name})
    if(existingcategory){
      return res.status(200).send({
        success:true,
        message:'Category Already Existed'
      })
    }
    const category = await new categoryModel({name,slug:slugify(name)}).save()
    res.status(201).send({
      success:true,
      message:"New category createad",
      category
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error in category'
    })
    
  }
}

export const updateCategoryController=async(req,res)=>{
  try {
    const {name}=req.body
    const {id}=req.params
    const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
    res.status(200).send({
      success:true,
      message:'Category Updated Sucessfully',
      category
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error while updating categoryies'
    })
    
  }
}

export const categoryController=async(req,res)=>{
  try {
    const category = await categoryModel.find({})
    res.status(200).send({
      success:true,
      message:'All categories List',
      category
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error while getting all categories'
    })
    
  }
}

export const singleCategoryController=async(req,res)=>{
  try {
    
    const category = await categoryModel.findOne({slug:req.params.slug})
    res.status(200).send({
      success:true,
      message:'Get single category Successfully',
      category
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error while getting single categories'
    })
    
  }
}

export const deleteCategoryController=async(req,res)=>{
  try {
    const {id} = req.params
     await userModel.findByIdAndDelete(id)
    res.status(200).send({
      success:true,
      message:'Category deleted succesffully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error in deleting a category'
    })
  }
}