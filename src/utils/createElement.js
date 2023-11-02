// @ts-check

/**
 * @param {'header' | 'nav' | 'main' | 'h1' | 'span' | 'a' | 'img' | 'ul' | 'li'} tagName
 * @param {{
 *   children?: HTMLElement[],
 *   attributes?: { key: string, value: string }[],
 *   className?: string,
 *   textContent?: string,
 *   href?: string,
 *   alt?: string,
 *   src?: string,
 *   onclick?: (e: MouseEvent) => void
 * }} opts
 */
export default function createElement(tagName, opts) {
  const element = document.createElement(tagName);

  if (opts.children) {
    element.append(...opts.children);
    delete opts.children;
  }

  if (opts.attributes) {
    opts.attributes.forEach((attr) =>
      element.setAttribute(attr.key, attr.value)
    );

    delete opts.attributes;
  }

  return Object.assign(element, opts);
}
