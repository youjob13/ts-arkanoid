import { injectable } from "tsyringe";

@injectable()
export class InputController {
    public left: boolean = false;
    public right: boolean = false;
    private isMobile: boolean;

    constructor() {
        this.isMobile = /Mobi|Android/i.test(navigator.userAgent);

        if (this.isMobile) {
            this.setupTouchControls();
        } else {
            this.setupKeyboardControls();
        }
    }

    private setupKeyboardControls() {
        window.addEventListener("keydown", event => {
            if (event.key === "ArrowLeft") this.left = true;
            if (event.key === "ArrowRight") this.right = true;
        });

        window.addEventListener("keyup", event => {
            if (event.key === "ArrowLeft") this.left = false;
            if (event.key === "ArrowRight") this.right = false;
        });
    }

    private setupTouchControls() {
        let touchStartX: number | null = null;

        window.addEventListener("touchstart", event => {
            if (event.touches.length > 0) {
                touchStartX = event.touches[0].clientX;
            }
        });

        window.addEventListener("touchmove", event => {
            if (event.touches.length > 0 && touchStartX !== null) {
                const touchX = event.touches[0].clientX;
                const deltaX = touchX - touchStartX;

                this.left = deltaX < -10;
                this.right = deltaX > 10;
            }
        });

        window.addEventListener("touchend", () => {
            this.left = false;
            this.right = false;
            touchStartX = null;
        });
    }
}
