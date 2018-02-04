var blynkLib = require('blynk-library');
var sensorLib = require('node-dht-sensor');
var AUTH = 'd363e570a1664e398a72a591276cd965';
// Setup Blynk
var blynk = new blynkLib.Blynk(AUTH);
// Setup sensor, exit if failed
var sensorType = 22; // 11 for DHT11, 22 for DHT22 and AM2302
var sensorPin  = 17;  // The GPIO pin number for sensor signal
if (!sensorLib.initialize(sensorType, sensorPin)) {
    console.warn('Failed to initialize sensor');
    process.exit(1);
}
// Automatically update sensor value every 2 seconds
setInterval(function() {
    var readout = sensorLib.read();
    blynk.virtualWrite(3, readout.temperature.toFixed(1));
    blynk.virtualWrite(4, readout.humidity.toFixed(1));
    
    //console.log('Temperature:', readout.temperature.toFixed(1) + 'C');
    //console.log('Humidity:   ', readout.humidity.toFixed(1)    + '%');
}, 2000);

