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
    <main id="poster" role="main">
        {#await getSections()}
            <p>loading...</p>
        {:then menuSections}
        <ul id="menu">
            {#each menuSections as section}
            <li id="{section.identifier}" class="section">
                <h1>{section.name}</h1>
                {#await getSubSections(section.identifier) then menuSections}
                <ul class="submenu">
                    {#each menuSections as section}
                    <li id="{section.identifier}" class="subsection">
                        <h1>{section.name}</h1>
                        {#await getItemIDs(section.identifier) then productIDs}
                        <ul role="group">
                            {#each productIDs as productID }
                            <li>
                                <ProductItem {productID}></ProductItem>
                            </li>
                            {/each}
                        </ul>
                        {/await}
                    </li>
                    {/each}
                </ul>
                {/await}
            </li>
            {/each}
        </ul>
        {/await}
    </main>
{/if}

<style lang="scss">
    :global {
        @import 'src/styles/base';
        @import 'src/styles/themes/defaults';
    }

    //Typesetting
    #menu li > h1    { font-size: var(--s2); }
    #menu li > ul h1 { font-size: var(--s1); }

    // Layout
    #poster { margin-inline: auto; }

    @media only screen and (max-width: 320px) {
        #poster { inline-size: max-content;}
    }

    ul#menu,
    ul#menu :is(ul,li) {
        max-inline-size: none;

        h1 {
            position: sticky;
            inset-inline-start: var(--s1);
        }
    }

    #menu { //TODO: clamp max/min inline/block flex intrinsic ratio stuff
        padding-inline: var(--grid-gutter);

        display: flex;
        flex-flow: wrap;
        gap: var(--grid-gutter);

        .section {
            padding: var(--grid-gutter);

            &#TASTY { flex: 999; }

            &#DRINKS {
                flex: 1;
                max-block-size: calc(
                    (var(--grid-max-width) - var(--grid-gutter) * 3) * 4/12
                );

                @media (min-width: 320px) {
                    > .submenu {
                        position: sticky;
                        inset-inline-start: var(--s1);
                    }
                }
            }

            > .submenu {
                inline-size: max-content;
                display: flex;
            }
        }
    }

    .subsection {
        flex: max-content;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
    }

    [role="group"] {      
        display: flex;
        flex-flow: column-reverse wrap;
        max-block-size: calc(
            (var(--grid-max-width) - var(--grid-gutter) * 1) * 8/12
        );
    }

    // Appearance
    /*:is(#menu, .submenu, .section, .subsection, article):hover {
        outline: calc(var(--outline_thickness) * var(--OUTLINE_SWITCH)) solid;
    } /*for debuging*/

    #TASTY  { background-color: var(--tasty_bg ); }
    #DRINKS { background-color: var(--drinks_bg); }
</style>