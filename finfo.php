<!---FIND IMAGE MOD--->
<style>
    #finfobox{
        background:lightgoldenrodyellow;
        margin:5px;
        padding:5px;
        font-size: 10px;
    }

    -content: start;
    }:root {
         --gutter: 20px;
     }

    .app {
        padding: var(--gutter) 0;
        display: grid;
        grid-gap: var(--gutter) 0;
        grid-template-columns: var(--gutter) 1fr var(--gutter);
    align

    .app > * {
        grid-column: 2 / -2;
    }

    .app > .full {
        grid-column: 1 / -1;
    }

    .hs {
        display: grid;
        grid-gap: calc(var(--gutter) / 2);
        grid-template-columns: 10px;
        grid-template-rows: minmax(150px, 1fr);
        grid-auto-flow: column;
        grid-auto-columns: calc(50% - var(--gutter) * 2);

        overflow-x: scroll;
        scroll-snap-type: x proximity;
        padding-bottom: calc(.75 * var(--gutter));
        margin-bottom: calc(-.25 * var(--gutter));
    }

    .hs:before,
    .hs:after {
        content: '';
        width: 10px;
    }


    /* Demo styles */

    html,
    body {
        height: 100%;
    }

    body {
        display: grid;
        place-items: center;
        background: #456173;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    h1,
    h2,
    h3 {
        margin: 0;
    }

    .app {
        width: 375px;
        height: 667px;
        background: #DBD0BC;
        overflow-y: scroll;
    }

    .hs > li,
    .item {
        scroll-snap-align: center;
        padding: calc(var(--gutter) / 2 * 1.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #fff;
        border-radius: 8px;
    }
	</style>
	<div class="app" id="finfobox">Finfo Module
    <button id="finfo">Find Info</button>
    <button id="fbooks">Find Books</button>
    <input id="finfotitle">
    <h3 id="inforeply"></h3>
    <ul id="finfos" class="hs full"></ul>
    <section>
</div>

<script src="/apps/bks/finfo.js"></script>