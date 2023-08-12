import { Inject, Injectable } from '@angular/core';
import * as THREE from 'three';

import { ObjectsInSpace } from './objects-in-space';
import { GRID_CONSTANTS, GridConstants } from '../grid-constants';

@Injectable()
export class GridLinesService implements ObjectsInSpace {
    constructor(
        @Inject(GRID_CONSTANTS) private readonly _constants: GridConstants
    ) {}

    private _geometry: THREE.BufferGeometry | undefined;
    private _grid: THREE.Line | undefined;

    public get objects(): THREE.Object3D[] {
        return this._grid ? [this._grid] : [];
    }

    public init(): void {
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            opacity: 0.25,
            transparent: true,
        });

        this._geometry = new THREE.BufferGeometry().setFromPoints(
            this.getPoints()
        );

        this._grid = new THREE.Line(this._geometry, material);
    }

    public dispose(): void {
        this._geometry?.dispose();
    }

    private getPoints(): THREE.Vector3[] {
        const { width, spacing } = this._constants;

        const points: THREE.Vector3[] = [];

        const min = width * -0.5,
            max = width * 0.5;

        let x = min,
            y = min;

        while (y <= max) {
            for (let i = min; i <= max; i += spacing) {
                x = i;
                points.push(new THREE.Vector3(x, y, 0));
            }

            y += spacing;

            for (let i = max; i >= min; i -= spacing) {
                x = i;
                points.push(new THREE.Vector3(x, y, 0));
            }

            y += spacing;
        }

        while (x <= max) {
            for (let i = min; i <= max; i += spacing) {
                y = i;
                points.push(new THREE.Vector3(x, y, 0));
            }

            x += spacing;

            for (let i = max; i >= min; i -= spacing) {
                y = i;
                points.push(new THREE.Vector3(x, y, 0));
            }

            x += spacing;
        }

        return points;
    }
}
