import { easymidi, MidiRepeater } from '#src/index';

const { log } = console;

const eventList = [
  'noteon',
  'noteoff',
  'poly aftertouch',
  'cc',
  'program',
  'channel aftertouch',
  'pitch',
  'position',
  'mtc',
  'select',
  'clock',
  'start',
  'continue',
  'stop',
  'activesense',
  'reset',
  // 'sysex',
];

log('available inputs');
log(easymidi.getInputs());

log('available outputs');
log(easymidi.getOutputs());

const run = () => {
  const in2out = new MidiRepeater(
    new easymidi.Input('nanoKONTROL Studio CTRL'),
    new easymidi.Output('IAC KORG-NKS-OUT'),
    { eventList },
  );

  const out2in = new MidiRepeater(
    new easymidi.Input('IAC KORG-NKS-IN'),
    new easymidi.Output('nanoKONTROL Studio CTRL'),
    { eventList },
  );

  return { in2out, out2in };
};

run();
