	<!-- EDIT / SHOW-->
<a href="/bks">Back to List</a>
<span style="float:left;" onclick="g.ui.goto(['previous','book','id',g.get.id,'/bks/book?id='])" class="next glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
<span style="float:right" onclick="g.ui.goto(['next','book','id',g.get.id,'/bks/book?id='])" class="next glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
<?php 
$sel= $bot->f("SELECT book.*,
writer.name as writer,
cat.name as cat,
editor.name as editor
FROM book 
left join writer on book.writer=writer.id
left join cat on book.cat=cat.id
left join editor on book.editor=editor.id
WHERE book.id=?",array($this->GS['id']));

    $img=$sel['img']=='' ? $bookdefaultimg: $this->GS['SITE_URL'].'apps/bks/media/'.$sel['img'];
    ?>
<?php include 'fimg.php'; ?>
    <div>
	<img id="bookimg" src="<?=$img?>" style="width:300px;float:left">
        <h2 style="float:right" id="titlebig"><?=$sel['name']?></h2>
    </div>
	

<label>Title:</label><input class="form-control" id="title" value="<?=$sel['title']?>">

<label>Volume:</label><input class="form-control" id="vol" value="<?=$sel['vol']?>">

<label>Writer:</label>
<input class="form-control" id="writer" value="<?=$sel['writer']?>">
<div class="vertical-menu"  id="writerlist"></div>
<button class="btn btn-primary" id="savewri">Save Writer</button>


<label>Edition Year:</label>
      <script type="text/javascript">
         $(function() {
            $( "#edited" ).datepicker({dateFormat: 'yy'});
         });
      </script>
<input class="form-control" id="edited" value="<?=$sel['edited']?>">


<label>Editor:</label>
<input class="form-control" id="editor" value="<?=$sel['editor']?>">
<div class="vertical-menu"  id="editorlist"></div>
<button class="btn btn-primary" id="savedi">Save Editor</button>

<label>category: </label>
<input class="form-control" id="cat" value="<?=$sel['cat']?>">
<div class="vertical-menu"  id="catlist"></div>
<button class="btn btn-primary" id="savecat">Save Category</button>

<br/>
<label>status:  </label><select class="form-control" id="status">
<?php foreach($book_status as $id => $val){ ?>
<option value="<?=$id?>" <?=$sel['status']==$id ? "selected=selected" :""?>><?=$val?><option>
<?php } ?>
</select>

<label>isread:  </label>
<select class="form-control" id="isread">
<?php foreach($isread as $id => $val){ ?>
<option value="<?=$id?>" <?=$sel['isread']==$id ? "selected=selected" :""?>><?=$val?><option>
<?php } ?>
</select>
<br/>

<label>tags: </label><input class="form-control" id="tag" value="<?=$sel['tag']?>">
<label>summary: </label><textarea class="form-control" id="summary"><?=$sel['summary']?></textarea>
<label>notes: </label><textarea class="form-control" id="notes"><?=$sel['notes']?></textarea>

</section>