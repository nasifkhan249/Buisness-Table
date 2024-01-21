const express=require('express');
const ProductController=require('../controllers/ProductsController');

const router=express.Router();

router.get("/ProductList/:pageNo/:perPage/:searchValue",ProductController.ProductList);

module.exports=router;