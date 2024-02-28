/*
* DUCKDUCKGO API
* */
$(document).on('click', "#finfo", function () {
    var q= $('#finfotitle').val().trim();
    $.get("https://api.duckduckgo.com",{q:q,format:"json"},function(res){
        var items='';
        var res= JSON.parse(res);
        for(var i in res.RelatedTopics){
            items += '<li class="item">'+res.RelatedTopics[i].Text+'</li>';
        }
        $('#inforeply').html('<h2>'+res.AbstractText+'</h2>');
        $('#finfos').html(items);

        // $( "#finfos" ).after('<button id="savefinfo">Save Info</button>');
        // $('#bookimg').attr('src',)
    })
})

/*
* GOOGLE BOOKS
* */
$(document).on('click', "#fbooks", function () {
    var q= $('#finfotitle').val().trim();
 search_book(q);
})
search_book($('#name').val());
function search_book(q){
    $.get("https://www.googleapis.com/books/v1/volumes?q="+q,{},function(res){
        console.log(res)
        var items='';
        // var res= JSON.parse(res);
        for(var i in res.items){
            items += '<li class="item"><b>'+res.items[i].volumeInfo.title+'</b>' +
                (typeof res.items[i].volumeInfo.imageLinks!='undefined' ? '<img src="'+res.items[i].volumeInfo.imageLinks.thumbnail+'">':'') +
                (typeof res.items[i].volumeInfo.subtitle!='undefined' ? '<p>'+res.items[i].volumeInfo.subtitle+'</p>':'') +
                '</li>';
        }
        // $('#inforeply').html('<h2>'+res.AbstractText+'</h2>');
        $('#finfos').html(items);

        // $( "#finfos" ).after('<button id="savefinfo">Save Info</button>');
        // $('#bookimg').attr('src',)
    })
}