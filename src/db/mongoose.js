const mongoose = require('mongoose');
const uri = process.env.MONGODB_URL;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
}).catch(() => {
    console.log('Failed to connect to database');
});