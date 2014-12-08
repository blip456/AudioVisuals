#include "SPI.h" // Comment out this line if using Trinket or Gemma
#include "Adafruit_WS2801.h"
#ifdef __AVR_ATtiny85__
#include <avr/power.h>
#endif

#define staart 8  // staart lengte
#define delayRunning 5 //snelheid van de led kleiner is vlugger
uint8_t dataPin  = 2;    // geel draad
uint8_t clockPin = 3;    // wit draad
int numPixels = 59;


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
  //rl1->giveMeMyColors();
  delay(delayRunning);
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
