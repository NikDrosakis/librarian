<?php 
$G=[];
foreach($_GET as $get =>$getval){
					$G[$get] =trim($getval);
				}
				$G['page']= isset($_GET['page']) ? trim($_GET['page']):'';
				$G['mode']= isset($_GET['mode']) ? trim($_GET['mode']):'';
				$G['sub']= isset($_GET['sub']) ? trim($_GET['sub']):'';
				$G['id']= isset($_GET['id']) ? trim($_GET['id']):'';
				$G['uid']= isset($_GET['uid']) ? trim($_GET['uid']):'';
				$getpage= $G['page']!='' ?  $G['page'] : 'index';
$book_status=array(
"0" => "lost",
"1" =>"not owned",
"2" =>"desired to buy",
"3" => "owned on shelve"
);
$isread=array(
0=> "no",
1 => "reading",
2 => "read"
);
$bookdefaultimg= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzeJcVMWcaL9PHY6MwqifB00XWtBxzFvsvyfL2rNXZdkB0E4DA";
include "class/DB.php";
$bot=new DB('gs_paraperagr');