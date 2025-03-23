import { container } from "tsyringe";
import { Renderable } from "../../../shared/model/index.js";
import { GameService } from "./Game.service.js";

export class GameComponent implements Renderable {
    private gameService = container.resolve(GameService);
    private element: HTMLDivElement;

    constructor() {
        this.element = document.createElement("div");
        this.gameService.init(this.element);
    }

    render() {
        return this.element;
    }
}
