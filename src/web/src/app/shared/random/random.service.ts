import { Injectable } from '@angular/core';
import * as seedrandom from 'seedrandom';

@Injectable()
export class RandomService {
    constructor() {}

    private _rng = seedrandom('hello world');

    public nextDouble(): number {
        return this._rng();
    }
}
