const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
const cookieParser = require('cookie-parser');
require("dotenv").config()

require('./config/mongoosse.config');
app.use(cors({credentials:true, origin:"http://localhost:3000"}), express.json(), express.urlencoded({extended:true}))

app.use(cookieParser());

require('./routes/market.routes')(app);
require('./routes/user.routes')(app);



app.listen(PORT, ()=> console.log(`Connected on PORT ${PORT}`))