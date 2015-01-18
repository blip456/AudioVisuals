// Ledstrip
var leds = require('rpi-ws2801');
var numPixels= 59;
leds.connect(numPixels); // assign number of WS2801 LEDs
process.on( 'SIGINT', function() {
  console.log( "\nshutting down from (Ctrl-C)" )
  leds.clear(); 
  leds.disconnect();
  process.exit( )
});

var intervalID;
var workingEffect = "nothing";

//randomAnimation();
function randomAnimation(){
  workingEffect = "randomAnimation";
  var colorBuffer = new Buffer(leds.getChannelCount());
  var animationTick = 0.005;
  var angle = 0;
  var ledDistance = 0.3;
  intervalID = setInterval(function(){
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
}

//runningleds vars
var staart = 8;
var delayRunning = 5;
var counter = 0;

var colors = new Array(3)
for (var i = 0; i < 3; i++) {
  colors[i] = new Array(staart+1);
}

function runningLeds(){

  workingEffect = "runningLeds";
  giveMeMyColors();
  for (counter; counter <= numPixels; counter++){
    //1ste lus
    for (var j = staart; j >= 1 ; j--) {
      leds.setColor(counter + j,[ colors[0][j], colors[1][j], colors[2][j]]);
    }
    leds.setColor(counter, [colors[0][0], colors[1][0], colors[2][0]]);

    for (var j = 1; j < staart ; j++) {
      leds.setColor(counter - j, [colors[0][j], colors[1][j], colors[2][j]]);
    }

    //2de lus
    for (var j = staart; j >= 1 ; j--) {
      leds.setColor((numPixels - counter) - j, [colors[0][j], colors[1][j], colors[2][j]]);
    }
    leds.setColor(numPixels - counter,[colors[0][0], colors[1][0], colors[2][0]]);

    for (var j = 1; j < staart ; j++) {
      leds.setColor((numPixels - counter) + j, [colors[0][j], colors[1][j], colors[2][j]]);
    }
    leds.update();
    pausecomp(50);
  }
  counter = 0;
  if(goLeds)
    requestAnimationFrame(runningLeds);
}

function pausecomp(ms) {
  ms += new Date().getTime();
  while (new Date() < ms){}

} 

function giveMeMyColors() {


  //generate rgb color
  var color = new Array(3);
  for (var i = 0; i < 3; i++) {
    color[i] = Math.floor(Math.random() * (256));
  }
  //opvullen colors array
  for (var j = 0; j <= 2; j++) {

    var intensity = 255;

    colors[j][0] = map(color[j], 0, 255, 0, intensity);

    for (var i = 1; i <= staart; i++) {
      intensity = colors[j][0] / (Math.pow(2, i));
      colors[j][i] = map(color[j], 0, 255, 0, intensity);
    }
  }
}
function map(x, in_min, in_max, out_min, out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
var goLeds = false;
function checkAnotherGo(){
  console.log(goLeds);
  if(goLeds){
    requestAnimationFrame(runningLeds);

  }else{
    randomAnimation();
  }
}

console.log("typ 'running' for runningLeds or 'random' for randomAnimation");

process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');


process.stdin.on('data', function (text){console.log('received data:', util.inspect(text));
  if (text === 'running\n' && (workingEffect === "randomAnimation" || workingEffect === "nothing")) {
    clearInterval(intervalID);
    goLeds = true;
    checkAnotherGo();
  }else if(text === 'random\n' && (workingEffect === "runningLeds" || workingEffect === "nothing")){
    //clearTimeout(intervalID);
    goLeds = false;
    checkAnotherGo();
  }else if(text === 'i\n'){
    goLeds = false;
  }
});




