#include "SPI.h" // Comment out this line if using Trinket or Gemma
#include "Adafruit_WS2801.h"
#include <Adafruit_NeoPixel.h>
#ifdef __AVR_ATtiny85__
#include <avr/power.h>
#endif

#define staart 8  // staart lengte
#define delayRunning 5 //snelheid van de led kleiner is vlugger
#define GRIDPIN 6 //groen draad
uint8_t dataPin  = 2;    // geel draad
uint8_t clockPin = 3;    // wit draad

int numPixels = 59;

int numPixelsGrid=50;
Adafruit_NeoPixel grid = Adafruit_NeoPixel(numPixelsGrid,GRIDPIN, NEO_RGB+ NEO_KHZ800);



Adafruit_WS2801 strip = Adafruit_WS2801(numPixels, dataPin, clockPin);

class RunningLed
{
  public:
    int counter = 0;
    int c = 0;

    byte colors[3][staart+1];
    
    int led = 0;
   
    void gaOmhoog() {
      giveMeMyColors();

      for (counter; counter < strip.numPixels(); counter++)
      {

        //1ste lus

        for (int j = staart; j >= 1 ; j--) {
          
          
          strip.setPixelColor(counter + j, colors[0][j], colors[1][j], colors[2][j]);
        }


        strip.setPixelColor(counter, colors[0][0], colors[1][0], colors[2][0]);

        for (int j = 1; j < staart ; j++) {
         strip.setPixelColor(counter - j, colors[0][j], colors[1][j], colors[2][j]);
        }

        strip.show();

        //2de lus

        for (int j = staart; j >= 1 ; j--) {
          strip.setPixelColor((numPixels - counter) - j, colors[0][j], colors[1][j], colors[2][j]);
        }


        strip.setPixelColor(numPixels - counter,colors[0][0], colors[1][0], colors[2][0]);

        for (int j = 1; j < staart ; j++) {
        
          strip.setPixelColor((numPixels - counter) + j, colors[0][j], colors[1][j], colors[2][j]);
        }


        strip.show();
        delay(delayRunning);
        if (counter == numPixels - 1) {
          gaOmlaag();
        }
      }
    }

    void gaOmlaag() {
      giveMeMyColors();
      
      for (counter; counter >= 0; counter--)
      {

        //1ste lus

        for (int j = staart; j >= 1 ; j--) {
          strip.setPixelColor(counter - j, colors[0][j], colors[1][j], colors[2][j]);
        }

        strip.setPixelColor(counter, colors[0][0], colors[1][0], colors[2][0]);

        for (int j = 1; j < staart ; j++) {
        
          strip.setPixelColor(counter + j, colors[0][j], colors[1][j], colors[2][j]);
        }

        strip.show();

        //2de lus

        for (int j = staart; j >= 1 ; j--) {
          
          strip.setPixelColor((numPixels - counter) + j,colors[0][j], colors[1][j], colors[2][j]);
        }

        strip.setPixelColor(numPixels - counter, colors[0][0], colors[1][0], colors[2][0]);

        for (int j = 1; j < staart ; j++) {
         
          strip.setPixelColor((numPixels - counter) - j, colors[0][j], colors[1][j], colors[2][j]);
        }

        strip.show();
        delay(delayRunning);
      }
    }

    void giveMeMyColors() {
      //generate rgb color
      int color[3] = {
        random(0, 255),
        random(0, 255),
        random(0, 255)
      };
      //opvullen colors array
      for (int j = 0; j <= 2; j++) {
        
        int intensity = 255;
        
        colors[j][0] = map(color[j], 0, 255, 0, intensity);
        
        for (int i = 1; i <= staart; i++) {
          intensity = colors[j][0] / (pow(2, i));
          colors[j][i] = map(color[j], 0, 255, 0, intensity);
        }
      }
//      for (int j = 0; j <= 2; j++) {
//        Serial.print("color");Serial.println(j);
//        for (int i = 1; i < staart; i++) {
//          Serial.println(colors[j][i]);
//        }
//      }
    }
};


//-----------SPOOKY EYES Constants

const int maxEyes = 5; // maximum number of concurrently active blinkers

// dead-time between lighting of a range of pixels
const int deadTimeMin = 5;
const int deadTimeMax = 50;

// interval between blink starts - independent of position
const int intervalMin = 5;
const int intervalMax = 150;

const int stepInterval = 5;
long lastStep = 0;

/*****************************************************************************
Blinker Class
 
Implements a state machine which generates a blink of random duration and color.
The blink uses two adjacent pixels and ramps the intensity up, then down, with 
a random repeat now and again.
*****************************************************************************/

class blinker{
	public:

  	boolean m_active;  // blinker is in use.
  	int m_deadTime;  // don't re-use this pair immediately

  	int m_pos;  // position of the 'left' eye.  the 'right' eye is m_pos + 1

  	int m_red;  // RGB components of the color
  	int m_green;
  	int m_blue;

