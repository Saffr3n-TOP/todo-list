// @ts-check
import Project from './models/project';

const DB = {
  /** @returns {{ [id: string]: import('./types').Project }} */
  getProjects: function () {
    return JSON.parse(
      /** @type {string} */ (window.localStorage.getItem('projects'))
    );
  },

  getProjectsSorted: function () {
    /** @type {import('./types').Project[]} */
    const projectsSorted = [];
    const projects = this.getProjects();

    Object.keys(projects).forEach((projectId) => {
      const project = projects[projectId];
      projectsSorted.push(project);
    });

    projectsSorted.sort(
      (currProject, nextProject) =>
        +new Date(nextProject.created) - +new Date(currProject.created)
    );

    return projectsSorted;
  },

  /** @param {string} projectId */
  getProject: function (projectId) {
    const projects = this.getProjects();
    return projects[projectId];
  },

  /** @param {import('./types').Project} project */
  updateProject: function (project) {
    const projects = this.getProjects();
    projects[project.id] = project;
    setProjects(projects);
  },

  /** @param {string} projectId */
  deleteProject: function (projectId) {
    const projects = this.getProjects();
    delete projects[projectId];
    setProjects(projects);
    this.initialize();
  },

  /** @param {string} [projectId] */
  getTodos: function (projectId) {
    if (projectId) {
      return this.getProject(projectId).todos;
    }

    /** @type {{ [id: string]: import('./types').Todo }} */
    let todos = {};
    const projects = this.getProjects();

    Object.keys(projects).forEach((projectId) => {
      const projectTodos = projects[projectId].todos;
      todos = { ...todos, ...projectTodos };
    });

    return todos;
  },

  /** @param {string} [projectId] */
  getTodosSorted: function (projectId) {
    /** @type {import('./types').Todo[]} */
    const todosSorted = [];
    const todos = this.getTodos(projectId);

    Object.keys(todos).forEach((todoId) => {
      const todo = todos[todoId];
      todosSorted.push(todo);
    });

    todosSorted.sort(
      (currTodo, nextTodo) => +new Date(currTodo.due) - +new Date(nextTodo.due)
    );

    return todosSorted;
  },

  /** @param {string} todoId */
  getTodo: function (todoId) {
    const todos = this.getTodos();
    return todos[todoId];
  },

  /** @param {import('./types').Todo} todo */
  updateTodo: function (todo) {
    const projects = this.getProjects();
    const project = projects[todo.projectId];
    const todos = project.todos;
    todos[todo.id] = todo;
    setProjects(projects);
  },

  /** @param {string} todoId */
  deleteTodo: function (todoId) {
    const projects = this.getProjects();
    const todo = this.getTodo(todoId);
    const project = projects[todo.projectId];
    delete project.todos[todoId];
    setProjects(projects);
  },

  initialize: function () {
    const projects = this.getProjects();
    if (projects && Object.keys(projects).length) return;

    const defaultProject = Project(
      'Default Project',
      'Default project for demonstrative purpose. It was created automatically, because you do not have any other projects yet.'
    );

    setProjects();
    this.updateProject(defaultProject);
  }
};

/** @param {{ [id: string]: import('./types').Project }} [projects] */
function setProjects(projects) {
  window.localStorage.setItem('projects', JSON.stringify(projects || {}));
}

export default DB;
