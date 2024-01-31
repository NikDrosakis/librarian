var bookdefaultimg= "https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg";
var book_status={"0" : "lost","1":"not owned","2" :"desired","3" : "shelve"};
var isread={0:"not read",1 :"reading",2 :"read"};
//g.ajaxfile='/bks/ajax.php';
if(!g.cookie.get){
	g.cookie.set('bks_style','archieve');
}

function booklist(q) {
    var page=!g.cookie.get('page') ? 1: g.cookie.get('page');    
	var data= {a:'list',page:page,q:q,mode:GS.mode,name:GS.name};
	//url,div,data,callback,method,datatype
 g.file.include(GS.APPSPATH+'bks/ajax.php',data,function(res){
	 g.l(res)
			$('#book').html(res.html);	 
             $('#count_bks_books').text(res.count+ " titles saved");           
            g.ui.pagination.get(page, res.count, 12,'book');
 },'POST');
}
if(GS.mode=="" || GS.mode=="ebook") {
    booklist();
}


$(document).on('click', "#ssearch_book", function () {
var q= $('#search_book').val().trim()
    booklist(q);
})

$(document).on('click', "#submit_cat", function () {
	    var formid=$("#form_cat")
    event.preventDefault();
    var form = formid.serializeArray();
	$.post(GS.APPSPATH+'bks/ajax.php', form, function (data, textStatus, jqXHR) {
		  g.l(data)
        if (data == 'no') {		
            g.l(textStatus)
            g.l(jqXHR)
            g.alert("Form cannot be submitted");
        } else {
            g.l(data)         
              location.href="/bks/cat";
            // formid.reset();
        }
    },'json');
	
})
$(document).on('click', "#submit_book", function () {
    var formid=$("#form_book");
    event.preventDefault();
    var form = formid.serializeArray();
 //   form[g.size(form)]={name:'uid',value: g.cookie.get('GSID')}
   form[g.size(form)]={name:'saved',value: g.phptimestamp()}
    // form[g.size(form)]={name:'status',value: {0:'unread',1:'reading',2:'read'}}
    //form[g.size(form)]={name:'excerpt',value: $('#excerpt').summernote('code')}
    //form[g.size(form)]={name:'content',value: $('#content').summernote('code')}
    g.l(form)
    $.post(GS.APPSPATH+'bks/ajax.php', form, function (data, textStatus, jqXHR) {
		  g.l(data)
        if (data == 'no') {		
            g.l(textStatus)
            g.l(jqXHR)
            g.alert("Form cannot be submitted");
        } else {
            g.l(data)         
              location.href="/bks";
            // formid.reset();
        }
    },'json');
})
$(document).on('keyup', "#writer, #editor, #cat", function () {
	var id=this.id;
	var val=this.value.trim();	
	 $.get(GS.APPSPATH+'bks/ajax.php',{a:"radiolist",b:id,c:val},function(data){
	 g.l(data);
	 var list='';
	 if(data!='no'){
		 for(var i in data){		 
		 list +='<div style="display:flex"><input type="radio" name="'+id+'list" value='+i+' data-name="'+data[i]+'">'+data[i]+'</div>';
		 }
	 $('#'+id+'list').html(list)
	 }
	 
	 },'json');
})
$(document).on('click', "input[name='writerlist'], input[name='editorlist'], input[name='catlist']", function () {
	var name = this.name.replace('list','');
	//if($(this).is(':checked')){$('input[name="'+this.name+'"]').prop("checked", false);}
	var sel= $("input[name='"+this.name+"']:checked").data('name');
	$('#'+name).val(sel)
})	

