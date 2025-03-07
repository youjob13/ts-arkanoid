import { Renderable } from "../../shared/model/index.js";
import { arrayToMap } from "../../shared/utils/utils.js";
import { ANY_PATH } from "./constants.js";
import type { Routes, Route, IRouter } from "./models.js";

export class Router implements IRouter {
  private routes: Map<Route["path"], Route> = new Map();
  private root: HTMLElement = document.body;

  constructor() {
    // ToDo: refactor
    window.addEventListener(
      "load",
      this.navigate.bind(this, window.location.pathname),
      { once: true },
    );
    document.addEventListener("click", (e) => {
      const link = e.target as HTMLLinkElement;

      if (link.hasAttribute("routeLink")) {
        e.preventDefault();
        this.navigate(link.getAttribute("routeLink")!);
        return;
      }
    });
  }

  registerRoot(root: HTMLElement) {
    this.root = root;
  }

  provideRoutes(routes: Routes): void {
    this.routes = arrayToMap(routes, ({ path }) => path);
  }

  async navigate(path: Route["path"]): Promise<void> {
    const routeToNavigate = this.routes.get(path) ?? this.routes.get(ANY_PATH);

    if (!routeToNavigate) {
      throw new Error(`Current page is not exists - [${path}]`);
    }

    let pathToNavigate: string;
    let ComponentToNavigate: new () => Renderable;

    if (routeToNavigate.path === ANY_PATH) {
      ComponentToNavigate = await this.routes.get(routeToNavigate.redirectTo!)!
        .component!();
      pathToNavigate = routeToNavigate.redirectTo!;
    } else {
      ComponentToNavigate = await routeToNavigate.component!();
      pathToNavigate = routeToNavigate.path!;
    }

    window.history.pushState(
      {},
      pathToNavigate,
      window.location.origin + pathToNavigate,
    );

    return this.render(ComponentToNavigate);
  }

  private render(Component: new () => Renderable): void {
    this.clearPage();
    this.root.appendChild(new Component().render());
  }

  private clearPage() {
    this.root.innerHTML = "";
  }
}
