

var leds = require('rpi-ws2801');
var numPixels= 59;
leds.connect(numPixels); // assign number of WS2801 LEDs
process.on( 'SIGINT', function() {
  console.log( "\nshutting down from (Ctrl-C)" )
  leds.clear(); 
  leds.disconnect();
  process.exit( )
});

leds.setColor(0, [255,0,0]);

leds.update();