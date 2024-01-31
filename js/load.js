'use strict';
/***********WEBSOCKET*****************/
if(!my){var my={}}
if(my.hasOwnProperty('uid')){
var ws=new WebSocket('wss://dev.speedemployer.gr:3003/'+my.uid);
ws.onopen = function(e) {soc.open(e);}
ws.onmessage = function(e) {soc.get(e);}
ws.onerror = function(e) {s.notify("error",`${e.message}`);}
ws.onclose = function(e){soc.close(e)}
}
//coo('mob',$(window).width() < 1040 ? 1:0);
//G.mobile=$(window).width() < 1040 ? 1:0;
//********************indexedb********************/
const indb=function(table,val){
if (!window.indexedDB && !window.mozIndexedDB && !window.webkitIndexedDB && !window.msIndexedDB) {
    console.log(`Your browser doesn't support IndexedDB`);    
}else{
const request = indexedDB.open('spd6',4);
request.onupgradeneeded = function(e) {
 var db = e.target.result;
  if (e.oldVersion < 1) {
    // create v1 schema
  }
  if (e.oldVersion < 2) {
    // upgrade v1 to v2 schema
  }
  if (e.oldVersion < 3) {
    // upgrade v2 to v3 schema
  }
  	let store = db.createObjectStore(table, {autoIncrement: true});
     // create an index on the email property
     //let index = store.createIndex('email', 'email', {unique: true});
};
request.onerror=(e)=>{
    console.error(`Database error: ${e.target.errorCode}`);
};
request.onsuccess=(e)=>{
     var db = e.target.result;
	 if(typeof val==="object"){iset(db,val)}else{iget(db,val);}
};
function iset(o,obj){
	var c;
	const n=o.transaction(table,"readwrite");
	for(var i in obj){
	c=n.objectStore(table).put(obj[i],i);
	}
	c.onsuccess=function(o){console.log(o)},c.onerror=function(o){console.log(o.target.errorCode)},n.oncomplete=function(){o.close()}
	}
function iget(t,o){
	const e=t.transaction(table,"readonly");
	let n=e.objectStore(table).get(o);
	n.onsuccess=(t=>{t.target.result?console.table(t.target.result):console.log(`The contact with ${o} not found`)}),
	n.onerror=(t=>{console.log(t.target.errorCode)}),e.oncomplete=function(){t.close()}
	}
}
}
	//EDIT PERSONAL INFORMATION
	var personal_info=G.proArray.column;
	var globs=['marital','military'];
	for(var info in personal_info){
	$('#'+personal_info[info]).bind("keyup change",function(){
	xget('?a=editInfo&b='+this.id+'&c='+this.value,d=>{
		if (this.id=='residency'){
		x('#read_'+this.id).html(G.countries[this.value])
		}else
		if (this.id=='relocate'){
		x('#read_'+this.id).text(G.relocate[this.value])
		}else
		if (globs.includes(this.id)){
		x('#read_'+this.id).html(G[this.id][this.value])
		}else{
		x('#read_'+this.id).html(this.value)
		}
		x('#'+this.id+'bx').removeClass('lowop');
	});
	})
	}
//****ws getActive****//
getActive();
//set version for cache 
if(!coo('ver')){api.mo.getOne('setting',{name:'this_version'},r=>{console.log(r.value);coo('ver',r.value)});}
//********************required old ArImportant********************/
if(['cv','post','loan','offer','prop'].includes(G.mode)){
	/*
	var required=document.getElementById('pro3b').querySelectorAll("[required]");
	for (let i = 0; i < required.length; i++) {
		//required[i] => getAttribute('type')=='text',textarea
		var attribute=required[i].getAttribute('type');
		console.log(required[i].getAttribute('type'));
		console.log(required[i].value.length);
		if(['text','number'].includes(attribute) && required[i].value.length == 0) { //text //number
			required[i].classList.add('required');
		}else if(required[i].getAttribute('type')=='text' && required[i].value.length == 0) { //check
		}
	}
	//if NodeList.length > 0 add class 'required'
	*/
}
//********************searchONLOAD********************/
if(G.uname=='home'){
	if(!!coo('anchor')){
		api.red.get("anchorhtml"+my.uid,d=>{			
			wrap(d);
			searun('counter');
			var off=parseInt($('#box'+coo('anchor')).offset().top);
			$(window).scrollTop(off).scrollLeft();	
			coo.del('anchor');
		//	x('#speedloaderCon').show();seaexe();
			})
		}
	}

//*****************CV DESIRED*****************/
    if((G.mode=='cv' || G.mode=='offer' || G.mode=='loan') && G.id!="") {
		var selState = '';
        $.get('/ajax.php',{a:'selectProvinces',b:G.id,c:G.mode},function (p) {
			console.log(p);
                var state_text = '<option value=0>State</option>';
                for (var i in G.states) {
                    selState = G.states[i] == p.states[0] ? 'selected="selected"' : '';
                    state_text += '<option value="' + G.states[i] + '" ' + selState + '>' + i + '</option>';
                }				
                var stathtml = '<select col="state" '+(!p.states[0] ? 'required':'')+' '+(G.flag=='disabled' && G.mode!='offer' ? "disabled":"")+' id="filter_state2">' + state_text + '</select>';
                $('#stateBox0').html(stathtml);
                var checked = '', province_text = '';
                var selected;
                for (var i in G.province) {
                    if (G.province[i].sid == p.states[0]) {
                        checked = in_array(G.province[i].id, p.provinces) ? 'checked' : '';
                        province_text += '<div class="subclassTotal2st"><div class="subclassCheck"><input col="province" type="checkbox" '+(![0,1].includes(G.cvallowedit) && G.mode!='offer' ? "disabled":"")+' value="' + i + '" id="province_' + G.province[i].id + '"  ' + checked + '></div>' + i+'</div>';
                    }
                }
                $('#provinceBox0').html(province_text);
        },'json');
		
//get provinces list
xget({a:'getProvinces',b:G.id,c:G.mode},function(data){
console.log('RUN getprovinces ajax');
var counter = 0;
var checked, province_text = '';
for (var i in data) {
for (var j in G.province) {
	if (G.province[j].id == data[i].province_id) {
		province_text += '<div id="locationLabel_' + G.province[j].id + '" class="addSelBoxstate"><button id="state2_'+G.province[j].sid+'" class="statesel">' + G.province[j].s +'</button>'+j+'</div>';
		counter += 1;
	}
}
}
x('#provincesList').append(province_text); x('#count_provincesList').text(data.length);
},"json");
    }	
