<script>
    import { MVSVQuery, MVMVQuery } from '$lib/store/entitiesStore';
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

</script>

{#await getMenuItem(productID)}
    <p>loading...</p>
{:then MenuItem}
    <article class="h-product" data-cid={MenuItem[':productID']}>
        <h2 class="p-name">{MenuItem[':name']}</h2>
        {#await getOffers(productID) then offers}
            {#each offers as offer}
            <ul class="spec-tag">
                <li class="p-spec"><span><b class="spec-price">{offer.price}</b>{offer.additionalType ?? ''}</span></li>
            </ul>
            {/each}
        {/await}
        {#if MenuItem[':image']}
        <figure >
        <img class="u-photo" src="./src/lib/assets/{MenuItem[':image']}" alt="图片描述:{MenuItem[':description']}" />            
        <figcaption class="e-description">
            <p>{MenuItem[':description']}</p>
        </figcaption>
        </figure>
        {/if}
    </article>
{/await}

<style lang='scss'>
    @use 'src/styles/themes/defaults' as *;
    @use 'src/styles/variables' as *;
    @use 'src/styles/mixins' as *;

    #pizza .h-product{
        .spec-tag {
            position  : relative;
            margin-top: -#{((2*$row_height - 3px + $row_height/2)/12px)}em;
        }

    figure {
        display: block;
        position: relative;
        margin: 3em auto 0;
        height: #{153px/$rem_size}em;
        width: #{153px/$rem_size}em;

    &:after,
    &:before {
        @include absolutly__centered;
        display: block;
        background-color: white;
        border-radius: 100%;
        height : 100%;
        width  : 100%;
        content: '';
    }
    &:after {
        width: 140px;
        height: 140px;
        box-shadow: 1px 1px 1px 1px adjust-color($shadow_bg, $alpha: -0.5);
    }
    &:before { box-shadow: 1px 2px 1px 1px adjust-color($shadow_bg, $alpha: -0.5); }

    .u-photo {
      @include absolutly__centered;
        display: block;
        z-index: 700;
        height : auto;
        width  : 140px;
        /*shape-outside: circle();*/
    }
  }
}
</style>