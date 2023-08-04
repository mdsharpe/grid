import { Injectable } from '@angular/core';
import { Object3D, Event } from 'three';
import { ObjectsInSpace } from './objects-in-space';

@Injectable({
    providedIn: 'root',
})
export class PlanetariumService implements ObjectsInSpace {
    constructor() {}

    get objects(): Object3D[] {
        throw new Error('Method not implemented.');
    }

    public onInit(): void {
        throw new Error('Method not implemented.');
    }

    public dispose(): void {
        throw new Error('Method not implemented.');
    }
}
