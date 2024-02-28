'use strict';
/***********WEBSOCKET*****************/
if(!my){var my={}}
if(my.hasOwnProperty('uid')){
    var ws=new WebSocket('wss://'+location.origin+':3003/'+my.uid);
    ws.onopen = function(e) {soc.open(e);}
    ws.onmessage = function(e) {soc.get(e);}
    ws.onerror = function(e) {s.notify("error",`${e.message}`);}
    ws.onclose = function(e){soc.close(e)}
}
//set version for cache
//if(!s.coo('ver')){s.api.mo.getOne('glob',{name:'this_version'},r=>{console.log(r.value);s.coo('ver',r.value)});}
if(!s.coo('template')){s.coo('template',G.template)});}


/*updated:2020-02-11 13:00:45 init - v.0.73 - Author:Nikos Drosakis - License: GPL License*/
/*WEB WORKERS*/
//s.worker("/gaia/js/worker.js",{a:'worker',b:1},function(e){
//console.log(e.data);
//})

//permission for Notification API
//s.ui.notification.permission();

//keys clicked
// function printKeys() {
//     if (18 in keys) {  //alt is pressed
//         //alt+l
//         if (76 in keys) {
//             $("#logout").click();
//         }
//         //alt+p
//         if (80 in keys) {
//             location.href='/'+SPNAME;
//         }
//         //alt+h
//         if (72 in keys) {
//             location.href='/home';
//         }
//         //alt+a
//         if (65 in keys) {
//             $.get('/ajax/login.ajax.php', {
//                 a: 'dash',
//                 b: GLOBAL.my.dash.name,
//                 c: GLOBAL.my.dash.pass,
//                 d: SPID
//             }, function (data) {
//                 log(data)
//                 if (data != 'no') {
//                     location.href = '/admin/dash.php';
//                 } else {
//                     s.modal(dic.USERNAME_PASSWORD_NOT_CORRECT)
//                 }
//             })
//             // location.href = '/admin/dash.php';
//         }
//         //alt+m
//         if (77 in keys) {
//             var clearurl = location.href.split('//')[1];
//             if(clearurl.split('.')[0]=='m'){
//                 location.href= location.href.split('//')[0]+'//'+clearurl.split('.')[1]+'.'+clearurl.split('.')[2];
//             }else{
//                 location.href= location.href.split('//')[0]+'//m.'+clearurl;
//             }
//         }
//         //alt+ u
//         if(85 in keys){
//             change_lang('en');
//         }
//         //alt+ g
//         if(71 in keys){
//             change_lang('el');
//         }
//     }
// }
//
// $(document)
//     .keydown(function (e) {
//         keys[e.which] = true;
//         printKeys();
//     })
//     .keyup(function (e) {
//         delete keys[e.which];
//         printKeys();
//     });
$.get(s.ajaxfile,{a:'empty'},d=>{
    console.log(d);
},'JSON')

$(document).keypress(function(e) {
    if(e.which == 13) {
        console.log('pressed '+e.which)
        $('.key'+e.which).click();
    }
})
$(document).on('click',"#modalclose",function(){s.modalclose()})
//DOCUMENT READY
$(document).ready(function () {

    //BOOTSTRAP TOOLTIPS activate
  //  $('[data-toggle="tooltip"]').tooltip();

    /*activate editor*/
    // if(s.get.page=='dsh') {
    //     $('.wysiwyg').summernote();
    // }

    /********************
     LOAD WIDGETS TO PAGE
     ********************/
    if(G!=null){
        var widareas = $(".wid").map(function () {
            return "#"+this.id;
        }).get();
        //console.log(widareas);
        if(widareas.length > 0){
            //if(G.pagetype=='post' || G.pagetype==''){
            var jsonfile=G.PAGESURI+G.pagetype+'.json';
            //	console.log(jsonfile);
            var page=G.page!='' ? G.page :'index';
            var criteria={a:'load_widgets',areas:JSON.stringify(widareas),jsonfile:jsonfile,page:page,pagetype:G.pagetype,mode:G.mode };
            console.log(criteria)
            $.post(s.ajaxfile,criteria,function(res){
                //	console.log(res)
                for(var i in res){
                    $(i).append(res[i]);
                }

                //run pvars get
                s.init.pvars_get();


            },"json");
        }

        //DASHBAR
        var usergrps = !G.usergrps
            ? {1: "user", 2: "subscriber", 3: "writer", 4: "editor", 5: "admin", 6: "manager", 7: "developer", 8: "CEO"}
            : G.usergrps;

        var GSID = s.coo("GSID");
        var GSIMG = s.coo("GSIMG");
        var GSGRP = s.coo("GSGRP");
        var GSNAME = s.coo("GSNAME");
        var loggedin = s.coo('GSID') != false && GSGRP > 2 ? true : false;
        $(document)
            .on('click', '.menuopener, #menu-opener2', function () {
                if($('#dashbar').css('display')=='none') {
                    $('#dashbar').show('fast');
                }else{
                    $('#dashbar').hide('fast');
                }
            })
// pagevars
//         s.varpage.get();
//         s.varglobal.get();
        //   s.loadExt('mogal',function(){
        s.ui.viewer.img();
        //})

        // if (G.is == "1") {
        //       s.ui.aaa(event);
        //}
    }

// if(s.curdir!='dsh') {
//     s.apis.fb();
// }
})


/* MAN
var man = {
    cookie: 'Cookie storage object with get, set, expires, clear, delete properties.\n USAGE: \n s.coo("browser"),s.coo("newcookie","newcookievalue"),s.coodel("newcookie")',
    session: 'Session storage object with get, set, unset and clear properties.\n USAGE: \n s.session.get("session"),s.session.set("newsession","newsessionvalue"),s.session.delete("newsession")'
}
var gprop = Object.getOwnPropertyNames(g);
for (i in gprop) {
    if (typeof (g[gprop[i]]) != 'undefined') {
        g[gprop[i]]['man'] = 'This is the man of the s.' + gprop[i] + ' of gaia.js version ' + s.version + '.\n ' + man[gprop[i]];
        // console.log(g[gprop[i]]['man'])
    }
}*/