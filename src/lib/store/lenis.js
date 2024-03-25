import { map } from 'nanostores';

/** @typedef {import('@studio-freight/lenis/types').default} Lenis */
/** @typedef {import('nanostores').MapStore} MapStore */

/** @type {MapStore} */
export const lenisStore = map(Object.create(null));
