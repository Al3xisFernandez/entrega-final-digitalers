const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI;


mongoose.connect( MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(db => console.log('db conectada'))
.catch(err => console.log(err));



