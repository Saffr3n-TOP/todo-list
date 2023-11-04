// @ts-check

/**
 * @param {'header' | 'nav' | 'main' | 'div' | 'span' | 'h1' | 'h2' | 'p' | 'a' | 'button' | 'img' | 'ul' | 'li' | 'form' | 'label' | 'input' | 'textarea' | 'select' | 'option'} tagName
 * @param {{
 *   children?: HTMLElement[],
 *   attributes?: { key: string, value: string }[],
 *   id?: string,
 *   className?: string,
 *   textContent?: string,
 *   role?: 'dialog',
 *   type?: 'button' | 'submit' | 'text' | 'date' | 'checkbox',
 *   name?: string,
 *   value?: string,
 *   required?: boolean,
 *   htmlFor?: string,
 *   href?: string,
 *   alt?: string,
 *   src?: string,
 *   method?: 'POST' | 'PUT' | 'DELETE',
 *   onclick?: (e: MouseEvent) => void,
 *   onkeydown?: (e: KeyboardEvent) => void,
 *   onsubmit?: (e: SubmitEvent) => void
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
