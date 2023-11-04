// @ts-check
import createElement from '../utils/createElement';
import handleLinkClick from '../utils/handleLinkClick';

/**
 * @param {import("../types").Project | import("../types").Todo} document
 * @param {'project' | 'todo'} type
 */
export default function Card(document, type) {
  const title = /** @type {HTMLHeadingElement} */ (
    createElement('h2', {
      className: 'heading heading_secondary cards__heading',
      textContent: document.title
    })
  );

  const description = /** @type {HTMLParagraphElement} */ (
    createElement('p', {
      className: 'text cards__text',
      textContent: document.description
    })
  );

  const info = /** @type {HTMLDivElement} */ (
    createElement('div', {
      className: 'cards__info',
      children:
        type === 'todo'
          ? [
              /** @type {HTMLSpanElement} */ (
                createElement('span', {
                  className: 'text text_small text_end',
                  textContent: 'Priority: ',
                  children: [
                    /** @type {HTMLSpanElement} */ (
                      createElement('span', {
                        className: `text_bold text_${
                          /** @type {import('../types').Todo} */ (document)
                            .priority === 'low'
                            ? 'green'
                            : /** @type {import('../types').Todo} */ (document)
                                .priority === 'high'
                            ? 'red'
                            : 'orange'
                        }`,
                        textContent: /** @type {import('../types').Todo} */ (
                          document
                        ).priority
                      })
                    )
                  ]
                })
              ),
              /** @type {HTMLSpanElement} */ (
                createElement('span', {
                  className: 'text text_small text_end',
                  textContent: 'Due: ',
                  children: [
                    /** @type {HTMLSpanElement} */ (
                      createElement('span', {
                        className: 'text_bold',
                        textContent: new Date(
                          /** @type {import('../types').Todo} */ (document).due
                        ).toLocaleDateString()
                      })
                    )
                  ]
                })
              )
            ]
          : [
              /** @type {HTMLSpanElement} */ (
                createElement('span', {
                  className: 'text text_small text_end',
                  textContent: 'Todos: ',
                  children: [
                    /** @type {HTMLSpanElement} */ (
                      createElement('span', {
                        className: 'text_bold',
                        textContent: Object.keys(
                          /** @type {import('../types').Project} */ (document)
                            .todos
                        ).length.toString()
                      })
                    )
                  ]
                })
              )
            ]
    })
  );

  const card = /** @type {HTMLAnchorElement} */ (
    createElement('a', {
      href: `./${type}s/${document.id}`,
      className: 'cards__item',
      onclick: handleLinkClick,
      children: [title, description, info]
    })
  );

  if (type === 'todo')
    card.classList.add(
      `cards__item_${
        /** @type {import('../types').Todo} */ (document).done ? 'green' : 'red'
      }`
    );

  return card;
}
