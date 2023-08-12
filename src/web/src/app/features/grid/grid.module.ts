import { NgModule } from '@angular/core';

import { GridComponent } from './grid/grid.component';
import { GridShellComponent } from './grid-shell/grid-shell.component';
import { GridRoutingModule } from './grid-routing.module';
import { GRID_CONSTANTS, GridConstants } from './grid-constants';
import { SharedModule } from 'src/app/shared/shared.module';
import {
    GridLinesService,
    PlanetariumService,
    ShipsService,
} from './objects-in-space';
import { PlayerService } from './player/player.service';
import { ThrustComponent } from './grid/controls/thrust/thrust.component';

@NgModule({
    imports: [SharedModule, GridRoutingModule],
    declarations: [GridComponent, GridShellComponent, ThrustComponent],
    providers: [
        {
            provide: GRID_CONSTANTS,
            useValue: new GridConstants(100, 101),
        },
        GridLinesService,
        PlanetariumService,
        PlayerService,
        ShipsService,
    ],
})
export class GridModule {}
