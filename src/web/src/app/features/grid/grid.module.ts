import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { GridShellComponent } from './grid-shell/grid-shell.component';
import { GridRoutingModule } from './grid-routing.module';

@NgModule({
    declarations: [GridComponent, GridShellComponent],
    imports: [CommonModule, GridRoutingModule],
})
export class GridModule {}
