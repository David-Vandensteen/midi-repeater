import { easymidi, MidiRepeater } from '#src/index';

const { log } = console;

const midiDeviceIn = process.env.MIDI_DEVICE_IN ?? 'Gestionnaire IAC Bus 1';
const midiDeviceOut = process.env.MIDI_DEVICE_OUT ?? 'Gestionnaire IAC Bus 2';

log('available inputs');
log(easymidi.getInputs());

log('available outputs');
log(easymidi.getOutputs());

const application = new MidiRepeater(
  new easymidi.Input(midiDeviceIn),
  new easymidi.Output(midiDeviceOut),
  { emit: true },
);

application.on('data', (message) => {
  log('data incoming', message);
});
