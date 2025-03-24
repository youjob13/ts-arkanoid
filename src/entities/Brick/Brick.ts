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

    static createBricksField(
        patterns: number[][][],
        canvasWidth: number,
        canvasHeight: number
    ) {
        const selectedPattern = selectRandomValue(patterns);

        const cols = selectedPattern[0].length;
        const rows = selectedPattern.length;

        const brickWidth = canvasWidth / (cols + 2); // Ensure bricks fit within the screen
        const brickHeight = canvasHeight / 20; // Scale bricks proportionally
        const padding = brickWidth * 0.1; // Padding as a percentage of width
        const offsetTop = canvasHeight * 0.1; // Top offset 10% of canvas height
        const offsetLeft = (canvasWidth - cols * (brickWidth + padding)) / 2; // Center bricks

        const bricks: Brick[] = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
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
