# midi-repeater

## Instal
```cmd
npm i easymidi
```
```cmd
npm i git@github.com:David-Vandensteen/midi-repeater.git#release/1.0.0
```

## Example
```javascript
import easymidi from 'easymidi';
import { MidiRepeater } from 'midi-repeater';

const { log } = console;

const midiDeviceIn = 'deviceIn';
const midiDeviceOut = 'deviceOut';

const application = new MidiRepeater(
  new easymidi.Input(midiDeviceIn),
  new easymidi.Output(midiDeviceOut),
  { emit: true },
);

application.on('data', (message) => {
  log('data incoming', message);
});
```
