const express = require('express');

const app = express();


app.use('/', require('./server/routes/auth.routes'));

app.listen(4000, function () {
    console.log('Server started on http://localhost:4000');
});
