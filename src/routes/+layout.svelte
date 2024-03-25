<script>
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
    import Lenis from '@studio-freight/lenis';

    import { onMount } from 'svelte';

    import rdfParser from 'rdf-parse';
    import Streamify from 'streamify-string';
    import { init, entity, SVSVQuery } from '$lib/store/entitiesStore';
    import { lenisStore as lenis } from '$lib/store/lenis';
    export let data;

    (async function state() {
        try {
            if ($entity.loading) {
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

    onMount(() => {
        const lenisInstance = new Lenis({
            infinite: true
        });
        lenis.set(lenisInstance);

        gsap.registerPlugin(ScrollTrigger);

        gsap.ticker.add((time)=>{
            $lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        $lenis.on('scroll', ScrollTrigger.update)
    })
</script>

<slot></slot>
