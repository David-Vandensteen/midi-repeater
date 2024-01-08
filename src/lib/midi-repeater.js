/* eslint-disable lines-between-class-members */
import EventEmitter from 'events';
import ON_DEATH from 'death';
import easymidiEventList from '#src/lib/easymidi-event-list';
import { log } from 'custom-console-log';

export default class MidiRepeater extends EventEmitter {
  #midiInInstance;
  #midiOutInstance;
  #emit;

  constructor(midiInInstance, midiOutInstance, { emit } = { emit: false }) {
    super();
    if (midiInInstance === undefined) throw new Error('midiInInstance is undefined');
    if (midiOutInstance === undefined) throw new Error('midiOutInstance is undefined');
    this.#midiInInstance = midiInInstance;
    this.#midiOutInstance = midiOutInstance;
    this.#emit = emit;
    this.#register();
  }

  #register() {
    ON_DEATH(() => { this.#close(); });

    easymidiEventList()
      .forEach((event) => {
        this.#midiInInstance.on(event, (message) => {
          log.dev('receive message', message);
          log.dev('from', this.#midiInInstance.name);
          log.dev('');
          log.dev('send message', message);
          log.dev('to', this.#midiOutInstance.name);

          this.#midiOutInstance.send(event, message);

          if (this.#emit === true) {
            log.dev('');
            log.dev('emit message to data channel', message);
            this.emit('data', message);
          }
        });
      });
    return this;
  }

  #close() {
    log.blue('exiting');
    this.#midiInInstance.close();
    this.#midiOutInstance.close();
    log.blue('MIDI communication closed');
  }
}

export { MidiRepeater };
