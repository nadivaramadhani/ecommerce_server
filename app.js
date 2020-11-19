if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
// require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./routers');
const errorHandler = require('./middlewares/errorHandler')

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/',router);
app.use(errorHandler);

app.listen(PORT , () => {
    console.log(`This app listening at http://localhost:${PORT}`);
})
module.exports = app;