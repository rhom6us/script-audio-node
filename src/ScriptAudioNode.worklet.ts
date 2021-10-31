import type { AudioNodeScript, ParameterData } from './ScriptAudioNode';
import "./types/audio-worklet-processor";
import { ARG_A1, ARG_A2, ARG_K1, ARG_K2, PROCESSOR_NAME } from './constants';

registerProcessor(PROCESSOR_NAME, class extends AudioWorkletProcessor {
  private readonly _fn: AudioNodeScript;
  static get parameterDescriptors(): AudioParamDescriptor[] {
    return [
      {
        name: ARG_A1,
        automationRate: "a-rate"
      },
      {
        name: ARG_A2,
        automationRate: "a-rate"
      },
      {
        name: ARG_K1,
        automationRate: "k-rate"
      },
      {
        name: ARG_K2,
        automationRate: "k-rate"
      }
    ];
  }

  constructor (options: AudioWorkletNodeOptions = { processorOptions: { script: defaultScript.toString() } }) {
    super();
    this._fn = eval(options.processorOptions.script) as AudioNodeScript;
  }
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<keyof ParameterData, Float32Array>) {
    return this._fn(inputs, outputs, parameters, self as any);
  }
});


const defaultScript: AudioNodeScript = (inputs, outputs) => {
  inputs.forEach((channels, input) => channels.forEach((samples, channel) => outputs[input][channel].set(samples)));
  return false;
};