if(GS.mode=='cat'){
	
		$(document)
		.on('change', "select[id^='parent']", function () {
			var catid=this.id.replace('parent','')
			var obj = {
            id :catid,
            value : "parent='"+this.value+"'",
            table : "cat",
            where : "id="+catid
			}
			g.l(obj)
			g.db.queryhtml(obj, function(data){g.l(data);},"POST");
	})
	
	.on('keyup', "#name", function () {
		var name= this.value.trim();
		 g.db.query('UPDATE cat SET name="'+name+'" WHERE id='+GS.id);
		 g.l(name)
	})
}
if(GS.id!=''){
	$(document).on('change', "#status","#isread", function () {
	var obj = {
            id :GS.id,
            value : this.id+"='"+this.value+"'",
            table : "book",
            where : "id="+g.get.id
			}
	g.db.queryhtml(obj, function(data){g.l(data);},"POST");
	})


$(document).on('click', "#savewri", function () {
    var writer = $('#writer').val().trim();
    var writerlist = $('input[name=writerlist]:checked').val();
        if(typeof(writerlist)!='undefined'){
            g.db.func("q",'UPDATE book SET writer='+writerlist+' WHERE id='+GS.id);
            var dataname= $('input[name=writerlist]:checked').attr('data-name');
            $('#writer').val(dataname);
        }else if(writer!=""){
            $.get(g.ajaxfile,{a:"inse",table:"writer",name:writer},function(data){
                g.l(data)
				if(data!='no'){
					g.db.func("q",'UPDATE book SET writer='+data+' WHERE id='+GS.id);
					g.ui.notify('alert','Writer saved')
					}
            },'json');
        }else{
            g.ui.notify('alert','Please insert a writer');
        }
})
$(document).on('click', "#savecat", function () {
        var cat= $('#cat').val().trim();
		var catlist = $('input[name=catlist]:checked').val();
         if(typeof(catlist)!='undefined'){
			 g.l('case update')
            g.db.query('UPDATE book SET cat='+catlist+' WHERE id='+GS.id);
            var dataname= $('input[name=catlist]:checked').attr('data-name');
            $('#cat').val(dataname);
        }else if(cat!=""){
            $.get(g.ajaxfile,{a:"inse",table:"cat",name:cat},function(data){
                g.l(data)
				if(data!='no'){
					g.db.func("q",'UPDATE book SET cat='+data+' WHERE id='+GS.id);
					g.ui.notify('alert','Category saved')
					}
            },'json');
        }else{
            g.ui.notify('alert','Please insert a category.')
        }
})
	$(document).on('click', "#savedi", function () {
        var editor= $('#editor').val().trim();
		var editorlist = $('input[name=editorlist]:checked').val();
         if(typeof(editorlist)!='undefined'){
			 g.l('case update')
            g.db.query('UPDATE book SET editor='+editorlist+' WHERE id='+GS.id);
            var dataname= $('input[name=editorlist]:checked').attr('data-name');
            $('#editor').val(dataname);
        }else if(editor!=""){
			g.l('case insert')
            $.get(g.ajaxfile,{a:"inse",table:"editor",name:editor},function(data){
                g.l(data)
				if(data!='no'){
					g.db.func("q",'UPDATE book SET editor='+data+' WHERE id='+GS.id);
					g.ui.notify('alert','Editor saved')
					}
            },'json');
        }else{
            g.ui.notify('alert','Please insert a category.')
        }
})

$(document).on('keyup', "#title, #summary, #notes, #tag", function () {
	if (this.id == 'title') {
		$('#titlebig').text(this.value);
	}
	         var obj = {
            id :GS.id,
            value : this.id+"='"+this.value+"'",
            table : "book",
            where : "id="+g.get.id
			}
	g.db.queryhtml(obj, function(data){g.l(data);},"POST");
})
}

//delete
$(document).on('click', "button[id^='del']", function () {
	var id=this.id.replace('del','');
	bootbox.confirm("This book record will be deleted. Are you sure?",function(res){
	if(res){
		 $.get(GS.APPS+'bks/ajax.php',{a:"del",b:GS.mode,c:id},function(data){
			$('#nodorder1_'+id).hide();
		 })
		 }
	})	
})
//find image from google api
.on('click', "#savefinfo", function () {
    var sel= $("input[name='fitems']:checked"). val();
    $('#bookimg').attr('src',sel);
    //download to media
    //save to db
})
    .on("click","a[id^='order_']",function(){
        var name= this.id.replace('order_','')
//log(name)
        var orderby= g.cookie.get('orderby')== name+' ASC' ? name+' DESC': name+' ASC';
        g.cookie.set('orderby',orderby);
        g.cookie.delete('page');
        // reset('mgr')
        location.reload();
    })


//page
$(document).on('click', "button[id^='page_']", function () {
    var page= this.id.replace('page_', '');
    g.cookie.set('page',page);
    g.ui.reset('#bookbox');
    booklist()
})


//experimental run neo4j
// $.get("https://aimd5.com:7473/db/data/",function(neo){
// g.l(neo)
// },'json')
