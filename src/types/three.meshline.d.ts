/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "three.meshline" {
  import * as THREE from "three";

  export class MeshLineGeometry extends THREE.BufferGeometry {
    constructor();
    setPoints(points: THREE.Vector3[]): void;
  }

  export class MeshLineMaterial extends THREE.Material {
    constructor(parameters?: any);
    lineWidth: number;
    color: THREE.Color;
    map?: THREE.Texture;
    repeat?: [number, number];
    useMap?: boolean;
    transparent?: boolean;
    resolution?: [number, number];
    sizeAttenuation?: boolean;
  }
}