//********************PAGEONLOAD********************/
/*ON LOAD SSE INTERVALS and VERY IMPORTANT LOADING WEBSOCKET CACHE*/
window.host=window.location.host;
var AJAXFOLDER = G.referer + host + '/ajax/';
window.iobj={};
window.SITE_URL = G.referer + window.location.host + '/';
window.SITE_ROOT = G.SITE_ROOT;
window.PVIEWS = G.PVIEWS;
window.AJAX = '/ajax.php';
window.PLUGINS = G.referer + host + '/plugins/';
window.IMAGES_PATH = G.referer + host + '/img/';
window.UPLOADS = G.referer + host + '/uploads/';
window.host= G.SERVERNAME;
window.pathExt = G.DOM_EXT;
window.country = G.LOC;
window.serverbase = G.SERVERBASE;
window.url = window.location.pathname;
window.lastget = window.location.pathname.substring(url.lastIndexOf('/')+1);
var SPAUTH = coo('SPAUTH');
var LANG = !coo('LANG') ? coo('LANG') : 'en';
var rcs={12:'gr',32:'us',34:'au'};
var LOC=!coo('rc') ? window.country : rcs[coo('rc')];
//var RC=L.rcop[LOC];
var RC=G.rcop[LOC];
var folderprov = SITE_URL + "local/prov" + LANG + LOC+"/";
if(!LANG){var LANG= coo('LANG');}
var atabs= [0,1,2,3,4];
my.uid=parseInt(coo('sid'));
my.suspended=my.expires < time();
if (my.grp == 1) {
	if (!!local('potentialCounter')) {
		x('#potentialCounter').html('<em class="c_Top cblue">' + local('potentialCounter') + '</em>');
	}
 }
if(G.uname=='inter'){
//streaming BROWSER COMPATIBILITY
var isSafari = navigator.userAgent.indexOf('Safari') > -1;
var isChrome = navigator.userAgent.indexOf('Chrome') > -1;
//var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode;   // At least IE6
var isEdge=/Edge\/\d./i.test(navigator.userAgent)
if ((isChrome)&&(isSafari)) {isSafari=false;}
	if((isIE || isSafari || isEdge)){
		// x('#incompatible').html(dic.ONLINE_INTERVIEW_INCOMPATIBLE_BROWSER);
		s.notify('danger',dic.ONLINE_INTERVIEW_INCOMPATIBLE_BROWSER)
}}
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
var ieversion=new Number(RegExp.$1);
if (ieversion<=7){notify('danger',dic.VERSION_NOT_COMPATIBLE_UPDATE_EXPLORER);}
}
//create MY (set) or update(get) if not exist 
if(!!coo('sid')){
api.red.get('my'+my.uid,d=>{if(d=="NO"){
	api.ma.getOne("* FROM ur where uid=?",[my.uid],me=>{
	c('table',me);
	api.ma.my("set",me,[],mamy=>{
		if(mamy=="NO"){c('warn',"my cache NOT created "+me.uid);}else{c('warn',"my cache created ")}
	});
	
	})
}})
api.red.get('N'+my.uid,d=>{if(d=="NO"){
	api.ma.N("set",my.uid,[],mamy=>{
		if(mamy=="NO"){c('warn',"my cache NOT created "+my.uid);}else{c('warn',"my cache created ")}
	});
}})
//update my if mye exist 
}
//nbar 
if(!!coo('sid')){
bufAsync('2+',PVIEWS+'afer');
if(G.ui==1){
	bufAsync('2-',PVIEWS+'nbar2').then(()=>loadN());
	}else{
		loadN();
	}
}
/***********WRAPPER 1 - ruled COMPOS*****************/
if (!!coo('sid') && ['prop','offer','loan'].includes(G.uname)){	
	bufAsync(1,PVIEWS+G.uname,[G.mode]).then(d=>{iopanel()}).catch(err=>{console.log(err)});	
	pcat();
}
if(G.mode=='manager'){
	iopanel();
}
if(G.mode=='offer' && G.URL_PAGE=='user' && !!G.id){
	pcat();
}
if(!!coo('sid') && ['eoi','cont'].includes(G.uname)){
if(!['deleted','received','sent'].includes(G.mode)){
bufAsync(1,PVIEWS+ucfirst(G.uname),[G.mode,G.cid]).then(d=>{ipanel();window["appendsub"+G.uname]()}).catch(err=>{console.log(err)});	
}else{
bufAsync(1,PVIEWS+ucfirst(G.uname),[G.mode,G.cid])	
}
}
//criteria bar
if(!!coo('sid') && G.uname=="home"){critbar();}
//upgrade forms
if(['upgrade','register'].includes(G.mode) || G.uname=="register"){upgrade();}
//activity loop
if(!!coo('sid') && ['prop','offer','loan'].includes(G.uname)){actloop()}
//chat loop 
if(!!coo('sid') && G.mode=='chat'){chat.loop(G.uimode[coo('mesmode')])}
if(['_offer','_loan','_prop'].includes(G.mode)){
	var uid=$('#uid').val();if(!!uid){buf(2,PVIEWS+'post/'+G.mode.replace('_','')+'list',[uid])};
}
//if(G.is.wall_exist=='1' && !G.mobile){prologin()}
/*settings
api.mo.get('setting',{},d=>{
	var sett={}
	for(var i in d){sett[d[i].name]=d[i].value;}	
	api.red.set("is_"+LOC,JSON.stringify(sett))
})
*/
/*
api.mo.get('compo',{},d=>{		 
	for(var i in d){
		c('warn',d[i])
	 if(d[i].status==1){
		if(eval(d[i].rule)){
			eval(d[i].run);c('warn',"@"+d[i].help+" success!")}else{c('warn',"@"+d[i].help+" restricted")
			}
		//if(d[i].after!='undefined'){eval(d[i].after)}
	}}		
})
*/
/***********SUBS*************/
/*
var sub_range = ses('s_range_subclassif') != false ? ses('s_range_subclassif') : ses('s_subclassif');
if(ses('s_subclassif')!=false && _('#submitCriteria2')!=null){_('#submitCriteria22').className='but18';}
if (sub_range != false) {
	set_classification_form2(sub_range);
	set_classification_form22(sub_range);
} else {
	set_classification_formb();
	set_classification_formb2();
}
set_subclassification_form2(sub_range);
set_subclassification_form22(sub_range);
*/
/***********POTENTIAL*************/

