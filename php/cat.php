<?php $sel= $this->fetchAll("SELECT * FROM bks_cat ORDER BY name"); ?>
<div style="background:white;margin:1%;padding:1%">
<h2 style="cursor:pointer" onclick="location.href='/bks/cat'">Categories</h2>
</div>
<button onclick="location.href='/bks/cat?id=new'" class='btn btn-default'>New</button>
<!-- CAT NEW -->
<?php if($this->GS['id']=='new'){ ?>
<?php $table='bks_cat';?>
<div style="background:white;margin:1%;padding:1%">
<h2 style="cursor:pointer">New Category</h2>
<section id="newcat">

<form id='form_<?=$table?>'>
<input type='hidden' name='a' value='newbkscat'>
<label>Name:<label><input class="form-control" name="name" value="">
<label>parent:  <label>
<select class="form-control" name="parent">
<option value="0">None</option>
<?php for($i=0;$i<count($sel);$i++){ $catid=$sel[$i]['id'];	?>
<option value="<?=$catid?>" <?=$sel[$i]['parent']==$catid ? "selected=selected" :""?>><?=$sel[$i]['name']?></option>
<?php } ?>
</select>


<button class='btn btn-default' id='submit_<?=$table?>'>Save new <?=$table?></button>
</form>
</section>
</div>

<!-- CAT EDIT -->
<?php }elseif($this->GS['id']!=''){ ?>

	<!-- EDIT / SHOW-->
<a href="/bks">Back to List</a>
<span style="float:left;" onclick="g.ui.goto(['previous','bks_cat','id',g.get.id,'/bks/cat?id='])" class="next glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
<span style="float:right" onclick="g.ui.goto(['next','bks_cat','id',g.get.id,'/bks/cat?id='])" class="next glyphicon glyphicon-chevron-right" aria-hidden="true"></span>

<?php  $sel= $this->fetch("SELECT * FROM bks_cat WHERE id=?",array($this->GS['id'])); ?>

<?php include 'fimg.php'; ?>

<label>Name:<label><input class="form-control" id="name" value="<?=$sel['name']?>">
<div class="vertical-menu"  id="catlist"></div>
</section>

<!-- CAT LIST -->
<?php }else{  ?>

<br/>
<div style="color:red"><?=count($sel)?> categories</div>

<table class="TFtable">    
<tr>			
	<td>ID</td>
	<td>img</td>
	<td>Cat</td>	
	<td>Parent</td>	
	<td>Action</td>	
</tr>			
<tbody id="list1" class="group1">
<?php for($i=0;$i<count($sel);$i++){
	$catid=$sel[$i]['id'];
	$parentid=$sel[$i]['parent'];
	?>
	<tr id="nodorder1_<?=$catid?>" style="cursor:move;">                        
		<td id="id<?=$catid?>"><span id="id<?=$catid?>"><?=$catid?></span></td>
		<td><img id="img<?=$catid?>" src="<?=$sel[$i]['img']=='' ? $bookdefaultimg: UPLOADS.'thumbs/'.$sel[$i]['img']?>" width="30" height="30"></td>                       
		<td><a href="/bks/cat?id=<?=$sel[$i]['id']?>"><?=$sel[$i]['name']?></a></td>
		<td>
		<select class="form-control" id="parent<?=$catid?>">
		<option value="0">None</option>
		<?php for($j=0;$j<count($sel);$j++){ ?>
		<option value="<?=$sel[$j]['id']?>" <?=$parentid==$sel[$j]['id'] ? "selected=selected" :""?>><?=$sel[$j]['name']?></option>
		<?php } ?>
		</select>		
		</td>
		
		<td><button class="btn btn-danger" id="del<?=$sel[$i]['id']?>">Delete</button></td>
	</tr>
<?php } ?>

</tbody></table>

<?php } ?>
