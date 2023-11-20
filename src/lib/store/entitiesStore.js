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
 * @param {string} variable
 * @param {string} queryStr
 * @returns {Promise<String>}
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
 * get multiple object values of a single predict term, reassemble into an unary array
 * 'SVMV' -> 'Single Variable Multiple Values'
 *
 * @param {string} variable
 * @param {string} queryStr
 * @returns {Promise<Array<string>>}
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
        return Promise.resolve(['loading...']);
    }
}

/**
 * get each single object value of multiple predict term, reassemble into an simple object
 * 'MVSV' -> 'Multiple Variables Single Value'
 *
 * @param {string} vars - should be two variable concatenated by a space chractor
 * @param {string} queryStr
 * @returns {Promise<object>}
 */
async function MVSVQuery(vars, queryStr) {
    const store = get(entity);
    if (!store.loading) {
        return await sparqlEngine.queryBindings(`
        PREFIX : <http://schema.org/>
        SELECT * ${queryStr}`,
            { sources: [store.rdfStore]})
        .then(bindingsStream => bindingsStream.toArray())
        .then(bindings => {
            const [k, v] = Array.from(vars).filter(e => e !== ' ');
            return bindings.reduce((obj, binding) => (
                Object.assign(
                    obj, { [prefixes.shrink(binding.get(k)).value]: binding.get(v)?.value })),
                {}
            );
        })
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
            { sources: [store.rdfStore]})
        .then(bindingsStream => bindingsStream.toArray())
        .then(bindings => {
            const assembleObj = (binding) => {
                const re = {};
                binding.forEach((term, variable) => Object.assign(
                    re,
                    {[variable.value]: 
                        term.termType === 'NamedNode' ? prefixes.shrink(term).value : term.value} ));
                return re;
            };
            return bindings.reduce(
                (arr, binding) => [...arr, assembleObj(binding)],
                []
            );
        })
    } else {
        return Promise.resolve([[{}]]);
    }
}

export { entity, init, SVSVQuery, SVMVQuery, MVSVQuery, MVMVQuery }
