#include <Adafruit_NeoPixel.h>

#define PIN 6



int numPixelsGrid=50;
Adafruit_NeoPixel grid = Adafruit_NeoPixel(numPixelsGrid,PIN, NEO_RGB+ NEO_KHZ800);



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

void setup() {
  grid.begin();
  grid.show();
  countdown = 0;
}

 void loop() {
	//START SPOOKY EYES
	spookyEyes();
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
uint32_t Color(byte r, byte g, byte b){
	uint32_t c;
	c = r;
	c <<= 8;
	c |= g;
	c <<= 8;
	c |= b;
	return c;
}


