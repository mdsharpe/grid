import * as THREE from 'three';

export interface ObjectsInSpace {
    get objects(): THREE.Object3D[];
    init(): void;
    dispose(): void;
}
