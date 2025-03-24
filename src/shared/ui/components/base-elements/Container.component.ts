import { BaseComponent } from "../index.js";

export class ContainerComponent extends BaseComponent {
    constructor(
        selector: string,
        private props?: {
            children?: HTMLElement[];
            tag?: "string";
            classes?: string[];
        }
    ) {
        super(selector);
    }

    render() {
        const element = document.createElement(this.props?.tag || "div");

        if (this.props?.children) {
            this.props.children.forEach(child => element.appendChild(child));
        }

        if (this.props?.classes) {
            this.props.classes.forEach(className =>
                element.classList.add(className)
            );
        }

        return element;
    }
}
