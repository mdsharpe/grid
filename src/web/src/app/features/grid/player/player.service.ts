import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as THREE from 'three';

@Injectable()
export class PlayerService {
    private readonly _location = new BehaviorSubject<THREE.Vector3>(
        new THREE.Vector3(0, 0, 0)
    );

    public readonly location = this._location.asObservable();
}
