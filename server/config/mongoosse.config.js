const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/redorewhat", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})

.then(()=>console.log("Mongo Db is connected"))
.catch((err)=>console.log(err))