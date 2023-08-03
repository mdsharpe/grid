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
    debounceTime,
    fromEvent,
    takeUntil,
} from 'rxjs';
import * as THREE from 'three';

import { GridLinesService, PlanetariumService } from '../objects-in-space';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    providers: [GridLinesService, PlanetariumService]
})
export class GridComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly _gridSpacing = 100;
    private readonly _size = 51; // Should be odd
    private readonly _width = this._gridSpacing * this._size;
    private readonly _height = this._gridSpacing * this._size;

    private readonly _destroy$ = new ReplaySubject<boolean>(1);
    private _animationRunning = true;

    @ViewChild('canvas')
    private readonly _canvas!: ElementRef<HTMLCanvasElement>;

    private _scene!: THREE.Scene;
    private _camera!: THREE.PerspectiveCamera;
    private _renderer!: THREE.WebGLRenderer;

    private _resizeEvents$: Observable<UIEvent> = fromEvent<UIEvent>(
        window,
        'resize'
    );

    constructor(
        private _gridLines: GridLinesService,
        private _planetarium: PlanetariumService
    ) {}

    public ngOnInit(): void {
        this.initCamera();

        this._scene = new THREE.Scene();

        const grid = this._gridLines.getObjects({
            width: this._width,
            height: this._height,
            spacing: this._gridSpacing
        });

        this._scene.add(...grid);
    }

    public ngAfterViewInit(): void {
        this._renderer = new THREE.WebGLRenderer({
            canvas: this._canvas.nativeElement,
            antialias: true,
            alpha: true,
        });

        this._resizeEvents$
            .pipe(takeUntil(this._destroy$), debounceTime(250))
            .subscribe((_) => {
                this.setCanvasSize();
            });

        this.setCanvasSize();

        this.render();
    }

    ngOnDestroy(): void {
        this._animationRunning = false;
        this._destroy$.next(true);
        this._destroy$.complete();
    }

    private initCamera():void {
        var midX = this._width / 2;
        var midY = this._height / 2;

        this._camera = new THREE.PerspectiveCamera();
        this._camera.far = 5000;
        this._camera.position.set(midX, midY - 1000, 500);
        this._camera.lookAt(midX, midY, 0);
        this._camera.updateProjectionMatrix();
    }

    private render(): void {
        if (this._animationRunning) {
            requestAnimationFrame(() => {
                this.render();
            });
        }

        this._renderer.render(this._scene, this._camera);
    }

    private setCanvasSize(): void {
        const canvas = this._canvas.nativeElement;
        const parent = canvas.parentElement!;

        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;

        this._renderer.setSize(canvas.width, canvas.height);
        this._camera.aspect = canvas.width / canvas.height;
        this._camera.updateProjectionMatrix();
    }
}
