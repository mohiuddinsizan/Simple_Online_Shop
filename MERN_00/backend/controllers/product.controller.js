import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async (req,res) =>{
    try{
        const products = await Product.find({});
        res.status(200).json({succcess:"true",data:products});
    }
    catch(error){
        console.log("error in fetching products");
        res.status(500).json({succcess:"false",message:"Server Error!"});
    }
}

export const createProduct = async (req,res)=>{
    const product = req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message:"Please provide all fields!"});

    }
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({succcess:true,message:"Product Listed!!"});
    }
    catch{
        console.error("Error in creating product : ",error.message);
        res.status(500).json({succcess:false,message:"Server Error!!"})
    }
}

export const updateProduct = async(req,res)=>{
    const {id} = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({succcess:"false",message:"Invalid Product Id!"});
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({succcess:"true",data:updatedProduct});
    }
    catch(error){
        console.log("Updatation Failed !!")
        res.status(500).json({succcess:"false",message:"Server error!!"})
    }
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:"true",message:"Successfully deleted!!"})
    }
    catch(error){
        console.log("Product not found !!")
        res.status(404).json({succcess:"false",message:"Product not found !"})
    }
}