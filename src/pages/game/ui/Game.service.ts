import { container, injectable } from "tsyringe";
import { Ball, Paddle, Brick } from "../../../entities/index.js";
import {
    CanvasBuilderService,
    InputController,
} from "../../../shared/ui/index.js";
import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
} from "./constants.js";
import { PATTERNS } from "./patterns.js";

@injectable()
export class GameService {
    private canvasService = container.resolve(CanvasBuilderService);
    private input = container.resolve(InputController);

    private bricks = Brick.createBricksField(PATTERNS);
    private ball = new Ball(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    private paddle = new Paddle(
        CANVAS_WIDTH / 2 - 50,
        CANVAS_HEIGHT - 30,
        PADDLE_WIDTH,
        PADDLE_HEIGHT
    );

    init(parent: HTMLElement) {
        this.canvasService.build(parent, {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
        });

        this.gameLoop();
    }

    private gameLoop() {
        this.update();
        this.rerender();

        if (this.isGameOver()) {
            return;
        }

        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private update() {
        this.paddle.update(this.input);
        this.ball.updatePosition();
        this.performBallCollisions(this.ball);
    }

    private isGameOver() {
        if (this.isBallBelowPaddleOver()) {
            alert("You lose!");
            return true;
        }

        if (Brick.isAllBricksDestroyed(this.bricks)) {
            alert("You won!");
            return true;
        }
    }

    private isBallBelowPaddleOver() {
        const ballHeightPosition = this.ball.getPosition("y");
        return ballHeightPosition != null && ballHeightPosition > CANVAS_HEIGHT;
    }

    private performBallCollisions(ball: Ball) {
        this.ball.performWallCollision(ball, CANVAS_WIDTH);
        this.ball.performPaddleCollision(ball, this.paddle);
        this.bricks.forEach(brick => {
            const needToDestroy = this.ball.performBallCollision(ball, brick);

            if (needToDestroy) {
                brick.destroy();
            }
        });
    }

    private rerender() {
        this.canvasService.render(this.paddle, this.ball, ...this.bricks);
    }
}
