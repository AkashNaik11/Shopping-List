import Product from '../models/product.js'

export const getAddProduct=(req, res, next)=>{
   
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
     //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
     res.render('admin/edit-product', {
         pageTitle: 'Add Product', 
         path:'/admin/add-product',
         editing:false,
        //  formsCSS:true,
        //  productCSS:true,
        //  activeAddProduct:true
     });
 
 }

 export const postAddProduct= (req, res, next)=>{
    // products.push({title: req.body.title})
    const title=req.body.title;
    const imageUrl= req.body.imageUrl;
    const price= req.body.price;
    const description= req.body.description;
    const product=new Product(null, title, imageUrl, price, description );
    product.save();
    res.redirect('/');
}

export const getEditProduct=(req, res, next)=>{
     const editMode=req.query.edit;
     if (!editMode){
        return res.redirect('/');
     }
     const prodId=req.params.productId;
     Product.findById(prodId, product=>{
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
     
 }


 

 export const postEditProduct=(req,res, next)=>{
    const prodId=req.body.productId;
    const updatedTitle=req.body.title;
    const updatedPrice= req.body.price;
    const updatedImageUrl=req.body.imageUrl;
    const updatedDesc= req.body.description;
    const updatedProduct= new Product(prodId, updatedTitle,updatedPrice, updatedImageUrl, updatedDesc);

    updatedProduct.save();

    res.redirect('/admin/products');
 }


export const getProducts=(req, res, next)=>{
    Product.fetchAll(products=>{
        res.render('admin/productList',{
            prods:products,
            pageTitle:'Admin Products',
            path:'/admin/products'
        });
    });
};


export const postDeleteProduct=(req, res, next)=>{
    const prodId= req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products')
    
}