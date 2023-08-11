import { Inject, Injectable } from '@angular/core';
import * as THREE from 'three';

import { GRID_CONSTANTS, GridConstants } from '../grid-constants';
import { ObjectsInSpace } from './objects-in-space';
import { StarSystem } from './star-system';
import { RandomService } from 'src/app/shared/random/random.service';

@Injectable({
    providedIn: 'root',
})
export class PlanetariumService implements ObjectsInSpace {
    constructor(
        @Inject(GRID_CONSTANTS) private readonly _constants: GridConstants,
        private readonly _rng: RandomService
    ) {}

    private _starSystems: StarSystem[] = [];

    get objects(): THREE.Object3D[] {
        return this._starSystems.reduce<THREE.Object3D[]>(
            (accumulator, currentValue) =>
                accumulator.concat(currentValue.objects),
            []
        );
    }

    public init(): void {
        for (let i = 0; i < 20; i++) {
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

        return new StarSystem(location);
    }

    private getRandomCoordinate(): number {
        return this._constants.gridMin + this._constants.width * this._rng.nextDouble();
    }
}
