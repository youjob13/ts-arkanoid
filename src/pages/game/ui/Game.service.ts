import { container, injectable } from "tsyringe";
import { Ball, Paddle, Brick } from "../../../entities/index.js";
import {
    CanvasBuilderService,
    InputController,
    PopupService,
} from "../../../shared/ui/index.js";
import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
} from "./constants.js";
import { PATTERNS } from "./patterns.js";
import { EndGamePopupComponent } from "../../../shared/ui/components/EndGamePopup.component.js";

@injectable()
export class GameService {
    private canvasService = container.resolve(CanvasBuilderService);
    private popupService = container.resolve(PopupService);
    private input = container.resolve(InputController);

    private readonly canvasSizes = {
        width: window.innerWidth || CANVAS_WIDTH,
        height: window.innerHeight || CANVAS_HEIGHT,
    };

    private bricks = Brick.createBricksField(
        PATTERNS,
        this.canvasSizes.width,
        this.canvasSizes.height
    );
    private ball = new Ball(
        this.canvasSizes.width / 2,
        this.canvasSizes.height / 2,
        this.canvasSizes.width * 0.015 // Ball radius = 1.5% of canvas width
    );
    private paddle = new Paddle(
        this.canvasSizes.width / 2 - this.canvasSizes.width * 0.1,
        this.canvasSizes.height - this.canvasSizes.height * 0.05,
        this.canvasSizes.width * 0.2, // Paddle width = 20% of canvas width
        this.canvasSizes.height * 0.02 // Paddle height = 2% of canvas height
    );

    init(parent: HTMLElement) {
        this.canvasService.build(parent, {
            width: this.canvasSizes.width,
            height: this.canvasSizes.height,
            classes: ["game-field"],
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
        this.paddle.update(this.input, this.canvasSizes.width);
        this.ball.updatePosition();
        this.performBallCollisions(this.ball);
    }

    private isGameOver() {
        if (this.isBallBelowPaddleOver()) {
            this.popupService.open(EndGamePopupComponent, "You lose :(");
            return true;
        }

        if (Brick.isAllBricksDestroyed(this.bricks)) {
            this.popupService.open(EndGamePopupComponent, "You won!");
            return true;
        }
    }

    private isBallBelowPaddleOver() {
        const ballHeightPosition = this.ball.getPosition("y");
        return (
            ballHeightPosition != null &&
            ballHeightPosition > this.canvasSizes.height
        );
    }

    private performBallCollisions(ball: Ball) {
        this.ball.performWallCollision(
            ball,
            this.canvasSizes.width,
            this.canvasSizes.height
        );
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
