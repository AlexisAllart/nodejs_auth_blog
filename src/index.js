const express = require('express');
require('./db/mongoose');
const userRoutes = require('./routes/user');
const PostRoutes = require('./routes/post');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(userRoutes);
app.use(PostRoutes);

app.listen(port, () => {
    console.log('Server is now running on port ' + port);
});