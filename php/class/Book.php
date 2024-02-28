<?php
class Book {

    public function __construct()
    {


    }
public function db(){
        $bot=new DB('librarian');
        return $bot;
}
    public function get_booklist(){
        $pagin=12; //pagination num of result for each page
        $start=($_GET['page'] - 1) * $pagin;
        $buffer=array();
        if($_GET['mode']=='ebook'){
            $sel=array();
            $name=isset($_GET['name']) ?  $_GET['name'] : '';
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

            $q=!empty($_GET['q']) ? $_GET['q']: '';
            $qq=$q!=""
                ? "WHERE book.title LIKE '%$q%' 
			OR writer.name LIKE '%$q%' 
			OR cat.name LIKE '%$q%' 
			OR editor.name LIKE '%$q%'"
                :"";
            $query="SELECT book.*, CONCAT('/bks/book?id=',book.id) as booklink,
			writer.name as writername,cat.name as catname,editor.name as editorname
			FROM book 
			left join writer on book.writer=writer.id
			left join cat on book.cat=cat.id
			left join editor on book.editor=editor.id
			$qq ORDER BY $orderby ";

            $sel= $this->db()->fa("$query $limit");
            $buffer['count']= count($this->db()->fa($query));
        }
        if($_COOKIE['bks_style']=='table'){
            $buffer['html']=include_buffer("book_loop_table.php",$sel);
       // }elseif($_COOKIE['bks_style']=='archieve'){
        }else{
            $buffer['html']=include_buffer("book_loop_archive.php",$sel);
        }
        return $buffer;
    }


    public function insert_newbook(){
        $book=array(
            'title'=> $_POST['title'],
            'status'=> $_POST['status'],
            'summary'=> $_POST['summary'],
            'notes'=> $_POST['notes'],
            'saved'=> $_POST['saved']
        );

        $insert=$this->db()->inse('book',$book);
//insert editor and get id
        if($_POST['editorlist']!=""){
            $inseditor=(int)$_POST['editorlist'];

        }elseif($_POST['editor']!=''){
            $editor=array('name'=>$_POST['editor']);
            $inseditor=$this->db()->inse('editor',$editor);
        }else{
            $inseditor=0;
        }
//insert writer and get id
        if($_POST['writerlist']!=""){
            $inswriter=(int)$_POST['writerlist'];

        }elseif($_POST['writer']!=''){
            $writer=array('name'=>$_POST['writer']);
            $inswriter=$this->db()->inse('writer',$writer);
        }else{
            $inswriter=0;
        }
//insert cat and get id
        if($_POST['catlist']!=""){
            $inscat=(int)$_POST['catlist'];

        }elseif($_POST['cat']!=''){
            $cat=array('name'=>$_POST['cat']);
            $inscat=$this->db()->inse('cat',$cat);
        }else{
            $inscat=0;
        }

//insert img
        if (isset($_POST['img_url'])){
            $path = pathinfo($_POST['img_url']);
            $ext=!empty($path['extension']) ? $path['extension'] : 'jpg';
            $img=md5($_POST['img_url']).'.'.$ext;
            if(copy($_POST['img_url'],$this->GS['SITE_ROOT']."apps/bks/media/" .$img)){
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
        $update = $this->db()->q("UPDATE book SET cat=?,writer=?,editor=?,img=? WHERE id=?",$updatearray);

        if($insert && $update){
            $q= json_encode($updatearray);
        }else{
            $q=false;
        }
        return $q;
    }

}