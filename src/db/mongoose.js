const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://AlexisAllart:89079124@nodeauth-packz.gcp.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
}).catch(() => {
    console.log('Failed to connect to database');
});