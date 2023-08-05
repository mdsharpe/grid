import { Injectable } from '@angular/core';
import { Object3D } from 'three';
import { ObjectsInSpace } from './objects-in-space';

@Injectable({
    providedIn: 'root',
})
export class PlanetariumService implements ObjectsInSpace {
    constructor() {}

    get objects(): Object3D[] {
        return [];
    }

    public init(): void {}

    public dispose(): void {}
}
