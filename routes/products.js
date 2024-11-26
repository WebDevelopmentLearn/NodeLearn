import {Router} from "express";
import Product from "../models/Product.js";
import mongoose from "mongoose";
import Category from "../models/Category.js";

const router = Router();

router.get("/", async(req, res, next) => {
    try {
        const products = await Product.find().populate("category");
        res.json(products);
    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
});

router.get("/:id", async(req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID");
    }
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.json(product);
    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
});

router.post("/", async(req, res, next) => {
    const {title, price, category} = req.body;
    if (!title || !price || (!category && !mongoose.Types.ObjectId.isValid(category))) {
        res.status(400).send("Title, price and category are required");
        return;
    }
    try {
        const newProduct = new Product({title, price, category});
        await newProduct.save();

        const targetCategory = await Category.findById(category);

        if (!targetCategory) {
            res.status(404).send("Category not found");
            return;
        }

        await targetCategory.updateOne({$push: {products: newProduct._id}});

        res.status(201).json({
            message: "Product created successfully",
            product: newProduct
        });
    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
});

router.delete("/:id", async(req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID");
    }
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.json(product);
    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
});


export default router;