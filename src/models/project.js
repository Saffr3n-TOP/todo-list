// @ts-check

/**
 * @param {string} title
 * @param {string} description
 * @returns {import("../types").Project}
 */
export default function Project(title, description) {
  return {
    id: Date.now().toString(),
    title,
    description,
    created: new Date().toISOString().slice(0, 10),
    todos: []
  };
}