var pfilters= ['potential_unblocked','potential_blocked','potential_certifiedOnly','potential_unblocked2','potential_agents','potential_allblocked'];
if (G.uname != 'potential') {
	for (var p in pfilters) {
		coo.del(pfilters[p]);
	}
} else {
	coo.del('potential_province');
}
if(G.uname=='potential' && G.id != '') {
	potloop(G.id);
	ses('potential_cv', G.id);
	if (G.uname != 'potential') {
		coo.del('potential_blocked');
		coo.del('potential_page');
	}
}
if (G.uname=='home' && G.mode!="asearch" && my.grp==1) {
		potlist('save');
	}
			for (var i in pfilters) {
			$("#" + pfilters[i]).click(function () {
				select_button(this);
			})
		}
/***********STORE*************/    
//if(G.mode!='services' && my.suspended){
//	location.href=SITE_URL+'u/'+my.name+'/services?page=3';
//}
//cache services
//api.red.get('formservices',(red)=>{
	//if(red=='NO'){
	//api.mo.get('services',(d)=>{
			//c('warn',d)
	//api.red.set('formservices',d);
	//});	
//}
//})
//all forms of locals 
    if (typeof my != 'undefined') {
        var hash_target = window.location.hash.split('#')[1];

        if (G.uname != 'post') {
            activeMenu();
        }
        lockSearch();
            if (G.uname == 'post') {
          //      openSendEOI();
            }
        //    visibleMemo();
        if (G.uname == 'post' || G.uname != '' || (G.mobile && typeof(G.uname) != 'uname')) {           
         //   postView();
        } else {
            //ipanel in profile,eoi,cont,interviews pages
        }
        /** SEARCH JS END**/
        // submitInterview();
    }
/************REL******************/
if (!!coo('sid') && ses('relq') != false && my.app==1) {
        x('#rel').val(ses('relq'));
        var rels= ses('relsub');
        rel(G.ui);
}
/************CHAT******************/
if(!!coo('chatline')){
var chatcoo=JSON.parse(coo('chatline'));
if(!!chatcoo){	
for (let cm in chatcoo){
	for (let ch in chatcoo[cm]){
api.mo.getOne('chat'+cm,{cid: parseInt(chatcoo[cm][ch])},function(data){
	chat.start(data,cm);})
}
}   
}
}
/*
api.compo('chat1',{type:"ma",col:"getOne",q:"contact.uid1,contact.uid2,ur.firstname,ur.lastname,ur.img from contact join ur on contact.uid"+grp+"=ur.uid where contact.id="+chatline+"",line:chatline},function(data){
//το υπόλοιπο data?
data.data.cid=chatline;	
chat.start(data.data); //takes data and writes loops 
x('#chatCon').html(data.html) //gives compo from API	
});
}
*/
/*
var allEvents = ['focus','blur','mouseover','mousedown','mouseup','mousemove', 'click'];//list all 
παίρνω το event, id (ή class για πολλά) καταγράφω τον τύπο του, to σώζω στη mongo
φτιάχνω κατηγορίες πχ σε λούπες τα buttons έχουν id_[id]_[]
εν αρχή φτιάχνω αυτά που δεν ομαδοποιούνται 
βάζω το 
$(document).on("click",  "#loanappact", function () {				
		var id=this.id.replace('loanappact','');				
		var call={a:'loanappact',b:G.id,c:(this.id=="loanappact"?"":"reactivateloanapp")}
        $.get('/ajax/profile.ajax.php',call,function(data){
		if(data=='OK'){location.reload()}
		})
	})
ask the js code as a string and saves to mongo 	
trim all \n
το πρώτο που έχω να κάνω είναι να καταγράφω μόνο τα events 
έτσι θα έχω ένα index 
var spdEvents = ['click','keyup','change'];
	function masterHandler(){
		var event = event || window.event;        
		var id=event.target.getAttribute("id");
		var type=event.type;
		console.table({id,type,type})
		
		//api.mo.ins('compo',obj);
	}	
    function bindAllEvents(selector, handler) {
		var elements = document.querySelectorAll(selector);		
		for(var i=0;i<elements.length;i++){
			for (var key in spdEvents){				
				elements[i].addEventListener(spdEvents[key], handler, false);				
			}
		}
    }	
//	bindAllEvents('*', masterHandler);
	
	/*
	    $('#prioritizeOff,#prioritize').click(function () {
        if(this.id=='prioritize') {
            $.get('/ajax/login.ajax.php', {a: this.id}, function (data) {
                if (data == 'OK') {
                    coo('prioritize', 0);
                    $('#'+this.id).hide();
                    s.modal(dic.PRIORITY_ACTIVATED);
                } else {
                    s.modal(dic.PRIORITY_CANNOT_ACTIVATED);
                }
            })
        }else{
            s.modal(dic.PRIORITY_MESSAGE +'<a style="color:red" onclick="open_service()">'+dic.CLICK_HERE+'</a>' );
        }
    })	
	*/
	
//SSE AND INTERVALS
if(my.app>2){				
		//online_inter_offerprop();
//	setInterval(online_inter_offerprop, 7000);
        }
