
<div class="this.campaign" style="display:contents;">
  <section id="catering" class="subsection">
    <h1 class="category__title">联谊策划</h1>
    <article>
      <p>
        喵姆餐厅提供生日聚会，公司聚餐，派对联谊场地及策划，店内免费提供桌上足球，棋牌桌游等娱乐设施
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
    </div>
  </section>
  <section id="teaching" class="subsection">
    <h1 class="category__title">烘焙教学</h1>
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
  article p + p { margin-block-start:var(--s1); }

  /**Layout
   */
  .this\.campaign > *,
  .gallery {
    display: flex;
    flex-flow: column;
    align-items: center;

    > * + * {
      margin-block-start: var(--s1);
    }
  }

  .this\.campaign > * { margin: var(--s1); }

  section h1 {
    position: relative;
    inline-size: 2lh;
    block-size: 2lh;
    text-align-last: right;
  }
</style>
