<script>
    import { entity, SVMVQuery } from '$lib/store/entitiesStore';
    import ProductItem from '$lib/ProductItem.svelte';

    // get ':name' of all the top ':MenuSection's
    const getSections = () => SVMVQuery('MenuSection',
        `{ ?s ^:hasMenuSection/^:hasMenu ?Restaurant;
            :name ?MenuSection;
            :position ?pos}
        ORDER BY ?pos`)

    /**
     * get ':name' of all the sub ':MenuSection's
     * @param {string} name - ':MenuSection's ':name' value
     */
    const getSubSections = (name) => SVMVQuery('SubMenuSection',
        `{ ?s ^:hasMenuSection/:name "${name}"@zh;
            :name ?SubMenuSection;
            :position ?pos}
        ORDER BY ?pos`)

    /**
     *
     * @param {string} name - get ':MenuSection's ':name' value
     */
    const getItemIDs = (name) => SVMVQuery('productID',
        `{ ?s ^:hasMenuItem/:name "${name}"@zh;
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
                <section id="sectino" class="category">
                    <h1 class="category__title">{section}</h1>
                    {#await getSubSections(section) then menuSections}
                        {#each menuSections as section}
                        <section id="sectino" class="category">
                            <h1 class="category__title">{section}</h1>
                            {#await getItemIDs(section) then productIDs}
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