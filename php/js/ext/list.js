/*updated:2020-01-29 20:20:34 list - v.0.73 - Author:Nikos Drosakis - License: GPL License*/

/*
* s.ui.list extends s.ui
* new extension producing s.ui.form && s.ui.table
* for user, post, taxonomies and other dsh pages
* containts core list object producing
* list gshead with filters and gsbody with records loop
* at post.js, user.js file s.ui.list is instantiated
* with a) s.ui.list.param b) custom s.ui.list.events other from existant in s.ui.list
* Νο php file required!
* only <div id="[table]_container" class="board_id_container"> for the function to append everything
* styles is included in dhs.css
 * */
s.ui.list = {
    param : {},
    order : ['ASC','DESC'],
    head : function(){
        var table= this.param.table;
        //<!----line 1 RESET - SEARCH ---->
        list_head = '<button id="' + table+'_reset" style="float:left" onclick="s.ui.list.reset(this)" class="btn btn-default btn-sm">Reset</button>'+
            '<input type="text" id="' + table+'_search" style="width: 80%;display:inline-flex;float: left;margin-left: 1%;" onkeyup=" s.ui.list.search(this)" placeholder="search" value="'+(s.coo(table+"'_search") ? s.coo(table+"_search") :"")+'" class="form-control input-sm">'+
            // <!----line 2 DATE FROM ---->
        '<div class="toFromTitle">'+
            '<span>Date from:</span><input style="display:inline-flex" type="date" onchange="s.ui.list.dateselection(this)" value="'+(s.coo(table+"_from") ? s.coo(table+"_from"):"")+'" id="' + table+'_from" class="form-control input-sm">'+
            '</div>'+
            // <!----line 3 DATE FROM ---->
        '<div class="toFromTitle">'+
            '<span>to:</span><input style="display:inline" type="date" class="form-control input-sm" onchange="s.ui.list.dateselection(this)" value="'+(s.coo(table+"_to") ? s.coo(table+"_to"):"")+'" id="' + table+'_to">'+
            '</div>'+
            // <!----LINE 4 ORDER POST VALUE---->
        'OrderBy: <select style="width:52%;display:inline-flex" id="order_' + table+'_value" class="form-control input-sm" onchange="s.ui.list.orderby(this);" >';
        var orders= s.ui.list.param.orders;
        for(i in orders) {
            list_head += '<option value="' + orders[i] + '" ' + (s.coo(table+"_order") && orders[i] == s.coo(table+"_order").split(" ")[2] ? "selected=selected" : "") + '>' + orders[i] + '</option>';
        }
        list_head += '</select>'+
        // <!----ORDER POST SORT---->
        '<select style="width:25%;display:inline-flex" class="form-control input-sm" id="order_' + table+'_sort" onchange="s.ui.list.orderby(this)" >';
        for(i in this.order){
            list_head += '<option value="'+this.order[i]+'" '+(s.coo(table+"_order") && this.order[i]==s.coo(table+"_order").split(" ")[3] ? "selected=selected":"")+'>'+this.order[i]+'</option>';
        }
        list_head += '</select>'+
        // <!----line 5 COUNTER - SELECTBY ---->
        '<div>'+
        '<span id="'+table+'_counter" style="background:red;color:white;padding:3px">0</span> records'+
            // <!----SELECT BY---->
        '- select by taxonomy:'+
            '<select style="width:25%;display:inline-flex" class="form-control input-sm" id="'+table+'_select" onchange="s.ui.list.selectby(this);" >'+
            '<option value="" class="btn btn-default">All</option>';
        var taxuri= g.get.tax_uri;
        for(i in taxuri) {
            list_head += '<option value="'+taxuri[i]+'" '+(s.coo(table+"_select")==taxuri[i] ? "selected=selected":"")+'>'+taxuri[i]+'</option>';
        }
        list_head += '</select>'+
        '</div>'+
        // <!----line 6 PAGINATION ---->
        '<div id="pagination" class="paginikCon"></div>'+
        '<div id="'+table+'" class="group1"></div>';
        $('.' + table+'_container').prepend(list_head);
    },
    get: function () {
        var table= this.param.table;
        var order= this.param.order;
        var select= !s.coo(table+'_select') ? this.param.select : s.coo(table+'_select');
        var search= !s.coo(table+'_search') ? this.param.search : s.coo(table+'_search');
        var from= !s.coo(table+'_from') ? this.param.from : s.coo(table+'_from');
        var to= !s.coo(table+'_to') ? this.param.to: s.coo(table+'_to');

        //set page 1
        if(!s.coo(table+'_page')){s.coo(table + '_page', 1);}
        var page= s.coo(table+'_page');

        // var param= !param ? '' : param;
        var list = '';
        $.ajax({
            type: 'POST',
            url: g.ajaxfile,
            data: {a: 'list',order:order, table:table,page:page,search:search,select:select,from:from,to:to,date_filter:this.param.date_filter,query:this.param.query,groupby:this.param.groupby,selectby:this.param.selectby},
            dataType: 'json',
            success: function (data) {
               console.log(data.query);console.log(data)
                var counter = data.count;
                //get  pagination
                s.ui.pagination.get(page, data.count, g.get.is.pagin, table);
                //get loop
                if (counter != 0) {
                    list += s.ui.list.param.body(data.loop);
                } else {
                    list += '<div class="gs-field" id="nodorder1"><legend class="gshead" style="cursor:pointer">No results</div></div>';
                }
                $('#' + table).html(list);
                $('#' + table + '_counter').text(counter);
            }, error: function (xhr, status, error) {
                console.log(data);console.log(error);console.log(xhr);console.log('error ' + status);
            }

        });
    },
//ORDER BY
    orderby: function (obj) {
        var exp = g.explode('_', obj.id);
        s.ui.reset('#' + exp[1]);
        var table= exp[1];
        var val= $('#order_'+table+'_value').val();
        var sort= $('#order_'+table+'_sort').val();
        var orderby= 'ORDER BY '+val+' '+sort;
        s.coo(table+'_order',orderby);
        this.param.order = orderby;
        this.get();
    },
//SELECT BY
selectby: function (obj) {
    var exp = g.explode('_', obj.id);
    s.ui.reset('#' + exp[0]);
    s.coo(exp[0]+'_select',obj.value);
    this.param.select = obj.value;
    s.coo(exp[0]+'_page',1);
    this.get();
},
//DATE SELECTION
    dateselection: function (obj) {
        var exp = g.explode('_', obj.id);
        s.ui.reset('#' + exp[0]);
        s.coo(obj.id,obj.value);
        s.coo(exp[0]+'_page',1);
        this.param[exp[1]] = obj.value;
        this.get();
    },
//list search
    search: function (obj) {
        var exp = g.explode('_', obj.id);
        s.coo(obj.id, obj.value);
        // cookieSet('userlist_page',1)
        s.ui.reset('#' + exp[0]);
        s.coo(exp[0]+'_page',1);
        this.param.search = obj.value
        this.get();
    },
    reset: function (obj) {
        var exp = g.explode('_', obj.id);
       var ids= ['from','to','order','search','select','order'];
       for(var i in ids){
           s.coodel(exp[0]+'_'+ids[i]);
           $('#'+exp[0]+'_'+ids[i]).val('');
       }
        s.coo(exp[0]+'_page',1);
        s.ui.reset('#' + exp[0]);
        this.get();
    },
    events: function() {
        $(document)
            .on("click", "legend[id^='gshead']", function () {
                var id = this.id.replace('gshead', '');
                s.ui.switcher('#gsbody' + id, 'slide', 'inline-block');
            })
    }
}