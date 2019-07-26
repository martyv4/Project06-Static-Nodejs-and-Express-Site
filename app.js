/*
    1) First step is to establish the express application
        require means include (we are drawing it from somewhere else)
        https://expressjs.com/en/4x/api.html#res.send
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
// Step 1 create an express app
const express = require('express');  
const app = express();               //1

const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//This is middleware to access the public folder via route /static
app.use('/static', express.static(path.join(__dirname, 'public')))

var fs = require("fs");
const dataFile = fs.readFileSync('data.json', 'utf8');
const dataJson = JSON.parse(dataFile);

// define route for main page at /
app.get('/', (req, res, next) => {
    try
    {
        res.locals.heading = 'My Portfolio';
        res.locals.portfolioDescription = 'Hello my name is Yvonne Martinez, here are some samples of some of my application working using JavaScript and jQuery.';
        res.locals.dataJson = dataJson;
        
        res.render('index');
    //res.send(dataJson);
    }
    catch (e) {
        next(new Error('Request could not be fulfilled'));
    }
});

// define route for About page at /about
app.get('/about', (req, res, next) => {
    //Go through this code and catch any errors
    try
    {
        res.locals.name = "Yvonne Martinez";
        res.locals.title = "Full Stack JavaScript Developer.";
        res.locals.pitch = "I enjoy learning new applications, working with my colleagues and solving problems.";
        res.locals.skill1 = "Learning Management Systems";
        res.locals.skill2 = "Web Development";
        res.locals.skill3 = "Oracle and Microsoft SQL Server";
        res.locals.skill4 = "SharePoint";
        res.locals.skill5 = "Camtasia";
        res.locals.skill6 = "Microsoft Office Suite";

        res.locals.linkedin_url = "http://linkedin.com/";
        res.locals.github_url = "http://github.com/martyv4";
        res.locals.twitter_url = "http://twitter.com/";

        res.locals.phone = "(646) 111-1111";
        res.locals.email = "admin@yvonne-new.com";

        //Find a pug file named about.pug and use to render the page content
        res.render('about');
    }
    //Catch the error
    catch (e) {
        next(new Error('Request could not be fulfilled'));
    }
});

// define route for view Project page at /projects/:id
app.get('/projects/:id', (req, res, next) => {
    try
    {
        //console.log(dataJson.projects[parseInt(req.params.id)]);
        res.locals.project = dataJson.projects[parseInt(req.params.id)]; //param ID is string, have to cast as int
        res.render('project');
        //res.send("You are asking for id#" + req.params.id);
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

//default route - respond to anything besides the four above
//with HTTP 404
app.use((req, res, next) => {
    console.log("Requested route is undefined.");
    res.sendStatus(404);
});

const portNumber = 3000;
app.listen(portNumber);
console.log("App started on localhost at port " + portNumber);



