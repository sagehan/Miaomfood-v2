<script>
	import { entity, quotes, SVMVQuery, MVMVQuery } from '$lib/store/entitiesStore';
	import ProductItem from '$lib/ProductItem.svelte';

	let loadingText = quotes[(Math.floor(Math.random() * quotes.length))];

	/**
	 * get ':name' & ':identifier' of all the top ':MenuSection's
	 */
	const getSections = () =>
		MVMVQuery(`?name ?identifier {
      ?s ^:hasMenuSection/^:hasMenu ?Restaurant;
        :name ?name;
        :identifier ?identifier;
        :position ?pos}
      ORDER BY ?pos`);

	/**
	 * get ':name' & ':identifier' of all the sub ':MenuSection's
	 * @param {string} identifier - ':MenuSection's ':identifier' value
	 */
	const getSubSections = (identifier) =>
		MVMVQuery(`?name ?identifier {
      ?s ^:hasMenuSection/:identifier "${identifier}";
        :name ?name;
        :identifier ?identifier;
        :position ?pos}
      ORDER BY ?pos`);

	/**
	 * get all the 'productID's of a specific sub ':MenuSection'
	 * @param {string} identifier - ':MenuSection's ':identifier' value
	 */
	const getItemIDs = (identifier) =>
		SVMVQuery(`?productID {
      ?s ^:hasMenuItem/:identifier "${identifier}";
        :productID ?productID;
        :position ?pos}
      ORDER BY ?pos`);

	$: $entity.rdfStore, getSections();
</script>

<div class="this.menu" style="display:contents;">
	{#if $entity.loading}
	<h1>loading data ...</h1>
	{:else} {#await getSections()}
	<p>{loadingText}</p> {:then menuSections}
  <ul>
    {#each menuSections as section}
      <li id={section.identifier} class="section">
        <h1>{section.name}</h1>
        {#await getSubSections(section.identifier) then menuSections}
          <ul class="submenu">
            {#each menuSections as section}
              <li id={section.identifier} class="subsection">
                <h1>{section.name}</h1>
                {#await getItemIDs(section.identifier) then productIDs}
                  <ul role="group">
                    {#each productIDs as productID}
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
	{/if}
</div>

<style lang="scss">
	/**Typesetting
	 */
	.this\.menu .section > h1    {font-size: var(--s2);}
	.this\.menu .subsection > h1 {font-size: var(--s1);}

	/**Layout
	 */
	.this\.menu {
		--drinky-block-size: calc((var(--grid-max-width) - var(--grid-gutter) * 3) * 4 / 12);
		--tasty-block-size : calc((var(--grid-max-width) - var(--grid-gutter) * 3) * 8 / 12);		
	}
	.this\.menu :is(ul, li) {max-inline-size: none;}
	.this\.menu .section    {padding:var(--grid-gutter); translate:var(--translate);}
	.this\.menu .subsection {display: inline-block;}

	.this\.menu :is(.section, .subsection) > h1 {
		position: sticky;
		inset-inline-start: var(--grid-gutter);
		inline-size: max-content; // display: inline-block; // for older browsers
		margin-inline-end: calc(var(--grid-gutter) * 5 / 2);
	}

	.this\.menu > ul {
		inline-size: max-content;
		//padding-inline-end:clamp(0px, var(--bp_m) * 99999, var(--s1));
		display: flex;
		flex-flow: column wrap;
		gap: clamp(var(--grid-gutter) / 2, var(--bp_m) * -99999, var(--grid-gutter));

		> * { flex: calc(var(--bp_s) * -99999); }

		//&::before {content: ''; flex-basis: clamp(0px, var(--bp_m) * 99999, 100%); width: 0;} // simulate <hr>
	}

	.this\.menu #TASTY {
		--translate: clamp(0px, var(--bp_m) * 99999, var(--grid-gutter) + var(--drinky-block-size) - var(--block-offset) * .5);
		position:sticky; inset-inline-start:var(--grid-gutter);
		flex-grow: 2;
		//block-size: var(--tasty-block-size);
		//will-change: transform;
	}

	.this\.menu #DRINKS {
		--translate: 0 clamp(-0.5em, var(--bp_m) * -99999, 0px);
		order: -1;
		position:sticky; inset-inline-start:var(--grid-gutter);
		max-inline-size: max-content;
		flex-grow: 1; 
		//block-size: var(--drinky-block-size);
		//will-change: transform;
	}

	.this\.menu :has(> .submenu) {
		[role='group'] {
			display: flex;
			flex-flow: column-reverse wrap;
			max-block-size: calc((var(--grid-max-width) - var(--grid-gutter) * 1) * 8 / 12);
		}

		&:is(#TASTY) [role='group'] > * {
			inline-size: calc(var(--grid-gutter) * 5);
			aspect-ratio: 1.618033;
		}
	}

	/**Animation
	 // TODO: optimization is needed
	*/
	.this\.menu :is(#TASTY, #DRINKS) {
		//animation: expand ease-out both;
		animation-timeline: view(inline);
		animation-range: entry 85% entry 90%;
	}
</style>
