import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

const filePath = path.resolve(__dirname, '../data/cart.json');  

export class Cart {
    static addProduct(id, productPrice){
        //Fetch the previous cart
        fs.readFile(filePath, (err, fileContent)=>{
            let cart = {products:[], totalPrice:0};
            if(!err){
                try {
                    cart=JSON.parse(fileContent);
                } catch (parseError) {
                    console.log('Error parsing JSON:', parseError);
                }
                
            }
            // analyze the cart => find existing product
            const existingProductIndex=cart.products.findIndex(prod=>prod.id===id);
            const existingProduct=cart.products[existingProductIndex];

            let updatedProduct;

            //add new product /increase quantity
            if(existingProduct){
                updatedProduct={...existingProduct};
                updatedProduct.qty=updatedProduct.qty+1;
                cart.products=[...cart.products];
                cart.products[existingProductIndex]=updatedProduct;
            }else{
                updatedProduct={id:id, qty:1};
                cart.products=[...cart.products, updatedProduct];
            }
            cart.totalPrice=cart.totalPrice+ +productPrice;// adding + to product price convert it to the number
            fs.writeFile(filePath, JSON.stringify(cart), (err)=>{
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice){
        fs.readFile(filePath, (err, fileContent)=>{
            if(err){
                return;
            }
            const updatedCart={...JSON.parse(fileContent)};
            const product= updatedCart.products.find(prod => prod.id===id);
            const productQty= product.qty;
            updatedCart.products=updatedCart.products.filter(prod=>prod.id !== id)
            updatedCart.totalPrice=updatedCart.totalPrice-productPrice * productQty;

            fs.writeFile(filePath, JSON.stringify(updatedCart), (err)=>{
                console.log(err);
            });
        });
    }


} 