<div style="background:white;margin:1%;padding:1%">
<h2 style="cursor:pointer">Writer</h2>
</div>

<!-- CAT NEW -->
<?php if($this->id=='new'){ ?>

<?php $table='writer';?>
<div style="background:white;margin:1%;padding:1%">
<h2 style="cursor:pointer">New Writer</h2>
<section id="newriter">

<form id='form_<?=$table?>'>
<input type='hidden' name='a' value='newbks'>
<label>Name:<label><input class="form-control" name="name" value="">
<label>summary: <label><textarea class="form-control" name="summary"></textarea>
<button class='btn btn-default' id='submit_<?=$table?>'>Save new <?=$table?></button>
</form>
</section>
</div>

<!-- CAT EDIT -->
<?php }elseif($this->id!=''){ ?>

	<!-- EDIT / SHOW-->
<a href="/bks">Back to List</a>
<span style="float:left;" onclick="g.ui.goto(['previous','writer','id',g.get.id,'/bks/writer?id='])" class="next glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
<span style="float:right" onclick="g.ui.goto(['next','writer','id',g.get.id,'/bks/writer?id='])" class="next glyphicon glyphicon-chevron-right" aria-hidden="true"></span>

<?php  $sel= $bot->f("SELECT * FROM writer WHERE id=?",array($this->id));
$img=$sel['img']=='' ? $bookdefaultimg: $this->GS['SITE_URL'].'apps/bks/media/'.$sel['img'];
?>

<?php include 'fimg.php'; ?>
<div><img id="bookimg" src="<?=$img?>" style="height:200px">
    <h2 style="float:right" id="titlebig"><?=$sel['name']?></h2>
</div>
<label>Name:<label><input class="form-control" id="name" value="<?=$sel['name']?>">
<label>summary: <label><textarea class="form-control" id="summary"><?=$sel['summary']?></textarea>
<button class="btn btn-primary" id="update">Save Writer</button>
</section>

<!-- CAT LIST -->
<?php }else{ 

$sel= $bot->fa("SELECT * FROM writer ORDER BY id DESC");?>

<br/>
<div style="color:red"><?=count($sel)?> writers</div>

<table class="TFtable">    
<tr>			
	<td>ID</td>
	<td>img</td>
	<td>Cat</td>	
	<td>Action</td>	
</tr>			
<tbody id="list1" class="group1">
<?php for($i=0;$i<count($sel);$i++){
	$postid=$sel[$i]['id'];
    $img=$sel[$i]['img']=='' ? $bookdefaultimg: $this->SITE_URL.'apps/bks/media/'.$sel[$i]['img'];
	?>
	<tr id="nodorder1_<?=$postid?>" style="cursor:move;">                        
		<td id="id<?=$postid?>"><span id="id<?=$postid?>"><?=$postid?></span></td>
		<td><img id="img<?=$postid?>" src="<?=$img?>" width="30" height="30"></td>
		<td><a href="/bks/writer?id=<?=$sel[$i]['id']?>"><?=$sel[$i]['name']?></a></td>
		<td><button class="btn btn-danger" id="del<?=$sel[$i]['id']?>">Delete</button></td>
	</tr>
<?php } ?>

</tbody></table>

<?php } ?>
