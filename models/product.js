import fs, { readFile } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';


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
    constructor(title, imageUrl, price, description ){
        this.title=title;
        this.imageUrl= imageUrl;
        this.price = price;
        this.description= description;
        

    }
    save(){
        // products.push(this)
       
        // const filePath = path.resolve(__dirname, '../data/products.json');
        // fs.readFile(filePath, (err, fileContent)=>{
        //     let products=[];
        //     if (!err && fileContent.length > 0) {
        //         try {
        //               products = JSON.parse(fileContent);
        //                    } catch (parseError) {
        //                       console.log('Error parsing JSON:', parseError);
        //                   }
        //               }

        //     products.push(this);
        //     fs.writeFile(filePath, JSON.stringify(products), (err)=>{
        //         console.log(err);
        //     })
        // })

        getProductsFromFile(products=>{
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), (err)=>{
                console.log(err);
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
}