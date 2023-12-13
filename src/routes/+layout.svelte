<script>
    import rdfParser from 'rdf-parse';
    import Streamify from 'streamify-string';
    import { init, entity, SVSVQuery } from '$lib/store/entitiesStore';
    import { get } from 'svelte/store';
    export let data;

    /** @type { string } */
    let name;

    (async function state() {
        try {
            const store = get(entity);
            if (store.loading) {
                const quadStream = rdfParser.parse(Streamify(data.result),
                    {contentType: 'text/turtle', baseIRI: 'http://schema.org/' });
                /*quadStream.on('end', () => {
                    console.log("Quad stream reassembled");
                });*/
                await init(quadStream)}
        } catch (error) {
            console.error('Error init rdfStore:', error);
        }
    })();
</script>

<slot></slot>
