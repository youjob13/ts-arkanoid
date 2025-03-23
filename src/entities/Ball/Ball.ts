export class Ball {
    constructor(
        private x: number,
        private y: number,
        private radius: number = 10,
        private dx: number = 4,
        private dy: number = 4
    ) {}

    getPosition(prop: string): number | undefined {
        const propValue = this[prop as keyof typeof this];
        if (typeof propValue !== "function") {
            return propValue as number | undefined;
        }
    }

    updatePosition() {
        this.x += this.dx;
        this.y += this.dy;
        return this;
    }

    performWallCollision(ballPosition: Ball, fieldWidth: number) {
        if (
            ballPosition.x - ballPosition.radius < 0 ||
            ballPosition.x + ballPosition.radius > fieldWidth
        ) {
            ballPosition.dx *= -1;
        }
        if (ballPosition.y - ballPosition.radius < 0) {
            ballPosition.dy *= -1;
        }
    }

    performBallCollision(
        ballPosition: Ball,
        brickPosition: {
            x: number;
            y: number;
            height: number;
            width: number;
            isDestroyed: boolean;
        }
    ): boolean {
        if (
            !brickPosition.isDestroyed &&
            ballPosition.x > brickPosition.x &&
            ballPosition.x < brickPosition.x + brickPosition.width &&
            ballPosition.y > brickPosition.y &&
            ballPosition.y < brickPosition.y + brickPosition.height
        ) {
            ballPosition.dy *= -1;
            return true;
        }

        return false;
    }

    performPaddleCollision(
        ballPosition: Ball,
        paddlePosition: {
            x: number;
            y: number;
            width: number;
        }
    ) {
        if (
            ballPosition.y + ballPosition.radius > paddlePosition.y &&
            ballPosition.x > paddlePosition.x &&
            ballPosition.x < paddlePosition.x + paddlePosition.width
        ) {
            ballPosition.dy *= -1;
            ballPosition.y = paddlePosition.y - ballPosition.radius;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
