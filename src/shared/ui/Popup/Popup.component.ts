import { BaseComponent } from "../index.js";
import "./Popup.component.scss";

export interface PopupComponentProps {
    children: HTMLElement[];
    selector: string;
    parent?: HTMLElement;
    classes?: string[];
}

export class PopupComponent extends BaseComponent {
    constructor(private props: PopupComponentProps) {
        super(props.selector);
    }

    render() {
        this.element = document.createElement("div");

        const classes = ["popup-wrapper", ...(this.props.classes ?? [])];

        classes.forEach(className => this.element.classList.add(className));

        this.element.append(...this.props.children);

        const parent = this.props.parent || document.body;
        parent.appendChild(this.element);

        return this.element;
    }

    destroy() {
        this.element.remove();
    }
}
