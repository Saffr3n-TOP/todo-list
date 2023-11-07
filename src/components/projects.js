// @ts-check
import DB from '../db';
import Project from '../models/project';
import Todo from '../models/todo';
import createElement from '../utils/createElement';
import changePage from '../utils/changePage';

import Card from './card';
import Dialog from './dialog';

/** @param {string} [projectId] */
export default function Projects(projectId) {
  if (!projectId) return projectCollection();
  else return projectDocument(projectId);
}

function projectCollection() {
  const projects = DB.getProjectsSorted();

  const heading = /** @type {HTMLHeadingElement} */ (
    createElement('h1', {
      className: 'heading heading_primary heading_center',
      textContent: 'All Projects'
    })
  );

  const cards = /** @type {HTMLDivElement} */ (
    createElement('div', {
      className: 'cards',
      children: projects.map((project) => Card(project, 'project'))
    })
  );

  const newProjectBtn = /** @type {HTMLButtonElement} */ (
    createElement('button', {
      type: 'button',
      className: 'button button_generic button_center',
      textContent: 'New Project',
      attributes: [
        { key: 'aria-haspopup', value: 'true' },
        { key: 'aria-expanded', value: 'false' }
      ],
      onclick: () => {
        import('./form').then(({ default: Form, FormField }) => {
          const titleField = FormField('title');
          const descriptionField = FormField('description');

          const form = Form(
            'POST',
            (e) => {
              e.preventDefault();
              if (!form.checkValidity()) return;

              const project = Project(
                titleField.input.value,
                descriptionField.input.value
              );

              DB.updateProject(project);
              changePage(Projects());
              dialog.close();
            },
            titleField,
            descriptionField
          );

          const dialog = Dialog('Create Project', newProjectBtn, form);
          dialog.open();
        });
      }
    })
  );

  const collection = /** @type {HTMLDivElement} */ (
    createElement('div', {
      className: 'main__collection',
      children: [heading, cards, newProjectBtn]
    })
  );

  return collection;
}

/** @param {string} projectId */
function projectDocument(projectId) {
  const project = DB.getProject(projectId);

  const heading = /** @type {HTMLHeadingElement} */ (
    createElement('h1', {
      className: 'heading heading_primary heading_center',
      textContent: project.title
    })
  );

  const description = /** @type {HTMLParagraphElement} */ (
    createElement('p', {
      className: 'text text_center',
      textContent: project.description
    })
  );

  const details = /** @type {HTMLDivElement} */ (
    createElement('div', {
      className: 'main__details',
      children: [
        /** @type {HTMLSpanElement} */ (
          createElement('span', {
            className: 'text text_small text_end',
            textContent: 'Todos: ',
            children: [
              /** @type {HTMLSpanElement} */ (
                createElement('span', {
                  className: 'text_bold',
                  textContent: Object.keys(project.todos).length.toString()
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
                  textContent: new Date(project.created).toLocaleDateString()
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
      attributes: [
        { key: 'aria-haspopup', value: 'true' },
        { key: 'aria-expanded', value: 'false' }
      ],
      onclick: () => {
        import('./form').then(({ default: Form, FormField }) => {
          const titleField = FormField('title', project.title);
          const descriptionField = FormField(
            'description',
            project.description
          );

          const form = Form(
            'PUT',
            (e) => {
              e.preventDefault();
              if (!form.checkValidity()) return;

              project.title = titleField.input.value;
              project.description = descriptionField.input.value;

              DB.updateProject(project);
              changePage(Projects(projectId));
              dialog.close();
            },
            titleField,
            descriptionField
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
      attributes: [
        { key: 'aria-haspopup', value: 'true' },
        { key: 'aria-expanded', value: 'false' }
      ],
      onclick: () => {
        import('./form').then(({ default: Form }) => {
          const form = Form('DELETE', (e) => {
            e.preventDefault();
            DB.deleteProject(projectId);
            changePage(Projects());
            dialog.close();
          });

          const dialog = Dialog(
            'WARNING',
            deleteBtn,
            createElement('p', {
              className: 'text text_center',
              textContent:
                'Are you sure you want to delete this project with all its todos? This action is irreversible!'
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

  const separator = createElement('hr', {});

  const subheading = /** @type {HTMLHeadingElement} */ (
    createElement('h2', {
      className: 'heading heading_secondary heading_center',
      textContent: 'Todos'
    })
  );

  const cards = /** @type {HTMLDivElement} */ (
    createElement('div', {
      className: 'cards',
      children: DB.getTodosSorted(project.id).map((todo) => Card(todo, 'todo'))
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
          const projectField = FormField('project', project.id);
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
              changePage(Projects(projectId));
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

  const document = /** @type {HTMLDivElement} */ (
    createElement('div', {
      className: 'main__document',
      children: [
        heading,
        description,
        details,
        controls,
        separator,
        subheading,
        cards.childElementCount ? cards : info,
        newTodoBtn
      ]
    })
  );

  return document;
}
