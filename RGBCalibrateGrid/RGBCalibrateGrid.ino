#include "FastLED.h"


////////////////////////////////////////////////////////////////////////////////////////////////////
//
// RGB Calibration code
//
// Use this sketch to determine what the RGB ordering for your chipset should be.  Steps for setting up to use:

// * Uncomment the line in setup that corresponds to the LED chipset that you are using.  (Note that they
//   all explicitly specify the RGB order as RGB)
// * Define DATA_PIN to the pin that data is connected to.
// * (Optional) if using software SPI for chipsets that are SPI based, define CLOCK_PIN to the clock pin
// * Compile/upload/run the sketch 

// You should see six leds on.  If the RGB ordering is correct, you should see 1 red led, 2 green 
// leds, and 3 blue leds.  If you see different colors, the count of each color tells you what the 
// position for that color in the rgb orering should be.  So, for example, if you see 1 Blue, and 2
// Red, and 3 Green leds then the rgb ordering should be BRG (Blue, Red, Green).  

// You can then test this ordering by setting the RGB ordering in the addLeds line below to the new ordering
// and it should come out correctly, 1 red, 2 green, and 3 blue.
//
//////////////////////////////////////////////////

#define NUM_LEDS 50

// Data pin that led data will be written out over
#define DATA_PIN 6
// Clock pin only needed for SPI based chipsets when not using hardware SPI
//#define CLOCK_PIN 8

CRGB leds[NUM_LEDS];

void setup() {
	// sanity check delay - allows reprogramming if accidently blowing power w/leds
   	delay(2000);
   
      FastLED.addLeds<WS2811, DATA_PIN, RGB>(leds, NUM_LEDS);
}

void loop() {
    N();
   
   delay(1000);
   FastLED.showColor(CRGB::Black);
}

void N(){
   leds[9] = CRGB(220,15,65); 
   leds[10] = CRGB(220,15,65); 
   leds[29] = CRGB(220,15,65); 
   leds[30] = CRGB(220,15,65); 
   leds[49] = CRGB(220,15,65); 
   
   FastLED.show();
}
