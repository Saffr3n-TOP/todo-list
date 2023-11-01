/** @namespace Types */

/**
 * @typedef Project
 * @prop {string} id
 * @prop {string} title
 * @prop {string} description
 * @prop {string} created
 * @prop {Todo[]} todos
 * @memberof Types
 */

/**
 * @typedef Todo
 * @prop {string} id
 * @prop {string} title
 * @prop {string} description
 * @prop {string} priority
 * @prop {boolean} done
 * @prop {string} due
 * @prop {string} created
 * @prop {string} projectId
 * @memberof Types
 */

export {};
