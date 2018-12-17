const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')

const actor = require('./router/actor');
const general = require('./router/general');
const project = require('./router/project');
const userStory = require('./router/userStory');
const pricing = require('./router/pricing');
const effort = require('./router/effort');
const pdf = require('./pdf/pdfGenerator');

const app = express();


const Project = require('./models/Project');
const mongoURI = 'mongodb://127.0.0.1/Project-Scoper-DB';

mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));



    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });


app.use(bodyParser.json());


app.use('/api/actor', actor);
app.use('/api/project', project);
app.use('/api/general', general);
app.use('/api/userStory', userStory);
app.use('/api/pricing', pricing);
app.use('/api/effort', effort);
app.use('/api/pdf', pdf);


app.listen(5000);