const express = require('express')
const app = express()
const homiyRoutes = require('./routes/homiyRouter.js');
const bigCategoryRouter = require('./routes/bigCategoryRouter.js');
const categoryRouter = require('./routes/categoryRouter.js');
const usersRouter = require('./routes/usersRouter.js');
const ishlabChiqaruvchiRouter = require('./routes/ishlabChiqaruvchiRouter.js');
const tavfsifRouter = require('./routes/tavfsifRouter.js');
const tavfsifProductRouter = require('./routes/tavfsifProductRouter.js');
const productRouter = require('./routes/productRouter.js');
const productImageRouter = require('./routes/productImageRouter.js');
const productXususiyatRouter = require('./routes/productXususiyatRouter.js');
const productFayllarRouter = require('./routes/productFayllarRouter.js');
const productSharxRouter = require('./routes/productSharxRouter.js');
const productSavolRouter = require('./routes/productSavolRouter.js');
const productSertificat = require('./routes/productSertificat.js');
const companyRouter = require('./routes/companyRouter.js');


















const cors = require('cors')
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const fs=require('fs')


app.use(fileUpload())
// Body parser middleware
app.use(bodyParser.json());
app.use(express.static('./uploads'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cors({origin: '*'}))
// Главная
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'ping',
  })
})
app.get('/doc', (_req, res) => {
  const data = fs.readFileSync('./uploads/index.html',
  { encoding: 'utf8', flag: 'r' });
res.status(200).send(data)
})



app.use(express.json());
app.use('/api', homiyRoutes);
app.use('/api', bigCategoryRouter);
app.use('/api', categoryRouter);
app.use('/api', usersRouter);
app.use('/api', ishlabChiqaruvchiRouter);
app.use('/api', tavfsifRouter);
app.use('/api', tavfsifProductRouter);
app.use('/api', productRouter);
app.use('/api', productImageRouter);
app.use('/api', productXususiyatRouter);
app.use('/api', productFayllarRouter);
app.use('/api', productSharxRouter);
app.use('/api', productSavolRouter);
app.use('/api', productSertificat);
app.use('/api', companyRouter);













app.listen(4004, () => {
    console.log('Сервер запущен')
    console.log('server started')
  })
  




