<?php
//include_once "/var/www/gaia/boot.php";
include "config.php";
$time=time();
$a= $_REQUEST['a'];
$b= $_REQUEST['b'];
$c= $_REQUEST['c'];

if($a=='func') {
$cq = $b == 'fl' ? explode(',', $c) : $c;
$data = $bot->$b($cq);
echo $b=="q" && $data ? json_encode("yes") : json_encode($data);

}elseif($a=='list') {
    $list=$book->get_booklist();
    if(!empty($list)) {
        echo json_encode($list);
    }else{
        echo json_encode($list);
    }
	
}elseif($a=='newbks') {
    echo json_encode($book->insert_newbook());

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

