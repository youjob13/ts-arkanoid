export function createLink<T extends HTMLElement>(
  path: string,
  text = "",
  tag = "a",
): T {
  const link = document.createElement(tag) as T;
  link.setAttribute("routeLink", path);
  link.textContent = text;
  return link;
}
