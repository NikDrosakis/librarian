<div class="row">

<?php 
for ($i=0;$i<count($sel);$i++) {
$postid = $sel[$i]['id'];
$img = !$sel[$i]['img'] ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzeJcVMWcaL9PHY6MwqifB00XWtBxzFvsvyfL2rNXZdkB0E4DA" : SITE_URL.'apps/bks/media/'. $sel[$i]['img'];
?>
<div id="nodorder1_<?=$postid?>"class="card">
<button  type="button" class="close" aria-label="delete" id="del<?=$sel[$i]['id']?>"><span aria-hidden="true">&times;</span></button>
<img style="float: left;width:133px;" id="img<?=$postid?>" src="<?=$img?>">
<div class="cardleft"><span><a href="/bks/writer?id=<?=$sel[$i]['writer']?>"><?=$sel[$i]['writername'] != null ? $sel[$i]['writername'] : ''?></a></span>
<h3><a data="pdf" style="color:#000000" href="<?=$sel[$i]['booklink']?>"><?=$sel[$i]['title']?></a></h3>
<div style="margin-top: 15px;"><a href="/bks/editor?id=<?=$sel[$i]['editor']?>"><?=$sel[$i]['editorname'] != null ? $sel[$i]['editorname'] : ''?></a></div>
</div>
<?php if($sel[$i]['catname'] != null){ ?>
<div class="tag">
<a href="/bks/cat?id=<?=$sel[$i]['cat']?>"><?=$sel[$i]['catname']?></a>
</div>
<?php } ?>
<div class="tag3"><?=$isread[$sel[$i]['isread']]?></div>
<div class="tag2"><?=$book_status[$sel[$i]['status']]?></div>
</div>
<?php } ?>

</div>