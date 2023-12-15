<script>
  import { entity, MVSVQuery } from '$lib/store/entitiesStore';

  /** @type {Object} */
  let RestaurantInfo = {}, addrInfo = {};

  /**
   * sully the 'openingHours' string by wrapping each date(time) unit with a span tag
   * go to this trouble for the text-combine-upright facility.
   * @param {string} datetimestr
   */
  const sullyOpeningHours = (datetimestr) =>
    datetimestr ? datetimestr.replaceAll(/\w+(?=\W+|\b)/g, (s) =>
      `<span style='text-combine-upright: all'>${s}</span>` ) : '';

  /**
   * sully the 'telephone' string by wrapping each diget number with a span tag
   * go to this trouble for the text-combine-upright facility.
   * @param {string} phonenumber
   */
   const sullyPhoneNumber = (phonenumber) =>
   phonenumber ? phonenumber.replaceAll(/(\+\d)?(\d){1}/g, (s) =>
      `<span style='text-combine-upright: all'>${s}</span>` ) : '';

  $: $entity.rdfStore,
    MVSVQuery(`?p ?o { [^:mainEntity/:name "喵姆餐厅"@zh] ?p ?o. FILTER (?p != rdf:type && !isBlank(?o)) }`)
      .then(value => RestaurantInfo = value),
    MVSVQuery(`?p ?o { ?_s ^:mainEntity/:name "喵姆餐厅"@zh. [^:address ?_s; ?p ?o]. FILTER (?p != rdf:type && !isBlank(?o))}`)
      .then(value => addrInfo = value);
</script>

{#if $entity.loading}
<p>loading data ...</p>
{:else}
<header id="VCARD" role="banner">
  <figure class="card--cover">
    <img src="./src/lib/assets/logo.svg" alt="logo"/>
    <figcaption>{RestaurantInfo[':name']}<small>{RestaurantInfo[':description']}</small></figcaption>
  </figure>
  <figure>
    <figcaption>关注微信</figcaption>
    <figure>
      <img class="qrcode" src="./src/lib/assets/QR-1.png" alt="喵姆餐厅微信:点餐、订单、售后"/>
      <figcaption >
        <p>miaomfood</p>
        <small>点餐<span>&</span>订单</small>
      </figcaption>
    </figure>
    <figure>
      <img class="qrcode" src="./src/lib/assets/QR-2.png" alt="喵姆餐厅微信微信:教学、策划、商务"/>
      <figcaption>
        <p>pangmiao</p>
        <small>策划<span>&</span>商务</small>
      </figcaption>
    </figure>
  </figure>
  <figure>
    <img src="./src/lib/assets/location.png" alt="location map" />
    <dl>
      <dt class="icon__openingHours">开放时间</dt><dd>{@html sullyOpeningHours(RestaurantInfo[':openingHours'])}</dd>
      <dt class="icon__telephone">订餐电话</dt><dd>{@html sullyPhoneNumber(RestaurantInfo[':telephone'])}</dd>
      <dt class="icon__address">餐厅位置</dt><dd>
        <span>{addrInfo[':addressLocality'] ?? ''}</span>
        <span>{addrInfo[':streetAddress'] ?? ''}</span>
      </dd>
    </dl>
  </figure>
</header>
{/if}

<style lang='scss'>
  //Typesetting
  .card--cover { font-size: var(--s3); }
  .card--cover small { font-size: var(--s-2); line-height:normal; }
  .card--cover ~ figure * { line-height: var(--s0); }
  figure > figure > figcaption small span { text-combine-upright: all; }

  //Layout
  img { max-block-size: 100%; object-fit: contain; }

  header {
    //position: fixed; inset-block-end: 2em;
    z-index: 10;
    position: absolute;
    inset-block-end: 1em;
    display: flex;
    transform: translate(0, calc(var(--grid-gutter) * -1));

    > * {
      //aspect-ratio: 55 / 85;
      inline-size: calc(100vh * 1 / 3);
      block-size: calc(100vh * 1 / 3 * 55 / 85);
      padding: calc(var(--s1));
      display: flex;
      align-items: center;

      > * + * { margin-inline-start: var(--s0); }
    }
  }

  .card--cover figcaption small {
    display: block;
    inline-size: 9ic;
    margin-inline-start: var(--s0);
  }
  
  figure:has(> figure > img) {
    figcaption:first-child {
      position: relative;
      inline-size: 2lh;
      block-size: 2lh;
      text-align-last:right;
    }

    :nth-child(1 of figure) {
      display: flex;
      flex-flow: column;
    }

    :nth-child(2 of figure) {
      display: flex;
      flex-flow: column-reverse;

      figcaption { display: flex; flex-flow: inherit; }
    }

    :nth-child(1 of figure) > img { inline-size: calc(100vh * 1 / 3 / 4 ); }
    :nth-child(2 of figure) > img { inline-size: calc(100vh * 1 / 3 / 4 / 1.618 ); }
  }

  figure dl dd span { display: inline-block; }

  //figure:not(:has(> img[alt='location map'])) > * + *,
  dl :nth-child(2n+3) { margin-block-start: var(--s-1); }

  :has(> img[alt='location map']) {
    position: relative;

    > img {
      position: absolute;
      inset-block-start: 0;
      inset-inline-start: 0;

      + * { z-index: 1; }
    }
  }

  // Appearance
  header > * {
    color: oklch(from white l c h);
    background-color: var(--card_bg);
  }

  .card--cover { color: var(--primary_cl); }

  figure figcaption:first-child::after {
    content: ''; position: absolute; inset: 0;
    outline: 1px solid;
    outline-offset: calc(var(--outline_thickness) * 3);
    translate: (0.2ex);
  }

  figure figcaption:first-child,
  figure figcaption:first-child ~ figure :is(p, small),
  dt, dd { mix-blend-mode: exclusion; }
  

  //figure figcaption:first-child,
  figure > :nth-child(-n+2 of figure) > img {
    filter: invert(0.85);
    mix-blend-mode: soft-light;
  }

  :has(> img[alt='location map']) > img { filter:
    grayscale(0.6)
    blur(3px)
    opacity(85%);
  }
</style>
