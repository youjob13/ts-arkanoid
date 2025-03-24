import { injectable } from "tsyringe";

export interface CanvasBuilderOptions {
    width: number;
    height: number;
    classes?: string[];
}

const DEFAULT_CANVAS_WIDTH = 800;
const DEFAULT_CANVAS_HEIGHT = 600;

export interface Renderable {
    draw(ctx: CanvasRenderingContext2D): void;
}

@injectable()
export class CanvasBuilderService {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private options: CanvasBuilderOptions = {
        width: DEFAULT_CANVAS_WIDTH,
        height: DEFAULT_CANVAS_HEIGHT,
    };

    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d")!;
    }

    build(parent: HTMLElement, options?: Partial<CanvasBuilderOptions>) {
        this.options = {
            ...this.options,
            ...options,
        };

        this.canvas.width = this.options.width;
        this.canvas.height = this.options.height;

        if (this.options.classes) {
            this.options.classes.forEach(className =>
                this.canvas.classList.add(className)
            );
        }

        parent.appendChild(this.canvas);

        return this;
    }

    updateSize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    render(...renderables: Renderable[]) {
        this.ctx.clearRect(0, 0, this.options.width, this.options.height);

        renderables.forEach(renderable => renderable.draw(this.ctx));
    }
}
