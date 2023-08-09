import { InjectionToken } from '@angular/core';

export const GRID_CONSTANTS = new InjectionToken<GridConstants>(
    'GRID_CONSTANTS'
);

export class GridConstants {
    constructor(
        public readonly spacing: number,
        size: number // Should be odd
    ) {
        this.width = spacing * size;
        this.gridMin = this.width * -0.5;
        this.gridMax = this.width * 0.5;
    }

    public readonly width: number;
    public readonly gridMin: number;
    public readonly gridMax: number;
}
