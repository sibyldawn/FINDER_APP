const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
require('dotenv').config();
const app = express();
const axios = require('axios');

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
}).catch(error => {
    console.log('-------------- error', error);
});

const PORT =  4000;
app.listen(PORT, () => console.log(`Server Is Listening on port ${PORT} 👏`));