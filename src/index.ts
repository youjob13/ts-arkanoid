import "reflect-metadata";
import App from "./app/app.js";

const entryPoint = document.getElementById("app-entry");

if (entryPoint == null) {
    throw new Error("App entry point is not provided");
}

const app = new App(entryPoint);
app.start();
