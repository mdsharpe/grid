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

import { GridLinesService, PlanetariumService, ShipsService } from '../objects-in-space';
import { PlayerService } from '../player';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(
        private readonly _player: PlayerService,
        private readonly _gridLines: GridLinesService,
        private readonly _planetarium: PlanetariumService,
        private readonly _ships: ShipsService
    ) {}

    private readonly _destroy$ = new ReplaySubject<boolean>(1);
    private _animationRunning = true;

    @ViewChild('canvas')
    private readonly _canvas!: ElementRef<HTMLCanvasElement>;

    private _scene: THREE.Scene | undefined;
    private _camera: THREE.PerspectiveCamera | undefined;
    private _renderer: THREE.WebGLRenderer | undefined;

    private _resizeEvents$: Observable<UIEvent> = fromEvent<UIEvent>(
        window,
        'resize'
    );

    public ngOnInit(): void {
        this.initCamera();

        this._ships.init();
        this._gridLines.init();
        this._planetarium.init();

        this._scene = new THREE.Scene();
        this._scene.add(...this._gridLines.objects);
        this._scene.add(...this._planetarium.objects);
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

        this._ships.dispose();
        this._gridLines.dispose();
        this._planetarium.dispose();
    }

    private initCamera(): void {
        this._camera = new THREE.PerspectiveCamera();
        this._camera.far = 10000;
        this._camera.position.set(0, -3000, 4000);
        this._camera.lookAt(0, 0, 0);
        this._camera.updateProjectionMatrix();
    }

    private render(): void {
        if (this._animationRunning) {
            requestAnimationFrame(() => {
                this.render();
            });
        }

        if (this._scene && this._camera) {
            this._renderer?.render(this._scene, this._camera);
        }
    }

    private setCanvasSize(): void {
        const canvas = this._canvas.nativeElement;
        const parent = canvas.parentElement!;

        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;

        if (this._renderer && this._camera) {
            this._renderer.setSize(canvas.width, canvas.height);
            this._camera.aspect = canvas.width / canvas.height;
            this._camera.updateProjectionMatrix();
        }
    }
}
