import { Renderable } from "../../../shared/model/index.js";

export class GameComponent implements Renderable {
  render() {
    const div = document.createElement("div");
    div.textContent = "Game Page";
    return div;
  }
}
