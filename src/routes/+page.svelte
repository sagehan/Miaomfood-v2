<script>
    import { entity, SVMVQuery, MVMVQuery } from '$lib/store/entitiesStore';
    import ProductItem from '$lib/ProductItem.svelte';

    /**
     * get ':name' & ':identifier' of all the top ':MenuSection's
     */ 
    const getSections = () => MVMVQuery(`
        ?name ?identifier { ?s ^:hasMenuSection/^:hasMenu ?Restaurant;
            :name ?name;
            :identifier ?identifier;
            :position ?pos}
        ORDER BY ?pos`)

    /**
     * get ':name' & ':identifier' of all the sub ':MenuSection's
     * @param {string} identifier - ':MenuSection's ':identifier' value
     */
    const getSubSections = (identifier) => MVMVQuery(`
        ?name ?identifier { ?s ^:hasMenuSection/:identifier "${identifier}";
            :name ?name;
            :identifier ?identifier;
            :position ?pos}
        ORDER BY ?pos`)

    /**
     * get ':name' & ':identifier' of a ':Product'
     * @param {string} identifier - ':MenuSection's ':identifier' value
     */
    const getItemIDs = (identifier) => SVMVQuery(`
        ?productID { ?s ^:hasMenuItem/:identifier "${identifier}";
            :productID ?productID;
            :position ?pos}
        ORDER BY ?pos`)

    $: store = $entity.rdfStore;
    $: store, getSections();

</script>

{#if $entity.loading}
    <h1>loading data ...</h1>
{:else}
    <main id="poster">
        <div id="goods" class="goods grp">
            {#await getSections()}
                <p>loading...</p>
            {:then menuSections}
                {#each menuSections as section}
                <section id="{section.identifier}" class="category">
                    <h1 class="category__title">{section.name}</h1>
                    {#await getSubSections(section.identifier) then menuSections}
                        {#each menuSections as section}
                        <section id="{section.identifier}" class="category">
                            <h1 class="category__title">{section.name}</h1>
                            {#await getItemIDs(section.identifier) then productIDs}
                                {#each productIDs as productID }
                                    <ProductItem {productID}></ProductItem>
                                {/each}
                            {/await}
                        </section>
                        {/each}
                    {/await}
                </section>
                {/each}
            {/await}
        </div>
    </main>
{/if}