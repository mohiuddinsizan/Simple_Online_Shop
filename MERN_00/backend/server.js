// const express = req('express');
import express from "express";  // need to add type in package.json as module 
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js"
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products",productRoutes);

app.listen(5000,()=>{
    connectDB();
    console.log("Server started!");
})

// QNkU8Vl02jkgngVG