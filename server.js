const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const category = require('./routes/category');
const user = require('./routes/user');
const item = require('./routes/item');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

dotenv.config({ path: './config/config.env' });
connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());

app.use(cookieParser());

app.use(fileupload());

//sanitize nosql injections
app.use(mongoSanitize());

//protect from cross site scripting
app.use(xss());

//protect from http parameter pollution
app.use(hpp());

//setup rate limiter
const limiter = rateLimit({
    windowMs: 10* 60 *1000,
    max:100
})

app.use(limiter);

//add security headers
app.use(helmet());

//add cors protection
app.use(cors());

app.use(logger);

app.use('/api/v1/category', category);
app.use('/api/v1/user', user);
app.use('/api/v1/item', item);

app.use(errorHandler);

const PORT = process.env.PORT || 5001

app.listen(PORT, () =>{
    console.log(`Server is listening on PORT: ${PORT}`)
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error is ${err.message}`);
    server.close(() => process.exit(1))
})