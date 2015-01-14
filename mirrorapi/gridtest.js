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

testing();
//uncomment when it is possible to acces an function inthe running code.
//setInterval(drawLEDs,1000/30);
drawLEDs();
// ---- animation-loop
function drawLEDs() {
  for (var i = 0; i < NUM_LEDS; i++) {
    if(notifyPixels[i+1]==true)
      pixelData[i] = notifyPixels[0];
    else if(notifyPixels[i+1]==false){
      pixelData[i] = rgb2Int(255,255,255);
    }
    else{
      pixelData[i] = notifyPixels[i+1];
    }
  }
  ws281x.render(pixelData);
}


function mail(){
  for (var i = 1; i < notifyPixels.length; i++) {
    notifyPixels[i]=rgb2Int(120,120,120);
  };
  for (var i = 3; i < 9; i++) {
    notifyPixels[i] = true;
  };
  for (var i = 43; i < 49; i++) {
    notifyPixels[i] = true;
  };
  notifyPixels[13] = true;
  notifyPixels[18] = true;
  notifyPixels[23] = true;
  notifyPixels[25] = true;
  notifyPixels[26] = true;
  notifyPixels[28] = true;
  notifyPixels[38] = true;
  notifyPixels[37] = true;
  notifyPixels[34] = true;
  notifyPixels[33] = true;
  notifyPixels[0] = rgb2Int(255,0,0);
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

console.log('Press <ctrl>+C to exit.');


// rainbow-colors, taken from http://goo.gl/Cs3H0v
function colowheel(pos) {
  pos = 255 - pos;
  if (pos < 85) { return rgb2Int(255 - pos * 3, 0, pos * 3); }
  else if (pos < 170) { pos -= 85; return rgb2Int(0, pos * 3, 255 - pos * 3); }
  else { pos -= 170; return rgb2Int(pos * 3, 255 - pos * 3, 0); }
}

function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}