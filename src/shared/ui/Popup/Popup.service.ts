import { injectable } from "tsyringe";
import { PopupComponent, PopupComponentProps } from "./Popup.component.js";

@injectable()
export class PopupService {
    open(props: PopupComponentProps): void;
    open(
        component: new (componentProps: any) => PopupComponent,
        componentProps: any
    ): void;
    open(
        props:
            | PopupComponentProps
            | (new (componentProps: any) => PopupComponent),
        componentProps?: any
    ): void {
        if ("children" in props) {
            new PopupComponent(props).render();
            return;
        }
        new props(componentProps).render();
    }
}
