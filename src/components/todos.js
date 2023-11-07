// @ts-check
import DB from '../db';
import Todo from '../models/todo';
import createElement from '../utils/createElement';
import changePage from '../utils/changePage';

import Card from './card';
import Dialog from './dialog';

/** @param {string} [which] */
export default function Todos(which) {
  if (!which || which === 'today' || which === 'week') {
    return todoCollection(which);
  } else return todoDocument(which);
}

/** @param {string} [which] */
function todoCollection(which) {
  const todos = DB.getTodosSorted();

  const heading = /** @type {HTMLHeadingElement} */ (
    createElement('h1', {
      className: 'heading heading_primary heading_center',
      textContent: `${
        which ? (which === 'today' ? "Today's" : 'Weekly') : 'All'
      } Todos`
    })
  );

  const cards = /** @type {HTMLDivElement} */ (
    createElement('div', {
      className: 'cards',
      children: /** @type {HTMLAnchorElement[]} */ (
        todos
          .map((todo) => {
            const maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + (which === 'week' ? 6 : 0));

            if (
              !which ||
              (+new Date(todo.due) <= +maxDate &&
                +new Date(todo.due) >= +new Date())
            ) {
              return Card(todo, 'todo');
            }
          })
          .filter(Boolean)
      )
    })
  );

  const info = /** @type {HTMLParagraphElement} */ (
    createElement('p', {
      className: 'text text_center',
      textContent: 'There are no todos yet...'
    })
  );

  const newTodoBtn = /** @type {HTMLButtonElement} */ (
    createElement('button', {
      type: 'button',
      className: 'button button_generic button_center',
      textContent: 'New Todo',
      attributes: [
        { key: 'aria-haspopup', value: 'true' },
        { key: 'aria-expanded', value: 'false' }
      ],
      onclick: () => {
        import('./form').then(({ default: Form, FormField }) => {
          const titleField = FormField('title');
          const descriptionField = FormField('description');
          const projectField = FormField('project');
          const priorityField = FormField('priority');
          const dueField = FormField('due');

          const form = Form(
            'POST',
            (e) => {
              e.preventDefault();
              if (!form.checkValidity()) return;

              const todo = Todo(
                titleField.input.value,
                descriptionField.input.value,
                priorityField.input.value,
                dueField.input.value,
                projectField.input.value
              );

              DB.updateTodo(todo);
              changePage(Todos(which));
              dialog.close();
            },
            titleField,
            descriptionField,
            projectField,
            priorityField,
            dueField
          );

          const dialog = Dialog('Create Todo', newTodoBtn, form);
          dialog.open();
        });
      }
    })
  );

  const collection = /** @type {HTMLDivElement} */ (
    createElement('div', {
      className: 'main__collection',
      children: [heading, cards.childElementCount ? cards : info, newTodoBtn]
    })
  );

  return collection;
}

/** @param {string} todoId */
function todoDocument(todoId) {
  const todo = DB.getTodo(todoId);

  const heading = /** @type {HTMLHeadingElement} */ (
    createElement('h1', {
      className: 'heading heading_primary heading_center',
      textContent: todo.title
    })
  );

  const status = createElement('p', {
    className: `text text_small text_center text_bold text_${
      todo.done
        ? 'green'
        : +new Date(todo.due) >= +new Date()
        ? 'orange'
        : 'red'
    }`,
    textContent: `(${
      todo.done
        ? 'Completed'
        : +new Date(todo.due) >= +new Date()
        ? 'Ongoing'
        : 'Overdue'
    })`
  });

  const description = /** @type {HTMLParagraphElement} */ (
    createElement('p', {
      className: 'text text_center',
      textContent: todo.description
    })
  );

  const details = /** @type {HTMLDivElement} */ (
    createElement('div', {
      className: 'main__details',
      children: [
        /** @type {HTMLSpanElement} */ (
          createElement('span', {
            className: 'text text_small text_end',
            textContent: 'Project: ',
            children: [
              /** @type {HTMLSpanElement} */ (
                createElement('a', {
                  href: `./projects/${todo.projectId}`,
                  className: 'link',
                  textContent: DB.getProject(todo.projectId).title
                })
              )
            ]
          })
        ),
        /** @type {HTMLSpanElement} */ (
          createElement('span', {
            className: 'text text_small text_end ',
            textContent: 'Priority: ',
            children: [
              /** @type {HTMLSpanElement} */ (
                createElement('span', {
                  className: `text_bold text_${
                    todo.priority === 'low'
                      ? 'green'
                      : todo.priority === 'high'
                      ? 'red'
                      : 'orange'
                  }`,
                  textContent: todo.priority
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
                  textContent: new Date(todo.due).toLocaleDateString()
                })
              )
            ]
          })
        ),
        /** @type {HTMLSpanElement} */ (
          createElement('span', {
            className: 'text text_small text_end',
            textContent: 'Created: ',
            children: [
              /** @type {HTMLSpanElement} */ (
                createElement('span', {
                  className: 'text_bold',
                  textContent: new Date(todo.created).toLocaleDateString()
                })
              )
            ]
          })
        )
      ]
    })
  );

  const editBtn = /** @type {HTMLButtonElement} */ (
    createElement('button', {
      className: 'button button_generic',
      textContent: 'Edit',
      onclick: () => {
        import('./form').then(({ default: Form, FormField }) => {
          const titleField = FormField('title', todo.title);
          const descriptionField = FormField('description', todo.description);
          const priorityField = FormField('priority', todo.priority);
          const doneField = FormField('done', todo.done);

          const form = Form(
            'PUT',
            (e) => {
              e.preventDefault();
              if (!form.checkValidity()) return;

              todo.title = titleField.input.value;
              todo.description = descriptionField.input.value;
              todo.priority = priorityField.input.value;
              todo.done = /** @type {HTMLInputElement} */ (
                doneField.input
              ).checked;

              DB.updateTodo(todo);
              changePage(Todos(todoId));
              dialog.close();
            },
            titleField,
            descriptionField,
            priorityField,
            doneField
          );

          const dialog = Dialog('Edit Todo', editBtn, form);
          dialog.open();
        });
      }
    })
  );

  const deleteBtn = /** @type {HTMLButtonElement} */ (
    createElement('button', {
      className: 'button button_generic button_delete',
      textContent: 'Delete',
      onclick: () => {
        import('./form').then(({ default: Form }) => {
          const form = Form('DELETE', (e) => {
            e.preventDefault();
            DB.deleteTodo(todoId);
            changePage(Todos());
            dialog.close();
          });

          const dialog = Dialog(
            'WARNING',
            deleteBtn,
            createElement('p', {
              className: 'text text_center',
              textContent:
                'Are you sure you want to delete this todo? This action is irreversible!'
            }),
            form
          );
          dialog.open();
        });
      }
    })
  );

  const controls = /** @type {HTMLDivElement} */ (
    createElement('div', {
      className: 'main__controls',
      children: [editBtn, deleteBtn]
    })
  );

  const document = /** @type {HTMLDivElement} */ (
    createElement('div', {
      className: 'main__document',
      children: [heading, status, description, details, controls]
    })
  );

  return document;
}
