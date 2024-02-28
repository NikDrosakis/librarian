<?php 
if($G['id']=='new'){ 
$table='book';
include "book_new.php";
// BOOK EDIT
}elseif($G['id']!=''){ 
include "book_edit.php";
// BOOK LIST 
}else{   ?>
<div id="pagination" class="paginikCon"></div>
<div id="book">
<!--APPEND BOXY OR ARCHIVE STYLE-->
</div>
<?php } ?>