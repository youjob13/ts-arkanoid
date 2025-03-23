import { InputController } from "../../shared/ui/index.js";

export class Paddle {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {}

    update(input: InputController) {
        if (input.left && this.x > 0) {
            this.x -= 5;
        }
        if (input.right && this.x + this.width < 800) {
            this.x += 5;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
