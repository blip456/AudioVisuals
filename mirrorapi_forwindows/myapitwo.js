var path = require('path');
var PythonShell = require('python-shell');
var http = require('http');
var express = require('express');
var app = express();
var inputs = [{
    pin: '11',
    gpio: '17',
    value: 1
}, {
    pin: '12',
    gpio: '18',
    value: 0
}];
	var options = {
	scriptPath: path.join(__dirname,'scr')
};
    app.use(express['static'](__dirname));

	app.get('/facebook',function(req,res){
		//voer script uit
		var leds = require('rpi-ws2801');

// connecting to Raspberry Pi SPI
leds.connect(59); // assign number of WS2801 LEDs

// disconnect on Ctrl-C (not necessary but we will play nice)
process.on( 'SIGINT', function() {
  console.log( "\nshutting down from (Ctrl-C)" )
  // clear LED stripe and close conection to SPI
  leds.clear(); 
  leds.disconnect();
  process.exit( )
})
  
// set all colors to yellow
console.log("fill all yellow");
// fill(r, g, b)
// r, g, b: value as hex (0x00 = 0, 0xFF = 255, 0x7F = 127)
leds.fill(0xFF, 255, 0x00);
  
// after 2 seconds set first 6 LEDs to (red, green, blue, red, green, blue)
setTimeout(function(){
  console.log("red green blue red green blue");
  // setRGB(ledIndex, hexColor);
  // ledIndex: 0 = LED1, 1 = LED2, â€¦
  // hexColor: '#FF0000' = red, '#00FF00' = green, ...
  leds.setRGB(0, '#FF0000');    // set LED1 to red
  leds.setRGB(1, '#00FF00');    // set LED2 to green
  leds.setRGB(2, '#0000FF');    // set LED3 to blue
 
  // setColor(ledIndex, color);
  // ledIndex: 0 = LED1, 1 = LED2, â€¦
  // color: array[red, green, blue] = [255,0,0] = red, [0,255,0] = green
  leds.setColor(3, [255,0,0]);  // set LED4 to red
  leds.setColor(4, [0,255,0]);  // set LED5 to green
  leds.setColor(5, [0,0,255]);  // set LED6 to blue
  
  // send all set colors to SPI via update();
  leds.update();
}, 2000);

// after 4 seconds start random color animation
setTimeout(randomAnimation, 4000);

function randomAnimation(){
  console.log("-- random color animation --");
  console.log("press (Ctrl-C) to stop");  
  var colorBuffer = new Buffer(leds.getChannelCount());
  var animationTick = 0.005;
  var angle = 0;
  var ledDistance = 0.3;
  setInterval(function(){
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

		
		res.send('facebook message shown');
});
// Express route for incoming requests for a customer name app.get('/inputs/:id', function(req, res){ res.send(inputs[req.params.id]); });   // Express route for any other unrecognised incoming requests app.get('*', function(req, res){ res.send('Unrecognised API call', 404); });  // Express route to handle errors app.use(function(err, req, res, next){ if (req.xhr) { res.send(500, 'Oops, Something went wrong!'); } else { next(err); } });
app.listen(3000);
console.log('App Server running at port 80');