//**********TIMEZONE*************/
//if(!coo('tz')){	
	//var tz= Intl.DateTimeFormat().resolvedOptions().timeZone;
	//$.get('/ajax/init.ajax.php',{a:'timezone',b:tz},function(res){
	//if(res.diff!="0"){s.notify("success",res.message);coo('tzdiff',res.diff);
	//}else{coo.del('tzdiff');}		
	//},'JSON') 
//}
var eoicookies= ['sort_eoi','sort_eoi_accepted','sort_eoi_favorite'];
var contacookies= ['joboffer','sort_contact','cid','cid_accepted','cid_network','cid_favorite'];
var intercookies= ['i_button','i_status','i_type','i_contact','i_post','i_order','i_button'];
if(G.uname!='eoi'){for(var i in eoicookies){coo.del(eoicookies[i]);}}
if(G.uname!='cont'){for(var i in contacookies){coo.del(contacookies[i]);}}
if(G.uname!='inter'){for(var i in intercookies){ses.del(intercookies[i]);}}
//************PROPOFFERLOAN******************//
//const line = my.app==9 ? 'propchatline':(in_array(my.app,[1,2]) ? '':'offerchatline');
//if(['prop','offer','loan'].includes(G.uname)){
//	buf('1',G.uname,G.mode);
//}
//var pt = G.mode=='manager' ? 'afer' :(my.app==10 ? 'loan' :(my.app==9 ? 'prop':(in_array(my.app,[1,2]) ? '':'offer'))); //post table
//if((G.uname ==G.pt && G.mode!=G.pt+'cont') || G.mode=="manager") {
//iopanel();
//setInterval(s.iopanel, 7000);
//pcat();
//}
//************AGENT********************//
if(G.uname=='home' && my.grp==2 && [1,2].includes(G.app)) {
		if(['manage'].includes(G.apt)){manage();}
		if(['manager'].includes(G.apt)){manager();}
		if(G.mode=='requests' || G.mode=='requestser'){affloop();}
}
//AGENTBAR
if((my.grp==1 && !!coo('affiliate')) || !!coo('su_uid')){
buf('2-',PVIEWS+'agentbar')
}
//************EOI CONTACT*****************//
if(['eoi','cont'].includes(G.uname)){
appendsubeoi();
//sort 1
var smode=G.mode!='' ? '_'+G.mode :'';
var sort_eoi='sort_eoi'+smode;
var sort_eoi_cookie=coo(sort_eoi);
//SET BLOCKED
if(my.grp==1 && G.mode=='sent'){
var receivedeoifilter_counter=x('#receivedeoifilter_counter').val();
if (receivedeoifilter_counter > 0){
x('#receivedeoifilter').html(dic.BLOCKED+'<span class="inter_counter"><em class="c_Top cblue" style="background:red !important">'+receivedeoifilter_counter+'</em></span>')
}}
 //sort 2	 
 var sort_eoi_sub='sort_eoi'+smode+'_sub';
 var sort_eoi_sub_cookie= coo(sort_eoi_sub)
//set selected
if (sort_eoi_sub_cookie !=0 && sort_eoi_sub_cookie !=null){
  x('#'+sort_eoi_sub).val(sort_eoi_sub_cookie);
 } 
var pages= ['accepted','favorite','sent','received','deleted'];
var count_cards=x("div[id*='eoi_card']").length;
var cards_num= ses('cards_num');	
ses('cards_num',count_cards);
var smode=G.mode!='' ? '_'+G.mode :'';
//set sortings
//sort 1
//append loop
//COMPO	buf('1',ucfirst(G.uname),G.mode,'class');	
//TEMP appendsubcont()
//get business category
//$("span[class*='buscat_']").each(function(index){
  //  var exp=explode('_',this.className);
//  getBusinessCategory(this.innerHTML,'.buscat_'+exp[1])
//})
//set selected
if (sort_contact_sub_cookie !=0){
    x('#'+sort_contact_sub).val(sort_contact_sub_cookie);
}
 //close panel button 
 if (x("div[id^='contact_panel']").css('display')=='none'){
 x("div[id^='close_button']").attr('class','btnBoxBlueCloseCont2');
  }else{
 x("div[id^='close_button']").attr('class','btnBoxBlueCloseCont');
 } 
var pages= ['accepted','favorite','network','sent','received','deleted'];
	ses('cards_num',x("div[id*='contact_card']").length);
}
//*******************************CERTIFICATION**********************************//
if (G.mode == 'agent' && my.grp==1) {
if (x('#job_tab').val()=='1') {
    //AGENT SETTINGS JOB TABS    
        if (!coo('job_tab')) {
            var job_tab = $("button[id^='jobBtn']").prop('id').replace('jobBtn', '');
            coo('job_tab',job_tab);
        }
    }
}
//*******************************MESSAGE**********************************//
//selected menu
if (G.uname=='mes'){ 
    var read_pages=['sent','favorite','inbox','deleted','all'];    
	if(['offer','prop','loan'].includes(coo('mesmode'))){
		chat.loop(G.uimode[coo('mesmode')]);
		}else{
			var mesmode=!!coo('mesmode') ? coo('mesmode') :'all';
	if (read_pages.includes(mesmode)){
		mesloop(0,coo('mesmode')).then(
	id=>	{if(!!coo('mesuid')){meshisloop('',parseInt(coo('mesuid')));}else{meshisloop(id)}}
	);
	}				
		}
	//if(coo('mesuid')!=false && previous_page()=='mes'){coo.del('mesuid');}
}
//*******************************IPANEL**********************************//
var acceptable=[0,1,2,3],favoritable=[4,5],closd=[9,10,11];
//*******************************INTERVIEW**********************************//
   //NEW INSERTS
   if(G.uname=='inter'){
    //new button selects    
    var newInters=0;
    ses('read_inters',0);
    var read_inters=ses('read_inters');
  //SORTINGS/SELECTS AND PARAMETERS
    //ONLOAD
    if (ses('i_status') ==false){
        x('#select_status').val(20);
        ses('i_status',20);
    }
    // var buttonArrayRev= {8:itoday,8:iconfirmed,5:irequested,6:iaskreschedule,7:irescheduled,10:icancelled2,8:iupdaterecords,21:history}
    //active buttons
  //  if(in_array(ses('i_status'),[5,7,8,10])){
        //x('#'+ses('i_button')).attr('class','sortButtonInterActive');
        var mode= G.mode!='' ? G.mode :'irequested';
        x('#'+mode).attr('class','sortButtonInterActive');
   // }
    //READ THE LOOP WITH PARAMETERS
	var extra= {22:dic.ALL_INTERVIEW_STATUS,20:dic.ACTIVE_INTERVIEWS,21:dic.HISTORY,23:dic.ALL}
    interloop(mode);
    //set the selected to dropdowns
    x('#select_status').val(ses('i_status'))
    x('#select_type').val(ses('i_type'))
    x('#selInter').val(ses('i_order'))
    x('#i_contact').val(ses('i_contact'))
   }
