import { ARG_A1, ARG_A2, ARG_K1, ARG_K2, PROCESSOR_NAME } from "./constants";
import type { AudioNodeScript, ScriptAudioNode, ScriptAudioNodeConstructor, ScriptAudioNodeOptions } from './ScriptAudioNode';
import url from './ScriptAudioNode.worklet.ts';
import './types/worklet';
import './types/audio-worklet-node';

const registrations = new WeakSet<BaseAudioContext>();
export async function initWorklet(context: BaseAudioContext): Promise<ScriptAudioNodeConstructor> {
  if (!registrations.has(context)) {
    await context.audioWorklet.addModule(url);
    registrations.add(context);
  }
  return class extends AudioWorkletNode implements ScriptAudioNode {
    get [ARG_A1]() {
      return this.parameters.get(ARG_A1)!;
    }
    get [ARG_A2]() {
      return this.parameters.get(ARG_A2)!;
    }
    get [ARG_K1]() {
      return this.parameters.get(ARG_K1)!;
    }
    get [ARG_K2]() {
      return this.parameters.get(ARG_K2)!;
    }

    constructor (options: AudioNodeScript | ScriptAudioNodeOptions) {
      if (typeof options === 'function') {
        options = {
          script: options
        };
      }
      super(context, PROCESSOR_NAME, {
        processorOptions: { script: options.script.toString() },
        parameterData: options?.parameterData as any,
      });
    }
  };;
}

