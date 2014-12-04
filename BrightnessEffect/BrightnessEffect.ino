#include "SPI.h" // Comment out this line if using Trinket or Gemma
#include "Adafruit_WS2801.h"
#ifdef __AVR_ATtiny85__
#include <avr/power.h>
#endif

uint8_t dataPin  = 2;    // geel draad
uint8_t clockPin = 3;    // wit draad
int numPixels = 59;
int y = 24;  // staart lengte

Adafruit_WS2801 strip = Adafruit_WS2801(numPixels, dataPin, clockPin);

class RunningLed
{
  public:
    int counter = 0;
    int c = 0;

    void gaOmhoog() {
      for (counter; counter < strip.numPixels(); counter++)
      {

        strip.setPixelColor(counter, 255, 255, 255);

        for (int j = 1; j < y ; j++) {
          c = 255 / ( j*3);
          strip.setPixelColor(counter - j, c, c, c);
        }

        strip.show();
        delay(5);
        if (counter == numPixels - 1) {
          gaOmlaag();
        }
      }
    }

    void gaOmlaag() {
      for (counter; counter >= 0; counter--)
      {

        strip.setPixelColor(counter, 255, 255, 255);

        for (int j = 1; j < y ; j++) {
          c = 255 / (pow(2, j));
          strip.setPixelColor(counter + j, c, c, c);
        }

        strip.show();
        //delay(5);
        if (counter == 0) {
          gaOmhoog();
        }
      }
    }

};





RunningLed *rl1 = new RunningLed();
RunningLed *rl2 = new RunningLed();
void setup() {
  Serial.begin(9600);
  // put your setup code here, to run once:
#if defined(__AVR_ATtiny85__) && (F_CPU == 16000000L)
  clock_prescale_set(clock_div_1); // Enable 16 MHz on Trinket
#endif
  strip.begin();
  // Update LED contents, to start they are all 'off'
  strip.show();
  
  

}

void loop() {

  //for(int x = 0; x<y+2; x++){
  //  strip.setPixelColor(numPixels-x, 0, 0, 0);
  //}
  
  rl1->gaOmhoog();

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
