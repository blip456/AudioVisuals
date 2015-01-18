var http = require('http');
var express = require('express');
var app = express();


app.get('/effect', function (req, res) {
    if(req.query.effectname !== undefined)
    {
        switch(req.query.effectname){
            case 'Screensaver':
                console.log('Screensaver executed');
                res.send('screensaver turned on');
                //randomAnimation();
                break;
            case 'RotatingPyramids':
                console.log("RotatingPyramids");
                res.send('pyramids turned on');
      //    RotatingPyramids();
                break;
            case 'SpookyEyes':            
                console.log("Spooky");
                res.send('spooky turned on');
                //SpookyEyes()
                break;
            default:
                //randomAnimation();
                break;
        }
    }
    else
        console.log('Random animation');
        //randomAnimation();
        
});

app.listen(2000);
console.log('Strip Server running at port 2000');