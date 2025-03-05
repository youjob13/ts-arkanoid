import { Renderable } from "../../../shared/model/index.js";

export class HomeComponent implements Renderable {
  render() {
    const div = document.createElement("div");
    div.textContent = "Home Page";
    return div;
  }
}
