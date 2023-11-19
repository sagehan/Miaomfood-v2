import { storeStream } from "rdf-store-stream";
import { RdfStore } from 'rdf-stores';
import { QueryEngine } from '@comunica/query-sparql-rdfjs';
import { get, readonly, writable } from 'svelte/store';

const sparqlEngine = new QueryEngine();

// reload rdf data exported from server into memory on the client-side
const entityStore = (() => {
    const { subscribe, set, update } = writable({
        loading: true,
        rdfStore: RdfStore.createDefault()
    });
    return {
        subscribe,
        set,
        update,
    }
})();

const entity = readonly(entityStore);

/**
 *
 * @param {import('@rdfjs/types').Stream} quadStream
 */
async function init (quadStream) {
    const store = get(entityStore);
    if (store.loading) {
        entityStore.set({
            loading: false,
            rdfStore: await storeStream(quadStream)});
        return entityStore;
    } else {
        //this should be never happen
        console.log('you have been catched!');
        return entityStore;
    }
}

/**
 *
 * @param {string} queryStr
 * @param {string} variable
 */
async function SVSVQuery(variable, queryStr) {
    const store = get(entity);
    if (!store.loading) {
        return await sparqlEngine.queryBindings(`
        PREFIX : <http://schema.org/>
        SELECT ?${variable} ${queryStr} LIMIT 1`,
            { sources: [store.rdfStore]})
        .then(bindingsStream => bindingsStream.toArray())
        .then(array => array[0].get(variable)?.value)
    } else {
        return Promise.resolve('loading...');
    }
}

/**
 * get multiple object values of a single predict term
 * 'SVMV' -> 'Single Variable Multiple Values'
 * @param {string} variable
 * @param {string} queryStr
 */
async function SVMVQuery(variable, queryStr) {
    const store = get(entity);
    if (!store.loading) {
        return await sparqlEngine.queryBindings(`
        PREFIX : <http://schema.org/>
        SELECT ?${variable} ${queryStr}`,
            { sources: [store.rdfStore]})
        .then(bindingsStream => bindingsStream.toArray())
        .then(bindings => {
            return bindings.reduce(
                // @ts-ignore
                (arr, binding) => [...arr, binding.get(variable)?.value],
                []
            );
        })
    } else {
        return Promise.resolve('loading...');
    }
}

export { entity, init, SVSVQuery, SVMVQuery }
