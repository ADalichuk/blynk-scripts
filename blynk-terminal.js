var Blynk = require('blynk-library');

var AUTH = 'd363e570a1664e398a72a591276cd965';

var blynk = new Blynk.Blynk(AUTH);

var term = new blynk.WidgetTerminal(10);
term.on('write', function(data) {
  term.write('You wrote:' + data + '\n');
  blynk.notify("HAHA! " + data);
});
