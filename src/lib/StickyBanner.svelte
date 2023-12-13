<script>
  import { entity, SVSVQuery, MVMVQuery } from '$lib/store/entitiesStore';

  /** @type { string } */
  let name = '', phone = '';

  $: $entity.rdfStore,
    SVSVQuery(`?name {?s ^:mainEntity/:name "喵姆餐厅"@zh; :name ?name}`)
      .then(value => name = value),
    SVSVQuery(`?telephone {?s ^:mainEntity/:name "喵姆餐厅"@zh; :telephone ?telephone}`)
    .then(value => phone = value);
</script>

{#if $entity.loading}
<p>loading data ...</p>
{:else}
<header id="VCARD">
  <div class="card--cover">
    <!--img src="./src/lib/assets/icon.png" /-->
  </div>
  <div class="card--middle">
    <div>
      <ul>
        <li class="icon icon__phone">{phone}</li>
        <li class="icon icon__location">乌鲁木齐市高新区桂林路锦林二巷8号</li>
        <li class="icon icon__timer">送餐时间: 12:00 - 22:00（周一休息）</li>
      </ul>
      <!--img src="./src/lib/assets/location.png" alt="" /-->
    </div>
  </div>
  <div class="card--footer">
    <div>
      <h2>关注微信</h2>
      <figure class="">
        <!--img src="img/QR-1.jpg" alt="喵姆餐厅微信服务号"-->
        <figcaption >
          <small>{name}(点餐、订单、售后)</small>
          <p>id:miaomfood</p>
        </figcaption>
      </figure>
      <figure>
        <!--img src="img/QR-1.jpg" alt="胖喵微信号"-->
        <figcaption>
          <small>{name}(教学、策划、商务)</small>
          <p>id:pangmiao</p>
        </figcaption>
      </figure>
    </div>
  </div>  
</header>
{/if}

<style lang='scss'>
  //Typesetting
  .card--middle .icon__phone {
    //text-combine-upright: all;
  }

  h2 {
    font-size: var(--s0);
  }

  //Layout
  #VCARD {
    //position: fixed; inset-block-end: 2em;
    //order: 3;
    z-index: 10;
    position: absolute;
    inset-block-end: 1em;
    display: flex;
    transform: translate(0, calc(var(--grid-gutter) * -1));
  }

  header > * {
    inline-size: calc(1 / 3 * 100vh);
    aspect-ratio: 55 / 85;
    padding: calc(var(--s1));
    //display: inline-flex;
  }

  .card--cover {

  }

  // Appearance
  #VCARD > * {
    color: oklch(from white l c h);
    background-color: var(--card_bg);
  }
</style>