//**********************PROFILE ********************//
if(G.URL_PAGE=="user"){
	//cvallowedit();
	//load profile.js
	//REMOVE VIEWABLE UPON REQUEST
if(G.whoami=='localineditview'){
	if(x("span[id^='photo_']").length ==0 && my.grp==2){
		x('#profile4').append('<span class="phMes">'+dic.VIEWABLE_UPON+'</span>');
	}
}
if(G.mode!='new'){
//TEMP locationPost();
	}
// profile.donwload();
//TEMP eoiForm({0:{id:G.id}});
//check if business category and location entered
if(my.grp==2) {
	if (my.buscat == 0 && my.province==0){
		s.notify('danger', dic.ENTER_LOCATION_BUSINESS_CATEGORY)
	}else if (my.province==0 && my.buscat==199){
		s.notify('danger', dic.ENTER_LOCATION)
	}
}
//ON NEW AD/PROFILE
//temp if (G.mode=='newad' || G.mode=='newnotice'){location_form3();}else {asyncdata();}
if(G.mode=='offer'){var status=x('#status').val();
if(status==1){
//x('input[name=offertype]:checked').val() !=NULL
//x('input[name=offerprod]:checked').val() !=NULL
 //x('#filter_city1').val() !=0 
 //x('#offertag').val().trim().length > 6
//    			
//var pointer1= {title:'positionBox',post_type:'jobtypeBox',subclassification:'subBox','pspec[]':'specificBox',city:'locationBox',net_reason:'jobtypeBoxP2'};
var offerpointers= ['prodBox','locBox','descBox','typeBox','comBox','titleBox','imgBox','pcatbox2'];
var desc = x("#offerdescriptionForm").serializeArray();		
var sum= desc[2].value;
var sumlength= sum.split(' ').length;        
for(var i in offerpointers){
	if(
	(offerpointers[i]=='typeBox' && !$('input[name=offertype]:checked').val()) ||
	(offerpointers[i]=='prodBox' && !$('input[name=offerprod]:checked').val()) ||
	(offerpointers[i]=='locBox' && $('#filter_city1').val()==0) ||
	(offerpointers[i]=='titleBox' && $('#offertitle').val()=="myheadline") ||
	(offerpointers[i]=='descBox' && sumlength < 5) ||
	(offerpointers[i]=='pcatbox2' && $('input[name=pcat3id]:checked').length==0) ||
	(offerpointers[i]=='imgBox' && $("#imgval").val()==0)	||		
	(offerpointers[i]=='comBox' && ($('#offerurl').val().length==0 && $('#offermail').val().length==0 && $('#offertel').val().length==0))			
	){
	$('#' + offerpointers[i]).addClass('required');
	}
	//$('#' + pointer1[this.className]).addClass('arImportant');		
}
// $(document).on("click", ".post_type, .subclassification", function () {
 //   $('#' + pointer1[this.className]).removeClass('arImportant');
//})
}
}else if(G.mode=='prop'){
var status=x('#status').val();
if(status==1){
	var propointers= ['prodBox','locBox','descBox','typeBox','comBox','titleBox','imgBox','priceBox'];
	var desc = x("#propdescriptionForm").serializeArray();		
	var sum= desc[2].value;
	var sumlength= sum.split(' ').length;  
		for(var i in propointers){
			if(
		(propointers[i]=='typeBox' && !$('input[name=proptype]:checked').val()) ||			
		(propointers[i]=='prodBox' && !$('input[name=prod]:checked').val()) ||			
		//(propointers[i]=='locBox' && $('#locationLabel_'+G.id).text().trim()=="") ||
		(propointers[i]=='locBox' && $('#lat').val()=="0.000000") ||
		(propointers[i]=='titleBox' && $('#proptitle').val()=="myheadline") ||
		(propointers[i]=='descBox' && sumlength < 5) ||
		(propointers[i]=='imgBox' && $("#imgval").val()==0)	||		
		(propointers[i]=='priceBox' && $("input[name='price']").val()=="0")	||		
		(propointers[i]=='comBox' && ($('#propurl').val().length==0 && $('#propmail').val().length==0 && $('#proptel').val().length==0))			
		){
		$('#' + propointers[i]).addClass('required');
		}
		}
}
}
if(G.mode=='membership'){
var shtml=''
api.mo.getOne("sessions",{uid:my.uid},res=>{	
	var ses=res.sessions;
	for(var i in ses){		
		shtml+='<li id="list'+ses[i]+'">' +
			'<img src="/img/browsers/'+res[ses[i]].system+'.png"/>'+
			'<img title="'+res[ses[i]].browser+'" src="/img/browsers/'+res[ses[i]].browser+'.png"/>'+
			'<span>IP: '+res[ses[i]].ip+'</span>'+
			'<span style="float:right">'+date('Y-m-d H:i',res[ses[i]].created)+'</span>'+
			'<span style="color:red">'+(!res[ses[i]].location ? '':'- Address: '+res[ses[i]].location)+"</span>"+
			(ses[i]==coo('sp') ? "<span class='openSesSl'>selected session</span>":"")+
			'<button style="float:right" id="delses'+ses[i]+'">X</button>'+
			"</li>";
	}
	x('#openSessions').html("<ul  style='list-style-type:none' class='openSes'>"+shtml+"</ul>");
})
}
//DEL PHOTO
var buscat= my.grp==2 ? x('#buscat').val() :'';
var defaultimg,defaultbgimg;
	if (my.grp==2){
	defaultimg=IMAGES_PATH+"icons_profile/"+G.business_pimages[btype_from_buscat(my.buscat)];
	defaultbgimg=IMAGES_PATH+"background_profile/"+G.business_pimages[btype_from_buscat(my.buscat)];
	} else {
	defaultimg=IMAGES_PATH+"icons_profile/general.jpg";
	defaultbgimg=IMAGES_PATH+"background_profile/general.jpg";
	}
 
/*
function potentialCompanies() {
	xget({a: 'potential', b: postid},d=>{
		if (d != 'NO') {
			var pc = '';
			for (var i in d) {
				pc += '<li class="potential2"><a href="/potential?uname=' + G.uname + '&id=' + postid + '"><div class="potentialPhoto"><img width="100%" src="' + data[i].pimage + '"></div>' + (data[i].trade == null ? data[i].official : data[i].trade) + ' (' + data[i].count + ')</a></li>';
			}
			x('#potential').html('<ul class="potential">' + pc + '</ul>');
		} else {
			x('#potential').html('');
		}
	}, 'json');
}
*/
if(my.grp==1) {
    var pointer1={jobtype:'positionBox',statustype:'statusBox',subclassification:'subBox',bsi:'sizeBox',province:'locationBox','pspec[]':'specificBox',xexp_id:'industryBox'}
    $(document).on("click", "input[name='statustype'] , input[name='jobtype'], input[name='province'], input[name='bsi'], input[name='subclassification'], input[name='pspec[]'], input[name='xexp_id']", function () {
        $('#' + pointer1[this.name]).removeClass('required');
    })
}else{
    var pointer1= {title:'positionBox',post_type:'jobtypeBox',subclassification:'subBox','pspec[]':'specificBox',city:'locationBox',net_reason:'jobtypeBoxP2'};
    $(document).on("click", ".post_type, .subclassification", function () {
        x('#' + pointer1[this.className]).removeClass('required');
    })
    .on("click", "input[name='pspec[]']", function () {
        x('#' + pointer1[this.name]).removeClass('required');
    })
    .on("keyup", "#title", function () {
        if($("#title").val().length > 0){
        	x('#positionBox').removeClass('required');
        }else{
            x('#positionBox').addClass('required');
		}
    })
    .on("change", "select[name='city'],select[name='net_reason']", function () {
        x('#' + pointer1[this.name]).removeClass('required');
    })
}
if(x('#sendeoi').val()==1 && x('#poststatus').val()==2 && x('#eoistatus').val()==0){
	x('#cv-message').append('<span class="cvIntroMessage">'+dic.TO_VIEW_CV+'</span>');
}
//from spd.gr
/*  CLASSIFICATION 		profile.js	*/
// s.clas.profile = function() {
if (G.mode == 'newad' || G.mode == 'newnotice') {
//	set_classification_form();
//	professions_form('', '');
}
} //END PROFILE 
/*
* DEACTIVATE EDIT IN PROFILE
* */
//if non certified cv allow edit
//case not certified cv among certified
//fixes to version 5 - vars not exist:  my.acv isaffiliate (to my.agent > 0 )  my.iscertified_all
// var cv_allow_edit = function (cvid) {
//     var allow = false;
//     for (var i in my.acv) {
//         if (my.acv[i].cert_id == 0 && my.acv[i].id == cvid) {
//             allow = true;
//             break;
//         }
//     }
//     return allow;
// }
//**********PROLOGIN***********/	
//COMPO if(G.wall_exist=='1' && !G.mobile) {
 //check_prologin();
