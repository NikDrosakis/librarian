//find image from google api

$(document).on('click', "#savefimg", function () {
    var url = $("input[name='fitems']:checked").val();
    $('#bookimg').attr('src',url);
    var name=$("input[name='fitems']:checked").attr('data');
    g.l(name)
	var mode= GS.mode=='' ? 'book':GS.mode;
    //save to db	
    $.post('/apps/bks/ajax.php',{a:"copy",url:url,name:name,id:GS.id,table:mode},function(data){
        g.l(data);
    })


})

if(GS.id=='new'){
$(document).on('click', "input[name='fitems']", function () {
	var url = $("input[name='fitems']:checked").val();
	$('#form_book').append("<input type='hidden' name='img_url' value='"+url+"'>")
})
}

$(document).on('click', "#fimg", function () {

    if(GS.mode=='book' || GS.mode=='') {
        var ftitle = $('#ftitle').val().trim();
        var writer = $('#writer').val();
        var editor = $('#editor').val();
        if(GS.id=='new'){
			var q = $('input[name="title"]').val().trim()+' '
					+$('input[name="writer"]').val().trim()+' '
					+$('input[name="editor"]').val().trim();
		}else{
			var q = ftitle != '' ? ftitle : $('#title').val().trim()+' '+writer+' '+editor;
		}
    }else{
        var name= $('#name').val().trim();
        var q = name != '' ? name : '';
    }
	g.l(q)
	if(q!=''){
    $.get("https://www.googleapis.com/customsearch/v1?num=5&searchType=image&fileType=jpg%7Cgif%7Cpng&safe=off&q="+q+"&cx=000897981024708010815%3Ah-9unlwfo7q&key=AIzaSyDNAIWEszhKEjT6E5fpT8OZjIJrPY_zRI8&alt=json",function(res){
        var items='';
        g.l(res)
        if(res.hasOwnProperty('items') && res.items.length >0){
            for(var i in res.items) {
                items += '<li class="list-inline-item">' +
                    '<input id="'+i+'" class="input-hidden" style="position: absolute;  opacity: 0;  width: 0;  height: 0;" type="radio" name="fitems" data="'+g.greeklish(res.items[i].title)+'" value="'+res.items[i].image.thumbnailLink+'">'+
                    '<label for="'+i+'"><img style="cursor: pointer;" src="'+res.items[i].image.thumbnailLink+'"></label>' +
                    '<div style="width: 120px;">'+res.items[i].title+'</div>' +
                    '</li>';
                '</li>';
            }
        }
        $('#fimgs').html(items);
        $( "#fimgs" ).after('<button id="savefimg">Save Img</button>');
        // $('#bookimg').attr('src',)
    })
	}
})