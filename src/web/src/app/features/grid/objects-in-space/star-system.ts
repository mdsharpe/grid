import * as THREE from 'three';
import { ObjectsInSpace } from './objects-in-space';

export class StarSystem implements ObjectsInSpace {
    constructor(private readonly _position: THREE.Vector3) {}

    private _geometry: THREE.SphereGeometry | undefined;
    private _star: THREE.Mesh | undefined;

    get objects(): THREE.Object3D[] {
        return this._star ? [this._star] : [];
    }

    public init(): void {
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

        this._geometry = new THREE.SphereGeometry(50, 32, 16);

        this._star = new THREE.Mesh(this._geometry, material);
        this._star.position.x = this._position.x;
        this._star.position.y = this._position.y;
    }

    public dispose(): void {
        this._geometry?.dispose();
    }
}
