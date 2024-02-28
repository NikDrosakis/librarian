<?php 
$dirs = array_filter(glob('/var/www/aimd5.com/apps/bot/pdf/*'), 'is_dir'); 
foreach($dirs as $dir){ ?>
	<div id="nodorder1_undefined" style="<?=basename($dir)==$_GET['name'] ? 'border: 5px solid darkred;':''?>" class="card">
	<button type="button" class="close" aria-label="delete" id="delundefined">
	<span aria-hidden="true">×</span></button>
	<img style="float: left;width:133px;" id="imgundefined" src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg">
	<div class="cardleft">
	<span><a href="/bks/writer?id=undefined"></a></span>
	<h3><a style="color:#000000" href="/bks/ebook?name=<?=basename($dir)?>"><?=basename($dir)?></a></h3>
	<div style="margin-top: 15px;"><a href="/bks/editor?id=undefined"></a></div></div>
	<div class="tag3">undefined</div>
	<div class="tag2">undefined</div>
	</div>
<?php } ?>

    <div id="pagination" class="paginikCon"></div>
<div id="book"></div>
