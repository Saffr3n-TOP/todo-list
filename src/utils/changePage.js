// @ts-check

/** @param {HTMLDivElement} page */
export default function changePage(page) {
  const main = /** @type {HTMLElement} */ (document.querySelector('.main'));
  main.innerHTML = '';
  main.appendChild(page);
}
