import {Router} from "express";
import Category from "../models/Category.js";
import mongoose from "mongoose";
import Product from "../models/Product.js";


const router = Router();

router.get("/", async(req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
});

router.post("/", async(req, res, next) => {
    const {name} = req.body;
    if (!name) {
        res.status(400).send("Name is required");
        return;
    }
    try {
        const newCategory = new Category({name});
        await newCategory.save();
        res.status(201).json({
            message: "Category created successfully",
            category: newCategory
        });
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
        const category = await Category.findById(id).populate("products");
        if (!category) {
            return res.status(404).send("Category not found");
        }
        res.json(category);
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
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).send("Category not found");
        }

        for (const productId of category.products) {
            await Product.findByIdAndDelete(productId);
        }


        res.json({
            message: "Category deleted successfully",
            category
        });

    } catch (error) {
        console.error("Error: ", error);
        next(error);
    }
});

export default router;