/*
    1) First step is to establish the express application
        require means include (we are drawing it from somewhere else)
        create an express app
        http://localhost:3000
  
    2) 
        https://stackoverflow.com/questions/12703098/how-to-get-a-json-file-in-express-js-and-display-in-view
        https://expressjs.com/en/guide/using-middleware.html
        PUG:  https://teamtreehouse.com/library/middleware-in-context

        definition:  next:  https://stackoverflow.com/questions/10695629/what-is-the-parameter-next-used-for-in-express

            http://expressjs.com/en/starter/static-files.html
    3) JSON is parsing the string data

    4) telling the application to respond to request

*/
const express = require('express');  //1
const app = express();               //1

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/static', express.static(path.join(__dirname, 'public')))

var fs = require("fs");
const dataFile = fs.readFileSync('data.json', 'utf8');
const dataJson = JSON.parse(dataFile);

app.get('/', (req, res, next) => {
    try
    {
    res.send(dataJson);
    }
    catch (e) {
        next(new Error('Request could not be fulfilled'));
    }
});

app.get('/about', (req, res, next) => {
    try
    {
    res.locals.name = "Yvonne Martinez";
    res.locals.title = "Full Stack JavaScript Developer.";
    res.locals.pitch = "I like to climb on things. I like to party.";
    res.locals.skill1 = "Chat";
    res.locals.skill2 = "Subscribe";
    res.locals.skill3 = "Stab";
    res.locals.skill4 = "Dance";
    res.locals.skill5 = "Gutpunch";
    res.locals.skill6 = "Hadouken";

    res.locals.linkedin_url = "yeah right.";
    res.locals.github_url = "no";
    res.locals.twitter_url = "whatever";

    res.locals.phone = "(201) 933-3495";
    res.locals.email = "admin@yvonne-new.com";

    res.render('about');
    }
    catch (e) {
        next(new Error('Request could not be fulfilled'));
    }
});

app.get('/projects/:id', (req, res, next) => {
    try
    {
        res.send("You are asking for id#" + req.params.id);
    }
    catch (e) {
        next(new Error('Request could not be fulfilled'));
    }
});

//error route: reached from any of the three above
//in the event of a runtime error
app.use((err, req, res, next) => {
    console.log(err);    
    if(!res.headersSent){
      res.status(500).send(err.message);
    }
  });

  //default route - respond to anything besides the three above
//with HTTP 404
app.use((req, res, next) => {
    console.log("Requested route is undefined.");
    res.sendStatus(404);
});

const portNumber = 3000;
app.listen(portNumber);
console.log("App started on localhost at port " + portNumber);



