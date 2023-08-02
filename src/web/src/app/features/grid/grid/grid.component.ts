import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    Observable,
    ReplaySubject,
    fromEvent,
    takeUntil,
} from 'rxjs';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly _destroy$ = new ReplaySubject<boolean>(1);

    @ViewChild('canvas')
    private _canvas!: ElementRef<HTMLCanvasElement>;
    private _context!: CanvasRenderingContext2D;

    private _resizeEvents$: Observable<UIEvent> = fromEvent<UIEvent>(
        window,
        'resize'
    );

    public ngOnInit(): void {}

    public ngAfterViewInit(): void {
        this._resizeEvents$.pipe(takeUntil(this._destroy$)).subscribe((_) => {
            this.setCanvasSize();
            this.drawGrid();
        });

        this.setCanvasSize();

        this._context = this._canvas.nativeElement.getContext('2d')!;

        this.drawGrid();
    }

    ngOnDestroy(): void {
        this._destroy$.next(true);
        this._destroy$.complete();
    }

    private drawGrid() {
        // Box width
        var bw = 400;
        // Box height
        var bh = 400;
        // Padding
        var p = 10;

        var context = this._context;

        for (var x = 0; x <= bw; x += 40) {
            context.moveTo(0.5 + x + p, p);
            context.lineTo(0.5 + x + p, bh + p);
        }

        for (var x = 0; x <= bh; x += 40) {
            context.moveTo(p, 0.5 + x + p);
            context.lineTo(bw + p, 0.5 + x + p);
        }

        context.strokeStyle = 'white';
        context.stroke();
    }

    private setCanvasSize(): void {
        const canvas = this._canvas.nativeElement;
        const parent = canvas.parentElement!;

        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
    }
}
