import { Renderable } from "../../shared/model/index.js";

export type Route = {
  path: string;
  title?: string;
  component?: () => Promise<new () => Renderable>;
  redirectTo?: string;
};

export type Routes = Route[];

export interface IRouter {
  registerRoot(root: HTMLElement): void;
  navigate(path: string): Promise<void>;
  provideRoutes(routes: Routes): void;
}
