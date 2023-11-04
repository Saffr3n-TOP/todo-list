// @ts-check
import createElement from '../utils/createElement';

// @ts-ignore
import closeIconSrc from '../../assets/icons/close.svg';
import '../../assets/styles/dialog.css';

/**
 * @param {string} headingText
 * @param {HTMLElement} openedBy
 * @param {...HTMLElement} children
 */
export default function Dialog(headingText, openedBy, ...children) {
  const ariaLabel = 'dialog-label';
  const transitionClass = 'dialog_transition';

  const heading = /** @type {HTMLHeadingElement} */ (
    createElement('h1', {
      id: ariaLabel,
      className: 'heading heading_primary heading_center',
      textContent: headingText
    })
  );

  const closeBtnIcon = /** @type {HTMLImageElement} */ (
    createElement('img', {
      src: closeIconSrc,
      alt: 'Close dialog',
      className: 'button__icon'
    })
  );

  const closeBtn = /** @type {HTMLButtonElement} */ (
    createElement('button', {
      type: 'button',
      className: 'button button_svg dialog__button',
      children: [closeBtnIcon],
      onclick: () => dialog.close()
    })
  );

  const content = /** @type {HTMLDivElement} */ (
    createElement('div', {
      className: 'dialog__content',
      children: [closeBtn, heading, ...children]
    })
  );

  captureFocus(content);

  const dialog = Object.assign(
    /** @type {HTMLDivElement} */ (
      createElement('div', {
        className: `dialog ${transitionClass}`,
        role: 'dialog',
        attributes: [
          { key: 'aria-labelledby', value: ariaLabel },
          { key: 'aria-modal', value: 'true' }
        ],
        children: [content],
        onclick: (e) => {
          const clickedElement = /** @type {HTMLElement} */ (e.target);
          if (!clickedElement.classList.contains('dialog')) return;
          dialog.close();
        },
        onkeydown: (e) => {
          if (e.key !== 'Escape') return;
          dialog.close();
        }
      })
    ),
    {
      open: () => {
        const root = document.querySelector('.root');
        root?.appendChild(dialog);
        openedBy.setAttribute('aria-expanded', 'true');
        closeBtn.focus();
        setTimeout(() => dialog.classList.remove(transitionClass));
      },

      close: () => {
        dialog.classList.add(transitionClass);
        openedBy.setAttribute('aria-expanded', 'false');
        openedBy.focus();
        setTimeout(() => dialog.remove(), 200);
      }
    }
  );

  return dialog;
}

/** @param {HTMLElement} element */
function captureFocus(element) {
  const focusableElements = /** @type {NodeListOf<HTMLElement>} */ (
    element.querySelectorAll(
      '.input:not(disabled), .button:not(disabled), [href], [tabIndex]:not([tabIndex="-1"])'
    )
  );

  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  firstFocusableElement.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !e.shiftKey) return;
    e.preventDefault();
    lastFocusableElement.focus();
  });

  lastFocusableElement.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || e.shiftKey) return;
    e.preventDefault();
    firstFocusableElement.focus();
  });
}
