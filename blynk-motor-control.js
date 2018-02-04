var Blynk = require('blynk-library');

var AUTH = 'd363e570a1664e398a72a591276cd965';

var blynk = new Blynk.Blynk(AUTH);

var powerOnOff = new blynk.VirtualPin(5);
var inflowFan = new blynk.VirtualPin(0);
var outflowFan = new blynk.VirtualPin(1);
var fanSpeedControl = new blynk.VirtualPin(2);
var fanSpeedPreset = new blynk.VirtualPin(6);
var isPowerOn = 0;
var inflowFanSpeed = 0;
var outflowFanSpeed = 0;

powerOnOff.on('write', function(param){
  isPowerOn = param[0];
  console.log('Power:', isPowerOn);

  if (1 == isPowerOn)
  {
    inflowFan.write(inflowFanSpeed);
    outflowFan.write(outflowFanSpeed);
  }
  else
  {
    inflowFan.write(0);
    outflowFan.write(0);
  }
})

fanSpeedControl.on('write', function(param) {
  if (1 == isPowerOn)
  {
    inflowFan.write(param[0]);
    outflowFan.write(param[0]);
    inflowFanSpeed = param[0];
    outflowFanSpeed = param[0];
  }
  else
  {
    inflowMotor.write(0);
    outflowMotor.write(0);
  }
});