//}
//first load for guest user
//uid:false,grp:false !!coo('sid')=false
//********************REGISTER*********************//
if(G.uname=="register"){
	set_captcha();	
	coo.del('orderid');
    coo.del('SPAFFAUTH')
    coo.del('SPPASSCHECK')
    coo.del('checkout')
	
	$(document).on("keypress","#username, #mail, #fullname, #company_name",function(e) {	
        var notallowed=[32,42,44,46,60,61,63];
        if (notallowed.indexOf(e.which) > -1) {
            x('#messageBoard').html("/.,\*="+dic.NOT_ALLOWED_CHARACTERS);
        }	
	})
}
//********************LOGIN/REGISTER*********************//
//clean cookies except ['prlgn','LANG','orderid'];

//coo.del(['hotleads','SPPASSCHECK','SPREGID','SPREGRP','SPAUTH','SPMSHIP','SPPASSCHECK']);
//ses.del('s_spec');ses.del('s_range_subclassif');ses.del('so');

//TEMP coo.delAll(['prlgn','LANG','llset'])	
//console.log(G.action)
if(G.action=='authentication' && G.code !='' && G.auth !=''){authenticate();}
//PREVIOUS LOGINS 
if(!coo('sid') && !!local('ll')){recentlogins();}
if(!coo('sid') && !!coo('authorid')){
	//var mode=coo('llset')==$('#username').val() ? 3 : 1;	
	//login(mode,coo('authorid'));	
	loginauthors(coo('llset'));
}
//authenticate login G.auth is the sessid that user entered on his login session
// if (G.action=='auth_login' && G.auth !='' && G.id!=''){
if(G.auth!='' && G.id!='') {loginauthenticated();}
//**********************INTERVALS********************/
 /*
//as login as sse.php 		
if(typeof(EventSource)!=="undefined") {	
//#1
if (G.uname == 'home' && coo('affiliate_grp') != null) {
  var acounters=new EventSource(SITE_URL+"sse.php?a=acounters");
  acounters.onmessage=function(event) {
	var mes=JSON.parse(event.data);
      for (var i in data) {
       var counter = data[i] != null ? data[i] : 0;
        $('#' + i).text(counter);
		}		
}
}
//#3	/** ONLINE INTERVIEW STATUS BAR * 
if (!!coo('sid')) {
if(in_array(my.app,[1,2]) && G.mode != 'stream'){
        online_inter();
	//	s.interval.push('online_inter');
	 var onlineinter=new EventSource(SITE_URL+"sse.php?a=online_inter");
  onlineinter.onmessage=function(event) {
	var data=JSON.parse(event.data);
			console.log(data)
}
}
}
//#5
/*
function getActive() {
    var users =[];
    $("div[class^='userid_']").each(function (index) {
        var uid = this.className.indexOf(' ') >= 0 ? explode(' ', this.className)[0].replace('userid_', '') : this.className.replace('userid_', '');
   //     log(uid)
        users.push(uid);
    });
    // log('users')
    // log(users)
    $.get('/ajax/profile.ajax.php', {a: 'isActive', b: users}, function (data) {
        log(data);
        for(var i in data) {
            if (data[i] == 'on') {
                $("div[class^='userid_" + i + "']").removeClass('user_offline2b').addClass('user_online2b');
                // $("div[id*='userid_"+uid+"']").removeClass('user_offline2b').addClass('user_online2b');
            } else {
                $("div[class^='userid_" + i + "']").removeClass('user_online2b').addClass('user_offline2b');
            }
        }
    },'json');
}
   var users =[];
    $("div[class^='userid_']").each(function (index) {
        var uid = this.className.indexOf(' ') >= 0 ? explode(' ', this.className)[0].replace('userid_', '') : this.className.replace('userid_', '');
        users.push(uid);
    });
var isActive=new EventSource(SITE_URL+"sse.php?a=isActive");
isActive.onmessage=function(event) {
	var data=JSON.parse(event.data);
			console.log("#4-isActive")	
			console.log(data)	
			  for(var i in data) {
            if (data[i] == 'on') {
                $("div[class^='userid_" + i + "']").removeClass('user_offline2b').addClass('user_online2b');
            } else {
                $("div[class^='userid_" + i + "']").removeClass('user_online2b').addClass('user_offline2b');
            }
        }
}
		
//#6		
/*
if (my.grp == 1) {
//taken_interval();
var take_interval=new EventSource(SITE_URL+"sse.php?a=take_interval");
take_interval.onmessage=function(event) {
	if (event.data == 'OK') {
		$('.c_home').html('<em class="c_Bottom cred">1</em>');
		// $('#proposal_received').html('<em class="mm-counterTop">1</em>');
		$('.srvcl').remove();
		$('#clientservice').html('<button id="proposal_received" class="proposal_received">' + dic.PROPOSAL_RECEIVED + '<span class="bub1"><em class="c_Top cred">1</em></span></button>');
	}
}
}
}else{
	console.log("EventSource is not active","red")
}*/
//***************************ΤΚΤ************************
if(G.uname=='support'){	
if (!coo('tktmode')){
	if(my.sustatus==2){var tktmod=1;}
	if(my.sustatus==3){var tktmod=2;}
	if(my.sustatus==4){var tktmod=3;}
	if(my.sustatus > 4){var tktmod=4;}
	coo('tktmode',tktmod);
}
if (G.id==="") {tktloop(); }	
	/** TOPIC PAGE**/
if (['board','closed','sent'].includes(G.mode) && G.id != '') {
//SET TOPIC PAGE DATA
tktget();
	//api.mo.count("tkt",{status:1,uid:my.uid},(count)=>{x('.c_support_sent').text(count);});
	//s.cors(CONF.apimongourl + "tkt",{a:"count",status:1,uid:my.uid}, function (count) {x('.c_support_sent').text(count);});        
	//s.cors(CONF.apimongourl + "tkt",{a:"count",uid:my.uid}, function (count) {x('.c_support_closed_all').text(count);})
	//api.mo.count("tkt",{uid:my.uid},(count)=>{x('.c_support_closed_all').text(count);})
// resutls loop
	if (G.code != ''){
			//update read1=1
		s.cors(CONF.apimongourl + "tkt",{limit:1,_id:G.code}, function (data) {
		x('.tktcreated').text(date('Y-m-d H:i',data.created));
			x('.tktclosed').text(data.closed!=0 ? date('Y-m-d H:i',data.closed): '');
			x('#request').html(data.request);
			x('#reply').html(data.reply);
			x('#topic').text(data.topic);
	//set as read if unread
	if(data.read1=="0"){
	//api.mo.up("tkt",{_id: G.code,uid:data.uid,status:0},{$set:{read1:1}})
		//s.cors(CONF.apimongourl + "tkt",{a: "UPDATE",WHERE: {_id: G.code,uid:data.uid, status:0},SET: {read1: 1}},function (data) {},"POST");        
	 // a: "UPDATE",WHERE: {_id: G.id,uid:uid},SET: {reply: reply,status:0,closed:s.phptimestamp(),closed_date:s.date('Y-m-d'),closed_month:s.date('Y-m'),duration:duration}
	} else {
		readLoop();
	}
//selected menu
	x('#' + G.uname).removeClass('messagesCategories').addClass('messagesCategoriesActiveS');
	//select al
	$('#selectAll1,#selectAll2').click(function (event) {  //on click
		if (this.checked) { // check select status
			$('.support').each(()=>{ //loop through each checkbox
				this.checked = true;  //select all checkboxes with class "checkbox1"
			});
		} else {
			$('.support').each(()=>{ //loop through each checkbox
				this.checked = false; //deselect all checkboxes with class "checkbox1"
			});
		}
		//select all
		var values = $('input:checkbox:checked.support').map(()=>{
			return this.value;
		}).get();
		//console.log(values);
	});
});
}
}
}

