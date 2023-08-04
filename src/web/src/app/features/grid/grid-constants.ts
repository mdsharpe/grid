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
        this.height = spacing * size
    }

    public readonly width: number;
    public readonly height: number;
}
