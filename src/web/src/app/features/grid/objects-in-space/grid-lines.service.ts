import { Inject, Injectable } from '@angular/core';
import * as THREE from 'three';

import { ObjectsInSpace } from './objects-in-space';
import { GRID_CONSTANTS, GridConstants } from '../grid-constants';

@Injectable({
    providedIn: 'root',
})
export class GridLinesService implements ObjectsInSpace {
    constructor(
        @Inject(GRID_CONSTANTS) private readonly _constants: GridConstants
    ) {}

    private _geometry: THREE.BufferGeometry | undefined;
    private _grid: THREE.Line | undefined;

    get objects(): THREE.Object3D[] {
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
        const { width, height, spacing } = this._constants;

        const points: THREE.Vector3[] = [];

        let x = 0,
            y = 0;

        while (y <= height) {
            for (let i = 0; i <= width; i += spacing) {
                x = i;
                points.push(new THREE.Vector3(x, y, 0));
            }

            y += spacing;

            for (let i = width; i >= 0; i -= spacing) {
                x = i;
                points.push(new THREE.Vector3(x, y, 0));
            }

            y += spacing;
        }

        while (x <= width) {
            for (let i = 0; i <= height; i += spacing) {
                y = i;
                points.push(new THREE.Vector3(x, y, 0));
            }

            x += spacing;

            for (let i = height; i >= 0; i -= spacing) {
                y = i;
                points.push(new THREE.Vector3(x, y, 0));
            }

            x += spacing;
        }

        return points;
    }
}