if(my.app==9 && G.uname=='home' && coo('sm')==1){	
var state=coo('sm_state');
var selState='',state_text='';
var state_text = '<option value="">State</option>';
for (var i in G.states) {
	selState = state==G.states[i] ? 'selected="selected"' : '';
	state_text += '<option value="' + G.states[i] + '" '+selState +'>' + i + '</option>';
}
var stathtml = '<select id="state">' + state_text + '</select>';			
	x('#sm_statep').html(stathtml);
	var province=coo('sm_province');
	var province_text= '<option value=0>'+dic.PROVINCE+'</option>';
	var selected;
	for(var i in G.provincebyid){
		if(G.provincebyid[i].sid==state) {
			selected = province == i  ? 'selected="selected"' : '';
			province_text += '<option value="' + i + '" ' + selected + '>' + G.provincebyid[i].p + '</option>';
		}
	}
	$('#sm_cityp').html('<select id="province">'+province_text+'</select>');	
	
	var city=coo('sm_city');      
        var selProv=this.value;
        coo('sm_province',selProv);        
       
	   $.getJSON(folderprov+province+'.json', function(data) {
        var city_text=city==0 ? '<option value=0>'+dic.CITY+'</option>':'';
        var selectedCity;
        for(var i in data){
            if(data[i].pid==coo('sm_province')){
                selectedCity= data[i].id==city ? ' selected="selected" ':'';
                city_text += '<option value="'+data[i].id+'" '+ selectedCity +'>' + i + '</option>';
            }
        }
        $("#city").remove();
        $('#sm_cityp').append('<select id="city">'+city_text+'</select>');
    });	   
			sm_go();
}

