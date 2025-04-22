import Product from '../models/product.js'

export const getAddProduct=(req, res, next)=>{
   
    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
     //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
     res.render('admin/add-product', {
         pageTitle: 'Add Product', 
         path:'/admin/add-product',
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
    const product=new Product(title, imageUrl, price, description );
    product.save();
    res.redirect('/');
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