<script>
    import { entity, SVMVQuery, MVMVQuery } from '$lib/store/entitiesStore';
    import ProductItem from '$lib/ProductItem.svelte';
    import StickyBanner from '$lib/StickyBanner.svelte';
    
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

<main id="poster">
    <div id="campaign" class="section">
        <section id="catering" class="subsection">
            <h1 class="category__title">联谊策划</h1>
            <article>
                <p>喵姆餐厅提供生日聚会，公司聚餐，派对联谊场地及策划</p>
                <p>店内免费提供桌上足球，棋牌桌游等娱乐设施</p>
            </article>
            <div class="gallery">
                <figure itemprop="associatedMedia">
                    <img src="./src/lib/assets/fellowship_1__thumb.jpg" alt="Image description" />
                    <figcaption itemprop="caption description">
                        小伙伴们的快乐时光
                    </figcaption>
                </figure>
                <figure>
                    <img src="./src/lib/assets/fellowship_2__thumb.png" alt="Image description" />
                    <figcaption itemprop="caption description">描述</figcaption>
                </figure>
            </div>
        </section>
        <section id="teaching" class="subsection">
            <h1 class="category__title">烘焙教学</h1>
            <article>
                <p>你希望有一天能辞掉工作，开一家小店，用一杯咖啡唤醒清晨，用发呆打发一整个下午，和顾客聊聊天，和朋友吹吹牛，音乐挑自己爱听的，员工找自己喜欢的，没有无止境的加班和讨人厌的上司，生活安静而美好。</p>
                <p>经常在朋友圈看到好友的留言，喜欢我家披萨的，喜欢我家店铺的，喜欢我们同事的，一切按照自己理想中的样子来做的喵姆餐厅快三年了，每天忙而不乱，充实有趣。</p>
                <p>喵姆家现在开放开店教学了。如果你想开一家这样的店，又没有经验，来找我吧，我可以带你绕过我走过的那些弯路，教你做我们店里的所有菜品，吧台所有饮品，告诉你行业内的一些陷阱，定制自己的包装盒宣传品。</p>
                <p>来找我吧，胖喵手把手教你做披萨！</p>
            </article>
        </section>
    </div>
    <StickyBanner/>
    {#if $entity.loading}
    <h1>loading data ...</h1>
{:else} {#await getSections()}
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
{/await} {/if}
</main>

<style lang="scss">
    :global {
        @import 'src/styles/base';
        @import 'src/styles/themes/defaults';
    }

    //Typesetting
    #menu li > h1    { font-size: var(--s2); }
    #menu li > ul h1 { font-size: var(--s1); }

    // Layout
    #poster {
        margin-block: auto;
        position: relative;
        padding: var(--grid-gutter);
    }

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
        display: flex;
        flex-flow: wrap;
        gap: calc(var(--grid-gutter) / 2);
        inline-size: fit-content;

        &::before {
            content: "";
            flex-basis: 100%;
            width: 0;
            order: 2;
        }
    }

    #menu .section {
        padding: var(--grid-gutter);

        &#TASTY {
            flex: 999;
            order: 3;
            transform: translate(-265px, calc(50vh + 5px));
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
            transform: translate(0, 50vh);
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

    #campaign {
        position: fixed;
        inset-block: var(--s1);
        display: flex;
        flex-flow: column;
        /*max-block-size: calc(
            (var(--grid-max-width) - var(--grid-gutter) * 3) * 4/12
        );*/
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
    /*:is(#menu, .submenu, .section, .subsection, article):hover {
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
