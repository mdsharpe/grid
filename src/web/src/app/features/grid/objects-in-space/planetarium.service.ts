import { Inject, Injectable } from '@angular/core';
import * as THREE from 'three';
import * as seedrandom from 'seedrandom';

import { GRID_CONSTANTS, GridConstants } from '../grid-constants';
import { ObjectsInSpace } from './objects-in-space';
import { StarSystem } from './star-system';

@Injectable({
    providedIn: 'root',
})
export class PlanetariumService implements ObjectsInSpace {
    constructor(
        @Inject(GRID_CONSTANTS) private readonly _constants: GridConstants
    ) {}

    private _rng = seedrandom('hello world');

    private _starSystems: StarSystem[] = [];

    get objects(): THREE.Object3D[] {
        return this._starSystems.reduce<THREE.Object3D[]>(
            (accumulator, currentValue) =>
                accumulator.concat(currentValue.objects),
            []
        );
    }

    public init(): void {
        for (let i = 0; i < 10; i++) {
            this._starSystems.push(this.createStarSystem());
        }

        this._starSystems.forEach((o) => o.init());
    }

    public dispose(): void {
        this._starSystems.forEach((o) => o.dispose());
    }

    private createStarSystem(): StarSystem {
        var location = new THREE.Vector3(
            this.getRandomCoordinate(),
            this.getRandomCoordinate(),
            0
        );

        console.log(location);

        return new StarSystem(location);
    }

    private getRandomCoordinate(): number {
        const x = this._constants.width * this._rng();
        return this._constants.gridMin + x;
    }
}
