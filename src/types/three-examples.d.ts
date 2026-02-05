declare module "three/examples/jsm/loaders/GLTFLoader" {
  export { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
  export type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
}

declare module "three/examples/jsm/loaders/GLTFLoader.js" {
  import * as THREE from "three";
  import type { LoadingManager } from "three";

  export interface GLTF {
    scene: THREE.Group;
    scenes: THREE.Group[];
    cameras: THREE.Camera[];
    animations: THREE.AnimationClip[];
    asset: Record<string, unknown>;
  }

  export class GLTFLoader extends THREE.Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}
