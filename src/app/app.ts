import { RouterUtils } from "../shared/ui/index.js";
import type { IRouter } from "./routes/models.js";
import { container } from "tsyringe";
import { Router } from "./routes/router.js";
import { ROUTES } from "./routes/routes.js";

class App {
    router = container.resolve(Router);

    constructor(private entrypoint: HTMLElement) {
        this.router.provideRoutes(ROUTES);
    }

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
