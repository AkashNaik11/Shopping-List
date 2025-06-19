import { ObjectId } from 'mongodb';
import Product from '../models/product.js'
import mongoose from 'mongoose';

export const getAddProduct=(req, res, next)=>{
   
     res.render('admin/edit-product', {
         pageTitle: 'Add Product', 
         path:'/admin/add-product',
         editing:false,
         formsCSS:true,
         productCSS:true,
         activeAddProduct:true
     });
 }

 export const postAddProduct= (req, res, next)=>{
    // products.push({title: req.body.title})
    const title=req.body.title;
    const imageUrl= req.body.imageUrl;
    const price= req.body.price;
    const description= req.body.description;
    const product=new Product({
        title:title, price:price,
        description:description, imageUrl:imageUrl,
        userId:req.user
    });
    product.save()
    .then(result=>{
        console.log("product created");
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    })
    
}

export const getEditProduct=(req, res, next)=>{
     const editMode=req.query.edit;
     if (!editMode){
        return res.redirect('/');
     }
     const prodId=req.params.productId;
     Product.findById(prodId)
     .then(product=>{
            if(!product){
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product', 
                path:'/admin/edit-product',
                editing:editMode,
                product:product
            });
        })
     .catch(err=>{
        console.log(err);
     })   
 }


 export const postEditProduct=(req,res, next)=>{
    const prodId=req.body.productId;
    const updatedTitle=req.body.title;
    const updatedPrice= req.body.price;
    const updatedImageUrl=req.body.imageUrl;
    const updatedDesc= req.body.description;
    
    Product.findById(prodId).then(product =>{
        product.title=updatedTitle;
        product.price=updatedPrice;
        product.description=updatedDesc;
        product.imageUrl=updatedImageUrl;
        return product.save()
    })
    .then(result=>{
        console.log('product updated');
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    });
    
 }




export const getProducts=(req, res, next)=>{
    Product.find()
    .select('title price -_id imageUrl')
    .populate('userId', 'name')
    .then(products=>{
        //console.log(products)
        res.render('admin/productList',{
            prods:products,
            pageTitle:'Admin Products',
            path:'/admin/products'
        });
    })
    .catch(err=>{
        console.log(err);
    });
};


export const postDeleteProduct=(req, res, next)=>{
    const prodId= req.body.productId;
    

    if(!mongoose.Types.ObjectId.isValid(prodId)){
        console.log('Invalid Product Id:', prodId);
        return res.redirect('/admin/products');
    }
    
    Product.findByIdAndDelete(prodId)
    .then(()=>{
        console.log('Product Destroyed')
        res.redirect('/admin/products')
    })
    .catch(err=>{
        console.log(err);
    });
    
}