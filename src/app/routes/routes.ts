import { Routes } from "./models.js";

export const ROUTES: Routes = [
  {
    path: "",
    component: async () =>
      await import("../../pages/home/index.js").then((m) => m.HomeComponent),
  },
  {
    path: "/game",
    component: async () =>
      await import("../../pages/game/index.js").then((m) => m.GameComponent),
  },
  {
    path: "**",
    redirectTo: "",
  },
];
