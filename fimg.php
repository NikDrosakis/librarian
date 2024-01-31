<!---FIND IMAGE MOD--->
<style>
    /* CHECKED STYLES */
    #fimgbox{
        background:lightgoldenrodyellow;
        margin:5px;
        padding:5px;
        font-size: 10px;
    }
    #fimgs{
        width: fit-content;
    }
    $fimgs li{
         vertical-align: top;
         display: inline-block;
         text-align: center;
         width: 120px;
     }
    .input-hidden {
        position: absolute;
        left: -9999px;
    }

    input[type=radio]:checked + label>img {
        border: 1px solid #fff;
        box-shadow: 0 0 3px 3px #090;
    }

    /* Stuff after this is only to make things more pretty */
    input[type=radio] + label>img {
        border: 1px dashed #444;
        width: 150px;
        height: 150px;
        transition: 500ms all;
    }

    input[type=radio]:checked + label>img {
    }
</style>

<!--FIMG MOD-->
<div id="fimgbox">Fimg img Module
    <button id="fimg">Find image</button>
    <input id="ftitle">
    <ul id="fimgs" class="list-inline"></ul>
    <section>
</div>
<br/>


<script src="/apps/bks/fimg.js"></script>