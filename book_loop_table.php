<table class="TFtable">
<tr><td><a class="orderby" id="order_book.id">ID</a></td>
<td>img</td>
<td><a class="orderby" id="order_book.id">Writer</a></td>
<td><a class="orderby" id="order_book.title">Title</a></td>
<td><a class="orderby" id="order_cat.name">Category</a></td>
<td><a class="orderby" id="order_editor.name">Editor</a></td>
<td><a class="orderby" id="order_book.status">Status</a></td>
<td><a class="orderby" id="order_book.isread">Is Read</a></td>
<td>Action</td>
</tr><tbody id="list1" class="group1">

<?php
for ($i=0;$i<count($sel);$i++) {
$postid = $sel[$i]['id'];
$img = !$sel[$i]['img'] ? $bookdefaultimg : SITE_URL.'apps/bks/media/'. $sel[$i]['img'];
?>
<tr id="nodorder1_ postid?>" style="cursor:move;">
<td id="id<?=$postid?>"><span id="id<?=$postid?>"><?=$postid?></span></td>
<td><img id="img<?=$postid?>" src="<?=$img?>" width="30" height="30"></td>
<td><a href="/bks/writer?id=<?=$sel[$i]['writer']?>"><?=$sel[$i]['writername'] != null ? $sel[$i]['writername'] : ''?></a></td>
<td><a href=" data[i]['booklink']?>"><?=$sel[$i]['title']?></a></td>
<td><a href="/bks/cat?id=<?=$sel[$i]['cat']?>"><?=$sel[$i]['catname']!= null ? $sel[$i]['catname'] : ''?></a></td>
<td><a href="/bks/editor?id=<?=$sel[$i]['editor']?>"><?=$sel[$i]['editorname'] != null ? $sel[$i]['editorname'] : ''?></a></td>
<td><?=$book_status[$sel[$i]['status']]?></td>
<td><?=$isread[$sel[$i]['isread']]?></td>
<td><button type="button" class="close" aria-label="delete" id="del<?=$sel[$i]['id']?>"><span aria-hidden="true">&times;</span></button></td>
</tr>
<?php } ?>
