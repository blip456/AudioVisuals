var path = require('path');
var PythonShell = require('python-shell');
var http = require('http');
var express = require('express');
var app = express();
var arrPackageNames = [];
var options = {
  scriptPath: path.join(__dirname, 'scr')
};
app.use(express['static'](__dirname));

// Led Grid
var ws281x = require("rpi-ws281x-native");
var NUM_LEDS = parseInt(process.argv[2], 50) || 50,
pixelData = new Uint32Array(NUM_LEDS),
notifyPixels = new Array(NUM_LEDS+1);
ws281x.init(NUM_LEDS);
// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});
noNotify();

// Ledstrip
var leds = require('rpi-ws2801');
var numLEDSStrip = 59;
leds.connect(numLEDSStrip); // assign number of WS2801 LEDs
process.on( 'SIGINT', function() {
  console.log( "\nshutting down from (Ctrl-C)" )
  leds.clear(); 
  leds.disconnect();
  process.exit( )
})
leds.fill(0xFF, 255, 0x00);
  //TODO: OProepen functie
  setInterval(function(){  
  //check which function to run
  // if(runningleds){
  //   runningleds();
  //   delay(delayRunning);
  // }
  runningLeds();
},5);

//randomAnimation vars
var colorBuffer = new Buffer(leds.getChannelCount());
var animationTick = 0.005;
var angle = 0;
var ledDistance = 0.3;

function randomAnimation(){
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
}

//runningleds vars
var staart = 8;
var delayRunning = 5;
var counter = 0;
var c = 0;
var led;

var colors = new Array(3)
for (var i = 0; i < 3; i++) {
  colors[i] = new Array(staart+1);
}

