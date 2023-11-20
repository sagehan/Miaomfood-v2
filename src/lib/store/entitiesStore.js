import rdf from '@rdfjs/data-model';
import PrefixMap from '@rdfjs/prefix-map';
import { storeStream } from "rdf-store-stream";
import { RdfStore } from 'rdf-stores';
import { QueryEngine } from '@comunica/query-sparql-rdfjs';
import { get, readonly, writable } from 'svelte/store';

const sparqlEngine = new QueryEngine();

// @ts-ignore
const prefixes = new PrefixMap([
    ['', rdf.namedNode('http://schema.org/')],
    ['owl', rdf.namedNode('http://www.w3.org/2002/07/owl#')],
    ['miaomfood', rdf.namedNode('https://miaomfood.com/')]
], { factory: rdf });

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
 * get single object values of a single predict term, return a single string value
 * 'SVMV' -> 'Single Variable Multiple Values'
 *
 * @param {string} queryStr
 * @returns {Promise<String>}
 */
async function SVSVQuery(queryStr) {
    const store = get(entity);
    if (!store.loading) {
        return await sparqlEngine.queryBindings(`
            PREFIX : <http://schema.org/>
            SELECT ${queryStr} LIMIT 1`,
            { sources: [store.rdfStore]})
        .then(bindingsStream => bindingsStream.toArray())
        .then(bindingsArr => [...bindingsArr[0].entries][0][1].value)
    } else {
        return Promise.resolve('loading...');
    }
}

/**
 * get multiple object values of a single predict term, reassemble into an unary array
 * 'SVMV' -> 'Single Variable Multiple Values'
 *
 * @param {string} queryStr
 * @returns {Promise<Array<string>>}
 */
async function SVMVQuery(queryStr) {
    const store = get(entity);
    if (!store.loading) {
        return await sparqlEngine.queryBindings(`
            PREFIX : <http://schema.org/>
            SELECT ${queryStr}`,
            { sources: [store.rdfStore]})
        .then(bindingsStream => bindingsStream.toArray())
        .then(bindingsArr =>
            bindingsArr.reduce(
                (arr, bindings) => [...arr, [...bindings.entries][0][1].value],
                []
            )
        )
    } else {
        return Promise.resolve(['loading...']);
    }
}

/**
 * get each single object value of multiple predict term, reassemble into an simple object
 * 'MVSV' -> 'Multiple Variables Single Value'
 *
 * @param {string} queryStr - only support querying a pair of variables, the first should be 
 *                            a predicate variable, the second should be an object variable
 * @returns {Promise<object>}
 */
async function MVSVQuery(queryStr) {
    const store = get(entity);
    if (!store.loading) {
        return await sparqlEngine.queryBindings(`
            PREFIX : <http://schema.org/>
            SELECT ${queryStr}`,
            { sources: [store.rdfStore]}
        )
        .then(bindingsStream => bindingsStream.toArray())
        .then(bindingsArr => (
            bindingsArr.reduce(
                (obj, bindings) =>
                    Object.assign(obj, {
                        [prefixes.shrink([...bindings.entries][0][1]).value]:
                        [...bindings.entries][1][1].value
                    }),
                {}
            )
        ))
    } else {
        return Promise.resolve({});
    }
}

/**
 * find multiple blanknode values of a single predict term, then get multiple object values 
 * of multiple predict term for each of those blanknode, reassemble into an array of objects
 * 'MVMV' -> 'Multiple Variables Single Value'
 *
 * @param {string} queryStr
 * @returns {Promise<Array<Array<object>>>}
 */
async function MVMVQuery(queryStr) {
    const store = get(entity);
    if (!store.loading) {
        return await sparqlEngine.queryBindings(`
            PREFIX : <http://schema.org/>
            SELECT ${queryStr}`,
            { sources: [store.rdfStore]}
        )
        .then(bindingsStream => bindingsStream.toArray())
        .then(bindingsArr =>
            bindingsArr.reduce(
                (arr, bindings) =>
                    [...arr, Object.fromEntries(
                        [...bindings.entries].reduce(
                            (arr, term) => [...arr, Array.from(
                                [term[0],
                                term[1].termType === 'NamedNode' ? prefixes.shrink(term[1]).value : term[1].value ])],
                            []
                        )
                    )],
                []
            )
        )
    } else {
        return Promise.resolve([[{}]]);
    }
}

export { entity, init, SVSVQuery, SVMVQuery, MVSVQuery, MVMVQuery }
