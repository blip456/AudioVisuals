var http = require('http');
var express = require('express');
var app = express();
var arrPackageNames = [];

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
    else if(arrPackageNames[i] === "com.textra" || arrPackageNames[i] === "com.android.mms" || arrPackageNames[i] === "com.google.android.apps.messaging")          
      sms();
    else if(arrPackageNames[i] === "com.google.android.dialer" || arrPackageNames[i] === "com.android.incallui")          
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

setInterval(drawLEDs,1000/30);
var offset = 0;
function drawLEDs()
{
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

function noNotify()
{
  notifyPixels[0] = true;
}

function mail()
{
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

function messenger()
{
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

function twitter()
{
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

function facebook()
{
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

function sms()
{
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

function instagram()
{
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

function calling()
{
  for (var i = 1; i < notifyPixels.length; i++) {
    notifyPixels[i] = true
  };

  for(var i = 33; i < 39;i++){
    notifyPixels[i] = false;
  }
  for(var i = 43; i < 49;i++){
    notifyPixels[i] = false;
  }
  notifyPixels[2] = false;
  notifyPixels[1] = false;
  notifyPixels[9] = false;
  notifyPixels[10] = false;
  notifyPixels[12] = false;
  notifyPixels[11] = false;
  notifyPixels[20] = false;
  notifyPixels[19] = false;
  notifyPixels[28] = false;
  notifyPixels[29] = false;
  notifyPixels[22] = false;
  notifyPixels[23] = false;
  notifyPixels[0]=rgb2Int(0,0,0);
}

function testing()
{
  for (var i = 1; i < notifyPixels.length; i++) {
    notifyPixels[i] = true
  };
  notifyPixels[0]=colowheel(Math.floor(Math.random() * 256));

  for (var i = 21; i < 31; i++) {
    notifyPixels[i] = false;
  };  
}

// rainbow-colors, taken from http://goo.gl/Cs3H0v
function colowheel(pos) 
{
  pos = 255 - pos;
  if (pos < 85) { return rgb2Int(255 - pos * 3, 0, pos * 3); }
  else if (pos < 170) { pos -= 85; return rgb2Int(0, pos * 3, 255 - pos * 3); }
  else { pos -= 170; return rgb2Int(pos * 3, 255 - pos * 3, 0); }
}

function rgb2Int(r, g, b) 
{
  return ((g & 0xff) << 16) + ((r & 0xff) << 8) + (b & 0xff);
}

function CheckVibrate(qry)
{
	if(qry.vibrate !== undefined)
	{
		if(qry.vibrate === "true")
		{
			doVibrate();
		}
	}
}
var piblaster = require("pi-servo-blaster.js");
function doVibrate(){

  piblaster.setServoPwm(0, 89);
  piblaster.setServoPwm(1, 86);
  piblaster.setServoPwm(3, 85);
  piblaster.setServoPwm(4, 110);

  pausecomp(50);
  piblaster.setServoPwm(0, 90);
  piblaster.setServoPwm(1, 85);
  piblaster.setServoPwm(3, 86);
  piblaster.setServoPwm(4, 82);
  pausecomp(50);
  piblaster.setServoPwm(0, 0); 
  piblaster.setServoPwm(1, 0);
  piblaster.setServoPwm(3, 0);
  piblaster.setServoPwm(4, 0);

}
function pausecomp(ms) {
  ms += new Date().getTime();
  while (new Date() < ms){}

} 

// API
app.get('/twitter', function (req, res) {
	CheckVibrate(req.query);
  twitter();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Twitter turned on');
});
app.get('/facebook', function (req, res) {
	CheckVibrate(req.query);
  facebook();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Facebook turned on');
});
app.get('/messenger', function (req, res) {
	CheckVibrate(req.query);
  messenger();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Messenger turned on');
});
app.get('/instagram', function (req, res) {
	CheckVibrate(req.query);
  instagram();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Instagram turned on');
});
app.get('/gmail', function (req, res) {
	CheckVibrate(req.query);
  mail();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Gmail turned on');
});
app.get('/sms', function (req, res) {
	CheckVibrate(req.query);
  sms();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('SMS turned on');
});
app.get('/call', function (req, res) {
	CheckVibrate(req.query);
  calling();
  isCalling = true;    
  res.send('Call turned on');
});
app.get('/pushbullet', function (req, res) {
	CheckVibrate(req.query);
  testing();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Pushbullet turned on');
});
app.get('/test', function (req, res) {
	CheckVibrate(req.query);
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
  else if(arrPackageNames[i] === "com.google.android.dialer" || arrPackageNames[i] === "com.android.incallui")          
    isCalling = false;
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

app.listen(3000);
console.log('Grid Server running at port 3000');