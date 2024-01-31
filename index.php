<?php include 'config.php';?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-type" content="text/html; charset=UTF-8">  
<meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!------COMMON CSS------------->
    <link rel="stylesheet" href="/css/global.css">
   		<title>Parapera</title>
		<meta name="robots" content="selection">
		<meta name="copyright" content="Nikos Drosakis">
		<meta name="googlebot" content="all">
		<meta http-equiv="name" content="value">
		<meta name="ROBOTS" CONTENT="NOARCHIVE">		
		<meta name="google" content="notranslate">
		<meta name="robots" content="noindex">
	<link href="/css/style.css" rel="stylesheet" type="text/css" />	    
		<link href="atom.xml" type="application/atom+xml" rel="alternate" title="Sitewide ATOM Feed" >
		<script type="text/javascript">var G=<?php echo json_encode($G, JSON_UNESCAPED_UNICODE);?>;</script>
    <script src="/js/gaia.js"></script>
</head>
<body> 
<div id="wrapper_inner" style="display:block">
    <h1>Parapera</h1>
	<div style="height:300px;overflow:hidden"><img style="width:100%" src="https://bookriot.com/wp-content/uploads/2017/05/bookstore-lightbulbs-shelves-470x248.png"></div>
    <div id="searchbox">
        <input id="search_bks_book" placeholder="search <?=$GS['mode']?>">
        <button class="btn btn-primary" id="ssearch_bks_book">Search <?=$GS['mode']?></button>
    </div>
    <div class="stylebox">
       <button type="button" class="btn btn-<?=$_COOKIE['bks_style']=='boxy' ? 'success':'info'?>" onclick="g.cookie.set('bks_style','archieve');location.reload()">Archieve Style</button>
        <button type="button" class="btn btn-<?=$_COOKIE['bks_style']=='table' ? 'success':'info'?>" onclick="g.cookie.set('bks_style','table');location.reload()">Table Style</button>
    </div>

    <div class="topnav" id="myTopnav">
  <a href="/"  class="active">Books</a>
  <a href="/book?id=new">New book</a>
  <a href="/ebook">Ebooks</a>
  <a href="/writer">Writers</a>
  <a href="/editor">Editors</a>
  <a href="/cat">Categories</a>
  <a href="/tag">Tags</a>
  <a href="/update">Update</a>
        <a href="javascript:void(0);" class="icon" onclick="myFunction()">
            <i class="fa fa-bars"></i>
        </a>
    </div>
    <script>
        function myFunction() {
            var x = document.getElementById("myTopnav");
            if (x.className === "topnav") {
                x.className += " responsive";
            } else {
                x.className = "topnav";
            }
        }
    </script>


    <div class="flag_books" id="count_bks_books"></div>

<?php
if($GS['mode']==""){
	include 'book.php';	
}else{
	include $GS['mode'].'.php';
}
include 'finfo.php';
?>


</div>


<script src="/js/index.js"></script>

<center>v.0.1 by Nikos Drosakis</center>
<?php //updated:2020-01-29 20:20:34 footer- v.0.73 - Author:Nikos Drosakis - License: GPL License ?>
<!--updated:2020-01-01 18:12:01 - v.0.52 - Author:Nikos Drosakis - License: GPL License-->
					

					</div>

<?php if($mode!='global'){ ?>
<div id="board_gvars" class="gs-sidepanel" style="<?=!empty($_COOKIE['drgb-sidepanel']) ? "width:".$_COOKIE['drgb-sidepanel']."px;":""?>
display:<?=$_COOKIE['gs-sidepanel']=='globalvarsbar' ? 'block':'none'?>">
<div id="dragbar1" class="dragbar" onmousedown="s.ui.draggable(this,event)"></div>
<!--<button style="float:left" class="btn btn-danger btn-xs" onclick="$('#main_window').css('width','100%');$('#board_gvars').animate({width:'toggle'},500);s.coodel('gs-sidepanel');">Close</button>-->
<button style="margin-bottom:10px" class="btn btn-danger btn-xs" onclick="s.ui.switcher('.gs-sidepanel');s.coodel('gs-sidepanel');">X</button>

<?php include GAIAROOT . 'dsh/global.php'; ?>
</div>	
<?php } ?>
					
<!--<script src="/gaia/lib/prism.js"></script>-->
<?php 
$jsfile= "dsh/".($G['mode']!="" ? $G['mode']:'home').".js";
if(file_exists(GAIAROOT.$jsfile)){ 
?>
<script src="<?="/gaia/".$jsfile?>"></script>
<?php } ?>

<?php include GAIAROOT.'dshbar.php';?>

<div id="modal" style="display:none;"><div class="modalbg"><div id="modalhead"><a id="modalclose">x</a><span id="modaltitle"></span></div><div id="modalbody"></div><div id="modalfoot"></div></div></div>
<script src="/gaia/js/loading.js"></script>
</body>
</html>