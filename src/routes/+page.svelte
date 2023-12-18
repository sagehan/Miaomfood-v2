<script>
    import { entity, SVMVQuery, MVMVQuery } from '$lib/store/entitiesStore';
    import ProductItem from '$lib/ProductItem.svelte';
    import StickyBanner from '$lib/StickyBanner.svelte';
    import Campaign from '$lib/Campaign.svelte';
    
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
     * get all the 'productID's of a specific sub ':MenuSection'
     * @param {string} identifier - ':MenuSection's ':identifier' value
     */
    const getItemIDs = (identifier) => SVMVQuery(`
        ?productID { ?s ^:hasMenuItem/:identifier "${identifier}";
            :productID ?productID;
            :position ?pos}
        ORDER BY ?pos`)

    $: $entity.rdfStore, getSections();

</script>

<header id="VCARD"><StickyBanner /></header>
<main>
    <div id="CAMPAIGN"><Campaign /></div>
    {#if $entity.loading}
    <h1>loading data ...</h1>
{:else} {#await getSections()}
    <p>loading menu...</p>
    {:then menuSections}
    <ul id="MENU">
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
{/await} {/if}
</main>

<style lang="scss">
    :global {
        @import 'src/styles/base';
        @import 'src/styles/themes/defaults';
    }

    //Typesetting
    #MENU li > h1    { font-size: var(--s2); }
    #MENU li > ul h1 { font-size: var(--s1); }

    // Layout
    :global {
        //TODO: mean to be ':has(> [style="display: contents"] > #VCARD)', but it didn't work
        :has(#VCARD):has([style="display: contents"]) {
            position: relative;
            inline-size: fit-content;
            flex-flow: wrap;
            align-content: center;

            &::before {content:"";flex-basis:100%;width:0;order:2;} // simulate <hr>
        }

        main {
            order: -1;
            margin-block: auto;
            position: relative;
            padding: var(--grid-gutter);
            display: flex;
            flex-flow: wrap;
            gap: var(--grid-gutter);
        }

        @media only screen and (max-width: 320px) {
            #main { inline-size: max-content;}
        }

        #CAMPAIGN {
            position: absolute;
            inset-block: var(--s1);
            inset-block-end: calc(100vh * 1 / 3 * 55 / 85 + var(--grid-gutter) * 2);;
            /*max-block-size: calc(
                (var(--grid-max-width) - var(--grid-gutter) * 3) * 4/12
            );*/
            display: flex;
            //flex-flow: column wrap;
            max-inline-size: 60vh;
        }

        #VCARD {
            order: 3;
            position: sticky; inset-inline-start: 0;
            display:flex;
            align-items:center;
        }
    }

    ul#MENU,
    ul#MENU :is(ul,li) {
        max-inline-size: none;

        h1 {
            position: sticky;
            inset-inline-start: var(--s1);
        }
    }

    #MENU {
        order: 1;
        padding-inline-end: var(--inline-offset);
        display: flex;
        flex-flow: wrap;
        gap: calc(var(--grid-gutter) / 2);

        &::before {content:"";flex-basis:100%;width:0;order:2;} // simulate <hr>
    }

    #MENU .section {
        padding: var(--grid-gutter);

        &#TASTY {
            flex: 999;
            order: 3;
            transform: translate(0, calc(var(--inline-offset) + 5px));
        }

        &#DRINKS {
            flex: 1;
            flex-grow: 0;
            order: 1;
            max-block-size: calc(
                (var(--grid-max-width) - var(--grid-gutter) * 3) * 4/12
            );
            position: sticky;
            inset-inline-start: var(--s1);
            transform: translate(var(--block-offset), var(--inline-offset));
            will-change: transform;

            @media (min-width: 320px) {
                > .submenu {
                    position: sticky;
                    inset-inline-start: var(--s1);
                    will-change: transform;
                }
            }
        }
    }

    .submenu {
        inline-size: max-content;
        display: flex;
        //overflow: hidden;
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

        :is(#TASTY & > *) {
            inline-size: calc(var(--grid-gutter) * 5);
            aspect-ratio: 1.618;
        }
    }

    // Appearance
    /*:is(#MENU, .submenu, .section, .subsection, article):hover {
        outline: calc(var(--outline_thickness) * var(--OUTLINE_SWITCH)) solid;
    } /*for debuging*/

    #TASTY  { background-color: var(--tasty_bg ); }
    #DRINKS { background-color: var(--drinks_bg); }
    /*#TASTY:has(+ #DRINKS:hover) { overflow-y: hidden; } /* be daunted by this rule */

    :global {
        #VCARD, #TASTY, #DRINKS {
        box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        will-change: transform;
        }
        #TASTY, #DRINKS:hover { transform: scale(1.01); }
        #TASTY::after, #DRINKS::after {
            content: ""; position: absolute; inset: 0;
            z-index: -1;
            opacity: 0;
            transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
            box-shadow: var(--poster-shadow);
        }
        #TASTY:hover::after,
        #DRINKS:hover::after { opacity: 1; }
    }
</style>
