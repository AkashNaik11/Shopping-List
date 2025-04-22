export const pageError=(req, res, next)=>{
    //res.status(404).send('<h1>Page not found</h1>')
    //res.status(404).sendFile(path.join(__dirname,'views','pageNotFound.html'))

    res.render('404', {
        pageTitle:'Page Not Found!',
        path: req.path // Pass the path variable here
    })
}