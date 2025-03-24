import { container } from "tsyringe";
import { GameService } from "./Game.service.js";
import "./Game.component.scss";
import { BaseComponent } from "../../../shared/ui/index.js";

export class GameComponent extends BaseComponent {
    private gameService = container.resolve(GameService);

    constructor() {
        super("");
        this.element = document.createElement("div");
        this.gameService.init(this.element);
    }

    render() {
        return this.element;
    }
}
