// @ts-check

/**
 * @param {'header' | 'nav' | 'main'} tagName
 * @param {{
 *   className?: string,
 * }} opts
 */
export default function createElement(tagName, opts) {
  const element = document.createElement(tagName);

  return Object.assign(element, opts);
}
