const mongoose = require('mongoose')

//Database Name -> dec_11
mongoose.connect('mongodb://localhost:27017/dec_11',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})