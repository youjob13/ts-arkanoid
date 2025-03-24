import { Renderable } from "../../../model/index.js";

export abstract class BaseComponent implements Renderable {
    protected element!: HTMLElement;

    constructor(protected readonly selector: string) {
        // customElements.define(
        //     selector,
        //     class extends HTMLElement {
        //         constructor() {
        //             super();
        //             // ToDo:
        //             const template = document.createElement("template");
        //             const style = document.createElement("style");
        //             style.textContent = `
        //   div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }
        //   h2 { margin: 0 0 10px; }
        //   ul { margin: 0; }
        //   p { margin: 10px 0; }
        //   `;
        //             const div = document.createElement("div");
        //             const slot = document.createElement("slot");
        //             slot.setAttribute("name", "person-name");
        //             div.appendChild(slot);
        //             template.content.appendChild(style);
        //             template.content.appendChild(div);
        //             const shadowRoot = this.attachShadow({ mode: "open" });
        //             // shadowRoot.adoptedStyleSheets = [styles];
        //             shadowRoot.append(template.content.cloneNode(true));
        //         }
        //     }
        // );
    }

    protected createComponent(template: string) {
        const element = document.createElement(this.selector);

        element.innerHTML = template;
        return element;
    }

    abstract render(): HTMLElement;

    destroy(): void {
        this.element.remove();
    }
}
