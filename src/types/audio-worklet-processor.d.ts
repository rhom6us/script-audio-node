interface AudioParamDescriptor {
  automationRate?: AutomationRate;
  defaultValue?: number;
  maxValue?: number;
  minValue?: number;
  name: string;
}

declare abstract class AudioWorkletProcessor {
  static readonly parameterDescriptors: AudioParamDescriptor[];
  constructor (options?: AudioWorkletNodeOptions);
  readonly port: MessagePort;
  abstract process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
}
type AudioWorkletProcessorStatic = {
  parameterDescriptors: AudioParamDescriptor[];
};
declare function registerProcessor(name: string, processorCtor: typeof AudioWorkletProcessor): undefined;
declare const currentFrame: number;
declare const currentTime: number;
declare const sampleRate: number;
