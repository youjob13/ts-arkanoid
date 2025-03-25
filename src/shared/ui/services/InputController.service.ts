import { injectable } from "tsyringe";

@injectable()
export class InputController {
    public left: boolean = false;
    public right: boolean = false;
    private isMobile: boolean;

    constructor() {
        this.isMobile = /Mobi|Android/i.test(navigator.userAgent);

        if (this.isMobile) {
            this.createMobileControls();
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

    private createMobileControls() {
        const leftButton = this.createButton(
            "←",
            "left",
            () => (this.left = true),
            () => (this.left = false)
        );
        const rightButton = this.createButton(
            "→",
            "right",
            () => (this.right = true),
            () => (this.right = false)
        );

        document.body.appendChild(leftButton);
        document.body.appendChild(rightButton);
    }

    private createButton(
        label: string,
        position: "left" | "right",
        onPress: () => void,
        onRelease: () => void
    ): HTMLButtonElement {
        const button = document.createElement("button");
        button.textContent = label;
        button.style.position = "fixed";
        button.style.bottom = "20px";
        button.style[position] = "20px"; // Position either left or right
        button.style.width = "80px";
        button.style.height = "80px";
        button.style.fontSize = "30px";
        button.style.borderRadius = "50%";
        button.style.border = "none";
        button.style.background = "rgba(0, 0, 0, 0.5)"; // Transparent dark background
        button.style.color = "#fff";
        button.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
        button.style.cursor = "pointer";
        button.style.touchAction = "none"; // Prevents double tap zoom on mobile

        button.addEventListener("touchstart", e => {
            e.preventDefault();
            onPress();
        });
        button.addEventListener("touchend", e => {
            e.preventDefault();
            onRelease();
        });

        return button;
    }
}
