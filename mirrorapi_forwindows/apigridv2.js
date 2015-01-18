var http = require('http');
var express = require('express');
var app = express();
var arrPackageNames = [];

var isCalling = false;
var i = 0;
var l = arrPackageNames.length;
setInterval(carousel, 2000);
function carousel()
{
  if(isCalling)
  {
   //calling();
   console.log('Calling');
  }
  else
  {
    l = arrPackageNames.length;
    if(l === 0)
    {
      //noNotify();
    }
    else
    {
      console.log(arrPackageNames + "Lengte: " + l + " Integer: " + i);
      if(arrPackageNames[i] === "com.twitter.android") 
        console.log('Twitter');       
        //twitter();
      else if(arrPackageNames[i] === "com.facebook.katana")  
      console.log('face');       
        //facebook();
      else if(arrPackageNames[i] === "com.instagram.android") 
      console.log('isnt');          
        //instagram();
      else if(arrPackageNames[i] === "com.google.android.gm") 
      console.log('mail');          
        //mail();
      else if(arrPackageNames[i] === "com.textra" || arrPackageNames[i] === "com.android.mms" || arrPackageNames[i] === "com.google.android.apps.messaging")          
        console.log('sms'); 
        //sms();
      else if(arrPackageNames[i] === "com.google.android.dialer" || arrPackageNames[i] === "com.android.incallui") 
      console.log('callschanged');          
        //calling();
      else if(arrPackageNames[i] === "be.howest.nmct.android") 
      console.log('testing');          
        //testing();
      else if(arrPackageNames[i] === "com.facebook.orca")  
      console.log('messenger²');         
        //messenger();
      else if(arrPackageNames[i] === "com.pushbullet.android") 
      console.log('pushbull');          
        //facebook();
      if(i === l-1)
        i = 0;
      else
        i ++;
    }
  }
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
			//doVibrate();
		}
	}
}


function pausecomp(ms) {
  ms += new Date().getTime();
  while (new Date() < ms){}

} 

// API
app.get('/twitter', function (req, res) {
	CheckVibrate(req.query);
  //twitter();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Twitter turned on');
});
app.get('/facebook', function (req, res) {
	CheckVibrate(req.query);
  //facebook();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Facebook turned on');
});
app.get('/messenger', function (req, res) {
	CheckVibrate(req.query);
  //messenger();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Messenger turned on');
});
app.get('/instagram', function (req, res) {
	CheckVibrate(req.query);
  //instagram();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Instagram turned on');
});
app.get('/gmail', function (req, res) {
	CheckVibrate(req.query);
  //mail();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Gmail turned on');
});
app.get('/sms', function (req, res) {
	CheckVibrate(req.query);
  //sms();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('SMS turned on');
});
app.get('/call', function (req, res) {
	CheckVibrate(req.query);
  //calling();
  console.log(arrPackageNames);
  isCalling = true;    
  res.send('Call turned on');
});
app.get('/pushbullet', function (req, res) {
	CheckVibrate(req.query);
  //testing();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Pushbullet turned on');
});
app.get('/test', function (req, res) {
	CheckVibrate(req.query);
  //testing();
  if(req.query.packagename !== undefined)
    arrPackageNames.push(req.query.packagename);
  res.send('Mirari turned on');
  console.log(arrPackageNames);
});
app.get('/clear', function (req, res) {
  console.log('je hebt clear: ' +req.query.packagename);

  if(req.query.packagename === "com.google.android.dialer" ||req.query.packagename ==="com.android.incallui" || req.query.packagename ==="com.android.server.telecom")          
    isCalling = false;
  if(req.query.packagename === undefined)
  {
    //noNotify();
    res.send('please provide us a package name');
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

app.listen(3000);
console.log('Grid Server running at port 3000');