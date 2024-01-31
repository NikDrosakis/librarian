<div style="background:white;margin:1%;padding:1%">
<h2 style="cursor:pointer">New Book</h2>
<section id="newbook">
<?php include 'fimg.php'; ?>
<form id='form_<?=$table?>'>
<input type='hidden' name='a' value='newbks'>
<img id="bookimg" src="<?=$bookdefaultimg?>" style="width:40%;float:left">
	
<label>New Volume of existing book:</label><input id="newvol" type="checkbox">
<br/>
<label>Title:</label><input class="form-control" name="title" value="">

<label>Writer:</label>
<input class="form-control" id="writer" name="writer" value="">
<div class="vertical-menu"  id="writerlist"></div>

<label>Edition Year:</label>
      <script type="text/javascript">
         $(function() {
       //     $( "#edited" ).datepicker({dateFormat: 'yy'});
         });
      </script>
<input class="form-control" name="edited" value="<?=$sel['edited']?>">

<label>Editor:</label>
<input class="form-control" id="editor" name="editor" value="">
<div class="vertical-menu"  id="editorlist"></div>

<label>category: </label>
<input class="form-control" id="cat" name="cat" value="">
<div class="vertical-menu"  id="catlist"></div>

<label>status:  </label>
<select class="form-control" name="status">
<?php foreach($book_status as $id => $val){ ?>
<option value="<?=$id?>"><?=$val?><option>
<?php } ?>
</select>
<label>isread:  </label>
<select class="form-control" name="isread">
<?php foreach($isread as $id => $val){ ?>
<option value="<?=$id?>"><?=$val?><option>
<?php } ?>
</select>

<label>tags: <label><input class="form-control" name="tag" value="">
<label>summary: <label><textarea class="form-control" name="summary"></textarea>
<label>notes: <label><textarea class="form-control" name="notes"></textarea>

<button class='btn btn-default' id='submit_<?=$table?>'>Save new <?=$table?></button>
</form>

</section>

</div>