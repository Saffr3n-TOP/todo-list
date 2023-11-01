// @ts-check

/**
 * @param {string} title
 * @param {string} description
 * @param {string} priority
 * @param {string} due
 * @param {string} projectId
 * @returns {import("../types").Todo}
 */
export default function Todo(title, description, priority, due, projectId) {
  return {
    id: Date.now().toString(),
    title,
    description,
    priority,
    done: false,
    due,
    created: new Date().toISOString().slice(0, 10),
    projectId
  };
}
