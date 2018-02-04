var Blynk = require('blynk-library')

var AUTH = 'd363e570a1664e398a72a591276cd965'

var blynk = new Blynk.Blynk(AUTH)

var powerOnOff = new blynk.VirtualPin(5)
var inflowFan = new blynk.VirtualPin(0)
var outflowFan = new blynk.VirtualPin(1)
var fanSpeedControl = new blynk.VirtualPin(2)
var fanSpeedPreset = new blynk.VirtualPin(6)
var isPowerOn = false
var inflowFanSpeed = 0
var outflowFanSpeed = 0

powerOnOff.on('write', function(param){
  isPowerOn = Boolean(param[0])
  if (isPowerOn)
  {
    inflowMotor.write(inflowFanSpeed)
    outflowMotor.write(outflowFanSpeed)
    return
  }
  inflowMotor.write(0)
  outflowMotor.write(0)
})

motorPowerControl.on('write', function(param) {
  if (isPowerOn)
  {
    inflowMotor.write(param[0])
    outflowMotor.write(param[0])
    inflowFanSpeed = param[0]
    outflowFanSpeed = param[0]
  }
  else
  {
    inflowMotor.write(0);
    outflowMotor.write(0);
  }
});
