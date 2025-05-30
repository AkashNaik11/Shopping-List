import fs, { readFile } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import {Cart} from './card.js'


//const products=[];

const __filename= fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename);
const filePath = path.resolve(__dirname, '../data/products.json');  

const getProductsFromFile= cb=>{
    
        fs.readFile(filePath, (err, fileContent)=>{
            if (err || fileContent.length === 0) {
                cb([]);
            } else {
                try {
                        cb(JSON.parse(fileContent));
                } catch (parseError) {
                    console.log('Error parsing JSON:', parseError);
                    cb([]);
                    }
           }
            
        })
}


export default class Product{
    constructor(id, title, imageUrl, price, description ){
        this.id=id;
        this.title=title;
        this.imageUrl= imageUrl;
        this.price = price;
        this.description= description;
        

    }
    save(){

        getProductsFromFile(products=>{
            if(this.id){
                const existingProductIndex= products.findIndex(prod=>prod.id===this.id)
                const updatedProducts=[...products];
                updatedProducts[existingProductIndex]=this;

                fs.writeFile(filePath, JSON.stringify(updatedProducts), (err)=>{
                    console.log(err);
                });
            } else {
                this.id=Math.random().toString();
                products.push(this);
                fs.writeFile(filePath, JSON.stringify(products), (err)=>{
                    console.log(err);
                });
            }
            
        });
    }

    static deleteById(id){
        getProductsFromFile(products=>{
            const product=products.find(prod=>prod.id===id);
            const updateproduct =products.filter(prod=>prod.id !==id);
            fs.writeFile(filePath, JSON.stringify(updateproduct), (err)=>{
                if (!err){
                    Cart.deleteProduct(id, product.price );
                }
            });
        });
    }

    static fetchAll(cb){
        // const filePath = path.resolve(__dirname, '../data/products.json');
        // fs.readFile(filePath, (err, fileContent)=>{
        //     if (err || fileContent.length === 0) {
        //         cb([]);
        //     } else {
        //         try {
        //                 cb(JSON.parse(fileContent));
        //         } catch (parseError) {
        //             console.log('Error parsing JSON:', parseError);
        //             cb([]);
        //             }
        //    }
            
        // })
        // return products;

        getProductsFromFile(cb);
    }

    static findById(id, cb){
        getProductsFromFile(products=>{
            const product =products.find(p=>p.id===id);
            cb(product);
        });
    }
}