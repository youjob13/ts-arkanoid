import { selectRandomValue } from "../../shared/ui/index.js";

export class Brick {
    private _isDestroyed: boolean = false;

    get isDestroyed(): boolean {
        return this._isDestroyed;
    }

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {}

    draw(ctx: CanvasRenderingContext2D): void {
        if (!this._isDestroyed) {
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    destroy() {
        this._isDestroyed = true;
    }

    static createBricksField(patterns: number[][][]) {
        const selectedPattern = selectRandomValue(patterns);
        const brickWidth = 75;
        const brickHeight = 20;
        const padding = 10;
        const offsetTop = 50;
        const offsetLeft = 35;

        const bricks: Brick[] = [];

        for (let row = 0; row < selectedPattern.length; row++) {
            for (let col = 0; col < selectedPattern[row].length; col++) {
                if (selectedPattern[row][col] === 1) {
                    bricks.push(
                        new Brick(
                            offsetLeft + col * (brickWidth + padding),
                            offsetTop + row * (brickHeight + padding),
                            brickWidth,
                            brickHeight
                        )
                    );
                }
            }
        }

        return bricks;
    }

    static isAllBricksDestroyed(bricks: Brick[]): boolean {
        return bricks.every(brick => brick.isDestroyed);
    }
}
