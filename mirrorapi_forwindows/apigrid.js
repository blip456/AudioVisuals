var http = require('http');
var express = require('express');
var app = express();
var arrPackageNames = [];

app.get('/twitter', function (req, res) {
    //twitter();
    if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
    res.send('Twitter turned on');
});
app.get('/facebook', function (req, res) {
    //facebook();
    if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
    res.send('Facebook turned on');
});
app.get('/messenger', function (req, res) {
    //messenger();
    if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
    res.send('Messenger turned on');
});
app.get('/instagram', function (req, res) {
    //instagram();
    if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
    res.send('Instagram turned on');
});
app.get('/gmail', function (req, res) {
    //mail();
    if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
    res.send('Gmail turned on');
});
app.get('/sms', function (req, res) {
    //sms();
    if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
    res.send('SMS turned on');
});
app.get('/call', function (req, res) {
    //calling();
    if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
    res.send('Call turned on');
});
app.get('/pushbullet', function (req, res) {
    //testing();
    if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
    res.send('Pushbullet turned on');
});
app.get('/test', function (req, res) {
    //testing();
    console.log('Testing');
    if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
    res.send('Mirari turned on');
  console.log(arrPackageNames);
});
app.get('/clear', function (req, res) {
  console.log(req.query.packagename);
	if(req.query.packagename === undefined)
	{
    //noNotify();
		res.send('Please provide us with a package name');
	}
	else
	{		
    var i = arrPackageNames.indexOf(req.query.packagename);
    if(i != -1) 
    {
      arrPackageNames.splice(i, 1);
    }
    res.send('Notification is cleared and package name is deleted from array');
  }
  console.log(arrPackageNames);
});
// Express route for incoming requests for a customer name app.get('/inputs/:id', function(req, res){ res.send(inputs[req.params.id]); });   // Express route for any other unrecognised incoming requests app.get('*', function(req, res){ res.send('Unrecognised API call', 404); });  // Express route to handle errors app.use(function(err, req, res, next){ if (req.xhr) { res.send(500, 'Oops, Something went wrong!'); } else { next(err); } });
app.listen(3000);
console.log('App Server running at port 3000');