function runningLeds(){
  leds.setColor(0, [255,0,0]);
  giveMeMyColors();
  for (counter; counter <= numLEDSStrip; counter++){
    //1ste lus
    for (var j = staart; j >= 1 ; j--) {
      leds.setColor(counter + j, colors[0][j], colors[1][j], colors[2][j]);
    }
    leds.setColor(counter, colors[0][0], colors[1][0], colors[2][0]);

    for (var j = 1; j < staart ; j++) {
      leds.setColor(counter - j, colors[0][j], colors[1][j], colors[2][j]);
    }


    //2de lus
    for (var j = staart; j >= 1 ; j--) {
      leds.setColor((numLEDSStrip - counter) - j, colors[0][j], colors[1][j], colors[2][j]);
    }
    leds.setColor(numLEDSStrip - counter,colors[0][0], colors[1][0], colors[2][0]);

    for (var j = 1; j < staart ; j++) {
      leds.setColor((numLEDSStrip - counter) + j, colors[0][j], colors[1][j], colors[2][j]);
    }

    leds.update();
  }
  counter = 0;

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



  var isCalling = false;
  var i = 0;
  var l = arrPackageNames.length;
  setInterval(carousel, 2000);
  function carousel()
  {
    if(isCalling)
    {
     calling();
   }
   else
   {
    l = arrPackageNames.length;
    if(l === 0)
    {
      noNotify();
    }
    else
    {
      console.log(arrPackageNames + "Lengte: " + l + " Integer: " + i);
      if(arrPackageNames[i] === "com.twitter.android")        
        twitter();
      else if(arrPackageNames[i] === "com.facebook.katana")        
        facebook();
      else if(arrPackageNames[i] === "com.instagram.android")          
        instagram();
      else if(arrPackageNames[i] === "com.google.android.gm")          
        mail();
      else if(arrPackageNames[i] === "com.textra" || arrPackageNames[i] === "com.google.android.apps.messaging")          
        sms();
      else if(arrPackageNames[i] === "com.google.android.dialer")          
        calling();
      else if(arrPackageNames[i] === "be.howest.nmct.android")          
        testing();
      else if(arrPackageNames[i] === "com.facebook.orca")          
        messenger();
      else if(arrPackageNames[i] === "com.pushbullet.android")          
        facebook();
      if(i === l-1)
        i = 0;
      else
        i ++;
    }
  }
}
// ---- animation-loop
//uncomment when it is possible to acces an function inthe running code.
setInterval(drawLEDs,1000/30);
//drawLEDs();
var offset = 0;
function drawLEDs() {
  if(notifyPixels[0] == true){
    for (var i = 0; i < NUM_LEDS; i++) {
      pixelData[i] = colowheel((offset + i) % 256);
    }
    offset = (offset + 1) % 256;
  }else{
    for (var i = 0; i < NUM_LEDS; i++) {
      if(notifyPixels[i+1]==true)
        pixelData[i] = notifyPixels[0];
      else if(notifyPixels[i+1]===false){
        pixelData[i] = rgb2Int(255,255,255);
      }
      else{
        pixelData[i] = notifyPixels[i+1];
      }
    }
  }
  
  ws281x.render(pixelData);
}
function noNotify(){
  notifyPixels[0] = true;
}

function mail(){
  for (var i = 1; i < notifyPixels.length; i++) {
    notifyPixels[i]=rgb2Int(0,0,0);
  };
  for (var i = 2; i < 10; i++) {
    notifyPixels[i] = true;
  };
  for (var i = 42; i < 50; i++) {
    notifyPixels[i] = true;
  };
  notifyPixels[12] = true;
  notifyPixels[19] = true;
  notifyPixels[22] = true;
  notifyPixels[25] = true;
  notifyPixels[26] = true;
  notifyPixels[29] = true;
  notifyPixels[39] = true;
  notifyPixels[37] = true;
  notifyPixels[34] = true;
  notifyPixels[32] = true;
  notifyPixels[0] = rgb2Int(255,0,0);
}

function messenger(){
  for (var i = 1; i < notifyPixels.length; i++) {
    notifyPixels[i]=true;
  };
  for (var i = 23; i < 29; i++) {
    notifyPixels[i] = false;
  };
  notifyPixels[4] = false;
  notifyPixels[10] = false;
  notifyPixels[12] = false;
  notifyPixels[13] = false;
  notifyPixels[16] = false;
  notifyPixels[17] = false;
  notifyPixels[18] = false;
  notifyPixels[33] = false;
  notifyPixels[34] = false;
  notifyPixels[35] = false;
  notifyPixels[38] = false;
  notifyPixels[39] = false;
  notifyPixels[41] = false;
  notifyPixels[47] = false;

  notifyPixels[0]=rgb2Int(0,0,255);
}

function twitter(){
  for (var i = 1; i < notifyPixels.length; i++) {
    notifyPixels[i]=true;
  };
  for (var i = 43; i < 49; i++) {
    notifyPixels[i] = false;
  };
  for (var i = 33; i < 39; i++) {
    notifyPixels[i] = false;
  };
  notifyPixels[36] = false;
  notifyPixels[35] = false;
  notifyPixels[26] = false;
  notifyPixels[25] = false;
  notifyPixels[16] = false;
  notifyPixels[15] = false;
  notifyPixels[6] = false;
  notifyPixels[5] = false;

  notifyPixels[0]=rgb2Int(0,0,120);
}

function facebook(){
  for (var i = 1; i < notifyPixels.length; i++) {
    notifyPixels[i]=true;
  };
  notifyPixels[6] = false;
  notifyPixels[15] = false;
  notifyPixels[25] = false;
  notifyPixels[26] = false;
  notifyPixels[35] = false;
  notifyPixels[44] = false;
  notifyPixels[45] = false;
  notifyPixels[46] = false;
  notifyPixels[0]=rgb2Int(0,0,255);
}

function sms(){
  for (var i = 1; i < notifyPixels.length; i++) {
    notifyPixels[i] = true
  };
  for (var i = 43; i < 49; i++) {
    notifyPixels[i] = false;
  };
  for(var i = 13; i < 17;i++){
    notifyPixels[i] = false;
  }
  notifyPixels[4] = false;
  notifyPixels[18] = false;
  notifyPixels[23] = false;
  notifyPixels[38] = false;
  notifyPixels[28] = false;
  notifyPixels[33] = false;
  notifyPixels[0]=rgb2Int(0,0,0);
}

function instagram(){
  for (var i = 1; i < notifyPixels.length; i++) {
    notifyPixels[i] = rgb2Int(0,30,60);
  };
  for (var i = 43; i < 50; i++) {
    notifyPixels[i] = true;
  };
  for (var i = 3; i < 10; i++) {
    notifyPixels[i] = true;
  };
  notifyPixels[12] = true;
  notifyPixels[29] = true;
  notifyPixels[32] = true;
  notifyPixels[38] = true;
  notifyPixels[23] = true;
  notifyPixels[18] = true;
  
  notifyPixels[15] = true;
  notifyPixels[27] = true;
  notifyPixels[25] = true;
  notifyPixels[35] = true;

  notifyPixels[0]=rgb2Int(60,30,0);
}

function calling(){
  for (var i = 1; i < notifyPixels.length; i++) {
    notifyPixels[i] = true
  };

  for(var i = 23; i < 29;i++){
    notifyPixels[i] = false;
  }
  for(var i = 34; i < 38;i++){
    notifyPixels[i] = false;
  }
  notifyPixels[2] = false;
  notifyPixels[3] = false;
  notifyPixels[8] = false;
  notifyPixels[9] = false;
  notifyPixels[12] = false;
  notifyPixels[13] = false;
  notifyPixels[18] = false;
  notifyPixels[19] = false;
  notifyPixels[0]=rgb2Int(0,0,0);
}

function testing(){
  for (var i = 1; i < notifyPixels.length; i++) {
    notifyPixels[i] = true
  };
  notifyPixels[0]=colowheel(Math.floor(Math.random() * 256));

  for (var i = 21; i < 31; i++) {
    notifyPixels[i] = false;
  };  
}

// rainbow-colors, taken from http://goo.gl/Cs3H0v
function colowheel(pos) {
  pos = 255 - pos;
  if (pos < 85) { return rgb2Int(255 - pos * 3, 0, pos * 3); }
  else if (pos < 170) { pos -= 85; return rgb2Int(0, pos * 3, 255 - pos * 3); }
  else { pos -= 170; return rgb2Int(pos * 3, 255 - pos * 3, 0); }
}

function rgb2Int(r, g, b) {
  return ((g & 0xff) << 16) + ((r & 0xff) << 8) + (b & 0xff);
}


app.get('/twitter', function (req, res) {
  twitter();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Twitter turned on');
});
app.get('/facebook', function (req, res) {
  facebook();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Facebook turned on');
});
app.get('/messenger', function (req, res) {
  messenger();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Messenger turned on');
});
app.get('/instagram', function (req, res) {
  instagram();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Instagram turned on');
});
app.get('/gmail', function (req, res) {
  mail();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Gmail turned on');
});
app.get('/sms', function (req, res) {
  sms();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('SMS turned on');
});
app.get('/call', function (req, res) {
  calling();
  isCalling = true;    
  res.send('Call turned on');
});
app.get('/pushbullet', function (req, res) {
  testing();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Pushbullet turned on');
});
app.get('/test', function (req, res) {
  testing();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Mirari turned on');
  console.log(arrPackageNames);
});
app.get('/clear', function (req, res) {
  console.log(req.query.packagename);
  if(req.query.packagename === undefined)
  {
    noNotify();
    res.send('Please provide us with a package name');
  }
  else
  {		
    i = 0;
    var j = arrPackageNames.indexOf(req.query.packagename);
    if(j != -1) 
    {
      arrPackageNames.splice(j, 1);
    }
    res.send('Notification is cleared and package name is deleted from array');
  }
  console.log(arrPackageNames);
});
// Express route for incoming requests for a customer name app.get('/inputs/:id', function(req, res){ res.send(inputs[req.params.id]); });   // Express route for any other unrecognised incoming requests app.get('*', function(req, res){ res.send('Unrecognised API call', 404); });  // Express route to handle errors app.use(function(err, req, res, next){ if (req.xhr) { res.send(500, 'Oops, Something went wrong!'); } else { next(err); } });
app.listen(3000);
console.log('App Server running at port 3000');
