import { IRouter, Routes } from "./routes/models.js";

class App {
  constructor(
    private entrypoint: HTMLElement,
    private router: IRouter,
  ) {}

  start(): void {
    const a = document.createElement("a");
    a.setAttribute("href", "/game");
    a.textContent = "Game";
    const a2 = document.createElement("a");
    a2.setAttribute("href", "/");
    a2.textContent = "Home";

    const header = document.createElement("header");
    header.append(a, a2);
    const main = document.createElement("main");

    this.entrypoint.append(header, main);
    this.router.registerRoot(main);
  }
}

export default App;
