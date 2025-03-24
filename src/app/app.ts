import { container } from "tsyringe";
import { Router } from "./routes/router.js";
import { ROUTES } from "./routes/routes.js";

class App {
    router = container.resolve(Router);

    constructor(private entrypoint: HTMLElement) {
        this.router.provideRoutes(ROUTES);
    }

    start(): void {
        this.router.registerRoot(this.entrypoint);
    }
}

export default App;
