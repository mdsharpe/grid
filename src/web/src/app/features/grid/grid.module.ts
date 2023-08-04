import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { GridShellComponent } from './grid-shell/grid-shell.component';
import { GridRoutingModule } from './grid-routing.module';
import { GRID_CONSTANTS, GridConstants } from './grid-constants';

@NgModule({
    declarations: [GridComponent, GridShellComponent],
    imports: [CommonModule, GridRoutingModule],
    providers: [
        {
            provide: GRID_CONSTANTS,
            useValue: new GridConstants(100, 51),
        },
    ],
})
export class GridModule {}
