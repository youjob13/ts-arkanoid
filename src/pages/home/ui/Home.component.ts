import { BaseComponent, ContainerComponent } from "../../../shared/ui/index.js";
import { RouterUtils } from "../../../shared/ui/index.js";
import "./Home.component.scss";

export class HomeComponent extends BaseComponent {
    constructor() {
        super("home-page" + Math.random());
    }

    render() {
        const gameLink = RouterUtils.createLink("/game", "Start Game");
        const homeLink = RouterUtils.createLink("/", "Home");

        const main = new ContainerComponent("game-menu", {
            children: [gameLink, homeLink],
            classes: ["menu-wrapper"],
        });

        return main.render();
        // return this.createComponent(`
        //   <p slot="person-name">
        //     Home Page
        //   </p>
        //   `);
    }
}
