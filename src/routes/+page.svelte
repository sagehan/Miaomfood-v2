<script>
    import StickyBanner from '$lib/StickyBanner.svelte';
    import Campaign from '$lib/Campaign.svelte';
    import Menu from '$lib/Menu.svelte';
    import Cart from '$lib/Cart.svelte';

    /**
     * @type {boolean}
     */
    export let collapsed = true, isEmptyCart = false;

    $: open = !isEmptyCart;
</script>

<header id="VCARD"><StickyBanner /></header>
<main class:collapsed>
    <div id="CAMPAIGN"><Campaign /></div>
    <div id="MENU"><Menu /></div>
</main>
<div role="tablist" aria-labelledby="tablist_controls">
    <!--tabs group-->
    <fieldset>
        <legend id="tablist_controls">Tablist Widget for toggling the Shopping Cart & User Settings panels</legend>
        <div
            role="tab"
            aria-selected="false"
            aria-controls="CONSOLE"
            style="translate:-2em -1em;">
            <input
                id="tablist_settings"
                type="radio"
                name="tab-grp"
                value="tablist_settings"
            ><label for="tablist_settings" id="tab-1">设置</label></div>
        <div
            role="tab"
            aria-selected="true"
            aria-controls="CART">
            <input
                id="tablist_cart"
                type="radio"
                name="tab-grp"
                value="tablist_cart"
            ><label for="tablist_cart" id="tab-2">订购单</label></div>
    </fieldset>
    <!--tabpanels-->
    <div
        role="tabpanel"
        tabindex="0"
        id="CONSOLE"
        aria-labelledby="tab-1"></div><!--TODO: login & user settings-->
    <div
        role="tabpanel"
        tabindex="0"
        id="CART"
        aria-labelledby="tab-2"><Cart {open}/></div>
</div>

<style lang="scss">
    :global {
        @import 'src/styles/base';
        @import 'src/styles/themes/defaults';
    }

    /**Typesetting
     */
    [role="tab"] { font-size:var(--s1); font-weight:bold; letter-spacing:0.2rem; }

    /**Layout
     */
    :global(:has(> [style*="contents"] > header + main)) {
        --base-i: 0;
        /***/ //TODO: optimize the following properties formula
        --banner-block-size: calc(100vh * 1 / 3 * 55 / 85);
        --banner-inline-size: calc(100vh * 1 / 3);
        --padding-inline: calc(var(--grid-gutter) * 2);
        --block-offset: calc((var(--grid-gutter) + var(--s2) + var(--s1) + var(--s1, 1.5rem) * 2) * 2);
        inline-size: fit-content;
        overflow-x: hidden; // to fix browser scroll overflow bug ?
        flex-flow: wrap;
        align-content: center;

        &::before {content:"";flex-basis:100%;width:0;} // simulate <hr>
    }

    :global{
        figure {
            overflow: hidden;
            display: flex;
            align-items: center;

            > img {
                position: relative;
                object-fit: cover;
                inline-size: 100%; block-size: 100%;
            }
        }
    }

    #VCARD {
        z-index: calc(var(--base-i) + 1);
        position: sticky;
        inset-inline-start: 0;
    }

    main {
        position: relative;
        padding-block: var(--grid-gutter);
        &:not(.collapsed) { z-index:calc(var(--base-i) + 1); }

        #CAMPAIGN {
            z-index: calc(var(--base-i) - 1);
            position: absolute;
            //inset-block-end: calc(var(--grid-gutter) * 1.5 + var(--block-offset));
            overflow: hidden;
        }

        #MENU { --translate:
            calc(-1 * var(--grid-gutter) - var(--block-offset) * 2) 
            calc(50cqi - var(--grid-gutter) - var(--s1));
        }
    }

    [role="tablist"] {
        --display: none;
        --visibility: hidden;
        --padding: calc(var(--grid-gutter) * .5);
        block-size: fit-content;
        margin-inline-start: calc(-100% + var(--grid-gutter));
        align-self: center;
        position: sticky;
        inset-inline-start: calc(var(--grid-gutter) + var(--compensate));
        //overflow:clip; overflow-clip-margin:border-box; //overflow-clip-margin:calc(2.5em + 1.25em);

        legend { display:none; } //TODO: a11y
    }

    [role="tab"] {
        position: absolute;
        inset-inline-start: var(--padding);
        inset-block-start:  var(--padding);

        label { position:relative; z-index:1; display: block;}
        [type="radio"] { display:var(--display); visibility:var(--visibility); }
    }

    //[role="tab"] label:has([type="radio"]:checked) + [role="tabpanel"] {}

    /**Appearance
     */
    :global{
        figure > img {
            &::before {
                content:''; position:absolute; inset:0;
                background: hsl(0, 0%, 93.3%);
                border-radius: var(--border-radius);
                box-shadow: inset 0 0 0
                    calc(var(--outline_thickness) * 0.5 * var(--OUTLINE_SWITCH))
                    currentcolor;
            }
            &::after {
                content: attr(alt); position:absolute; inset:0;
                color: oklch(from var(--debug_cl) calc(l * -1) c h ); }
        }

        .stamped {
            position: relative;
            inline-size: var(--stamp-size);
            block-size: var(--stamp-size);
            flex: 0 0 auto;
            text-align-last: right;

            &::after {
                content:'';position:absolute;inset:0;
                outline: 1px solid;
                outline-offset: calc(var(--outline_thickness) * 3);
            }
        }
        /*:is(#MENU, .submenu, .section, .subsection, article):hover {
        outline: calc(var(--outline_thickness) * var(--OUTLINE_SWITCH)) solid;
        } /*for debuging*/

        #TASTY  { background: var(--tasty_bg ); }
        #DRINKS { background: var(--drinks_bg); }

        #VCARD > [style*="contents"] > *, #TASTY, #DRINKS {
            //overflow: visible;
            box-shadow: 0 1px 3px rgba(0,0,0,0.15);
            will-change: transform;
        }
        //#TASTY, #DRINKS { transform: scale(calc(var(--sw) * 0.01 + 1)); }
        #VCARD > [style*="contents"]:hover > *::after, #TASTY::after, #DRINKS::after {
            --sw: 0;
            content:""; position:absolute; inset:0;
            z-index: -1;
            opacity: calc(var(--sw) + 0);
            transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
            box-shadow: var(--poster-shadow);
        }
        #VCARD > [style*="contents"]:hover > *::after,
        #TASTY:hover, #DRINKS:hover,
        #TASTY:hover::after,
        #DRINKS:hover::after {--sw:1;}

        [role="tablist"] {
            --compensate:.2em;
            border: solid calc(var(--padding)) oklch(from var(--page_bg) l c h / .65);
            border-radius: var(--border-radius);
            box-shadow: 0 0 0 var(--compensate) var(--primary_cl);
            background: oklch(from var(--page_bg) l c h / .65) content-box;
            backdrop-filter: blur(1px);
        }
        //label:has([type="radio"]:checked) {}

        [role="tabpanel"] > * { border-radius:var(--border-radius); }
    }

    /**Animation
    */
    @keyframes -global-expand { from {translate:var(--translate);} to {translate:unset;} }

    #MENU {
        animation: expand ease-out both;
		animation-timeline: view(inline);
		animation-range: contain calc(50cqi - var(--grid-gutter) - var(--s1)) contain 90%;
  }
</style>
