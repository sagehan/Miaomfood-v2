
<div class="this.campaign" style="display:contents;">
  <section id="catering">
    <h1 class="stamped">联谊策划</h1>
    <article>
      <p>
        喵姆餐厅提供生日聚会，公司聚餐，派对联谊场地及策划，店内免费提供桌上足球，棋牌桌游等娱乐设施。
      </p>
    </article>
    <div class="gallery">
      <figure itemprop="associatedMedia">
        <img src="./src/lib/assets/fellowship_1__thumb.jpg" alt="Image description" />
        <figcaption itemprop="caption description">小伙伴们的快乐时光</figcaption>
      </figure>
      <figure>
        <img src="./src/lib/assets/fellowship_2__thumb.png" alt="Image description" />
        <figcaption itemprop="caption description">描述</figcaption>
      </figure>
      <figure itemprop="associatedMedia">
        <img src="./src/lib/assets/fellowship_1__thumb.jpg" alt="Image description" />
        <figcaption itemprop="caption description">小伙伴们的快乐时光</figcaption>
      </figure>
    </div>
  </section>
  <section id="teaching">
    <h1 class="stamped">烘焙教学</h1>
    <article>
      <p>
        你希望有一天能辞掉工作，开一家小店，用一杯咖啡唤醒清晨，用发呆打发一整个下午，和顾客聊聊天，和朋友吹吹牛，音乐挑自己爱听的，员工找自己喜欢的，没有无止境的加班和讨人厌的上司，生活安静而美好。
      </p>
      <p>
        经常在朋友圈看到好友的留言，喜欢我家披萨的，喜欢我家店铺的，喜欢我们同事的，一切按照自己理想中的样子来做的喵姆餐厅快三年了，每天忙而不乱，充实有趣。
      </p>
      <p>
        喵姆家现在开放开店教学了。如果你想开一家这样的店，又没有经验，来找我吧，我可以带你绕过我走过的那些弯路，教你做我们店里的所有菜品，吧台所有饮品，告诉你行业内的一些陷阱，定制自己的包装盒宣传品。
      </p>
      <p>来找我吧，胖喵手把手教你做披萨！</p>
    </article>
  </section>
</div>

<style lang="scss">
  /**Typesetting
   */
  h1 { line-height:var(--s2); }
  article p { line-height:var(--s1); white-space: unset; text-wrap: balance; }
  article p::first-letter { font-size:var(--s1); color: oklch(from var(--activity_bg) calc(l - 15) c h); }
  article * { max-inline-size: none; }
  .this\.campaign section > :last-child::after { content: '❦'; font-size: var(--s1); }

  /**Layout
   */
  :global(:has(> .this\.campaign)) {
    padding: .5em;
    display: flex;
    flex-flow: column-reverse;
    justify-content: center;
    gap:calc(var(--grid-gutter) * 1);
  }

  .this\.campaign > section {
    z-index: 0;
    inline-size: max-content;
    block-size: var(--banner-block-size);
    padding: var(--padding-inline) .5em;
    align-items: center;
    gap: var(--grid-gutter);

    > h1 ~ * {display: contents;}
    > h1 ~ * > * {max-inline-size:22ic; max-block-size:var(--banner-block-size);}
    > h1 ~ * > * figcaption {display: none;}
    figure img {block-size:100%;}
  }

  .this\.campaign > :first-child  {
    margin-block-start: clamp((var(--banner-block-size) + var(--grid-gutter)) * -1, var(--bp_m) * 99999, 0px);
    transform: translateY(calc(
      50cqi - var(--padding-inline)));
    //will-change: transform;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-content: start;

    &::before {content:"";block-size:100%;inline-size:0;} // simulate <hr>
    & > :first-child {order:-1;}
  }

  .this\.campaign > :last-child {
    transform: translateY(calc(
      -100% + 50cqi + (var(--padding-inline) + var(--stamp-size)/1.3))); //TODO: eliminate dirty number 1.3
    //will-change: transform;
    display: flex;
    flex-flow: row-reverse;
  }

  /**Appearance
   */
  .this\.campaign figure img {
    border: var(--s-2) solid oklch(96% 0 0);
    box-shadow: var(--shadowy, var(--shadow1));
  }

  /**Animation
   */
  .this\.campaign > :first-child {
    > h1, article > *, .gallery > * {
      z-index:calc(100000 * (1 - var(--y))); //TODO: play with 'Position-Driven-Styles'(https://kizu.dev/position-driven-styles/)
      animation: y-lerp linear reverse both;
      animation-timeline: view();
      animation-range: cover;
    }
  }

  @keyframes move-up   { to {transform:translateY(-100%);} }
  @keyframes move-down { to {transform:translateY(350%);} }
  .this\.campaign > :first-child {
    animation: move-up linear forwards;
		animation-timeline: scroll(root inline);
  }
  .this\.campaign > :last-child {
    animation: move-down linear forwards;
		animation-timeline: scroll(root inline);
  }
</style>
