import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomService } from './random/random.service';

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [CommonModule],
    providers: [RandomService],
})
export class SharedModule {}
