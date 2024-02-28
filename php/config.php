<?php 
//@ini_set('xdebug.max_nesting_level', 10000);
@ini_set('output_buffering', 'on');
@ini_set('max_execution_time', 0);
@ini_set('session.cookie_httponly',1);
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
ini_set("log_errors", 1);
@define('REFERER',$_SERVER['HTTPS']=='on' ? 'https://' : 'http://'); //http or https
@define('SITE_ROOT',$_SERVER['DOCUMENT_ROOT'].'/');
@define('SERVEROOT', dirname(SITE_ROOT));
@define('HTTP_HOST',rtrim(str_replace(SERVEROOT,'',SITE_ROOT),'/'));
@define('SITE_URL',REFERER.$_SERVER['HTTP_HOST'].'/'); //the full url
$time=time();
@ini_set('gd.jpeg_ignore_warning', true);
@ini_set('session.use_trans_sid', 0);
@ini_set('session.use_only_cookies', 1);
@ini_set('zlib.output_compression', '1');
$G=[];
$G['SERVER']=$_SERVER;
$G['SITE_ROOT']=SITE_ROOT;
$G['SERVEROOT']=SERVEROOT;
$G['HTTP_HOST']=HTTP_HOST;
$G['SITE_URL']=SITE_URL;
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
include "generic.php";
spl_autoload_register(function ($className) {
    if(file_exists("class/".$className.".php"))
        include ("class/".$className.".php");
});
$bot=new DB('librarian');
$book=new Book();