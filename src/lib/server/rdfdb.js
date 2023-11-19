import { createReadStream } from "fs";
import rdfParser from "rdf-parse";
import { storeStream } from "rdf-store-stream";
import { QueryEngine } from '@comunica/query-sparql-rdfjs';

const rdfDB = await storeStream(rdfParser.parse(createReadStream(
    'src/lib/store/miaomfood.n3'), { contentType: 'text/n3' }));
const sparqlEngine = new QueryEngine();

async function state () {
    return await sparqlEngine.query(`
        PREFIX : <http://schema.org/>
        CONSTRUCT WHERE  { ?s ?p ?o }`,
            { sources: [rdfDB]})
        .then(res => sparqlEngine.resultToString(res,'text/turtle'))
        .then(res => res.data)
        .then(async res => {
            const chunks = [];
            for await (const chunk of res) {
                chunks.push(Buffer.from(chunk))
            };
            return Buffer.concat(chunks).toString("utf-8");
        })}

export default state;