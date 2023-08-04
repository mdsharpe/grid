export interface ObjectsInSpace {
    get objects(): THREE.Object3D[];
    onInit(): void;
    dispose(): void;
}
