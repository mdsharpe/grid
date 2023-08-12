import { BehaviorSubject, Observable, isObservable } from 'rxjs';
import * as THREE from 'three';
import { ObjectsInSpace } from './objects-in-space';

export class Ship implements ObjectsInSpace {
    constructor(location: THREE.Vector3 | Observable<THREE.Vector3>) {
        if (isObservable(location)) {
            this.location$ = location;
        } else {
            this.location$ = new BehaviorSubject<THREE.Vector3>(
                new THREE.Vector3()
            ).asObservable();
        }
    }

    private _geometry: THREE.BufferGeometry | undefined;
    private _cylinder: THREE.Mesh | undefined;

    public readonly location$: Observable<THREE.Vector3>;

    public get objects(): THREE.Object3D<THREE.Event>[] {
        return this._cylinder ? [this._cylinder] : [];
    }

    public init(): void {
        this._geometry = new THREE.CylinderGeometry(1, 6, 6, 4);
        var material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true,
        });
        this._cylinder = new THREE.Mesh(this._geometry, material);
    }

    public dispose(): void {
        this._geometry?.dispose();
    }
}
