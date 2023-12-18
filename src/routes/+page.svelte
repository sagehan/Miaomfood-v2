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
    :global {
        //TODO: mean to be ':has(> [style="display: contents"] > #VCARD)', but it didn't work
        :has(#VCARD):has([style="display: contents"]) {
            position: relative;
            inline-size: fit-content;
            flex-flow: wrap;
            align-content: center;

            &::before {content:"";flex-basis:100%;width:0;order:2;} // simulate <hr>
        }

        #VCARD {
            position: sticky; inset-inline-start: 0;
            display:flex;
            align-items:center;
        }

        main {
            order: -1;
            margin-block: auto;
            position: relative;
            padding: var(--grid-gutter);
            padding-inline-end: var(--inline-offset);
            display: flex;
            flex-flow: wrap;
            gap: var(--grid-gutter);
        }

        #CAMPAIGN {
            position: absolute;
            inset-block: var(--s1);
            inset-block-end: calc(100vh * 1 / 3 * 55 / 85 + var(--grid-gutter) * 2);;
            /*max-block-size: calc(
                (var(--grid-max-width) - var(--grid-gutter) * 3) * 4/12
            );*/
            display: flex;
            max-inline-size: 60vh;
        }
    }

    /**Appearance
     */
    :global{
        section h1::after {
            content:'';position:absolute;inset:0;
            outline: 1px solid;
            outline-offset: calc(var(--outline_thickness) * 3);
            translate: (0.1ex);
        }
        /*:is(#MENU, .submenu, .section, .subsection, article):hover {
        outline: calc(var(--outline_thickness) * var(--OUTLINE_SWITCH)) solid;
        } /*for debuging*/

        #TASTY  { background-color: var(--tasty_bg ); }
        #DRINKS { background-color: var(--drinks_bg); }
        /*#TASTY:has(+ #DRINKS:hover) { overflow-y: hidden; } /* be daunted by this rule */

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
