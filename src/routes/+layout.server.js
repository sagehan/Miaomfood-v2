import state from '$lib/server/rdfdb';

/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
    return { result: await state()};
}
