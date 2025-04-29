import express from "express";
import { Router } from "express";
import path from 'path'
import { fileURLToPath } from "url";
const adminRouter=Router();
import { getAddProduct, postAddProduct, getProducts, getEditProduct, postEditProduct, postDeleteProduct} from '../controllers/admin.js';


//const products=[];


const __filename = fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename);

// /admin/add-product=> GET

adminRouter.get('/add-product', getAddProduct);

// /admin/products=> GET

adminRouter.get('/products', (getProducts));
    

// /admin/add-product=> POST

adminRouter.post('/add-product',postAddProduct);

// export {adminRouter, products};


adminRouter.get('/edit-product/:productId', getEditProduct)

adminRouter.post('/edit-product', postEditProduct );

adminRouter.post('/delete-product', postDeleteProduct);

export {adminRouter};





