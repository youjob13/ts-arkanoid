import App from "./app/app.js";
import { Router } from "./app/routes/router.js";
import { ROUTES } from "./app/routes/routes.js";

const entryPoint = document.getElementById("app-entry");

if (entryPoint == null) {
  throw new Error("App entry point is not provided");
}

const appRouter = new Router();
appRouter.provideRoutes(ROUTES);

const app = new App(entryPoint, appRouter);
app.start();
