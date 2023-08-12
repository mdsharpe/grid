import { Injectable } from '@angular/core';
import * as THREE from 'three';

import { ObjectsInSpace } from './objects-in-space';
import { PlayerService } from '../player';
import { Ship } from './ship';

@Injectable()
export class ShipsService implements ObjectsInSpace {
    constructor(player: PlayerService) {
        this._playerShip = new Ship(player.location);
    }

    private readonly _playerShip: Ship;

    public get objects(): THREE.Object3D[] {
        return this._playerShip ? [...this._playerShip.objects] : [];
    }

    public init(): void {
        this._playerShip.init();
    }

    public dispose(): void {
        this._playerShip.dispose();
    }
}
