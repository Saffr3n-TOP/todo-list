// @ts-check
import DB from '../db';
import createElement from '../utils/createElement';

import '../../assets/styles/form.css';

/**
 * @param {'POST' | 'PUT' | 'DELETE'} method
 * @param {(e: SubmitEvent) => void} onsubmit
 * @param {...HTMLElement} children
 */
export default function Form(method, onsubmit, ...children) {
  const submitBtn = /** @type {HTMLButtonElement} */ (
    createElement('button', {
      type: 'submit',
      className: 'button button_generic button_center',
      textContent:
        method === 'POST' ? 'Create' : method === 'PUT' ? 'Edit' : 'Delete'
    })
  );

  if (method === 'DELETE') submitBtn.classList.add('button_delete');

  const form = /** @type {HTMLFormElement} */ (
    createElement('form', {
      method,
      className: 'form',
      children: [...children, submitBtn],
      onsubmit
    })
  );

  return form;
}

/**
 * @param {'title' | 'description' | 'priority' | 'done' | 'due' | 'project'} name
 * @param {string | boolean} [value]
 */
export function FormField(name, value) {
  /** @type {HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement} */
  let input;

  if (name === 'title') {
    input = /** @type {HTMLInputElement} */ (
      createElement('input', { type: 'text', required: true })
    );
    if (value) input.value = /** @type {string} */ (value);
  } else if (name === 'due') {
    input = /** @type {HTMLInputElement} */ (
      createElement('input', { type: 'date', required: true })
    );
    if (value) input.value = /** @type {string} */ (value);
  } else if (name === 'done') {
    input = /** @type {HTMLInputElement} */ (
      createElement('input', { type: 'checkbox' })
    );
    if (value) input.checked = /** @type {boolean} */ (value);
  } else if (name === 'description') {
    input = /** @type {HTMLTextAreaElement} */ (createElement('textarea', {}));
    if (value) input.value = /** @type {string} */ (value);
  } else {
    input = /** @type {HTMLSelectElement} */ (
      createElement('select', { required: true })
    );
  }

  input.name = name;
  input.id = name;
  input.className = 'input';

  if (input instanceof HTMLSelectElement) {
    if (name === 'priority') {
      const optionLow = /** @type {HTMLOptionElement} */ (
        createElement('option', {
          value: 'low',
          textContent: 'Low'
        })
      );

      const optionMedium = /** @type {HTMLOptionElement} */ (
        createElement('option', {
          value: 'medium',
          textContent: 'Medium'
        })
      );

      const optionHigh = /** @type {HTMLOptionElement} */ (
        createElement('option', {
          value: 'high',
          textContent: 'High'
        })
      );

      input.append(optionLow, optionMedium, optionHigh);
      input.value = /** @type {string} */ (value) || 'medium';
    } else {
      DB.getProjectsSorted().map((project) => {
        const option = /** @type {HTMLOptionElement} */ (
          createElement('option', {
            value: project.id,
            textContent: project.title
          })
        );

        input.appendChild(option);
      });

      input.value =
        /** @type {string} */ (value) ||
        /** @type {HTMLOptionElement} */ (input.firstChild).value;
    }
  }

  const label = Object.assign(
    /** @type {HTMLLabelElement} */ (
      createElement('label', {
        htmlFor: name,
        className: 'label',
        textContent: name[0].toUpperCase() + name.slice(1),
        children: [input]
      })
    ),
    { input }
  );

  return label;
}
