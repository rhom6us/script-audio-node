import { ARG_A1, ARG_A2, ARG_K1, ARG_K2 } from "./constants";

export interface ParameterData {
  [ARG_A1]?: number;
  [ARG_A2]?: number;
  [ARG_K1]?: number;
  [ARG_K2]?: number;
}
export type ScriptAudioNodeOptions = Omit<AudioWorkletNodeOptions, "parameterData" | "processorOptions"> & {
  script: AudioNodeScript;
  parameterData?: ParameterData;
};
interface AudioWorkletGlobalScope {
  currentFrame: number;
  currentTime: number;
  sampleRate: number;
}
export type AudioNodeScript = (inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<keyof ParameterData, Float32Array>, scope: AudioWorkletGlobalScope) => boolean;
export interface ScriptAudioNode extends AudioNode {
  readonly [ARG_A1]: AudioParam;
  readonly [ARG_A2]: AudioParam;
  readonly [ARG_K1]: AudioParam;
  readonly [ARG_K2]: AudioParam;
}
export interface ScriptAudioNodeConstructor {
  new(options: AudioNodeScript | ScriptAudioNodeOptions): ScriptAudioNode;
  readonly prototype: ScriptAudioNode;
}
