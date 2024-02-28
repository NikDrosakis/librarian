var bookdefaultimg= "https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg";
var book_status={"0" : "lost","1":"not owned","2" :"desired","3" : "shelve"};
var isread={0:"not read",1 :"reading",2 :"read"};
//s.ajaxfile='/bks/ajax.php';
if(!s.coo){
	s.coo('bks_style','archieve');
}

function booklist(q) {
    var page=!s.coo('page') ? 1: s.coo('page'), q=!!q ? q : '';
	var params= {a:'list',page:page,q:q,mode:G.mode,name:G.name};
    console.log(params)
	//url,div,data,callback,method,datatype
 $.get('/ajax.php',params,function(res){
	 console.log(res)
			$('#book').html(res.html);	 
             $('#count_bks_books').text(res.count+ " titles saved");           
            s.ui.pagination.get(page, res.count, 12,'book');
 },'json');
}


$(document).on('click', "#ssearch_book", function () {
var q= $('#search_book').val().trim()
    booklist(q);
})

$(document).on('click', "#submit_cat", function () {
	    var formid=$("#form_cat")
    event.preventDefault();
    var form = formid.serializeArray();
	$.post('/ajax.php', form, function (data, textStatus, jqXHR) {		  
        if (data == 'no') {		
            console.log(textStatus)
            console.log(jqXHR)
            s.alert("Form cannot be submitted");
        } else {
            console.log(data)         
              location.href="/bks/cat";
            // formid.reset();
        }
    },'json');
	
})
$(document).on('click', "#submit_book", function () {
    var formid=$("#form_book");
    event.preventDefault();
    var form = formid.serializeArray();
 //   form[s.size(form)]={name:'uid',value: s.coo('GID')}
   form[s.size(form)]={name:'saved',value: s.phptimestamp()}
    // form[s.size(form)]={name:'status',value: {0:'unread',1:'reading',2:'read'}}
    //form[s.size(form)]={name:'excerpt',value: $('#excerpt').summernote('code')}
    //form[s.size(form)]={name:'content',value: $('#content').summernote('code')}
    console.log(form)
    $.post('/ajax.php', form, function (data, textStatus, jqXHR) {
		  console.log(data)
        if (data == 'no') {		
            console.log(textStatus)
            console.log(jqXHR)
            s.alert("Form cannot be submitted");
        } else {
            console.log(data)         
              location.href="/bks";
            // formid.reset();
        }
    },'json');
})
$(document).on('keyup', "#writer, #editor, #cat", function () {
	var id=this.id;
	var val=this.value.trim();	
	 $.get('/ajax.php',{a:"radiolist",b:id,c:val},function(data){
	 console.log(data);
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

if(G.mode=='cat'){
	
		$(document)
		.on('change', "select[id^='parent']", function () {
			var catid=this.id.replace('parent','')
			var obj = {
            id :catid,
            value : "parent='"+this.value+"'",
            table : "cat",
            where : "id="+catid
			}
			console.log(obj)
			s.db.queryhtml(obj, function(data){console.log(data);},"POST");
	})
	
	.on('keyup', "#name", function () {
		var name= this.value.trim();
		 s.db.query('UPDATE cat SET name="'+name+'" WHERE id='+G.id);
		 console.log(name)
	})
}
if(G.id!=''){
	$(document).on('change', "#status","#isread", function () {
	var obj = {
            id :G.id,
            value : this.id+"='"+this.value+"'",
            table : "book",
            where : "id="+s.get.id
			}
	s.db.queryhtml(obj, function(data){console.log(data);},"POST");
	})


$(document).on('click', "#savewri", function () {
    var writer = $('#writer').val().trim();
    var writerlist = $('input[name=writerlist]:checked').val();
        if(typeof(writerlist)!='undefined'){
            s.db.func("q",'UPDATE book SET writer='+writerlist+' WHERE id='+G.id);
            var dataname= $('input[name=writerlist]:checked').attr('data-name');
            $('#writer').val(dataname);
        }else if(writer!=""){
            $.get(s.ajaxfile,{a:"inse",table:"writer",name:writer},function(data){
                console.log(data)
				if(data!='no'){
					s.db.func("q",'UPDATE book SET writer='+data+' WHERE id='+G.id);
					s.ui.notify('alert','Writer saved')
					}
            },'json');
        }else{
            s.ui.notify('alert','Please insert a writer');
        }
})
$(document).on('click', "#savecat", function () {
        var cat= $('#cat').val().trim();
		var catlist = $('input[name=catlist]:checked').val();
         if(typeof(catlist)!='undefined'){
			 console.log('case update')
            s.db.query('UPDATE book SET cat='+catlist+' WHERE id='+G.id);
            var dataname= $('input[name=catlist]:checked').attr('data-name');
            $('#cat').val(dataname);
        }else if(cat!=""){
            $.get(s.ajaxfile,{a:"inse",table:"cat",name:cat},function(data){
                console.log(data)
				if(data!='no'){
					s.db.func("q",'UPDATE book SET cat='+data+' WHERE id='+G.id);
					s.ui.notify('alert','Category saved')
					}
            },'json');
        }else{
            s.ui.notify('alert','Please insert a category.')
        }
})
	$(document).on('click', "#savedi", function () {
        var editor= $('#editor').val().trim();
		var editorlist = $('input[name=editorlist]:checked').val();
         if(typeof(editorlist)!='undefined'){
			 console.log('case update')
            s.db.query('UPDATE book SET editor='+editorlist+' WHERE id='+G.id);
            var dataname= $('input[name=editorlist]:checked').attr('data-name');
            $('#editor').val(dataname);
        }else if(editor!=""){
			console.log('case insert')
            $.get(s.ajaxfile,{a:"inse",table:"editor",name:editor},function(data){
                console.log(data)
				if(data!='no'){
					s.db.func("q",'UPDATE book SET editor='+data+' WHERE id='+G.id);
					s.ui.notify('alert','Editor saved')
					}
            },'json');
        }else{
            s.ui.notify('alert','Please insert a category.')
        }
})

$(document).on('keyup', "#title, #summary, #notes, #tag", function () {
	if (this.id == 'title') {
		$('#titlebig').text(this.value);
	}
	         var obj = {
            id :G.id,
            value : this.id+"='"+this.value+"'",
            table : "book",
            where : "id="+s.get.id
			}
	s.db.queryhtml(obj, function(data){console.log(data);},"POST");
})
}

//delete
$(document).on('click', "button[id^='del']", function () {
	var id=this.id.replace('del','');
	bootbox.confirm("This book record will be deleted. Are you sure?",function(res){
	if(res){
		 $.get(G.APPS+'bks/ajax.php',{a:"del",b:G.mode,c:id},function(data){
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
        var orderby= s.coo('orderby')== name+' ASC' ? name+' DESC': name+' ASC';
        s.coo('orderby',orderby);
        s.coo.delete('page');
        // reset('mgr')
        location.reload();
    })


//page
$(document).on('click', "button[id^='page_']", function () {
    var page= this.id.replace('page_', '');
    s.coo('page',page);
    s.ui.reset('#bookbox');
    booklist()
})


//experimental run neo4j
// $.get("https://aimd5.com:7473/db/data/",function(neo){
// console.log(neo)
// },'json')
