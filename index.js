var express = require('express');
var serverStatic = require('serve-static');

var app = express();

app.use(serverStatic(__dirname));
let c = 1;

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

app.put('/test/:id', (req, res) => {

    switch (random(1, 3)) {
        case 1:
            console.log(`success ${c++}`)
            return res.header('Content-Type', 'application/json').status(200).send(req.body)
        case 2:
            console.log(`4xx ${c++}`)
            return res.header('Content-Type', 'application/json').status(404).send({})
        case 3:
            console.log(`5xx ${c++}`)
            return res.header('Content-Type', 'application/json').status(503).send({})
    }
})

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);


/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;