  	int m_increment;  // ramp increment - determines blink speed
  	int m_repeats;  // not used
  	int m_intensity;  // current ramp intensity

  	public:
  	// Constructor - start as inactive
  	blinker()
  	{
  		m_active = false;
  	}
	// Initiate a blink at the specified pixel position
  	// All other blink parameters are randomly generated
  	void startBlink(int pos){
  		m_pos = pos;

    	// Pick a random color - skew toward red/orange/yellow part of the spectrum for extra creepyness
    	m_red = 0;random(0, 255);
    	m_blue = random(0,255);
    	m_green = 0;random(0,255);

    	m_repeats += random(1, 3);

    	// set blink speed and deadtime between blinks
    	m_increment = random(1, 6);
    	m_deadTime = random(deadTimeMin, deadTimeMax);

    	// Mark as active and start at intensity zero
    	m_active = true;
    	m_intensity = 0;
    }
	// Step the state machine:
	void step(){
		if (!m_active){ 
      		// count down the dead-time when the blink is done
      		if (m_deadTime > 0)      		{
      			m_deadTime--;
      		}
      		return;
      	}

    	// Increment the intensity
    	m_intensity += m_increment;
    	if (m_intensity >= 75){  // max out at 75 - then start counting down
    		m_increment = -m_increment;
    		m_intensity += m_increment;
    	}
    	if (m_intensity <= 0){
        	// make sure pixels all are off
        	grid.setPixelColor(m_pos, Color(0,0,0));
        	grid.setPixelColor(m_pos+1, Color(0,0,0));

      		if (--m_repeats <= 0)      // Are we done?
      		{
      			m_active = false;
      		}
      		else // no - start to ramp up again
      		{
      			m_increment = random(1, 5);
      		}
      		return;
      	}

    	// Generate the color at the current intensity level
    	int r =  map(m_red, 0, 255, 0, m_intensity);
    	int g =  map(m_green, 0, 255, 0, m_intensity);
    	int b =  map(m_blue, 0, 255, 0, m_intensity);


    //	uint32_t color = Color(r, g, b);
    	// Write to both 'eyes'
    	grid.setPixelColor(m_pos, b,g,r);
    	grid.setPixelColor(m_pos +1, b,g,r);
    }
};

// An array of blinkers - this is the maximum number of concurrently active blinks
blinker blinkers[maxEyes];

// A delay between starting new blinks
int countdown;

//-----------END SPOOKY EYES Constants


RunningLed *rl1 = new RunningLed();

void setup() {
  Serial.begin(9600);
  // put your setup code here, to run once:
#if defined(__AVR_ATtiny85__) && (F_CPU == 16000000L)
  clock_prescale_set(clock_div_1); // Enable 16 MHz on Trinket
#endif
  strip.begin();
  // Update LED contents, to start they are all 'off'
  strip.show();

   grid.begin();
  grid.show();
  countdown = 0;

}

void loop() {

  //for(int x = 0; x<y+2; x++){
  //  strip.setPixelColor(numPixels-x, 0, 0, 0);
  //}
  spookyEyes();
  rl1->gaOmhoog();
  //rl1->giveMeMyColors();
  delay(delayRunning);
  
}

void spookyEyes(){
	if (millis() - lastStep > stepInterval){
		lastStep = millis();
		--countdown;
		for(int i = 0; i < maxEyes; i++){
      		// Only start a blink if the countdown is expired and there is an available blinker
      		if ((countdown <= 0) && (blinkers[i].m_active == false)){
      			int newPos = random(0, numPixelsGrid/2) * 2;

      			for(int j = 0; j < maxEyes; j++){
          			// avoid active or recently active pixels
          			if ((blinkers[j].m_deadTime > 0) && (abs(newPos - blinkers[j].m_pos) < 4)){
          				Serial.print("-");
          				Serial.print(newPos);
            			newPos = -1;  // collision - do not start
            			break;
            		}
            	}

        		if (newPos >= 0){  // if we have a valid pixel to start with...
        			Serial.print(i);
        			Serial.print(" Activate - ");
        			Serial.println(newPos);
        			blinkers[i].startBlink(newPos);  
         			countdown = random(intervalMin, intervalMax);  // random delay to next start
         		}
         	}
    		// step all the state machines
    		blinkers[i].step();
    	}
    	// update the strip
    	grid.show();
    }
}

/* Helper functions */

// Create a 24 bit color value from R,G,B
uint32_t Color(byte r, byte g, byte b)
{
  uint32_t c;
  c = r;
  c <<= 8;
  c |= g;
  c <<= 8;
  c |= b;
  return c;
}

//Input a value 0 to 255 to get a color value.
//The colours are a transition r - g -b - back to r
uint32_t Wheel(byte WheelPos)
{
  if (WheelPos < 85) {
    return Color(WheelPos * 3, 255 - WheelPos * 3, 0);
  } else if (WheelPos < 170) {
    WheelPos -= 85;
    return Color(255 - WheelPos * 3, 0, WheelPos * 3);
  } else {
    WheelPos -= 170;
    return Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
}
