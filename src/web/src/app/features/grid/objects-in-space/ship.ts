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

    public readonly location$: Observable<THREE.Vector3>;

    public get objects(): THREE.Object3D<THREE.Event>[] {
        return [];
    }

    public init(): void {}

    public dispose(): void {}
}
