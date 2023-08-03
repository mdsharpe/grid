import { Injectable, OnInit } from '@angular/core';
import * as THREE from 'three';
import { ObjectsInSpaceService } from './objects-in-space.service';

export interface GridLinesOptions {
    width: number;
    height: number;
    spacing: number;
}

@Injectable({
    providedIn: 'root',
})
export class GridLinesService implements OnInit, ObjectsInSpaceService {
    constructor() {}

    public ngOnInit(): void {
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff,
            opacity: 0.25,
            transparent: true,
        });

        const geometry = new THREE.BufferGeometry().setFromPoints(
            this.getPoints(options)
        );

        const grid = new THREE.Line(geometry, material);

        return [grid];
    }

    public dispose(): void {
    }

    public getObjects(options: GridLinesOptions): THREE.Object3D[] {
    }

    private getPoints(options: GridLinesOptions): THREE.Vector3[] {
        const { width, height, spacing } = options;

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
