<?php
include_once "/var/www/gaia/boot.php";
include_once $cms->APPSROOT."bks/config.php";
$time=time();
$a= $_REQUEST['a'];
$b= $_REQUEST['b'];
$c= $_REQUEST['c'];

if($a=='func') {
$cq = $b == 'fl' ? explode(',', $c) : $c;
$data = $bot->$b($cq);
echo $b=="q" && $data ? json_encode("yes") : json_encode($data);

}elseif($a=='list') {		
	$pagin=12; //pagination num of result for each page
    $start=($_POST['page'] - 1) * $pagin;
	$buffer=array();	
	if($_POST['mode']=='ebook'){
		$sel=array();
		$name=isset($_POST['name']) ?  $_POST['name'] : '';
		$ebooks= glob($cms->APPSROOT."bot/pdf/$name/*.pdf");
		if(!empty($ebooks)){
		$i=0;		
		foreach(array_slice($ebooks,$start,$pagin) as $e){
		$e=basename($e); 
		$sel[$i]['title']=basename($e, ".pdf") ; 
		$sel[$i]['booklink']=$cms->APPSPATH."bot/pdf/$name/$e"; 
		$i++;
		}
		$buffer['count']= count($ebooks);
		}else{
		$buffer['count']= 0;	
		}
		 
	}else{
		$orderby = !empty($_COOKIE['orderby']) ? $_COOKIE['orderby'] : "book.id DESC";
		//pagination
		//$pagin=$bot->is('pagin'); //pagination num of result for each page    
		$limit= " LIMIT $start,$pagin";

		$q=!empty($_POST['q']) ? $_POST['q']: '';
		$qq=$q!=""
			? "WHERE book.title LIKE '%$q%' 
			OR writer.name LIKE '%$q%' 
			OR cat.name LIKE '%$q%' 
			OR editor.name LIKE '%$q%'"
			:"";

		$query="SELECT book.*, 
			CONCAT('/bks/book?id=',book.id) as booklink,
			writer.name as writername,
			cat.name as catname,
			editor.name as editorname
			FROM book 
			left join writer on book.writer=writer.id
			left join cat on book.cat=cat.id
			left join editor on book.editor=editor.id
			$qq ORDER BY $orderby ";
		
		$sel= $bot->fa("$query $limit");
		$buffer['count']= count($bot->fa($query));    
	}
	if($_COOKIE['bks_style']=='table'){
		$buffer['html']=include_buffer("book_loop_table.php",$sel);		
	}elseif($_COOKIE['bks_style']=='archieve'){
		$buffer['html']=include_buffer("book_loop_archive.php",$sel);
	}				
	echo json_encode($buffer);
	
}elseif($a=='newbks') {
	   $book=array(
	   'title'=> $_POST['title'],
	   'status'=> $_POST['status'],
	   'summary'=> $_POST['summary'],
	   'notes'=> $_POST['notes'],
	   'saved'=> $_POST['saved']
	   );

	   $insert=$bot->inse('book',$book);	    
//insert editor and get id		
		if($_POST['editorlist']!=""){
	   $inseditor=(int)$_POST['editorlist'];
	   
	   }elseif($_POST['editor']!=''){
	   $editor=array('name'=>$_POST['editor']);
	   $inseditor=$bot->inse('editor',$editor);
		}else{
			$inseditor=0;
		}
//insert writer and get id
	   if($_POST['writerlist']!=""){
	   $inswriter=(int)$_POST['writerlist'];
	   
	   }elseif($_POST['writer']!=''){
	   $writer=array('name'=>$_POST['writer']);
	   $inswriter=$bot->inse('writer',$writer);
	   }else{
		   $inswriter=0;
	   }
//insert cat and get id
	    if($_POST['catlist']!=""){
	   $inscat=(int)$_POST['catlist'];
	   
	   }elseif($_POST['cat']!=''){
	   $cat=array('name'=>$_POST['cat']);
	   $inscat=$bot->inse('cat',$cat);
	   }else{
		   $inscat=0;
	   }

//insert img 
		if (isset($_POST['img_url'])){
			   $path = pathinfo($_POST['img_url']);
			   $ext=!empty($path['extension']) ? $path['extension'] : 'jpg';
			   $img=md5($_POST['img_url']).'.'.$ext;
			   if(copy($_POST['img_url'],$bot->GS['SITE_ROOT']."apps/bks/media/" .$img)){
				  $insimg =$img; 
			  }else{
				  $insimg='';
			  }
		}

	   $updatearray=array(	   
	   $inscat,
	   $inswriter,
	   $inseditor,	   
	   $insimg,
	   $insert	   
	   );		
	   $update = $bot->q("UPDATE book SET cat=?,writer=?,editor=?,img=? WHERE id=?",$updatearray);
	   
	   if($insert && $update){
		echo json_encode($updatearray);	   
	   }else{
		   echo json_encode($updatearray);	   
		}		

}elseif($a=='newbkscat'){
	if($_POST['name']!=''){
	   $cat=array('name'=>$_POST['name'],'parent'=>$_POST['parent']);
	   $inscat=$bot->inse('cat',$cat);
	   echo json_encode($inscat);	   
	}
}elseif($a=='del'){
	$b=!empty($b) ? $b : 'book';
	$bot->q("DELETE FROM $b WHERE id=$c");

}elseif($a=='copy'){
   if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['url'])){
       $url=$_POST['url'];
       $path = pathinfo($url);
       $ext=!empty($path['extension']) ? $path['extension'] : 'jpg';
       $img=$_POST['name'].'.'.$ext;
       if(copy($_POST['url'],$bot->GS['SITE_ROOT']."apps/bks/media/" .$img)){
           //save to db
           $table=$_POST['table'];
           $id=$_POST['id'];
            $query="UPDATE $table SET img='$img' WHERE id=$id";
			$q=$bot->q($query);
            if($q) {
                //echo $img;
                echo $query;
            }else{echo 'no';}
       }else{
           echo 'no';
       }
   }
}elseif($a='radiolist'){
	$like= $c.'%';
	$sel=$bot->fetchList(array("id","name"),$b,"WHERE name LIKE '$like' LIMIT 3");
	echo !empty($sel) ? json_encode($sel) : json_encode('no');
}elseif($a=='cachereset'){
    $output=array();
    $output[]= opcache_reset();
//    $redispass = $GLOBAL['CONF']['redis_pass'];
//       $output[] = shell_exec("redis-cli -a $redispass flushall");
    echo implode('',$output);

    //$siteroot= SITE_ROOT.'gaia/c/test.c';
    //shell_exec("g++ $siteroot -o test1");
    //echo exec(SITE_ROOT.'gaia/c/test1');
}

