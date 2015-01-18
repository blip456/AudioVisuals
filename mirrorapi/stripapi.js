var http = require('http');
var express = require('express');
var app = express();

var leds = require('rpi-ws2801');
leds.connect(59); // assign number of WS2801 LEDs
process.on( 'SIGINT', function() {
  console.log( "\nshutting down from (Ctrl-C)" )
  leds.clear(); 
  leds.disconnect();
  process.exit( )
})

randomAnimation();

function randomAnimation(){

  var colorBuffer = new Buffer(leds.getChannelCount());
  var animationTick = 0.005;
  var angle = 0;
  var ledDistance = 0.3;
  intervalIDeffect = setInterval(function(){
    angle = (angle < Math.PI * 2) ? angle : angle - Math.PI*2;
    for (var i=0; i<colorBuffer.length; i+=3){
      //red
      colorBuffer[i] = 128 + Math.sin(angle + (i/3)*ledDistance) * 128;
      //green
      colorBuffer[i+1] = 128 + Math.sin(angle * -5 + (i/3)*ledDistance) * 128;
      //blue
      colorBuffer[i+2] = 128 + Math.sin(angle * 7 + (i/3)*ledDistance) * 128;
    }
    leds.sendRgbBuffer(colorBuffer);
    angle+=animationTick;
  },5);
};

app.get('/effect', function (req, res) {
    if(req.query.effectname !== undefined)
	{
		switch(req.query.effectname){
			case 'Screensaver':
        		randomAnimation();
				break;
			case 'RotatingPyramids':
      console.log("RotatingPyramids");
          clearInterval(intervalIDeffect);
      //	RotatingPyramids();
				break;
			case 'SpookyEyes':
				//SpookyEyes()
				break;
			default:
				randomAnimation();
				break;
		}
	}
	else
		randomAnimation();
});

app.listen(2000);
console.log('Strip Server running at port 2000');