if(G.uname==my.name && G.mode=='prop'){
/* eslint-disable no-undef */
/**
 * autocomplete on map
 * https://github.com/tomik23/autocomplete
 *
 */
 var sintetagmenes=[parseFloat($('#lon').val()), parseFloat($('#lat').val())];
 var mapOptions = {
 center: sintetagmenes,
 zoom: 15
 } 
 // Creating a map object
 var map = new L.map('my-map', mapOptions);
  // Creating a Layer object
 var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  // Adding layer to the map
 map.addLayer(layer);
  // Creating a marker
var marker = L.marker(sintetagmenes);
// Adding marker to the map
marker.addTo(map);

// --------------------------------------------------------------
// create seearch button

// add "random" button
const buttonTemplate = `<div class="leaflet-search"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path></svg></div><div class="auto-search-wrapper max-height"><input type="text" id="marker" autocomplete="off"  aria-describedby="instruction" aria-label="Search ..." /><div id="instruction" class="hidden">When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.</div></div>`;

// create custom button
const customControl = L.Control.extend({
  // button position
  options: {
    position: "topleft",
    className: "leaflet-autocomplete",
  },

  // method
  onAdd: function () {
    return this._initialLayout();
  },

  _initialLayout: function () {
    // create button
    const container = L.DomUtil.create(
      "div",
      "leaflet-bar " + this.options.className
    );

    L.DomEvent.disableClickPropagation(container);

    container.innerHTML = buttonTemplate;

    return container;
  },
});

// adding new button to map controll
map.addControl(new customControl());

// --------------------------------------------------------------

// input element
const root = document.getElementById("marker");

function addClassToParent() {
  const searchBtn = document.querySelector(".leaflet-search");
  searchBtn.addEventListener("click", (e) => {
    // toggle class
    e.target
      .closest(".leaflet-autocomplete")
      .classList.toggle("active-autocomplete");

    // add placeholder
    root.placeholder = "Search ...";

    // focus on input
    root.focus();

    // click on clear button
    clickOnClearButton();
  });
}

// function click on clear button
function clickOnClearButton() {
  document.querySelector(".auto-clear").click();
}

addClassToParent();
// function clear input
map.on("click", () => {
  document
    .querySelector(".leaflet-autocomplete")
    .classList.remove("active-autocomplete");

  clickOnClearButton();
});

// autocomplete section
// more config find in https://github.com/tomik23/autocomplete
// --------------------------------------------------------------

new Autocomplete("address", {
  delay: 1000,
  selectFirst: true,
  howManyCharacters: 2,

  onSearch: function ({ currentValue }) {
	var q=encodeURI(currentValue);
    const api = 'https://nominatim.openstreetmap.org/search?format=geojson&limit=5&q='+q;

    /**
     * Promise
     */
    return new Promise(resolve => {
      fetch(api)
        .then(response => response.json())
        .then(data => {
          resolve(data.features);
		  console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    });
  },

  onResults: ({ currentValue, matches, template }) => {
    const regex = new RegExp(currentValue, "i");
    // checking if we have results if we don't
    // take data from the noResults method
    return matches === 0
      ? template
      : matches
          .map((element) => {
            return `
              <li role="option">
                <p>${element.properties.display_name.replace(
                  regex,
                  (str) => `<b>${str}</b>`
                )}</p>
              </li> `;
          })
          .join("");
  },

  onSubmit: ({ object }) => {
    const { display_name } = object.properties;
    const cord = object.geometry.coordinates;
    // custom id for marker
    // const customId = Math.random();
	  const selected=object.properties.display_name;
	  console.log(object.geometry.coordinates);
	$.get('/ajax.php',{a:'savemap',b:G.id, c:selected,lat:cord[0],lon:cord[1]})
    // remove last marker
    map.eachLayer(function (layer) {
      if (layer.options && layer.options.pane === "markerPane") {
        if (layer._icon.classList.contains("leaflet-marker-locate")) {
          map.removeLayer(layer);
        }
      }
    });

    // add marker
    const marker = L.marker([cord[1], cord[0]], {
      title: display_name,
    });

    // add marker to map
    marker.addTo(map).bindPopup(display_name);

    // set marker to coordinates
    map.setView([cord[1], cord[0]], 8);

    // add class to marker
    L.DomUtil.addClass(marker._icon, "leaflet-marker-locate");
  },

  // the method presents no results
  noResults: ({ currentValue, template }) =>
    template(`<li>No results found: "${currentValue}"</li>`),
});
}