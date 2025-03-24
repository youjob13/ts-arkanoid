import { PopupComponent } from "../Popup/Popup.component.js";
import { RouterUtils } from "../utils/index.js";
import { ContainerComponent } from "./index.js";
import "./EndGamePopup.component.scss";

export class EndGamePopupComponent extends PopupComponent {
    constructor(text: string) {
        const span = document.createElement("span");

        span.textContent = text;

        const newGameBtn = RouterUtils.createLink("/game", "New Game");
        const homeBtn = RouterUtils.createLink("/home", "Exit to menu");

        const btnContainer = new ContainerComponent("div", {
            children: [homeBtn, newGameBtn],
            classes: ["btn-wrapper"],
        }).render();

        super({
            selector: "end-game-popup",
            children: [span, btnContainer],
        });

        newGameBtn.addEventListener("click", this.destroy.bind(this));
        homeBtn.addEventListener("click", this.destroy.bind(this));
    }
}
