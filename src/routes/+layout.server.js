import state from '$lib/server/rdfdb';

export async function load() {
    return { result: await state()};
}
