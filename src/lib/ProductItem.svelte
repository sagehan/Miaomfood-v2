<script>
    import { MVSVQuery, MVMVQuery } from '$lib/store/entitiesStore';
    export let productID;

    /**
     * get all the ':MenuItem's of a specific ':MenuSection',
     * @param {string} id - ':MenuItem's ':productID' value
    */
    const getMenuItem = (id) => MVSVQuery('p o',
        `{ [:productID "${id}"; ?p ?o]
            FILTER (?p != rdf:type && !isBlank(?o)) }`)

    /**
     * get all the ':offers's of a specific ':Product',
     * @param {string} id - ':MenuItem's ':productID' value
     * @todo eliminate duplicated and discordant variable declaration
     */
    const getOffers = (id) => MVMVQuery(
        `?additionalType ?price ?availability
        { ?offer ^:offers/:productID '${id}';
            :price ?price;
            :availability ?availability.
            OPTIONAL { ?offer :additionalType ?additionalType }
        }`)

</script>

{#await getMenuItem(productID)}
    <p>loading...</p>
{:then MenuItem}
    <article class="h-product" data-cid={MenuItem[':productID']}>
        <h2 class="p-name">{MenuItem[':name']}</h2>
        <p>{JSON.stringify(MenuItem)}</p>
        {#await getOffers(productID) then offers}
            {#each offers as offer}
            <ul class="spec-tag">
            <li class="p-spec"><span><b class="spec-price">{offer.price}</b>{offer?.additionalType}</span></li>
            </ul>
            {/each}
        {/await}
        <figure >
        <img class="u-photo" src={MenuItem[':image']} alt="图片描述:{MenuItem[':description']}" />
        <figcaption class="e-description">
            <p>{MenuItem[':description']}</p>
        </figcaption>
        </figure>
    </article>
{/await}

<style>

</style>