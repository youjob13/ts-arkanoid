export interface Renderable {
    render: () => HTMLElement;
    destroy: () => void;
}
