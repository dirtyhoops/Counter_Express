var express = require("express");
var session = require("express-session");
var app = express();


app.use(session({
    secret: 'denvernuggets',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 70000 }
}))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    if(req.session.page_views){
        req.session.page_views++;
    } else {
        req.session.page_views = 1;
    }
    res.render('index', {count: req.session.page_views});
})

// add 2 to the session
app.post('/addTwo', function(req, res) {
    req.session.page_views++;
    res.redirect('/');
})

//clears the session and the counter
app.post('/reset', function(req, res) {
    req.session.destroy();
    res.redirect('/');
})



app.listen(8000, function() {
    console.log("server is running");
})






