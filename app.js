import express from 'express'
import bodyParser from 'body-parser'
import path from 'path';
import { fileURLToPath } from 'url';
// import {engine} from 'express-handlebars'
import {adminRouter} from './routes/admin.js';
import shopRouter from './routes/shop.js';
import {pageError} from './controllers/pageError.js'


const app= express()

// app.engine('hbs', engine({extname:'hbs'}))
// app.set('view engine', 'hbs');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));


const __filename= fileURLToPath(import.meta.url)
const __dirname=(path.dirname(__filename))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin',adminRouter);
app.use(shopRouter);

app.use(pageError)


app.listen (3000 , ()=>{
    console.log(`Server running on port 3000`);
});
