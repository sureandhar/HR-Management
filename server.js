const path = require("path");
const express = require("express");
const app = express();
//for app name angular.json->output path
app.use(express.static(__dirname + '/DhrmsApp'));
app.get('/*', function(req,res){
res.sendFile(path.join(__dirname, 'DhrmsApp', 'index.html'))
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);