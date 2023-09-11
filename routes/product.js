const express = require("express");
const verifyuser = require("../middleware/verifyUser");

const router = express.Router();
const ProductModel = require("../models/Products");

// get all product 
router.get("/", async (req, res) => {
    try {
        const AllProducts = await ProductModel.find();
        res.status(200).json(AllProducts);
    } catch (error) {
        res.status(500).json("Error in Product get api");
    }

});

// add new product 
router.post("/addProduct", verifyuser, async (req, res) => {
    try {
        const newProduct = await new ProductModel(req.body);
        newProduct.save();
        res.status(200).json("Product save successfully");
    } catch (error) {
        res.status(404).json("Error in AddProduct Api");
    }
});

// update product 
router.put("/updateProduct", verifyuser, async (req, res) => {
    try {
        const product = await ProductModel.findOneAndUpdate({ _id: req.body.productId }, {
            $set: req.body
        });
        res.status(200).json("Product update successfully");
        if (!product) {
            res.status(404).json("Product not found");
        }
    } catch (error) {
        res.status(401).json("Error in update Product Api");
    }
})


// delete product 
router.delete("/deleteProduct", verifyuser, async (req, res) => {
    try {
        const product = await ProductModel.findOneAndDelete({ _id: req.body.productId });
        res.status(200).json("Delete Product successfully");
        if (!product) {
            res.status(404).json("Product not found");
        }
    } catch (error) {
        res.status(404).status("Error in delete Product Api");
    }
})

module.exports = router;