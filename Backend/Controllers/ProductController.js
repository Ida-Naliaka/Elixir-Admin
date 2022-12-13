const Product = require("../Models/ProductModel");
const expressAsyncHandler= require('express-async-handler');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./VerifyToken");
const Order= require("../Models/OrderModel");

//CREATE
const createProduct = expressAsyncHandler(async(req, res) => {
  const {title, desc, brand, size, color,price, inStock, img, categories} = req.body;
  if (!title || !desc || !size || !price || !inStock || !img || !categories) {
    res.status(400)
    throw new Error("no input sent")
  }

  const CreatedProduct= await Product.create({
    title: title,
        desc: desc,
        brand: brand,
        size: size,
        color: color,
        price: price,
        inStock: inStock,
        img: img,
        categories: categories
  });
  if (CreatedProduct) {
    res.status(201).json(
     { title: CreatedProduct.title,
        desc: CreatedProduct.desc,
        brand: CreatedProduct.brand,
        size: CreatedProduct.size,
        color: CreatedProduct.color,
        price: CreatedProduct.price,
        inStock: CreatedProduct.inStock,
        img: CreatedProduct.img,
        categories: CreatedProduct.categories})
  } else {
    console.log('no product created in db');
  }
});

//UPDATE
const updateProduct = expressAsyncHandler(async(req, res) => {
  const {title, desc, brand, size, color,price, inStock, img, categories} = req.body;
  const product={title: title,
    desc: desc,
    brand: brand,
    size: size,
    color: color,
    price: price,
    inStock: inStock,
    img: img,
    categories: categories}
  if (!title && !desc && !size && !price && !inStock && !img && !categories) {
    res.status(400)
    throw new Error("no input sent")
  } 
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: product,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
const deleteProduct = expressAsyncHandler(verifyTokenAndAdmin, async(req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
const getProduct = expressAsyncHandler(async(req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
const getAllProducts = expressAsyncHandler(async(req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET POPULAR PRODUCTS
const getPopularProducts = expressAsyncHandler(async(req, res) => {
try {

const AllOrders= await Order.find();//get all orders
const filteredbs=[];// get the products(an array) part of the object and spread it out so its an array of objects
AllOrders.map((el)=>filteredbs.push(...el.products) );
const filteredIds=[];//get only the productIds
filteredbs.map((el)=>filteredIds.push(el.productId));
const uniqueIds=[...new Set(filteredIds)]//return unique ids to avoid repetition
const findProducts=[]//find the products in the database and return them
for (let i=0; i<uniqueIds.length; i++) {
  const thisProduct= await Product.findById(uniqueIds[i]);
  findProducts.push(thisProduct);
}
res.status(201).json(findProducts.slice(-8))
} catch (error) {
  res.status(500).json(err);
}
})

const allProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({$or: [
      { title: { $regex: req.query.search, $options: "i" } },
      { brand: { $regex: req.query.search, $options: "i" } },
  ],
  })
  const inStockProducts= products.filter((item)=>item.inStock!==false);
      res.send(inStockProducts);
  });
  

module.exports = { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts, getPopularProducts,allProducts };