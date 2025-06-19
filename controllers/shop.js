import { title } from 'process';
import Product from '../models/product.js'
import mongoose from 'mongoose';
import Order from '../models/order.js';

//const products=[];

export const getProducts= (req, res, next)=>{
    Product.find()
    .then(products=>{
    //  console.log(products);
        res.render('shop/product-list', {
            prods:products, 
            pageTitle:'All products',
            path:'/products',
        });
    })
    .catch(err=>{
        console.log(err);
    });

}




export const getProduct=(req,res, next)=>{
    const prodId=req.params.productId;

 if (!mongoose.Types.ObjectId.isValid(prodId)) {
     return res.status(400).render('404', {
          pageTitle: 'Invalid Product ID',
          path: '/products',
          errorMessage: 'The product ID provided is not valid.',
        });
    }

    Product.findById(prodId)
    .then(product=>{
        res.render('shop/product-detail', {
            product:product, 
            pageTitle:product.title,
            path:'/products',
        
        });
    })
    .catch(err=>{
        console.log(err);
    });

}



export const getIndex=(req,res, next)=>{
    Product.find().then(products=>{
        res.render('shop/index', {
            prods:products, 
            pageTitle:'Shop Index Page',
            path:'/',
        });
    }).catch(err=>{
        console.log(err);
    });
          
}


export const getCart=(req, res, next)=>{
    req.user
    .populate('cart.items.productId')
    .then(user=>{
            console.log(user);
            const products=user.cart.items
            .filter(item=>item.productId)
            .map(item=>{
                return {
                    // product: items.productId,
                    _id:item.productId._id,
                    title:item.productId.title,
                    quantity:item.quantity
                }
            })

            res.render('shop/cart', {
                pageTitle:'Your Cart ',
                path:'/cart',
                products:products
                            
            });
    })
    .catch(err=>{
        console.log(err);
    });
}


export const postCart=(req, res, next)=>{
    const prodId=req.body.productId;
    Product.findById(prodId)
    .then(product =>{
        return req.user.addToCart(product);
    })
    .then(result=>{
        console.log(result);
        res.redirect('/cart');
    })
    
}

export const postCartDeleteProduct=(req,res, next)=>{
    const prodId=req.body.productId;
    req.user.removeFromCart(prodId)
    .then(result=>{
        res.redirect('/cart');
    })
    .catch(err=>{
        console.log(err);
    }) 
}


export const postOrder=(req,res,next)=>{
    req.user
    .populate('cart.items.productId')
    .then(user=>{
            const products=user.cart.items
            .map(item=>{
                return {
                    quantity:item.quantity,
                    product: {...item.productId._doc}
                }
            })
            const order=new Order({
                user:{
                    name:req.user.name,
                    userId:req.user._id
                },
                products: products
            });
        return order.save();    
                            
    })
    .then(result =>{
        return req.user.clearCart();
       
    }).then(()=>{
         res.redirect('/orders');
    }

    )
    .catch(err=>{
        console.log(err);
    })
    
}


export const getOrders=(req, res, next)=>{
    Order.find({'user.userId':req.user._id})
    .then(orders=>{
        res.render('shop/orders', {
            pageTitle:'Your Orders ',
            path:'/orders',
            orders:orders
        })
    }).catch(err=>{
        console.log(err);
    })
    
}

export const getCheckOut=(req, res, next)=>{
    res.render('shop/checkout', {
        path:'/checkout',
        pageTitle:' Checkout from the cart'
    })
}