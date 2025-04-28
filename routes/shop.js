import express from "express";
import { Router } from "express";
import path from 'path'
import { fileURLToPath } from "url";
// import rootDir from '../util/path.js'
// import { products } from "./admin.js";
import {getProducts, getIndex, getCart, getCheckOut, getOrders, getProduct, postCart} from '../controllers/shop.js'

const shopRouter=Router();

//Get the directory

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

shopRouter.get('/', getIndex);

shopRouter.get('/products', getProducts);

shopRouter.get('/products/:productId', getProduct);

shopRouter.get('/cart', getCart);

shopRouter.post('/cart',postCart);

shopRouter.get('/orders',getOrders);

shopRouter.get('/checkout', getCheckOut);

export default shopRouter;