import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridShellComponent } from './grid-shell/grid-shell.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: GridShellComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GridRoutingModule {}
