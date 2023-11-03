// @ts-check

/**
 * @param {'header' | 'nav' | 'main' | 'div' | 'span' | 'h1' | 'h2' | 'p' | 'a' | 'button' | 'img' | 'ul' | 'li'} tagName
 * @param {{
 *   children?: HTMLElement[],
 *   attributes?: { key: string, value: string }[],
 *   className?: string,
 *   textContent?: string,
 *   type?: 'button' | 'submit',
 *   href?: string,
 *   alt?: string,
 *   src?: string,
 *   onclick?: (e: MouseEvent) => void
 * }} opts
 */
export default function createElement(tagName, opts) {
  const { children, attributes } = opts;

  delete opts.children;
  delete opts.attributes;

  const element = Object.assign(document.createElement(tagName), opts);

  if (children) {
    element.append(...children);
  }

  if (attributes) {
    attributes.forEach((attr) => element.setAttribute(attr.key, attr.value));
  }

  return element;
}
