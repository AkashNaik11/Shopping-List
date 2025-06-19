import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import {adminRouter} from './routes/admin.js';
import shopRouter from './routes/shop.js';
import {pageError} from './controllers/pageError.js';
import User from './models/user.js';
import mongoose from 'mongoose';

const app= express()


app.set('view engine', 'ejs'); 
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));


const __filename= fileURLToPath(import.meta.url)
const __dirname=(path.dirname(__filename))

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next)=>{
    User.findById('684fb2756c455c62944c05db')
    .then(user =>{
        req.user = user;
        next();
    })
    .catch(err=>{
        console.log(err);
    })

})


app.use('/admin',adminRouter);
app.use(shopRouter);
app.use(pageError)

mongoose.connect('mongodb://localhost:27017/')
.then(result=>{
    User.findOne().then(user =>{
        if(!user){
            const user=new User({
                name:'Akay',
                email:'ak@email.com',
                cart:{
                    items:[]
                }
            })
            user.save();
        }
    })
    

    app.listen (3000 , ()=>{
        console.log(`Server running on port 3000`);
    });
}).catch(err=>{
    console.log(err);
})





// app.listen (3000 , ()=>{
//     console.log(`Server running on port 3000`);
// });