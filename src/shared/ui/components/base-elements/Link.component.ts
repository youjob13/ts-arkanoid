import { BaseComponent } from "../../index.js";

export class LinkComponent extends BaseComponent {
    constructor(
        private text: string,
        private src: string,
        private options?: { target: "_blank" | "_self" | "_parent" | "_top" }
    ) {
        super("t-link");
    }

    render() {
        const a = document.createElement("a");
        a.textContent = this.text;
        a.setAttribute("href", this.src);

        if (this.options?.target) {
            a.setAttribute("target", this.options.target);
        }

        return a;
    }
}
