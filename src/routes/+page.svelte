<script>
    import StickyBanner from '$lib/StickyBanner.svelte';
    import Campaign from '$lib/Campaign.svelte';
    import Menu from '$lib/Menu.svelte';
</script>

<header id="VCARD"><StickyBanner /></header>
<main>
    <div id="CAMPAIGN"><Campaign /></div>
    <div id="MENU"><Menu /></div>
</main>

<style lang="scss">
    :global {
        @import 'src/styles/base';
        @import 'src/styles/themes/defaults';
    }

    /**Layout
     */
    :global(:has(> [style="display: contents"] > #VCARD)) {
        inline-size: fit-content;
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

    #VCARD {position:sticky;inset-inline-start:0;}

    main {
        --inline-offset: 61.8vh;
        order: -1;
        padding: var(--grid-gutter);
        display: flex;
        gap: calc(var(--grid-gutter)*0.5);

        //#MENU {order:-1;}
        #CAMPAIGN {
            position: relative;
            inset-inline:var(--s1);
            inline-size: var(--inline-offset);
            overflow: hidden;
        }
    }

    /**Appearance
     */
    :global{
        figure > img {
            &::before {
                content:''; position:absolute; inset:0;
                background-color: hsl(0, 0%, 93.3%);
                border-radius: var(--border-radius);
                box-shadow: inset 0 0 0
                    calc(var(--outline_thickness) * 0.1 * var(--OUTLINE_SWITCH))
                    oklch(from var(--debug_cl) calc(l * -1) c h );
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

        #TASTY  { background-color: var(--tasty_bg ); }
        #DRINKS { background-color: var(--drinks_bg); }

        :is(#VCARD, #TASTY, #DRINKS) {
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
