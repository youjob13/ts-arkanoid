import { RouterUtils } from "../shared/ui/index.js";
import type { IRouter } from "./routes/models.js";

class App {
  constructor(
    private entrypoint: HTMLElement,
    private router: IRouter,
  ) {}

  start(): void {
    const gameLink = RouterUtils.createLink("/game", "Game");
    const homeLink = RouterUtils.createLink("/", "Home");

    const header = document.createElement("header");
    header.append(gameLink, homeLink);
    const main = document.createElement("main");

    this.entrypoint.append(header, main);
    this.router.registerRoot(main);
  }
}

export default App;
