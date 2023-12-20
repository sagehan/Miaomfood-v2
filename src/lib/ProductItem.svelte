<script>
    import { MVSVQuery, MVMVQuery } from '$lib/store/entitiesStore';

    /** @type { string } */
    export let productID;

    /**
     * get all the ':MenuItem's of a specific ':MenuSection',
     * @param {string} id - ':MenuItem's ':productID' value
    */
    const getMenuItem = (id) => MVSVQuery(`
        ?p ?o { [:productID "${id}"; ?p ?o]
            FILTER (?p != rdf:type && !isBlank(?o)) }`)

    /**
     * get all the ':offers's of a specific ':Product',
     * @param {string} id - ':MenuItem's ':productID' value
     * @todo eliminate duplicated and discordant variable declaration
     */
    const getOffers = (id) => MVMVQuery(`
        ?additionalType ?price ?availability
        { ?offer ^:offers/:productID '${id}';
            :price ?price;
            :availability ?availability.
            OPTIONAL { ?offer :additionalType ?additionalType }
        }`)

    /**
     * extract the local part from the QName string of the given offer object
     * @param {Object} offer
     */
    const sanitizedOffedType = (offer) =>
        (/\w?:(?<additionalType>.*)$/g).exec(offer.additionalType)?.groups?.additionalType;
</script>

{#await getMenuItem(productID)}
    <p>loading...</p>
{:then MenuItem}
    <article data-cid={productID}>
        <h2>{MenuItem[':name'] ?? ''}</h2>
        {#await getOffers(productID) then offers}
        <ul class="spec-tag">
            {#each offers as offer}
            <li class="p-spec">
                <small class="spec-price">{offer.price ?? ''} </small>
                {#if offer.additionalType}
                <small>{sanitizedOffedType(offer) ?? ''}</small>
                {/if}
            </li>
            {/each}
        </ul>
        {/await}
        {#if MenuItem[':description']}
        <small class="e-description">{MenuItem[':description'] ?? ''}</small>
        {/if}
        {#if MenuItem[':image']}
        <figure class="u-photo">
            <img src="./src/lib/assets/{MenuItem[':image' ?? '404.html']}" alt="图片描述:{MenuItem[':description'] ?? ''}" />
        </figure>
        {/if}
    </article>
{/await}

<style lang='scss'>
    //Typesetting
    article {
        h2 { font-size:var(--s0 ); }
        ul { font-size:var(--s-1); }
        .spec-price { text-combine-upright:all; text-combine-upright:digits; }
        figure img::after { font-size:x-small; line-height:var(--s0); }
    }

    //Layout
    article {
        writing-mode: vertical-rl;
        :is([role="group"] :nth-child(odd) &) { writing-mode:vertical-lr; }

        inline-size: calc(var(--grid-gutter) * 5);
        display: flex;
        flex-flow: column;
        :is(#DRINKS &) { flex-flow: initial; }

        .e-description { order: 4; }

        .p-spec { display: inline-block; }
        :is(#TASTY & .spec-tag) { inline-size:100%; }

        figure {
            aspect-ratio: 1;
            inline-size: calc(var(--grid-gutter) * 3);
        }

        :is(#DRINKS & > :last-child) { margin-inline-start:var(--s-1); }
    }

    // Appearance
    figure img::after { color: oklch(from var(--debug_cl) calc(l * -1) c h ); }
</style>
