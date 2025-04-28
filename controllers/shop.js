import Product from '../models/product.js'
import {Cart} from '../models/card.js'
//const products=[];

export const getProducts= (req, res, next)=>{
    // console.log(products);
    // res.sendFile(path.join(__dirname,'../','views', 'shop.html'));
   // res.sendFile(path.join(rootDir,'views', 'shop.html'));

   // using the pug template engine from shop.pug

   Product.fetchAll((products)=>{
        res.render('shop/product-list', {
            prods:products, 
            pageTitle:'All products',
            path:'/products',
           
   });
});
}


export const getProduct=(req,res, next)=>{
    const prodId=req.params.productId;
    console.log(Product.findById);
    Product.findById(prodId, product=>{
        //console.log(product)
        res.render('shop/product-detail', {
            product:product, 
            pageTitle:product.title,
            path:'/products',
        
        });
    })
    
}


export const getIndex=(req,res, next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/index', {
            prods:products, 
            pageTitle:'Shop Index Page',
            path:'/',
   });
});
}


export const getCart=(req, res, next)=>{
    res.render('shop/cart', {
        pageTitle:'Cart ',
        path:'/cart',
        
    })
}

export const postCart=(req, res, next)=>{
    const prodId=req.body.productId;
    Product.findById(prodId, (product)=>{
        Cart.addProduct(prodId, product.price)
    });
    console.log(prodId);
    res.redirect('/cart');
}

export const getOrders=(req, res, next)=>{
    res.render('shop/orders', {
        pageTitle:'Orders ',
        path:'/orders',
        
    })
}

export const getCheckOut=(req, res, next)=>{
    res.render('shop/checkout', {
        path:'/checkout',
        pageTitle:' Checkout from the cart'
    })
}