var Blynk = require('blynk-library');

var AUTH = 'd363e570a1664e398a72a591276cd965';

var blynk = new Blynk.Blynk(AUTH);

var powerOnOff = new blynk.VirtualPin(5);
var inflowFan = new blynk.VirtualPin(0);
var outflowFan = new blynk.VirtualPin(1);
var fanSpeedControl = new blynk.VirtualPin(2);
var presetCO2Level = new blynk.VirtualPin(6);
var actualCO2Level = new blynk.VirtualPin(7);
var isPowerOn = 0;
var presetFanSpeed = 50;
var curInflowFanSpeed = 0;
var curOutflowFanSpeed = 0;
var acceptableCO2Level = 10; // %
var currentCO2Level = 0; // %
var forceFan = false;

function UpdateFanSpeed()
{
  if (1 == isPowerOn)
  {
    curInflowFanSpeed = presetFanSpeed;
    curOutflowFanSpeed = presetFanSpeed;
    if (true == forceFan)
    {
        curInflowFanSpeed = 100;
        curOutflowFanSpeed = 100;
	currentCO2Level--;
    }
  }
  else
  {
    curInflowFanSpeed = 0;
    curOutflowFanSpeed = 0;
  }    
}

powerOnOff.on('write', function(param){
  isPowerOn = param[0];
  console.log('Power:', isPowerOn);
  UpdateFanSpeed();
})

fanSpeedControl.on('write', function(param) {
    presetFanSpeed = param[0];
    UpdateFanSpeed();
});

presetCO2Level.on('write', function(param) {
    currentCO2Level = param[0];
});

// Automatically check and supress CO2 level every 2 seconds
setInterval(function() {

    if (acceptableCO2Level < currentCO2Level)
    {
        console.log('Reducing CO2 level:');
        forceFan = true;
    }
    else
    {
        forceFan = false;
    }
    UpdateFanSpeed();
    console.log('InflowFan:', curInflowFanSpeed + '%');
    console.log('OutflowFan:', curOutflowFanSpeed + '%');
    console.log('CO2:', currentCO2Level + '%');
    inflowFan.write(curInflowFanSpeed);
    outflowFan.write(curOutflowFanSpeed);
    actualCO2Level.write(currentCO2Level);
}, 2000);


