var express = require('express');
var app = express();

var webpack;
var webpackConfig;
var compiler;


app.use(function(req, res, next) {
    if (req.url.length >= 8 && req.url.substring(0, 8) === '/git/log') {
        res.statusCode = 200;
        var limit = isNaN(req.query.limit) ? 5 : Number(req.query.limit);
        var git = require('./src/lib/js/git-rev/git-rev');
        git.log(function(arr) {
            var history = [];
            for (var i = 0; i <= arr.length - 1; i++) {
                if (i >= limit) {
                    break;
                }
                history.push(arr[i]);
            }
            console.log(limit + " GIT history records requested " + history);
            res.send(history);
            res.end();
        });

    } else {
        next();
    }

});


app.set('port', (process.env.PORT || 5000));
// static file serve
app.use(express.static(__dirname + '/public'));
// not found in static files, so default to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));



app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
