import { BaseComponent } from "../../../shared/ui/index.js";

export class HomeComponent extends BaseComponent {
  constructor() {
    super("home-page");
  }

  render() {
    return this.createComponent(`
      <p slot="person-name">
        Home Page
      </p>
      `);
  }
}
