'use strict';
//async fetch("https://dev.speedemployer.gr/local/buscat_el.json").then(r=>r.json()).then(d=>{console.log(d)})			
//const node=x('#but_alertcontacts');if(node){node.onclick=great('adfsadf');}
//**********************LOCATION CHAIN ONLOAD/ONEVENT*****************/
function open_service(){x('#pb_home').show();opener2('scMenu');x('#pb_profile').hide()}
//location (only for) search form 
function lochain(data,id){	
	var parid=id;
	var par=document.getElementById(parid);
	if(par!=null){
	par.innerHTML='';
	var state=data[0],prov=data[1],city=data[2];
	var div1=document.createElement('div');div1.id="f_"+state;par.appendChild(div1);
	var div2=document.createElement('div');div2.id="f_"+prov;par.appendChild(div2);
	var div3=document.createElement('div');div3.id="f_"+city;par.appendChild(div3);	
	var cityval=s.ses("s_"+city),proval=s.ses("s_"+prov),stateval=s.ses("s_"+state),sel1='';
            var text1='<option value=0>'+dic.STATE+'</option>';
            for (var i in G.states){
                sel1=stateval==G.states[i] ? 'selected="selected"' : '';
                text1 +='<option value="'+G.states[i]+'" '+sel1 +'>'+i+'</option>';
            }
      x('#f_'+state).html('<select datatype="chain" onchange="seafilter(this)" id="s_'+state+'">'+text1+'</select>');
            var sel2,text2='<option value=0>'+dic.PROVINCE+'</option>';            
            for(var i in G.province){
                if(G.province[i].sid==stateval){
                    sel2=proval==G.province[i].id ? 'selected="selected"' : '';
                    text2 +='<option value="'+G.province[i].id+'" '+sel2+'>'+i+'</option>';
                }
            }
      x('#f_'+prov).html('<select datatype="chain" onchange="seafilter(this)" id="s_'+prov+'">'+text2+'</select>');
        var sel3,text3='<option value=0>'+dic.CITY+'</option>';        
        for(var i in G.location){
            if(G.location[i].pid==proval){
                sel3= G.location[i].id==cityval ? ' selected="selected" ':'';
                text3 +='<option value="'+G.location[i].id+'" '+ sel3 +'>'+i+'</option>';
            }
        }
       x('#f_'+city).html('<select datatype="chain" onchange="seafilter(this)" id="s_'+city+'">'+text3+'</select>');
	}
}
//classification (only for) search form 
function classifchain(data,id){	
	var parid=id;
	var par=document.getElementById(parid);
	if(par!=null){par.innerHTML='';
	var classif=data[0],subclassif=data[1],spec=data[2];
	var div1=document.createElement('div');div1.id="f_"+classif;par.appendChild(div1);
	var div2=document.createElement('div');div2.id="f_"+subclassif;par.appendChild(div2);
	var div3=document.createElement('div');div3.id="f_"+spec;par.appendChild(div3);	
	var specval=s.ses("s_"+spec),subclassifval=s.ses("s_"+subclassif),classifval=s.ses("s_"+classif);
            var sel1='',text1='<option value=0>'+dic.CLASSIFICATION+'</option>';
            for (var i in G.classif){
                sel1=classifval==G.classif[i] ? 'selected="selected"' : '';
                text1 +='<option value="'+G.classif[i]+'" '+sel1 +'>'+i+'</option>';
            }
		x('#f_'+classif).html('<select datatype="chain" onchange="seafilter(this)" id="s_'+classif+'">'+text1+'</select>');
            var sel2,text2='<option value=0>'+dic.SUBCLASSIFICATION+'</option>';            
            for(var i in G.subclassif){
                if(G.subclassif[i].clid==classifval){
                    sel2=subclassifval==G.subclassif[i].id ? 'selected="selected"' : '';
                    text2 +='<option value="'+G.subclassif[i].id+'" '+sel2+'>'+i+'</option>';
                }
            }
            x('#f_'+subclassif).html('<select datatype="chain" onchange="seafilter(this)" id="s_'+subclassif+'">'+text2+'</select>');
        var sel3,text3='<option value=0>'+dic.SPECIFIC_JOBS+'</option>';        
        for(var i in G.prof){
            if(G.prof[i].sid==subclassifval){
                sel3= G.prof[i].id==specval ? ' selected="selected" ':'';
                text3 +='<option value="'+G.prof[i].id+'" '+ sel3 +'>'+i+'</option>';
            }
        }
		 x('#f_'+spec).html('<select datatype="chain" onchange="seafilter(this)" id="s_'+spec+'">'+text3+'</select>');
}}
$(document).on("click",'input[name="display"]',function(){	    
if(this.value=='steve'){
	s.coodel('display');	
	$('#display').attr('href','/css/desk.css');
	$('#displaymob').attr('href','/css/deskmob.css');
}else{
	s.coo('display',this.value);	
	$('#display').attr('href','/css/'+this.value+'.css');	
	$('#displaymob').attr('href','/css/'+this.value+'mob.css');	
}
})
.on('click',"button[id^='addContact_']",function(){
		addcontact(this);
    })
.on("click",'#buttonEditLocation',function(){	    
toggledit('#readLocation','#editLocation');
var city=x('#setCity').val();
var state=x('#setState').val();
var province=x('#setProvince').val();
location_form_profile(city,province,state);
})
.on("change","#filter_province_profile",function(){
var prov=this.value;
x('#setProvince').val(prov);
var state=x('#setState').val();
location_form_profile(0,prov,state);
})
.on("change","#filter_state_profile",function(){
var state=this.value;
x('#setState').val(state);
x('#setProvince').val(0);
x('#setCity').val(0);
location_form_profile(0,0,state);
})
.on("click","#submitLocation",function(){
var city= x('#filter_city_profile').val()
var province= x('#filter_province_profile').val()
var state= x('#filter_state_profile').val();
if(my.grp==2 && (my.locationC >=3 || parseInt(s.coo('su_status')) >3)){ s.notify('warn',dic.REACH_MAX_LIMIT_LOCATION_CHANGE_CONTACT_ADMIN)}else {
	if (state!=0 && province!=0){		
		xget({a: 'updateCityProfile',b: my.uid,c: city,d: province,e: state},function(data){
			//write to locationLabel_
			if (data=='OK'){
			   // getLocation(city,"#readLocation");
			   api.ma.my('get',my,['user']);
				var citytext= city!="0" ? '-'+$('#filter_city_profile option:selected').text(): "";
				var provincetext='-'+$('#filter_province_profile option:selected').text();
				var statetext= $('#filter_state_profile option:selected').text();
				x('#readLoc').html(statetext+provincetext);
				x('#readCity').html(citytext);
				toggledit('#readLocation','#editLocation');				
			}
		});
	} else {
		s.notify('warn',dic.INSERT_STATE_PROVINCE);
	}
}
})
function taken_interval(){
	xget({a:'take_interval'},function (res) {
		if (res == 'OK') {
			$('.c_home').html('<em class="c_Bottom cred">1</em>');
			// $('#proposal_received').html('<em class="mm-counterTop">1</em>');
			$('.srvcl').remove();
			$('#clientservice').html('<button id="proposal_received" class="proposal_received">' + dic.PROPOSAL_RECEIVED + '<span class="bub1"><em class="c_Top cred">1</em></span></button>');
		}
	})
};
function location_form_profile(city,province,state){
var selProv='',state_text='',selState='',selectedCity='',province_text='',city_text='';
	state_text=state==="0" ? '<option value="">State</option>' : '';
	for (var i in G.states){
		selState=state==G.states[i] ? 'selected="selected"' : '';
		state_text +='<option value="'+G.states[i]+'" '+selState +'>'+i+'</option>';
	}
	var stathtml='<select id="filter_state_profile">'+state_text+'</select>';
	x('#stateBox').html(stathtml);
	province_text= province=="0" ? '<option value="">'+dic.PROVINCE+'</option>':'';
	for(var i in G.province){
		if(G.province[i].sid==state){
			selProv=province==G.province[i].id ? 'selected="selected"' : '';
			province_text +='<option value="'+G.province[i].id+'" '+selProv+'>'+i+'</option>';
		}
	}
	var provincehtml='<select id="filter_province_profile">'+province_text+'</select>';
	x('#provinceBox').html(provincehtml);

	city_text='<option value=0>'+dic.CITY+'</option>';
	var count=0;
	for(var i in G.location){
		if(G.location[i].pid==province){
			count +=1;
			selectedCity= G.location[i].id==city ? ' selected="selected" ':'';
			city_text +='<option value="'+G.location[i].id+'" '+ selectedCity +'>'+i+'</option>';
		}
	}	
	x('#cityBox').html('<select id="filter_city_profile">'+city_text+'</select>');
}
document.addEventListener('keydown',function(e){	
if (e.target.id.includes('chatinput')){
	if(e.key=='Enter'){	
var id=e.target.id.replace('chatinput','');x('#chatsend'+id).click()}
}else{
}
})
if(!s.coo('sid')){
var keysPressed={};
document.addEventListener('keydown',function(e){
keysPressed[e.key]=true;
if(keysPressed['Enter']){
	var aid=s.coo('authorid');
	if(!aid){login();}else if(!!aid){authorlogin(aid);}
	}//}else if (keysPressed['Alt'] && e.key=='r'){ s.reset();c('warn',"is reset");
})
document.addEventListener('keyup',(e)=>{delete keysPressed[e.key];});
}
//BUFFER
function buf(wrap,f,pms,arg,argpms){ //update to chunks //update to worker //+append -prepend
var wrap=String(wrap),
opt=wrap.indexOf('+')>-1 ?'append':(wrap.indexOf('-')>-1 ?'prepend':'html'),wrap=wrap.indexOf('+')>-1 || wrap.indexOf('-')>-1 ? wrap.substring(0,wrap.length-1):wrap,
arg=!arg ? '':arg,
argpms=!argpms ? '':JSON.stringify(argpms),pms=!pms ? '':JSON.stringify(pms),
params={a:'buffer',f:f,pms:pms,arg:arg,argpms:argpms};  
worker(params,function(e){	
$('#wrapper'+wrap)[opt](e.data);
},'GET','json');	
}
function bufAsync(wrap,f,pms,arg,argpms){ //update to chunks //update to worker //+append -prepend
//var cache="bf"+my.uid+f+G.uname+G.mode+G.page;
var wrap=String(wrap),
opt=wrap.indexOf('+')>-1 ?'append':(wrap.indexOf('-')>-1 ?'prepend':'html'),wrap=wrap.indexOf('+')>-1 || wrap.indexOf('-')>-1 ? wrap.substring(0,wrap.length-1):wrap,
arg=!arg ? '':arg,
argpms=!argpms ? '':JSON.stringify(argpms),pms=!pms ? '':JSON.stringify(pms),  
params={a:'buffer',f:f,pms:pms,arg:arg,argpms:argpms,page:G.page};
console.log(params)
return new Promise((resolve,reject) => {
	//api.red.get(cache,ca=>{
	//if(ca!='NO'){
	//$('#wrapper'+wrap)[opt](ca);resolve(ca);
	//c('warn','from cache:'+cache)
	//}else{
	worker(params,d=>{
	$('#wrapper'+wrap)[opt](d.data);
	//api.red.set(cache,d.data);
	resolve(d.data);},'GET','json');	
	//}
	//})	
	})		
}

function required_check(){
	console.log('required_check');
var noaccess='',
	arr1=$('.required').map(function(){return this.getAttribute('col');}).get(),
	arr2=$('input,textarea,select').filter('[required]:visible').map(function(){return this.getAttribute('col');}).get(),
	arr=arr1.concat(arr2);
	//exception for B4S
	console.log(!dic[G.schemalocal[G.mode][arr[i]]] ? dic[G.schemalocal[G.mode][arr[i]]]:G.schemalocal[G.mode][arr[i]]);
	console.log(arr.length)
	if(arr.length>0){
	for (var i in arr){		
		noaccess +='<li>'+(!!dic[G.schemalocal[G.mode][arr[i]]] ? dic[G.schemalocal[G.mode][arr[i]]]:G.schemalocal[G.mode][arr[i]])+'</li>';										
		}
	s.modal(dic.COMPLETE_ALL_FIELDS_ADVERTISEMENT+" <ol>"+noaccess+"</ol>");	
	}
}

function activatePost(id){
$.post("/ajax.php",{a:'activatePost2',b:id},function(data){	
api.ma.my('get',my,['affee','user'],d=>{
location.href='/u/'+my.name+'/'+(my.grp==1 ? 'cv' :'post');											 	
})	
});
}
function activate(id){
var title= x('#print_'+id).attr('title');
var type= my.grp==1 ? 'Employment Profile' : 'Advertisement';
var required_count=$('input,textarea,select').filter('[required]:visible').length+$('.required').length;
console.log(required_count);

if(my.grp==1){
//xget('?a=checkPostValues&b='+id,function(data){
	//if(data=='certrenew'){
		//s.notify('warn',dic.DUE);
	//}else 
//	if (data.ptype && data.cvstatus && data.title && data.subclass && data.certified && data.location && data.bsize && data.specific && data.industry && data.relevant && data.intro){
	//	activatePost(id);
//	} else {
		/*
		var p=[],
			arr=[data.ptype,data.cvstatus, data.subclass,data.certified,data.location,data.bsize,data.specific,data.industry,data.relevant,data.intro,data.title],
			noaccess='';
		p[0]=dic.JOB_TYPE2,p[1]=dic.STATUS,p[2]=dic.GENERAL_CLASSIFICATION,p[3]=dic.TO_ACTIVATE,p[4]=dic.WORK_LOCATION_PREFERENCE,p[5]=dic.BUSINESS_SIZE,p[6]=dic.SPECIFIC_JOBS,p[7]=dic.SUMMARY_EXPERIENCE1,p[8]=dic.WORK_EXPERIENCE_CLASSIFICATIONS2,p[9]=dic.INSERT_SUMMARY,p[10]=dic.TITLE;
		var pointer={0:"positionBox",1:"statusBox",2:"subBox",5:"sizeBox",4:"locationBox",6:"specificBox",7:"industryBox",8:"relevantBox",9:"introBox",10:"titleBox"};
		//set pointers
		for (var i in arr){
			if (!arr[i]){
				noaccess +='<li>'+p[i]+'</li>';						
				x("#"+pointer[i]).addClass('required');
			}
		}
		s.modal(dic.PLEASE_CHANGE+dic.TO_ACTIVATE_THIS_EMPLOYMENT_PROFILE+" <ol>"+noaccess+"</ol>");
		*/		
//	}
	if(required_count===0){
		activatePost(id);
	}else{
		required_check();
	}
//},'json');
}else{
	activatePost(id);
}
}
function gutu(obj){
var exp= explode('|',obj.id);            
xget({a: 'switch_profile2',b: exp[1],grp:exp[3],dir:G.CUR_DIR}, (dat)=> {                
var oldid= s.coo('sid');
var sp= hash('sha256',dat.code+time());
s.coo('sp',sp);
//geo.save(dat.uid,sp);
if(G.CUR_DIR=='admin'){
s.coo('sid',exp[1]);
s.coo('grp',exp[3]);
s.coo('su_uid',my.uid);
s.coo('su_status',my.status);
if(exp[4]!=null){local('prev_dash','admiral');}
if(exp[2]==""){
var link='/u/'+dat["name"];						
}else{
var link= exp[3]=='1' ? '/u/'+dat["name"]+'/cv/'+exp[2] : '/u/'+dat["name"]+'/post/'+exp[2];
}
location.href=link;
}else{
s.coo('sid',exp[1]);
s.coo('grp',2);
xget({a:"dashu",b:s.coo("su_uid"),c:s.coo("su_status"),d:s.coo("su_uid")},o=>{"NO"!=o?"admiral"==local("prev_dash")?location.href=G.SITE_URL+"admin/admiral?mode=list":location.href=G.SITE_URL+"admin/user?mode=board&uid="+oldid:s.notify("error",dic.USERNAME_PASSWORD_NOT_CORRECT)});
}
},'json');
}
function gotoaff(uid){
	s.coodel('logo');
if (my.suspended && my.grp==2){
	s.modal(dic.SUSPENDED_ACCOUNT);
}else {            
	x('#goloader'+uid).show();
	// var session_group=s.coo('sid')==s.coo('affiliate') ? 2 : 1;
	xget({a: 'switch_profile',b: uid},function(data){
		s.coo('sid',data['uid']);
		s.coo('grp',data['grp']);
		api.ma.N('set',data);
		api.ma.my('set',data);
		if (my.grp==2){
			s.coo('agent_uid',my.uid);
		}
		//write to mongo sessions
		var sp= hash('sha256',data.code+time());
		s.coo('sp',sp);
		//geo.save(data.uid,sp);
		if (my.grp==1){
			location.href="/home/manage";
		} else {
				if (G.potential_link =='1'){
					location.href="/home";
				} else {
					location.href='/u/'+data.name+'/agent';
				}
		}
	},'json');
}
}		
function gotopage(page){	
if(G.uname=='home' && my.affiliate>0 && G.mode!='search' && (G.mode=='' ||G.mode=='manage' || G.mode=='manager')){
//x('#speedloaderCon').show();
if(G.mode=='manager'){manager();}else{manage();}
}else if (G.uname =='home' && G.mode =='requests'){
	s.coo('page_num',page);
	reset('aflist');
	affloop();	
}else if(G.uname=='prop' || G.uname=='offer' || G.uname=='loan'){
	s.coo(G.uname+'mode',page.id);
	s.coodel(G.uname+'inter');
	if(G.mode==G.uname+'cont' || G.mode==G.uname+'contfav'){
		location.href='/'+G.uname;
	}else{
	location.reload()
	}
}else if(G.uname=='home'){		
	s.coo('page_num',page);	    	
	seaexe();
}else if(G.uname=='potential'){		    	
s.coo('potential_page',page);
reset('wrapper1');
potloop(G.id);
}else if(G.uname=='support'){		    
s.coo('page',page);
reset('wrapper1');
tktloop();
}else if(G.uname=='inter'){		    
s.coo(G.uname+'_page',page);interloop();
}else if(G.uname=='mes'){		    
s.coo('page_num',page);
reset('wrapper1');
mesloop(0).then(id=>meshisloop(id));
}else if (G.uname =='local'){
	  s.coo('page_num',page);
	   reset('loop');
	   readclLoop();
} else {
		if (G.CUR_DIR =='admin'){
				location.href =G.SITE_URL+G.uname+'.php?page='+page+(G.flag!='' ? '&flag='+G.flag:'');
		} else if(['eoi','cont'].includes(G.uname)){
			location.href =G.SITE_URL+G.uname+'/'+G.mode+'/'+'?page='+page+(G.flag!='' ? '&flag='+G.flag:'');
		} else if(['offer','prop'].includes(G.uname)){
			location.href=G.SITE_URL+G.uname+'/'+G.mode+'/'+'?page='+page;
		}
	}
}
function searules(){							
		if(my.affiliate ==2 && parseInt(G.is.compulsory_ads) > 0 && my.active_posts < parseInt(G.is.compulsory_ads)){s.notify('error',dic.COMPLETE_SETUP);
		}else if(my.province=='0'){
			s.notify('error',my.grp==2 ? dic.ENTER_LOCATION : dic.MUST_ADD_LOCATION);
		}else if(my.grp==1 && my.edu.length==0){
			s.modal(dic.EDUCATION_SEARCH+'<br/><a href="/u/'+my.name+'/promo" class="adAdvPrefCv" onclick="s.pop(this)" aria-describedby="tooltip695894">'+dic.EDUCATION+'</a>')
		}else if(my.grp==1 && my.cv_active==0){
			s.modal(dic.BEFORE_SEARCH+'<br/><button id="newprofile" class="adAdvPrefCv" onclick="s.pop(this)" data-original-title="'+dic.ADD_NEW_PROFILE+'" aria-describedby="tooltip695894">'+dic.EMPLOYMENT_PROFILE_CVNEW+'</button>')
		}else if(my.grp==2 && my.buscat=='0'){
			s.notify('error',dic.ENTER_BUSINESS_CATEGORY)
		}else if(my.grp==1 && my.hasOwnProperty('aff') && my.aff.sblock=='1' && !s.coo('agent_uid')){
			location.href="/u/"+my.name+"/agent";
		}else if(my.grp==2 && my.certifiedF=='0'){
			s.notify('error',dic.SELECT_NON_INCOGNITO_PROFILE+"> <a href='/u/"+my.name+"/membership'>Setting Page</a>");
		}else if(my.buscat=='199' && ![1,3].includes(my.agentdata.active_search) && [2,3].includes(my.affiliate)){
			s.notify('error',dic.NO_ACCESS_THIS_PAGE);
			window.setTimeout("s.redirect('/u/'+my.name+'/services?page=8')",2000);
		}else if (my.grp==1 && my.suspended && G.is.allow_search==0){
				s.confirm(dic.SUSPENDED_ACCOUNT2,function(res){
					if(res){location.href=SITE_URL+'u/'+my.name+'/upgrade';}
				});
		}else if (my.grp==2 && my.suspended){
				s.confirm(dic.SUSPENDED_ACCOUNT,function(res){
					if(res){location.href=SITE_URL+'u/'+my.name+'/upgrade';}
				});
		}else{
			//x('#pb_'+id).show();
			return true;
		}
}
function goto(obj,page){
var e=explode('_',obj.id),uname=e[0],mode=e[1];
if(!e[1]){mode=e[0];uname=G.uname} 
if(uname=='mes'){	s.coodel('mesuid');s.coodel('mesid');	}
if(page!=null){uname=page}	
if(uname=='eoi'){
var modelist= ['received','sent','accepted','deleted','favorite'];
var pp= document.referrer.split('/');
var pmode=pp=="" ? "" : (['received','sent','accepted','deleted','favorite'].includes(pp[4])? pp[4]: (pp[3].indexOf('mode=') !== -1 ?
pp[3].split('mode=')[1].split('&')[0]
: ''));var reset_cookies=['selectedPost','sedutype','edu_level1','agerange','exp_years','city','exp_id','skills','edu_grade1','edu_insti','sort_eoi_subclass_'+pmode];
for(var r in reset_cookies){s.coodel(reset_cookies[r]);location.href='/eoi/'+mode;}	
}
switch(uname){
case 'pa':
	var thisid=obj.id,id=obj.id.replace('pa_',''),pages= ['home','profile','eoi','mes','inter','cont'];
	ses.del('s_tag');ses.del('s_exp_id2');
	//if(mode=='profile' && x('#pb_profile').css('display')=='block'){x('#pb_profile').hide()}
	//close other menus		
	for (var i in pages){
	if(pages[i]!=id){		
	  x('#pb_'+pages[i]).hide();
		if(pages[i]!='search'){s.ses('pop_search',0);}
	}}	
//	if(my.grp==1 && G.is.potential_link=='0'){location.href='/u/'+my.name}					
	if(thisid.substr(thisid.length - 3)=="fav" && s.coo('sid')=="0"){
	s.notify('error',dic.COMPLETE_REGISTRATION_ACCESS_PAGE)
	}else{	
	if(id=='search6'){ 
		if(my.goldenpropE < time() && in_array(my.buscat,[155,156,157])){
		s.modal("<a href='/u/"+my.name+"/services?page=13' class='adAdvPrefGold3'>GET GOLD PROPERTY</a>");
		}else{	
		s.ses('s_mode', 'crit5');s.coo('s_mode', 'crit5');
		location.href='/home';		
	}			
	}	
	if(id=='search3'){
	s.ses('pop_search',3);s.ses('s_mode','upskill');location.href='/home/course?page=1';
	}	
	if(id=='search4'){s.ses('pop_search',4);s.ses('s_mode','crit4');location.href='/home/prop?page=1';
	}	
	if(id=='search4fav'){s.ses('pop_search',4);s.ses('s_mode','propfav');	location.href='/home/propfav?page=1';
	}
	if(id=='search2fav'){s.ses('pop_search',2);s.ses('s_mode','offerfav');location.href='/home/offerfav?page=1';
	}			
	if(id=='search2' || id=='search5'){
		var s_mode=obj.className.replace('speedSearch','').toLowerCase();
		var smode=s_mode=='hotels' || s_mode=='bars' ? s_mode : 'critb';
		var link=s_mode=='hotels' || s_mode=='bars' ? s_mode : 'offer';
			s.ses('pop_search',2);
			s.ses('s_mode',smode);
		if(id=='search5'){
			s.ses('s_mode2','business_sales');s.coo('s_mode2','business_sales');
		}else{
			ses.del('s_mode2');
			s.coodel('s_mode2')
		}					
		location.href='/home/'+link+'?page=1';
	}	
	}
//open or close clicked menu
//	if(x('#pb_'+id).css('display')=='none'){
	if(id=='search' || id=='search2'){		
		if(searules()){
			location.href='/home';
		}
	}else if(id=='home' && my.buscat=='199' && my.province=='0'){
		s.notify('error',dic.ENTER_LOCATION)
	}else{
		if(x('#pb_'+id).css('display')=='none'){x('#pb_'+id).show();}else{x('#pb_'+id).hide();}
	}
//}else{
//	x('#pb_'+id).hide();
//	if(id=='search'){s.ses('pop_search',0);}
//}
break;
case 'u':
var data=$(obj).data(); s.coo('anchor',data.link);
api.red.set("anchorhtml"+my.uid,$('#wrapper1').html());
location.href='/u/'+data.name+'/_'+data.mode+'/'+ data.link;
break;
case 'support':			
	var isaffiliate=my.agent > 0 ? 1:0;
	location.href= my.grp==1 && isaffiliate==1 && !s.coo('agent_uid') ? '/u/'+my.name+'/agent' : '/support/closed';
break;
case 'inter':			
s.coo('inter_page',1);ses.del('i_contact');
//x('#'+mode).attr('class','sortButtonInter');
//two weeks cancelled
if(mode=='icancelled'){ s.ses('i_status_param',1209600);}
else if(mode=='itoday'){ s.ses('i_status_param','today');}
else if(mode=='iconfirmed' && my.grp==1){ s.ses('i_status_param','today');}
else if(mode=='iupdaterecords'){ s.ses('i_status_param','updaterecords');}
else {ses.del('i_status_param');}
var buttonArray= {itoday:8,iconfirmed:8,irequested:5,iaskreschedule:6,irescheduled:7,ishortlisted:3,ifinalisted:4,icancelled:10,icompleted:11,iupdaterecords:8}	
s.ses('i_status',buttonArray[mode]);
location.href='/inter/'+mode;
break;
case 'mes':	
	if(mode=="chat"){
	if(my.suspended){
		s.confirm(dic.SUSPENDED_ACCOUNT4,function(res){
			if(res){location.href='/u/'+my.name+'/upgrade';}
		})
		}else{
		s.coo('mesmode','chat');
		location.href=SITE_URL+"mes";
		}
	}else{
		if(my.app==10){
	s.coo('mesmode','loan');
	}else if(my.app==9){
		s.coo('mesmode','prop');
		chat.loop(G.ui,'','2');
	}else if([1,2].includes(my.app)){
		if(parseInt(x('.c_mes_inbox').text()) > 0){
			s.coo('mesmode','all');
			location.href='/mes';
		}else if(parseInt(x('.c_mes_chat'+G.ui).text()) > 0){
			s.coo('mesmode','chat');
				chat.loop(G.ui,'','2');	
		}else{
			s.coo('mesmode','inbox');	
			location.href='/mes';		
		}
	}else{
		s.coo('mesmode','offer');	
			chat.loop(G.ui,'','2');
	}	
	
	}
break;	
case 'home':	
if(["manage","register","requests","manage","auth"].includes(mode)){
if(my.affiliate ==2 && parseInt(G.compulsory_ads) > 0 && my.aposts < parseInt(G.compulsory_ads)){s.notify('error','Please,complete your setup');}else{location.href='/home/'+mode;}}
break;	
}
}
//check prologin updated with check sp (security code)
function checksp(){
api.mo.getOne("sessions",{uid:s.coo('sid')},function(res){
var sp_check=res.sessions.includes(s.coo('sp'));
if (!sp_check){s.coodelAll([]);location.href='/';}
})
}

function prologin(){
var wall= typeof (x('#us').val())!='undefined' ? x('#us').val() :'';
var inside= !!s.coo('prlgn') ? s.coo('prlgn') : '';
xget({a:'prologin',b:wall,c:inside},function(data){
	if(data!='NO'){
		if(wall !=''){
			s.coo('prlgn',data);
			location.href='/';
		}
	}else{
		if(x('#prol').val()!=1){
			s.coodelAll([]);
			location.href='/';
		}
	}
})
}
//hiring time
$(document)	

.on("click",'.chatbtn',function () {
	chat.loop(G.ui,'','2');
})
.on("click",'.notifbtn',function () {
	if($('.menunotif').css('display')!='block'){bufAsync('2-',PVIEWS+'nbar2').then(()=>loadN());}
})
.on("change",'#contactnameTitle',function () {
	if(this.value!=0){
		$.get('/ajax.php', {a: 'alias',b:$('#contactnameTitle').val()},(res)=>{
			if(res=='OK'){
			api.ma.my("get",my,['user']);
			  $('#readContactNameTitle').html(G.contactname_title[val])
			}
		})
	}
})
.on("click",'#submitContactName',function () {
            if(my.grp==1) {
            var firstname = $('#editContactName1').val();
            var lastname = $('#editContactName2').val();
            $.get('/ajax.php', {a: 'fullname', b: firstname, c: lastname}, function (data) {
				console.log(data)
                if (data == 'OK') {
					api.ma.my("get",my,['user']);
                    s.confirm({
                        message: dic.CHANGE_CONTACT_NAME + ' <b>' + firstname + ' ' + lastname + '</b> ' + dic.SURE,
                        callback: function (result) {
                            if (result == true) {
                                $('#readContactName').html(firstname + ' ' + lastname).show('normal');
                                opener('editContactName');
                            }
                        }
                    });
                } else if (data == 'R1') {					
                   s.modal(dic.EMPLOYEE_NAME_CANNOT_UPDATED_MORE_THREE);
                } else {
                    s.modal(dic.USERNAME_NO_INSERTED);
                }
            });
            }else{
                var val = $('#contactnameTitle').val();
                var firstname = $('#editContactName1').val();
                var lastname = $('#editContactName2').val();
                $.get('/ajax.php', {a: 'fullname', b: firstname, c: lastname},()=>{
						api.ma.my("get",my,['user']);
				})
                $.get('/ajax.php', {a: 'alias', b: val});
                $('#readContactNameTitle').html(G.contactname_title[val])
                $('#readContactName').text(firstname + ' ' + lastname);
                toggle_edit('editContactName','readContactBox');
			}
})
.on("keyup","#sm_address",function(){		
	s.coo('sm_address',this.value);
})
.on("click","#link2service13",function(){		
var aprop=parseInt($(this).attr('prop'));
	if(parseInt(G.is.compulsory_prop) > 0 && aprop < parseInt(G.is.compulsory_prop)) {
		s.modal(dic.COMPLETE_PROPERTY_SETUP);
	}else{	
	location.href="/u/"+my.name+"/services?page=13";
	}
	})
.on("click",'#prop1,#prop2,#prop3',function(){
$('#step1').slideDown();	
var state=s.coo('sm_state');
var selState='',state_text='';
var state_text = '<option value="">State</option>';
for (var i in G.states) {
	selState = state==G.states[i] ? 'selected="selected"' : '';
	state_text += '<option value="' + G.states[i] + '" '+selState +'>' + i + '</option>';
}
var stathtml = '<select id="state">' + state_text + '</select>';			
x('#sm_statep').html(stathtml);
})
.on("click","input[name=hiring_time]",function(){
	xget('?a=hiring_time&b='+G.id+'&c='+this.value);
})
.on("click","#submitBusCat",function(){
	if(my.buscatC < 3){
	var val=x('#buscat').val();
	var txt=array_flip(G.buscat)[val];		
	if(val!='0'){
		xget('?a=buscat_ur&b='+val,d=>{
		if(d=='OK'){
			api.ma.my("get",my,['user']);
			x('#readBusCat').html(txt);
			}	
		});	
	}
	}else{
		s.modal("Industry changes exceeds the limit of changes. Please, contact with your administrator.")
	}
});
function ilog(mes){
var mes= JSON.stringify(mes);
xget({a:'ilog',b:G.iid,c:mes},function(data){
if(data=='OK'){console.log('ilog writen','green')}
});
}
function change_lang(newlang){
xget('?a=changeLang&b='+newlang);
// x('#readLang').html(G.langs[newlang]);
s.coo('LANG',newlang);
api.ma.my('get',my,['user'],d=>{
location.reload();
})
}
//************ACTIVITY********************//
function abox(data,param){
var support='',unread=0,payment=0;
for (var i=0; i < data.length; i++){
	if (['2','3'].includes(data[i].status)){unread += 1;}
	if (data[i].type=="payment" && ['2','3'].includes(data[i].status)){payment += 1;}
	var readClass=data[i].status==2 ? 'messageMin' : 'messageMinUnread';
	var readTitle=data[i].status==2 || data[i].status==3 ? dic.MARK_AS_READ : dic.MARK_AS_UNREAD;
	var mark=data[i].status==2 || data[i].status==3 ? "style='background:#0B5C7B'" : "";
	var type=!data[i].type ? '' : data[i].type;
	support +='<div class="nCont aline'+data[i]._id+'">' +
		'<div class="phNotif"><img src="'+iconic(data[i].img)+'" class="profile_photo7"></div>' +
		'<div class="nTit"><b>'+data[i].title+'</b></div>' +
		'<div class="nText">'+data[i].message+'</div>' +
		'<span class="nDate"><b>'+date('Y-m-d H:i',data[i].created)+'</b></span>' +
		([2,3].includes(data[i].status) ? '<button param="'+param+'" type="'+type+'" id="statusaline'+data[i]._id+'" class="readMAct" '+mark+' title="'+readTitle+'"></button>':'') +
		'</div>';
	if (data[i].status==3){
		//update new to status 2
		api.mo.set('activity',{_id: data[i]._id},{status: "2"});                
		//send s.notify
		s.notify("warn",data[i].message,data[i].title,data[i].url,data[i].img);
	}
}
//counters
if(param!='page'){
	if (param=="list"){
		local('s_notify',unread);
		local('s_notify_payment',payment);
	} else if (param=="new"){
		local('s_notify',s.i(local('s_notify'))+unread);
		local('s_notify_payment',s.i(local('s_notify_payment'))+payment);
	}
	var unread_stored=s.i(local('s_notify'));
	var payment_stored=s.i(local('s_notify_payment'));
	if (unread_stored > 0){x('.c_notify').html('<em class="c_Bottom ccyan">'+unread_stored+'</em>');} else {x('.c_notify').html('')}
	if (payment_stored > 0){x('.c_notify_payment').html('<em class="c_Bottom ccyan">'+payment_stored+'</em>');} else {x('.c_notify_payment').html('')}
}
return support;
}
function actloop(){
api.mo.get("activity",{uid: my.uid,order: "status-"},function(data){
	x('.abox').html(abox(data,"page"))
})
}
function readactivityList(){
api.mo.get("activity",{uid:my.uid,order:"created-",status:"2"},function(data){
	x('.aboxmenucontent').html(abox(data,"list"));
})
}
function readactivityNew(){
api.mo.get("activity",{uid:my.uid,order:"created-",status:"3"},function(data){
  //append new to ticker
		x('.aboxmenucontent').append(abox(data,"new"));
});
}
$(document).on("click","button[id^='statusaline']",function(){
var thisid=this.id;
var id=thisid.replace('statusaline','');
this.style.background='none';
var type= this.getAttribute('type');
var param= this.getAttribute('param');
if(param=="list"){x('.aline'+id).hide();}else{this.remove()}
//update checked
api.mo.up("activity",{_id: id},{$set:{status:0}},data=>{ //if in profile list NOT REMOVE IN PAGE            
		local('s_notify',parseInt(local('s_notify'))-1);
		if(type=="payment"){local('s_notify_payment',parseInt(local('s_notify_payment')) - 1);}
	})
})
.on("click",".newoffer",function(){
//if(my.suspended=="0"){
$.get('/ajax.php',{a:"newoffer"},function(data){
	console.log(data)
if(data=='NO'){
	location.href='/u/'+my.name+'/services?page=10';
}else if(data=='limit'){
	s.notify('error',dic_INACTIVE_ADS_COMPLETE_ACTIVATE_NEWADVPOST)
}else{
	api.ma.my('get',my,['offer'],()=>{
		location.href='/u/'+my.name+'/offer/'+data;
	});	
	
}
})
})	
.on("click",".newpropbuyer,.newpropseller",function(event){
	if(my.goldenpropE > time()){
		var a=this.className.split(' ')[0];
		xget({a:a},function(data){
			location.href='/u/'+my.name+'/prop/'+data;
		})
	}else{
		location.href='/u/'+my.name+'/services?page=13';
	}
})
.on("click",".newprop,.newproplease",function(event){
var a=this.className.split(' ')[0];
var service= a=="newproplease" ? 14 :12;
xget({a:a},function(data){
if(data=='NO'){
	location.href='/u/'+my.name+'/services?page='+service;
}else if(data=='limit'){
	s.notify('error',dic.INACTIVE_ADS_COMPLETE_ACTIVATE_NEWADVPOST)
}else{
	location.href='/u/'+my.name+'/prop/'+data;
}
})
})	
.on("click",".newloan",function(event){
xget({a:'newloan'},function(data){
//if(data=='NO'){
	//location.href='/u/'+my.name+'/services?page=18';
//}else if(data=='limit'){
//	s.notify('error',dic.INACTIVE_ADS_COMPLETE_ACTIVATE_NEWADVPOST)
//}else{
	location.href='/u/'+my.name+'/loan/'+data;
//}
})
})
.on("click", "button[id^='jobBtn']", function () {
	var id = this.id.replace('jobBtn', '');
	if (s.coo('job_tab') != id) {
		toggle_edit('boxJob' + s.coo('job_tab'), 'boxJob' + id);
		$('.jobBtnActive').removeClass('jobBtnActive').addClass('jobBtn');
		x('#jobBtn' + id).addClass('jobBtnActive');
	}
	s.coo('job_tab', id);
})
.on("click",".newloanapp",function(event){
console.log("newloanapp clicked")
xget({a:'newloanapp'},function(data){
	console.log(data)
if(data=='NO'){
	location.href='/u/'+my.name+'/services?page=18';
}else if(data=='limit'){
	s.notify('error',dic.INACTIVE_ADS_COMPLETE_ACTIVATE_NEWADVPOST)
}else{
	location.href='/u/'+my.name+'/loanapp/'+data;
}
})
})	
//all loggedin button
.on("click","#allLoggedin",function(){
console.log('bulk login')
xget('?a=allLoggedin',function (data){
	if (data =='1'){
		x('#buttonAllLoggedin').attr('class','userAff_online');
		s.notify('good',dic.ALL_USERS_LOGGED_IN);
	} else {
		s.notify('error',dic.PROBLEM_LOGIN_USERS);
	}
});
})
// //new add new notice
.on('click',".newadv,.newnotice",function(){
if(my.post_inactive >= 5){s.notify('error',dic.CANNOT_ACTIVATE_AD)}else{
	xget({a:"new_post",ptype:this.className.includes('newadv')?1:2},d=>{
	api.ma.my('get',my,['user'],d2=>{location.href ='/u/'+my.name+'/post/'+d;})
	})
}
})
// var gotolist={76: '/dsh'}
function gotodash(link){
if(my.have_dash){
var par={a: 'dash',b: my.dash.name,c: my.dash.pass,d:(s.coo('su_uid')!=null ? s.coo('su_uid') : my.uid),e: link}; //xget(par,function(data){
api.mo.getOne('sudos',{name:my.dash.name,pass:my.dash.pass,uid:my.uid},d=>{
		s.coo('dsh',s.coo('sp'));
		if (d!=undefined){
		if (G.CUR_DIR!='admin'){
			if (s.coo('ex-sid')!=null){
			location.href='/admin/user?mode=board&uid='+s.coo('ex-sid');                        
			}else{location.href='/admin/dash';}
		}
		}else{s.notify('error',dic.USERNAME_PASSWORD_NOT_CORRECT)}
	})
//$dash=$s->fetch("SELECT id FROM user_dash WHERE name=? AND pass=? AND uid=?",array($b,$c,$d));
//if(!empty($dash)){s.coo('dsh',md5($_COOKIE['sp']));echo md5($_COOKIE['sp']);}else{echo 'NO';}
}
}
var keys={};
function printKeys(){
if (18 in keys){//alt+l                        
if (65 in keys){if(my.have_dash){
	api.mo.getOne('sudos',{uid:my.uid},d=>{
		s.coo('dsh',s.coo('sp'));	
			if (d!= undefined){
				if (my.status =='14'){location.href='/admin/dash';
				} else {
					location.href='/admin/dash';
				}
			} else {
				s.notify('error',dic.USERNAME_PASSWORD_NOT_CORRECT)
			}
		})
	}
}
//alt+m
if (77 in keys){
	var clearurl=location.href.split('//')[1];
	if(clearurl.split('.')[0]=='m'){
		location.href= location.href.split('//')[0]+'//'+clearurl.split('.')[1]+'.'+clearurl.split('.')[2];
	}else{
		location.href= location.href.split('//')[0]+'//m.'+clearurl;
	}
}        
if(85 in keys){change_lang('en');} //alt+ u        
if(71 in keys){change_lang('el');}//alt+ g                
}
}
$(document)
.on("keydown",function (e){
keys[e.which]=true;
printKeys();
})
.on("keydown",function (e){
delete keys[e.which];
printKeys();
})
.on("click","#newprofile",function(){
	this.style.display='none';
	xget({a:'new_cv'},function(data){
	console.log(data)
	if(data=='maxinactive'){
		s.notify('error',dic.CANNOT_CREATE_PROFILE);
	}else if(data=='NO'){
		s.notify('error',dic.PROBLEM_CREATING_JOB_PREFERENCE);
	}else {
		//location.href =G.SITE_URL+'u/'+my.name+'/cv?ep='+data.trim()+'#cv';
		location.href ='/u/'+my.name+'/cv/'+data;
	}
	})
})
//****************************************PCAT TOUPDATE*******************************/
//search have session && offer has coo 
function readkey(key){if(G.uname=='offer'){return s.coo(key);}else{return s.ses("s_"+key);}}
function delkey(key){if(G.uname=='offer'){return s.coodel(key);}else{return ses.del("s_"+key);}}
function savekey(key,val){if(G.uname=='offer'){return s.coo(key,val);}else{return s.ses("s_"+key,val);}}

function pcat(){ 		//app parameter	
//on load
var offerid=parseInt(G.id);
//το res δίνεται s.ses('pcat1''pcat2''pcat3')
var d=G.pcat,selcat1,selcat2,selcat3,pcat1=readkey('pcat1') || 0,	
pcat2=readkey('pcat2') || 0,pcat3=!readkey('pcat3') ? 0:JSON.parse(readkey('pcat3')),		
pcat1sel,pcat2sel,pcat1f='<option value=0>Product Category</option>',
pcat2f='<option value=0>Product subcategory</option>',pcat3f='';	
////VISIBLE ONLOAD
//set cat1
if(my.app!=4){
for(var i in d.pcat1){
pcat1sel=d.pcat1[i].id==pcat1 ? "selected=selected":"";		
pcat1f +='<option '+pcat1sel+' value='+d.pcat1[i].id+'>'+i+'</option>';
}
x('#pcat1').html(pcat1f);		
//set cat2
for(var j in d.pcat2){
		selcat2=pcat2==d.pcat2[j].id ? "selected=selected":"";
		if(pcat1==d.pcat2[j].pcat1id){
		pcat2f +='<option '+selcat2+' value='+d.pcat2[j].id+'>'+j+'</option>';}	
	}			
	if(x('#pcat2').length>0){x('#pcat2').css('display','block').html(pcat2f);}
//set cat3	
for(var k in d.pcat3){
selcat3=!!pcat3 && pcat3.includes(d.pcat3[k].id) ? "checked" :"";				
if(pcat2==d.pcat3[k].pcat2id){
pcat3f +='<span class="subclassTotal2"><span class="subclassCheck"><input '+selcat3+' type="checkbox" name="pcat3id" value='+d.pcat3[k].id+'></span>'+k+'</span>';
}}
$('#pcat3').html(pcat3f).css('display','block');	
}

//required
pcat1
}
////EVENTS
//on change pcat1
$(document).on("change","#pcat1",function(){		 
var d=G.pcat,pcat2f='<option value=0>Product Subcategory</option>';	 
 if(this.value!=0){
	 savekey('pcat1',this.value);delkey('pcat2');delkey('pcat3')
	//set cat2		
	for(var j in d.pcat2){
		//selcat2=this.value==d.pcat2[j].pcat1id ? "selected=selected" :"";
		if(this.value==d.pcat2[j].pcat1id){
		pcat2f +='<option value='+d.pcat2[j].id+'>'+j+'</option>';}	
	}
	x('#pcat2').html(pcat2f).css('display','block');
		x('#pcat3').css('display','none');	
	$(this).prop('required',false);		
}else{
	$(this).prop('required',true);	
	delkey('pcat1');delkey('pcat2');delkey('pcat3');
	x('#pcat2').css('display','none')
	x('#pcat3').css('display','none');
}
if(G.uname!='offer'){seactive(1);}
})
//on change pcat2
.on("change","#pcat2",function(){		
var d=G.pcat,pcat3f='';	 
 if(this.value!=0){
	 savekey('pcat2',this.value);delkey('pcat3');
	//set cat2		
	for(var k in d.pcat3){
		//selcat2=this.value==d.pcat2[j].pcat1id ? "selected=selected" :"";
		if(this.value==d.pcat3[k].pcat2id){
		pcat3f +='<span class="subclassTotal2"><span class="subclassCheck"><input type="checkbox" name="pcat3id" value='+d.pcat3[k].id+'></span>'+k+'</span>';
		}	
	}
	x('#pcat3').html(pcat3f).css('display','block');	
	$(this).prop('required',false);
}else{
	$(this).prop('required',true);
	x('#pcat3').css('display','none')
delkey('pcat2'),delkey('pcat3')
}
if(G.uname!='offer'){seactive(1);}else{location.reload()}
})
//on change pcat3
.on("click","input[name='pcat3id']",function(){
//value=this.checked ?  1 : 0,
//pcat3=parseInt(this.value);		
var pcats3=$("input[name=pcat3id]:checked").map(function(){
	return parseInt(this.value);
}).get();
if(pcats3.length==0){$(this).prop('required',false);}else{$(this).prop('required',false);}
var pcats=typeof pcats3 !=='undefined' && pcats3.length > 0 ? JSON.stringify(pcats3) : '';
savekey('pcat3',pcats);
if(G.uname!='offer'){seactive(1);}else{location.reload();}
})
//****************************************comments TOUPDATE*******************************/
$(document)
.on("keyup","div[id^='propcomment']",function(){	
var propid=this.id.replace('propcomment','');
var val=this.innerHTML;
xget('?a=comment&b='+propid+'&c='+val);
})
.on("keyup","textarea[id^='mycomment_']",function(){
var id=explode('_',this.id);
xget('?a=mycomment&b='+this.value+'&c='+id[1]);
})
.on("keyup","div[id^='comment2_']",function(){
var val=this.innerHTML;
var cid=this.id.replace('comment2_','');		
$.get('/ajax.php',{a:'comments'+my.grp,b:cid,c:val},res=>{
	console.log(res)
});
})	
.on("keyup","div[id^='comment2_']",function(){
var cid=this.id.replace('comment2_','');
var val=this.innerHTML;
var params='?a=comment'+my.grp+'&b='+cid+'&c='+val;
xget(params);
})
//cont comments
.on("keyup",".affNotesText",function(){
	xget('?a=affnotes&b='+my.uid+'&c='+s.coo('affiliate')+'&d='+this.value);
})
.on("keyup","div[id^='comment2_']",function(){
var cid=this.id.replace('comment2_','');
var val=this.innerHTML;
xget('?a=comment'+my.grp+'&b='+cid+'&c='+val);
})
.on("keyup","div[id^='comments2_']",function(){
var cid=	this.id.replace('comments2_','');
var value=	x('#comments2_'+cid).text();
xget({a:'comments2',b:cid,c:value},function(data){
console.log(data)
});
})
//agent panel
.on('click',"button[id^='comment']",function(){
// var comment=this.getAttribute('data');
var exp=explode('_',this.id);
var cid=exp[1];
var uid=exp[2];
$.post("/ajax.php",{a:'get_comment2',b:cid},function(data){
	console.log({a:'get_comment2',b:cid});
	console.log(data);
s.modal({
	title: dic.MY_NOTES_FOR+": <i>"+ x('#fullname'+uid).text()+"</i>",
	message:'<div contenteditable="true" style="white-space: pre-wrap; overflow-y: scroll; height:300px" id="comment2_'+cid+'" uid1="'+uid+'" placeholder="'+dic.WRITE_COMMENT+'">'+data+'</div>',foot:but('OK')
})
})
})

function mediames(ext,file){var mes;
	if(["pdf","PDF"].includes(ext)){
	mes='<div class="iframe-container"><iframe id="imgmodal" src="'+file+'"></iframe></div>';	
	}else if(['doc','docx'].includes(ext)){
	//mes='//docs.google.com/gview?url='+file+'&embedded=true';
	mes='<div class="iframe-container"><iframe id="imgmodal" src="//docs.google.com/gview?url='+file+'&embedded=true""></iframe></div>';
	}else if(['mp4','mov','wmv','avi','flv','f4v','swf','mkv','webm'].includes(ext)){
	mes='<div class="imgBox"><video id="imgmodal" poster="' +file+'" controls><source src="'+file+'" type="video/mp4"></video></div>';
	}else{ 
	mes='<div class="imgBox"><img id="imgmodal" src="'+file+'" width="auto"/></div>';	
	}return mes;
}
function mediav(o,ext){ //external 
	var message,file=!o.getAttribute('file') ? '':o.getAttribute('file'),src=o.src,	
	tp=!o.getAttribute('type')?'':o.getAttribute('type'),
	id=o.getAttribute('imgid'),	
	ext=!ext ? file.split('.').pop():ext,		
	list=my.photos.filter(d=>{return d.type==tp;}),	
	current=list.filter(d=>{d.id==id}),		
	title=!o.title?'':o.title,	
	index=array_flip(list.map(function(item,index){return item.id;}))[id],			
	foot=!index ? '':'<span id="L" type="'+tp+'" index="'+index+'" ontouchmove="mediavclip(this)" onclick="mediavclip(this)" class="arrowGalleryL"></span><span id="R" onclick="mediavclip(this)" type="'+tp+'" index="'+index+'" ontouchmove="mediavclip(this)" class="arrowGalleryR"></span>';
	s.modal({title:title,foot:foot,message:mediames(ext,file)});
};
function mediavclip(o){				
	var tp=o.getAttribute('type'),pos=o.id,index=o.getAttribute('index'),list=my.photos.filter(d=>{return d.type==tp;}),	
	nindex=pos =='R' ? (index==list.length - 1 ? 0 : Math.abs(index)+1):(index==0 ? list.length -1 : Math.abs(index) - 1),
	ext=list[nindex].name.split('.').pop();	
	console.log(nindex)
	console.log(list[nindex])
	//x("#imgmodal").attr('src',UPLOADS+);
	x('#modalbody').html(mediames(ext,G.UPLOADS+list[nindex].name))
	o.id=list[nindex].id;
	o.setAttribute('index',nindex);
	var ntitle= !list[nindex].title?'':list[nindex].title;	 
	x("#modaltitle").text(ntitle);
}
//create the PHOTO DIALOGUE
$(document).on("click","#selectPimage,#selectBgimage",function(){
var thisid=this.id,checked_avatar,avatarHtml='',
profilePhotoFile=typeof ($('.profile_photo')[0])!='undefined' ? $('.profile_photo')[0].src.split('/')[6] : $('.profile_photo2')[0].src.split('/')[6],
bgPhotoF= $('.bg_photo')[0].src,
// log($('.bg_photo').attr('src'))
bgPhotoFile=bgPhotoF.split('/')[6],
SavedImageFile= thisid=='selectPimage' ? profilePhotoFile : bgPhotoFile,
typeImg= thisid=='selectPimage' ? 'a' : 'b',
//instead of ajax my.photos
checked_img,data=my.photos;

if (data.length > 0){
var  htmlImages ='<ul class="matchingMyPhoto-now">';
for (var i in data){
checked_img= data[i].name==SavedImageFile ? 'checked':'';
htmlImages +='<li><input type="radio" id="selPhoto_'+data[i].id+'" value="'+data[i].name+'" name="radioPhotos" style="margin: 0;cursor: pointer;">' +
	'<label for="selPhoto_'+data[i].id+'"><img src="/uploads/thumbs/icon_'+data[i].name+'" width="100%" border="0"></label></li>';
}
htmlImages +='</ul>';
}
var avatars={},avrange=typeImg=='a' ? range(0,25):range(0,169),avatarsLink=typeImg=='a' ? '/img/avatar/thumb1/' : '/img/avatar/thumb/';	
for(var v in avrange){avatars[v]=avrange[v]+typeImg+'.jpg';}
console.log(avatars);	
for (var j in avatars){
checked_avatar = avatars[j]==SavedImageFile ? 'checked' : '';
avatarHtml +='<li><input type="radio" id="selPhoto_avatar' + j + '" value="' + j + '" ' + checked_avatar + ' name="radioPhotos" style="margin: 0;cursor: pointer"><label for="selPhoto_avatar' + j + '"><img src="' + avatarsLink + avatars[j] + '" width="100%" height="100%" border="0"></label></li>';
}
var HTML='<div class="myPhotosAvatarCon"><div class="selectImgMyPhotos"><div class="setboxmyphotos">'+htmlImages+'</div></div>'+(my.grp==1  ? '<div class="selectImgMyPhotos2"><div class="selectImgTitle"><span style="color:#BE1E2D;">'+(typeImg=="a" ? dic.HEADLINE1 : dic.HEADLINE2)+'</span></div><div class="setboxphotoavatar"><ul class="matchingPhotoAv-now' + typeImg + '">'+avatarHtml+'</ul></div></div>' : '');
var img_selector_callback=function(){
	var selected=$('input[name=radioPhotos]:radio:checked').val(),
	selectedID=$('input[name=radioPhotos]:radio:checked').attr('id').replace('selPhoto_',''),
	imgType= selected.includes('avatar') ? 'avatar' : 'image';
	$.post('/ajax.php',{a:thisid,b:imgType,c:selected,d:parseInt(selectedID),objtype:this.id},function(res){
		if(typeof selected !='undefined' && imgType!=null){
			api.ma.my('get',my,['photos','user']);
		   if(thisid=='selectPimage'){
		   var file=imgType=='image'? '/uploads/thumbs/icon_'+selected : SITE_URL+'img/avatar/thumb1/' + selected + typeImg+'.jpg';
		   $('#gallery1').html("<button type=1 onclick='mediav(this.childNodes[0])'><img imgid='"+selectedID+"' loading='lazy' file='"+file+"' src='"+file+"' width='"+(G.mobile ?76 :136)+"' height='"+(G.mobile ?76 :136)+"' class='profile_photo2'></button>");							
		opener2('menuprof');
		}else{
		   var file=imgType=='image'? '/uploads/thumbs/icon_'+selected : SITE_URL+'img/avatar/thumb/' + selected + typeImg+'.jpg';
		   $('#gallery2').html("<button type=2 onclick='mediav(this.childNodes[0])'><img imgid='"+selectedID+"' loading='lazy' file='"+file+"' src='"+file+"' width='100%' class='bg_photo'></button>");									   
		toggle_edit('menubg');
		}		
			console.log(res);		
			modalclose();
			
		}
		});	
	};
s.modal({title:dic.CHOOSE_UPLOADED_PHOTOS,message:HTML,foot:but(dic.SELECT,img_selector_callback)});	
});
/**********************END IMAGE VIEWER*****************/	
$(document)
.on("click","#activeStatus",function(){
var value=this.checked ? 2 : 1;
xget('?a=phase&b='+value,d=>{api.ma.my("get",my,['user'])});
})
.on("click","button[id^='statusaline']",function(){
var thisid=this.id;
var id=thisid.replace('statusaline','');
this.style.display.background='none';
var type= this.getAttribute('type');
var param= this.getAttribute('param');
if(param=="list"){x('.aline'+id).hide();}else{this.remove()}
//update checked
xpost(api.uri+"activity",{a: "UPDATE",WHERE: {_id: id},SET: {status: "0"}},function(data){
//if in profile list NOT REMOVE IN PAGE
	local('s_notify',parseInt(local('s_notify'))-1);
	if(type=="payment"){local('s_notify_payment',parseInt(local('s_notify_payment')) - 1);}
})
})
/*
* ONLINE ACTIVITY NOTIFΙΕΡ
* */
function cardsopen(){
	if(!s.coo('cardsopen')){	
	s.coo('cardsopen',1); x('.subcard').showall();
	}else{
	s.coodel('cardsopen');x('.subcard').hidall()
	}
}
function dash(){
	if (s.coo('dsh')!=s.coo('sp')){
	s.modal({title:dic.DASHBOARD_LOGIN,message:'<div class="bootContainer">'+dic.USER_NAME2+': <input class="bootInput" id="useradmin"></div><div class="bootContainer">'+dic.PASSWORD2+':<input type="password" class="bootInput" id="passadmin"></div>',foot:but("OK",function(){ //,pass:x('#passadmin').val()
		var params={uid:my.uid,name:x('#useradmin').val()};
		console.log(params);	
		api.mo.getOne("sudos",params,d=>{
		console.log(d);	
		if(d!='NO'){s.coo('dsh',s.coo('sp'));location.href='/admin/dash';}else{s.notify('error',dic.USERNAME_PASSWORD_NOT_CORRECT)};})		
	})			
	})			
	}else{location.href='/admin/dash';}
}
function getNotify(){
var a=  G.mode=='manage' ? 'notifyClients':'notify';
xget({a: a},function(res){
	var feed='';
	var notlist=[];
	for(var i in res){
		notlist.push(parseInt(res[i].id))
		feed +='<li>' +
			'<a href="'+res[i].linkfrom+'"><img src="'+res[i].fromimg+'" width="100%" class="but138">' +
			'<b>'+res[i].who+'</b></a>' +
			' '+ res[i].action+' '+
			'<a href="'+res[i].linkto+'"><img style="float:right" src="'+res[i].toimg+'" width="40px">' +
			'<b>'+res[i].whom+'</b></a>' +
			'<span style="float:right;clear:both;color:red">since '+res[i].since+'</span>' +
			'</li>';
	}
	// console.log('new list '+notlist)
	// console.log('old list '+s.ses('notify'))
	// console.log('diff '+array_diff(JSON.parse(s.ses('notify')),notlist).length)
	var newnots=array_diff(JSON.parse(s.ses('notify')),notlist);
	if(newnots.length > 0){
		for (var i in newnots){
			$('#feed').prepend(newnots[i]).animate({marginTop:"-=100px"},300);
		}
	}
	//company old res with new res
	s.ses('notify',JSON.stringify(notlist))
	x('#feed').html(feed)
},'json');
}
$(document).on("click","#proposal_received",function(){
s.coo('tab_settings','switchProfile04e');
location.href="/u/"+my.name+"/agent";
})			
.on("click","#tab1,#mtab1",function(){
		$('#chartBox0,#chartBox2,#chartBox3').hide();
		x('#chartBox1').show();
		for(var i in atabs){x('#agentBox'+i).hide();}
		x('#'+this.id).attr('class','but39');
		x('#tab2').attr("class",'but40');
		x('#tab3').attr("class",'but40');
	})
.on("click","#tab2,#mtab2",function(){
		x('#chartBox0,#chartBox1,#chartBox3').hide();
		x('#chartBox2').show();
		for(var i in atabs){x('#agentBox'+i).hide();}
		x('#'+this.id).attr('class','but39');
		x('#tab1').attr('class','but40');
		x('#tab3').attr('class','but40');
	})
.on("click","#tab3,#mtab3",function(){
		x('#chartBox0,#chartBox1,#chartBox2').hide();
		x('#chartBox3').show();
		for(var i in atabs){x('#agentBox'+i).hide();}
		x('#'+this.id).attr('class','but39');
		x('#tab1').attr('class','but40');
		x('#tab2').attr('class','but40');
	})
.on("click","#mtab1,#mtab2,#mtab3",function(){
		location.href='/home';
	})
.on('click','#backtosearch',function(){
location.href=document.referrer;
})
.on("click",'#switchWidth',function(){    //switch width
if (this.className =='switchWidth2'){
	x('.baraLeft').css('display','none')
	x('.baraSmall').addClass('baraLarge').removeClass('baraSmall')
	this.className='switchWidth1';
} else {
	x('.baraLeft').css('display','block')
	x('.baraLarge').addClass('baraSmall').removeClass('baraLarge')
	this.className='switchWidth2';
}
})
.on('click',"button[id^='serviceclient_']",function (){
	var clientid=this.id.replace('serviceclient_','');
	this.remove()
			x('.btn-primary').hide();
			xget({a: 'service_request',b: clientid},function(data){
				if (data !='NO'){
						location.href="/u/"+my.name+"/agent";
				}else if(data =='exist'){
					s.notify('error',dic.REQUEST_EXISTS);
				}
			})
})
//PAY SUSPENDED COLLECT SERVICE 1/2
.on('click',"span[id^='eoiDropText']",function (){
	var id=this.id.replace('eoiDropText','');
	var classif=G.uname !='home' ? x('#classif'+id).val() : x('#classif'+id).text();
	if ($('#eoiDropText'+id).hasClass('norelevant')){
		s.notify('error',dic.NO_PROFILE_AVAILABLE_NOTE+' <b>'+classif+'</b> '+dic.DO_YOU_WISH_CLICK+' <i><b><a href="/u/'+my.name+'">'+dic.NEW_PROFILE+'</a></i></b>')
	}
})
function checkout(orderAmount,orderid,orderDesc,payMethod,type,uid,service,jobid,redirect){
var form ='';
var redirect= !redirect ? 'home' : redirect;
if(G.mode!='register' && orderAmount > 0){
console.log('opening checkout')
x("button[name='submitcheckout']").hide();
form +='<form class="bankPay" name="checkoutroute" id="checkoutroute" method="POST" action="'+SITE_URL+'public/checkout_route.php?act=send" accept-charset="UTF-8" >'+
	'<input type="hidden" name="mid" value="0022002747"/>'+
	'<input type="hidden" name="orderid" value="'+orderid+'"/>'+
	'<input type="hidden" name="orderDesc" value="'+orderDesc+'"/>'+
	'<input type="hidden" name="orderAmount" value="'+orderAmount+'"/>'+
	'<input type="hidden" name="currency" value="EUR"/>'+
	'<input type="hidden" name="billCountry" value="GR"/>'+
	'<input type="hidden" name="billZip" value="175 63"/>'+
	'<input type="hidden" name="billCity" value="Athens"/>'+
	'<input type="hidden" name="billAddress" value="Amfitheas 187"/>';
if(!payMethod){
	form +='<div class="pmethod">'+dic.PAYMENT_METHOD+' <img class="locker" src="/img/pay/locker.png">'+dic.SECURE_CHECKOUT+'</div>' +
		'<div class="payCont"><span class="bankRadio"><input type="radio" name="payMethod" value="mastercard"></span><img class="payMeth" src="/img/pay/diners.png"><span class="payTxt">'+dic.PAY_WITH_CARD+'</span></div>' +
		'<div class="payCont"><span class="bankRadio"><input type="radio" name="payMethod" value="auto:MasterPass"></span><img class="payMeth" src="/img/pay/masterpass.png"><span class="payTxt">'+dic.PAY_WITH_MASTERPASS+'</span></div>' +
		'<img width="100%" src="/img/pay/Aecommerce_AlphaBank_horizontal-transparent.png">';
	// form +='<div class="pmethod">Payment Method <img class="locker" src="/img/pay/locker.png">Secure Checkout</div><div class="payCont"><span class="bankRadio"><input type="radio" name="payMethod" value="visa"></span><img class="payMeth" src="/img/pay/Visa.png"></div>' +
	// '<div class="payCont"><span class="bankRadio"><input type="radio" name="payMethod" value="mastercard"></span><img class="payMeth" src="/img/pay/mastercard.png"></div>' +
	// '<div class="payCont"><span class="bankRadio"><input type="radio" name="payMethod" value="american-express"></span><img class="payMeth" src="/img/pay/american.png"></div>' +
	// '<div class="payCont"><span class="bankRadio"><input type="radio" name="payMethod" value="diners"></span><img class="payMeth" src="/img/pay/diners.png"></div>' +
	// '<div class="payCont"><span class="bankRadio"><input type="radio" name="payMethod" value="auto:MasterPass"></span><img class="payMeth" src="/img/pay/masterpass.png"></div>' +
	// '<div class="payCont"><span class="bankRadio"><input type="radio" name="payMethod" value="maestro"></span><img class="payMeth" src="/img/pay/maestro.png"></div>'+
	// '<img width="100%" src="/img/pay/Aecommerce_AlphaBank_horizontal-transparent.png">';
}else{
	form +='<input type="hidden" name="payMethod" value="'+payMethod[payMethod]+'"/>';
}
var url =G.SITE_URL+redirect+'?service='+service+(!uid ? '':'&uid='+uid)+'&desc='+orderDesc+(!jobid ? '':'&jobid='+jobid)+'&page='+(G.page!=''? G.page:1);
form +='<input type="hidden" name="confirmUrl" value="'+url+'"/>'+
	'<input type="hidden" name="cancelUrl" value="'+SITE_URL+'home"/>'+
	'</form>';
}else{
form +='<input type="hidden" name="orderDesc" value="'+orderDesc+'"/>'+
	'<input type="hidden" name="orderAmount" value="0"/>';
}
if(!type){
$('#checkout').show().html(form)
}else {
return form;
}
}
function checkoutroute(){
var d= x('#checkoutroute').serializeArray();
xpost("/public/checkout_route.php?act=send",d,data=>{x('#checkout').html(data);})    
}
// //classification array for favorite sorting
function getClassif(subclassif,divid){
var	classifid,classif,class_list=[];
// var data=G.subclassif;
return $.get(pathSubclassifJSON,function (data){
//multiple
for(var i in data){
if (subclassif==data[i].id){
	classifid= data[i].clid;
	classif= data[i].cl;
}
}
// console.log(classif)
//provide to dom
x(divid).html(classif);
//console.log(classif);
//if favorite append to sorting
if(G.mode=='favorite'){
	var selected= s.ses('fav_classif')==classifid ? 'selected=selected':'';
	var option='<option '+selected+' id="class_'+classifid+'" value="'+classifid+'">'+classif+'</option>';
	x('#select_favorite:not(:has(#class_'+classifid+'))').append(option);
}
});
}
function getSubclassifArray(subclassifs,divid,specs){
console.log('getSubclassifArray')
// console.log(specs)
// var data= G.professionbyid;
return $.get(pathProfbyidJSON,function (data){
var subcl,arr,array=[],spe=[]
for(var i in data){
	// if(my.grp==1){
	//     if (in_array(data[i].subclassif_id,subclassifs)){
	//         spe.push(data[i].subclassif);
	//     }
	// }else {
	if (specs.includes(i)){
		spe.push(data[i].pf);
	}
	// }
}
// arr=array_unique(array);
// x(divid).text(implode(',',arr)+' > '+implode(',',spe));
var splist= spe.length==0 ? 'None' : spe.join();
x(divid).text(splist);
})
}
function  gsubclassif(value,data,type){
console.log('gsubclassif type:'+type)
if(type=='value_from_subclassif'){var res;}else{var res=[];}
for(var i in data){
if(type=='array_from_subclassif'){
	if (value==data[i].id){
		var classifid=parseInt(data[i].clid);
		break;
	}
}else if(type=='value_from_subclassif'){
	if (value==data[i].id){
		res= parseInt(data[i].clid);
	}
}else if(type=='class_from_subclassif'){
	if (value==data[i].id){
		res= data[i].cl;
	}
}else if(type=='array_from_classif'){
	if(data[i].clid==value){
		res.push(parseInt(data[i].id));
	}
}
}
if(type=='array_from_subclassif'){
for(var i in data){
	if (classifid==data[i].clid){
		res.push(parseInt(data[i].id));
	}
}}
return res;
}
//NEW INSERTS RESET
//	var newposts=0;
//	s.ses('read_posts',0)
//	var read_posts=s.ses('read_posts')
//	var newPostsMessage=x("#newPostsMessage");
/* 	setInterval(function (){
xget(AJAXFOLDER+'home.ajax.php?value=counter',{},function(data){
if (s.ses('read_posts')==0){ s.ses('read_posts',data);}
newposts= data - s.ses('read_posts');
if (newposts > 0){
var hint= newposts==1 ?' new post':' new posts';
if(newPostsMessage.length==0){
$('<div class="newPostsMessage"><div class="setboxgreytop2"><div class="corneredRed"></div><a id="newPostsMessage"><div class="arrow-up"></div></a><div class="corneredGrey2b"><div class="corneredBlueSR2"></div></div></div></div>').prependTo('#wrapper1').show();
}
newPostsMessage.text(newposts+hint);
}else{
newPostsMessage.remove();
}
});
},8000); */
function isContact(uid,postid,name){
var post=typeof postid !='undefined' || postid=='' ? postid :'';
function becontact(val){
var contact=[{0:dic.DELETED_CONTACT},{1:dic.ACCEPTED_CONTACT},{2:dic.FAVORITE_CONTACT},{3:dic.NETWORK_CONTACT},{4:dic.SENT_CONTACT},{5:dic.RECEIVED_CONTACT},{6:dic.PENDING_EOI}];
return '<span id="beContact" class="flagBeContact">'+contact[val][val]+'</span>';
}
xget('?a=contactExist&b='+uid,function(data){
var contactme= post!='' ? $('#contactme'+uid+post) : $('#contactme'+uid);
// console.log(data)
if (data==''){
	contactme.html('<button id="addContact_'+uid+'_'+post+'" class="addContact">'+dic.ADD_CONTACT+'</button>');
}else{
	if(my.grp==2){
		var divlink=$('#profileLink'+uid);
		var link ='<button type="cv" name="'+name+'" anchor="'+uid+'" onclick="gotoprofile(this)" class="gotoprofile moreAp2 morColor3">#'+dic.PROFILE+'</button>';
		divlink.html(link);
	}
	contactme.html(becontact(data));
}
})
}
function stream(uid0,uid,table,tableid){
var iodir="https://dev.speedemployer.gr:3006/index.html?roomid=";
var link=(parseInt(uid0)<parseInt(uid)? uid0+"_"+uid:uid+"_"+uid0)+"_"+table+"_"+tableid;
if(!uid0 || !uid || !table){
}else if(!!s.coo("SpeedemployerStreaming")){ 
	if(s.coo("SpeedemployerStreaming")!=link){
	s.confirm("New straming instance: "+link+". Other streaming instance is opened at room:"+s.coo("SpeedemployerStreaming")+" Do you want to switch rooms?",res=>{
		if(res){
			s.coodel("SpeedemployerStreaming");
			s.coo('SpeedemployerStreaming',link);
			var wo=window.open(iodir+link,link,'location=yes,width='+$(window).width()*0.9+',height='+$(window).height()*0.9+',scrollbars=yes,status=yes,margin-left:auto,margin-right:auto;').focus();
		console.log(wo);
		}
	}
	)
	}else{
		var wo=window.open('', link, '');
		console.log(wo);
	}
}else{
//	if(!local('SpeedemployerStreaming')){

s.coo('SpeedemployerStreaming',link);
api.ma.set(table+" SET inpage"+my.grp+"=1 WHERE id=?",[tableid]);
var wo=window.open(iodir+link,link,'location=yes,width='+$(window).width()*0.9+',height='+$(window).height()*0.9+',scrollbars=yes,status=yes,margin-left:auto,margin-right:auto;').focus();
console.log(wo);
//	}else{
//	local.del('SpeedemployerStreaming');
//	openedWindow.close();
//	}
}
}
/*
function stream(obj){
var exp2=explode(' ',obj.className);
var cameraClass=exp2[1];
var exp= explode('_',exp2[0]);
xget({a:'inpage',b:exp[1]},function(data){
	if(data=='OK'){
		var hint =my.grp==1 ? dic.INPAGE_ALERT2 : dic.INPAGE_ALERT1
		s.notify('error',hint)
	}
})
//if camera is not locked
if (cameraClass !='but52'){
	// location.href='https://'+host+"/inter/stream?iid="+exp[1];
	location.href="/inter/stream?iid="+exp[1];
}
}
*/
function packs(id){
//reset on change membership
$("#membership_upgrade_submit").hide();
var pagegrp= {"candidate":1,"employer":2,"agent":2,"gov":2}
var usergroup=  G.mode=='register' && G.uname=='home' ? 1 : (!s.coo('grp') ? pagegrp[G.mode] : s.coo('grp'))
var packs='';
//d:1 is source agent create account
	console.log({a:'updatePacks',b:id,c:usergroup,d:G.mode,e:G.uname});
$.get('/ajax.php',{a:'updatePacks',b:id,c:usergroup,d:G.mode,e:G.uname},function(data){
if(data!='NO'){
	var width= data.length > 2 ? 100/data.length -1 : 49;
	G.vat=!G.vat ? .21 : G.vat;
	for (var i in data){
		var totalprice =s.roundTo(parseFloat(data[i]["price"])+parseFloat(G.vat)*parseFloat(data[i]["price"]),2);
		var usergroup=['employer','agent','gov'].includes(G.mode) ? 2 : (G.mode=='register' || G.mode=='candidate' ? 1 : my.grp);
		packs +='<input type="hidden" name="duration" id="pack'+data[i].id+'" value="'+data[i].duration+'">'+
			'<input type="hidden" id="usergroup" value="'+usergroup+'">'+
			'<input type="hidden" id="mship'+data[i].id+'" value="'+data[i].license_id+'" name="membership">'+
			'<li style="width: '+width+'%;">' +
			'<input id="packs'+data[i].id+'"  type="radio" name="packs" totalprice="'+totalprice+'" agentype="'+data[i].agentype+ '" value="'+data[i].id+'"/>' +
			'<label for="packs'+data[i].id+'">' +
			'<div class="subscription1">' +
			'<div class="subscriptionTit">'+data[i]['title_'+LANG]+'</div>'+
			'<div class="subscriptionImg"><img src="/img/membership/'+(data[i].img!=""? data[i].img : 'professional')+'.png" width="100%">'+
			'<span id="packOption'+data[i].id+'" class="subscriptionTitle">'+data[i]["pack_"+LANG]+'</span></div>' +
			'<div class="subscriptionTextG">'+data[i]["promo_"+LANG] +'</div>'+
			(G.mode!='register' ? '<div class="priceConT"><div class="priceCon"><span class="priceTxt1">'+dic.NET_PRICE+'</span> <span class="servLicPrice2 price4">'+G.currency[1].name+' '+ data[i]["price"]+'</span></div>':'') +
			(G.mode!='register' ? '<div class="priceCon"><span class="priceTxt2">'+dic.VAT_PRICE+'</span> <span class="servLicPrice2b price4">'+G.currency[1].name+' '+ totalprice+'</span>' +
				'</div></div>':'') +
				'<div class="subscriptionDesc">'+data[i]['desc_'+LANG]+'</div>'+
			'</div></label></li>';
	}
	$('#updatePacks').html('<span class="profileGeneralIdTitle">'+dic.PACK+'<ul class="subscriptionStat-now">'+packs+'</ul></span>');
   // window.scrollTo(0,document.body.scrollHeight);
	if(x('#submitbox').css('display')=='none'){
		x('#submitbox').css('display','block');
	}
	//if one check it
	if(G.mode=='register'){$("input[name=packs]").prop("checked",true);}
	api.ma.my('get',my,['user']);
}else{
   // $('#updatePacks').html(dic.WAITING_APPROVAL_CONTACT_ADMINISTRATOR);
}
},'json');	
}
function packsbut(obj){
	console.log('click packs')
$("#membership_upgrade_submit").show();
var id= obj.id.replace('packs','');
// var mship= $('input[name=membership]:checked').val();
var mship= $('#mship'+id).val();
var totalprice= $(obj).attr('totalprice');
//if(totalprice>0 && !s.coo('SPREGID')){
if(totalprice>0){
	var orderid=hash()+time();
	var desc= $('#packOption'+id).text();
	var uid= G.uname=='register' ? false : my.uid;
	//,affiliate:my.affiliate
//    checkout(totalprice,orderid,desc,null,null,uid,0,mship+'-'+id);
//checkout(orderAmount,orderid,orderDesc,payMethod,type,uid,service,jobid,redirect)
var checkout={};
	checkout.orderid=orderid;
	checkout.orderDesc=desc;
	checkout.orderAmount=totalprice;
	checkout.uid=uid;
	checkout['jobid']=mship+'-'+id;
	checkout['affiliate']=G.uname=='register' ? '' : my.affiliate;
	console.log('saving checkout')
	s.coo('checkout',JSON.stringify(checkout))
	//$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="https://dev.speedemployer.gr/checkout.php"></iframe>');
	console.log('checkout set');
}else{
	console.log('delete checkout');
	if(!!s.coo('checkout')){
   // console.log({a:'delete_invtemp',b:JSON.parse(s.coo('checkout'))['transaction']})
		xget({a:'delete_invtemp',b:JSON.parse(s.coo('checkout'))['transaction']},function(res){                
		s.coodel('checkout');
		})
	}
	//$('#checkout').html('')
	$("button[name='submitcheckout']").show();
}
$('#checkout').hide();		
if(G.mode!='register'){			
window.scrollTo(0,document.body.scrollHeight);
}
}
$(document).on("change","#size",function(){            
	var size2mship={1:5,2:6,3:7};
	if(this.value!=0){                
		packs(size2mship[this.value]);
	}else{
		$('#updatePacks').html('');
	}
})	
function upgrade(){
	//open packs onclick license
	//activate membership submit button
	console.log('running membership_upgrade');
	// $("input[id^='mship']").on("click",function(){
	//     var id=this.id.replace('mship','');
	//packs(id);
	// console.log('mymship:')
	var myshiprange={'candidate':1,'employer':5,'agent':10,'gov':11};
	if(['candidate','employer','agent','gov'].includes(G.mode)){
	var myship=myshiprange[G.mode];
	}else if(typeof my!='undefined'){
	var myship=my.membership;
	}
	if(G.mode=='employer'){
	//CASE OPEN packs at proactivated
	var company_size= $('#size').val();		
	if([2,3].includes(s.coo('SPAUTH')) && parseInt(company_size) > 0){
		var size2mship={1:5,2:6,3:7};
		packs(size2mship[company_size]);			
	}		
	}else{		
	if(G.uname=='register' || G.mode=='register' || G.mode=='upgrade' || (typeof my!='undefined' && my.suspended && G.URL_PAGE!='user')){
	packs(myship);		
	}
	}	
}
$(document).on("click","button[id^='accept_eoi']",function(){
var i=this.id.replace('accept_eoi','');
opener2("sentForm"+i);
})
//ACCEPT EOI EMPLOYEE
.on("click","span[id^='cvid_']",function(){
	var exploded=explode('_',this.id);
	var cvid=exploded[1];
	var eoid=exploded[2];
	var privacy1=exploded[3];
	var message= privacy1=='hidden' ? dic.CVHIDDEN: dic.CVISIBLE;
	var cvname= privacy1 !='hidden' ?  " "+ x('.cvname'+cvid).html() :'';
	s.confirm(message+cvname,result=>{
		if (result){
		xget({a:'acceptEOI',b:cvid,c:eoid,d:privacy1},function(data){
			console.log(data)
		if (data!='NO'){			
		api.ma.N('get',data,['eoi','cont'],d=>{soc.send({type:"N",to:data});});
		api.ma.my("get",data,['user','affee']);
		api.ma.N('get',my,['eoi','cont']);
		//api.ma.N('get',data,['eoi','cont']);	
		x('#eoicard'+eoid).hide();
		s.notify('good',dic.EOI_ACCEPTED)		
		}else{
		s.notify('error',dic.EOI_IS_NOT_ACCEPTED_TRY_LATER)
		}
		});
		}
	})
})
.on("click","#confirmTerms",function(){
	var data=$(this).data();	
	console.log({a:'affiliate_terms',b:data.cid,c:1})
	if (this.checked){				
			xget({a:'affiliate_terms',b:data.cid,c:1},data=>{
				if(G.uname=='eoi'){if(data!='OK'){s.coo('promise_terms',1);}}
				if(G.uname=='mes'){if(G.mode=='reply'){x('#reply_'+whom+'_confirmTerms_'+data.cid).attr('id','chat_'+whom)}else{x('#messageSubmit'+'_confirmTerms_'+data.cid).attr('id','messageSubmit_'+data.cid)}}	
			});
		}else{				
			xget({a:'affiliate_terms',b:data.cid,c:0},data=>{
				if(G.uname=='eoi'){s.coodel('promise_terms');}
				if(G.uname=='mes'){if(G.mode=='reply'){x('#reply_'+whom).attr('id','chat_'+whom+'_confirmTerms_'+data.cid)}else{x('#messageSubmit'+data.cid).attr('id','messageSubmit_'+ '_confirmTerms_'+data.cid)}}
			});
		}
})
.on("click","#loanformallocation",function(){
opener2('locationloanBox');
})
.on("click","button[id^='senteoiid_']",function(){
	var exploded=explode('_',this.id);
	var uid=parseInt($(this).attr('uid'));	
	var cvid=exploded[1];
	var eoid=exploded[2];
	var cid=$('#cid'+eoid).val();
	var privacy1=exploded[3];
	var confirmTerms=exploded[4]; 
console.log(confirmationText(cvid,cid))	
	if (confirmTerms=='confirmTerms' && !s.coo('agent_uid')){
	s.modal({message: confirmationText(cvid,cid),foot:but(dic.PROCEED,function(){
	xget({a:'acceptEOI',b:cvid,c:eoid,d:privacy1},function(data){                                     
	if (data!='NO'){		
		api.ma.N('get',uid,['eoi','cont'],d=>{soc.send({type:"N",to:uid});});
		api.ma.N('get',my.uid,['eoi','cont']);
		s.coodel('skills');
		if(G.uname=='eoi'){x('#eoicard'+eoid).hide();$('#modal').hide();}else{location.reload();}
	}else{
		s.notify('error',dic.EOI_NOT_ACCEPTED);
	}
	});	
	//modalclose();
	})
	});	
	}else{
	xget({a:'acceptEOI',b:cvid,c:eoid,d:privacy1},function(data){
		if (data!='NO'){
			api.ma.N('get',uid,['eoi','cont'],d=>{soc.send({type:"N",to:uid});});
			api.ma.N('get',my.uid,['eoi','cont']);
			s.coodel('skills');
			if(G.uname=='eoi'){$('#modal').hide();x('#eoicard'+eoid).hide();}else{ location.reload()}
		}else{
			s.notify('error',dic.EOI_NOT_ACCEPTED);
		}
		//modalclose();
		});
	}
})
function lockSearch(){
//	xget({a:'buscatC'},function(data){    
$("#searchButton").click(function(){
if(my.grp==2){
	if(my.buscat==0 || my.province==0){
		s.notify('error',dic.MUST_ADD_LOCATION)
	}else {
		if (s.coo('hotleads')==1){
			location.href='/home/manage?page=1';
		} else {
			location.href='/home/search';
		}
	}
}else{
	if(!my.acv){
		s.notify('error',dic.BEFORE_SEARCH)
	}else if(my.province==0){
		s.notify('error',dic.MUST_ADD_LOCATION)
	}else {
		location.href='/home/search';
	}
}
})
}
function toggle_privacy(divid,lockedClass,unlockedClass,set,text1,text2){
if (typeof set =='undefined'){
	if (x('#'+divid).attr('class')==lockedClass){
		s.confirm(dic.SWITCH_PRIVACY_VISIBLE,(result)=>{if (result){x(divid).attr("class",unlockedClass);
		}})
	}else{
		s.confirm(dic.SWITCH_PRIVACY_HIDDEN,(result)=>{if (result){x(divid).attr("class",lockedClass);}})
	}
}else{
	if (set==1){
		$('#'+divid).attr('class',unlockedClass);
	}	else if (set==0){x('#'+divid).attr('class',lockedClass)}
}
}
//visibility index
//close submit is checked
$(document).on("click","input[id^='packs']",function(){
packsbut(this)
})
//CONTACT+PROFILE PRICAVY SETTINGS
.on('click',"span[id^='messageallowed_']",function(){
var exp=explode('_',this.id),cid=exp[1],privacySet=exp[2]==1 ? 0 : 1,divid='messageallowed_'+cid+'_'+privacySet;
this.setAttribute('id',divid);
if ($('#'+divid).attr('class')=='messagesHidden'){
	var mes= my.grp==2 ? dic.SWITCH_MESSAGES_VISIBLE2 : dic.SWITCH_MESSAGES_VISIBLE;
	s.confirm(mes,(result)=>{if (result){
		$('#'+divid).attr('class','messagesVisible');
		xget({a:"messageallowed",b:cid,c:privacySet},function(data){
			console.log(data);
		});
	}})
}else{
	var mes= my.grp==2 ? dic.SWITCH_MESSAGES_HIDDEN2 : dic.SWITCH_MESSAGES_HIDDEN;
	s.confirm(mes,(result)=>{if (result){
		$('#'+divid).attr('class','messagesHidden');
		xget({a:"messageallowed",b:cid,c:privacySet},function(data){
			console.log(data);
		});
	}})
}
})
.on('click',"span[id^='neweoiallowed_']",function(){
var exp=explode('_',this.id);
var cid=exp[1];
var privacySet=exp[2]==1 ? 0 : 1;
var divid='neweoiallowed_'+cid+'_'+privacySet;
this.setAttribute('id',divid);
if ($('#'+divid).attr('class')=='eoiHidden'){
	var mes= my.grp==2 ? dic.ALLOW_SENDING_EOI_FROM_CONTACT2 : dic.ALLOW_SENDING_EOI_FROM_CONTACT;
	s.confirm(mes,(result)=>{if (result){
		$('#'+divid).attr('class','eoiVisible');                
		xget({a:'neweoiallowed',b:cid,c:privacySet},function(data){
			console.log(data)
		});
	}})
}else{
	var mes= my.grp==2 ? dic.BLOCK__EOI_FROM_CONTACT2 : dic.BLOCK__EOI_FROM_CONTACT;
	s.confirm(mes,(result)=>{if (result){
		$('#'+divid).attr('class','eoiHidden');                
		xget({a:'neweoiallowed',b:cid,c:privacySet},function(data){
			console.log(data)
		});
	}})
}
})
.on('click',"span[id^='privacyname_']",function(){
var exp=explode('_',this.id);
var cid=exp[1];
var privacySet=exp[2]==1 ? 0 : 1;
var divid='privacyname_'+cid+'_'+privacySet;
this.setAttribute('id',divid);
if ($('#'+divid).attr('class')=='nameHidden'){
	s.confirm(dic.SWITCH_NAME_VISIBLE,(result)=>{if (result){
		$('#'+divid).attr('class','nameVisible');
		xget({a:'contfullnameP',b:cid,c:privacySet});
	}})
}else{
	s.confirm(dic.SWITCH_NAME_HIDDEN,(result)=>{if (result){
		x('#'+divid).attr('class','nameHidden');
		xget({a:'contfullnameP',b:cid,c:privacySet});
	}})
}
})
.on('click',"span[id^='mailtel_']",function(){
var exp=explode('_',this.id);
var cid=exp[1];
var privacySet=exp[2]==1 ? 0 : 1;
var divid='mailtel_'+cid+'_'+privacySet;
this.setAttribute('id',divid);
if ($('#'+divid).attr('class')=='telMailHidden'){
	s.confirm(dic.MAILTEL_VISIBLE,(result)=>{if (result){
	   $('#'+divid).attr('class','telMailVisible');
		xget({a:'mailtelP',b:cid,c:privacySet});
	}})
}else{
	s.confirm(dic.MAILTEL_HIDDEN,(result)=>{if (result){
		$('#'+divid).attr('class','telMailHidden');
		xget({a:'mailtelP',b:cid,c:privacySet});
	}})
}
})
.on('click',"button[id^='privacy2_']",function(){
var exp=explode('_',this.id);
var cid=exp[1];
var privacySet=exp[2]==1 ? 0 : 1;
var divid='privacy2_'+cid+'_'+privacySet;
this.setAttribute('id',divid);
if (x('#'+divid).attr('class')=='photosHidden'){
	s.confirm(dic.SWITCH_PHOTOS_VISIBLE,(result)=>{if (result){
		x('#'+divid).attr('class','photosVisible');
		console.log({a:'privacy'+my.grp,b:cid,c:privacySet})
		xget({a:'privacy'+my.grp,b:cid,c:privacySet},function(data){console.log(data)});
	}})
}else{
	s.confirm(dic.SWITCH_PHOTOS_HIDDEN,(result)=>{if (result){
		x('#'+divid).attr('class','photosHidden');
		xget({a:'privacy'+my.grp,b:cid,c:privacySet});
	}})
}
})
.on("keyup change","input[class^='rank2_']",function(){
	var exp=this.className.replace('rank2_','');
	var cid= explode(' ',exp)[0];
	if (!parseInt(this.value) || this.value < 0 || this.value > 100){
		s.notify('error',dic.NON_NUMERIC_VALUE_NOT_ALLOWED); this.value='';
	}else{
		xget('?a=rank'+my.grp+'&b='+cid+'&c='+this.value);
		$('.ast'+cid).removeClass().addClass('ast'+cid+' star'+roundrank(this.value));
	}
})

//visibility index
.on('click',"button[id^='privacyIndex_']",function(){
	var exp=explode('_',this.id);
	var id=exp[1];
	if(exp[3]=='1'){
		s.notify('warn',dic.ADVERTISEMENTS_HAVE_OPEN_PRIVACY)
	}else{
	var privacySet=exp[2]==1 ? 0 : 1,divid='privacyIndex_'+id+'_'+privacySet;
	this.id=divid;
	if ($('#'+divid).attr('class')=='visibilityRedLock'){
		$('#'+divid).attr('class','visibilityRed');
	}else{
		$('#'+divid).attr('class','visibilityRedLock');
	}
	xget('?a=visibility&b='+id+'&c='+privacySet,d=>{
		console.log(d)
	});
	}
})
.on("click","button[id^='eoiprivacyIndex_']",function(){	
var exp=explode('_',this.id);
var id=exp[1];
var privacySet=exp[2]=='1' ? 0 : 1;
var divid='eoiprivacyIndex_'+id+'_'+privacySet;
this.setAttribute('id',divid);
//console.log({a:'visibilityEOI',b:id,c:privacySet})
if (exp[2]==0){
	s.confirm(dic.SWITCH_PRIVACY_VISIBLE1,(result)=>{if(result){
		x('#'+divid).attr('class','visibilityRedCont');
		$.post("/ajax.php",{a:'visibilityEOI',b:id,c:privacySet},d=>{
		console.log(d)
	});
	}})
}else{
	s.confirm(dic.SWITCH_PRIVACY_HIDDEN1,(result)=>{if(result){
		x('#'+divid).attr('class','visibilityRedLockCont');
		$.post("/ajax.php",{a:'visibilityEOI',b:id,c:privacySet},d=>{
		console.log(d)
	});
	}})
}
})
//visibility privacy attach
.on("click","button[id^='privacyAttach_']",function(){
var exp=explode('_',this.id);
var id=exp[1];
var privacySet=exp[2]==1 ? 0 : 1;
var divid='privacyAttach_'+id+'_'+privacySet;
this.setAttribute('id',divid);
if (x('#'+divid).attr('class')=='attachEoiLock'){
	s.confirm(dic.SWITCH_PRIVACY_VISIBLE,(result)=>{if (result){
		x('#'+divid).attr('class','attachEoi');
		xget({a:'privacyAttach',b:id,c:privacySet},d=>{console.log(d)
		x('#'+divid).text(dic.HIDE_ATTACHMENTS)
		});		
	}})
}else{
	s.confirm(dic.SWITCH_PRIVACY_HIDDEN,(result)=>{if (result){
		x('#'+divid).attr('class','attachEoiLock');
		xget({a:'privacyAttach',b:id,c:privacySet},d=>{console.log(d)
		x('#'+divid).text(dic.SHOW_ATTACHMENTS)
		});		
	}})
}
})
.on("click","a[id^='delAttach_']",function(){
var exp=explode('_',this.id);
var attachid=exp[1];        
xget({a:'delAttach',b:attachid});
x('#attach_'+attachid).hide();
})
.on("keyup",'#authCode',function(){
if (this.value!=''){
$.get('/ajax.php',{a:'check_auth',b:this.value},function(data){
	if(data.error_code==0){
		$("#registrationSub").html('<span style="width:100%;float:left;">'+dic.AUTH_CODE_VALID+'</span> <b style="width:100%;float:left;">'+data.company_name+'</b>')
		s.coo('SPAFFAUTH',JSON.stringify(data))
		packs(1);
		$('#authCode').prop('disabled',true);
		$('#authCodeBut').prop('disabled',true);
	}else{
		$("#aff_hint").text(dic[data.error]);
		$("#registrationSubmit").html("Register")
		s.coodel('SPAFFAUTH');
	}
},"json");
}else{
$("#aff_hint").text("");
$("#registrationSubmit").html("Register");
}
})
.on("click","#newPostsMessage",function(){    //onclick new_interts
s.ses('read_posts',0);
this.remove();
redirect_page();reset('wrapper1');
 tktloop(); 
})
.on("click","button[class*='stream_']",function(){
	stream(this)
})
.on("click","input[name='payMethod']",function(){
x("button[name='submitcheckout']").show();
})
function activeMenu(){
var pageclass= G.uname=='' ? 'Home' : ucfirst(G.uname);
if(my.uid !='' && G.uname!='potential'){
if(G.uname==''){
	var classname='menuconActive';$('#home').attr('class','but20Active');
}else{
	var classname='menuconActive'+(G.uname=='support'?'2':'');
	if(G.mode=='chat'){
	   $('.but42').attr('class','but42Active');
		$('#message').removeClass('speed'+pageclass+'Active').parent().removeClass('menuconActive');
	}else if(G.uname !="notifications"){
		 $('#'+G.uname).attr('class','speed'+ucfirst(G.uname)+(G.uname =='support' && G.mobile==false ? 'Top' : '')+'Active');
	}
}
}   
}
function postView(){
//sendEOI();
if (typeof my.uid !='undefined' || typeof my.grp !='undefined'){
opener2('backTo');
}
//SEND EOI
/* 	$(document).on('click',"span[id^='sendEOIbutton']",function(){
var id=this.id.replace('sendEOIbutton','');
s.ses('send_eoi',id);
opener2("sentForm"+id);
}) */
}
function block(obj){
var postid,divid,divids=[];
var exp=explode('_',obj.id);
var uid=exp[1];
var privacySet=exp[2]==1 ? 0 : 1;
if(G.mode !='user' && G.uname!='potential' && G.uname!='cont'){
	$("li[id^='block_"+uid+"_"+exp[2]+"']").each(function(){
		var exp=explode('_',obj.id);
		postid=exp[3];
		divid='block_'+uid+'_'+privacySet+'_'+postid;
		obj.setAttribute('id',divid);
		divids.push(divid);
	})
}else{
	divid='block_'+uid+'_'+privacySet;
	obj.setAttribute('id',divid);
}
if(G.mode !='user' && G.uname!='potential'  && G.uname!='cont'){
	var first=divids[0];
	if ( x('#'+first).attr('class')=='visibilityRedSearchLock'){
		s.confirm(dic.SWITCH_PRIVACY_VISIBLE,(result)=>{if (result){
			for(var i in divids){
				x('#'+divids[i]).attr('class','visibilityRedSearch');
			}
			xget({a:'blockUser',b:uid,c:'privacySet'});
		}})
	}else{
		s.confirm(dic.SWITCH_PRIVACY_HIDDEN,(result)=>{if (result){
			for(var i in divids){
				x('#'+divids[i]).attr('class','visibilityRedSearchLock');
			}
			console.log({a:'blockUser',b:uid,c:privacySet});
			xget({a:'blockUser',b:uid,c:privacySet},d=>{
				console.log(d)
			});
		}})
	}
}else{
	var total= parseInt(x('#total_blocked').text());
	var actual_potential= parseInt(x('#actual_potentiala').text());
	var classname= x('#'+divid).attr('class');
	if (classname=='potentialLock' || classname=='eyeHidden'){
		s.confirm(dic.WISH_UNBLOCK_USER,(result)=>{if (result){
			if(classname=='potentialLock'){
				x('#'+divid).attr('class','potentialUnlock').text(dic.LINK_ACCEPTED);
			}else{
				if(G.mode =='user'){$('#eyehint'+uid).css('display','none');}
				x('#'+divid).attr('class','eyeVisible');
			}
			console.log({a:'blockUser',b:uid,c:privacySet});
			xget({a:'blockUser',b:uid,c:privacySet});
			if(G.uname=='potential'){
				x('#text'+uid).html('');
				x('#subtext'+uid).show();
			}
			x('#total_blocked').text(total - 1);
			x('#actual_potentiala').text(actual_potential+1);
			x('#actual_potentialb').text(actual_potential+1);
		}})
	}else{
		var mes= G.uname=='cont' || G.mode =='user' ? dic.EYE_HIDDEN1 : dic.WISH_BLOCK_USER;
		s.confirm(mes,result=>{if (result){
			if(classname=='potentialUnlock'){
				x('#'+divid).attr('class','potentialLock').text(dic.LINK_SEVERED);
			}else{
				if(G.mode =='user'){$('#eyehint'+uid).css('display','block');}
				x('#'+divid).attr('class','eyeHidden');
			}
			console.log({a:'blockUser',b:uid,c:privacySet});
			xget({a:'blockUser',b:uid,c:privacySet});
			if(G.uname=='potential'){
				if(x('#text'+uid).text()==dic.DEFAULT_TEXT || $('#subtext'+uid).text()==dic.DEFAULT_TEXT){
					x('#text'+uid).html(dic.BLOCKED_TEXT);
					x('#subtext'+uid).hide();
				}
			}
			x('#total_blocked').text(total+1);
			x('#actual_potentiala').text(actual_potential - 1);
			x('#actual_potentialb').text(actual_potential - 1);
			// s.notify('error',dic.EYE_HIDDEN2);
		}})
	}
}
}
/*
* G AGENTS.JS
* */
$(document).on('click',"li[id^='block_'],button[id^='block_']",function(){
block(this)
})
.on("click","#createaccount",function(){
//var off=parseInt($('#register').offset().top);
//$("html,body").scrollTop(off)
if(G.ui==1){
document.getElementById('register').scrollIntoView({behavior:'smooth'})			 
}				
})
//MOVETOHTML 
/*
.on('keyup',"input[class*='rank"+my.grp+"_']",function(){
var cid=this.className.replace('rank'+my.grp+'_','').replace('rankRefField','').trim();
if (!parseInt(this.value) || this.value < 0 || this.value > 100){
s.notify('error',dic.NON_NUMERIC_VALUE_NOT_ALLOWED);this.value='';
}else{
xget('?a=rank'+my.grp+'&b='+cid+'&c='+this.value,"/ajax.php");$('.ast'+cid).removeClass().addClass('ast'+cid+' star'+roundrank(this.value));$(".rank"+my.grp+"_"+cid).val(this.value);}})
*/
.on("click","button[id^='gotocontact']",function(){
var id=this.id.replace('gotocontact','');
xget({a:'gotocontact',b:id},function(data){
location.href='/cont/'+data+'?cid='+id;
})
})
.on('click',"input[id^='affiliateTermsInput_']",function(){
affterms(this)
})
.on("click",".but48,button[id^='relupdate']",function(){
var uid=this.id.replace('relupdate','');
rel(G.ui,uid);
})
.on("keyup","#rel",function(){
s.ses('relq',$('#rel').val().trim());
ses.del('relsub');
rel(G.ui);
})
.on("click","[id^='relsub']",function(){
var exp= explode('_',this.id);
s.ses('relsubli',exp[1]);
})
.on("click","span[id^='relbuteois_'],span[id^='relbutiviews_'],span[id^='relbutmes_']",function(){
console.log('sub runnign')
var repl= this.id.replace('relbut','');
var exp= explode('_',repl);
$('.relsubs').hide();
$('#rel'+exp[0]+exp[1]).show();
s.ses('relsub',exp[0]+exp[1]);
})
.on("click",".but49",function(){
$('#wrapper2').html('');
$('#rel').val('');
ses.del('relsub');
ses.del('relsubli');
ses.del('relq');
})
.on('click',"a[id^='delAttach_']",function(){
var exp=explode('_',this.id);
var attachid=exp[1];
xget({a:'delAttach',b:attachid},function(res){
	if(res=='OK'){$('#attach_'+attachid).hide();}
});
})
//**********RESET COOKIES*************/
//update coos sortings
function updateSort(sortSort,prefix){
var mode=G.mode !='' ? '_'+G.mode : '';
var pref=typeof prefix !='undefined' ? '_'+prefix : '';
var cookiename='sort_'+G.uname+mode+pref;
s.coo(cookiename,sortSort);
return true;
}
function reset_filters_contact(){
var contacookies= ['sort_contact','sort_contact_'+G.mode+'_sub','cid','cid_accepted','cid_network','cid_favorite'];
for(var i in contacookies){s.coodel(contacookies[i]);}
}
function reset_filters_eoi(){
s.coodel(['selectedPost','sort_eoi_subclass_'+G.mode,'sort_eoi_'+G.mode,
'sort_eoi_'+G.mode+'_sub','exp_years','exp_id','edu_level1',
'edu_grade1','edu_insti','city','skills','agerange','sedutype']);
$('#selectedPost').val('');$('#eoisedutype').val(0);
$('#exp_years').val(0);$('#exp_id').val(0);$('#edu_level1').val(0);
$('#edu_insti').val(0);$('#city').val(0);$('#skills').val(0);$('#agerange').val(0);
}
function rel(mode,uid,q){
var html='';
var contact_rms= {1: 'accepted',0:'deleted',2: 'favorite',3:'network',5:'received',4:'sent',6:"pending"};
var eoi_rms= {0:'deleted',1: 'sent',2:'received',3:'accepted',4: 'favorite'};
var message_rms= {0:'deleted',1:'inbox',2:'sent',3:'important'};
var q= !!q ? q : $('#rel').val().trim();
var crit= {a:'rel',q:q,mode:mode};
if(uid!=null){crit['reluid']=uid;}
xget(crit,function(data){
	console.log(data)
if (data!="NO"){
	if(G.ui==1){
		for (var i in data){		
			var eois=!data[i].eoi ? '' : data[i].eoi;
			var iviews=!data[i].inter ? '' : data[i].inter;
			var mes=!data[i].mes ? '' : data[i].mes;			
			var chat=!data[i].chat ? '' : data[i].chat[0];
			var cont=data[i].contact;
			cont.datum=my.grp==1 ? date("Y-m-d",cont.modified1) : date("Y-m-d",cont.modified2);
			cont.status=my.grp==1 ? cont.status1 : cont.status2;
			html +='<li id="relmain'+i+'" class="has-sub"> ' +
				'<div class="relName">' +
				'<a href="/u/'+cont.name+'" class="relName1"><img src="'+cont.img+'" width="20"><span class="relName2">'+cont.fullname+'</span></a> ';
			if(cont.status!=6){
				html +='<button onclick="reset_filters_contact();location.href=&quot;/cont/'+contact_rms[cont.status]+'?cid='+i+'&quot;" class="relName1a">' +
					'<span class="relCont"></span><span class="relInfo">'+contact_rms[cont.status]+'</span></button>';
			}else{
				html +='<span class="relCont"></span><span class="relInfo">'+contact_rms[cont.status]+'</span>';
			}
				html +='</div>'+
				(eois !=='' ? '<span id="relbuteois_'+i+'" class="relEoi"><em class="c_Top cblue">'+sizeobj(eois)+'</em></span>' : '') +
				(iviews !='' ? '<span id="relbutiviews_'+i+'" class="relInt"><em class="c_Top cblue">'+sizeobj(iviews)+'</em></span>' : '') +
				(!!mes ? '<span cvid="0" onclick="mesmenu('+i+','+(my.grp==2 ? cont.uid1 : cont.uid2)+','+i+',this)" class="relMes '+data[i].confirm_terms+'"></span><div class="mesmenu" id="mesmenu1'+i+'" style="display:none;"></div>':'')+
				//'<button class="but130" data-uid="'+my.uid+'" data-uid0="'+(my.grp==2 ? cont.uid1 : cont.uid2)+'" data-mode="'+G.ui+'" id="chat_'+i+'" title="Chat"><div class="totalChatNum chatc_'+i+'"></div></button>'+
				(chat !='' ? '<a href="/mes/chat/relsub"><span class="relCh"><em class="c_Top cblue">'+(my.grp==1 ? chat.status1 : chat.status2)+'/'+chat.type+'</em></span></a>' : '') +
				'<div class="relsubon"><img src="/img/arrowHelp3.png" class="subrelar"/>';
			if (eois !=''){
				html +='<ul id="releois'+i+'" class="relsubs" style="display:none">';
				for (var e in eois){
					var link=eois[e].postcode+eois[e].posttitle+' vs '+eois[e].cvtitle;
					var estatus=my.grp==1 ? eois[e].eoistatus1 : eois[e].eoistatus2;
					var modified=my.grp==1 ? eois[e].modified2 : eois[e].modified1;
					var datum=[1,2].includes(estatus) ? date("Y-m-d H:i",eois[e].created) : (estatus==0 ? date("Y-m-d H:i",modified) : (date("Y-m-d H:i",(!eois[e].accepted ? modified: eois[e].accepted))));
					html +='<li id="relsubeois'+i+'_'+eois[e].cid+'" class="subLi">' +
						'<button onclick="reset_filters_eoi();location.href=&quot;/eoi/'+eoi_rms[estatus]+'?eid='+e+'&quot;">' +
						'<span class="rel'+eoi_rms[estatus]+'">' +
						'<span class="subLiTxt3">'+G.eoi_status[estatus] +
						(my.grp==2 && typeof(eois[e].status)!='undefined' ? '<span style="background:'+G.iColorFlags[eois[e].status]+'" class="relstatus">'+G.INTERVIEWS.status3[eois[e].status]+'</span>' : '') +
						'<span class="relre">'+link+'</span><span class="reldate">'+datum+'</span></span></span></button></li>';
				}
				html +='</ul>';
			}
			if (iviews !=''){
				html +='<ul id="reliviews'+i+'" class="relsubs" style="display:none">';
				html +='<li class="subLi"><a id="relsubiviews'+i+'_o" onclick="s.gotorel(&quot;interview_'+(my.grp==2 ? cont.uid1 : cont.uid2)+'&quot;)" class="subLia"><span class="relInt"></span><span class="subLiTxt2">User Interview Page</span></a></li>';
				for (var j in iviews){
					var eoid=iviews[j].status2;
					var link=!iviews[j].postcode ? 'contact' : iviews[j].postcode+iviews[j].posttitle+' vs '+iviews[j].cvtitle;
					var type=G.itype[iviews[j].type];
					var start=date("Y-m-d H:i",iviews[j].start);
					html +='<li id="relsubiviews'+i+'_'+iviews[j].cid+'" class="subLi"><a href="/inter?iid='+iviews[j].id+'">' +
						'<span style="background-color:'+G.iColorFlags[iviews[j].status]+'" class="flag4">'+G.INTERVIEWS.status3[iviews[j].status]+'</span>' +
						'<span class="subLiTxt">'+type+'<span class="relre">'+link+'</span>'+'<span class="reldate">'+start+'</span></span></a></li>';
				}
				html +='</ul>';
			}
		}	
		if (mes !=''){
			html +='<ul id="relmes'+i+'" class="relsubs" style="display:none">';
			for (var m in mes){
				var status=my.grp==1 ? mes[m].status1 : mes[m].status2;
				var datum=date('Y-m-d H:i',mes[m].time2);
				html +='<li id="relsubmes'+i+'_'+mes[m].tblid+'"  class="subLi"><a href="/mes/'+message_rms[status]+'/'+mes[m].tblid+'">' +
					'<span class="relMes"></span><span class="subLiTxt"><span class="relre">'+mes[m].detail+'</span>' +
					'<span class="reldate">'+datum+'</span></span></a></li>';
			}
			html +='</ul>';
		}
	}else{ //G.uid other than 1
			for (var i in data){		
			var eois=!data[i].eoi ? '' : data[i].eoi;
			var iviews=!data[i].inter ? '' : data[i].inter;
			var mes=!data[i].mes ? '' : data[i].mes;			
			var chat=!data[i].chat ? '' : data[i].chat[0];
			var cont=data[i].contact;
			cont.datum=my.grp==1 ? date("Y-m-d",cont.modified1) : date("Y-m-d",cont.modified2);
			cont.status=my.grp==1 ? cont.status1 : cont.status2;
			html +='<li id="relmain'+i+'" class="has-sub"> ' +
				'<div class="relName">' +
				'<a href="/u/'+cont.name+'" class="relName1"><img src="'+cont.img+'" width="20"><span class="relName2">'+cont.fullname+'</span></a> ';
			if(cont.status!=6){
				html +='<button onclick="reset_filters_contact();location.href=&quot;/cont/'+contact_rms[cont.status]+'?cid='+i+'&quot;" class="relName1a">' +
					'<span class="relCont"></span><span class="relInfo">'+contact_rms[cont.status]+'</span></button>';
			}else{
				html +='<span class="relCont"></span><span class="relInfo">'+contact_rms[cont.status]+'</span>';
			}
				html +='</div>'+
				(eois !=='' ? '<span id="relbuteois_'+i+'" class="relEoi"><em class="c_Top cblue">'+sizeobj(eois)+'</em></span>' : '') +
				(iviews !='' ? '<span id="relbutiviews_'+i+'" class="relInt"><em class="c_Top cblue">'+sizeobj(iviews)+'</em></span>' : '') +				
				'<button class="but130" data-uid="'+my.uid+'" data-uid0="'+(my.grp==2 ? cont.uid1 : cont.uid2)+'" data-mode="'+G.ui+'" id="chat_'+i+'" title="Chat"><div class="totalChatNum chatc_'+i+'"></div></button>'+
				(chat !='' ? '<a href="/mes/chat/relsub"><span class="relCh"><em class="c_Top cblue">'+(my.grp==1 ? chat.status1 : chat.status2)+'/'+chat.type+'</em></span></a>' : '') +
				'<div class="relsubon"><img src="/img/arrowHelp3.png" class="subrelar"/>';
			if (eois !=''){
				html +='<ul id="releois'+i+'" class="relsubs" style="display:none">';
				for (var e in eois){
					var link=eois[e].postcode+eois[e].posttitle+' vs '+eois[e].cvtitle;
					var estatus=my.grp==1 ? eois[e].eoistatus1 : eois[e].eoistatus2;
					var modified=my.grp==1 ? eois[e].modified2 : eois[e].modified1;
					var datum=[1,2].includes(estatus) ? date("Y-m-d H:i",eois[e].created) : (estatus==0 ? date("Y-m-d H:i",modified) : (date("Y-m-d H:i",(!eois[e].accepted ? modified: eois[e].accepted))));
					html +='<li id="relsubeois'+i+'_'+eois[e].cid+'" class="subLi">' +
						'<button onclick="reset_filters_eoi();location.href=&quot;/eoi/'+eoi_rms[estatus]+'?eid='+e+'&quot;">' +
						'<span class="rel'+eoi_rms[estatus]+'">' +
						'<span class="subLiTxt3">'+G.eoi_status[estatus] +
						(my.grp==2 && typeof(eois[e].status)!='undefined' ? '<span style="background:'+G.iColorFlags[eois[e].status]+'" class="relstatus">'+G.INTERVIEWS.status3[eois[e].status]+'</span>' : '') +
						'<span class="relre">'+link+'</span><span class="reldate">'+datum+'</span></span></span></button></li>';
				}
				html +='</ul>';
			}
			if (iviews !=''){
				html +='<ul id="reliviews'+i+'" class="relsubs" style="display:none">';
				html +='<li class="subLi"><a id="relsubiviews'+i+'_o" onclick="s.gotorel(&quot;interview_'+(my.grp==2 ? cont.uid1 : cont.uid2)+'&quot;)" class="subLia"><span class="relInt"></span><span class="subLiTxt2">User Interview Page</span></a></li>';
				for (var j in iviews){
					var eoid=iviews[j].status2;
					var link=!iviews[j].postcode ? 'contact' : iviews[j].postcode+iviews[j].posttitle+' vs '+iviews[j].cvtitle;
					var type=G.itype[iviews[j].type];
					var start=date("Y-m-d H:i",iviews[j].start);
					html +='<li id="relsubiviews'+i+'_'+iviews[j].cid+'" class="subLi"><a href="/inter?iid='+iviews[j].id+'">' +
						'<span style="background-color:'+G.iColorFlags[iviews[j].status]+'" class="flag4">'+G.INTERVIEWS.status3[iviews[j].status]+'</span>' +
						'<span class="subLiTxt">'+type+'<span class="relre">'+link+'</span>'+'<span class="reldate">'+start+'</span></span></a></li>';
				}
				html +='</ul>';
			}
		}	
		if (mes !=''){
			html +='<ul id="relmes'+i+'" class="relsubs" style="display:none">';
			for (var m in mes){
				var status=my.grp==1 ? mes[m].status1 : mes[m].status2;
				var datum=date('Y-m-d H:i',mes[m].time2);
				html +='<li id="relsubmes'+i+'_'+mes[m].tblid+'"  class="subLi"><a href="/mes/'+message_rms[status]+'/'+mes[m].tblid+'">' +
					'<span class="relMes"></span><span class="subLiTxt"><span class="relre">'+mes[m].detail+'</span>' +
					'<span class="reldate">'+datum+'</span></span></a></li>';
			}
			html +='</ul>';
		}
	}
	html +='</div></li>';
$('#wrapper2').html('<ul id="relnav1" class="relresults">'+html+'</ul>');
var rels=s.ses('relsub');
var reli=s.ses('relsubli');
if (!!rels){
	$('#rel'+rels).show();
	$('#relsub'+rels).css('opacity','1');
	if (!!reli){$('#relsub'+rels+'_'+reli).addClass('subsel');}
}
}else{
	$('#wrapper2').html('');
}
x('#relnav1').show();
},'json');
}
function affterms(obj){
var id=obj.id;
var status=$(obj).filter(':checked').val() =='on' ? 1 : 0;
var cid=obj.id.replace('affiliateTermsInput_','');
//var senteoibut= $("button.acceptEoiButton_a").closest('#eoicard'+cid).attr('id');
// console.log(parent);
//  console.log(senteoibut);
//  s.confirm(dic.ACCEPT_TERMS_CONDITIONS,function(result){
	//if (result){				
		xget({a: 'affiliate_terms',b: cid,c: status},function(data){
			if (data =='OK'){
				if(G.mode=='received'){
					var senteoibut=$('#'+id).parent().find('.acceptEoi_container3 > .acceptEoiButton_a').attr('id')
					if (senteoibut.indexOf("_confirmTerms") !== -1){
						var newid=senteoibut.replace("_confirmTerms",'');
						$('#'+senteoibut).attr('id',newid)
					}
					var newid=senteoibut.replace("_confirmTerms",'');
					$('#'+senteoibut).attr('id',newid)
				}
				toggledit('#affiliateTermsInputBox_'+cid,'#affiliateTermsRead_'+cid);
				toggledit('#affiliateTermsInputBox_'+cid,'#affiliateTermsRead_'+cid);
			}
		})
   // }else{
  //      $('#'+id).prop("checked",false);
  //  }
//   })
}
function supermenu(){
//RULES my.grp==1 ? 3: 6
//my.grp==1 || $_COOKIE['sid']=="0" => 5	//my.grp==2
var supermenu ='<div class="mainUlMenuArrow"></div>Select Network';
if(typeof(my.author)!='undefined' && [3,4,5].includes(my.author.level)){
var htmlist=[3,4,7,8,9,10];
}else{
var htmlist=[my.grp,(my.grp==1 ? 6:3),4,7,8,9,10];
}
if(my.grp==1){htmlist.push(5)}
for(var i in htmlist){	
supermenu +=G.apphtmls[htmlist[i]]	
}$('#supermenu').html(supermenu);
opener('supermenu')
}
$(document)
.on("click",".nbarlink",function(){
var attr1=this.getAttribute('attr1');
var attr10=this.getAttribute('attr10');
if(G.URL_PAGE=='eoi' && mode!=attr10){for(var r in reset_cookies){s.coodel(reset_cookies[r]);}}
else if(this.id==6){s.coodel('inter_page');s.ses('i_status',3);ses.del('i_status_param');}
else if(this.id==7){s.coodel('inter_page');s.ses('i_status',4);ses.del('i_status_param');}
else if(this.id==8){s.coodel('inter_page');s.ses('i_status',5);ses.del('i_status_param');}
//suspend prevent mes/chat
if(this.id==12 || this.id==13){
	s.coodel('mesid');s.coodel('mesuid');
if(my.suspended){
s.confirm(dic.SUSPENDED_ACCOUNT4,function(res){if(res){location.href=SITE_URL+'u/'+my.name+'/upgrade';}})
}else{
location.href=attr1;
}
}else{
location.href=attr1;
}
})	
.on("click","button[id^='edupanelbut']",function(){
var id=this.id.replace('edupanelbut','');
if(x('#edupanel'+id).css('display')=="none"){
$.get('/ajax.php',{a: 'edu',b: id},function(data){
	x('#edupanel'+id).html(data);
	opener('edupanel'+id);
},'json')
}else{
x('#edupanel'+id).hide();
}
})
.on("click","button[id^='expanelbut']",function(){
var id=this.id.replace('expanelbut','');
if(x('#expanel'+id).css('display')=="none"){
xget({a:'expanel',b:id},function(data){
	x('#expanel'+id).html(data)
	opener('expanel'+id);
})
}else{
x('#expanel'+id).hide();
}
})
.on("change","select[id^='reason']",function(){
var id=this.id.replace('reason','');
xget({a:'intereason',b:this.value,c:id},function(data){console.log(data)})
})
function setapp(id,dir){
$.get('/ajax.php',{a:"setapp",b:id},res=>{			
	s.coo('customapp',id);	
	//reset filters 
	var ss=Object.keys(s.ses()).filter(v=>/^s_/.test(v));for(var i in ss){ses.del(ss[i])};
	s.ses('s_mode',G.searchfiles[G.app])
	if(!dir){if(G.uname=='home'){location.reload()}else{location.href='/home';}}else{location.href=dir;}
})
}
//*********************LOGIN**************************//
// 'use strict';
/*
@Home Page -- LOGIN
developed by Nikos Drosakis
31-2-2021 UPDATE LOGIN - EXCLUDE MONGO MY+COUNTER 
on loginwith save cache with php 
on login save cache-enter 
*/
function authorlogin(id){	
var authorid=x('#author'+id).val();
if(authorid.length==0){
x('#author'+id).show();
}else{	
api.ma.getOne("* FROM author WHERE pass=? AND id=?",[authorid,id],d=>{
if(d!='NO'){
x('#authorid'+id).addClass('doorLoader');
login(d.uid);
}else{
s.modal("Mistaken password");	
}
});	
}
x('#author'+id).focus();
}
function forgot(){
var message=dic.FORGOT_DETAILS+"<div><input type='text' placeholder='email address' id='forgotmail' class='bootBoxes'><input id='name' placeholder='user name'  value='' class='bootBoxes'><input id='pass' placeholder='password'  value='' class='bootBoxes'></div><div><input type='text' placeholder='username' id='forgotusername' style='display:none' class='bootBoxes'></div>";
var callback=function(){
		$.get('/ajax.php',{a: 'forgot',mail: x('#forgotmail').val(),name: $('#name').val().trim(),pass: x('#pass').val().trim()},function(data){ 
			console.log(data);
			if(typeof data=="string"){
			s.modal(data);
			}else{
			$('#modalbody').append('<div style="color:red">'+dic.EMAIL_SENT_MAILBOX+':</div><strong style="color:#333"><input id="tempass" type="hidden" placeholder="insert temporary password" value="'+data.tempass+'" class="bootBoxes">'+JSON.parse(data.sq)['sq']+'</strong><div><input id="sa" placeholder="insert security answer" class="bootBoxes"><input type="hidden" id="authKeyId" value="'+data.uid+'"><span id="sqnotice" style="color:red"></span></div><button class="bootBoxes" id="submitAuthKey">'+dic.SUBMIT+'</button>');
			$('#name').val(data.name);	
			}
		},'json');
		};
//but("Info",step2)
s.modal({message:message,title: dic.INSERT_EMAIL_ADDRESS,foot:but("Send",callback)});
}
$(document).on("click",'#submitAuthKey',function(){
var tempass=$('#tempass').val(),uid=$('#authKeyId').val(),sa=$('#sa').val().toLowerCase();
var params={a: 'forgot_confirm',tempass:tempass,uid:uid,sa:sa};
console.log(params);
$.post("/ajax.php",params,function(data){
console.log(data)
if(data!='NO'){
//modalclose();
$('#sqnotice').html(dic.PASSWORD_CHANGED_CORRECTLY+"<br><span class='forgot_password1'>Username:</span> <b>"+data.name+"</b><br><span class='forgot_password1'>Password:</span> <b>"+data.pass+"</b>");
}else{
console.log(data)
$('#sqnotice').html(dic.PROBLEM_CHANGING_YOUR_PASSWORD);
}
},"JSON")
})
//onclick login
.on("click","#delauthor",function(){
s.coodel('authorid');s.coodel('llset');x('#authorslist').hide();
x('#loginf').show();
x('#loginbox').show();
x('#loginf2').hide();
})
//PROLOGIN
.on('click','button[id^="delrecent"]',function(){	
var id=parseInt(this.id.replace('delrecent',''))
var ll=JSON.parse(local('ll'));
ll=ll.filter(function (el){return el!=null;});
removeA($.unique(ll),id);
local('ll',JSON.stringify(ll,null,2))
$('#logwith'+id).hide()
})
.on("click","input[id^='flag']",function(){
var val=this.id.replace('flag','');
s.coo('rc',val);
$('.signFl').attr('src',this.value);
if(val!='gr'){
s.coo('LANG','en');
};
if(val=='au'){
location.href='https://dev.speedemployer.net';
}else{
location.href='https://dev.speedemployer.gr'
}
console.log(val)
})
.on("click",".speedSearchLens,.speedSearchTarget",function(){
reset_filters();
})
.on("click",'#forgot',function(){
forgot()
})
//change language
//var SPREGRP=1;
.on("click",'#en,#el',function(){
s.coo('LANG',this);
location.reload();
})
//activate bootbox dialogue
.on("click",'#regPerson',function(){	
s.modal(regModal('candidate'));
s.coo('SPMSHIP',0);
// s.coo('SPREGRP',1);
})
//activate bootbox dialogue
.on("click",'#regCompany',function(){
s.modal(regModal('employer'));
s.coo('SPMSHIP',0);
// s.coo('SPREGRP',2);
s.coo('SPAUTH',1);
})
.on("click",'#regAgent',function(){
var mod= regModal('agent');
s.modal(mod);
s.coo('SPMSHIP',10);
// s.coo('SPREGRP',2);
s.coo('SPAUTH',1);
})
.on("click",'#regGovagent',function(){
var mod= regModal('gov');
s.modal(mod);
s.coo('SPMSHIP',11);
// s.coo('SPREGRP',2);
s.coo('SPAUTH',1);
})
.on("click","#submitCriteria2",function(){
s.confirm(dic.SEARCH_HINT_EE,function(result){
if (result==true && G.mobile==false){
	location.href='/register/1';
}
})
})
.on("click","#submitCriteria22",function(){
s.confirm(dic.SEARCH_HINT_ER,function(result){
if (result==true && G.mobile==false){
	location.href='/register/2';
}
})
})
.on("change","#sfilter_classification,#sfilter_classification2",function(){
var divspec= s.ses('login_search')==1 ? 'sspec': 'sspec2';
if(s.ses('login_search')==1){
x('#submitCriteria2').attr("class",'but18Lock');
}else{
x('#submitCriteria22').attr("class",'but18Lock');
}
//reset sessions.
$('#filter_specific').html('<div class="filter_classification"><select id="'+divspec+'"><option value="0">'+dic.SELECT_SPECIFIC+'</option></select></div>')
$('#'+divspec).val(0)
// switch_search_to_criteria()
if(this.value==0){
ses.del('s_range_subclassif');
ses.del('s_subclassif');
$('.subclassScroll').hide()
s.ses('s_mode','crit');
}else{
sRangeSubclassif(this.value);
}
if(s.ses('login_search')==1){
set_subclassification_form2(0);
}else{
set_subclassification_form22(0);
}
})
.on("change","#sspec,#sspec2",function(){
if(this.value==0){ ses.del('s_spec');}else{s.ses('s_spec',this.value);}
})
.on("click","#ssubclassif,#ssubclassif2",function()   {
// console.log('clicked '+this.id)
var divbutton=    s.ses('login_search')==1 ? '#submitCriteria2' : '#submitCriteria22';
if ($('#'+this.id+':checked').length <=5){
// switch_search_to_criteria();
if(s.ses('login_search')==1){
	var subs=$("#sf_subclassification input:checkbox:checked").map(function (){
		return this.value;
	}).get();
}else{
	var subs=$("#sf_subclassification2 input:checkbox:checked").map(function (){
		return this.value;
	}).get();
}
specific_form2(subs,s.ses('s_spec'))
var subclasses=typeof subs !=='undefined' && subs.length > 0 ? JSON.stringify(subs,null,2) : '';
if(!!s.ses('s_subclassif') && x(divbutton).length>0){x(divbutton).attr("class",'but18');}
if (!!s.ses('s_subclassif') && s.ses('pop_search')==1){
	x(divbutton).attr("class",'but18');
} else {
	x(divbutton).attr("class",'but18Lock');
}
}else{
this.checked=false;s.notify('error',dic.MAX_SUBS);
}
if(my.uid=='' && $('#'+this.id+':checked').length >0){
x(divbutton).attr("class",'but18');
}
})
.on("click","button[id^='authorid']",function(){	
var id=this.id.replace('authorid','');s.coo('authorid',id);authorlogin(id);
})
.on('keyup',"#lookup,#lookup1,#lookup2",function(){	
var param= this.id.replace('lookup','');
var listi='',val= this.value.trim(); length=this.value.length;
var counter=0,re=new RegExp(val,"i"),
keys=Object.keys(G.prof),values=Object.values(G.prof),
z={},newd= keys.filter(val=>re.test(val)).map(x=>{z[x]=values[keys.indexOf(x)];return z})[0]
for (var j in newd){
		var piece= j.split(val);
		// console.log(piece)
		listi +='<li id="lu'+j+'" val="lu'+newd[j].sid+'">' +piece[0]+
			'<span style="background:yellow">'+val+'</span>'+piece[1]+
			'<span style="display:none" id="luspec'+newd[j].sid+'">'+j+'</span>' +
			'<span style="display:none" id="lusub'+newd[j].sid+'">'+newd[j].s+'</span>' +
			'<span style="display:none" id="luclass'+newd[j].sid+'">'+newd[j].cl+'</span>' +
			'</li>';
		counter +=1;
}
if (counter >0 && length >0){
	x('#lookuplist'+param).html(listi).show();			
	x('#lookupcounter').text(counter)
} else {
	x('#lookuplist'+param).hide()
	x('#lookupcounter').text(0);
}
})
.on('click',"li[id^='lu']",function(){
var id=this.parentNode.id.replace('lookuplist','');
var confirm=id==1 ? dic.EARCH_HINT_ER : dic.SEARCH_HINT_EE;
s.confirm(confirm ,function(result){
if (result==true && G.mobile==false){
	location.href='/register/'+id;
}
})
})
//mode 1 =>classic login
// mode 2=> onclick .but136
// mode 3=> onclick #loginf after mode 2 activated
function accepterms(o){
if($(o).is(':checked')){
x('#tickterms').hide();x('.checkBoxStyle2').removeClass('redF');
}else{
x('#tickterms').show();x('.checkBoxStyle2').addClass('redF');
}
}
function regModal(grp){
return    {
message: dic.REGISTRATION_LANGUAGE,
title: "SpeedEmployer.com",
foot:"<a onclick='s.coo(&quot;LANG&quot;,&quot;en&quot;);location.href=&quot;register/"+grp+"&quot;'>English</a>"+ 
"<a onclick='s.coo(&quot;LANG&quot;,&quot;el&quot;);location.href =&quot;/register/"+grp+"&quot;'>Ελληνικά</a>",
}
};
function loginredirect(data){	
console.log(data);
s.coo('sid',data.uid);

if([119,155,156,157].includes(data.buscat)){var myapp=9;}else{var myapp=3;}
	if(typeof(data.author)!='undefined'){
	if(data.author.level==3 && [119,155,156,157].includes(data.buscat)){
		location.href='/prop/myaccepted';
	}else if(data.author.level==3 && ![119,155,156,157].includes(data.buscat)){
		s.coo('customapp',myapp);
		location.href='/offer/myaccepted';
	}else if(data.author.level==4 && [119,155,156,157].includes(data.buscat)){
		s.coo('customapp',myapp);
		location.href='/prop/myreceived';
	}else if(data.author.level==4 && ![119,155,156,157].includes(data.buscat)){
		s.coo('customapp',myapp);
		location.href='/offer/myreceived';
	}else if(data.author.level==5){
		var pt=myapp==9 ? "prop":"offer";		
		location.href='/'+pt+'/myaccepted';
	}else if(data.affiliate>0){
		location.href='/home/manage';
	}else{
		location.href='/u/'+data.name;
	}
		}else{
	if(data.suspended){
		location.href='/u/'+data.name;
	}else if(data.grp==1 && G.is.potential_link !='1'){
		location.href='/u/'+data.name;
	}else if(data.affiliate>0){
		location.href='/home/manage';	
	} else {
		location.href='/u/'+data.name;	
	}
	}
}
function loginwith(uid){
if(!!s.coo('llset')){$("#loginwith-"+uid).attr('class','but136');}
//o.className='photoRecentA';	
$('.speedloaderCon').show();
api.ma.getOne("name FROM ur WHERE uid=?",[uid],usr=>{
//usr.tz=G.statebyid[usr['state']].tz;				
//usr.tzoff=G.statebyid[usr['state']].tzoff;   
$('#username').val(usr.name)
$('.speedloaderCon').hide();
})	
}
function loginauthors(uid){
	s.coo('llset',uid);	
	api.ma.get("ur.fname,ur.buscat,ur.authE,ur.img,author.* FROM author join ur ON ur.uid=author.uid WHERE author.uid=?",[uid],data=>{
	console.log(data);
	G.authors=data;			
	var ali='',res=data;
	ali +='<span class="photoPop"><img width="100%" class="photoPop2" src="'+data[0].img+'"></span><span class="prNameRecM">'+data[0].fname+'</span><span class="prCatRecM">'+array_flip(G.buscat)[data[0].buscat]+'</span><button class="but98" id="delauthor"></button><span class="profNameRecTit3">'+(data[0].authE < time() ? " Expired AUTHORLOGIN enter with Administrator and renew ":"Authors list")+'</span><div id="authorslistbox">';
	for(var i in res){	
	ali +='<div class="recentAd"><div class="photoRecentAdm"><span class="profNameRecAdm">'+res[i].fn+' '+res[i].ln+'</span><div class="profNameRecTit2con"><span class="profNameRecTit2">'+res[i].pt+'</span><span class="profNameRecTit2">'+G.authlevels[res[i].level]+'</span></div><input class="authorinput" type="password" id="author'+res[i].id+'" style="display:'+(s.coo('authorid')==res[i].id ? 'block':'none')+'" placeholder="password"><div class="login_butSm_box"><button type="button" id="authorid'+res[i].id+'" class="but96Sm"></button></div></div></div>';
	}
	ali +='</div>';
	x('#loginbox').hide();
	$('#authorslist').show().html(ali);	
	})	
}
function login(uid){
var user= x('#username').val();
var pass= x('#password').val();
var agent_auth= x('#agent_auth').val();
var authArray=['2','3','4','5'];
var rc=!s.coo('rc') ? G.rcop[window.pathExt] : s.coo('rc');	
var params ={a:'login',b:pass,c:user,d:agent_auth};
if(!!uid){params['uid']=uid}
if($('#username').length==0 && !uid){
x('#username').focus();
}else if(pass.length===0 && !uid){
x('#password').focus();
}else{
x('#loginf').hide();x('#loginf2').show();
$.get("/ajax.php",params,data=>{ 
console.log(data)  
		if (data==='no_account'){
			s.modal(dic.ACCOUNT_NOT_EXIST);
			x('#loginf').show();x('#loginf2').hide();
			//if not integer ie is not active account
			return false;
		} else if (data['auth']===1 && !s.coo('authorid')){										
			loginauthors(data.uid);			
		} else if (data ==='authentication_pending'){
			s.modal(dic.AUTHENTICATION_PENDING)
			$('#loginf').show();$('#loginf2').hide();
		} else if (authArray.includes(data['authentication'])){	//authentication pending
		s.confirm(G.authentication[data['authentication']],function(result){
		if (result){
			if (data.authentication =='4'){
				s.coo('SPREGID',data.uid);s.coo('SPAUTH',2);s.coo('SPREGRP',data.grp);
				location.href="/register/employer";
			} else if (data.authentication =='3'){
				s.coo('SPREGID',data.uid);s.coo('SPAUTH',3);s.coo('SPREGRP',data.grp);
				var grp=data.grp==1 ? 1 : (data.affiliate==2 ? 3 : (data.affiliate==3 ? 4 : 2));
				var grparr={1:'candidate',2:'employer',3:'agent',4:'gov'}				
				location.href="/register/"+grparr[grp];								
			}
		}
		})					
		 x('#loginf').show();x('#loginf2').hide();
		} else {		
		if(!!s.coo('llset') && s.coo('llset')!=data.uid){s.coodel('logo')}		
		api.ma.my("set",data.uid,[],step1=>{
			api.ma.N("set",data.uid,[],step2=>{			
				loginredirect(data);
			});
			});					
		}
	},'json');
}
}
function specific_form2(subs,spec){
 console.log('specific_form2')
var divspec= s.ses('login_search')==1 ? 'sspec': 'sspec2';
var divfspec= s.ses('login_search')==1 ? '#filter_specific': '#filter_specific2';
var form='';
// var data=G.profession;
 var data=G['prof_'+LANG];	        
for (var j in data){
	if(subs.includes(data[j].sid)){
		var selected= !!spec && data[j].id==spec ? "selected='selected'":"";                
		form +='<option value="'+data[j].id+'" data="'+j+'" '+selected+'>'+j+'</option>';
		//value="'+data[j].subclassif_id+'"
	}
}
$(divfspec).html('<div class="filter_classification"><select id="'+divspec+'"><option value="0">'+dic.SELECT_SPECIFIC+'</option>'+form+'</select></div>')        
}
function set_classification_formb(){
var data=G['classif_'+LANG];	
//$.get(pathClassifJSON,function(data){
// var data=G.classif;
var class_text='<option value=0>'+dic.SELECT_CLASSIFICATION+'</option>';
var selHint='';
//classFromSub(ses('s_subclassif'),'filter_classification');
var selClass=!!ses('s_classif') ?  ses('s_classif') : $('#sfilter_classification').val();
for (var j in data){
selHint=selClass==data[j] ? 'selected="selected"' : "";
class_text +='<option value="'+data[j]+'" '+selHint+'>'+j+'</option>';
}
//append
$('#sselectnewclassif').html('<div class="filter_classification"><select id="sfilter_classification">'+class_text+'</select></div>');
}
function set_classification_formb2(){
var data=G['classif_'+LANG];	 
//$.get(pathClassifJSON,function(data){
// var data=G.classif;
var class_text='<option value=0>'+dic.SELECT_CLASSIFICATION+'</option>';
var selHint='';
//classFromSub(ses('s_subclassif'),'filter_classification');
var selClass=!!ses('s_classif') ? ses('s_classif'): $('#sfilter_classification2').val();
for (var j in data){
selHint=selClass==data[j] ? 'selected="selected"' : "";
class_text +='<option value="'+data[j]+'" '+selHint+'>'+j+'</option>';
}
//append
$('#sselectnewclassif2').html('<div class="filter_classification"><select id="sfilter_classification2">'+class_text+'</select></div>');
}
function set_subclassification_form2(sess){
console.log('set_subclassification_form2')
var data=G['subclassif_'+LANG];	 
//  $.get(pathSubclassifJSON,function(data){
var class_text='';
var checked,selHint='';
//sess is s_subclassif OR s_range_subclassif
var sel_subs=!!ses('s_subclassif') ? JSON.parse(ses('s_subclassif')) : '';
var selrange_subs=!!ses('s_range_subclassif') ? JSON.parse(ses('s_range_subclassif')) : '';
var classif_value= $('#sfilter_classification').val();
var divClass=typeof(classif_value)!='undefined' ? classif_value : ses('s_classif');
for (var j in data){
	//case 1
	checked=sel_subs.includes(data[j].id) ? 'checked="checked"' : '';
	if (divClass!=0 && typeof divClass !='undefined'){
		// console.log('point1')
		if (data[j].clid==divClass){
			class_text +='<span class="subclassTotal2"><div id="sf_sub" class="subclassCheck"><input '+checked+' type="checkbox" id="ssubclassif" value="'+data[j].id+'"></div>'+j+'</span>';
		}
	} else if (selrange_subs !=''){ //change classif mode
		if (selrange_subs.includes(data[j].id)){
			class_text +='<span class="subclassTotal2"><div id="sf_sub" class="subclassCheck"><input type="checkbox" id="ssubclassif" value="'+data[j].id+'" '+checked+'></div>'+j+'</span>';
		}
	}
}
if (divClass!=0){
	$('#sf_sub').remove();
	var subform='<div id="sf_sub"><span class="filtersTitles">'+dic.SUBCLASSIFICATIONS+'</span><div class="subclassScroll">'+class_text+'</div></div>';
	$('#sf_subclassification').append(subform);
}
}
function set_subclassification_form22(sess){
var data=G['subclassif_'+LANG];
var class_text='';
var checked,selHint='';
//sess is s_subclassif OR s_range_subclassif
var sel_subs=!!ses('s_subclassif') ? JSON.parse(ses('s_subclassif')) : '';
var selrange_subs=!!ses('s_range_subclassif') ? JSON.parse(ses('s_range_subclassif')) : '';
var classif_value= $('#sfilter_classification2').val();
var divClass=typeof(classif_value)!='undefined' ? classif_value : ses('s_classif');
for (var j in data){
	//case 1
	checked=sel_subs.includes(data[j].id) ? 'checked="checked"' : '';
	if (divClass!=0 && typeof divClass !='undefined'){
		if (data[j].clid==divClass){
			class_text +='<span class="subclassTotal2"><div id="sf_sub" class="subclassCheck"><input '+checked+' type="checkbox" id="ssubclassif" value="'+data[j].id+'"></div>'+j+'</span>';
		}
	} else if (selrange_subs !=''){ //change classif mode
		if (selrange_subs.includes(data[j].id)){
			class_text +='<span class="subclassTotal2"><div id="sf_sub" class="subclassCheck"><input type="checkbox" id="ssubclassif" value="'+data[j].id+'" '+checked+'></div>'+j+'</span>';
		}
	}
}
if (divClass!=0){
	$('#sf_sub2').remove();
	var subform='<div id="sf_sub"><span class="filtersTitles">'+dic.SUBCLASSIFICATIONS+'</span><div class="subclassScroll">'+class_text+'</div></div>';
	$('#sf_subclassification2').append(subform);
}	
}
function sRangeSubclassif(clasifVal,favorite){
// var data=G.subclassifbyid;
api.form('pathSubclassif',function(data){
//return $.get(pathSubclassifJSON,function (data){
var srange=favorite==true ? '_fav': '';
var res=gsubclassif(clasifVal,data,'array_from_classif');
if(typeof res !='undefined'){
	ses('s_range_subclassif'+srange,JSON.stringify(res,null,2));
}
});
}
function set_classification_form2(session){
var selClass=JSON.parse(session);
var subclass=!!selClass ? selClass[0] : 1;
var subdata=G.subclassif;
$.get(pathSubclassifJSON,function(subdata){
//provide to dom
var classif=gsubclassif(subclass,subdata,'value_from_subclassif');
// var data=G.classif;
api.form('pathClassif',function(data){
//$.get(pathClassifJSON,function(data){
	var class_text='<option value=0>'+dic.SELECT_CLASSIFICATION+'</option>';
	var selHint='';
	for (var j in data){
		selHint=classif==data[j] ? 'selected="selected"' : "";
		class_text +='<option value="'+data[j]+'" '+selHint+'>'+j+'</option>';
	}
	//append
	var selectnew='<p>'+dic.SELECT_CLASSIFICATION+'</p>:<div class="filter_classification"><select id="sfilter_classification" name="classification">'+class_text+'</select></div>';
	if(!!ses('login_search') && ses('login_search')==1){
		$('#sselectnewclassif').html(selectnew);
	}else{
		$('#sselectnewclassif2').html(selectnew);
	}
})
})
}
function set_classification_form22(session){
console.log('set_classification_form2')
var selClass=JSON.parse(session);
var subclass=!!selClass ? selClass[0] : 1;
//read subclass json
// var subdata= G.subclassif;
api.form('pathSubclassif',function(subdata){       
//  $.get(pathSubclassifJSON,function(subdata){
//provide to dom
var classif=gsubclassif(subclass,subdata,'value_from_subclassif');
//new json classif read
// var data= G.classif;
$.get(pathClassifJSON,function(data){
var class_text='<option value=0 >'+dic.SELECT_CLASSIFICATION+'</option>';
var selHint='';
for (var j in data){
selHint=classif==data[j] ? 'selected="selected"' : "";
class_text +='<option value="'+data[j]+'" '+selHint+'>'+j+'</option>';
}
//append
var selectnew='<p>'+dic.SELECT_CLASSIFICATION+'</p>:<div class="filter_classification"><select id="sfilter_classification2" name="classification">'+class_text+'</select></div>';
$('#sselectnewclassif2').html(selectnew);
})
})
}
function location_selected_form2(cityid,mode,pref,province){
//city
if (mode !='reset'){
var prov_data= G.province
// $.get(pathProvinceJSON,function(prov_data){
//province
var province_text='<option value=0>'+dic.PROVINCE+'</option>';
var selected;
for(var i in prov_data){
	selected=province==prov_data[i] || prov_data[i]==ses('s_province') ? 'selected="selected"' : '';
	province_text +='<option value="'+prov_data[i]+'" '+selected +'>'+i+'</option>';
}
$('#sf_city').html('<select id="sfilter_province2">'+province_text+'</select>');
// })
}
var cityRange=JSON.parse(ses('s_range_city'));
$.get(folderprov+province+'.json',function(data){
// var data= G.location;
var city_text=cityid==0 ? '<option value=0>'+dic.CITY+'</option>':'';
var selectedCity;
for(var i in data){
if(data[i].pid==ses('s_province')){
	selectedCity= data[i].id==cityid ? ' selected="selected" ':'';
	city_text +='<option value="'+data[i].id+'" '+ selectedCity +'>'+i+'</option>';
}
}
$("#filter_city2").remove();
$('#sf_city2').append('<select name="city" id="filter_city2">'+city_text+'</select>');
});
}
//************************************AGENT**************************************//
/* insert to AFFILIATEs and agents */
/*
* accept terms and conditions
* */
function getLocation2(uid,id){
if(id!=0){
	api.form("locationbyid_"+LOC,function(data){                
		$('.locity'+uid).text(data[id].p);
	});
}
}
function classFromSub2(subclass,divid){                
api.form("subclassif_"+LANG,function (data){
	//provide to dom
	if (typeof subclass !='undefined' && subclass !=''){
		var classif=gsubclassif(subclass,data,'class_from_subclassif');
		$(divid).html(classif);
	}
})
}
function classFromSub3(subclass,divid){
	if (typeof subclass !='undefined' && subclass !='' && subclass !='-'){
		// var classif=gsubclassif(subclass,data,'class_from_subclassif');
		var sub= G.subclassifbyid[subclass].s;
		$(divid).html(sub.substring(0,30));
	}
}
function take(id,uid){
	x('#take_'+id).text(dic.PENDING);           
	s.confirm(dic.TAKE_CLIENT_SURE,function(result){
		if (result){			
			xget({a:'take',b:id},data=>{
				if (data =='allos'){
					s.notify('error',"Malaka ston efage allos");
				}else if (data =='OK'){
				 api.ma.my("get",my,["caff","agentdata"],d=>{
					api.ma.my("get",uid,["aff"]);                
					x('#fbox'+id).hide();
					var taken_counter=parseInt($('#taken_counter').text())+1;					
					$('#taken_counter').text(taken_counter);	 
				 });
				 
				}else  if (data =='cannot'){
					s.notify('error',dic.CANNOT_TAKE);
				}
			})
		}
	})
}
//CLIENT SERVICE request flow
/*
dash > affiliate
home > service_pack
*/
// if ((URL_PAGE =='affiliate' && s.coo('affiliate_grp')==1) || G.mode=='requests'){
//     if(URL_PAGE!='proactivated'){
//          affloop()
//     }
// }
// if (G.CUR_DIR !='admin' && s.coo('affiliate_grp')==1){
//     affloop();
// }
/*cert renew service type 1 from employee and from agent*/
$(document).on("click", "button[id^='gutu|']", function () {gutu(this);})
.on('click',"input[id^='affiliateTermsInput_']",function(){
var status =$(this).filter(':checked').val()=='on' ? 1 : 0;
var cid=this.id.replace('affiliateTermsInput_','');
s.confirm(dic.ACCEPT_TERMS_CONDITIONS,function(result){
	if(result){
		xget({a:'affiliate_terms',b:cid,c:status},data=>{
			if(data=='OK'){	toggledit('#affiliateTermsInputBox_'+cid,'#affiliateTermsRead_'+cid);	}
		})
	}
})
})
.on("click","button[id^='rLicence_']",function (){
	var id=this.id.replace('rLicence_','');
	s.confirm(dic.USERS_LICENSE_RENEW_SURE,function (res){
		if(res){
			x('.btn-primary').hide();
			var service= 0,status= 1,params={a:'renew_licenceAB',b:id,status:status,service:service,desc:'License Renewed',source:5};
			$.post("/ajax.php",params,function(d){	
				api.ma.my('get',my,['caff'],cache=>{
				if (d =='noleft'){
					s.notify('error',dic.RENEW_ACCOUNT_NOT_AVAILABLE);
				}else if (d =='nobank' || d =='yesbank'){
					// s.notify('error',"Unsuccessful Payment!");
					// $('#rLicence_'+id).hide();
					location.reload();
				} else {
					s.notify('error',dic.PROBLEM_RENEWING_LICENCE);
				}
				});
			});
		}
	})
})
.on("click",'#submit_mcli',function (){
	var q=x('#search_mcli').val().trim();
	x('#search_mcli').val('');
	 s.coo(G.apt+'_page',1);
	if (q !=''){
		s.coo('mcli_q',q);
	} else {
		x('#search_mcli').focus();
		s.coodel('mcli_q');
	}
	s.coodel(['job_status','newjobquote','sfuc','futoday','selectsub',G.apt+'_count','status_jobs','aff_order2']);
	manage();
})
.on("change",'#sfuc',function (){
	if (this.value!=0){
		s.coo('sfuc',this.value);
	}else{
		s.coodel('sfuc');
	}
	s.coo(G.apt+'_page',1);
	s.coodel(G.apt+'_count');
	if(G.CUR_DIR=='admin'){
		// reset('aflist');
		// affloop();
	}else{location.href='/home';}
})
    //afm doi
.on('click','#submitAFM',function(){
	var afm=x('#editAFM1').val();
	var doi=x('#editAFM2').val();
	if(afm.length >3){
	xget({a:"afm",b:afm,c:doi},function(data){
	if (data=='OK'){
		s.confirm(dic.CHANGE_AFMDOI+' '+afm+' '+doi+' '+dic.SURE,function(res) {
		if (res){
		$('#readAFM').html(afm+' '+doi).show('normal');opener('editAFM');
		api.ma.my('get',my,['user']);
		}
		});
	}else if(data=='R1'){
		s.notify("good",dic.AFMDOI_CANNOT_INSERTED);
	}else{
	s.notify("good",dic.AFMDOI_CANNOT_INSERTED);
	}
	})	
	}else{
	s.modal(dic.PLEASE_INSERT_ABN);
	}
		return false;
	})
.on("click","button[id^='similarity_']",function (){
	var name=explode('_',this.id),similars='',citid;
	console.log({a:'similar_pop',b:name[2],c:name[1]})
	xget({a:'similar_pop',b:name[2],c:name[1]},data=>{		
		for (i in data){			
			similars += data[i].fname+(!data[i].city ?'':' [<span>'+G.locationbyid[data[i].city].c+'</span>]') 
			+ (i < data.length - 1 ? ' <br/>' : '');
			if (i > 5){similars +=' <i>More</i>';break;}
		}
		s.modal({title: "Similar Users",message: "<b>"+similars+"</b>"})                                                    
	},'json');
})
.on("click","button[id^='updater_']",function(){
	this.textContent=dic.PENDING;
	var exp=explode('_',this.id);
	var status=exp[1];
	var id=exp[2];
	s.confirm(dic.TAKE_CLIENT_SURE,function(result){
		if (result){
			console.log({a: 'updater',status: status,id:id});
			$.get('/ajax.php',{a: 'updater',status: status,id:id},data=>{
				console.log(data);
					if(status==3){ //request
					  if (data !='NO'){								
							$('#requestbox').html('<label style="background:purple" class="but70">Request for assistance sent</label>');
							}else if(data =='exist'){
								s.notify('error',dic.REQUEST_EXISTS);
							}
					}else if(status==4){ //taker
						   if (data =='allos'){
							s.notify('error',"Malaka ston efage allos");
							}else if (data =='OK'){		
							var taken_counter=parseInt($('#taken_counter').text())+1;
							$('#taken_counter').text(taken_counter);
							}else  if (data =='cannot'){
							s.notify('error',dic.CANNOT_TAKE);
							}
					}else if(status==2){ //accept
						location.reload()
					}else if(status==1){ //release
						location.reload()
					}else if(status==0){ //cancel
						location.reload()
					}
			})
		}
	})
})
.on("click","button[id^='affactivate_']",function(){
	var uid=this.id.replace('affactivate_','');
	s.confirm(dic.USER_ACTIVATED_AGENCY_SERVICES_SURE,function(result){
		xget({a: 'activate',b: uid},function(data){
			if (data =='1'){
				$('#affactivate_'+uid).hide();
				$('#status'+uid).text(dic.ACTIVE).removeClass('inactive').addClass('active');
				var inactive_accounts=parseInt($("#inactive_accounts").text()) - 1;
				var active_accounts=parseInt($("#active_accounts").text())+1;
				$("#inactive_accounts").text(inactive_accounts)
				$("#active_accounts").text(active_accounts)
			} else {
				s.notify('error',dic.ERROR_ACTIVATE)
			}
		})
	})
})
/*         * SERVICE PACK         *         * SERVICE QUOTE - MIN SERVICE QUOTE         */
.on("click","input[id^='servicequote'],input[id^='minservicequote']",function(){
	var exp=explode('_',this.id)
	var val=this.checked ? 1 : 0;
	xget({a:exp[0],b:val,c:exp[1]},d=>{console.log(d)});
})
/*
 *CLIENT SERVICE RELEASE BUTTON
 */
.on("click","button[id^='affrelease_']",function(){
	var id=this.id.replace('affrelease_','');
	s.confirm(dic.USER_RELEASED_AGENCY_SURE,function(result){
		if (result){
				xget({a: 'release',b: id},function(data){
					console.log(data)
					if (data =='OK'){
						$('#box'+id).hide();
					} else if (data =='3'){
						s.notify('error',dic.AUTH_CODE_NOT_CORRECT_CONTACT_AGENT);
					} else {
						s.notify('error',dic.AUTHENTICATION_UNSUCCESFULL);
					}
				});
		}
	});
})
/*
 *CLIENT SERVICE SEND MAIL
 */
.on("click","button[id^='sendMail_']",function(){
	let obj=$(this);
	var uid=this.id.replace('sendMail_','');
	$('#sendMail_'+uid).remove();
	$.get('/ajax.php',{a: 'mail_sent',b: uid},function(data){
			if (data !='NO'){
				$('#sendMailRead'+uid).text(dic.MAIL_SENT);
				s.notify('error',dic.EMAIL_SENT)
				//SENTMAIL cid,uid,topicid,id
				var boxid=obj.attr('boxid');
				var cid=obj.attr('cid');
				mesmenuopen(cid,uid,null,boxid,()=>{
					$('#topic').val(data.topic);
					$('#messageSubmit_0').text("SEND "+dic.CERTIFICATION_INSTRUCTIONS).attr("type","instructions");					
					nicEditors.findEditor("messageText").setContent(data.message);
				});
			} else {
				s.notify('error',dic.EMAIL_CANNOT_SENT_NOW)
			}
	},'json')
})
//	}else{
//produce auth
.on("keyup change","#aff_email",function(){
	xget({a: 'check_mail',b: this.value},function(data){
		console.log(data)
		if (data !=''){
			$('.authLabel').text(data);
		} else {
			$('.authLabel').text('');
		}
		//valid invalid submit
		if (data =='Email valid.'){
			$("#submitAuth").prop("disabled",false);
		} else {
			$("#submitAuth").prop("disabled",true);
		}
	})
})
.on("click","#produceAuth",function(){
	if ($('#email').val() !=''){
		xget({a: 'get_auth'},function(data){
			$('#authview').html('<span class="but7" style="color:white">'+data.auth+'</span>');
			$('#auth').val(data.auth);
			$('#produceAuth').hide();
		  //  var progmessage='<b>Courtesy from your Recruitment Agency: '+data.agent+'</b><br/>From: '+data.fn+'<br/><br/>' +
			//    'With the Authorization Code below you can now register with SPEEDEMPLOYER for free. Go to <a href="/'+SITE_URL+'">www.speedemployer.gr</a> to register now.<br/><br/>' +
			  //  '<b style="color:darkred">'+dic.STREAMING_AUTHENTICATION_CODE+': '+data.auth+'</b><br/><br/>Kind Regards';
			//$('.messageAuth').html('<div id="authMessage" contenteditable="true" style="white-space: pre-wrap; overflow-y: scroll;" name="message" placeholder="'+dic.INSERT_MESSAGE+'>" class="messageAuth">'+progmessage+'</div><input type="submit" id="submitAuth" value="'+dic.SAVE+'" class="but8">');
			$('.messageAuth').html('<div id="authMessage" contenteditable="true" style="white-space: pre-wrap; overflow-y: scroll;" name="message" placeholder="'+dic.INSERT_MESSAGE+'>" class="messageAuth">'+data.auth+'</div>');
		},'json');
	}
})
//send email
.on("click","#submitAuth",function(){
	event.preventDefault();
	var content=x("#submitAuthForm").serializeArray();
	content[3]={name:"message",value: x('#authMessage').html()}
	console.log(content)
	xpost("/ajax.php",
		content,
		function (data){
			if (data =='OK'){
				// $('#aff_email').val('')
				// $('.authLabel').text('')
				// $('#produceAuth').show('')
				// s.notify('error',dic.AUTHENTICATION_CODE_SENT);
				location.reload()
			} else {
				console.log(data)
				console.log(textStatus)
				console.log(jqXHR)
				s.notify('error',dic.ERROR_SENDING);
			}
		});
})
//list service pack
.on("change","#aff_status",function(){
	if(this.value==0){
	this.parentNode.setAttribute('class','inputHAgent2')	
	}else{
	this.parentNode.setAttribute('class','inputHAgent2red')
	}
	s.coo('aff_status',this.value);
	$('.aflist').html('');
	affloop();
})
//list order
.on("click","button[id^='order_'],button[id^='order2_']",function(){
	if(G.mode!='superboard' && G.uname!='user'){
		var ele='order2_'.indexOf(this.id) !== -1 ? 'order' : 'order2';
		var q=this.id.replace(ele+'_','');				
		var aff='aff_'+ele;
		var orderby=s.coo(aff)==q+' ASC' ? q+' DESC' : q+' ASC';				
		s.coo(aff,orderby);
		if (G.uname =='home' && (G.mode =='manage' || G.mode =='')){
			s.coo(G.apt+'_page',1);
			location.href='/home';
		} else {
			affloop();
		}
	}
})
.on("keyup","#search",function(){
	var val=this.value;
	s.coo('aff_search',val);
	//s.coo('userlist_page',1)
	if (G.CUR_DIR =='admin'){
		reset('aflist');
	} else {
		resetNoLoader('aflist');
	}
	affloop();
})
.on("click","button[id^='status_']",function(){
	var exp=explode('_',this.id);
	var id=exp[1];
	var newstatus=exp[2]==1 ? 2 : 0;
	var newhint=exp[2]==1 ? 'Release' : 'Activate';
	var newstatushint=exp[2]==1 ? 'Activated' : 'Inactive';
	xget('?a=status&b='+id+'&c='+newstatus);
	this.id='status_'+id+'_'+newstatus;this.textContent=newhint;
	x('#statuslabel'+id).text(newstatushint);
	if (newstatus==2){
		x('#statustd'+id).html('<button onclick="gotoaff('+id+')">ACCOUNT</button>');
	} else {
		x('#box'+id).hide();
	}
})
.on("change keyup","input[class^='fuc']",function(){
	var uid=this.className.replace('fuc','')            
	xget({a: 'fuc',b: this.value,c: uid},function(data){console.log(data)})
})
.on('change','#status_jobs',function(){
s.coo('status_jobs',this.value);
s.coo(G.apt+'_page',1);
s.coodel(G.apt+'_count');
$('.aflist').html('');
$('#speedloaderCon').show();
window[G.apt]();
})
.on('click','.todayH',function(){		     
	s.coo('futoday',1);            
	s.coo(G.apt+'_page',1);
	s.coodel(G.apt+'_count');
	location.href='/home';	 
})
.on('change','#selectsub,#selectsub1',function(){
if(this.value==0){
	s.coodel(this.id);			
}else{
s.coo(this.id,this.value);
}
s.coo(G.apt+'_page',1);
s.coodel(G.apt+'_count');
if(G.uname=='home'){
	if (G.mode =='manage' || G.mode=='manager' || G.mode==''){
		x('.aflist').html('');$('#speedloaderCon').show();window[G.apt]();
	} else if(G.mode =='requests'){
		affloop();
	}
}
})
.on('change','#selectloc,#selectloc1',function(){
 if(this.value==0){
	s.coodel(this.id);			
}else{
s.coo(this.id,this.value);
}
if(G.uname=='home' && G.mode=='requests'){
	location.href='/home/'+G.mode+'?page='+G.page;
}else{
	affloop();
}
})
function sm_go(){
		//run ajax
$('#step2').show();
	var prod=s.coo('sm_offerprod');
	var state=s.coo('sm_state');
	var province=s.coo('sm_province');
	var city=s.coo('sm_city');
	var address=s.coo('sm_address');
	if(address.length==0){
		s.modal("please insert property address")
		}else{	
	$.get("/ajax.php",{a:"supermenu_go"},res=>{		
		var html='';
		console.log(res);
		if(res!="NO"){
			api.ma.N('get',my,['propowner']);
		for(var i in res){
			html+=res[i];
		}		
		}else{
			html+='<h2 style="color:red">No results</h2>';	
		}
		$('#res').html(html);		
	},'json')
	}
}
function getSubMatch2(arr){
var sub='',values=$("#selectsub>option").map(function(){ return this.value });
api.form("subclassifbyid_"+LOC,function(data){
	for(var i in arr){
		if(!subclassArr.includes(arr[i])){
			subclassArr.push(arr[i])
			sub +='<option value="'+arr[i]+'" '+(s.coo("selectsub")==arr[i] ?'selected="selected"' :'')+'>'+data[arr[i]].subclassif+'</option>';
		}
	}
	$('#selectsub').append(sub);
});
}
function affloop(){
console.log('running affloop')
var subclassArr=[],locArr=[],ajaxfile="/ajax.php",board='',page_num=!s.coo('page_num') ? 1 : s.coo('page_num'),
select_active=s.coo('select_active')!=null ? s.coo('select_active') : '',
aff_order=s.coo('aff_order')!=null && s.coo('aff_order') !='0' ? s.coo('aff_order') : '',
aff_search=s.coo('aff_search')!=null && s.coo('aff_search') !='0' ? s.coo('aff_search') : '',
aff_status= s.coo('aff_status')!=null && s.coo('aff_status') !='0' ? s.coo('aff_status') : '',   
agent=G.CUR_DIR =='admin' ? my.uid : s.coo('affiliate'),
mode= G.mode=='requests' ? 'flow' : (G.mode=='requestser' ? 'requestser':'select'),
affstats= {3:dic.TAKE,4:"Pending",1:dic.REJECTED},
params={a:mode,b:agent,aff_order:aff_order,search:aff_search,aff_status:aff_status,dir:G.CUR_DIR,page_num:page_num};        
console.log(params);

$.get('/ajax.php',params,d=>{
	console.log(d);
if (d.length>0 && d!='NO'){
x('#counter').text(d[0].count);
for (var i in d){
//	getLocation2(d[i].uid1,d[i].city);
	if (G.mode =='list' && G.mode=='requests'){
		if(d[i].subclassif!=null){
			getSubMatch(d[i].id,d[i].subclassif)
			getSubMatch2(d[i].subclassif)
		}
		board +='<tr id="box'+d[i].uid1+'">' +
			'<td id="statustd'+d[i].uid1+'" class="'+(d[i].status==2 && d[i].job_closed==0 ? "active": (d[i].status==0 ? "gray":"inactive"))+'">' +
			'<div class="phAgentAff"><span class="photoBgEoi"><img src="'+iconic(d[i].img)+'" width="100%"></span></div>' +
			'<button onclick="gotoaff('+d[i].uid1+')" style="width:96%;margin:0 0 -6px 1px; display:'+(d[i].status==2 ? 'block' : 'none')+'" >' +
			'GO'+
			'</button></td>' +
			'<td>'+d[i].activity+'</td>' +
			'<td>' +
			'<button onclick="s.coo(&quot;mesuid&quot;,'+d[i].cid+');location.href=&quot;/mes&quot;" class="but120" title="CURRENT_TOPIC"></button>'+
			'<button data-uid0="'+d[i].uid1+'" data-uid="'+my.uid+'" class="but130" mode="1" id="chat_'+d[i].cid+'" title="Chat"><div class="totalChatNum chatc_'+d[i].cid+'"></div></button></td>' +
			'<td>'+d[i].jobid+'</td>' +
			'<td>'+d[i].code+'</td>' +
			'<td>'+d[i].name+'/'+d[i].pass +'</td>' +
			'<td>'+d[i].fname+'</td>' +
			'<td>'+G.afflist_source[d[i].source]+'</td>' +
			'<td class="locity'+d[i].uid1+'"></td>' +
			'<td id="msubclass'+d[i].id+'"></td>' +
			'<td>'+d[i].aeoi+'</td>' +
			'<td>'+d[i].acontact+'</td>' +
			'<td>'+d[i].reoi+'</td>' +
			'<td>'+d[i].interview+'</td>' +
			'<td>'+d[i].message+'</td>' +
			'<td>'+d[i].counter_renew+'</td>' +
			'<td>'+(d[i].service!=0 ? G.client_service_modes[d[i].service] : 'Not set')+'</td>' +
			'<td>'+(d[i].cert_id!=0 ? 'Yes' : 'NO')+'</td>' +
			'<td><input class="fuc'+d[i].uid1 +'" type="number" min="1" max="20" value="'+d[i].fuc+'"></td>' +
			'<td id="sendMailRead'+d[i].uid1+'">'+(d[i].status==2 ? (d[i].mail_sent==1 ? dic.MAIL_SENT : '<button id="sendMail_'+d[i].uid1+'" class="but1">'+dic.SEND+'</button>') : '')+'</td>' +
			'<td><span id="statuslabel'+d[i].uid1+'">'+(d[i].status==4 ? 'Pending from Employee' : (d[i].status==1 ? 'Inactive' : 'Active')) +
			'</span>'+(d[i].status!=4 ? (d[i].status==1 ? '<br/><button id="status_'+d[i].uid1+'_'+d[i].status+'">Activate</button>' : (d[i].release_button==1 ? '<br/><button id="status_'+d[i].uid1+'_'+d[i].status+'">Release</button>':''))+'</button>' : '')+'</td>' +
			'</tr>';
	} else if (G.mode=='requestser'){
		board +=d[i];							
		$('#speedloaderCon').hide();
	} else if (G.mode=='requests'){
		$('#taken').text(d[i].taken);
		$('#daily_take_limit').text(d[i].daily_take_limit);
		if (G.mobile){
			board +='<div id="fbox'+d[i].uid1+'" class="contactsTotalList2" style="background-color:#'+(i % 2==0 ? 'F5F4F4' : 'FBFBFB')+'">' +
				'<div class="imgcon"><div class="photoBgEoi"><div class="'+([2,6].includes(d[i].phase) ? 'user_online2b':'user_offline2b')+' userlinePosAg"></div><img src="'+d[i].pimage+'" class="phAgentAff2" height="40" width="40"></div></div>' +
				'<div class="agentInfoList">' +
				'<div class="stoixeiaSrEoiList">' +
				'<div class="agentInfoText"><span class="agentInfoTit"><button class="orderby" id="order_user.id">ID</button></span><span>'+d[i].uid1+'</span></div>' +
				'<div class="agentInfoText"><span class="agentInfoTit"><button class="orderby" id="order_user.code">'+dic.CODE+'</button></span><span>'+d[i].code+'</span></div>' +
				'<div class="agentInfoText"><span class="agentInfoTit"><button class="orderby" id="order_user.lastname">'+dic.FULLNAME+'</button></span><span style="float:left;width:100%;margin: 0 0 10px 0;">'+d[i].fname+(d[i].suspended==1 ? '</span><span class="readMembershipLabel">'+dic.SUSPENDED+'</span>' : '')+'</div>' +
				'<div class="agentInfoText"><span class="agentInfoTit"><button class="orderby" id="order_company.affiliate">'+dic.SERVICE+'</button></span><span>'+G.client_service_modes[d[i].service]+'</span></div>' +
				'<div class="agentInfoText"><span class="agentInfoTit"><button class="orderby">'+dic.CLASSIFICATION+'</button></span>' +
				'<span id="classif'+d[i].id+'"></span></div>' +
				'<div class="agentInfoText"><span class="agentInfoTit"><button class="orderby">'+dic.LOCATION+'</button></span>' +
				'<span class="locity'+d[i].uid1+'"></span></div>' +
				'<div class="agentInfoText"><span class="agentInfoTit"><button class="orderby" id="order_company.affiliate">'+dic.SERVICE_QUOTE+'</button></span><span>'+(d[i].status==3 || d[i].status==4 ? '<input type="checkbox" id="servicequote_'+d[i].uid1+'" '+(d[i].servicequote==1 ? "checked" : "")+' value="'+d[i].servicequote+'">' : '')+'</span></div>' +
				'<div class="agentInfoText"><span class="agentInfoTit"><button class="orderby" id="order_company.affiliate">'+dic.MIN_SERVICE_QUOTE+'</button></span><span>'+(d[i].status==3 || d[i].status==4 ? '<input type="checkbox" id="minservicequote_'+d[i].uid1+'" '+(d[i].minservicequote==1 ? "checked" : "")+' value="'+d[i].minservicequote+'">' : '')+'</span></div>' +
				'<div class="agentInfoText"><span class="agentInfoTit"><button class="orderby" id="order_company.affiliate">'+dic.TAKEN_DATE+'</button></span><span>'+(d[i].takentime!=0 ? date('Y-m-d H:i',d[i].takentime) : '')+'</span></div></div></div>' +
				'<div class="agentInfoList2"><span class="agentInfoConBut">' +
				'<span>'+([1,4].includes(d[i].status)
					? '<span class="inAgentsText">'+affstats[d[i].status]+'</span>'
					: (d[0].takestouse > 0 && d[0].total_takes_left > 0 && d[0].daily_take_counter < d[0].daily_take_limit && my.caff.accounts_left - my.caff.taken > 0
						? '<button onclick="take('+d[i].id+','+d[i].uid1+')" class="but1">'+dic.TAKE+'</button>' : ''))
				+ '</span></span></div></div>';
		} else {
			if (G.CUR_DIR =='admin'){
				classFromSub3(d[i].subclassif,'#classif'+d[i].id);
				board +='<tr id="fbox'+d[i].uid1+'"><td>'+d[i].id+'</td><td>'+d[i].code+'</td>' +
					'<td><img src="'+d[i].pimage+'" class="phAgentAff" height="40" width="40"></td>' +
					'<td><span style="float:left;width:100%;margin: 0 0 10px 0;">'+d[i].fname+(d[i].suspended ? '</span><span class="readMembershipLabel">'+dic.SUSPENDED+'</span>' : '')+'</td>' +
					'<td id="classif'+d[i].id+'" style="width:136px;"></td>' +
					'<td class="locity'+d[i].uid1+'" style="width:96px;"></td>' +
					'<td>'+G.client_service_alias[d[i].service]+ '</td>' +
					'<td>'+(d[i].status==3 || d[i].status==4 ? '<input type="checkbox" id="servicequote_'+d[i].uid1+'" '+(d[i].servicequote==1 ? "checked" : "")+' value="'+d[i].servicequote+'">' : '')+'</td>' +
					'<td>'+(d[i].status==3 || d[i].status==4 ? '<input type="checkbox" id="minservicequote_'+d[i].uid1+'" '+(d[i].minservicequote==1 ? "checked" : "")+' value="'+d[i].minservicequote+'">' : '')+'</td>' +
					'<td>'+(d[i].takentime!=0 ? date('Y-m-d H:i',d[i].takentime) : '')+'</td>' +
					'<td>'+(d[i].status==4 ? 'PENDING':
							(d[i].status==3 && d[0].takestouse > 0 && d[0].total_takes_left > 0 && d[0].daily_take_counter < d[0].daily_take_limit ? '<button id="take_'+d[i].id+'" class="but1">'+dic.TAKE+'</button>': (d[i].status==1 ? "REJECTED":""))
					)+'</td>'
					+'</tr>';
			}else if(G.mode=='requests'){									
				classFromSub3(d[i].subclassif,'.classif'+d[i].id);
				board +='<tr id="fbox'+d[i].uid1+'"><td>'+d[i].uid1+'</td><td>'+d[i].code+'</td>' +
					'<td><div class="photoBgEoi"><div class="'+([2,6].includes(d[i].phase) ? 'user_online2b':'user_offline2b')+' userlinePosAg"></div><img src="'+d[i].pimage+'" class="phAgentAff" height="40" width="40"></div></td>' +
					'<td><span style="float:left;width:100%;margin: 0 0 10px 0;">'+d[i].fname+(d[i].suspended ? '</span><span class="readMembershipLabel">'+dic.SUSPENDED+'</span>' : '')+'</td>' +
					'<td>'+G.client_service_alias[d[i].service]+'</td>' +
					'<td class="'+(s.coo('affiliate_grp')==1 ? 'classif'+d[i].id : (d[i].status ==4 ? 'classif'+d[i].id:''))+'" style="width:136px;"></td>' +
					'<td class="'+(s.coo('affiliate_grp')==1 ? 'locity'+d[i].uid1 : (d[i].status ==4 ? 'locity'+d[i].uid1:''))+ '" style="width:96px;"></td>' +
					'<td>'+(d[i].status==3 || d[i].status==4 ? '<input type="checkbox" id="servicequote_'+d[i].uid1+'" '+(d[i].servicequote==1 ? "checked" : "")+' value="'+d[i].servicequote+'">' : '')+'</td>' +
					'<td>'+(d[i].status==3 || d[i].status==4 ? '<input type="checkbox" id="minservicequote_'+d[i].uid1+'" '+(d[i].minservicequote==1 ? "checked" : "")+' value="'+d[i].minservicequote+'">' : '')+'</td>' +
					'<td>'+(d[i].takentime!=0 ? date('Y-m-d H:i',d[i].takentime) : '')+'</td>' +
					'<td>'+([1,4].includes(d[i].status) ? affstats[d[i].status]
						: (d[0].takestouse > 0 && d[0].total_takes_left > 0 && d[0].daily_take_counter < d[0].daily_take_limit
							? '<button onclick="take('+d[i].id+','+d[i].uid1+')"  id="take_'+d[i].id+'" class="but1">'+dic.TAKE+'</button>' : ''))+'</td>' +
					'</tr>';
				}
			}
			if(d[i]['subclassif']!='-' && (s.coo('affiliate_grp')==1 || d[i].status ==4)){subclassArr.push(d[i]['subclassif']);}
			if(d[i]['city']!='-' && (s.coo('affiliate_grp')==1 || d[i].status ==4)){locArr.push(d[i]['city']);}
		}
	}                
$('.aflist').html(board)
if ((mode =='flow' && G.mode=='requests')|| G.mode=='requestser'){
	getSubMatch3(subclassArr);
	getLocMatch3(locArr);
	x('#taken_counter').text(d[0].taken);
	// $('.take_counter').text(d[0].taken);
	x('#accepted_taken_counter').text(d[0].accepted_taken);
	x('#takesleft_counter').text(d[0].takes_left);
	x('#rejected_counter').text(d[0].rejected);
	x('#takestouse_counter').text(d[0].takestouse);
	x('#daily_take_limit').text(d[0].daily_take_limit);
	x('#daily_take_counter').text(d[0].daily_take_counter);
	x('#agent_requests').html('<span class="tabAg4NumB">'+d[0].count+'</span><span class="tabAgSl">/</span>');
	pagination(page_num,d[0].count,20,G.mode);
}			
} else {
x('.aflist').html('<tr>'+dic.NO_RESULTS_FOUND+'</tr>');
}
},'json')
}
function getSubMatch3(subclassArr){
var subclassArr= $.unique(subclassArr),sub='<option value=0>All Subclassifications</option>',div=G.mode=='requests' ? 'selectsub1' : 'selectsub';
for (var i in subclassArr){sub +='<option value="'+subclassArr[i]+'" '+(s.coo(div)==subclassArr[i] ? 'selected="selected"' : '')+'>'+G.subclassifbyid[subclassArr[i]].s+'</option>';}
x('#'+div).html(sub);    
}
function getLocMatch3(locArr){
var sub='<option value=0>All Locations</option>',div=G.mode=='requests' ? 'selectloc1' : 'selectloc',locArr2={},locArr3={};
for (var i in locArr){if(locArr[i]!=0 && typeof locArr[i]!='undefined' && typeof G.locationbyid[locArr[i]].pid!='undefined'){locArr2[G.locationbyid[locArr[i]].pid]=G.locationbyid[locArr[i]].p;}}        
for (var i in locArr2){locArr3[locArr2[i]]= G.provincecitylist[i].join();}
for (var i in locArr3){sub +='<option value="'+locArr3[i]+'" '+(s.coo(div)==locArr3[i] ? 'selected="selected"' : '')+'>'+i+'</option>';}
x('#'+div).html(sub);          
}

function manage(){
console.log('running '+G.apt);
var html='',manage_page=!s.coo('manage_page') ? 1 : s.coo('manage_page');
worker({a: 'manage',manage_page: manage_page},d=>{	
var data=JSON.parse(d.data);
console.log(data)
	if (data !='NO'){
	for (var i in data){
	html +=data[i];		
	}
	}else{
	html +='<div class="setboxagentnores">'+dic.NO_AFFILIATE_EMPLOYEES+'</div>';
	}
	$('#aflist').html(html);
	$('#speedloaderCon').hide();
	// $('.aflist').html(html);		
});
/*
* GET client counter when
* */
var manage_count= !s.coo('manage_count') || !!s.coo('mcli_q') || !!s.coo('job_status') || !!s.coo('newjobquote') || !!s.coo('sfuc') ? "" : parseInt(s.coo('manage_count'));
if(manage_count==""){
		xget({a: 'manage_counter'},d=>{	
	console.log("manage_count"+d)		
		if (d > 0){
			$('#manage_count').text(d);s.coo('manage_count',d);
		} else {
			$('#manage_count').html(0);
		}
		pagination(manage_page,d,10,"manage");
	},'json');
	 }else{
		$('#manage_count').text(manage_count);
		pagination(manage_page,manage_count,10,"manage");
	 }
	// if(!ses('manage_subs')){
		//update 
	var dateObj=s.Dat();
	var month=("0"+(dateObj.getMonth()+1)).slice(-2); //months from 1-12
	var day=("0"+(dateObj.getDate()-1)).slice(-2);
	var year=dateObj.getUTCFullYear();
	var date= year+'-'+month;
	var datefrom= date+'-'+day;
	//var dateto= year+'-'+month+'-'+("0"+(dateObj.getDate()+1)).slice(-2);
	var dateto= year+'-'+month+'-'+("0"+(dateObj.getDate()+1)).slice(-2);
	//TEMP var params={datefrom: datefrom,dateto: dateto}
		var params={},mystate=my.state;
		xget({a: 'manage_subs'},function(d){
			console.log(d)
			api.mo.getOne('subclassifs',params,function(subs){
			//s.cors(CONF.apimongourl +"subclassifs",params,function(subs){
				console.log(subs)
				// manageubs(d);
				// ses('manage_subs',JSON.stringify(d));
				var agentsubs='<option value="0">'+dic.ALL_CLASSIFICATIONS+'</option>';
				for (var i in d){							
				var statesum= subs!='NO' ? 
				(!subs.s ? 0 : 
					(!subs.s[d[i]] ? 0 : 
					(my.affiliate==1 ? subs.s[d[i]]['post'] 
					:(!subs.s[d[i]]['ps'] ? 0 :subs.s[d[i]]['ps'][mystate]))
					)
				)
				:0;												
					var selected=s.coo('selectsub')==d[i] ? 'selected="selected"' : '';
					agentsubs +='<option value="'+d[i]+'" '+selected+'>'+i+' ('+ statesum+')</option>';
				}
				$('#agentsubs').html('<select id="selectsub">'+agentsubs+'</select>');					
			})
		},'json');
	// }else{
	//     manageubs(JSON.parse(ses('manage_subs')));
	// }
}

function manager(){
var html='',manager_page=!s.coo('manager_page') ? 1 : s.coo('manager_page');
worker({a: 'manager',manager_page: manager_page},d=>{
var data=JSON.parse(d.data);
console.log(data);
	if (data !='NO'){					
		for (var i in data){
		html +=data[i];										
		}				
	}else{
		html +='<div class="setboxagentnores">'+dic.NO_AFFILIATE_EMPLOYEES+'</div>';
	}
	$('#aflist').html(html);
	$('#speedloaderCon').hide();   
});
/*     * GET client counter        * when        * */
var count= !s.coo('manager_count') ? "" : parseInt(s.coo('manager_count'));
	 console.log("manager_count"+count)
if(count==""){
	worker({a: 'manager_counter'},function(e){				
		var res=e.data;
				if (res > 0){
					x('#manager_count').text(res);
					s.coo('manager_count',res);
				} else {
					x('#manager_count').html(0);
				}
				pagination(manager_page,res,10,G.mode);
		});
	 }else{
		$('#manager_count').text(count);
		pagination(manager_page,count,10,G.mode);
	 }
	var dateObj=s.Dat();
	var month=("0"+(dateObj.getMonth()+1)).slice(-2); //months from 1-12
	var day=("0"+(dateObj.getDate()-1)).slice(-2);
	var year=dateObj.getUTCFullYear();
	var date= year+'-'+month;
	var datefrom= date+'-'+day;
	var dateto= year+'-'+month+'-'+("0"+(dateObj.getDate()+1)).slice(-2);
		xget({a: 'manager_subs'},function(data){
			c('warn',{datefrom: datefrom,dateto: dateto})
			api.mo.getOne('subclassifs',{},function(subs){
			//s.cors(CONF.apimongourl +"subclassifs",params,function(subs){
				// managerubs(data);
				// ses('manager_subs',JSON.stringify(data));
				var agentsubs='<option value="0">'+dic.ALL_CLASSIFICATIONS+'</option>';
				for (var i in data){							
				var statesum= subs!='NO' ? 
				(!subs.s[data[i]] ? 0 : (!subs.s[data[i]]['post'] ? 0 : (my.affiliate==1 ? subs.s[data[i]]['post'] :(!subs.s[data[i]]['ps'] ? 0 :subs.s[data[i]]['ps'][mystate]))))
				:0;												
					var selected=s.coo('selectsub')==data[i] ? 'selected="selected"' : '';
					agentsubs +='<option value="'+data[i]+'" '+selected+'>'+i+' ('+ statesum+')</option>';
				}
				$('#agentsubs').html('<select id="selectsub">'+agentsubs+'</select>');					
			})
		},'json');
}
// function clientsubs(data){
//     var agentsubs='<option value="0">All classifications</option>';
//     // $.get(pathSubclassifbyidJSON,function(sub){
//         for (var i in data){
//             var selected=s.coo('selectsub')==data[i] ? 'selected="selected"' : '';
//             agentsubs +='<option value="'+data[i]+'" '+selected+'>'+sub[data[i]].s+'</option>';
//         }
//         $('#agentsubs').html('<select id="selectsub">'+agentsubs+'</select>');
//     // })
// }/*     * GET client counter        * when        * */

function updateaffee(obj){
$('#loader').show();
var preventkey=s.coo('affiliate_grp')=="1" ? 'prevent_update_timer_int' : 'prevent_update_timer_ext';
var preventime=parseInt(G.is[preventkey]);
if(!s.coo(preventkey)){
console.log('running worker update_affee...')
worker({a:'update_affee'},function (e){
	console.log(e)
	if (e.data =='OK'){
		s.coo(preventkey,1,preventime);
		$('#update_affee').hide();
		s.notify('good','worker update_affee finished...')
	   location.reload();
	}
})
}
}
function certauthcode(){
var authCode=$('#certAuthCode').val();
var cv_id=$('#postid').val();
xget({a:'authenticate_cert_panel',b:authCode,c:cv_id},function(data){
if(data!='NO'){
	toggledit('#certAuthPanel','#certEdit');
	x('#cert_company').text(data.company);
	x('#cert_name').val(data.agent_name);
	x('#cert_fee').val(data.fee);
	x('#cert_assessment').val(data.assessment);
	if(!s.coo('su_uid')){
		//if certified activate_edit
		$('.editCyanBox,.but63,.but160,.adAdvPref,.visibilityBoxLock,.visibilityBox,.visibilityRed,.vis1,.vis2,.vis3').css('display','block');
	}
}else{
	s.notify('error',dic.AGENT_AUTH_CODE_NOT_CORRECT);
}
},"json");
}
function certedit(id){
var certForm= $("#certForm"+id).serializeArray();
//var afee= x('#afee'+id).val();
var cert_name= $('#cert_name').val();
var subsidy= x('#csubsidy'+id).val();
subsidy=typeof(subsidy)!='undefined' ? subsidy : 0;
// certForm.push({name:'agency_fee_applicable',value:afee} );
// certForm.push({name:'subsidy_applicable',value:subsidy} );
if(cert_name!=''){
s.confirm(dic.AFTER_SUBMITTING_FORM_CERTIFIED_CLIENT,function(result){
	if (result){
		$.post("/ajax.php",certForm,function(data){
			if (data==='OK'){
				api.ma.my('get',my,['certs']);
				window.setTimeout(()=>{location.reload();},5000);	
			} else if(data =='certrenew'){
				s.modal(dic.DUE)
			} else {
				s.modal(dic.CERTIFICATION_FORM_NOT_CORRECT);
			}
		})
	}
})
}else{
s.modal(dic.AGENT_NAME_REQUIRED);
x('#cert_name').focus();
}
}
//requestser manager 
function agentfee(id,obj){	
var html=$(obj).html();
$.post("/ajax.php",{a:'agentfee',b:html,c:id});		
}	
function quote(o){
var val=o.checked?1:0,id=o.getAttribute('quid');
console.log({a:'quote',b:val,c:id})
$.post('/ajax.php',{a:'quote',b:val,c:id},d=>{console.log(d)});		
}
function notes(o,id){
$.post("/ajax.php",{a:'notes',b:$(o).html(),c:id});
}
function fucdate(o,id){xget({a:'fucdate',b:o.value,c:id});} 
$(document)
//setup uploader
.on("click","button[id^='page']",function(){
document.querySelectorAll('.but45').forEach(e => e.setAttribute('class',''));
this.className="but45";
var exp=explode('_',this.id),pgtitle=exp[0].replace('page',''),page=exp[1];
if(pgtitle!=''){
	s.coo(pgtitle+'_page',page);
	}
gotopage(page)
})	
.on("keyup change","input[id^='agent_remarks'],input[id^='fee1'],input[id^='fee2'],input[id^='invoice_id1'],input[id^='invoice_id2'],input[id^='invoice_id2agent'],select[id^='agent_policy0'],select[id^='job_status']",function(){
var exp= explode('-',this.id); xget({a:exp[0],b:this.value,c:exp[1]},d=>{console.log(d);});
})
/** FROM PROFILE.JS* */
//save instructions message
.on('click','#instructionsSubmit',function(e){
	e.preventDefault()
var instructions =x("#certIstruc").val();
console.log(instructions)
$.post("/ajax.php",{a:'instructions_message',b:instructions},function(d){if(d=='OK'){
	api.ma.my('get',my,['agentdata']);
	s.notify('error',dic.INSTRUCTIONS_MESSAGE_UPDATED);}});
})
.on("click","#quoteIntroSubmit",function(){
event.preventDefault();
var quoteIntro=x("#quoteIntroForm").serializeArray();
console.log(quoteIntro)
$.post("/ajax.php",quoteIntro,function(data){	if (data=='OK'){
		api.ma.my('get',my,['agentdata']);	
	s.notify('error',dic.QUOTE_INTRODUCTION_SAVED);
	}
});
return false;
})
.on("click","input[id^='deposit']",function(){
var quote= this.id.replace('deposit','');
var value= this.checked ?  1 : 0;
xget({a:'deposit',b:value,c:quote},function(rs){
if(rs=='OK'){api.ma.my('get',my,['agentdata'])}
})
})
.on("click","button[id^='submit_quote_']",function(){
var id=this.id.replace('submit_quote_','');
var txt=x('#input_text_'+id).val();
var price=x('#input_price_'+id).val();
var min=parseFloat(x('#input_price_'+id).attr('min'))
if(price < min){
s.notify('error',dic.PRICE_HIGHER_MIN+"<b>"+min+"</b>")
}else {
  $.post("/ajax.php",{a:'quote_text',b:txt,c:price,d:id},data=>{
console.log(data);	
	if (data=='OK'){
		api.ma.my("get",my,["agentdata"],d=>{
		s.notify('good',G.client_service_modes[id]+dic.QUOTE_UPDATED);
		x('#read_text_'+id).text(txt)
		x('#read_price_'+id).text(price)
		var price_total= parseFloat(price)+(parseFloat(price) * parseFloat(G.vat));
		x('#read_price_total'+id).text(price_total)
		toggledit('#readLicence'+id,'#editLicence'+id);
		});
	}
})
}
})
//change price in service quote
.on("keyup change","input[id^='renew_price'],input[id^='newjob_price']",function(){
var exp= explode('-',this.id);
console.log(exp)
xget({a:exp[0],b:this.value,c:exp[1]},function(data){api.ma.my("get",my,['aff'])});
})
.on("click","#affiliateSubmit",function(){
	var auth=x('#authCode').val();
	$.get('/ajax.php',{a:'transfer',b:auth},function(data){
		console.log(data)
			if (data =='1'){
				var agent=JSON.parse(s.coo('SPAFFAUTH'));
				api.ma.my('get',agent.uid,['agentdata','caff'],d=>{
				// s.notify('error',dic.TRANSFER_ACCOUNT_COMPLETED_SUCCESSFULLY);
				location.reload();
				});
			} else if (data =='2'){
				s.notify('error',dic.AUTHENTICATION_NUMBER_NOT_CORRECT_CONTACT_AGENT);
			} else if (data =='3' || data =='5'){
				s.notify('error',dic.AUTHENTICATION_CODE_MISTAKEN);
			} else if (data =='4' || data =='6'){
				s.notify('error',dic.PLEASE_CONTACT_AGENT);
			} else {
				if (data.error_code==4){
					s.notify('error',dic.RECRUITMENT_AGENCYS_LICENSE_EXPIRED)
				} else {
					s.notify('error',dic.AUTHENTICATION_UNSUCCESSFUL_TRY_LATER);
				}
			}
	},'json');
})
.on("click","button[id^='pcheckout_']",function (){
var trans= this.id.replace('pcheckout_','');
xget({a:'pcheckout',b:trans},function(data){
	checkout(data['price_total'],data['transaction'],data['description'],data['payment_type']);
	var form_post=document.getElementById('checkoutroute');
	form_post.submit();
},'json');
})
$(document).on("change","select[id^='upgrade_service']",function(){
var affid=this.id.replace('upgrade_service','');
xget({a:'upgrade_service',b:this.value,c:affid});
})
.on("click","button[id^='job_closed']",function(data){
var id=this.id.replace('job_closed','');
if(!['3','10','15','16','17','22'].includes(x('#job_status-'+id).val())){
s.notify('error',dic.JOB_STATUS_HINT)
}else if(x("button[class^='lockV2']").length==1){
s.notify('error',dic.UNPAID_ACCOUNTS)
}else {
s.confirm(dic.JOB_WILL_CLOSED_SURE,function(res){
	if (res){xget({a: 'job_closed',b: id},function(data){
			if (data =='OK'){
				api.ma.my('get',['aff'],()=>{
				location.reload();	
				});				
				}
		});
	}
})
}
})
.on('click',"input[id^='contract_privacy']",function(){
var job=this.id.replace('contract_privacy','');
var val=x('#contract_privacy_value').val() ==1 ? 0 : 1;
this.className='lockView'+val;
x('#contract_privacy_value').val(val)
api.ma.set("aff_jobs SET contract_privacy=? WHERE id=?",[val,job],
d=>{if(d=="OK"){s.notify("success","saved")}else{s.notify("error"," not saved")}}
)
})
.on('click',"button[id^='contract_accept']",function(){
this.disabled=true;
var job=this.id.replace('contract_accept','');
xget('?a=contract_accept&b='+job);
})
.on('click',"input[id^='contract_text_privacy']",function(){
var job=this.id.replace('contract_text_privacy','');
var val=x('#contract_text_privacy_value').val() ==1 ? 0 : 1;
this.className='lockView'+val;
x('#contract_text_privacy_value').val(val)
api.ma.set("aff_jobs SET contract_text_privacy=? WHERE id=?",[val,job],
d=>{if(d=="OK"){s.notify("success","saved")}else{s.notify("error"," not saved")}}
)
})
.on("click","#jobOpen",function(data){
this.style.display='none';
xget({a:'jobOpen'},function(data){
	if(data=='OK'){location.reload();}
});
})
.on("change","select[id^='uid2_hired']",function(){
var id= this.id.replace('uid2_hired','');
console.log({a:'uid2_hired',b:this.value,c:id})
xget({a:'uid2_hired',b:this.value,c:id},function(data){
	if(data!='NO'){
		x("#uid2_hired_read"+id).text(data);
		x("#save_new_employer"+id).show();
	}else{
		x("#uid2_hired_read"+id).text('No Employer');
	}
})
})
//SAVE NEW EMPLOYER
.on("click","button[id^='save_new_employer']",function(data){
var id= this.id.replace('save_new_employer','');
var uid= x("#uid2_hired"+id).val();
xget({a:'save_new_employer',b:uid,c:id},function(data){
	if(data=='OK'){
		x("#fee2-"+id).prop('disabled',false);
		x("#fee2_invoice-"+id).prop('disabled',false);
		x("#collect_service2-"+id).prop('disabled',false);
		x('#save_new_employer'+id).hide();
		x('#cancel_new_employer'+id).show();
		s.notify('error',dic.NEW_EMPLOYER_SAVED);
	}
});
})
//CANCEL NEW EMPLOYER
.on("click","button[id^='cancel_new_employer']",function(){
var id= this.id.replace('cancel_new_employer','');
xget({a:'cancel_new_employer',b:id},function(){
	$("#fee2-"+id).prop('disabled',true);
	$("#fee2_invoice-"+id).prop('disabled',true);
	$("#collect_service2-"+id).prop('disabled',true);
	$('#cancel_new_employer'+id).hide();
	x('#uid2_hired_read'+id).text('No Employer');
	x('#uid2_hired'+id).val(0);
})
})
//submit contract form
.on("click","span[id^='submitContractText']",function(){
var id= this.id.replace('submitContractText','');
//	event.preventDefault();
var contract=x("#contractForm"+id).serializeArray();
$.post("/ajax.php",contract,function(data)	{
		if (data=='OK'){
			x('#signatureBox').show();
			s.notify('error',dic.CONTRACT_FORM_UPDATED);
		}
	});
return false;
})
/*
* sendInvoiceEmployer/e suspend account
* */
.on("click","input[id^='collect_service1'],input[id^='collect_service2']",function(){
var exp= explode('-',this.id);
var id= exp[1];
var val= exp[0].replace('collect_service','')
//var spcode= grp==1 ? my.code : $('#employer_uid').val();
var value= this.checked ? 1 : 0;
var name= val==1 ? my.name : x('#uid2_hired_read'+id).text();
if(value==1){
	s.confirm(dic.ABOUT_TO_SEND_INVOICE_TO+ " <b>"+name+"</b>. " +dic.SURE_ALL_INFO_CORRECT+ " ",function(result){
		if (result){
			xget({a: exp[0],b: value,c:id});
		}else{
			$('#'+exp[0]).prop('checked',false)
		}
	})
}else{
	xget({a: exp[0],b: value,c:id});
}
})
/*new job payment*/
.on("keyup","input[id^='renew_price-']",function(){
var min= parseFloat(this.getAttribute('min')); 
if(this.value < min){ 
s.notify('warn',dic.THIS_PRICE_CANNOT_BE_SET);
this.value=min;return false
}
})
.on("click","input[id^='renew_pay']",function(){
var affid= this.id.replace('renew_pay',''),
value= this.checked ?  1 : 0,rp= x('#renew_price-'+affid),
hint=value ==1 ? 'paid by client' : 'paid by agent';
xget({a:'renew_pay',b:value,c:affid},function(data){
	x('#renew_pay_read').text(hint);
	if(value==0){rp.prop('disabled',true);}else{rp.prop('disabled',false);}
	rp.val(data);
});
})
/*release*/
.on("click","#release_agent",function(){
var aff=x('#aff').val();
s.confirm(dic.REJECT_OFFER_RELEASE_AGENT_SURE,function(result){
	if(result){
		xget({a:'release',b:aff},function(data){
			if(data=='OK'){
				api.ma.my('get',["user",'aff','affee','certs']);
				s.notify('error',dic.AGENT_RELEASED)
				location.reload();
			}else{
				s.notify('error',dic.CANNOT_BE_RELEASED)
			}
		})
	}
})
})
/*newjob description*/
.on("keyup","input[id^='newjob_description']",function(){
var affid= this.id.replace('newjob_description','');
xget('?a=newjob_description&b='+this.value+'&c='+affid);
})
/*newjob privacy*/
.on("click","button[id^='newjobprivacy']",function(){
var newjobstatus={0:'Paid',1:dic.ISSUE_PAYMENT_REQUEST,2:dic.REQUEST_SENT,3:dic.ISSUE_QUOTE_REQUEST}
var exp=explode('_',this.id);
var jobid=x('#aff').val();
var val=exp[1]==2 ? 1 : 2;
this.className='lockV'+val;
this.setAttribute('id',exp[0]+'_'+val);
var hint= my.agentdata.collect_money!=1 && val==1 ? newjobstatus[3]: newjobstatus[val];
this.textContent=hint;
xget({a:'newjob_privacy',b:val,c:jobid},function(data){
	if(val==2 && data=='check_sblock'){
		$("input[id^='sblock']").prop('checked',true);
	}else if(data=='uncheck_sblock'){
		$("input[id^='sblock']").prop('checked',false);
	}
	api.ma.my('get',my,['aff']);
});
})
.on("click","input[id^='activate_permission1']",function(){
var aff= this.id.replace('activate_permission1','');
var val= this.checked ?  1 : 0;
xget({a:'activate_permission1',b:val,c:aff},d=>{api.ma.my('get',my,['aff']);});
})
.on("click","input[id^='mail_permitted']",function(){
var aff= this.id.replace('mail_permitted','');
var val= this.checked ?  1 : 0;
xget({a:'mail_permitted',b:val,c:aff},d=>{api.ma.my('get',my,['aff']);});
})
.on("click","input[id^='view_auth']",function(){
var aff= this.id.replace('view_auth','');
var val= this.checked ?  1 : 0;
xget({a:'view_auth',b:val,c:aff},d=>{api.ma.my('get',my,['aff']);});
})
.on("click","input[id^='view_received']",function(){
var aff= this.id.replace('view_received','');
var val= this.checked ?  1 : 0;
xget({a:'view_received',b:val,c:aff},d=>{api.ma.my('get',my,['aff']);});
})
.on("click","input[id^='sblock']",function(){
var aff= this.id.replace('sblock','');
var val= this.checked ?  1 : 0;
xget({a:'sblock',b:val,c:aff},d=>{api.ma.my('get',my,['aff']);});
})
.on("click","input[id^='attachment_privacy']",function(){
var aff= this.id.replace('attachment_privacy','');
var val= this.checked ?  1 : 0;
xget({a:'attachment_privacy',b:val,c:aff},d=>{api.ma.my('get',my,['aff']);});
})
.on("click","input[id^='pdf_privacy']",function(){
var aff= this.id.replace('pdf_privacy','');
var val= this.checked ?  1 : 0;
xget({a:'pdf_privacy',b:val,c:aff},d=>{api.ma.my('get',my,['aff']);});
})
.on("click","input[id^='scope_visible']",function(){
var aff= this.id.replace('scope_visible','');
var val= this.checked ?  1 : 0;
xget({a:'scope_visible',b:val,c:aff},d=>{api.ma.my('get',my,['aff']);});
})
.on("click","input[id^='jobcheck']",function(){
var id=this.id.replace('jobcheck','');
var value=this.checked ? 1: 0;
xget('?a=jobcheck&b='+value+'&c='+id);
})
.on("click","#alljobcheck",function(){
$.get('/ajax.php',{a:'alljobcheck'},function(data){
	if(data!='NO'){
		$('input:checkbox').prop('checked',false);		
		}
});
})
/* certify auth code */
.on('click',"#certAuthCodeSubmit",function(){
certauthcode();
})
.on('click',"#agentdetails",function(){
if(this.checked){this.value=1;}else{this.value=0;}
toggledit('#agentdetailsdat0','#agentdetailsdat1');
})
/* certify panel */
.on('click',"#contractSubmit",function(){
$.post("/ajax.php",{a:'contract_text',b:$('#contract_text').val(),c:$('#jobid').val()},function(data){	
if(data=='OK'){s.notify('good',dic.CONTRACT_SAVED);}else{s.notify('error',"Contract text not saved");}
})
})
.on('click',"button[id^='certEditSubmit']",function(e){
	e.preventDefault();var id=this.id.replace('certEditSubmit','');certedit(id);
	})
//certified filter
.on('click',"input[id^='cf_']",function(){
var val=this.value;
var id=this.id.replace('cf_','');
xget({a:'certifiedF',b:id},function(data){
x('#cfr').text(G.certified_filters_list[val])
my.certifiedF=val;
});
})
//received eoi filter
.on('click',"input[id^='reoi_']",function(){
var id=this.id.replace('reoi_',''),thisval=this.value;
$.get('/ajax.php',{a:'receivedeoiF',b:id},d=>{	
	api.ma.my('get',my,['user']);
	x('#reoir').text(G.certified_filters_list[thisval])
});

})
//agent aff_job hired date
.on('click','#hired_date_submit',function(){
var job= x('#job').val();
var hd= x('#hired_date').val();
xget({a:'hired_date',b:hd,c:job},function(data){
if(data='OK'){s.notify('error',dic.DATE_HIRED_SAVED);}
})
})
.on('click',"input[id^='feeprivacy'],input[id^='certprivacy']",function(){
var cert_id=x('#cert_id').val();
var exp=explode('_',this.id);
var val=exp[1]==1 ? 0 : 1;
x('input[name='+(exp[0]=='feeprivacy'?'fee_privacy':'privacy')+']').val(val)
this.className='lockView'+val;
this.setAttribute('id',exp[0]+'_'+val);
xget('?a='+exp[0]+'&b='+cert_id+'&c='+val);
})
.on('click',"#afee,#csubsidy,#cert_terms,#contract_management",function(){
var val= this.checked ? 1 : 0; this.value=val;
if(this.id=='afee'){
if(val==1){x('#cafee_help').html(dic.AGENT_FEE_TEXT1+' <b>'+x('#agent_name').val()+'</b>. '+dic.AGENT_FEE_TEXT2)}else{x('#cafee_help').html('')}
}
if(this.id=='csubsidy'){
if(val==1){ x('#csubsidy_help').html(dic.TERMS_TEXT)}else{ x('#csubsidy_help').html('')}
}
if(this.id=='afee' && x('#csubsidy').prop('checked')!=true){
if(val==1){
	x('#cdescription').text(dic.AGENT_FEE)
	x('#cassessment').text(dic.TERMS_CONDITIONS)
}else{
	x('#cdescription').text(dic.DESCRIPTION)
	x('#cassessment').text(dic.AGENT_ASSESSMENT)
}
}else if(this.id=='csubsidy'){
if ($('#afee').prop('checked')!=true){
	if (val==1){
		x('#cassessment').text(dic.OTHER_INFORMATION)
		x('#cdescription').text(dic.DESCRIPTION)
	} else {
		x('#cassessment').text(dic.AGENT_ASSESSMENT)
		x('#cdescription').text(dic.DESCRIPTION)
	}
}else{
	if (val==0){
		x('#cdescription').text(dic.AGENT_FEE)
		x('#cassessment').text(dic.TERMS_CONDITIONS)
	}
}
}else if (this.id=='csubsidy' || this.id=='afee'){
if(x('#csubsidy').prop('checked')==true && x('#afee').prop('checked')==true){
	x('#cassessment').text(dic.TERMS_CONDITIONS)
	x('#csubsidy_help').html(dic.TERMS_TEXT)
}else{
	x('#cassessment').text(dic.OTHER_INFORMATION)
}
x('#cdescription').text(dic.DESCRIPTION)
}
})
	//scroll
if(G.mobile){
$(document).scroll(function (e){
	if ($(this).scrollTop() > 242){
		x("#phAgentGovern2").addClass("fix-bar");
	} else {
		x("#phAgentGovern2").removeClass("fix-bar");
	}
})
}
$(document).on('click',"#update_affee",function(){
updateaffee(this)
})
//****************************MESSAGE********************//
function confirmationText(cvid,cid){
//errrr in decodeURIComponent(agent.replace(/\+/g,' '))
var ctermsd=!s.coo('ctermsd_'+cvid) ? 0 : s.coo('ctermsd_'+cvid);
var agnt= cvid!=0 && !!cvid ? s.coo('ctermsa_'+cvid) : s.coo('ctermsc_'+cid);
var agent=!agnt ? s.coo('ctermsc_0') : agnt;
return dic.HIGH_QUALITY_CANDIDATE +': <strong>'+agent+'</strong><br/><br/>'+dic.TO_DIRECT_CONTACT_AND_INTERVIEW+(ctermsd!=0 ? '<span class="acceptTermsPop">'+ctermsd+'</span>':'')+'<span class="acceptTermsPop2"><span class="acceptTermsTick"><input type="checkbox" data-cid="'+cid+'" data-cvid="'+cvid+'" id="confirmTerms"></span>'+dic.AGREE_TO_RECRUITMENT_AGENCY+'</span>';
}

function mesnew(obj){
	s.coo('mesid','new');
	var uid=$(obj).attr('uid');
	s.coo('mesuid',uid);
	meshisloop();
}
function sendMes(data){
	s.coo('mesmode','inbox');		
	var id=s.coo('mesid');
	var uid=parseInt(s.coo('mesuid'));
if(!!id && id!='new'){ //reply
	api.mo.getOne("message",{_id:id},d0=>{
	var uid=d0.from==my.uid ? parseInt(d0.to) : parseInt(d0.from),
	stfrom= d0.from==my.uid ? 'statusfrom':'statusto',	
	stto=   d0.from==my.uid ? 'statusto':'statusfrom',
	untitle=d0.from==my.uid ? 'unreadto' :'unreadfrom',		
	un=     d0.from==my.uid ? parseInt(d0.unreadto)+1 :parseInt(d0.unreadfrom)+1,
	crit={$push:{chat:{u:my.uid,c:data.messageText,t:time()}},$set:{[stfrom]:3,[stto]:1,[untitle]:un}};
	
	api.mo.fup("message",{_id:id},crit,d=>{
	  if (d.ok){
		  xget({a:"amail",b:s.coo('mesuid')},dat=>{console.log(dat);})
		  s.notify('good',"Message sent");
		  api.ma.N('set',uid,['mes'],d1=>{soc.send({type:"N",to:uid})});
		  api.ma.N('set',my,['mes'],d2=>{
				loadN();			  
				x('#topic').prop('disabled',true);
				mesloop(0,'sent').then(resid=>meshisloop(id));
				nicEditors.findEditor("messageText").setContent('');
		  });
	  } else {
		  s.notify('error',dic.PROBLEM_SENDING_MESSAGE);
	  }
	})  
	});
}else{ //new message send
	var uid=parseInt(s.coo('mesuid'));
	api.ma.getOne("name,fname,img from ur where uid=?",[uid],d=>{			
	  console.log(d);
	var obj={cid:parseInt(data.cid),title:data.title,from:my.uid,to:parseInt(data.to),created:time(),modified:time(),statusfrom:3,statusto:1,modified:time(),unreadfrom:0,unreadto:1,
	chat:[{u:my.uid,c:data.messageText,t:time()}],fnfrom:{"name": my.name,"fname": my.fname,"img": my.img},fnto:{name:d.name,fname:d.fname,img:d.img}};	
	api.mo.ins("message",obj,res=>{
	  console.log(res);
	  if (res.acknowledged){		  
		 xget({a:"amail",b:uid},dat=>{
			 console.log(dat);
			 api.ma.N('set',uid,['mes'],d=>{soc.send({type:"N",to:uid})});
			 api.ma.N('set',my,['mes'],d=>{ 
				s.coo('mesid',res.insertedId);
				console.log(res.insertedId);
				//mesloop(0).then(result=>meshisloop(res.insertedId));	
				mesloop(0,'sent').then(resid=>meshisloop(resid));
				x('#topic').prop('disabled',true);
				nicEditors.findEditor("messageText").setContent('');				
			 });
			 })
		 
	  } else {
		  s.notify('error',dic.PROBLEM_SENDING_MESSAGE);
	  }
	}) 
	}) 	
}
}
function mesend(obj){
let type=$(obj).attr('type');
$(obj).hide();
var uid=parseInt(s.coo('mesuid')),
exp=explode('_',obj.id),
confirmTerms=exp[1],
cid=parseInt(x('#cid').val()),

topic=x('#topic').val().trim(),
message=x('#messageText').val().trim();
if(topic.length>0 && message.length>5){
var messageData={to:uid,title:topic,statusto:1,cid:cid,messageText:message};
if (confirmTerms =='confirmTerms' && !s.coo('agent_uid')){
	var cid=exp[2];
	s.modal({message:confirmationText(0,cid),foot:but(dic.PROCEED,()=>{sendMes(messageData);modalclose();})});
} else {
//FOR AGENT CERTIFICATION INSTRUCTIONS
	if(type=='instructions'){
	$.get('/ajax.php',{a:'mail_after_sent',b:uid},(res)=>{
		console.log(res);
	})
	}
	sendMes(messageData);
}
}else{
s.notify('error',dic.SELECT_CONTACT_TOPIC);
}
$(obj).show();
}

function reply(obj){
var exp=explode('_',obj.id);
var whom=exp[1];
var confirmTerms=exp[2];
if(my.grp==1){
location.href='/mes/reply/'+G.id;
}else{
//check if terms & condition control box
if (confirmTerms =='confirmTerms' && s.coo('agent_uid')==null){
var cid=exp[3];
s.modal({message: confirmationText(0,cid),foot:but("PROCEED",function(){location.href='/mes'})});
}else{
location.href='/mes/reply/'+G.id;
}
}
}

var DELAY = 2000;
var timeout = null;
function hideMenu (element) {
  $(element).css('display','none');
}

//SORTING
$(document).on("change","#message_sorting",function(){
console.log(this.value)
s.coo('message',this.value)
x('.settingBoxMessages').html('');
mesloop(0).then(id=>meshisloop(id));
})
/** CONTACT SELECT**/
.on("keyup",".searchChat",function(){
var q= this.value.trim();
var mode=$(this).attr('mode');
console.log(q);
if(q!=''){
chat.loop(mode,q);
}else{
chat.loop(mode);
}
})
.on('click','#submitAddressZip',function(){
	var address=$('#editAddressZip1').val();
	var zip=$('#editAddressZip2').val();	
		$.get('/ajax.php',{a:'addresszip',b:address,c:zip}, function(data) {
		if (data=='OK'){
		s.confirm(dic.CHANGE_ADDRESS_ZIP+' <b>'+address+' '+zip+'</b> '+dic.SURE,function(result){
		if (result){
		api.ma.my('get',my,['user']);	
		$('#readAddressZip').html(address+' '+zip).show('normal');
		opener2('editAddressZip');
		}else{
		s.modal(dic.ADDZIP_CANNOT_INSERTED);
		}
		})
		}
		});		
})
.on("click","button[id^='reply_']",function(){
reply(this)
})
.on("click","button[id^='toSent_']",function(){
var exploded=explode('_',this.id);
var st="status"+exploded[2];
api.mo.fup("message",{_id:exploded[1]},{$set:{[st]:2}},d=>{
x('#topic'+exploded[1]).hide();
var counter=x('.c_mes_sent').text();
var counter_all=x('.c_mes_sent_all').text();
x('.c_mes_sent').text(parseInt(counter)+1);
x('.c_mes_sent_all').text(parseInt(counter_all)+1);
})
})
// //MARK AS inbox
//  $(document).on("click","button[id^='toInbox_']",function(){
//  var exploded=explode('_',this.id);
//  xget('?a='+exploded[0]+'&b='+exploded[1]+'&c='+exploded[2],AJAXFOLDER+'mes.ajax.php');
// 	$('#topic'+exploded[1]).hide('slow');
// 	var counter=$('#c_mes_inbox').text();
// 	var counter_all=$('#c_mes_inbox_all').text();
// 	$('#c_mes_inbox').text(parseInt(counter)+1);
// 	$('#c_mes_inbox_all').text(parseInt(counter_all)+1);
//
//  });
.on("click","button[id^='toImportant_']",function(){
var exploded=explode('_',this.id);
var st="status"+exploded[2];
api.mo.fup("message",{_id:exploded[1]},{$set:{[st]:2}},d=>{
x('#topic'+exploded[1]).hide();
var counter=x('.c_mes_favorite').text();
var counter_all=x('.c_mes_favorite_all').text();
x('.c_mes_favorite').text(parseInt(counter)+1);
x('.c_mes_favorite_all').text(parseInt(counter_all)+1);
})
})
//MOVE TO DELETED
.on("click","#toDeleted1,#toDeleted2",function(){
var checkedValues= JSON.parse(ses('m_checked'));
$.each(checkedValues,function( index,value ){
$.get('/ajax.php',{a:'toDeleted',b:value},d=>{
$('#topic'+value).remove();	
});
});
})
.on("click","button[id^='messageSubmit']",function(){
mesend(this)
})
.on("mouseover","div[id^='mesmenu1']",function(){
 $(this).css('display','block');  
  // Cancel the delayed closing of the dropdown
   window.clearTimeout(timeout)
  })
.on("mouseout","div[id^='mesmenu1']",function(){  
    timeout = window.setTimeout(hideMenu, DELAY, this)
  })
function missingfn(topic,from,to){
api.ma.get("grp,name,fname,trade,official,img from ur where uid IN(?,?)",[from,to],d =>{	
var ins={
fnfrom:{name:d[1].name,fname:d[1].fname,img:d[1].img},
fnto:{name:d[0].name,fname:d[0].fname,img:d[0].img}
}		
api.mo.fup("message",{topic:topic},{$set:ins});
})
}
function meshisloop(id,uid){
	loadN();
	console.log('meshisloop'+id)
	$('#historybox').show();
    id=!!id ? id : s.coo('mesid');
	var criteria=!!uid ? {$or:[{from:uid},{to:uid}]} : {_id:id};
	if(s.coo('mesid')!='new'){
	api.mo.get("message",criteria,message=>{
	console.log(message);
	message=message[0];
	var html='',chat=message.chat;
	if(sizeobj(chat)==0){
	x('#wrappermes').html('');		
	}else{
	for(var i in chat){
	html +="<div class='sendMesTextContainer"+(chat[i].u==my.uid ? 'To':'From')+"'>\
	<img src='"+(chat[i].u==message.from ? message.fnfrom.img : message.fnto.img)+"' width='100%' class='but138'>\
	<div class='toSubjectTitle'>"+(chat[i].u==message.from ? message.fnfrom.name : message.fnto.name)+"</div>\
	<div class='toSubjectTextDate'>"+date('Y-m-d H:i',chat[i].t)+"</div></div>\
	<div class='toSubjectTextRead1'>"+chat[i].c+"</div>";
	}	
	x('#wrappermes').html(html);	
	}
	//x('#meshisimg').attr('src',message.from==my.uid ? message.fnto.img:message.fnfrom.img);
	x('#meshisfn').text(message.from==my.uid ? message.fnto.fname:message.fnfrom.fname);
	x('#meshislink').attr("href","/u/"+(message.from==my.uid ? message.fnto.name:message.fnfrom.name)+"/");
	x('#meshiscreated').text(date('Y-m-d H:i',message.created));
	x('#meshistitle').text(message.title);
	x('#topic').val(message.title).prop('disabled',true);
	x('#meshisid').text(message._id);
	x('.sendMesButton').text(dic.SEND);
	s.coo('mesid',message._id);
	})
	}else{		
		x('#meshisid').text('');	
		x('#meshistitle').text('');	
		x('#wrappermes').html('');	
		x('#topic').val('').prop('disabled',false);				
		x('#meshisfn').text($('#mesuid').text());		
		x('#meshiscreated').text(dic.NOW);
		x('.sendMesButton').text(dic.MAIL_SENT);			
	}
	if(G.uname=='mes'){window.scrollTo(0,document.body.scrollHeight);}
}
function mesopen(id,uid,who,unread){	 	
console.log('mesopen');
	//update amail
	var Gmode=s.coo('mesmode');
	if(G.uname=='mes'){
		var fullname=x('#fullname'+uid).text();	
		x('#mesuid').attr('uid',uid).text(fullname);	
		x('.sendMesTextContainer').show();
		x('#mesnewcont').show();
	if(my.grp==1){if(my.agent>0){api.ma.set("aff SET amail=0 where uid1=? and uid2=?",[my.uid,my.agent]);}}
		var unread="unread"+who;		
		s.coo('mesuid',uid);
		s.coo('mesid',id);
		api.mo.up("message",{_id: id},{$set:{[unread]:0}},d2=>{													
			api.ma.N('set',my,['mes'],d=>{								
			meshisloop();
			})			
		})	
	$("li[id^='li']").css('backgroundColor','transparent');	
	$('#li'+id).css('backgroundColor','rgb(253 253 253 / 12%)');	
	var newunread,un="unread"+who,uncounter=unread==0?1:0,
	counter=x('#c_mes_'+Gmode).text();	
	 $(this).attr('id','mesid_'+id+"_"+who+"_"+(un==1 ? 0:1));
	api.mo.fup("message",{_id:id},{$set:{[un]:uncounter}},d=>{
		api.ma.N('set',my,['mes'],man=>{
	//change style
	//var style= s.coo('mesid')==id ? 'rgb(253 253 253 / 12%)':'trasparent';
	if (uncounter==0){		
	x('#link'+id).attr("class",'messageMin').css('backgroundColor','transparent').attr('title',dic.MARK_AS_UNREAD);	
	newunread=parseInt(counter)-1;
	}else {
	x("#link"+id).attr("class",'messageMinUnread').attr('title',dic.MARK_AS_READ);
	newunread=parseInt(counter)+1;
	 x('#li'+id).css('backgroundColor','rgb(253 253 253 / 12%)');	
	}
	x('#c_mes_'+Gmode).text(newunread);	
	})
	})
	
	}else if(G.uname=='support'){
		api.mo.up("tkt",{_id: id},{$set:{read1:0}},d2=>{
		api.ma.N('set',my,['mes'],d=>{
		location.href=G.SITE_URL+'support/'+G.mode+'/'+id;
		})
		})
	}
}
function mesmenuopen(cid,uid,topicid,id,callback){
	s.coo('mesuid',uid);	
	bufAsync(2,'public/mes/wrapper1').then(
	d=>{
		if(G.uname=='cont' || G.uname=='eoi'){
		s.coodel('mesid');s.coo('mesuid',uid);s.coodel('mesmode');
		moveYposition('wrapper2','#'+G.uname+'card'+id);	
		}else{
		moveYposition('wrapper2','#box'+id);
		}
		if(!!topicid){
			s.coo('mesid',topicid);			
			meshisloop(topicid);			
			}else{
			s.coo('mesid','new');	
			meshisloop();			
			}
			new nicEditor({fullPanel : false}).panelInstance('messageText');			
			 if(callback) callback();
	}
	);
}
function mesmenu(cid,uid,id,obj){
if($(obj).hasClass('_confirmTerms') && !s.coo('agent_uid')){	
obj.cvid=$(obj).attr('cvid');
obj.cid=cid;
		s.modal({message: confirmationText(obj.cvid,obj.cid),foot:but(dic.PROCEED,()=>{interequest(obj);$(obj).removeClass("_confirmTerms");modalclose();})});	
}else{
opener('mesmenu1'+id);
//s.coodel('mesmode');
//s.coodel('mesuid');
//s.coodel('mesid');
var criteria={cid:cid,order:'created-'},html='<button onclick="mesmenuopen('+cid+','+uid+',null,'+id+')" class="mesmenu1">New Topic</button><button onclick="s.coo(&quot;mesuid&quot;,'+uid+');location.href=&quot;/mes&quot;" class="mesmenu1">Go to Message Page</button>';
api.mo.get('message',criteria,function(data){		
	if(data.length>0){		
		for (var i in data){		
		console.log(data[i]);
		var topicid=data[i]['_id'];
		html +='<button onclick="mesmenuopen('+cid+','+uid+',&quot;'+topicid+'&quot;,'+id+')" class="mesmenu2">'+data[i].title+'<div class="mesdate" id="meshiscreated">'+date('Y-m-d',data[i].created)+'</div></button>';
		}}
		$('#mesmenu1'+id).html(html);
})	
}
}
function mesloop(wrapper,mode){
console.log('mesloop');
	wrapper=!!wrapper ? wrapper:0;
	var Gmode=!!mode ? mode : s.coo('mesmode'),
	meshtml='',page= !s.coo('page_num') ? 1 : s.coo('page_num'),count=Gmode=='all' ? parseInt(my.N["c_mes"]) : parseInt(my.N["c_mes_"+Gmode]),
	statuses={'deleted':0,'inbox':1,'favorite':2,'sent':3},
	mesuid=!!s.coo('mesuid') ? parseInt(s.coo('mesuid')): '';
//where=!!s.coo('mesuid')
	//? [{from:my.uid,to:parseInt(s.coo('mesuid'))},{from:parseInt(s.coo('mesuid')),to:my.uid}]
	//: (Gmode=='all' ? [{from:my.uid},{to:my.uid}] : [{from:my.uid,statusfrom:statuses[Gmode]},{to:my.uid,statusto:statuses[Gmode]}]),
	if(Gmode!='all'){
var	where = mesuid!='' ? [{from:my.uid,to:mesuid,statusfrom:statuses[Gmode]},{to:my.uid,from:mesuid,statusto:statuses[Gmode]}] : [{from:my.uid,statusfrom:statuses[Gmode]},{to:my.uid,statusto:statuses[Gmode]}]
	}else{
var	where = mesuid!='' ? [{from:my.uid,to:mesuid},{to:my.uid,from:mesuid}] : [{from:my.uid},{to:my.uid}]	
	}		
	//order=!!s.coo('mesuid') ? 'from+':'created-',
let criteria={$or:where,order:'modified-',page:parseInt(page)};
c('warn',criteria);
return new Promise(function(resolve,reject){	
api.mo.get('message',criteria,data=>{			
console.log(data);
console.log(Gmode);
if(data.length>0){		
	for (var i in data){		
	//	missingfn(data[i].topic,data[i].from,data[i].to);
		var id=data[i]._id;
		console.log(s.coo('mesid')+"="+id)		
		var uid=my.uid==data[i].from ? data[i].to :data[i].from;					
		if(data[i].fnfrom!=null){
		var from=data[i].from==my.uid ? "Me"  : data[i].fnfrom.fname;
		var img=data[i].from==my.uid ? data[i].fnto.img : data[i].fnfrom.img;
		var to=data[i].to==my.uid ? "Me"  : data[i].fnto.fname;
		var fullname=data[i].from==my.uid ? to : from;
		}
		var unread=my.uid==data[i].from ? data[i].unreadfrom: data[i].unreadto;
		var whostatus=my.uid==data[i].from ? 'from': 'to';
		var readClass=unread==0 ? 'readMes':'readMesUnread';
		var style= s.coo('mesid')==id ? 'blue':'trasparent';
		var readDot= unread==0 ? 'background-color:none' : 'background-color:#0B5C7B';
		var readTitle=unread==0 ? dic.MARK_AS_UNREAD : dic.MARK_AS_READ;
		var lastmes=date('Y-m-d H:i',data[i].chat[0].t);	
meshtml +='<li id="li'+id+'" style="background-color:'+style+'"><div class="topicMesCon">'+
		'<div class="mesControlButtonsCont">'+		
		(Gmode !='sent'?'<button id="toSent_'+id+'_'+whostatus+'" class="sentMes" title="MARK_SENT"></button>':'')+
		(Gmode !='favorite'?'<button id="toImportant_'+id+'_'+whostatus+'" class="importantMes" title="MARK_IMPORTANT"></button>':'')+
		'<div title="'+readTitle+'" id="link'+id+'" class="'+readClass+'"></div>'+
		'</div>'+		
		'<input type="radio" onclick="mesopen(&quot;'+id+'&quot;,'+uid+',&quot;'+whostatus+'&quot;,'+unread+')" class="readMes" style="'+readDot+';width:200px;float:left;" id="mesid_'+id+'_'+whostatus+'_'+unread+'" name="'+Gmode+'">'+        
		'<label for="mesid_'+id+'_'+whostatus+'_'+unread+'"><div class="chatNameImgOfferMes"><img src="'+img+'" style="width:100%" class="fromMesPhIn"></div>'+
		'<div id="fullname'+uid+'" class="adPostOfferMesTit2">'+fullname+'</div><div class="topicMes">'+data[i].title+'</div>' +
		'<div class="dateMes" title="Created:'+timediff(data[i].created)+'">'+lastmes+'</div>'+
		'<div class="dateMes">#'+id+'</div></label></div></li>';
	}
	x('#wrapper'+wrapper).html('<ul class="mesloop" id="topic'+id+'" >'+meshtml+'</ul>');
	pagination(page,count,10);
resolve(data[0]._id);	
}else{
	x('.topButtonsContMes,.bottomButtonsContMes').css('display','none');
	x('#wrapper'+wrapper).html('<div class="setboxmesnores">'+dic.NO_RESULTS_FOUNDMES+' '+Gmode+'</div>');
		x('.sendMesButton').text(dic.MAIL_SENT);
	
}
});
});
}
function mesmode(obj){
	var mode=obj.id.replace('mes','');	
	s.coodel('mesid');s.coodel('mesuid');
	for(var j in range(1,4)){
	var ui=parseInt(j)+1;	
	var classn='messBtn'+String(ui)+'Act';
	console.log(classn);
	$('#mes'+inverse(G.uimode)[ui]).removeClass(classn).addClass('messBtn'+String(ui));
	}
		
	$('#searchChat').attr('mode',G.uimode[mode]);
	s.coo('mesmode',mode);	
	if(['prop','loan','offer'].includes(mode)){
		$('#mesmenu').css('display','none');
		$(obj).addClass('messBtn'+G.uimode[mode]+'Act');
		chat.loop(G.uimode[mode]);
	}else{
		$('.mailcat').removeClass('messagesCategoriesLActive').addClass('messagesCategoriesL');	
	if(mode==='all'){
		$('#mesall').removeClass('messagesCategoriesL').addClass('messagesCategoriesLActive');	
	}
		$(obj).addClass('messagesCategoriesLActive');	
	mesloop(0,mode).then(id=>meshisloop(id));
	}
//	buf(1,PVIEWS+'mes/history');	
}
//*********************************REGISTER*****************************//
function registration(obj){	 
var errors={},
grp=G.mode=='candidate' || G.mode=='register' ? 1 : 2,
a=s.coo('SPAUTH')==2 ? 'proactivation' : 'regSubmit',
uid= x('#id').val(),
username= x('#username').val(),
firstname= x('#firstname').val(),
lastname= x('#lastname').val(),
mail= x('#mail').val(),
app= x('#app').val(),
pass= x('#pass1').val(),
specialists= x('#specialists').val(),
pass2= x('#pass2').val(),
govid= x('#govid').val(),
ref2= x('#ref2').val(),
source= x('#source').val(),
sq= x('#sq').val(),
sa= x('#sa').val(),
accterms= $('#acceptedTerms').is(':checked') ? 1 : 0,
captcha= G.uname=='register' ? x('#captchaInput').val() : '',
packs=x("input[name^='packs']:checked").val(),   
membership= x("#mship"+packs).val();
if (grp==2){
var company_name= x("#company_name").length > 0 ? x('#company_name').val() :'',
	addresszip1= x('#addresszip1').val(),
	addresszip2= x('#addresszip2').val(),
	afm= x('#afm').val(),
	size= x('#size').val(),
	tel= x('#tel').val();
var params=['app','username','firstname','lastname','company_name','mail','pass1','pass2','addresszip1','addresszip2','afm','tel','packs','size','sq','sa','specialists'];
var oblig_params=['username','firstname','lastname','company_name','mail','pass1','pass2','addresszip1','afm','tel','packs','size','sq','sa','specialists'];
}else{
var params=['app','username','firstname','lastname','mail','pass1','pass2','govid','packs','sq','sa'];
var oblig_params=['username','firstname','lastname','mail','pass1','pass2','packs','sq','sa'];
}
//ERRORS LOG
for (i in oblig_params){
if (x('#'+oblig_params[i]).val() ==''){
	errors[oblig_params[i]]= dic[oblig_params[i].toUpperCase()];
}
}
if(G.uname=='register' && accterms==0){
errors.acceptedTerms= dic.TERMS_ERROR; //'Terms & Conditions is not accepted.';
}
if($("input[name='packs']").is(':checked')==false){
errors.pack= dic.PACK_ERROR; //'Pack is not selected!';
}
if (captcha!=s.coo('SPPASSCHECK') && G.URL_PAGE!='admin' && G.uname!='home'){
errors.captcha= dic.CAPTCHA_ERROR; //'Captcha is not correct';
}
if (sq==''){
errors.sq= dic.SQ_ERROR; //'security question';
}
if (sa==''){
errors.sa= "Please insert security answer"; //'security answer';
}
if(addresszip1==''){
errors.addresszip1= "Address zip code"; //'Captcha is not correct';
}
if (pass!=pass2){
errors.pass_match=dic.PASSWORD_NOT_MATCH;
}
if(!!local('mail_address')){
errors.mail_address =local('mail_address');
}else{
delete errors['mail_address'];
}
if(size=="0"){
errors.size="Business size is not set.";
}else{
delete errors['size'];
}
if(specialists=="0"){
errors.specialists ="Number of Recruitment Specialists is not set.";
}else{
delete errors['specialists'];
}
if(local('name_exists')==1 && !['2','3'].includes(s.coo('SPAUTH'))){
errors.name_exists=dic.USERNAME_EXISTS; //'Username exists. Please try a different username.';
}else{
delete errors['name_exists'];
}
//bank checkout params
var price= parseFloat(x('#packs'+packs).attr('totalprice'));
var orderAmount= x("input[name='orderAmount']").val();
var payMethod= x("input[name='payMethod']").val();
var orderid= hash()+time();
var orderDesc= x("input[name='orderDesc']").val();
var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
var transaction=  typeof(orderid) !='undefined' ? orderid : '';
var description=  typeof(orderDesc) !='undefined' ? orderDesc : x('#packOption'+packs).text();
if (Object.keys(errors).length==0){
var param=1==grp?{a:a,username:username,grp:grp,app:app,pass:pass,govid:govid,firstname:firstname,lastname:lastname,mail:mail,membership:membership,packs:packs,ref2:ref2,source:source,price:price,payment_type:payment_type,transaction:transaction,description:description,sa:sa,sq:sq}:{a:a,uid:uid,app:app,username:username,grp:grp,pass:pass,firstname:firstname,lastname:lastname,mail:mail,specialists:specialists,company_name:company_name,addresszip1:addresszip1,addresszip2:addresszip2,afm:afm,tel:tel,membership:membership,packs:packs,size:size,ref2:ref2,source:source,price:price,payment_type:payment_type,transaction:transaction,description:description,sa:sa,sq:sq};
xget(param,function(data){
	console.log(data)
	 if (grp == 2 && (membership == 10 || membership == 11)) {
	api.ma.my('get',data,["user","mship","pack","packdetails","agentdata",'caff']);
	 }
	if (data.message =='yesbank'){
		api.ma.my("set",data);
	if (s.coo('SPAUTH')=="2" && grp=="2"){
	xget({a:'login',b:pass,c:username,d:window.pathExt},res=>{
		location.href='/u/'+res['name'];
	},'json');                    
	} else {  //if proactivated login values NORMAL REGISTRATION
	if (G.URL_PAGE =='admin'){
	location.href='/admin/affiliate.php';
	} else {	
	//submit checkout bank
	if(price > 0){
		// checkoutroute();
		var checkout=JSON.parse(s.coo('checkout'));
		checkout.service=0,checkout.price=price,
		checkout.orderAmount=price,checkout.payMethod=payMethod,
		checkout.orderid=orderid,checkout.orderDesc=description,
		checkout.payment_type=payment_type,checkout.transaction=transaction;
		s.coo('checkout',JSON.stringify(checkout));
		$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
		s.coo('SPAUTH',3);s.coo('SPREGID',data.uid);s.coo('SPREGRP',data.grp);
	}else{
		s.modal(dic.REGISTRATION_SUCCESSFULLY);
		if(!!s.coo('SPAFFAUTH')){		
		var agent=JSON.parse(s.coo('SPAFFAUTH'))['uid'];
		api.ma.my('get',agent,['agentdata','caff']);
		}else if($('#source').val()=='5'){
		api.ma.my('get',my.uid,['agentdata','caff']);
		}
		setTimeout(function (){window.location.href="/";},3000);
	}
	}
	}
	} else if (data.message =='nobank'){
	location.reload();
	} else {
	s.modal(data.message);
	}
},'json')
return false;
}else{
console.log(errors)
var errors_text='';
for (var i in errors){
errors_text +='<li>'+errors[i]+'</li>';
}
scrolltop();
x('#messageBoard').html(dic.REGISTRATION_ERRORS+'<br/><ol>'+errors_text+'</ol>')
errors={};
}
}
//2 types of registration
// regural registration	and proactivation
//defined in mysql with user > authentication field	
//defined with s.coo('SPAUTH')==1
$(document).on('click','#footsteps',function(){
var img='<img src="/img/registerHelp'+LANG+'.jpg"  width="100%" class="bg_photo">';
s.modal(img);
})
.on("click","#submitSize",function(){
var val=$('#companysize').val();
	if(val > my.size){
		if (['10','11'].includes(my.membership)){
			xget('?a=size&b='+val,d=>{
			toggle_edit('readComSiz','editComSiz');
			$('#readComSiz').html(L.companysize[val])
			})
		}else{
			s.confirm(dic.WANT_BE_PUBLIC_CATEGORIZED_AS+ " " + G['companysize'][val] + " " +dic.UPGRADE_MEMBERSHIP_DO_YOU+" ", function (res) {
				if (res) {
					location.href = '/u/' + my.name + '/upgrade';
				}
			})
		}
	}else{
		s.modal(dic.NO_CHANGE_COMPANY_SIZE)
	}
})
.on("click",'#terms',function(){
s.modal('<div class="headAllPages2"><div class="bttitle2"><span class="termsImgTit"></span>' +
'<span id="farsa">'+dic.TERMS_CONDITIONS+'</span></div></div>'+
'<div class="termsTotal"><div class="setboxtermstop">'+
'<div id="termsContent" class="setboxtermstext">'+G.pages[G.mode+'_terms']+'</div></div></div>');
})
.on("click",'#authCodeBut',function(){
if(this.checked && !s.coo('SPAFFAUTH')){
x('#mship1').prop('checked',true);
// $('#mship1').click();
packs(1);
}else if(x(this).prop('checked') && !!s.coo('SPAFFAUTH')){
// $('#mship1').click();
packs(1);
//    $('#submitbox').show();
}else{
//UNCHECKED
// x('#updatePacks').html('');
x('#authCode').val('');
// $('#mship1').prop('checked',false);
s.coodel('SPAFFAUTH');
//  $('#submitbox').hide();
// packs(1);
// $('#mship1').click();
x('#registrationSub').html('');
packs(1);
}
opener2('affBox');
})
.on("keyup",'#authCode',function(){
if (this.value!=''){
xget({a:'check_auth',b:this.value},function(data){
console.log(data)
if(data.error_code==0){
// x("#aff_hint").text(dic.AUTH_CODE_CORRECT);
x("#registrationSub").html('<span style="width:100%;float:left;">'+dic.AUTH_CODE_VALID+'</span> <b style="width:100%;float:left;">'+data.company_name+'</b>')
s.coo('SPAFFAUTH',JSON.stringify(data))
$("input[id^='packs']").each(function (){
var id=this.id.replace('packs','')
if (id==4){
	this.checked=true;
} else {
	this.disabled=true;
}
});
x('#checkout').html('');
x('#aff_hint').hide();
// $('#authCode').hide();
x('input[name="orderAmount"]').val(0);
x('#registrationSubmit').show();
// $("#packs4").prop("checked",true);
x('.price4').hide();
x('#mship1').click();
}else{
x("#aff_hint").text(dic[data.error]);
x("#registrationSubmit").html("Register")
s.coodel('SPAFFAUTH')
x('#registrationSubmit').hide();
}
},"json");
}else{
x("#aff_hint").text("");
x("#registrationSubmit").html("Register")
}
})
.on("keyup",'#pass1',function(e){
var strongRegex=new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$","g");
var mediumRegex=new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$","g");
var enoughRegex=new RegExp("(?=.{6,}).*","g");
if (false==enoughRegex.test(this.value)){
x('#messageBoard').html(dic.PASSWORD_SHORT);
} else if (strongRegex.test(this.value)){
x('#messageBoard').attr("class",'OK').html(dic.STRONG_PASSWORD);
} else if (mediumRegex.test(this.value)){
x('#messageBoard').attr("class",'alert').html(dic.MEDIUM_PASSWORD);
} else {
x('#messageBoard').attr("class",'error').html(dic.WEAK_PASSWORD);
}
return true;
})
.on("click","#reset_captcha",function(){set_captcha();})
.on("keyup",'#pass2',function(){
var password= x('#pass1').val();
if(password!=this.value && password.length > 2)
{
x('#messageBoard').html(dic.PASSWORD_NOT_MATCH)
}else if (password==this.value){
x('#messageBoard').html(dic.PASSWORD_MATCH)
}else{
password='';
}
})
.on("keyup",'#username',function(){
if(G.uname=='register'){
var a='name_exist';
var b= $('#username').val();
xget({ a:a,b:b },function (data){
if(data=='OK'){
local('name_exists',1)
x('#messageBoard').html(dic.USERNAME_EXISTS);
}else{
x('#messageBoard').html('')
local.del('name_exists')
}
})
}
})
.on("keyup",'#mail',function(){
var b= x('#mail').val();
xget({ a:'mail_validate',b:b },data=>{
if(data!='Email address seems valid.'){
local('mail_address',data)
}else{
local.del('mail_address')
}
x('#messageBoard').html(data);
})        
})
.on("keyup","#captchaInput",function(){
var val=x("#captchaInput").val();
ses('SPPASSCHECK',val);
if (val==ses('SPPASSCHECK')){
x('#messageBoard').html(dic.TEXT_CORRECT);
}else{
x('#messageBoard').html(dic.TEXT_NOT_CORRECT);
}
})
function set_captcha(){
xget({a:'captcha'},function(data){
var dataURL="data:image/jpeg;base64,"+data;
x('#captcha').attr('src',dataURL);
},'image/jpeg');
}
//********************************INTERVIEW*******************************//
function interchoices(iobj){        
var ipanel='';
iobj.grp=my.grp;
iobj.now=time();
// iobj.start=Math.floor(Date.parse(iobj.start) / 1000);
// iobj.start=Math.floor(Date.parse(iobj.start) / 1000);
/* '0' => DELETED,			CLEAR
'1' => TO_BE_DELETED,	NOT SUITABLE
'2' => CV_VIEWED,
'3' => SHORT_LISTED,
'4' => SHORT_LIST_ALERTED,FINAL LIST
'5' => INTERVIEW_REQUESTED,
'6' => ASK RESCHEDULE,
'7' => RESCHEDULE,
'8' => INTERVIEW_CONFIRMED,
'9' => INTERVIEW_DECLINED,
'10' => INTERVIEW_CANCELLED,
'11' => INTERVIEW_COMPLETED
*/
//[status][grp]
var choi=[];choi[0]=[];choi[1]=[];choi[2]=[];choi[3]=[];choi[4]=[];choi[5]=[];choi[6]=[];choi[7]=[];choi[8]=[];choi[9]=[];choi[10]=[];choi[11]=[];
choi[0][1]=null;
choi[0][2]=[1,2,3,4,5];
choi[1][1]=null;
choi[1][2]=[0,2,3,4,5];
choi[2][1]=null;
choi[2][2]=[0,1,3,4,5];
choi[3][1]=null;
choi[3][2]=[0,1,2,4,5];
choi[4][1]=null;
choi[4][2]=[0,1,2,3,5];
choi[5][1]= iobj.now > iobj.start+parseInt(G.is.inter_duration) ? [6] : (iobj.now > iobj.start ? [6,8] : [6,8,9]);
choi[5][2]=[7,10];
choi[6][1]=iobj.now > iobj.start+parseInt(G.is.inter_duration) ? [6] : (iobj.now > iobj.start ? [6,8] : [6,8,9]);
choi[6][2]=[7,10];
choi[7][1]=iobj.now > iobj.start+parseInt(G.is.inter_duration) ? [6] : (iobj.now > iobj.start ? [6,8] : [6,8,9]);
choi[7][2]=[7,10];
choi[8][1]=iobj.now > parseInt(iobj.start) - 1200 ? null : [9];
choi[8][2]=[10,11];
choi[9][1]=null;
choi[9][2]=null;
choi[10][1]=null;
choi[10][10]=null;
choi[11][1]=null;
choi[11][2]=null;
var line=[];
var checkedLine='';
var interviewed=[5,6,7,8];
iobj.choices= choi;
for (var lin=0; lin<=11; lin++){
checkedLine= lin==iobj.status ?'checked="checked"':'';
if(G.uname=='inter'){
line.push('<li><input '+checkedLine+' id="status_'+iobj.interid+'_'+lin+'" type="radio" name="interFlag'+iobj.interid+'" value="'+lin+'">' +
	'<label for="Delete" id="lstatus_'+iobj.interid+'_'+lin+'" style="background-color:'+decodeURIComponent(G.iColorFlags[lin])+'">'+G.INTERVIEWS.status2[lin]+'</label></li>');
}else {
line.push('<li><input '+checkedLine+' id="status_'+iobj.cid+'_'+ iobj.eoid+'_'+lin+'" type="radio" name="interFlag'+iobj.cid+'_'+ iobj.eoid+'" value="'+lin+'">' +
	'<label for="status_'+iobj.cid+'_'+ iobj.eoid+'_'+lin+'" id="lstatus_'+iobj.cid+'_'+iobj.eoid+'_'+lin+'" style="background-color:'+decodeURIComponent(G.iColorFlags[lin])+'">'+G.INTERVIEWS.status2[lin]+'</label></li>');
}
}
if(choi.hasOwnProperty(iobj.status) && choi[iobj.status].hasOwnProperty([iobj.grp])){
for(var x in choi[iobj.status][iobj.grp])	{
if (iobj.interviewExist=='1' && interviewed.includes(choi[iobj.status][iobj.grp][x])) break;
ipanel += line[choi[iobj.status][iobj.grp][x]];
}
return ipanel;
}
}
function time_remaining(dataid){
xget({a:'icounter',b:dataid},function(data){
if(data!='NO'){
x('#timeRemainingA'+dataid).html(data.timeA);
x('#timeRemainingB'+dataid).html(data.timeB);
}
},'json')
}
function getPostTitle(inter_id){
xget('?a=ipostTitle&b='+inter_id,function(data){
if(data !='NO'){
x('#postTitle_'+inter_id).text(data);
}
})
}
function flag_autorefresh(dataid){
if (ses('close_intervals')!='on'){
	xget('?a=status&b='+dataid,function(status){
		x('#flag_'+dataid).text(G.INTERVIEWS.status[status]).show()
		$('#flag_'+dataid).css('backgroundColor',G.iColorFlags[status]).show()
		if (status==6){x('#interview_panel_'+dataid).css('display','block');}
	})
}
}
function interloop(mode,wrap){	
var mode=!mode ? (G.mode!='' ? G.mode :'irequested'):mode,
wrap=!wrap? '1':'2',
i_order= !!ses('i_order') ? ses('i_order') : '',
i_type= !!ses('i_type') ? ses('i_type') : '',
i_status= !i_status ? (!!ses('i_status') ? ses('i_status') : ''):i_status,
i_contact= !!ses('i_contact') ? ses('i_contact') : '',
i_post= !!ses('i_post') ? ses('i_post') : '',
html='',ichoices,tels,tel1,tel2,az,az1,az2,interview_type,
inter_page= !!s.coo('inter_page') && s.coo('inter_page') !=0 ? parseInt(s.coo('inter_page')) : 1,
iid=G.id !="" ? G.id : "",   
i_status_param=!!ses('i_status_param') ? ses('i_status_param'):'',   
arrin= {itoday:dic.TODAY,
iconfirmed:dic.CONFIRMED_INTERVIEWS,
irequested:dic.PENDING_CONFIRMATION,
irescheduled:dic.RESCHEDULED_TIME,
ishortlisted:G.INTERVIEWS.status2[3],
ifinalisted:G.INTERVIEWS.status2[4],
iaskreschedule:dic.INTERVIEW_ASKRESCHEDULED,
iupdaterecords:dic.UPDATE_RECORDS,
icompleted:dic.COMPLETED_INTERVIEWS,
history:dic.HISTORY,
icancelled:dic.CANCELLED_LAST_TWO_WEEKS},
extra= {22:dic.ALL_INTERVIEW_STATUS,20:dic.ACTIVE_INTERVIEWS,21:dic.HISTORY,23:dic.ALL},
isi= typeof arrin[mode]!='undefined'
	? arrin[mode]
	: (['20','21','22','23'].includes(ses('i_status')) ? extra[ses('i_status')] : G.INTERVIEWS.status[ses('i_status')]);	
	$('#inter_subpage').text(' > '+isi);
	console.log({a:'interloop',page_num: inter_page,iid:iid,i_order:i_order,i_type:i_type,i_status:i_status,i_status_param:i_status_param,i_contact:i_contact,i_post:i_post,mode:mode})
$.get("/ajax.php",{a:'interloop',page_num: inter_page,iid:iid,i_order:i_order,i_type:i_type,i_status:i_status,i_status_param:i_status_param,i_contact:i_contact,i_post:i_post,mode:mode},function (data){
var icounter= data =='NO' || !data[0].id ? 0:data[0].count;
//set counter
x('#inter_counter').text(icounter);
if(icounter > 0){
for (var i in data){
tels= data[i].tel;
tel1= tels[1]!=null ? tels[1]:'';
tel2= tels[2]!=null ? tels[2]:'';
az= JSON.parse(data[i].addresszip);
az1= az[1]!=null ? az[1]:'';
az2= az[2]!=null ? az[2]:'';
az= az1=='' && az2=='' ? " <br/><i>Addresszip not completed</i>" : " "+az1+" - "+az2;
//	$('[onclick="s.pop(this)"]').tooltip();
//set webCamera class locked or not
// Ini.prototype.stream_restrict(data[i].id);
time_remaining(data[i].id);
flag_autorefresh(data[i].id)
iobj.interid= data[i].id;
iobj.status= data[i].status;
iobj.start= data[i].start;
iobj.type= data[i].type;
iobj.interviewExist= 0;
ichoices=interchoices(iobj);
if (data[i].eoi_id !='0'){getPostTitle(data[i].id);}
if (my.grp==2){
tels= data[i].mailtelP==1 ? (tel1=='' && tel2=='' ? " <i>Telephone not set</i>" : " "+tel1+" - "+tel2):'';
var selectedType,ipaneltype='';
for (var t=1; t<=3;t++){
	selectedType= data[i].type==t ? 'checked': '';
	ipaneltype +='<li><input type="radio" name="type'+data[i].id+'" value="'+t+'" '+selectedType+' id="itype_'+data[i].id+'_'+t+'"><label for="itype_'+data[i].id+'_'+t+'">'+G.itype[t]+'</label></li>'
}
	html+='<div id="icard_'+data[i].id+'" class="iMin">'+
	'<button onclick="opener(&quot;subcard'+data[i].id+'&quot;)" class="copener"></button>'+
	'<div class="iMin2" style="background-color:'+decodeURIComponent(G.iColorFlags[data[i].status])+'">' +
		'<div class="photoInterview"><a href="/u/'+data[i].name+'/cv/'+data[i].id+ '"><input type="hidden" id="cid'+data[i].id+'" value="'+data[i].cid+'">' +
		'<img src="'+iconic(data[i].img)+'" width="55" height="55" class="profile_photo'+data[i].id+'"></a></div>' +
		'<div class="setboxname"><div class="userOnOffPositionInt"><div class="userid_'+data[i].uid1+'"></div></div>' +
		'<a href="/u/'+data[i].name +'/cv/'+data[i].id+'" class="isTitle" id="i'+data[i].id+'">'+data[i].fname+'['+data[i].id+']</a></div>' +
		'<div class="iChatContainer2">' +
		(!!s.coo('agent_uid') && data[i].agent==my.uid ? '<button class="mgt mgtin" onclick="s.coo(&quot;manage_page&quot;,1);s.coo(&quot;mcli_q&quot;,&quot;'+data[i].code+'&quot;);location.href=&quot;/home/manage&quot;">MGT</button>':'')+
		'<button id="relupdate'+data[i].uid1+'"  class="but133"></button>'+
		'</button><div id="flag_'+data[i].id+'" class="flagInterviewStat1" style="background-color:'+decodeURIComponent(G.iColorFlags[data[i].status])+'">'+G.INTERVIEWS.status[data[i].status]+'</div>'+
		'</div>' +
		'<div class="photoBgEoiCon"><span class="photoBgEoi"><img src="'+data[i].bg+'" width="100%" height="100%"></span></div></div>'+
		'<div style="display:none" class="subcard" id="subcard'+data[i].id+'">'+
		'<div class="isTextTopCon">'+(data[i].eoi_id!='0' ?'<span class="isTextSm">'+dic.RE+':</span><div class="isText"><a href="/u/'+ my.name +(data[i].post_uri!="" ? '/u/'+data[i].name+'/_post/'+data[i].post_id : "")+'">'+data[i].title+'</a></div>'
			:'') +'<div id="getin_'+data[i].id+'"></div></div><div class="boxesPositionInt">' +
		(data[i].reason!=0 && data[i].status==10 ? '<div class="flagCancelReason">'+G.inter_reason[data[i].reason]+'</div>':'') +
		'<div class="boxSr"><a class="ttLens" id="lensBox3"></a>'+
		'<span class="prankint">'+dic.RANKING+'</span><span style="color:#BE1E2D;"> <input maxlength="3" size="2" value="'+data[i].rank2+'" class="rank2_'+data[i].cid+' rankRefField"></span><div class="rankResStars"><div class="ast'+data[i].cid+' star'+roundrank(data[i].rank2)+'"></div></div></div>'+
		'<div class="boxSrAc" id="affiliateTermsInputBox_'+data[i].cid+'" style="display:'+data[i].agent_policy3+'">'+
		'<div class="titPres"><span>'+dic.PRESENTED_BY+':</span><div style="color:darkblue">'+data[i].agentname+'</div></div><div class="subclassCheckAgent1">'+
		'<input  id="affiliateTermsInput_'+data[i].cid+'" type="checkbox"></div>'+
		'<div class="info_contactsbox3"><span class="ttBlue" data-toggle="popover" data-html="true" data-placement="top">i</span></div>'+dic.ACCEPT_AGENTS_TERMS_CONDITIONS+'</div>'+
		'<div class="boxSr" id="affiliateTermsRead_'+data[i].cid+'" style="display:'+(data[i].is_affiliate!=-1 && data[i].affiliate_terms==1 ? "block" : "none")+'"><span class="checkAgent">'+dic.ACCEPT_AGENTS_TERMS_CONDITIONS2+'</span></div>' +
		' </div>' +
		'<div class="interCamCont">'+(data[i].type==1 ? '<button onclick="stream('+data[i].uid1+','+my.uid+',&quot;inter&quot;,'+data[i].id+')" class="but52 stream_'+data[i].id+'" disabled></button>' : '') +
		'<div class="iSceduleFlag">'+G.itype[data[i].type] +
		(data[i].type==3 && data[i].status > 7 ? tels : "")+
		'</div>' +
		'<div class="iDate">' +
		'<span class="timeRemainingA" id="timeRemainingA'+data[i].id+'"></span>' +
		'<span class="timeRemainingA">'+(data[i].status==11  && data[i].ended!=0 ? dic.DURATION+': '+ Math.round((data[i].ended-data[i].started)/60)+' mins':'')+'</span>'+
		'<span class="timeRemainingB" id="timeRemainingB'+data[i].id+'"></span></div></div>' +
			'<div id="ipanel_'+data[i].id+'" class="iResceduleC"><ul id="iContainer_'+data[i].cid+'_'+data[i].id+'" class="iStat2-now">'+(typeof ichoices !='undefined' ? ichoices : '')+'</ul>' +
			'<div style="display:none" id="scheduler_'+data[i].id+'" class="iResceduleCin">' +
			'<div class="iAccC1"><span class="iAccTitle">'+dic.INTERVIEW_PANEL+'</span><ul class="iScedule-now">'+ipaneltype+'</ul></div>' +
			'<div class="iAccC2"><span class="iAccTitle">'+dic.INSERT_DATE_TIME+'</span>' +
			'<div class="icontainer_total"><div id="datetimer" class="idselection">' +
			'<div class="icontainer_a">' +
			'<input title="date" type="datetime-local" id="datetimepicker_'+data[i].id+'" min="'+date('Y-m-d\TH:i',parseInt(time()+600))+'" value="'+(data[i].start!=0 ? date('Y-m-d\TH:i',parseInt(data[i].start)):date('Y-m-d\TH:i',parseInt(time()+1200)))+'" placeholder="INSERT_DATE_TIME"></div></div></div></div>' +
			'<span class="panelButtonPos"><button cid="'+data[i].cid+'" id="'+data[i].id+'" cvid="'+data[i].cv_id+'" onclick="submitinter(this)" class="ipanelNewInter2 '+data[i].confirm_terms+'">'+dic.SUBMIT+'</button></span></div></div>'+
			'<div class="setboxaccept2bi">'+
			(!data[i].cv_id ? '' :'<button id="intropanelbut'+data[i].cv_id+'" class="btnBoxBlueCloseCont">'+dic.INTRODUCTORY+' / '+dic.MY_COMMENTS+'  >></button>')+
			(!data[i].cv_id ? '' :'<button id="expanelbut'+data[i].cv_id+'" class="but134">'+dic.PROVED_SUMMARY_EXPERIENCE1+'</button>')+
			'<button id="edupanelbut'+data[i].uid1+'" class="but134">'+dic.EDUCATION+'</button>'+
			'</div>' +
		(!data[i].cv_id ? '' :'<div id="intropanel'+data[i].cv_id+'" style="display:none;" class="introHideGeneral">' +
		'<div class="setboxcont1"><div class="setboxconttitle1"><div class="info_contactsbox">'+
		'<span class="ttBlue" data-toggle="popover" data-html="true" data-placement="top" data-content="<a>×</a>'+dic.SEE_INTRODUCTORY_EMPLOYEE+'"'+
		'data-original-title="" title="">i</span></div>'+dic.INTRODUCTORY+'</div>' +
		'<div class="contGeneralBusAct2" id="intro'+data[i].cv_id+'"></div></div>' +
		'<div class="setboxacccomments"><div class="setboxcontcommentstitle"><div class="info_contactsbox">'+
		'<span class="ttBlue" data-toggle="popover" data-html="true" data-placement="top" data-content="<a></a>'+dic.COMMENT_THIS_CONTACT2+'">i</span></div>'+
		dic.MY_COMMENTS+'</div><div class="contComments">'+
		'<div contenteditable="true" style="white-space: pre-wrap; overflow-y: scroll;" id="comment2_'+data[i].cid+'" class="contComTxt"></div></div>'+
		'</div></div>'+
			'<div id="expanel'+data[i].cv_id+'"  style="display:none;" class="introHideGeneral"></div>')+
			'<div id="edupanel'+data[i].uid1+'" style="display:none;" class="introHideGeneral"></div>'+
			'</div></div></div>';                    
x('#speedloaderCon').hide();
}else{
tels= tel1=='' && tel2=='' ? " <i>Telephone not set</i>" : " "+tel1+" - "+tel2;
	html +='<div id="icard_'+data[i].id+'" class="iMin">'+
	'<button onclick="opener(&quot;subcard'+data[i].id+'&quot;)" class="copener"></button>'+
	'<div class="iMin2" style="background-color: '+decodeURIComponent(G.iColorFlags[data[i].status])+'">' +
		'<div class="photoInterview"><a href="/u/'+data[i].name+(data[i].post_uri!="" ? '/post?pname='+data[i].post_uri : "")+ '"><input type="hidden" id="cid'+data[i].id+'" value="'+data[i].cid+'"><img src="'+iconic(data[i].img)+'" width="55" height="55" class="profile_photo'+data[i].id+'"></a></div>' +
		'<div class="setboxname"><div class="userOnOffPositionInt"><div class="userid_'+data[i].uid2+'"></div></div>' +
		'<a href="/u/'+data[i].name+(data[i].post_uri!="" ? '/u/'+data[i].name+'/_post/'+data[i].post_id : "")+'" class="isTitle">'+data[i].fname+'['+data[i].id+']</a></div>' +
		'<div class="iChatContainer2">' +
			'<button id="relupdate'+data[i].uid2+'" class="but133"></button>'+
			'<button id="chat_'+data[i].cid+'" data-cid="'+data[i].cid+'" data-mode="1" data-uid0="'+my.uid+'" data-uid="'+data[i].uid2+'" class="but130" title="CHAT"><div class="totalChatNum chatc_'+data[i].cid+'"></div></button>' +
		'<div id="flag_'+data[i].id+'" class="flagInterviewStat1" style="background-color: '+decodeURIComponent(G.iColorFlags[data[i].status])+'">'+G.INTERVIEWS.status[data[i].status]+'</div></div>' +
		'<div class="photoBgEoiCon"><span class="photoBgEoi"><img src="'+data[i].bgimage+'"  width="100%" height="100%"></span></div> </div>' +
		'<div class="subcard" id="subcard'+data[i].id+'" style="display:none">'+
		'<div class="isTextTopCon">'+(data[i].eoi_id!='0' ? '<span class="isTextSm">'+dic.RE+':</span><div class="isText">'+data[i].title+'</div>':'') +
		'<div id="getin_'+data[i].id+'"></div></div>'+''+
		'<div class="boxesPositionInt">' +						
		(data[i].reason!=0 ? '<div class="flagCancelReason">'+G['inter_reason'][data[i].reason]+'</div>':'') +
		'<div class="boxSr" id="affiliateTermsRead_'+data[i].cid+'" style="display:'+(data[i].is_affiliate!=-1 && data[i].affiliate_terms==1 ? "block" : "none")+'"><span class="checkAgent">'+dic.ACCEPT_AGENTS_TERMS_CONDITIONS2+'</span></div>' +
		'</div>' +
		'<div class="interCamCont">'+(data[i].type==1 ? '<button onclick="stream('+data[i].uid2+','+my.uid+',&quot;inter&quot;,'+data[i].id+')"  class="but52 stream_'+data[i].id+'" disabled></button>' : '') +
		'<div class="iSceduleFlag">'+G.itype[data[i].type] +(data[i].type==3 && data[i].status > 7 ? tels : "")+(data[i].type==2 && data[i].status > 7 ? az : "")
		+ '</div><div class="iDate"><span class="timeRemainingA" id="timeRemainingA'+data[i].id+'"></span><span class="timeRemainingA">'+(data[i].status==11  && data[i].ended!=0 ? "DURATION"+': '+ Math.round((data[i].ended-data[i].started)/60)+' mins':'')+'</span>'+
		'<span class="timeRemainingB" id="timeRemainingB'+data[i].id+'"></span></div></div> ' +
			'<div id="ipanel_'+data[i].id+'" class="iResceduleC"><ul id="iContainer_'+data[i].cid+'_'+data[i].id+'" class="iStat2-now">'+(typeof ichoices !='undefined' ? ichoices : '')+'</ul></div>'+
'</div></div>';
}
}				
x('#wrapper'+wrap).html(html);
x('#speedloaderCon').hide();
pagination(inter_page,data[0].count,10,'page');
}else {
$('#speedloaderCon').hide();
$('<div class="setboxmesnores">'+dic.NO_RESULTS_FOUNDINT+'</div>').hide().appendTo('#wrapper1').show('fast');
}
},'json');
//TESTING LOG QUERY
/*  $.ajax({
type: 'GET',
url: AJAX,
data: { a:'select_query',i_order:i_order,i_type:i_type,i_status:i_status,i_status_param:i_status_param,i_contact:i_contact,i_post:i_post,mode:mode},
dataType: 'text',
success: function (data){
	console.log(data);
}})
*/
//SELECT CONTACT
//SELECT POST
xget({ a:'select_post',i_order:i_order,i_type:i_type,i_status:i_status,i_status_param:i_status_param,i_contact:i_contact,i_post:i_post,mode:mode},function (data){
var userpost=G.mobile ? '<option value="">'+(my.grp==1? dic.SELECT_CV : dic.SELECT_POST )+'</option>' : '<option value="">'+(my.grp==1? dic.SELECT_CV : dic.SELECT_POST)+'</option>';
for (var i in data){
var selected=data[i].id==i_post ? 'selected="selected"' : '';
if(G.mobile){
userpost +='<option value="'+data[i].id+'" '+selected+'>'+data[i].title+'</option>';
}else {
userpost +='<option value="'+data[i].id+'" '+selected+'>'+data[i].title+'</option>';
}
}
if(G.mobile){var html='<div class="sort_by1"><div  class="sortselect"><select id="i_post">'+userpost+'</select></div></div>'}else{var html='<div class="sort_by1"><div  class="sortselect"><select id="i_post">'+userpost+'</select></div></div>'}
x('#select_post').html(html);
})
}
/*
@Interview Page Javascript--
developed by Nikos Drosakis
*/
//get counter for all ids
$(document)
.on("click","#select_contact",function(){opener2('swSelectContact');})
.on("click","#select_post",function(){opener2('swSelectCVAdv');})
.on('click',"input[id^='affiliateTermsInput_']",function(){
var id=this.id;
var status =this.value=='on' ? 1 : 0;
var cid=this.id.replace('affiliateTermsInput_','');
s.confirm(dic.ACCEPT_TERMS_CONDITIONS_OF,function(result){
if(result){
xget({a:'affiliate_terms',b:cid,c: status },function(data){
if(data=='OK'){	toggledit('#affiliateTermsInputBox_'+cid,'#affiliateTermsRead_'+cid);	}
})
}else{
$('#'+id).prop("checked",false);
}
})
})
.on("change","#i_contact",function(){ses('i_contact',this.value);s.coo('inter_page',1);interloop();})
.on("change","#i_post",function(){ses('i_post',this.value);s.coo('inter_page',1);interloop();})
.on("click","button[id^='inpage']",function(){var id=this.id.replace('inpage','');
xget({a:'inpage',b:id},function(data){
if(data=='OK'){var hint =my.grp==1 ? dic.INPAGE_ALERT2 : dic.INPAGE_ALERT1; s.notify('good',hint)}})
})
.on("click","button[id^='intropanelbut']",function(){
	var id=this.id.replace('intropanelbut','');
	if($('#intropanel'+id).css('display')=="none"){
		$('#intropanel'+id).show();
	$.get('/ajax.php',{a:'intropluscomment',b:id},function(data){
	$('#intro'+id).html(data.intro);
	$('#comment2_'+data.cid).html(data.comment);	
	},"json");
	}else{
	$('#intropanel'+id).hide();
	}
})
//WATCH NEW AND RESET
.on("click","#newPostsMessage",function(){
ses('read_inters',0);
$('#newPostsMessage').remove();
location.reload();
})	
//ONCHNAGE
.on("click","ul#selInter li",function(){
ses('i_order',this.value);s.coo('inter_page',1);interloop();
})
.on("click","ul#select_type li",function(){
ses('i_type',this.value);s.coo('inter_page',1);interloop();
})
.on("click","ul#select_status li",function(){                
ses('i_status',this.value);s.coo('inter_page',1);interloop();
})
.on("click","ul#i_contact li",function(){
ses('i_contact',this.value);s.coo('inter_page',1);interloop();
})
.on("click","ul#i_post li",function(){
ses('i_post',this.value);s.coo('inter_page',1);interloop();
})
.on("change","#selInter",function(){
ses('i_order',this.value);s.coo('inter_page',1);                
interloop();
})
.on("change","#select_type",function(){
ses('i_type',this.value);s.coo('inter_page',1);interloop();
})
.on("change","#select_status",function(){
ses('i_status',this.value);
x('#'+ses('i_button')).attr('class','sortButtonInter');
x('#'+this.value).attr('class','sortButtonInterActive');
s.coo('i_status',this.value);s.coo('inter_page',1);               
x('#inter_subpage').html(' > '+([20,21,22,23].includes(ses('i_status')) ? extra[this.value] : G.INTERVIEWS.status[this.value]))
//interloop(i_order,i_type,this.value,i_contact,i_post);
location.href='/inter/'+G.mode
})
function upstat(stat,id,uname,uid){	
//var mes= my.grp==2 ? dic.DELETE_CONTACT2 : (G.mode=='received' ? dic.DELETE_CONTACT3 : dic.DELETE_CONTACT);
//s.confirm(mes,function(res){	
//if(res){
xget({a:'upstat',b:stat,c:id,d:uname},d=>{
	api.ma.N("get",my,['cont','eoi'],()=>{
		api.ma.N('get',uid,['cont','eoi'],d=>{soc.send({type:"N",to:uid});});					  
	})
	x('#'+uname+'card'+id).hide();
	});			
//}
//})
}
function getActive() {
    var users =[];
    $("div[class^='userid_']").each(function (index) {
        var uid = this.className.indexOf(' ') >= 0 ? explode(' ', this.className)[0].replace('userid_', '') : this.className.replace('userid_', '');
        users.push(uid);
    });
    $.get('/ajax.php', {a: 'isActive', b: users}, function (data) {
		if(data!='NO'){
        for(var i in data) {
            if (data[i] == 0) {
                $("div[class^='userid_" + i + "']").removeClass('user_online2b').addClass('user_offline2b');				
                // $("div[id*='userid_"+uid+"']").removeClass('user_offline2b').addClass('user_online2b');
            } else {
                $("div[class^='userid_" + i + "']").removeClass('user_offline2b').addClass('user_online2b');
            }
        }
		}
    },'json');
}
//************************************************EOI/CONTACT********************************************//
function iop(ids){
$.get("/ajax.php",{a: 'iopanel',ids:JSON.stringify(ids),page:G.uname,mode:G.mode},loop=>{	
console.log(loop)
for(var i in loop){x('#intereoiboxo'+i).html(loop[i])}
},'json');
}

function iopanel(oid){
var ids=[];
$("div[id^='intereoiboxo']").each(function (index){
var id=this.id.replace('intereoiboxo','');ids.push(id);
});   
if(!oid){
if(ids.length>0){iop(ids);}
}else{iop([oid])}
}
function ipanel(){var ids=[];
	$("div[id^='ipanel']").each(function(index){
	var id=this.id.replace('ipanel','');ids.push(id)});
	var page=G.URL_PAGE!='user'?G.uname:'eoi';		     
	xget({a:'ipanel_'+page,ids:JSON.stringify(ids),page:page},function(loop){      	 
	for (var i in loop){x('#ipanel'+i).html(loop[i])}
	},'json');
}
//onchange sorting
var smode=G.mode!='' ? '_'+G.mode :'';
var sort_contact='sort_contact'+smode;
var sort_contact_cookie=s.coo(sort_contact);
//sort 2 get cookie
var sort_contact_sub='sort_contact'+smode+'_sub';
var sort_contact_sub_cookie= s.coo(sort_contact_sub)
var sort_eoi_sub='sort_eoi'+smode+'_sub';
var sort_eoi='sort_eoi'+smode;
$(document).on("change",'#'+sort_contact,function (){
upSort(this.value)
location.href="/cont/"+G.mode+"?page=1";
})
.on("change",'#'+sort_contact_sub,function (){
if (upSort(this.value,'sub'))
location.href="/cont/"+G.mode+"?page=1";
})
.on("change","#contact_buscat",function(){
	if(this.value!=0){
	s.coo('sel_buscat',this.value);
	}else{
	s.coodel('sel_buscat');
	};
	location.reload();
})
.on("click","button[id^='acceptContact_']",function(){
	var exploded=explode('_',this.id);
	var cid=exploded[1];
	var confirmTerms=exploded[2];			
	if (confirmTerms=='confirmTerms'){			
	s.modal({message: "<input type='checkbox' id='confirmTerms'>'+dic.ACCEPT_AGENTS_TERMS_CONDITIONS+'<br/><span>'+dic.ACCEPT_THIS_CONTACT+'</span>",foot:[but("Cancel"),but("ΟΚ",function(){
			xget({a:'acceptContact',b:cid},function(data){
				if (data=='OK'){				
				x('#contcard'+cid).hide();
				api.ma.N('get',my,["cont"]);
				api.ma.my('get',my,["affee"]);
				location.reload();
				}else{	
				s.notify('error',dic.CONTACT_NOT_ACCEPTED);
				}
			});							
	  })]
	});			
	}else{
	xget({a:'acceptContact',b:cid},function(data){	
		if (data=='OK'){				
		s.notify('error',dic.CONTACT_ACCEPTED,function(){
		x('#contcard'+cid).hide();location.reload();
		});		
		}else{	
		s.notify('error',dic.CONTACT_NOT_ACCEPTED);
		}
	});
	}
}) 
.on("click","button[id^='deleteBinRec']",function(result){	 	
var eoid=this.id.replace('deleteBinRec','');
var mes= my.grp==2 ? dic.DELETE_EOIRECBIN2 : dic.DELETE_EOIRECBIN;
s.confirm(mes,function(result){
if(result){				
xget('?a=toDeleted&b='+eoid+'&mode='+G.mode);
x('#eoicard'+eoid).hide() 
refresh_page();				
}
})	
})	
.on("click","button[id^='deleteBin']",function(result){	 	
var eoid=this.id.replace('deleteBin','');
var mes= my.grp==2 ? dic.DELETE_EOIBIN2 : (G.mode=='received' ? dic.DELETE_EOIBIN3 : dic.DELETE_EOIBIN);
s.confirm(mes,function(result){
if(result){				
xget('?a=toDeleted&b='+eoid+'&mode='+G.mode);
x('#eoicard'+eoid).hide() 
refresh_page();				
}
})	
})
//toFavorite
.on("click","#accept_all_eois",function(){
xget({a:'acceptall'},function(accepted){
if(accepted!='NO'){
	for(var i in accepted){
	api.ma.N('get',accepted[i],['cont','eoi'],d=>{soc.send({type:"N",to:accepted[i]});});					  
	}	
	api.ma.N('get',my,['cont','eoi'],d=>{
		location.href=SITE_URL+"/eoi/accepted";	
	});			
	
	}else{console.log(accepted)}		
},'json');	
})
.on("click","#goselectedReset",function(){
s.coodel('selectedPostValue');
location.reload();
})
.on("click","#goselectedPost",function(){
var selectedPostValue= x('#selectedPostValue').val();
if(selectedPostValue!=''){
s.coo('selectedPostValue',selectedPostValue);
location.reload();
}
})
.on("click","#reset_filters2",function(){reset_filters_eoi();location.href='/eoi/'+G.mode+'?page=1';})
/*
.on("click","button[id^='intropanelbut']",function(){
var id=this.id.replace('intropanelbut','');
if($('#intropanel'+id).css('display')=="none"){
xget({a:'intro',b:id},function(data){
	x('#intro'+id).html(data);
	opener('intropanel'+id);
});
}else{
$('#intropanel'+id).hide();
}
})
*/
.on("change",'#'+sort_eoi_sub,function (){
if (upSort(this.value,'sub'))
 location.href='/eoi/'+G.mode;
})
.on("change","#eoiskills,#eoiexp_years,#eoiexp_id,#eoicity,#eoiagerange,#eoiedu_level1,#eoisedutype,#eoiedu_insti,#eoiedu_grade1",function(){
var cooki=this.id.replace('eoi','');
if(this.value==0){s.coodel(cooki);}else {
s.coo(cooki,this.value);
}
location.href="/eoi/"+G.mode+"?page=1";
})
.on("change",'#'+sort_eoi,function (){
	 if (upSort(this.value))
		 location.href='/eoi/'+G.mode+(G.flag!="" ? "?page=1&flag="+G.flag:"");
})
.on("change",'#selectedPost',function (){if (s.coo('selectedPost',this.value));location.href='/eoi/'+G.mode;})
.on("change",'#flag',function (){location.href="/eoi"+(G.mode!='' ? '/'+G.mode : '/accepted')+ (this.value!=0 ? '?page=1&flag='+this.value :'');})
//sort 5
.on("change",'#sort_eoi_subclass_'+G.mode,function (){
	 if (this.value==0){s.coodel(this.id);} else {s.coo(this.id,this.value);}
	 location.href='/eoi/'+G.mode;
})	
function refresh_page(){	
var newcardsnum=parseInt(ses('cards_num'))-1;
ses('cards_num',newcardsnum);	
if (ses('cards_num')==0){
location.reload();
}
}	
function upSort(sortSort,prefix){
var mode=G.mode !='' ? '_'+G.mode : '';
var pref=typeof prefix !='undefined' ? '_'+prefix : '';
var cookiename='sort_'+G.uname+mode+pref;
s.coo(cookiename,sortSort);
return true;
}
function refresh_page2(){	
var newcardsnum;	
cards_num =ses('cards_num');
newcardsnum=parseInt(cards_num)-1;
ses('cards_num',newcardsnum);	
if (ses('cards_num')==0){location.reload();}
}	
//******************************PROPOFFERLOAN**************************************//
function receiveEOIChat(lin){				
		console.log('receiveEOIChat')	
if(lin>0){x('#chatcid').val(lin)}
var cline=!lin ? s.coo("chatline"+G.ui) : lin;
console.log("line "+cline)
api.mo.getOne('chat'+G.ui,{cid:cline},d=>{
var position,ps,append='';
if(d!="NO"){
	for(var i in d.chat){
	d=d.chat;
	position=d[i].uid==my.uid ? 'right':'left',ps=d[i].uid==my.uid ? 'R':'L';
	append +='<div class="chatOfLine"><button class="delchat" id="delchat'+d[i].t+'">X</button><div class="triangle-isoof '+position+'">'+d[i].c+'</div><div class="chatOfDatetime'+ps+'">'+d[i].t+'</div></div>';	
	}
}else{
	append +='<div id="nomessage" class="chatOfLine">No messages</div>';			
}	
	if(G.uname!='mes'){
		if(!!cline){$('.chatBottomAll').show();}
		x('#chatitle').text(res.title)												
		if($('#chat').length>0){$('#chato').html(append).scrollTop($('#chato')[0].scrollHeight)}
	}else{
		$('#chattitlepage').text(res.title)
		$('#chatpage').html(append)	
	}
});	
}
function stream_restrict_offerprop(id){		
xget({a: 'insert_stream_restrictions',b: id},function(da){
   var cameraid='#stream_'+id+'_'+da.uid+'_'+da.uid0;
	var inpage=my.uid==da.uid ? da['inpage'] : da['inpage0'];
	var inpageOp=my.uid==da.uid ? da['inpage0'] : da['inpage'];
	if (da.interview_type=="1"){
		if (da.open_camera){
			$(cameraid).removeClass('but52').addClass('but51').prop('disabled',false);					
			$('#getin_'+id).html(
				(inpage==1
						? ('<div class="getInterviewCon">' +
							'<span id="intertit'+id+'" class="getInterviewTit">'+dic.ALERT_EMPLOYER+ '</span>' +
							'<div '+(inpage==1 ? "disabled" : "")+' class="getInterview2" id="inpage'+id+'">'+dic.SIGNALLED_ASREADY_ONLINE_INTERVIEW1+'</div>' +
							(inpageOp==1 ? '<span class="getInterviewTit2">'+(my.grp==1 ? dic.ALERT_EMPLOYER3B : dic.ALERT_CANDIDATE3)+'</span>':"") +
							'</div>'
						)
						: ('<div class="getInterviewCon">' +
							'<span id="intertit'+id+'" class="getInterviewTit">'+dic.ALERT_EMPLOYER+ '</span>' +
							'<button '+(inpage==1 ? "disabled" : "")+' class="getInterview" id="inpage'+id+'">'+
							(my.grp==1 ? dic.READY_ONLINE_INTERVIEW1 : dic.READY_ONLINE_INTERVIEW2)+'</button>' +
							(inpageOp==1 ? '<span class="getInterviewTit2">'+dic.ALERT_EMPLOYER3B+'</span>':"") +
							'</div>'
						)
				)
			)
		}else{
			$(cameraid).removeClass('but51').addClass('but52').prop('disabled',true);
			$('#getin_'+id).html('')
			s.notification.set(0);
		}
	}else{
			s.notification.set(0);
			$('#getin_'+id).html('')
	}
},'json');
};
function online_inter_offerprop(){	
$.get('/ajax.php',{a: 'online_today'},function (data){
		var html='';
		if (data!='NO'){
		//    ses('online_data_prop',JSON.stringify(data));
		  //  ses('online_interviews_prop',data.length);
			var status=data.length+' online interviews today';
			for (var i in data){
				ses("stream_id",data[i].uid+data[i].uid0);						
				s.coo("stream_pid",data[i].id);
				var end=data[i].start +data[i].duration;
				if(data[i].start - 1200 < time() && end > time()){
					var inpage= data[i].uid==my.uid ? data[i].inpage : data[i].inpage0;
					var inpageOp= data[i].uid==my.uid ? data[i].inpage0 : data[i].inpage;
					stream_restrict_offerprop(data[i].id);
					//set notication
					var img=iconic(data[i].img);
					var title=dic.INTERVIEW_ID+' '+ data[i].id;
					var body=data[i].name+' - '+ data[i].startime;
					var link =G.SITE_URL+'inter/stream?pid='+data[i].id;
				 if(!G.mobile){
					 if (s.isNotification){
						 if (!local('notif'+data[i].id)){
					//		 s.notification.set(1,body,img,title,link);
							 local('notif'+data[i].id,link);
						 } else {
							 s.notification.set(0);									 
						 }
					 }
				 }
			//set html poutsa
					html +='<div class="onlineBox" style="background:#010181">' +
						'<div class="photoOnline"><img src="'+data[i].img+'" width="100%"></div>' +
						//'<div class="interCamContTop"><button id="stream_'+data[i].id+'_'+data[i].uid+'_'+data[i].uid0+'" class="but51"></button></div>' +
						'<div class="interCamContTop"><button onclick="stream('+(data[i].uid==my.uid ? data[i].uid0:data[i].uid)+","+my.uid+",'"+G.pt+"',"+data[i].id+')" class="but51"></button></div>' +
						'<div class="textContOnline"><div class="textLOnline"><span class="textLOnlineTitle">'+dic.INTERVIEW_ID+':</span>'+data[i].id+'</div></div>' +
						'<div class="nameOnlineCon"><div class="userOnOffPosIntTop"><div class="userid_'+data[i].uid+'"></div></div><a href="inter/itoday" class="nameOnline">'+data[i].fullname+'</a></div>' +
						'<div class="timeOnline">'+data[i].startime +
						'<div class="textLOnline">'+(inpage==1
								? (inpageOp==1 ? '<span class="getInterviewTit2">'+(my.grp==1 ? dic.ALERT_EMPLOYER3B : dic.ALERT_CANDIDATE3)+'</span>' : "")
								: (inpageOp==1 ? '<span class="getInterviewTit2">'+(my.grp==1 ? dic.ALERT_EMPLOYER3B : dic.ALERT_CANDIDATE3)+'</span>' : "")
						)+'</div>' +
						'<em><span id="getinStatus'+data[i].id+'" class="chronotime1"></span></em></div></div></div>';
				}else{
					$('#stream_'+data[i].id+'_'+data[i].uid+'_'+data[i].uid0).removeClass('but51').addClass('but52').prop('disabled',true);	
					 //$('#onlineInter').html('')
					 $('#subhc').html('');
					local.del('notif'+data[i].id);
					if(s.isNotification){s.notification.set(0);}
				}
			}
			// if(!local.getby('notif')){
			//$('#onlineInter').html(html);						
			$('#subhc').html(html);
			// }
		} else {
			 $('#subhc').html('');
			//$('#onlineInter').html('')			
			 s.notification.set(0);
		}
	},'json')
}

$(document)
//chat
.on("click","button[id^='minchat']",function(){var id=this.id.replace('minchat','');chat.min(id);})
.on("click","button[id^='closechat']",function(){var id=this.id.replace('closechat','');x("#chatbox"+id).remove();chat.s.coo(id,0,this);})
.on("click","button[id^='chat_']",function(){var line=explode('_',this.id);chat.s.coo(line[1],1,this)})
.on("click","button[id^='chatsend']",function(){
		var cid=this.id.replace('chatsend',''),
		mode=$(this).attr('mode').replace('messi','');
		api.mo.getOne("chat"+mode,{cid:cid},d=>{d.mode=mode;chat.send(d)});
})
.on("change","select[id^='place']",function(){
var oid=this.id.replace('place','');
var uid=parseInt(this.getAttribute('uid'));	
xget({a:'place',b:this.value,c:oid},function(res){
	console.log(res)
	api.ma.N('get',my,[G.pt+'eoi'],()=>{
		soc.send({type:"io",to:uid,fun:"iopanel("+oid+")"})
	});
	})
})
.on("click","button[id^='"+G.pt+"contactfav']",function(){
var newstatus=this.className=='favoriteContact' ? 1:2;
if(this.className=='favoriteContact'){this.setAttribute('class','addToFavProp');}else{this.setAttribute('class','favoriteContact');}
var cid=this.id.replace(G.pt+'contactfav','');		
xget({a:G.pt+"contactfav",b:cid,c:G.uname,d:newstatus,e:G.uname},function(res){ 	
console.log(res)
})
})    
.on("click","span[id^='"+G.pt+"privacyname_']",function(){
var exp=explode('_',this.id);
var cid=exp[1];
var privacySet=exp[2]==1 ? 0 : 1;
var divid='offerprivacyname_'+cid+'_'+privacySet;
this.id=divid;
if (x('#'+divid).attr('class')=='nameHidden'){
	s.confirm(dic.SWITCH_NAME_VISIBLE,function(result){if (result){
		x('#'+divid).attr('class','nameVisible');
		api.ma.set(G.pt+"cont SET fullnameP=? WHERE id=?",[privacySet,cid],d=>{console.log(d)});                
	}})
}else{
	s.confirm(dic.SWITCH_NAME_HIDDEN,function(result){if (result){
		x('#'+divid).attr('class','nameHidden');
		api.ma.set(G.pt+"cont SET fullnameP=? WHERE id=?",[privacySet,cid],d=>{console.log(d)});
	}})
}
})
.on("keyup click","input[id^='ref'],input[id^='mnum']",function(){
 var exp=explode('_',this.id);
 if(this.value.length>0){
 xget({a:exp[0],b:this.value,c:exp[1],d:G.uname},function(res){console.log(res)});
 }
})
.on("change","select[id^='assign']",function(){
var cid=parseInt(this.id.replace('assign','')),val=parseInt(this.value);
var data=$(this).data();
data.cid=cid;
if(val>0){
xget({a:'assign',b:cid,c:val},function(res){			
			api.mo.getOne('chat'+data.mode,{cid: cid},d=>{					
			if(d=="NO"){
				chat.createline(data).then(ins =>{
					api.mo.fup("chat"+G.ui,{cid:cid},{$set:{author:val}},d=>{console.log(d)});
				})				
			}else{
				api.mo.fup("chat"+G.ui,{cid:cid},{$set:{author:val}},d=>{console.log(d)});
			}	
			});
	});
}
})
.on("click","span[id^='"+G.pt+"mailtel_']",function(){
var exp=explode('_',this.id);
var cid=exp[1];
var privacySet=exp[2]==1 ? 0 : 1;
var divid='mailtel_'+cid+'_'+privacySet;
this.id=divid;
if (x('#'+divid).className=='telMailHidden'){
	s.confirm(dic.MAILTEL_VISIBLE,function(result){if (result){
		x('#'+divid).className='telMailVisible';
		api.ma.set(G.pt+"cont SET mailtelP=? WHERE id=?",[privacySet,cid]);
	}})
}else{
	s.confirm(dic.MAILTEL_HIDDEN,function(result){if (result){
		x('#'+divid).className='telMailHidden';
		api.ma.set(G.pt+"cont SET mailtelP=? WHERE id=?",[privacySet,cid]);               
	}})
}
})
.on("click","button[id^='bidsubmit']",function(){
	var propid=this.id.replace('bidsubmit','');
	var value=$('#bid'+propid).val();
	var expiredbid= s.coo('proptype')==2 ? my.propbitleaseE==0 || my.propbitleaseE <= time() : my.propbitsaleE==0 || my.propbitsaleE <= time();
	var service=s.coo('proptype')==2 ? 15 : 16;
	console.log(expiredbid)
	if (expiredbid){
	s.confirm("Please go to payment to access bid",function(res){
	if(res){location.href="/u/"+my.name+"/services?page="+service;}
	})
	}else{
	xget({a:"bid",b:value,c:propid},function(res){ if(res=="OK"){ 
	$('#bidset'+propid).text(date('Y-m-d H:i',time()))
	s.notify('good',"Bid set successfully")}else{s.notify('error',"Error SENDING EOI")}})
	}
})
//sendoffereoi_242_7466116_5_0_www.logistis.com
.on("click","button[id^='sendpropeoi']",function(){
	var exp=explode("_",this.id),thi=$(this);
	xget({a:"sendpropeoi",b:parseInt(exp[1]),c:parseInt(exp[2]),d:exp[3]},function(res){ 
		if(res=="EXIST"){
			s.modal("EOI EXISTS");
		}else if(res!="NO"){
			api.ma.N('get',my,[G.pt+"eoi"]);
			api.ma.N('get',exp[2],[G.pt+'eoi'],d=>{soc.send({type:"N",to:exp[2]});});	
			$('#send'+G.pt+'eoi_'+exp[1]+'_'+exp[2]).text('eoi sent');
				if(exp[3]=='1' || exp[3]=='2' || exp[3]=='3' || exp[3]=='4'){	
				console.log('setup offer agent');
				//setapp(3,'/offer/agent'); 
				s.coo('propmode','agent');
				location.href='/prop';
				}else if(exp[3]=='10'){
					var cid=res,title="New Contact";
					if(res!='NO' && res!='exist'){	chat.s.coo(cid,1,thi);thi.remove();}else{s.notice('log',res)}
				}else{
					s.modal("EOI created successfully");
				}
			}else{s.modal("Error SENDING EOI"+res);}
	},'json');	
})
.on("click","button[id^='sendoffereoi']",function(){
var thi=$(this),
exp=explode("_",this.id),
name=thi.attr('name'),
a=exp[3]=='10' ? "sendoffereoi10":"sendoffereoi",
crit={a:a,b:exp[1],c:exp[2],d:exp[3],e:exp[4]};
//b cid, uid0, newlevel
console.log(crit);
$.get('/ajax.php',crit,function(res){
	console.log(res);
	if(res!="ΝΟ"){
		api.ma.N('get',my,[G.pt+"eoi"],d=>{
		api.ma.N('get',exp[2],[G.pt+'eoi'],d=>{soc.send({type:"N",to:exp[2]});});	
		thi.text('EOI sent').attr('class','sendOfPropEoiOk');
		});		
	}
	if(exp[3]=='1'){
		s.coo('anchor',exp[1]);
		api.red.set("anchorhtml"+my.uid,$('#wrapper1').html(),d=>{
		location.href='/u/'+name+'/_offer/'+exp[1];
		});
	}else if(exp[3]=='2'){
		if($('#intropanel'+exp[1]).css('display')=='none'){$('#intropanel'+exp[1]).show();}else{$('#intropanel'+exp[1]).hide();}
	}else if(exp[3]=='4'){
		location.href=exp[4];	
	}else if(exp[3]=='5'){
		if(exp[4]==0){		
		chat.s.coo(res,1,thi);	
		}else{	
		var spl=exp[5].split('//'); 
		if(spl.length>1){window.location.replace(exp[5]);}else{window.location.replace("http://"+exp[5]);}	
		}
	}else if(exp[4]=="chat"){
		chat.s.coo(res,1,thi);
	}
	},'json');	
})
//OFFER
.on("click","#relbutton",function(){
var val=$("#relo").val().trim();
if(val.length>0){
s.coo('qcon',val);
location.reload()
}
})
.on("click","button[id^='del"+G.pt+"eoi']",function(){
var id=this.id.replace('del'+G.pt+'eoi','');
s.confirm("This eoi will be deleted. Are you sure?",function(result){
	if(result){				
		api.ma.N('get',my,[G.pt+"eoi"])
		xget({a:"del"+G.pt+"eoi",b:id,pt:G.pt},function(res){ console.log(res)				
		if(res=="OK"){$('#box'+id).remove()}else{s.notify('error',"Error DELETING EOI")}
		})	
	}
})		
})	
.on("click","button[id^='del"+G.pt+"cont']",function(){
var uid=this.getAttribute('uid'),id=this.id.replace('del'+G.pt+'cont','');
s.confirm("This CONTACT and all EOIs and APPLICATIONS and MESSAGES will be deleted. This action CANNOT BE UNDONE. Are you sure?",function(result){
	if(result){	
		console.log({a:"del"+G.pt+"'cont",b:id,pt:G.pt})
		$.get('/ajax.php',{a:"del"+G.pt+"cont",b:id,pt:G.pt},function(res){ 	
		console.log(res)
		console.log(res)
		console.log(res)
	
		if(res=="OK"){
			api.ma.N('get',my,[G.pt+"eoi"]);
			api.ma.N('get',uid,[G.pt+'eoi'],d=>{soc.send({type:"N",to:uid});});	
			$('#box'+id).remove()
		}else{s.notify('error',"Error DELETING EOI")}
		})	
	}
})		
})	
.on("click","input[name^='offerprod']",function(){
	s.coo('sm_offerprod',this.value);
if(this.checked){$('#locationBox').show()}else{$('#locationBox').hide()}
})		
.on("click","button[id^='accept"+G.pt+"eoi']",function(){
var uid=this.getAttribute('uid'),id=this.id.replace('accept'+G.pt+'eoi','');
s.confirm("This eoi will be accepted. Are you sure?",function(c){
	if(c){				
		xget({a:"accept"+G.pt+"eoi",b:id},function(res){			
		if(res=="OK"){
		api.ma.N('get',my,[G.pt+"eoi"]);		
		api.ma.N('get',uid,[G.pt+'eoi'],d=>{soc.send({type:"N",to:uid})});	
			if(G.mode=="myoffers"){				
				$('#statusFlag'+id).css('backgroundColor','green').text('ACCEPTED')						
			}else{$('#box'+id).remove()}
			}else{s.notify('error',"Error ACCEPTING EOI")}
		})	
	}
})		
})	
.on("click","#reset_filters_prop,#reset_filters_loan",function(){
s.coodel(G.pt+'id')
s.coodel(G.pt+'uid')
s.coodel(G.pt+'rod')
s.coodel(G.pt+'grp')
s.coodel(G.pt+'inter')
s.coodel(G.pt+'type')
s.coodel(G.pt+'flag')
s.coodel(G.pt+'place')
s.coodel(G.pt+'eoiorder')
location.reload()
})
.on("click","#accept_all_"+G.pt,function(){
xget({a:"acceptalleoi",b:id},function(res){ console.log(res)				
		if(res=="OK"){location.href="/"+G.pt+"eoi/myaccepted"}else{s.notify('error',"Error Accepting All EOI")}
		})	
})
.on("click","button[id^='intereoiaccept']",function(event){		
this.style.display='none';
var id=this.id.replace('intereoiaccept',''),uid=this.getAttribute('uid')				
console.log({a:"intereoiaccept",b:id,d:G.uname})
	xget({a:"intereoiaccept",b:id,d:G.uname},function(res){ 				
		if(res=="OK"){
		api.ma.N('get',my,[G.pt+"eoi"]);			
		api.ma.N('get',uid,[G.pt+'eoi'],d=>{soc.send({type:"N",to:uid});});		
		soc.send({type:"io",to:uid,fun:"iopanel("+id+")"})
			console.log('ok interview accept')		
		$('#intereoiflag'+id).html('<div class="schOfferTit" style="background-color:#97C93E">Confirmed Interview</div>');
		}else{s.notify('error',"Error INTERVIEW")}
		})
})
.on("click","button[id^='internew']",function(){
var id=this.id.replace('internew',''),uid=this.getAttribute('uid');
xget({a:"internew",b:id,d:G.uname},function(res){ 				
if(res=="OK"){
	api.ma.N('get',my,[G.pt+"eoi"]);		
	api.ma.N('get',uid,[G.pt+'eoi'],d=>{soc.send({type:"N",to:uid});});	
	soc.send({type:"io",to:uid,fun:"iopanel("+id+")"})	
$('#intereoiflag'+id).html('<div class="schOfferTit" style="background-color:#8e7835;">Request Interview</div>');
$('#intereoisend'+id).hide()
$('#intereoiaccept'+id).hide()
$('#intercompleted'+id).hide()
$('#offerplace'+id).val(0)
$('#intereoicancel'+id).hide()
$('#interlabel'+id).hide()
$('#interdatetime'+id).show()
$('#intereoi'+id).val("0000-00-00 00:00")
}else{s.notify('error',"Error INTERVIEW")}
})
})
.on("click","button[id^='intercompleted']",function(event){
this.style.display='none';
var id=this.id.replace('intercompleted',''),uid=this.getAttribute('uid');
xget({a:"intercompleted",b:id,d:G.uname},function(res){ 				
if(res=="OK"){
		api.ma.N('get',my,[G.pt+"eoi"]);		
		api.ma.N('get',uid,[G.pt+'eoi'],d=>{soc.send({type:"N",to:uid});});	
		soc.send({type:"io",to:uid,fun:"iopanel("+id+")"})
	console.log('ok interview completed');		
$('#intereoiflag'+id).html('<div class="schOfferTit" style="background-color:purple;">Completed Interview</div>');				
}else{s.notify('error',"Error INTERVIEW")}
})
})
.on("click","button[id^='intereoisend']",function(event){
	this.style.display='none';
var id=this.id.replace('intereoisend',''),uid=this.getAttribute('uid');
var value=$('#intereoi'+id).val();
	$.get('/ajax.php',{a:"intereoisend",b:id,c:value,d:G.uname},function(res){
		if(res=="OK"){
			api.ma.N('get',my,[G.pt+"eoi"]);
			api.ma.N('get',uid,[G.pt+'eoi'],d=>{soc.send({type:"N",to:uid});});	
			soc.send({type:"io",to:uid,fun:"iopanel("+id+")"})
			console.log('Interview Requested')
		x('#intereoiflag'+id).html('<div class="schOfferTit" style="background-color:#2C3E95;">Requested by me</div>');	
		x('#intereoicancel'+id).show();
		}else{s.notify('error',"Error INTERVIEW")}
		})
})
.on("click change","input[id^='intereoi']",function(event){
var id=this.id.replace('intereoi',''),uid=this.getAttribute('uid'),value=this.value;
x('#intereoiflag'+id).html('<div class="schOfferTit" style="background-color:#8e7835;">Request Interview</div>');
//var mode=G.mode=='manager'? G.mode : G.uname;
var table=G.pt+"eoi";
	api.ma.set(table+" SET inter=5,intersend=?,intersender=? WHERE id=?",[strtotime(value),my.uid,id],d=>{		
	if(d=="OK"){
	x('#intereoisend'+id).show();x('#intereoicancel'+id).show();x('#intereoiaccept'+id).hide();			
	api.ma.N("get",my,[table]);		
	api.ma.N('get',uid,[table],d=>{soc.send({type:"N",to:uid});});	
	soc.send({type:"io",to:uid,fun:"iopanel("+id+")"})
	}	
	})
})
//PROP MODE
.on("click","button[id^='intereoicancel']",function(event){
	var id=this.id.replace('intereoicancel',''),uid=this.getAttribute('uid'),table=G.pt+"eoi";		
	xget({a:"intereoicancel",b:id,c:G.mode},function(res){ 				
		if(res=="OK"){
		api.ma.N("get",my,[table]);		
		api.ma.N('get',uid,[table],d=>{soc.send({type:"N",to:uid});});		
		soc.send({type:"io",to:uid,fun:"iopanel("+id+")"})
			console.log('ok interview cancelled')
			x('#intereoiaccept'+id).hide();
		x('#intereoiflag'+id).html('<div class="schOfferTit" style="background-color:black">Cancelled Interview</div>');
		}else{s.notify('error',"Error INTERVIEW")}
		})
})
.on("click","#callend",function(){		
xget({a:'stream_ended',b:G.pid},function(data){
var uid=G.uid0==my.uid ? G.uid : G.uid0;
var page=G.uid0==my.uid ? "apps" : "myoffers";
s.coo(G.pt+'uid',uid);
location.href="/"+G.pt+"eoi/"+page;
})
})
.on("click","button[id^='stream_']",function(){		
var exp=explode('_',this.id);                
if(this.className=="but51"){       
xget({a:'inpage',b:exp[1]},function(data){
	if(data=='OK'){
		s.notify('error',dic.INPAGE_ALERT2)
		//location.href="/inter/stream?pid="+exp[1]+"&uid="+exp[2]+"&uid0="+exp[3];
	}
})
}else{
   console.log("camera closed")
}		
})
function reset_filters_offer(){
s.coodel('offerid');s.coodel('offeruid');s.coodel('offerprod');s.coodel('offergrp');s.coodel('pcat1');s.coodel('pcat2');s.coodel('pcat3');
s.coodel('offerinter');s.coodel('offerflag');s.coodel('offerplace');s.coodel('offerprod');s.coodel('offertag');s.coodel('offereoiorder');
}
/*
* APPEND ASYNC DATA to local and remote profile
* to post/profile [location,classif,subclassif,specific]
* */
function asyncdata(){
var ep=$('#ep').val();
var type=G.mode=='offer' ? "offer":(G.mode=='prop' ? 'prop' : (!ep ? 'post' : 'cv'));
var sub='',spec='',exp='';
xget({a:'asyncdata',b:G.id,c:type},function(data){
console.log('RUN ASYNDATA')
console.log(data)
for(var i in data['subs']){
sub +='<div id="psubclassif_'+data['subs'][i]+'" class="addSelectionBox2">'+i +
	'<button style="display:none" id="deleteSubclassif_'+data['subs'][i]+'_'+G.id+'" class="but135"></button>' +
	'</div>';
}
for(var i in data['spec']){
spec +='<div id="pspecific_'+data['spec'][i]+'" class="addSelectionBox2">'+i+'</div>';
}
if(type=='cv'){
for (var i in data['exp']){
	exp +='<div id="dExperience_'+i+'" class="addSelectionBox2">'+data['exp'][i] +
		'</div>';
}
$('#dexperienceView').append(exp);
}
$('#locationLabel_'+G.id).append(data['city']);
if(data['cl']!=null){
//data['cl'] +
$('#pclassification_choice').append('<button style="display:none" id="deleteclassif_'+G.id+'" class="but135"></button>');
}
// $('#psubclassification_list').append(sub);
$('#specific_list').append(spec);
$('#classification_value').val(data['clid']);
if(G.mode=='prop'){
var goid=$('#goid').val();
if(!data['city']){ var link='' }else{
var link=data['city']+' '+$('#address').text();
}
$('#mapaddress').val(link);
var id=$('#goid').val();
s.coo('mapaddress'+id,link)
}
},'json')
}
function resetPostCounter(action){
if(my.grp==2){
var sesCount= action=='closeActive' ? JSON.parse(ses('p_index_active')).length : JSON.parse(ses('p_index_inactive')).length;
var counter=parseInt($('#postCounter').text());
var newcount= action=='closeActive' || action=='closeInactive' ? counter - sesCount : counter+sesCount;
$('#postCounter').text(newcount);
}
}
$(document).on("change","#pfilter_classification",function(){
x('#pf_specific').html('');
var newclass=$("#pfilter_classification option[value='"+this.value+"']").text();
var classif=this.value;
x('#pclassification_choice').text(newclass);
x('#classification_value').val(classif);
// s.confirm(dic.SELECTED_SUBCLASSIFICATION_LOST+'. '+dic.SURE,function(result){
//     if (result){
if(postid!=''){
	xget({a:"deleteall",b:G.id,c:this.value},function(data){
		console.log(data)
	});
	//del specs
 xget('?a=delspec&c='+G.id);
}
$('div[id^="psubclassif_"]').each(function (){
	this.remove();
})
$('div[id^="pspecific_"]').each(function (){
	this.remove();
})
//reset
subclassification_selected_form('','reset')
professions_form('',classif);
specific_form();
// }
// });
})
.on("click","input[id^='psubclassiform_']",function(){
if (G.mode !='newad' && G.mode !='newnotice'){			 			
	var id=this.id.replace('psubclassiform_','');
	//del specs
	if(!this.checked){
		xget({a: 'delspec',b:id,c: G.id},function(data){
			if(data!='NO'){
				for (var i in data){x('#pspecific_'+data[i]).remove();}
			}
		},'json');
	}
	if(!this.checked && x("input[id^='psubclassiform_']:checked").length==0 && $('#post_status').val()==2){
		$(this).prop('checked',true);
		// $('#pspecific_'+id).remove();
		s.notify('error',dic.CANNOT_UNCHECK_ALL_THE_SUBCLASSIF_IN_MODE)
	}else{
		var speclist= $("input[id^='psubclassiform_']:checked").map(function(){
			return this.id.replace('psubclassiform_','');
		}).get();
		var max=my.grp==1 ? 4 : 1;
		if(speclist.length <= max){
			specific_form(speclist);
			add_remove_subclassif(id);
		}else{
			this.checked=false;
			s.notify('error',dic.MAX_SUBS+' '+max)
		}
	}
}else{	
	var speclist= $("input[id^='psubclassiform_']:checked").map(function(){
		return this.id.replace('psubclassiform_','');
	}).get();
	var max=my.grp==1 ? 4 : 1;
	if(speclist.length <= max){
		if($('#pf_specific').css('display')=='none'){
			opener2('pf_specific');
		}
		specific_form(speclist);
	}else{
		this.checked=false;
		s.notify('error',dic.MAX_SUBS+' '+max)
	}
}		
})
.on("click",'#submitpromo',function(){
var promo=$('#promo').val();
$.post("/ajax.php",{a:'promo',promo:promo},function(d){		
console.log(d)				
	if (d==='OK'){
	api.ma.my('get',my,['user']);
	s.notify('good',dic.POST_SUMMARY_UPDATED);
	}
});
})
.on("click","input[id^='pspec_']",function(){
	var id=this.id.replace('pspec_','');
	var text= this.getAttribute('data')
	var value= this.checked ? 1 : 0
	xget('?a=insdelspec&b='+id+'&c='+G.id+'&d='+value+'&e='+this.value);
	if(value==1){
		x('#specific_list').append('<div id="pspecific_'+id+'" class="addSelectionBox">'+text+'</div>');
	}else{
		x('#pspecific_'+id).remove();
	}
})    
.on("click","button[id^='authorsave'],button[id^='authorupdate']",function(){
var mode=this.id.indexOf("authorsave") >= 0 ? 'authorsave' : 'authorupdate';	
var id=this.id.replace(mode,'');		
var IDs ={}
$("input[id^='author"+id+"_']").map(function(){ IDs[this.id.replace('author'+id+'_','')]=this.value; }).get();
console.log(IDs)
$.post("/ajax.php",{a:mode,b:JSON.stringify(IDs),c:id},function(res){
if(res=="OK") {
	api.ma.my('get', my, ['user'], d => {
		location.reload()
	})
}
})
})
//specific job 	HELP
.on('click',"li[id^='lu']",function(){
var optionid= this.id.replace('lu','');
var subclassif= this.getAttribute('val').replace('lu','');
var luspec=x("#luspec"+optionid).text();
var lusub=x("#lusub"+optionid).text();
var cla= x("#luclass"+optionid).text();
var label='<span class="splabelTit">'+dic.ABOVE_ROLE+'</span><span class="splabel"><span class="splabelt">'+dic.PRIMARY_CLASSIFICATION+'</span>'+cla+'</span>'
	+'<span class="splabel"><span class="splabelt">'+dic.SUBCLASSIFICATIONS+'</span>'+lusub+'</span>'
	+'<span class="splabel"><span class="splabelt">'+dic.SPECIFIC_JOBS+'</span>'+ luspec+'</span>';
x('#lookuplistres').html(label);
x('#lookuplist').hide();
})	
//relocate_ref
function more(name,valid,readid){
$(document).on("click","#"+name+"more",function(){
var rel= x('#'+valid).val();
x('#'+readid).html(rel+' <span class="moreless" id="'+name+'less"> << '+dic.LESS+'</span>')
})
.on("click","#"+name+"less",function(){
var rel= x('#'+valid).val();
var more= rel.substring(0,50)+' <span class="moreless" id="'+name+'more"> '+dic.MORE+' >></span>';
x('#'+readid).html(more)
})
}
more('rel','relocationRef','readRelocationRef');
more('prof','profreg','read_profreg');
$(document).on('click','#editSettings',function (){
if(x('setting1').css('display')=='none'){
	$("span[id^='privacy']").each(function(){this.style.display='none';});
	$("span[id^='setting']").each(function(){this.style.display='block';});
}else {
	$("span[id^='setting']").each(function(){this.style.display='none';});
	$("span[id^='privacy']").each(function(){this.style.display='block';});
}
})
.on("keyup","#relocationRef",function(){
    xget('?a=relocationRef&b='+this.value);
    var more= this.value.substring(0,50)+' <span class="moreless" id="relmore"> '+dic.MORE+' >></span>';
    var text= this.value.length > 50 ?  more : this.value;
	api.ma.my('get',my,['user']);
    x('#readRelocationRef').html(text)
})
/* profile main  */
//change pass
//  $("#submitPassword,#buttonEditPass").click(function(){
//   opener('editPassword');
// 	});
.on("click","#submitPassword",function(){
var c= x('#inputPassword1').val(),
b= x('#inputPassword2').val(),
d= x('#inputPassword3').val();
if(b!=d){
s.notify('error',dic.NEW_PASSWORD_NOT_MATCH);
}else{
	xget({a:'updatePass',b:b,c:c},function (data){
		if (data==='OK'){			
		s.notify('error',dic.PASSWORD_UPDATED);
		}else{
		s.notify('error',dic.PASSWORD_NOT_CORRECT);
		}
	});	
}
$('#inputPassword1,#inputPassword2,#inputPassword3').val('');
})
//change lang interface
.on("change",'#changelang',function (){
xget('?a=changeLang&b='+this.value);
x('#readLang').html(G.langs[this.value]);
s.coo('LANG',this.value);
api.ma.my("get",my,['user'])
s.notify('good',dic.LANGUAGE_UPDATED)
location.reload();
})
.on('click','#editlang',function (){
toggledit('#readLang','#editLang');
})
.on("keyup","#editAlias",function(){
	xget('?a=alias&b='+this.value);
   if(this.value.length > 0){
	x('#readContactName').text(this.value);
   }else{
	xget({a:'userfullname'},function(data){
		x('#readContactName').text(data);
	})
   }
})
.on('click','#submitName',function(){
	var thisval=x('#editName1').val();
		xget({a:'name',b:thisval},function(data) {
		if (data=='OK'){
		s.confirm(dic.CHANGE_NAME+' <b>'+thisval+'</b> '+dic.SURE,function(result) {
		if (result){location.href='/u/'+thisval;}
		});
		}else{
		s.modal(dic.USERNAME_EXISTS);
		}
		});	
	})
.on('click','#submitTelephones',function(){
	var tel1=x('#editTelephones1').val();
	var tel2=x('#editTelephones2').val();
	xget({a:'tel',b:tel1,c:tel2},function(data){
	if (data=='OK'){	
	s.confirm(dic.CHANGE_TEL1_ZIP+' '+tel1+' '+tel2+' '+dic.SURE,function(result) {
	if(result){
	api.ma.my('get',my,['user']);
	$('#readTelephones').html(tel1+' '+tel2).show('normal');
	}
	});
	}else{
	s.modal(dic.TEL_CANNOT_INSERTED);
	}
	})	
	})
    //sequrity question
.on("click",'#submitSecurQuest',function(){
			var pass= $('#inputPass').val().trim();
			var sq= $('#sq').val().trim();
			var sa= $('#sa').val().trim();
			if(pass==my.pass){
                xget({a:"sq",b:sq,c:sa}, function(data) {
                if(data=='OK'){
                   	api.ma.my('get',my,['user']);
					}else{
                        s.modal(dic.SECURITY_QUESTION_UPDATED_SUCCESSFULLY)
					}
                })
			}else{
				s.modal(dic.PASSWORD_IS_NOT_CORRECT)
			}
        })	
.on('click','#submitMail',function(){
	var thisval=x('#editMail1').val();
	console.log({a:'mail',b:thisval})
	xget({a:'mail',b:thisval},function(data){
	if (data=='OK'){
	s.confirm(dic.CHANGE_EMAIL+' '+thisval+' '+dic.SURE,function(res){
	if(res){
	api.ma.my('get',my,['user']);}})	
	}else if (data=='R2'){
	s.notify('error',dic.EMAIL_CANNOT_CHANGED_MORE_ONCE);
	}else{
	s.notify('error',dic.EMAIL_EXISTS);
	}
	});
return false;
})
.on("keyup","#title",function(){
var str=greeklish(this.value);
xget({a:'newtitle',b:str},function(data){
	x('#uri').val(data);
})
})
.on("change","#filter_state3",function(){
$('#filter_province3').val(0);
$('#filter_city3').val(0);
location_form3();
})
.on("change",'#filter_province3',function(){
location_form3();
})
.on("click",'#submitNewPost',function(event){
//nicEditors.findEditor('content').saveContent();
var post_type=$("input[id^='postType_']").is(':checked') ? 1 : 0;
//var subclass=$("input[id^='subclassification_']").is(':checked') ?  1 : 0;
var title =x("#title").val();
var uri =x("#uri").val();
var subclass=$("input[id^='psubclassiform_']").is(':checked') ? 1 : 0;
var pspec=$("input[id^='pspec_']").is(':checked') ? 1 : 0;        
xget({a: 'check_postL'},function(dat){
if(dat=='OK'){
	if (title ==''){
		x('#title').focus();
		s.notify('error',dic.INSERT_TITLE)
	} else if (x('#filter_city3').val()==0){
		event.preventDefault();
		s.notify('error',dic.YOUR_WORK_LOCATION);
	} else if ($('#summary').val().split(' ').length < 4){
		event.preventDefault();
		s.notify('error',dic.INSERT_SUMMARY);
	} else if ($("input[name='subclassification[]']:checked").length==0){
		x('#pfilter_classification').focus();
		event.preventDefault();
		s.notify('error',dic.SELECT_SUBCLASSIFICATION);
	} else if ($("input[name='pspec[]']:checked").length==0){
		event.preventDefault();
		s.notify('error',dic.SELECT_SPECIFICP2);
	} else if (G.mode !='newnotice' && post_type==0){
		x('input[name^=post_type]')[0].focus();
		event.preventDefault();
		s.notify('error',dic.SELECT_ONE_JOB);
	} else if ((G.mode !='newnotice' && post_type!=0) || (G.mode =='newnotice')){
		event.preventDefault();
		this.disabled=true;
		var newpost=x("#newPostForm").serializeArray();
		var specs={}
		var checkedValues=$('input[id^="pspec_"]:checked').map(function (){
			specs[this.value]=this.getAttribute('sub');
		}).get();
		xpost("/ajax.php",newpost,function(data){
			console.log(data)
			if (data !='NO'){
				ses('n_postid',data);
				api.ma.my('get',my,['user']);
				// s.notify('error',dic.POST_SUCCESSFULLY);
				// $('#activateButton4').show();
				// $('#activateLaterButton').show();
				// $('#submitNewPost').hide();
				ses('index_inactive_open',1)
				xget({a:'insubs',b:specs,c:data},function(dat){
						console.log(dat);					
				})
				if (my.grp==1){ //uri not exist
					location.href='/u/'+G.uname+'/cv/'+x('#ep').val();
				} else {
					location.href='/u/'+G.uname+'/post/'+x('#uri').val();
				}
			}
		});
	}
}else{
	s.notify('error',dic.POST_LIMIT_MES);
}
});
})
.on("click","button[id^='deleteBlocked_']",function(){
var exp=explode('_',this.id),uid=exp[1];
	xget('?a=blockUser&b='+uid+'&c=0');
	x('#blockedLine'+uid).hide();
})
//tradename
.on("click",'#submitBranch',function(){
	var thisval=x('#branch').val();
	xget({a:'branch',b:thisval});
	x('#readBranch').html(thisval).show();	
	toggledit('#editBranch','#readBranch');
})		
.on('click','#submitwebsite',function(){
	var thisval=x('#website').val();
	xget({a:'website',b:thisval})	
	x('#readwebsite').html(thisval).show();
	toggledit('#editwebsite','#readwebsite');		
})
.on("click","#submitOfficial",function(){
	var thisval=$('#editOfficial1').val();
	s.confirm(dic.CHANGE_OFFICIAL_NAME+' <b>'+thisval+'</b> '+dic.SURE,function(res){
		if (res){
			xget({a:"official",b:thisval},function(data){
			if (data=='OK'){				
				x('#readOfficial').html(thisval);				
				opener('editOfficial');
			}else{
				s.notify('error',dic.OFFICIAL_NAME_EXISTS);		
			}
		});
		}								
	});
	return false;
})
//official
.on('click','#submitTrade',function(e){
	e.stopImmediatePropagation()
var thisval=$('#editTrade1').val();
var name= my.grp==1 ? dic.CHANGE_FULLNAME : dic.CHANGE_TRADE_NAME;
if(thisval.trim()!=''){
xget({a: 'trade',b: thisval},function(data){
if (data=='OK'){
	s.confirm(name+' '+thisval+' '+dic.SURE,function(res){
			if(res){
				x('#readtradename').html(thisval);
				api.ma.my('get',my,['user']);					
				opener('editTrade');
			}		
	});
} else {
	s.notify('error',dic.USERNAME_EXISTS);
}
});
}else{
s.notify('error',dic.INSERT_TRADE)
}
return false;
})
.on("click",".but63",function(){
$('#pro1').css('height','auto !important');
})
.on("click",".but64,.but74",function(){
var th=$(this);
//var ml= this.className.replace('pro1','');
// var newml= ml=='More' ? 'Less':'More';
var newml= this.className=='but64' ? 'but74':'but64';
if(this.className=='but64'){
$('#pro1').height('auto');
th.attr('class',newml).text(dic.LESS)
}else{
$('#pro1').height('197px');
th.attr('class',newml).text(dic.MORE)
}
})
//check one
.on("click","input[id^='unsuitable']",function(){
var id=this.id.replace('unsuitable','');
var value= this.checked ?  1 : 0;
xget('?a=unsuitable&b='+value+'&c='+id);
})
.on('click','#myonoffswitch',function(){
var value= this.checked ?  1 : 0;
if(value==1){
	$('#linkNetworkBox').show()
}else{
	$('#linkNetworkBox').hide()
}
})
 //right bar switch width
.on("click",'#switchWidth3',function(){
	 if (this.className =='switchWidth3'){
		 $('#pro3a').css('display','none');
		 $('#pro3b').addClass('baraPrLarge').removeClass('baraPrSmall');
		 this.className='switchWidth3b';
	 } else {
		 $('#pro3a').css('display','block');
		 $('#pro3b').addClass('baraPrSmall').removeClass('baraPrLarge');
		 this.className='switchWidth3';
	 }
 })
 //left bar switch width
.on("click",'#switchWidth4',function(){
	 if (this.className =='switchWidth4'){
		 $('#pro3b').css('display','none')
		 $('#pro3a').attr('class','baraPrLeftLarge');
		 this.className='switchWidth4b';
		 s.coo('baraPrLeft','baraPrLeftLarge');
	 } else {
		 $('#pro3b').css('display','block')
		 $('#pro3a').attr('class','baraPrLeftSmall');
		 this.className='switchWidth4';
		 s.coo('baraPrLeft','baraPrLeftSmall');
	 }
})
 /*	
//.btnBoxBlueCloseCont3
 $(document).on("click",'.btnBoxBlueCloseCont3',function(){
	 var height= Math.round($('#profile3d').height());
	 var pro1old=394;
	 if(height=='168'){
		 $('#profile3d').height('auto');
		 var new_height= $('#profile3d').height();
		 $('#profile4').height(new_height);
		 var pro1=  parseInt(pro1old)+(new_height - height);
		 $('#pro1').height(pro1);
	 }else{
		 $('#profile3d,#profile4').height(168);
		 $('#pro1').height(pro1old);
	 }
 })
}
*/
.on("click","#newads",function(){
xget({a:this.id},function(data){
location.href='/u/'+my.name+'/ads?aid='+data;
})
})
.on("click","#adact",function(){
console.log({a:this.id,b:G['aid']})
xget({a:this.id,b:G['aid']},function(data){
if(data=='OK'){
	location.reload()
}else{
	s.notify('error',dic.COMPLETE_ALL_FIELDS_ADVERTISEMENT)
}
})
})
.on("click", "a[id^='offeract']",function(){	
	var thisid=this.id;
	var id=thisid.replace('offeract','');	
if(my.offerL >=my.offer_all){
	s.modal(dic.OFFER_LIMIT + ' <a style="color:red" href="/u/' + my.name + '/services?page=10">SERVICE_10</a>');
}else{	
xget({a:'offeract',b:id,c:(thisid=="offeract"?"":"reactivate")},function(data){
if(data!='NO'){
	location.reload()
}else{
	s.confirm(dic.CANNOT_ACTIVATE_BUY_NEW_PROPERTY_AD,function(res){
		if(res){
			location.href='/u/'+my.name+'/services?page=10';
		}
	})	
}
})
}
})
.on("click", "a[id^='propact']",function(){	
console.log("event^offeract")
	var thisid=this.id;
	var id=thisid.replace('propact','');				
xget({a:'propact',b:id,c:(thisid=="propact"?"":"reactivate")},function(data){
if(data=='OK'){
	location.reload()
}else{
	console.log(data)
	s.confirm(dic.CANNOT_ACTIVATE_B2BB2C_AD_BUY_NEW_PROPERTY_AD,function(res){
		if(res){
			var type= data=="1" ? '12':'14';
			location.href='/u/'+my.name+'/services?page='+type;
		}
	})
}
})
})
.on("click", "#loanappact",function(){	
	var thisid=this.id,
	id=thisid.replace('loanappact',''),				
	call={a:'loanappact',b:G.id,c:(thisid=="loanappact"?"":"reactivateloanapp")};
	$.get('/ajax.php',call,function(data){
		if(data=='OK'){location.reload();}
	})
})	
	
.on("click","#activateButton,#activateButton2,#publication_date_submit,#activation_submit,#offeract,#propact,#loanact",function(){	
if(G.mode=='offer' && $("input[name='offerformprod']:checked").val()=='3'){
		$("div[col='coupontype']").removeAttr('class');
		$("div[col='freequotes']").removeAttr('class');	
	//arr.splice(arr.indexOf('freequotes'), 1);arr.splice(arr.indexOf('coupontype'), 1);
	}
let thisid=this.id, required_count=$('input,textarea,select').filter('[required]:visible').length+$('.required').length;
console.log(required_count);
 
if(thisid=='activateButton' || thisid=='activateButton2'){	
 activate(G.id);
}else if(thisid=='publication_date_submit' || thisid=='activation_submit'){	
if(required_count==0){
	var val=x('#publication_date').val(),
	case1= parseInt(my.mship.active_ads_limit) > my.active_posts,
	case2= parseInt(my.mship.pending_ads_limit) > my.pending_activation;
	if(case1 && case2){	
	var timediff = time() - strtotime(date('Y-m-d')),	
	datetint=date('d-m-Y', strtotime(val) + timediff);	
	var tint=thisid=='activation_submit' ? dic.NO_OTHER_CHANGE_SURE+" ":dic.PUBLICATION_DATE_SET+" "+datetint+"."+dic.NO_OTHER_CHANGE_SURE+" ";
	console.log({a:thisid,b:val,c:G.id})
		s.confirm(tint,function(res){
			if (res){				
				$.get('/ajax.php',{a:thisid,b:val,c:G.id},function(data){
					console.log(data)
					if (data =='OK'){		
					 api.ma.my('get',my,['user'],d=>{
						 location.reload();
					 });
					}else{
				s.modal(dic.MISTAKE);
				}
				})
			}
		})
	
	}else{
		var hint=!case1 && !case2
			? my.mship.active_ads_limit+" "+dic.ACTIVE_ADS_ERROR+" "+my.mship.pending_ads_limit+" "+dic.PENDING_ADS_ERROR
			: (!case1 ? my.mship.active_ads_limit+" "+dic.ACTIVE_ADS_ERROR
				:(!case2 ? my.mship.pending_ads_limit+" "+dic.PENDING_ADS_ERROR:"")
			)
		if(hint!=""){
			s.modal(hint);
		}
	}
	}else{
		required_check();
	}
}else{
if(required_count==0){
	$.get('/ajax.php',{a:this.id,b:G.id,c:this.mode},function(data){
	if(data=='OK'){
		 api.ma.my('get',my,['user'],d=>{location.reload();});
	}else if(data=='BUY'){
			s.confirm(dic.CANNOT_ACTIVATE_B2BB2C_AD_BUY_NEW_PROPERTY_AD,function(res){
			if(res){location.href='/u/'+my.name+'/services?page=18';}
			})
	}else{
		s.modal(dic.MISTAKE);
	}				
	})
}else{
	required_check();
}
}
})	
.on("click","a[id^='offerdel']",function(){		
var id=this.id.replace('offerdel','');	
xget({a:'offerdel',b:parseInt(id)},function(data){
	console.log({a:'offerdel',b:id})
if(data=='OK'){			
	location.reload();
}
})
})
.on("click","a[id^='propdel']",function(){		
var id=this.id.replace('propdel','');	
xget({a:'propdel',b:parseInt(id)},function(data){		
if(data=='OK'){			
	location.reload()
}
})
})
.on("click","a[id^='propdeact']",function(){		
var id=this.id.replace('propdeact','');	
xget({a:'propdeact',b:parseInt(id)},function(data){		
if(data=='OK'){			
	location.reload()
}
})
})
.on("keyup change","#adname,#adlink",function(){
var id= this.id;
xget({a:this.id,b:this.value,c:G.oid})
})
.on("click","#propvideourlok",function(){		
	var id="propvideourl";			
	var val=$('#'+id).val()
	var url=val.split("/");			
	if(url[2]=="www.youtube.com"){
		var val= "https://www.youtube.com/embed/"+url[3].split("=")[1].split("&")[0];				
	}else if(url[2]=="vimeo.com"){
		var val= "https://player.vimeo.com/video/"+url[3];				
	}else{
		s.notify('error',dic.VIDEO_URL_NOT_CORRECT);
		var val=0;
	}
	if(val!=0){
		$('.readvideourl').html('<iframe width="408" height="230" src="'+val+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
		xget({a:id,b:val,c:G.id})	
		$('#readvideourl').html(val);		 
	}
})	
.on("keyup change","#adstart",function(){
var id= this.id;
xget({a:this.id,b:this.value,c:G.aid},function(data){
		console.log(data)
		$('#adend').text(data);
})
})	
//ATTACHMENTS OPEN EDITOR TITLE
.on("click","span[id^='buttonAttachTitle_']",function(){
var exp=explode('_',this.id);
var title= $('#attachTitle'+exp[1]).text()
x('#attachID').val(exp[1]);
opener('editAttachTitle');
x('#attachEdit').val(title);
})
.on("keyup","input[id^='attachEdit']",function(){
var id=this.id.replace('attachEdit','');
api.ma.set('obj SET title=? WHERE id=?',[this.value,id],t=>console.log(t));
api.ma.my("get",my,["photos"]);
})
//DELETE PHOTO
.on("click","button[id^='deletePhoto_']",function(){
var exp=explode('_',this.id);
var photoid=exp[1];	
api.ma.del('FROM obj WHERE id=?',[id],t=>console.log(t));
xget('?a=delPhoto&b='+photoid);	
api.ma.my('get',my,['photos']);
x('#pbox'+photoid).hide();
})
//DELETE ATTACHMENT
.on("click","button[id^='deleteAttach_'],button[id^='deleteContract1_']",function(){
	var exp=explode('_',this.id);
	var id=exp[1];
	$.get('/ajax.php',{a:'delAttach',b:id},d=>{
		console.log({a:'delAttach',b:id})
		console.log(d)
		if(d=='OK'){
			api.ma.my('get',my,['photos']);
		if(this.id=='deleteAttach_'+id){
		x('.attachContract').remove();
		x('#attach_'+id).remove();
		}else if (this.id=='deleteContract_'+id){
		x('.attachContract').show();
		x('#attach6').show();
		x('#attachContractDiv').html('<span>Nothing Here</span>');
		}else if (this.id=='deleteContract1_'+id){
		x('#attach8').show();
		x('#attachContractDiv1').html('<span>Nothing Here</span>');
		}
		}		
	});		
})
//DELETE contract
.on("click","a[id^='deleteContract_']",function(){
var exp=explode('_',this.id);
var cvid=exp[2];
var certid=exp[1];
console.log(cvid)
xget({a:'delContract',b:certid,c:cvid},function(data){
if(data=='OK'){
$('.attachContract').show();
$('#attach6').show();
$('#attachContractDiv').html('<span>Nothing Here</span>');
}else{
s.notify("error","Error Deleting")
}
})	
})
//READ MORE
.on('click','.morePr',function(){
if ($('.settingBoxBlueRBodyPr').css('max-height')=='1000px'){
$('.settingBoxBlueRBodyPr').css('maxHeight','103px')
$('.morePr').text(dic.MORE+'>>')
}else{
$('.settingBoxBlueRBodyPr').css('maxHeight','1000px')
$('.morePr').text('<<'+dic.LESS)
}
})
//switch of privacy settings
.on("click","#p_fullname",function(){
var cl= this.className.replace('vis','');
var newcl= cl==0 ? 2 : parseInt(cl)-1;
this.className='vis'+newcl;
xget({a:'fullnameP',c:newcl},function(data){
	if(my.grp==1){
		if(newcl==0){x('#aliasBox').show();}else{x('#aliasBox').hide();}
		x('#readContactName').text(data);
		x('#readtradename').text(data);
	}
});
})
.on('click','#p_sex,#p_age,#p_marital,#p_afm,#p_official,#p_addresszip',function(){
var exp=explode('_',this.id);
var privacyTo=this.className =='visibilityBox' ? 0 : 1;
	if (this.className=='visibilityBoxLock'){
	this.className='visibilityBox';
	}else{
	this.className='visibilityBoxLock';
	}
var a= this.id =='p_fullname' ? 'privacy_fullname' : 'privacy';
	console.log({a:a,b:exp[1],c:privacyTo})
xget({a:a,b:exp[1],c:privacyTo},function(data){
if(a=='privacy_fullname' && my.grp==1){
	$('#readContactName').text(data);
	$('#readtradename').text(data);
}
});
})
//privacy location
//switch of privacy settings
.on('click','#p_location1,#p_location2',function(){
//values are : 0 city-privacy closed - 1: only province open - 2- only city open - 3: city-privacy open
	var curVal=$('#locationP').val();
	var privacyTo= this.id=='p_location1'
		? (this.className=='visibilityBoxLock' ? (curVal==0 ? 1 : 3) : (curVal==3 ? 2 : 0))
		: (this.className=='visibilityBoxLock' ? (curVal==0 ? 2 : 3) : (curVal==3 ? 1 : 0));
	console.log('from:'+curVal+'-to:'+privacyTo)
	$('#locationP').val(privacyTo);
	if (this.className=='visibilityBoxLock'){
		this.className='visibilityBox';
	}else{
		this.className='visibilityBoxLock';
	}
	xget('?a=locationP&b='+privacyTo);
})
//privacy photos
.on("click","li[id^='pphoto_']",function(){
var exp=explode('_',this.id);
var id=exp[1];
var privacySet=exp[2]==1 ? 0 : 1;
var divid='pphoto_'+id+'_'+privacySet;
this.id=divid;
if (x('#'+divid).attr('class')=='visibilityBoxLock'){
x('#'+divid).attr('class','visibilityBox');
}else{
x('#'+divid).attr('class','visibilityBoxLock');
}
xget('?a=privacyPhoto&b='+id+'&c='+privacySet,d=>{
if(d=="OK"){api.ma.my('get',my,['photos']);}
});
})
.on("click","button[id^='delses']",function(){
var sp= this.id.replace('delses','');
api.mo.fup("sessions",{uid:  parseInt(s.coo('sid'))},{$pull:{sessions:sp}},d=>{console.log(res);$('#list'+sp).hide();})
})
.on("click","#potentialButton",function(data){
p=[];
xget({a: 'potential_access',b: G.id},function(data){
	console.log(data)
	if (data=='OK'){
		if(my.suspended){
			location.href='/home';
		}else{
			s.coo('potential_unblocked2',1)
			location.href='/potential?id='+G.id;
		}
	} else {
		p[1]='SW',p[2]='Work Location Preference',p[3]='BS',p[4]='Visibility to public',p[5]='Status to activate';
		var arr= data.split(''),noaccess='';
		for(i in arr){noaccess +='<li>'+p[arr[i]]+'</li>';}
		s.notify('warn',dic.PLEASE_CHANGE+ " <ol>"+noaccess+"</ol> " +dic.OBTAIN_ACCESS_THIS_PAGE+ " ");
	}
});
})
//EXPERIENCE
.on("change","select[id^='expid_']",function (){
var exp=explode('_',this.id);
xget('?a=exp_id&b='+exp[1]+'&c='+this.value);
//getExperiences(this.value,'#readExpId_'+exp[1])
var exp_id_alias=$("#expid_"+exp[1]+" option:selected").text();
$('#readExpId_2877').text(exp_id_alias);
})
.on("change","#new_exp_fromyear",function (){
var tyear='';
var yearslist= array_combine(range(parseInt(this.value),date("Y")),range(parseInt(this.value),date("Y")));
yearslist[1]=dic.CURRENTLY_WORKING;
for(var i in yearslist){
	tyear +='<option value="'+i+'">'+yearslist[i]+'</option>';
}
$('#new_exp_toyear').html(tyear)
})
.on("change","#new_exp_id",function (){
if(this.value!=0){$('#newExpSubmit').show()}else{$('#newExpSubmit').hide()}
})
.on("change","select[id^='expSize_']",function (){
var exp=explode('_',this.id);
xget('?a=expsize&b='+exp[1]+'&c='+this.value);
$('#readExpSize_'+exp[1]).text(G.companysize[this.value]);
})
.on("change","select[id^='fromyear_']",function (){
var exp=explode('_',this.id);
xget('?a=fromyear&b='+exp[1]+'&c='+this.value);
x('#readFromYear_'+exp[1]).text(this.value);
var tyear='',tyselected='';
var yearslist= array_combine(range(parseInt(this.value),date("Y")),range(parseInt(this.value),date("Y")));
yearslist[1]=dic.CURRENTLY_WORKING;
for(var i in yearslist){
	tyselected= $('#toyear_'+exp[1]).val()==i ? 'selected="selected"':'';
	tyear +='<option value="'+i+'" '+tyselected+'>'+yearslist[i]+'</option>';
}
$('#toyear_'+exp[1]).html(tyear)
})
.on("change","select[id^='toyear_']",function (){
var exp=explode('_',this.id);
xget('?a=toyear&b='+exp[1]+'&c='+this.value);
x('#readToYear_'+exp[1]).text(this.value);
})
.on("keyup","input[id^='expTitle_']",function (){
var exp=explode('_',this.id);
xget('?a=exp_title&b='+exp[1]+'&c='+this.value);
x('#readExpTitle_'+exp[1]).text(this.value);
})
.on("keyup","input[id^='expPosition_']",function (){
var exp=explode('_',this.id);
xget('?a=exp_position&b='+exp[1]+'&c='+this.value);
$('#readExpPosition_'+exp[1]).text(this.value);
})
//edit experience id
.on("click","button[id^='buttonExpId_']",function(event){
var exp=explode('_',this.id);
toggle_edit('readExpId_'+exp[1],'editExpId_'+exp[1])
})
//edit experience Position
.on("click","button[id^='buttonExpPosition_']",function(event){
var exp=explode('_',this.id);
toggle_edit('readExpPosition_'+exp[1],'editExpPosition_'+exp[1])
})
//edit experience title
.on("click","button[id^='buttonExpTitle_']",function(event){
var exp=explode('_',this.id);
toggle_edit('readExpTitle_'+exp[1],'editExpTitle_'+exp[1])
})
.on("click","input[name=offerformprod],#s_sprod",function(){
var val= this.value;
if(val==1){
	$('#pcatbox').css('display','block');
	$('#offershopbox').show();
}else{
	$('#pcatbox').css('display','none');
	$('#offershopbox').hide();
}
if(val==1 || val==2){
	x('#orangebox').hide();
	x('#pinkbox').show();
	x('#titleheadline').text(dic.TYPE_MAIN_HEADLINE);
}else if(val==3){
	x('#orangebox').show();
	x('#pinkbox').hide();
	x('#titleheadline').text(dic.TYPE_MAIN_HEADLINE);
}else{
	x('#titleheadline').text(dic.TYPE_MAIN_HEADLINE2);
	x('#orangebox').hide();
	x('#pinkbox').show();
}
if(val==5 || val==6){x('#platformbox').show();}else{x('#platformbox').hide();}
if(val==6){x('#extrabox').show();}else{x('#extrabox').hide();}
if(val==4){x('#titleheadline').text(dic.TYPE_MAIN_HEADLINE2);x('#bluebox').show()}else{x('#titleheadline').text(dic.TYPE_MAIN_HEADLINE);x('#bluebox').hide()}
if(val!=0){
//xget('?a=offerprod&b='+id+'&c='+val);
	x('#editFormStatusRead2').text(G.offerprod[val]);
	x('#prodBox').removeClass('required');
}
})
//delete experience
.on("click","button[id^='deleteExperience_']",function (){
var exp=explode('_',this.id);
xget('?a=delExp&b='+exp[1]);
x('#expBox_'+exp[1]).hide()
})
//checkbox bottom panel
.on("click",'#buttonBottomPanel',function (){
console.log($('.editBottomPanel').css('display'))
if($('.editBottomPanel').css('display')=='none'){
$("div[class*='editBottomPanel']").each(function(){this.style.display='block' });
$("span[class*='readBottomPanel']").each(function(){this.style.display='none' });
}else{
$("span[class*='readBottomPanel']").each(function(){this.style.display='block'; });
$("div[class*='editBottomPanel']").each(function(){this.style.display='none'; });
}
})
//delete desired experience

.on("click","input[name^='cvformcv_size.val']",function(){	
if($(this).is(':checked')){
		var cv_max_prov=parseInt($('#cv_max_prov').text())-1;			
	}else{
	var cv_max_prov=parseInt($('#cv_max_prov').text())+1;
	}		
	$('#cv_max_prov').text(cv_max_prov);
})
.on("click","input[name^='cvformcv_desired.val']",function(){	
	if($(this).is(':checked')){
		var newval=parseInt($('#countIndustryExp').text())+1;	
		var cv_max_prov=parseInt($('#cv_max_prov').text())-1;	
		
	}else{
	var newval=parseInt($('#countIndustryExp').text())-1;
	var cv_max_prov=parseInt($('#cv_max_prov').text())+1;
	}		
	$('#countIndustryExp').text(newval);
	$('#cv_max_prov').text(cv_max_prov);
})
.on("click","button[id^='ddelExperience_']",function(event){
var exp=explode('_',this.id);
xget('?a=delete_dexperience&b='+exp[1]+'&c='+G.id);
x('#dExperience_'+exp[1]).hide();
//counter included in industry categories
var countIndustryExp=parseInt($('#countIndustryExp').text())-1;
x('#countIndustryExp').text(countIndustryExp);
xget('?a=company_buscat&b='+G.id,function(data){
$('#countIndustries').text(data);
});
// potentialCompanies();
})
.on("click","#editButSpecialities",function(){
toggledit('#textRelevant','#cvExperienceRelevant');
toggledit('#readSpecific','#editSpecific');
toggledit('#readSkills','#editSkills');
toggledit('#textWork','#cvExperienceEdit');
toggledit('#classYearsRead','#classYearsEdit');
})
.on("click","#editButtonSubclassif",function(){
opener2('helpSpecificJobP');
opener2('pf_specific');
if ($('#editFormSubclassif').css('display') =='block'){
	var newclass=$("#pfilter_classification option:selected").text();
	var newclassval=$("#pfilter_classification").val();
	var speclist= $("div[id^='pspecific_']").map(function(){
		return this.textContent;
	}).get();
	x('#classification_value').val(newclassval);
	x("#pclassification_choice").text(newclass);
	if(speclist.length==0){ $('#pclassificationLabel').show(); }
	if(speclist.length==0){ $('#psubclassification_list').show();}
	x('#psubclassif_0').remove();
} else {
	$('#pclassificationLabel').hide();
	$('#psubclassification_list').hide();
}
//       opener2('editFormSubclassif');
$.each($("button[id^='deleteSubclassif']"),function(){
	opener2(this.id);
});
run_subclassif_forms();
})
.on("change",'#expiration',function(){
var pd= this.value;
  xget({a: 'expiration',b: pd,c: G.id},function(data){
	  console.log(data)
  })
})
.on('click','#closeEdit',function (){
if(x('#checkbox1').css('display')=='none'){
$("label[id^='checkbox']").each(function(){this.style.display='block'; });	
}else{
$("label[id^='checkbox']").each(function(){this.style.display='none'; });	
}
if(G.mobile){
if(ses('p_index_open')!='1'){
//opener2('inactiveBox')
opener2('closedBox')
}
}
opener2('indexButtonsActive')
opener2('indexButtonsInactive')
})
//POST TITLE /URI
.on('click',"button[id^='submitPostTitle_']",function(){
var postid=this.id.replace('submitPostTitle_','');
var postTitle=$('#editPostTitle_'+postid).val();	
xget('?a=postTitle&b='+postid+'&c='+postTitle);
s.notify('warn',dic.POST_TITLE_SAVED);
$('#titleBox').removeClass('required');
if (my.grp==2){
$('#ptitle').text(postTitle)
}else{
$('#readCVTitle').text(postTitle)
}
$('#leditPostTitle_'+postid).text(postTitle)
toggle_edit('editCVTitle','readCVTitle')
})
//privacy promo
.on("click","#promoP",function(){
var value= this.checked ?  1 : 0;
xget('?a=promoP&b='+value);
api.ma.my('get',my,['user'])
})
.on("click","a[id^='activatepost']",function(){
	var id= this.id.replace('activatepost','');
	activate(id);
})
//PROFILE IMAGE
.on('click',"#imageInput",function (){
var profileFile=this.value.split('\\').pop();
var uval=profileFile.split('/\/');
$("#profileFileLabel").css('display','block').text(profileFile);
$('#submit-btn').css('display','block')
})
.on('submit','#profilePhotoForm',function(){
	var profileOptions={
target: '#my_profile_photo',
//beforeSubmit: { validate('#imageInput');},
success: function(responseText,statusText,xhr){
	$('#editProfileTotalCon').hide();
	console.log(responseText)
	console.log(statusText)
	console.log(xhr)
},
resetForm: true
};
$('#editProfileTotalCon').hide();
$(".profile_photo2").attr("src","/img/loadingPh.gif");
$(this).ajaxSubmit(profileOptions);
//$("#profileFileLabel,#submit-btn").css('display','none');
return false;
})
//BG IMAGE PROFILE
.on('change',"#imageBGInput",function (){
var profileFile=this.value.split('\\').pop();
$("#bgFileLabel").css('display','block').text(profileFile);
$('#submitBGbtn').css('display','block');
})
.on('submit','#bgphotoForm',function(){
	var bgOptions={
target: '#my_bg_photo',
//	beforeSubmit: {validate('#imageBGInput');},
success: function(responseText,statusText,xhr){
	$('#editBgTotalCon').hide();
	console.log(responseText)
	console.log(statusText)
	console.log(xhr)
},
resetForm: true
};
$('#editBgTotalCon').hide();
$(".bg_photo").attr("src","/img/loadingPh2.gif");
$(this).ajaxSubmit(bgOptions);
$("#bgFileLabel,#submitBGbtn").css('display','none');
return false;
})
//add experience
.on("click","#newExpSubmit",function(event){
//event.preventDefault();
$.post("/ajax.php",$("#new_experience").serialize(),d=>{console.log(d)});
var exp_id=x('#new_exp_id').val();
var exp_id_alias=$("#new_exp_id option:selected").text();
var exp_title=x('#new_exp_title').val();
var exp_position=x('#new_exp_position').val();
var exp_size=x('#new_exp_size').val();
var exp_fromyear=x('#new_exp_fromyear').val();
var exp_toyear=x('#new_exp_toyear').val();
var ysize='',sselected='';
for (var i in G.companysize){
sselected= exp_size==i ? 'selected="selected"':'';
ysize +='<option value="'+i+'" '+sselected+'>'+G.companysize[i]+'</option>';
}
//list from year
var fyear='',fyselected='';
var yearslist= array_combine(range(1960,date("Y")),range(1960,date("Y")));
for(var i in yearslist){
	fyselected= exp_fromyear==i ? 'selected="selected"':'';
	fyear +='<option value="'+i+'" '+fyselected+'>'+yearslist[i]+'</option>';
}
//list to year
var tyear='',tyselected='';
yearslist[1]=dic.CURRENTLY_WORKING;
	for(var i in yearslist){
	tyselected= exp_toyear==i ? 'selected="selected"':'';
	tyear +='<option value="'+i+'" '+tyselected+'>'+yearslist[i]+'</option>';
}
	$('<div id="expBox_'+exp_id+'" class="experience_bg"><div class="experienceSeparator">' +		
		'<span class="insertExperience4" id="editExpId_'+exp_id+'"></span>' +
        '<div><span class="experienceTitle1">'+dic.COMPANY_SIZE+'</span>' +				
		'<span id="editExpSize_'+exp_id+'"><div class="insertExperience3"><select id="expSize_'+exp_id+'">'+ysize+'</select></div></span></div></div>' +
		'<div class="experienceSeparator3"><span id="editExpTitle_'+exp_id+'">' +
		'<input class="insertExperience2b" id="expTitle_'+exp_id+'" value="'+exp_title+'" type="text"></span>' +
        '<div><span class="experienceTitle1">'+dic.POSITION_EXPERIENCE+'</span>'+        
        '<span id="editExpPosition_'+exp_id+'">' +
		'<input class="insertExperience2b" id="expPosition_'+exp_id+'" value="'+exp_position+'" type="text"></span>' +
		'</div></div>' +
		'<div class="experienceSeparatorLast3"><div class="experienceSeparatorLast">'+                        
            '<span id="editFromYear_'+exp_id+'"><div class="insertYears">'+
            '<select id="fromyear_'+exp_id+'">'+fyear+'</select>'+
			'</div></span></div>'+
            '<div class="experienceSeparatorLast2"><span id="editToYear_'+exp_id+'">'+
            '<div class="insertYears"><select id="toyear_'+exp_id+'">'+tyear+'</select></div></span></div></div>'+
		'<button id="deleteExperience_'+exp_id+'" class="submitExperience2">'+dic.DELETE+'</button></div>').hide().appendTo('#experienceBox').show();

experience_selected_form2('editExpId_'+exp_id,exp_id);opener('addExperiencePanel');
x('#new_exp_id').val(0);x('#new_exp_title').val('');x('#new_exp_position').val('');x('#new_exp_size').val(0);x('#new_exp_fromyear').val(0);x('#new_exp_toyear').val(0);
})
//add desired experience
.on("click","input[id^='dnewExpId_']",function(event){
	var value=this.checked ? 1 : 0;
var cv_max_prov= parseInt($('#cv_max_prov').text());
if(cv_max_prov <= 0 && value==1){
	this.checked=false;
	s.notify('warn',dic.REACHED_TOTAL_LIMIT_BUSINESS_CATEGORY)
}else{
	xget('?a=company_buscat&b='+G.id,function(data){
	x('#countIndustries').text(data);
	});
	var exp=explode('_',this.id);
	var exp_id=exp[1];
	xget({a: 'ins_del_dexperience',b: exp_id,c: G.id,d: value},function(data){
		console.log(data)
		if (data =='OK'){
			if (value==1){
				var exp_alias=$('#dnewExpIdVal_'+exp_id).text();
				//counter included in industry categories
				$('#dexperienceView').append('<div id="dExperience_'+exp_id+'" class="addSelectionBox">'+exp_alias+'<button id="ddelExperience_'+exp_id+'" class="but135"></button></div>');
			} else {
				$('#dExperience_'+exp_id).hide();
			}
			var newcounter=parseInt($('#countIndustryExp').text())+(value==1 ? 1 : -1);
			$('#countIndustryExp').text(newcounter);
			$('#cv_max_prov').text(parseInt($('#cv_max_prov').text()) - (value==1 ? 1 : -1))
			xget('?a=company_buscat&b='+G.id,function(data){
$('#countIndustries').text(data);
});
		} else {
			s.notify('warn',dic.INDUSTRY_EXP_EXISTS);
		}
	})
}
})		
//CLOSE
.on("click","#closeButtona,#closeButtonb",function(){
var thisid=this.id;
var checkedValues= thisid=='closeButtona' ? JSON.parse(ses('p_index_active')) : JSON.parse(ses('p_index_inactive'));
var values= thisid=='closeButtona' ? ses('p_index_active') : ses('p_index_inactive');	//closeButtonb on the second case
xget({ a : 'postToClosed',b : values},function (data){
var ctext=dic.YOU_HAVE+' <b>'+data.length+'</b> '+dic.PENDING_EOIS_WITH+'<br/>';
for(i in data){
if (my.grp==2){
ctext +='<b>'+data[i].cv_title+'</b> at #'+data[i].code+': <b>'+data[i].post_title+'</b><br/> ';
}else{
ctext +='<b>'+data[i].cv_title+'</b><br/> ';
}
}
if(data!='NO'){
s.confirm({
message: ctext+'<i>'+dic.POSTS_PERMANENTLY+'</i> <b>'+dic.CLOSED+'</b>. '+dic.SURE,
callback: function(result){
if (result){
xget('?a=postClosed&b='+values,{},function(data){
if (data=='OK'){
		api.ma.my('get',my,['user']);
		api.ma.N('get',my,['eoi','cont']);
		$.each(checkedValues,function( index,value ){
		$("li[id^='privacyIndex_"+value+"']").remove();
		$('#print_'+value).remove();
		$('.label'+value).remove();
		if(thisid=='closeButtona'){
		$('#postActive'+value).appendTo('#closedLoop');
		resetPostCounter('closeActive');
		}else{
		$('#postInactive'+value).appendTo('#closedLoop');
		resetPostCounter('closeInactive');
		}
		});
}else{
s.notify('warn',dic.APPLICATION_NOT_ACCOMPLISHED);
}
})
}
}
});
}else{
	$.each(checkedValues,function( index,value ){
	$("li[id^='privacyIndex_"+value+"']").remove();
	$('#print_'+value).remove();
	$('.label'+value).remove();
	if(thisid=='closeButtona'){
	$('#postActive'+value).appendTo('#closedLoop');
	resetPostCounter('closeActive');
	}else{
	$('#postInactive'+value).appendTo('#closedLoop');
	resetPostCounter('closeInactive');
	}
	});
}
},'json')
}) //CLOSE DOCUMENT READY
//CLOSE EACH POST/CV
.on("click","a[id^='closeOnea']",function(){
var postid=this.id.replace('closeOnea','');
//	var newPostCounter=parseInt($('#postCounter').text())-1;
s.confirm(dic.WARNING+' '+(my.grp==2 ? dic.POSTS_PERMANENTLY_CLOSEDER : dic.CV_PERMANENTLY_CLOSED)+' '+dic.SURE,res=>{
		if (res){			
		$.post("/ajax.php",{a:'postOneToClosed',b:parseInt(postid)},function(data){			
			api.ma.my('get',my,['user','affee','certs']);
			api.ma.N('get',my,['eoi','cont']);
			$("li[id^='privacyIndex_"+postid+"']").remove();
			$('#print_'+postid).remove();
			$('.label'+postid).remove();
			if (this.className=='closeDeleteOrange'){
			//$('#postInactive'+postid).('#closedLoop');
			$('#postActive'+postid).hide();
		//	$('#postCounter').text(newPostCounter);
			}else{
			// $('#postActive'+postid).appendTo('#closedLoop');
				$('#postActive'+postid).hide();
		//	$('#postCounter').text(newPostCounter);
			}
		})
		
		}
		})
})
//ALL AD/NOTICE LIST EVENTS 
.on('click','#adNotChoose01',function(){
this.className='adNotChoose01Active';
$('#adNotChoose02').attr('class','adNotChoose02');
$('#adNotChoose03').attr('class','adNotChoose03');
$(".flag2").each(function (){this.style.display='none'});
$(".flag1").each(function (){this.style.display='block';});
return false;
})
.on('click','#adNotChoose02',function(){
this.className='adNotChoose02Active';
$('#adNotChoose01').attr('class','adNotChoose01');
$('#adNotChoose03').attr('class','adNotChoose03');
$(".flag1").each(function (){this.style.display='none'});
$(".flag2").each(function (){this.style.display='block';});
return false;
})
.on('click','#adNotChoose03',function(){
this.className='adNotChoose03Active';
$('#adNotChoose01').attr('class','adNotChoose01');
$('#adNotChoose02').attr('class','adNotChoose02');
$(".flag1").each(function (){this.style.display='block';});
$(".flag2").each(function (){this.style.display='block';});
return false;
})
//ALL SALE/LEASE PROPERTY LIST EVENTS 
.on('click','#adNotChoose01',function(){
this.className='adNotChoose01Active';
$('#adNotChoose02').attr('class','adNotChoose02');
$('#adNotChoose03').attr('class','adNotChoose03');
$(".flag2").each(function (){
this.style.display='none'
});
$(".flag1").each(function (){this.style.display='block';});
return false;
})
.on('click','#adNotChoose02',function(){
this.className='adNotChoose02Active';
$('#adNotChoose01').attr('class','adNotChoose01');
$('#adNotChoose03').attr('class','adNotChoose03');
$(".flag1").each(function (){this.style.display='none'});
$(".flag2").each(function (){this.style.display='block';});
return false;
})
.on('click','#adNotChoose03',function(){
this.className='adNotChoose03Active';
$('#adNotChoose01').attr('class','adNotChoose01');
$('#adNotChoose02').attr('class','adNotChoose02');
$(".flag1").each(function (){this.style.display='block';});
$(".flag2").each(function (){this.style.display='block';});
return false;
})
//select all ACTIVE
.on('click','#selectAllActive',function(event){  //on click
if(this.checked){ // check select status
	$('.activePost').each(function(){ //loop through each checkbox
		this.checked=true;  //select all checkboxes with class "checkbox1"
	});
}else{
	$('.activePost').each(function(){ //loop through each checkbox
		this.checked=false; //deselect all checkboxes with class "checkbox1"
	});
}
var checkedValues=$('input:checkbox:checked.activePost').map(function (){return this.value;}).get();
ses('p_index_active',JSON.stringify(checkedValues))
})
//select all ACTIVE
.on('click','#selectAllInactive',function(event){  //on click
if(this.checked){ // check select status
	$('.inactivePost').each(function(){ //loop through each checkbox
		this.checked=true;  //select all checkboxes with class "checkbox1"
	});
}else{
	$('.inactivePost').each(function(){ //loop through each checkbox
		this.checked=false; //deselect all checkboxes with class "checkbox1"
	});
}
var checkedValues=$('input:checkbox:checked.inactivePost').map(function (){return this.value;}).get();
ses('p_index_inactive',JSON.stringify(checkedValues))
})
//check one
.on("change",".activePost",function(){	if(this.checked){  this.checked=true;}else{ this.checked=false;	}
var checkedValues=$('input:checkbox:checked.activePost').map(function (){return this.value;}).get();
ses('p_index_active',JSON.stringify(checkedValues))
})
.on("change",".inactivePost",function(){
if(this.checked){  this.checked=true;}else{ this.checked=false;}
var checkedValues=$('input:checkbox:checked.inactivePost').map(function (){return this.value;}).get();
ses('p_index_inactive',JSON.stringify(checkedValues))
})
.on('click',"input[id^='submitPostUri_']",function(){
var exp=explode('_',this.id);var postid=exp[1];
var postUri=$('#editPostUri_'+postid).val();
xget('?a=postUri&b='+postid+'&c='+postUri,{},function(data){
if (data=='OK'){
s.confirm(dic.CHANGE_POST_URI+' <b>'+postUri+'</b> '+dic.SURE,function(result){
if (result){location.href='/'+CUR_DIR+'/post?pname='+postUri+'#post';}});
}else{s.notify('warn',dic.POST_URI_EXISTS);}
})
return false;
})
.on('click',"li[id^='p_post']",function(){var pname=this.id.replace('p_post','');location.href='/'+CUR_DIR+'/post?pname='+pname;
return false;
})
//POST PRIVACY
.on("click","#editButtonPrivacy",function(){toggledit('#textPrivacy','#editFormPrivacy');})
.on("click","#editButtonPrivacy2",function(){toggledit('#textPrivacy2','#editFormPrivacy2');})
.on('click',"input[id^='visibility_']",function(){
var hint='';var value= this.checked ?  1 : 0;var valueOpp= this.checked ?  0 : 1;
if (my.grp==1){hint= this.checked ?  dic.YES : dic.NO;}else{hint= this.checked ?  dic.PUBLIC1 : dic.PRIVATE1;}
if(value==1){x('#linkNetworkBox').show()}else{x('#linkNetworkBox').hide()}
var exp=explode('_',this.id);
console.log('?a=visibility&b='+exp[1]+'&c='+value)
xget({a:'visibility',b:exp[1],c:value},function(data){console.log(data)});
if(my.grp==2){
var divid='editButtonPrivacy1';
if ($('#'+divid).attr('class')=='visibilityBoxLock'){
x('#'+divid).attr('class')='visibilityBox';
}else{
x('#'+divid).attr('class')='visibilityBoxLock';
}
x('#textPrivacyValue').html('<strong>'+hint+'</strong>')
}else{
var divid='editButtonPrivacy';
if ($('#'+divid).attr('class')=='visibilityBoxLock'){
$('#'+divid).attr('class','visibilityBox');
}else{
$('#'+divid).attr('class','visibilityBoxLock');
}
$('#textPrivacy').html('<strong>'+hint+'</strong>')
	var obj= new Object();obj.cv=exp[1];savePotential(obj);
}
})
.on('click',"input[id^='privacyEngines_']",function(){
var value= this.checked ?  1 : 0,hint=this.checked ?  dic.PUBLIC1 : dic.PRIVATE1,exp=explode('_',this.id);
xget('?a=visibilityEngines&b='+exp[1]+'&c='+value);
var divid='peditButtonPrivacy2';
if ($('#'+divid).attr('class')=='visibilityBoxLock'){
$('#'+divid).attr('class','visibilityBox');
}else{
$('#'+divid).attr('class','visibilityBoxLock');
}
$('#textPrivacyEngines').html('<strong>'+hint+'</strong>')
})
//job types
.on("click","#editButtonJobType",function(){toggledit('#textJobType','#editFormJobType');})
.on("click","#editButtonLocation",function(){toggledit('#textLocation','#editFormLocation');})
.on("click","#editButtonWork",function(){opener('editFormWork');})
.on("click","#editButtonRemote",function(){opener('editRemote');})
.on("click","#editButtonWorkCV",function(){opener("daddExperienceEdit");
var expdata=G['buscat_'+LANG];var selected,dexTex='';
for(var i in expdata){
//selected= in_array($expid,expdata)  ? 'checked="checked"':'';
dexTex +='<span class="subclassTotal2"><div class="subclassCheck">'+
	'<input type="checkbox" id="dnewExpId_'+expdata[i]+'" name="xexp_id" value="'+expdata[i]+'"></div>'+
	'<span id="dnewExpIdVal_'+expdata[i]+'">'+i+'</span></span>';
}
xget({a:'dexperiences',b:G.id},function(data){
for(var j in data){
x('#dnewExpId_'+data[j]).prop('checked',true);
}
},"json");
x('#daddExperienceEdit').html('<div class="insertExperience5">'+dexTex+'</div>');	
})
.on("click","#editButtonProvedWorkCV",function(){
opener_all("button[id^='addExperienceProved']",'a');
opener_all("button[id^='deleteExperience_']",'a');
if ($('#addExperiencePanel').css('display')!='none'){opener('addExperiencePanel');}
opener_all("button[id^='buttonExpId_']",'a');
opener_all("button[id^='buttonExpTitle_']",'a');
opener_all("button[id^='buttonExpPosition_']",'a')
opener_all("button[id^='buttonExpSize_']",'a');
opener_all("button[id^='buttonFromYear_']",'a');
opener_all("button[id^='buttonToYear_']",'a');
})
.on("click","#editButtonReport",function(){
toggledit('#textReport','#editFormReport');
})
.on('click',"#editButtonSummary",function(){
toggle_edit('textSummary','editFormSummary');
})
.on("click","#editButtonContent",function(){
toggle_edit('textContent','editFormContent');
})
//daysweek hoursweek //FORM καταργείται εκτός απ' το case
.on("keyup change","#daysweek",function(){
	if(this.id=='daysweek' && this.value <= 7)  {
		xget('?a='+this.id+'&b='+G.id+'&c='+this.value);
		x('#'+this.id+'read').text(this.value);
	}else{
		s.notify('warn',dic.VALUE_LOWER_THAN7);
	}
})
//daysweek hoursweek //FORM καταργείται εκτός απ' το case
.on("keyup change","#hoursweek",function(){
		if(this.id=='hoursweek' && this.value <= 168){
			xget('?a='+this.id+'&b='+G.id+'&c='+this.value);
			x('#'+this.id+'read').text(this.value);
		}else{
			s.notify('warn',dic.VALUE_LOWER_THAN168);
		}
})
.on('change','#agerange',function(){
xget('?a=agerange&b='+this.value);
x('#readAge').text(G.age_range[this.value])
})
.on('change','#expires',function(){
xget('?a=expires&b='+postid+'&c='+this.value);
x('#readExpires').text(this.value)
})
//check cv bottom panel
.on('click','#email_alert',function(){
var value=this.checked ?  1 : 0;
var text=this.checked ?  dic.YES : dic.NO;
xget('?a=email_alert&b='+value);
x('#remail_alert').html(text);
})
//b2b and b2bP
.on('click','#b2b,#b2bP',function(){
var value=this.checked ?  1 : 0;
var text=this.checked ?  dic.YES : dic.NO;
xget('?a='+this.id+'&b='+value);
x('#r'+this.id).html(text);
})
//offertypes
.on('click',"input[name=offertype]",function(){
var val= $('input[name=offertype]:checked').val();	
if(val!=0){
xget('?a=offertype&b='+id+'&c='+val);
$('#editFormStatusRead').text(G.offertypes[val]);
$('#typeBox').removeClass('required');
}
})
//coupontypes
.on('click',"input[name=coupontype]",function(){
var val= $('input[name=coupontype]:checked').val();	
if(val!=0){
xget('?a=coupontype&b='+id+'&c='+val);
$('#readcoupontypes').text(G.coupontypes[val]);	
}
})	
//freequot
.on('click',"input[name=freequot]",function(){
var val= $('input[name=freequot]:checked').val();	
if(val!=0){
xget('?a=freequot&b='+id+'&c='+val);
$('#readfreequot').text(G.freequotes[val]);	
}
})	
//extra
.on('click',"input[name=extra]",function(){
var d= this.value; var c= this.checked ?  1 : 0;
if(d!=0){
xget({a:'extra',b:id,c:c,d:d},function(res){
console.log(res);
var checked=$("input[name=extra]:checkbox:checked").map(function(){return this.value;}).get();
console.log(checked)
var html='';
for(var i in checked){html+=G.offerextra[checked[i]]+','}$('#readextra').html(html);	
});	
}	
})
//proptype
/*
.on('click',"input[name=propformtype]",function(){
var val= $('input[name=propformtype]:checked').val();
if(val==1){
$('.auctionDate').css('display','block')
$('#readsaletype').css('display','block');
$('#readsaletime').css('display','block');
}else{
$('.auctionDate').css('display','none');
$('#readsaletype').css('display','none');
$('#readsaletime').css('display','none');
}
if(val!=0){
//xget('?a=proptype&b='+id+'&c='+val);
$('#readtype').text(G.proptype[val]);
$('#typeBox').removeClass('required');
}
})	
*/
//proptype
.on("change","#propformsaletype",function(){
var val=this.value;
if(val==2){
x('#saletimebox').css('display','block');
x('#readsaletime').css('display','block');
}else{
x('#saletimebox').css('display','none');
x('#readsaletime').css('display','none');
}
//xget('?a=saletype&b='+id+'&c='+val+'&d='+G.mode);
$('#readsaletype').html(G.saletype[val])
})
.on("click change focusin","#saletime",function(){
var obj=this;
//var id=this.id.replace('datetimepicker_','');
var val=obj.value.split('-')[2].split(' ')[0];
var d1=obj.value.split(' ')[0].trim();
var selday= d1.split('-')[2];
var selmonth= d1.split('-')[1];
xget('?a=saletime&b='+id+'&c='+datum.getTime()/1000+'&d='+G.mode);
$(obj).datetimepicker({
lang: LANG,
format: 'Y-m-d H:i',
defaultTime : date('H:i'),
defaultDate : date('Y-m-d'),
startDate: date('Y-m-d'),
startTime: date('H:i'),
minDate: 0,
minTime: selday==date('d') && selmonth==date('m') ? date('H:i',time()+600) : false,
opened: false,
validateOnBlur: false,
onSelectDate:function(){},
onChangeMonth:function(){},
onChangeDateTime:function(){
	var datum=new Date(obj.value);
	console.log('?a=saletime&b='+id+'&c='+datum.getTime()/1000)
	
	$('#readsaletime').html(obj.value)
},
onShow:function(){},
onClose:function(){},
onGenerate:function(ct,$i){
	console.log('generate')
	var ind=specificDates.indexOf(ct.dateFormat('d/m/Y'));
	$('.xdsoft_time_variant .xdsoft_time').show();
	if(ind !== -1){
		$('.xdsoft_time_variant .xdsoft_time').each(function(index){
			if(hoursToTakeAway[ind].indexOf(parseInt($(obj).text())) !== -1)              {
				$(obj).hide();
			}
		});
	}
}
})
})
.on("change","#state",function(){		
        s.coo('sm',1);
        s.coo('sm_city',0);
        s.coo('sm_province',0)
        s.coo('sm_state',this.value)
        if(this.value==0) {
            s.coodel('sm_state');
            $('#city').val(0);
            $('#province').val(0);
        }        
		var province=s.coo('sm_province');
		var state=s.coo('sm_state');
		var province_text= '<option value=0>'+dic.PROVINCE+'</option>';
		var selected;
		for(var i in G.provincebyid){
			if(G.provincebyid[i].sid==state) {
				selected = province == i  ? 'selected="selected"' : '';
				province_text += '<option value="' + i + '" ' + selected + '>' + G.provincebyid[i].p + '</option>';
			}
		}
        $('#sm_cityp').html('<select id="province">'+province_text+'</select>');	
    })
	.on("change","#province",function(){
        if(this.value==0){
            s.coodel('sm_province')
            $('#city').val(0);            
        }
		var province=this.value;
		var city=s.coo('sm_city');      
        var selProv=this.value;
        s.coo('sm_province',selProv);        
       
	   $.getJSON(folderprov+province+'.json', function(data) {
        var city_text=city==0 ? '<option value=0>'+dic.CITY+'</option>':'';
        var selectedCity;
        for(var i in data){
            if(data[i].pid==s.coo('sm_province')){
                selectedCity= data[i].id==city ? ' selected="selected" ':'';
                city_text += '<option value="'+data[i].id+'" '+ selectedCity +'>' + i + '</option>';
            }
        }
        $("#city").remove();
        $('#sm_cityp').append('<select id="city">'+city_text+'</select>');
    });	   
    })
	.on("change","#city",function(){		
		$('#sm_addressp').show()
		s.coo('sm_city',this.value);
        //set the s_range_city
        if(this.value==0){
         s.coodel('sm_city');                            
        }else{                  
         s.coo('sm_city',this.value);        
		 $('#go').show();
        }
    })
//offerprod
.on("click","input[name=loanprod]",function(){
	var val= $('input[name=loanprod]:checked').val();
var id= this.name;
var field=this.name.replace('loan','');
var goid=parseInt($('#goid').val());
x('#read'+field).text(G.loanprod[val]);
x('#prodBox').removeClass('required');
xget({a:id,b:val,c:goid})
})

//prod
.on("click","input[name=prod]",function(){
var val= x('input[name=prod]:checked').val();
if(val==1 || val==2){
x('#bluebox').hide();
if(G.mode!='prop'){x('#orangebox').hide();}
x('#pinkbox').show();		
x('#titleheadline').text(dic.TYPE_MAIN_HEADLINE);
}else if(val==3){
x('#bluebox').hide();
x('#orangebox').show();
x('#pinkbox').hide();		
x('#titleheadline').text(dic.TYPE_MAIN_HEADLINE);
}else{
x('#titleheadline').text(dic.TYPE_MAIN_HEADLINE2);
x('#bluebox').show();
x('#orangebox').hide();
x('#pinkbox').show();		
}		
if(val!=0){
xget('?a=proprod&b='+id+'&c='+val);
x('#editFormStatusRead2').text(G.proprod[val]);
var newpropgrp='<option value=0>'+dic.SELECT_PROPGRP+'</option>';
if(val==1){		
for(var i in G.propgrp){
	newpropgrp +='<option value="'+i+'">'+G.propgrp[i]+'</option>';
}		
}else{
for(var i in G.propgrpres){
	newpropgrp +='<option value="'+i+'">'+G.propgrpres[i]+'</option>';
}		
}
x('#propgrp').html(newpropgrp);
x('#prodBox').removeClass('required');
}
})	
//smode
.on("click","input[name=smode]",function(){
var smode={1:dic.ONCAMBUS,2:dic.ONLINE};
//var val= x('input[name=smode]:checked').val();
var checked=x('input[name="smode"]:checkbox:checked');
var val= checked.length==2 ? 3 : (checked.length==0 ? 0 : checked.val()); 	
xget('?a=smode&b='+id+'&c='+val);
$('#readsmode').html(val==3 ? dic.ONCAMBUS+','+dic.ONLINE : smode[val]);
//$('#prodBox').removeClass('required');
})		
//qlevel
.on("click","input[name=qlevel]",function(){
var val= $('input[name=qlevel]:checked').val();	
xget('?a=qlevel&b='+id+'&c='+val);
$('#readqlevel').html(G.post_education_types[val]);
//$('#prodBox').removeClass('required');
})		
//propertystatus
.on("click","input[name=propertystatus]",function(){
var val= $('input[name=propertystatus]:checked').val();	
xget('?a=propertystatus&b='+id+'&c='+val+'&d='+G.mode);
x('#readpropertystatus').html(G.propertystatus[val]);
//x('#prodBox').removeClass('required');
})		
//prop many fields
.on("change click keyup","#propgrp,#established,#beds,#bath,#car,#land,#unit,#price_type",function(){
var val= this.value;	
var a=this.id;	
console.log('?a='+a+'&b='+id+'&c='+val)
xget('?a='+a+'&b='+id+'&c='+val+'&d='+G.mode);	
if(a=='land' || a=='unit'){
console.log(a)
x('#read'+a).html(val);
}else if(a=='propgrp'){
var prod= x('input[name=prod]:checked').val();
	if(prod==1){
		x('#read'+a).html(G.propgrp[val]);
	}else{
		x('#read'+a).html(G.propgrpres[val]);
	}
}else{
x('#read'+a).html(G[a][val]);
}
//x('#prodBox').removeClass('required');
})	
.on("click","#price_privacy",function(){	
var val= this.className=='priceBoxLock' ?  1 : 0;
var cl=this.className;
var newclass=this.className=='priceBoxLock' ?  'priceBox' : 'priceBoxLock';
var a=this.id;
console.log(newclass)
xget('?a='+a+'&b='+G.id+'&c='+val+'&d='+G.mode);
x('#price_privacy').removeClass(cl).addClass(newclass)
})	
.on("click","#address_privacy",function(){	
var val= this.className=='priceBoxLock' ?  1 : 0;
var cl=this.className;
var newclass=this.className=='priceBoxLock' ?  'priceBox' : 'priceBoxLock';
var a=this.id;	
xget({a:a,b:G.id,c:val,d:G.mode},d=>{
console.log(d)
x('#address_privacy').removeClass(cl).addClass(newclass)	
});
})
//sload
.on("click","input[name=sload]",function(){
var sload={1:dic.FULLTIME,2:dic.PARTTIME};
//var val= x('input[name=sload]:checked').val();
var checked=x('input[name="sload"]:checkbox:checked');
var val= checked.length==2 ? 3 : (checked.length==0 ? 0 : checked.val()); 	
xget('?a=sload&b='+id+'&c='+val+'&d='+G.mode);
x('#readsload').html(val==3 ? dic.FULLTIME+','+dic.PARTTIME : sload[val]);
})	
//coupon
.on("click","input[name=coupon]",function(){
var coupon={0:dic.NO,1:dic.YES};
var val= this.checked ?  1 : 0;
xget('?a=coupon&b='+id+'&c='+val+'&d='+G.mode);
x('#readcoupon').html(coupon[val]);
})		
//platform
.on("click","input[name=platform]",function(){
var platform={0:dic.NO,1:dic.YES};
var val= this.checked ?  1 : 0;
xget('?a=platform&b='+id+'&c='+val+'&d='+G.mode);
x('#readplatform').html(platform[val]);
})		
//allocation
.on("click","input[name*=allocation]",function(){
var allocation={0:dic.NO,1:dic.YES};//
var val= this.checked ?  1 : 0;
//	var hint=val==1 ? "All service locations will be deleted. Are you sure?"
//: "Service location will be activated,are you sure?";
//s.confirm(hint,function(res){
	//if(res){
//	xget({a:'allocation',b:id,c:val,d:G.mode},function(data){
	//	if(data=='OK'){	
		if(val==1){
		x('#readallocation').html(allocation[val]);
		x('#servicelocationBox').hide();
		}else{
		x('#servicelocationBox').show();
		$('#editButtonPostLocation2').click();
		x('#readallocation').html(allocation[val]);
		}
	//	}
//	});						
	//}
//})		
})	
//showmap
.on("click","#propformshowmap",function(){	
var val= this.checked ?  1 : 0;
//x('#prodBox').removeClass('required');
//	x('#readcoupon').html(coupon[val]);
if(val==1){
x('#my-map').show();
}else{
x('#my-map').hide();
}
})	
//many course
.on("keyup click","textarea[name=course_duration],input[name=course_start],input[name=course_price],input[name=course_accred],input[name=company_name],input[name=coupon_number],textarea[name=special_expire],input[name=sfee],input[name=sfee_desc],textarea[name=special_desc]",function(){
var name=this.name;
var val= this.value.trim();
if(val!=""){
xget('?a='+name+'&b='+id+'&c='+val+'&d='+G.mode);
x('#read'+name).html(val);
//x('#prodBox').removeClass('required');
}
})
//many property
.on("keyup click","input[name=agent],input[name=agentmob],input[name=agentmail],input[name=agent2],input[name=agent2mob],input[name=agent2mail],input[name=inspection],input[name=address]",function(){
var name=this.name;
var val= this.value.trim();
if(val!=""){
$.get('/ajax.php',{a:name,b:G.id,c:val,d:G.mode},d=>{
x('#read'+name).html(val);	
});
if(this.name=='price'){
x('#priceBox').removeClass('required');
}
}	
if(name=='address'){
var mapaddress=$("#propformstate option:selected").text()+' '+$("#propformprovince option:selected").text()+' '+$("#filter_city1 option:selected").text()+' '+val;
$('#mapaddress').val(mapaddress);		
}
})
.on('click','#savetags',function(){
		var tagline= $('#offertag').val();
		var goid= $('#goid').val();
		if(tagline.length >0){
		var params={a:'offertag',b:tagline,c:parseInt(goid)};		
		$.get('/ajax.php',params,function(data){
			s.notify("success",dic.TAGS_SAVED)
		});
		}
	})	
//EDUCATION switch institution
.on("change",'select[id^="educountry_"],select[id^="edulevel_"]',function(){
var exp=explode('_',this.id);
var id=exp[1];
var country=x('#educountry_'+id).val();
var level=x('#edulevel_'+id).val();
if(country=='12' && parseInt(level)>=4 && level!=7){
	$('#eduinstitution_'+id).css('display','none');
	$('#instiedu_'+id).css('display','block');
}else{
	$('#eduinstitution_'+id).css('display','block');
	$('#instiedu_'+id).css('display','none');
}
if(this.value==7 && exp[0]=='edulevel'){
	$('.settingBoxBody2colums1edit1c4').hide();
}else{
	$('.settingBoxBody2colums1edit1c4').show();
}
if(exp[0]=='edulevel'){
xget('?a=edulevel&b='+exp[1]+'&c='+this.value);
api.ma.my('get',my,['edu']);
x('#elevel'+exp[1]).text(this.value);
if (this.value >= 4 && this.value !=7){
	x('#edutypebox'+exp[1]).show()
	x('#edudepartmentbox'+exp[1]).attr('class','settingBoxBody2colums1edit1c2 edit1c2W3');
} else {
	x('#edudepartmentbox'+exp[1]).attr('class','');
	x('#edutypebox'+exp[1]).hide();
}
}
})
.on("change",'select[id^="edutype_"],select[id^="educountry_"],select[id^="edugrade_"]',function(){
var exp=explode('_',this.id),col=exp[0].replace('edu','');
xget('?a=eduset&b='+exp[1]+'&c='+this.value+"&d="+col,d=>{
	api.ma.my('get',my,['edu']);
	if(col=="grade"){x('#egrade'+exp[1]).text(G.edu_grade[this.value])}
	})
})	
.on("change",'#edu_country_new,#edu_level_new',function(){
	if(x('#edu_country_new').val()=='12' && ['4','5'].includes(x('#edu_level_new').val())){
	x('#edu_institution_new').css('display','none');
	x('#edu_institution_new2').css('display','block');
	}else{
	x('#edu_institution_new').css('display','block');
	x('#edu_institution_new2').css('display','none');
	}
	if(this.id=='edu_level_new'){
	if(this.value==7){
		x('.settingBoxBody2colums1edit1c4').hide();
	}else{
		x('.settingBoxBody2colums1edit1c4').show();
	}
	if (this.value >= 4 && this.value!=7){
		x('#edutypeboxnew').show()
		x('#edudepartmentboxnew').attr('class','settingBoxBody2colums1edit1c2 edit1c2W3');
	} else {
		x('#edutypeboxnew').hide();
		x('#edudepartmentboxnew').attr('class','');
	}
	}

})
.on("click",'#saveNewEdu',function(){
this.remove()
if(my.edu.length < 6){
	var edu_level_new=x('#edu_level_new').val();
	var edu_grade_new=x('#edu_grade_new').val();
	var edu_country_new=x('#edu_country_new').val();
	var edu_level_new_alias=$('#edu_level_new option:selected').text();
	var edu_institution_new=typeof x('#edu_institution_new').val() !='undefined' ? x('#edu_institution_new').val() : '';
	var edu_institution_new2=typeof x('#edu_institution_new2').val() !='undefined' ? x('#edu_institution_new2').val() : 0;
	var edu_department_new=x('#edu_department_new').val();
	var start_study_new=x('#start_study_new').val();
	var end_study_new=x('#end_study_new').val();
	var newEducation =$("#newEducationForm").serializeArray();
	$.post(AJAX,newEducation,function (data){
		api.ma.my('get',my,['edu'],d=>{
			s.notify('good',"New education saved");
			location.reload();
		});
		});
}else{
	x('#newedubutton').hide();
}
})
//EDIT EDUCATION
.on("keyup",'input[id^="eduinstitution_"]',function(){
var exp=explode('_',this.id);
xget('?a=eduinstitution&b='+exp[1]+'&c='+this.value);
api.ma.my('get',my,['edu']);
x('#einstitution'+exp[1]).text(this.value)
})
.on("keyup",'input[id^="edudepartment_"]',function(){
var exp=explode('_',this.id);
xget('?a=edudepartment&b='+exp[1]+'&c='+this.value);
x('#edepartment'+exp[1]).text(this.value)
})
.on("change",'select[id^="instiedu_"]',function(){
var exp=explode('_',this.id);
console.log('?a=eduinstitution2&b='+exp[1]+'&c='+this.value)
xget('?a=eduinstitution2&b='+exp[1]+'&c='+this.value);
api.ma.my('get',my,['edu']);
x('#einstitution'+exp[1]).text(this.value)
})
.on("change",'select[id^="departedu_"]',function(){
var exp=explode('_',this.id);
api.ma.my('get',my,['edu']);
xget('?a=edudepartment2&b='+exp[1]+'&c='+this.value);
x('#edepartment'+exp[1]).text(this.value)
})
.on("change",'#start_study_new',function(){
var tyear='';
var yearslist= array_combine(range(parseInt(this.value),date("Y")),range(parseInt(this.value),date("Y")));
yearslist[1]=dic.CURRENTLY_WORKING;
for(var i in yearslist){
	tyear +='<option value="'+i+'">'+yearslist[i]+'</option>';
}
x('#end_study_new').html(tyear)
})
.on("change",'select[id^="startstudy_"]',function(){
var exp=explode('_',this.id);
var tyear='';
api.ma.my('get',my,['edu']);
var yearslist= array_combine(range(parseInt(this.value),date("Y")),range(parseInt(this.value),date("Y")));
yearslist[1]=dic.CURRENTLY_WORKING;
for(var i in yearslist){
	tyear +='<option value="'+i+'">'+yearslist[i]+'</option>';
}
x('#endstudy_'+exp[1]).html(tyear)
xget({a:'startstudy',b:exp[1],c:this.value},d=>{
api.ma.my('get',my,['edu']);
x('#estart'+exp[1]).text(this.value);
})
})
.on("change",'select[id^="endstudy_"]',function(){
var exp=explode('_',this.id);
xget({a:'endstudy',b:exp[1],c:this.value},d=>{
api.ma.my('get',my,['edu']);
x('#eend'+exp[1]).text(this.value)
})
})
.on("click",'button[id^="removeEdu_"]',function(){
var exp=explode('_',this.id);
xget('?a=removeEdu&b='+exp[1]);
api.ma.my('get',my,['edu']);
x('#edu'+exp[1]).hide();
x('#edur'+exp[1]).remove();
})
//----------------------------LANGUAGES--------------------------
//NEW LANGUAGE SETTINGS
.on("click",'#saveNewLang',function(){
var lang=x('#newLanguage').val();
var standard=x('#newStandard').val();
if(sizeobj(my.langs) < 6){
x('#newlangbutton').show();
if (lang!=0 && standard!=0){
	console.log({a:'newLang',b:lang,c:standard})
xget({a:'newLang',b:lang,c:standard},function(data){
	if (data =='EXIST'){s.modal(dic.LANGUAGE_EXISTS);}	else{
	api.ma.my("get",my,["langs"]);
	x('#saveNewLang').remove();
	$('#newLanguage').last().attr('id','editLanguage_'+lang);
	$('#newStandard').last().attr('id','editStandard_'+lang);
	x('#editLanguage_'+lang).val();
	x('#editStandard_'+lang).val();
	var langi=$( "#editInputLangs_0" ).appendTo('#editLangs').attr('id','editInputLangs_'+lang);
	var langtext='';
	var langStandard='';
		for (var i in G.languages){
		langtext +='<option value="'+i+'">'+G.languages[i]+'</option>';
		}
	for (var j in G.langKnowledge){
	langStandard +='<option value="'+j+'">'+G.langKnowledge[j]+'</option>';
	}
	//append to read
	$('#readLanguages').append(G.languages[lang]+' ('+ G.langKnowledge[standard]+')');
	//create new language again
	$('#addLang').append('<div id="editInputLangs_0"><div class="personal_information21"><select id="newLanguage"><option value=0>'+dic.SELECT_LANGUAGE+'</option>'+langtext+'</select></div><div class="personal_information2b"><select id="newStandard"><option value=0>'+dic.SELECT_STANDARD+'</option>'+langStandard+'</select></div></div><button id="saveNewLang" class="but124" style="background: darkred;">'+dic.SAVE+' '+dic.LANGUAGES+'</button>');
	opener2('addLang');
	//set selection to new clone
	$('#editLangs').append('<button class="removeLang" title="'+dic.REMOVE_LANGUAGE+'" id="removeLang_'+lang+'"></button>');
	//append to read mode
	$('#readLanguages:last').append('<div id="readCurrentLang_'+lang+'"><span id="readLang_'+lang+'">'+G.languages[lang]+'</span>(<span id="readStandard_'+lang+'">'+G.langKnowledge[standard]+'</span>)</div>');
	}
	return false;
})
}else{
s.notify('warn',dic.SELECT_LANGUAGE_STANDARD);
}
}else{
x('#newlangbutton').hide();
}
})
//EDIT LANGUAGE SETTINGS
.on("change",'select[id^="editLanguage_"]',function(){
	var exp=explode('_',this.id);
	var lang=x('#editLanguage_'+exp[1]).val();
	xget({a:'editLang',b:lang,c:exp[1]},function(data){
	if (data =='NO'){s.modal(dic.LANGUAGE_EXISTS);
	x('#editLanguage_'+exp[1]).val(0);
	}else{
	api.ma.my("get",my,["langs"]);	
	x('#readLang_'+this.id).html(lang)
	}
	})
	return false;
})
.on("change",'select[id^="editStandard_"]',function(){
	var exp=explode('_',this.id);
	var lang=$('#editLanguage_'+exp[1]).val();
	var standard=$('#editStandard_'+exp[1]).val();
	xget('?a=editStandard&b='+standard+'&c='+exp[1],d=>{
		api.ma.my("get",my,["langs"]);
		x('#readStandard_'+exp[1]).html(lang)
	});
	return false;
})
.on("click",'button[id^="removeLang_"]',function(){
var exp=explode('_',this.id);
xget('?a=delLang&b='+exp[1],d=>{
	api.ma.my("get",my,["langs"]);
	x('#editInputLangs_'+exp[1]).hide()
	x('#readCurrentLang_'+exp[1]).remove()
	x('#removeLang_'+exp[1]).remove();
	delete my.langs[exp[1]];
	if(sizeobj(my.langs) <= 6){
	x('#newlangbutton').show();
	}	
});
})
.on("click",'#editButtonPostLocation2',function(){	
var selState='';
locform(G.id,function(p){
var state_text='<option value=0>State</option>';
for (var i in G.states){
	selState=G.states[i]==p.states[0] ? 'selected="selected"' : '';
	state_text +='<option value="'+G.states[i]+'" '+selState+'>'+i+'</option>';
}                
x('#stateBox02').html('<select col="state" id="filter_state2">'+state_text+'</select>');			
var checked='',province_text='';
var selected;
for (var i in G.province){
	if (G.province[i].sid==p.states[0]){
		checked=p.provinces.includes(G.province[i].id) ? 'checked' : '';
		province_text +='<div class="subclassTotal2st"><div class="subclassCheck"><input col="province" type="checkbox" value="'+i+'" id="province_'+G.province[i].id+'"  '+checked+'></div>'+i+'</div>';
	}
}
x('#provinceBox02').html(province_text);
})
})
.on("change",'#filter_state2',function(){
var state=this.value;
if(this.value==0){$(this).prop('required',true);}else{$(this).prop('required',false);}
$.get('/ajax.php',{a:'selectProvinces',b:G.id,c:G.mode},function(p){
	var checked,province_text='';
	var selected;
	for (var i in G.province){
		if (G.province[i].sid==state){
			checked=p.provinces.includes(G.province[i].id) ? 'checked' : '';
			province_text +='<div class="subclassTotal2st"><div class="subclassCheck"><input col="province" type="checkbox" value="'+i+ '" id="province_'+G.province[i].id+'"  '+checked+'></div>'+i+'</div>';
		}
	}
	x('#provinceBox0').html(province_text);
},'json');
})
.on("change","#filter_city1",function(){
var city=this.value;
var province=$('#postProvince').val();
var state=$('#postState').val();
$('#postCity').val(city);
//jquery update
var a=G.mode=="offer" ? "updateOfferCity":(G.mode=="prop" ? "updatecityprop":"updateCity");
var params={a:a,id:parseInt(postid),city:parseInt(city),province:parseInt(province),state:parseInt(state)};
console.log(params)
xget(params,function(res){
	console.log(res)
var citytext= city!="0" ? '-'+$('#filter_city1 option:selected').text(): "";
var provincetext='-'+$('#filter_province1 option:selected').text();
var statetext= $('#filter_state1 option:selected').text();
$('#locationLabel_'+postid).html(statetext+provincetext+citytext);        		
if(G.mode=='offer' || G.mode=='prop'){$('#locBox').removeClass('required');}
},'JSON');		
})
/**************DESIRED_LOCATION*****************/
//insert delete subclassification from checkbox panel
$(document).on("click","input[id^='province_']",function(){
	var state = $('#filter_state2').val();
	var stateText = $("#filter_state2 option:selected").text();
	var value = $(this).is(':checked') == true ? 1 : 0;
	var cv_max_prov= parseInt($('#cv_max_prov').text());
	
	if((cv_max_prov <= 0 && value==1) && G.mode!='offer') {
		$(this).attr('checked', false)
		s.modal(dic.REACHED_TOTAL_LIMIT_PROVINCE)
	}else{
		var province = explode('_', this.id)[1];
		var valueText = this.value;
		//pass ajax
		xget({a: 'insDelProvince',b:G.id,c:province,d:state,e:value,f:G.mode}, function (data) {
			var newcounter = parseInt($('#count_provincesList').text()) + (value == 1 ? 1 : -1);
			$('#count_provincesList').text(newcounter)
			$('#cv_max_prov').text(parseInt($('#cv_max_prov').text()) - (value == 1 ? 1 : -1))
		},'json');
		//reset forms
		//run_subclassif_forms('reset');
		//if checked
		if (value == 1) {
			//$("#provincesList").append('<div id="locationLabel_' + province + '" class="addSelBoxstate"><button id="state2_'+state+'" class="statesel">'+stateText+'</button>' + valueText + '<button id="deleteProvince_' + province + '" class="deleteBoxSmall">X</button></div>');
		} else {
			$('#province_'+province).attr('checked', false);
			$('#locationLabel_' + province).remove();
		}		
	}
		$('#locationBox').removeClass('required');
})
.on("click","input[name='cvformcvstatus']",function(){
	$('#statusBox').removeClass('required');
})
.on("click","input[name='cvformcv_desired.val']",function(){
	$('#statusBox').removeClass('required');
})
.on("change","#cvformrelevant",function(){
	if(this.value!=0){$('#relevantBox').removeClass('required');}
})
.on("click","input[name='cvformcv_desired.val']",function(){
	$('#industryBox').removeClass('required');
})
.on("change","input[name='cvformcv_specific.val']",function(){
	if(this.value!=0){$('#subBox').removeClass('required');}
})
.on("click","input[id*='cvformintro']",function(){
	$('#introBox').removeClass('required');
})
.on("click","input[name='cvformcv_size.val']",function(){
	$('#sizeBox').removeClass('required');
})

/************************IPANEL***************************
IPANEL CHOICES check radio button
***************************************************/
function experience_selected_form2(divid,sel){
    var selected,sele= typeof sel !='undefined' ? sel : '';
    var divid= typeof divid !='undefined' ? divid : 'f_experience';    
        var exptext=sele =='' ? '<option value=0>'+dic.SELECT_BUSINESS_TYPE+'</option>':'';
        for(var j in G.buscat){
            selected=sele==G.buscat[j]  || G.buscat[j]==ses('s_exp_id') ? 'selected="selected"' :'';
            exptext +='<option value="'+G.buscat[j]+'" '+selected+'>'+j+'</option>';
        }        
        x('#'+divid).append('<select id="expid_'+sele+'">'+exptext+'</select>');
}
function resetChoices(iobj){
	// cid,eoid,status,interviewExist,interid
	 console.log(iobj)
	iobj.eoid= typeof iobj.eoid!='undefined' ? iobj.eoid : 0;
	if (G.uname=='inter'){
	reset('iContainer_'+iobj.cid+'_'+iobj.interid);
	}else {
	reset('iContainer_'+iobj.cid+'_'+iobj.eoid);
	}
	var newli= interchoices(iobj);
	if (G.uname=='cont'){
	$('#iContainer_'+iobj.cid+'_'+iobj.eoid).append(newli).show('fast');
	$('#status_'+iobj.cid+'_'+iobj.eoid+'_'+iobj.status).prop("checked",true );
	}		else if (G.uname=='inter'){
	$('.speedloaderCon').hide();
	}
	if (G.uname=='inter'){
	// iobj.interviewExist=interviewExist;
	var newli= interchoices(iobj);
	$('#iContainer_'+iobj.cid+'_'+iobj.interid).hide().html(newli).show('fast');
	}else {
	$('#iContainer_'+iobj.cid+'_'+iobj.eoid).hide().html(newli).show('fast');
	}
}
function setScheduler(iobj){
//open scheduler
console.log('cid:'+iobj.cid)
if ($('#scheduler_'+iobj.cid+'_'+iobj.eoid).css('display')=='none'){
$('#scheduler_'+iobj.cid+'_'+iobj.eoid).show();
$('#status_'+iobj.eoid+'_'+iobj.status).prop("checked",true );
//open datetimepicker contact
$('#date2timepicker_'+iobj.cid).focusin();
}else{
$('#scheduler_'+iobj.cid+'_'+iobj.eoid).hide();
$('#status_'+iobj.eoid+'_'+iobj.status).prop("checked",false );
}
}

function scheduler(obj){			
var intereas='<option value="0">Reason for cancellation</option>';
for(var i in G.inter_reason){intereas +='<option value="'+i+'">'+G.inter_reason[i]+'</option>';}
var exp=explode('_',obj.id);
if(G.uname=='inter'){
	console.log(exp);
	iobj.interid= parseInt(exp[1]);
	iobj.status= parseInt(exp[2]);
	$('#status_'+iobj.interid+'_'+iobj.status).prop("checked",true );
	var previousStatus =$('input[name=interFlag'+iobj.interid+']:checked').val();
	//popup ranking
	iobj.cid=$('#cid'+iobj.interid).val();
	console.log(iobj.status);
	if(iobj.status==10){
	var message='<br/><select id="reason'+iobj.interid+'" class="bootDrop">'+intereas+'</select>';
	}
	if(my.grp==2 && iobj.status==11){
		var name= $('#i'+iobj.interid).text();
		var oldval= $(".rank2_"+iobj.cid).val();
	var message="<span class='positionPop'>"+dic.SCORE_CANDIDATE+"</span><span class='rankRefFieldPop'>" +
		"<input maxlength='3' size='2' value='"+oldval+"' id='popupRank' class='rank2_"+iobj.cid+" rankRefField'></span>";
		var callback=function(result){
				if(result){					
				var call={a:'rank'+my.grp,b:iobj.cid,c:$('#popupRank').val()};
						$.get('/ajax.php',call,(res)=>{							
							modalclose();
						});
						var newval= $("#popupRank").val();
						$(".rank2_"+iobj.cid).val(newval);
						s.notify('warn',dic.THANK_YOU_FOR_RATING);
					}
		}		
	}
	var message=!!message ? message:'';
		var callback=function(result){
		var reason=$('#reason'+iobj.interid).val();
		if (iobj.status!=7 && iobj.status!=5){					
			$.get('/ajax.php',{a:'changeStatus',b:iobj.interid,c:iobj.status,cid:iobj.cid},function(data){
				if (data =='NO'){
					s.notify('warn',dic.INTERVIEW_CANNOT_CHANGE);
				}else{
					reset('ipanel_container_'+iobj.interid);
					$('.speedloaderCon').hide();
					iobj.interviewExist=1;
					iobj.start=data.start;
					iobj.countContact=data.countContact;
					var newli= interchoices(iobj);
					$(newli).hide().appendTo('#ipanel_container_'+iobj.interid).show();
					$('#scheduler_'+iobj.interid).hide();
					iobj.eoid=0;
					iobj.interviewExist=1;
					resetChoices(iobj);
					//set the new flag
		var remote=data.uid1==my.uid ? data.uid2:data.uid1;	
		api.ma.my('get',my,['affee'],()=>{
			api.ma.N('get',my,['inter']);
			api.ma.N('get',remote,['inter']);
		});	
					if (iobj.status==10){
						xget({a:'inter_reason',b:ses('intereason'+iobj.interid),c:iobj.interid,cid:iobj.cid},function(res){console.log(res)});
					}
					if (iobj.status!=7){
						$('#flag_'+iobj.interid).text(G.INTERVIEWS.status[iobj.status]).css('backgroundColor',G.iColorFlags[iobj.status]).show();
					}
				}
				modalclose();
			},'json');
		}else{
			console.log('here is 2nd')
			//uncheck
			if (my.grp==2 && (iobj.status==7 || iobj.status==5)){
				$('#scheduler_'+iobj.interid).show();
				$('#date2timepicker_'+iobj.eoid).focusin();
				modalclose();
			}
			$('input:radio[name=interFlag'+iobj.interid+']').filter('[value='+previousStatus+']').prop('checked',true);
		}
	}
	
	s.modal({message:G.INTERVIEWS.confirm[iobj.status]+message,foot:but("OK",callback)});
}else{
	iobj.cid= parseInt(exp[1]);
	iobj.eoid= parseInt(exp[2]);
	iobj.status= parseInt(exp[3]);
	iobj.interid= parseInt(exp[4]);
	previousStatus =$('input[name=interFlag'+iobj.cid+'_'+iobj.eoid+']:checked').val();
	$('#status_'+iobj.cid+'_'+iobj.eoid+'_'+iobj.status).prop("checked",true );
	if (iobj.status==5){
		setScheduler(iobj);
	}else if (iobj.status==7){ //open toolbox2 and save rechedule mode
		setScheduler(iobj);
		//check selected
		$('#status_'+iobj.cid+'_'+iobj.eoid+'_7').prop('checked',true);
	  //ALL OTHER STATUS
	}else{	//save and append selected radio and flag
		iobj.interid= !iobj.interid ? parseInt($('input[name=inter_id]').val()) : iobj.interid;
		$('#status_'+iobj.cid+'_'+iobj.eoid+'_'+iobj.status).prop("checked",false);
		$('#scheduler_'+iobj.cid+'_'+iobj.eoid).hide();
		//confirm
		var intereaso= iobj.status!=10 ?  '' : '<br/><select id="reason'+iobj.interid+'" class="bootDrop">'+intereas+'</select>';
		var changestatusobj ={a:'changeStatusFromEOI',b:iobj.eoid,c:iobj.status,interid:iobj.interid,cid: iobj.cid};
	   var name= $('.contact'+iobj.cid).text();
		var oldval= parseInt($(".rank2_"+iobj.cid).val());
		var ranking=my.grp==2 && iobj.status==11 ? "<span class='positionPop'>"+dic.SCORE_CANDIDATE+"</span><span class='rankRefFieldPop'><input maxlength='3' size='2' value='"+oldval+"' id='popupRank' class='rank2_"+iobj.cid+" rankRefField'></span>":"";
		s.modal({message:G.INTERVIEWS.confirm[iobj.status]+intereaso+ranking,foot:but("OK",function(result){
		if (result){
			if (iobj.status==10){
				var sintereason=!!ses('intereason'+iobj.interid) ? ses('intereason'+iobj.interid) : 0;
				console.log({a:'inter_reason',b:sintereason,c: iobj.interid})
				xget({a:'inter_reason',b:sintereason,c:iobj.interid},function(d){console.log(d);});
			}
			xget(changestatusobj,function(datum){
				console.log(datum)
				if (datum =='NO'){
					s.notify('warn',dic.INTERVIEW_CANNOT_CHANGE);
				} else {						          
		
		var remote=datum.uid1==my.uid ? datum.uid2:datum.uid1;		
		api.ma.my('get',my,['affee'],()=>{
			api.ma.N('get',my,['inter']);
			api.ma.N('get',remote,['inter']);
		});	
		//reset
		iobj.interviewExist=datum.interviewExist;
		resetChoices(iobj);
		//set the new flag
		if (iobj.eoid!=0){
			appendFlag(iobj.eoid,datum.id,iobj.status,iobj.cid);
		} else {
			appendFlag(0,iobj.interid,iobj.status,iobj.cid);
		}
		if (closd.includes(iobj.status)){
			//append new history line
			xget({a: 'newInterHistory',b: datum.id},function(d){ //APPEND LINE TO HISTORY
					var newhistory='<div class="relatedAdsCvTextH"></div><div class="relatedAdsCvText">'+(d.post_type!="" ? '<span class="adNotFlag01">'+(d.ptype==1 ? "A" : "N")+'</span>' : "")+
						'<span class="relatedAdsCvTextO1a">'+(d.code!="" ? d.code : "") +
						'</span><span class="relatedAdsCvTextO1b">'+d.title+'</span><span class="relatedAdsCvTextO1c">'+G.itype[d.type]+'</span><span class="relatedAdsCvTextO2"><strong>'+date('Y-m-d H:i',d.modified)+'</strong></span><div class="flagRelated" style="background-color:'+decodeURIComponent(G.iColorFlags[iobj.status])+';">'+G.INTERVIEWS.status[d.status]+'</div></div></div>';
					$(newhistory).appendTo('#history'+iobj.cid).show();
					if (iobj.eoid==0){
						$('#flag0_'+iobj.cid)
							.text(G.INTERVIEWS.status[iobj.status])
							.css('backgroundColor',G.iColorFlags[iobj.status])
							.show();
					}
				},'json')
			};
			if (my.grp==2){
				//OPEN NEW INTERVIEW EOI BUTTON
				//find which are shortlisted not to include 0-8 status
				xget({a:'getNewInterviewable',b: iobj.cid},function(eoi){
					for (var j=0; j < eoi.length; j++){
						$("button[id^='newInterview_"+iobj.cid+"_"+eoi[j]['eoid']+"']").show();
					}
				},"json");
				if (G.uname=='cont'){
					//OPEN NEW INTERVIEW CONTACT BUTTON
					$("#interContact_"+iobj.cid).show();
					$("[id^='lstatus_"+iobj.cid+"_'][id$='5']").show();
				}
			}
		}
	},"json");				
			//popup ranking
			if(my.grp==2 && iobj.status==11){
				xget('?a=rank'+my.grp+'&b='+iobj.cid+'&c='+$('#popupRank').val());
				var newval= $("#popupRank").val();
				$(".rank2_"+iobj.cid).val(newval);
				// resetChoices(cid,eoid,status,datum.interviewExist);
				// s.notify('warn',dic.THANK_YOU_FOR_RATING);								
			}
		}else{
			//return the previous value
			if (typeof previousStatus !='undefined'){
				$('input:radio[name=interFlag'+iobj.eoid+']').filter('[value='+previousStatus+']').prop('checked',true);
			}else{
				$('input:radio[name=interFlag'+iobj.eoid+']').prop('checked',false);
			}
		}
		modalclose() 
		})})
	}
}
}
//@cid_@interid_@cvid_confirmterms
function submitinter(obj){
iobj.cid=$(obj).attr('cid');
iobj.interid=!!$(obj).attr('id') ? $(obj).attr('id'):0; //interid
iobj.cvid=$(obj).attr('cvid');
iobj.eoid=$(obj).attr('eoid');
iobj.terms=$(obj).hasClass("_confirmTerms");
if(G.uname=='inter'){	
	iobj.type= $("input[name=type"+iobj.interid+"]:checked").val();	
	iobj.start= $('#datetimepicker_'+iobj.interid).val();
	s.notify('good',dic.INTERVIEW_UPDATED);
	$('#scheduler_'+iobj.interid).hide();
	$('.speedloaderCon').hide();
	iobj.status= $("input[id^='status_"+iobj.interid+"']:checked").val();	
	$('#flag_'+iobj.interid).text(G.INTERVIEWS.status[iobj.status]).css('backgroundColor',G.iColorFlags[iobj.status]).show();
}else{
	iobj.cvid=iobj.eoid=="0" ? 0 : $('#cvid'+iobj.eoid).val();
	var stat=$("input[id^='status_"+iobj.cid+"_"+iobj.eoid+"_']:checked").val();
	iobj.status=!stat ? 5 : stat;
	//var appenddiv=iobj.eoid!=0 ? '#flag_'+iobj.eoid+'_'+iobj.interid : '#flag0_'+iobj.cid;
	var appenddiv=iobj.eoid!=0 ? '#flag_'+iobj.eoid+'_0' :'#flag0_'+iobj.cid;
	$(appenddiv).text(G.INTERVIEWS.status[iobj.status]).css('backgroundColor',G.iColorFlags[iobj.status]).show();
	console.log(appenddiv)
}
	if (iobj.terms && !s.coo('agent_uid')){
		s.modal({message: confirmationText(iobj.cvid,iobj.cid),foot:but(dic.PROCEED,()=>{interequest(iobj);modalclose();})});
	}else{
		interequest(iobj);
	}
resetChoices(iobj);
}
function newinter(obj){
	var exp=explode('_',obj.id);
iobj.cid=exp[1];
iobj.eoid=exp[2];
// xget({a:'insertNewInterview',b:iobj.eoid,c:iobj.cid},function(data){
//     if(data =='NO'){
//         s.notify('warn',dic.PROBLEM_SENDING_YOUR_INTERVIEW);
//     }else{
//         iobj.interviewExist= data.interviewExist;
//         iobj.start= data.start;
iobj.status= 0;
resetChoices(iobj);
// var newli= interchoices(iobj);
// if (G.uname=='cont'){
//     $('#iContainer_'+iobj.cid+'_'+iobj.eoid).append(newli).show('fast');
//     $('#status_'+iobj.cid+'_'+iobj.eoid+'_'+iobj.status).prop("checked",true );
// }		else if (G.uname=='interview'){
//     $('.speedloaderCon').hide();
// }
//delete id from the last flag and insert it to the new
$('#newInterview_'+iobj.cid+'_'+iobj.eoid).hide();
if(G.uname=='cont'){
	// $("button[id^='newInterview_"+iobj.cid+"']").hide('fast');
	$('#interContact_'+iobj.cid).hide('fast');
	//appendOldFlag(0);
	$('#iContainer_'+iobj.cid+'_'+iobj.eoid).show()
}else{
	// $('#flag_'+iobj.eoid+'_'+data.id).attr('id','');
	 $('<div class="flagRelated2" id="flag_'+iobj.eoid+'_0"></div>').hide().appendTo('#appendOldFlag'+iobj.cid+iobj.eoid).show();
	// $('<div class="flagRelated2" id="flag_'+iobj.eoid+'_0" style="background-color:#A7A9AB;">'+G.INTERVIEWS.status[0]+'</div>').hide().appendTo('#appendOldFlag'+iobj.cid+iobj.eoid).show();
   // // $('<div class="flagRelated2" id="flag_'+iobj.eoid+'_'+data.id+'" style="background-color:#A7A9AB;">'+G.INTERVIEWS.status[0][LANG]+'</div>').hide().appendTo('#appendOldFlag'+iobj.cid+iobj.eoid).show();
}
// }
// },"json")
}
$(document)
// .on("change","select[id^='intereason']",function(){
//     var id=this.id.replace('intereason','');
//     ses('intereason'+id,this.value)
// })
.on("click","label[id^='lstatus_']",function(e){
scheduler(this);
})
/*********************************
SUBMIT FORM OF SCHEDULER
***************************************************/
.on("click","button[id^='newInterview_']",function(){
newinter(this)
})
/**************************************************
APPEND FLAG FUNCTION
***************************************************/
function appendFlag(eoid,interid,status,cid){
	if(eoid!=0){
	$('#flag_'+eoid).text(G.INTERVIEWS.status[status]).css('backgroundColor',G.iColorFlags[status]).show();
	}else{
	$('#interEOI0'+cid).html('<div id="flag0_'+cid+'" class="flagRelated" style="background-color: '+ decodeURIComponent(G.iColorFlags[status])+';" onclick="s.pop(this)" title="">'+G.INTERVIEWS.status[status]+'</div>');
	}
}
function interequest(iobj){
if(G.uname=='inter'){
 xget({a:"updateInter",b:iobj.type,c:iobj.start,e:iobj.interid,status:iobj.status},function(data){
	 console.log('updateInter ok')
	 	api.ma.N('get',my,['inter']);
	 	api.ma.my('get',my,['affee']);	
 });
}else {
//get data from form
var eoiform=$("#ipanel2Form"+iobj.cid+iobj.eoid).serializeArray();
//set status checked interFlag5_335
iobj.status=parseInt($("input[id^='status_"+iobj.cid+"_"+iobj.eoid+"_']:checked").val());
// iobj.status=$('#status_'+iobj.cid+'_'+iobj.eoid+'_7').is(':checked') ? 7 : 5;
//var status=$('input[name=interFlag'+cid+'_'+eoid+']:checked','#ipanel2Form'+cid+eoid).val();
//CHANGE a to reschedule if checked status ==7
if (iobj.status==7){
	eoiform[0].value='reschedule';
}
	console.log(eoiform)
	console.log(eoiform)
	console.log(eoiform)
	console.log(eoiform)
//SUBMIT form
$.post("/ajax.php",eoiform,function(data){
	if (data !='NO'){
		api.ma.my('get',my,['affee']);
		api.ma.N('get',my,['inter']);		
		api.ma.N('get',data.uid,['inter'],d=>{soc.send({type:"N",to:data.uid});});	
		//confirm
		s.notify('warn',iobj.status==5 ? dic.INTERVIEW_CREATED_SUCCESSFULLY : dic.INTERVIEW_RESCHEDULED);
		//set the flag
		appendFlag(iobj.eoid,data.id,iobj.status,iobj.cid);
		//close button if in contact
		if (G.uname =='cont'){
			$("#interContact_"+iobj.cid).hide();
			$("button[class*='newInterview_"+iobj.cid+"']").hide();
		}
		//close panel,scheduler except this
		//$("ul[id^='iContainer_"+cid+"']").not("#iContainer_"+cid+"_"+eoid).hide();
		$("[id^='lstatus_"+iobj.cid+"_'][id$='5']").hide();
		$("div[id^='scheduler_"+iobj.cid+"']").hide();
		//reset hidden value
		//$('#inter_id').val(data.id);
		//reset
//temp	iobj=data.interviewExist;
		resetChoices(iobj);
		//opener('ipanel_'+eoid);
		//close interButton
		$("button[id^='interButton_"+iobj.cid+"']").hide();
		//add flag
		//	if(eoid !=0){
		if ($('#status_'+iobj.cid+'_'+iobj.eoid+'_7').is(':checked')){
			iobj.interid=$("input[name=inter_id]").val();
			appendFlag(iobj.eoid,iobj.interid,7);
			if (iobj.eoid==0){
				$('#startDate'+iobj.cid).text(data.date).show();
			}
			$('#interEOI'+iobj.eoid+iobj.cid).hide().html('<div class="flagRelated'+(G.uname=="eoi" ? 3 : '')+'" id="flag_'+iobj.eoid+'_'+data.id+'" style="background-color:#908FC3;">'+dic.INTERVIEW_RESCHEDULED+'</div>').show();
		} else {
			$('#interEOI'+iobj.eoid+iobj.cid).hide().html('<div class="flagRelated'+(G.uname=="eoi" ? 3 : '')+'" id="flag_'+iobj.eoid+'_'+data.id+'" style="background-color:#2C3E95;">'+dic.INTERVIEW_REQUESTED+'</div>').show();
			$('#startDate'+iobj.cid).text(data.date).show();
		}
	} else {
		s.notify('warn',dic.CHANGE_CANNOT_BE_DONE);
	}
},"json");
}
}
function online_inter(){
xget({a: 'online_today'},function (data){
		var html='';
		if (data!='NO'){
			ses('online_data',JSON.stringify(data));
			ses('online_interviews',data.length);
			var status=data.length+' online interviews today';
			for (var i in data){
				if(data[i].status==8 && data[i].type==1 && (data[i].start - 1200) < time() && data[i].end > time()){
					var inpage=my.grp==1 ? data[i].inpage1 : data[i].inpage2;
					var inpageOp=my.grp==2 ? data[i].inpage1 : data[i].inpage2;
					stream_restrict(data[i].id);
					//set notication
					var img=iconic(data[i].img);
					var title=dic.INTERVIEW_ID+' '+ data[i].id;
					var body=data[i].name+' - '+ data[i].startime;
					var link =G.SITE_URL+'inter/stream?iid='+data[i].id;
				 if(!G.mobile){
					 if (s.isNotification){
						 if (local('notif'+data[i].id)==false){
							 s.notification.set(1,body,img,title,link);
							 local('notif'+data[i].id,link);
						 } else {
							 s.notification.set(0);
						 }
					 }
				 }
					//set html poutsa
					html +='<div class="onlineBox" style="background:#010181">' +
						'<div class="photoOnline">' +
						'<img src="'+iconic(data[i].img)+'" width="100%">' +
						'</div>' +
						'<div class="interCamContTop"><button onclick="stream('+(data[i].uid==my.uid ? data[i].uid0:data[i].uid)+','+my.uid+',&quot;inter&quot;,'+data[i].id+')" class="stream_'+data[i].id+' but51"></button></div>' +
						'<div class="textContOnline">' +
						'<div class="textLOnline"><span class="textLOnlineTitle">'+dic.INTERVIEW_ID+':</span>'+data[i].id+'</div></div>' +
						'<div class="nameOnlineCon"><div class="userOnOffPosIntTop"><div class="userid_'+data[i].uid+'"></div></div><a href="interview/itoday" class="nameOnline">'+data[i].fullname+'</a></div>' +
						'<div class="timeOnline">'+data[i].startime +
						'<div class="textLOnline">'+(inpage==1
								? (inpageOp==1 ? '<span class="getInterviewTit2">'+(my.grp==1 ? dic.ALERT_EMPLOYER3B : dic.ALERT_CANDIDATE3)+'</span>' : "")
								: (inpageOp==1 ? '<span class="getInterviewTit2">'+(my.grp==1 ? dic.ALERT_EMPLOYER3B : dic.ALERT_CANDIDATE3)+'</span>' : "")
						)+'</div>' +
						'<em><span id="getinStatus'+data[i].id+'" class="chronotime1"></span></em></div>' +
						'</div></div>';
				}else{
					$('.stream_'+data[i].id).removeClass('but51').addClass('but52').prop('disabled',true);
					local.del('notif'+data[i].id);
					$('#subhc').html('');
					if(s.isNotification){s.notification.set(0);}
				}
			}
			// if(!local.getby('notif')){
		 //   $('#onlineInter').html(html);			
			$('#subhc').html(html);
			// }
		} else {
		 //   $('#onlineInter').html('')
			
		}
	},'json')
}
function stream_restrict(inter_id){
xget({a: 'insert_stream_restrictions',b: inter_id},function(da){
console.log(da)
var inpage=my.grp==1 ? da['inpage1'] : da['inpage2'];
var inpageOp=my.grp==2 ? da['inpage1'] : da['inpage2'];
if (da.interview_type==1){
if (da.open_camera){
$('.stream_'+inter_id).removeClass('but52').addClass('but51').prop('disabled',false);
$('#getin_'+inter_id).html(
(inpage==1
? ('<div class="getInterviewCon">' +
'<span id="intertit'+inter_id+'" class="getInterviewTit">'+(my.grp==1 ? dic.ALERT_EMPLOYER : dic.ALERT_CANDIDATE)+ '</span>' +
'<div '+(inpage==1 ? "disabled" : "")+' class="getInterview2" id="inpage'+inter_id+'">'+
(my.grp==1 ? dic.SIGNALLED_ASREADY_ONLINE_INTERVIEW1 : dic.SIGNALLED_ASREADY_ONLINE_INTERVIEW2)+
'</div>' +
(inpageOp==1 ? '<span class="getInterviewTit2">'+(my.grp==1 ? dic.ALERT_EMPLOYER3B : dic.ALERT_CANDIDATE3)+'</span>':"") +
'</div>'
)
: ('<div class="getInterviewCon">' +
'<span id="intertit'+inter_id+'" class="getInterviewTit">'+(my.grp==1 ? dic.ALERT_EMPLOYER : dic.ALERT_CANDIDATE)+ '</span>' +
'<button '+(inpage==1 ? "disabled" : "")+' class="getInterview" id="inpage'+inter_id+'">'+
(my.grp==1 ? dic.READY_ONLINE_INTERVIEW1 : dic.READY_ONLINE_INTERVIEW2)+'</button>' +
(inpageOp==1 ? '<span class="getInterviewTit2">'+(my.grp==1 ? dic.ALERT_EMPLOYER3B : dic.ALERT_CANDIDATE3)+'</span>':"") +
'</div>'
)
)
)					
}else{
$('.stream_'+inter_id).removeClass('but51').addClass('but52').prop('disabled',true);
}
}
},'json');
}
function authenticate(){
xget({a:'authenticate',b:G.code,c:G.auth},function (data){
if (data==='OK'){
s.notify('warn',dic.AUTHENTICATION_COMPLETED,function(){
	s.coodel('SPREGRP');
	location.href='/';
	return false;
});
}else if (data=='2'){
s.notify('warn',dic.USER_ALREADY_AUTHENTICATED);
}else{
s.notify('warn',dic.AUTHENTICATION_NOT_SUCCESSFUL);
return false;
}
},'json');
}
function appendsubcont(){	
//append to sorting subclassifications data
var id='sort_'+G.uname+'_'+G.mode+'_sub';
var sub='<option value=0>'+dic.SUBCLASSIFICATIONS+'</option>';
var bsh='<option value=0>'+dic.ALL_INDUSTRIES+'</option>';
var b= G.mode!="" ? array_flip(G.cstatus)[G.mode]: '';
if(G.mode!='deleted' && G.mode!='received' && G.mode!='sent'){
$.get('/ajax.php',{a: 'appendsubcont',b: b,c: G.uname},function(data){
   if (sizeobj(data.subs) > 0){
		var subs=data.subs;
		for (var j in subs){
			sub +='<option value="'+subs[j]+'" '+(s.coo(id)==subs[j] ? "selected=selected" : "")+'>'+j+'</option>';
		}
		x('#contact_subs').html('<select id="sort_contact_'+G.mode+'_sub" name="firstClass">'+sub+'</select>');
	}
	if (my.grp==1 && sizeobj(data.bg) > 0){
		var bg=data.bg;
		for (var j in bg){
			bsh +='<option value="'+bg[j]+'" '+(s.coo('sel_buscat')==bg[j] ? "selected=selected" : "")+'>'+j+'</option>';
		}
		x('#s_buscat').html('<select id="contact_buscat" name="firstClass">'+bsh+'</select>');
	}
},'json');
}
}
function appendsubeoi(){
//get business category //set sortings //append to sorting subclassifications data
var sub='<option value=0>'+dic.SUBCLASSIFICATIONS+'</option>';
var pst='<option value=0>'+(my.grp==1 ? dic.ALL_JOB_PREFERENCES : dic.ALL_ACTIVE_ADVERTISEMENTS)+'</option>';
var sk='<option value=0>'+dic.SELECT_SKILLS_PROFICIENCY+'</option>';
var subsdiv=my.grp==2 && ['received','sent','deleted'].includes(G.mode) ? '#eoi_subs1' : '#eoi_subs';
var cookieselected='sort_eoi_'+G.mode+'_sub';
$.get("/ajax.php",{a: 'appendsubeoi',b: array_flip(G.eoistatus)[G.mode]},function(data){
	console.log(data)
//eoi subs
if (data !='NO'){
 // SUB LOOP
 var profs={},prkey=[];
 for (var i in data){
	 if(data[i].subclassif!=0){
	prkey.push(G.subclassifbyid[data[i].subclassif].s);
	 profs[G.subclassifbyid[data[i].subclassif].s]=data[i].subclassif;
	 }
 }
 $.unique(prkey.sort());
 for (var j in prkey){
	 sub +='<option value="'+profs[prkey[j]]+'" '+(s.coo(cookieselected)==profs[prkey[j]] ? "selected=selected" : "")+'>'+prkey[j]+'</option>';
 }
 x('#eoi_subs').html('<select id="sort_eoi_'+G.mode+'_sub" name="firstClass">'+sub+'</select>')
//skills
if(my.grp==2){
 var skey=G.is.skills_filter=='1' ? {1:G.allskills[1],2:G.allskills[2],3:G.allskills[3],adv:"Advanced Levels"} : sublist(G.allskills,[1,2,3])
 for (var j in skey){
	var selectedsk= s.coo('skills')==j ? "selected=selected" : "";
	 sk +='<option value="'+j+'" '+selectedsk+'>'+skey[j]+'</option>';
 }
 x('#s_eoi_skills').html('<select id="eoiskills">'+sk+'</select>');
}
//FIXING TITLES
 var keys={},key=[];
 for (var i in data){
	 key.push(data[i].title);
	 keys[data[i].title]= my.grp==2 ? data[i].postid : data[i].cvid;
 }
 $.unique(key.sort());
 for (var j in key){
		  pst +='<option value="'+keys[key[j]]+'" '+(s.coo('selectedPost')==keys[key[j]] ? "selected=selected" : "")+'>'+key[j]+'</option>';
	  }
x('#s_eoi_post').html('<select id="selectedPost">'+pst+'</select>');
}
},'json');
}
function recentlogins(){
	var ll=local('ll');
	if(!!ll){
	var lle='',llr='';
	var rarr={0:'Employer',1:'Internal Agent',2:'External Agent',3:'Government Agent'}
	xget({a:'ll',b:ll},us=>{
	var size=sizeobj(us);
	if (us !='NO'){
	var firstsize=size < 3 ? size : 3;
	for(var i=0;i<firstsize;i++){					  
	   llr +='<div class="recent" id="logwith'+us[i].uid+'"><button id="delrecent'+us[i].uid+'"  class="but135"></button>'+					   
	   '<button onclick="loginwith('+us[i].uid+')" class="but136"><img  width="100%" class="profile_photo" src="'+us[i].img+'">' +
	  '<span class="profNameRec">'+us[i].fname+'</span></button></div>';
	}
	if(size >3){
	 for(var i=3;i<size;i++){
		 lle +='<div class="recent" id="logwith'+us[i].uid+'"><button id="delrecent'+us[i].uid+'"  class="but135"></button>'+
		 '<button onclick="loginwith('+us[i].uid+')" class="but136"><img  width="100%" class="profile_photo" src="'+us[i].img+'">' +
			 '<span class="profNameRec">'+us[i].fname+'</span></button></div>';
	}}
	 var html='<div class="recentLog"><div class="speedloaderCon" style="display:none;"><div class="speedloader"></div></div>'+
	 '<div><span class="profNameRecTit">recently logged in <a onclick="opener2(&quot;recentLogs&quot;)" class="btnBoxCloseBlue"></a></span>'+llr+''+					 
	 '</div>'+
	 '<div class="recentLog1" style="display:none;" id="recentLogs">'+lle+'</div>'+
	 '</div>';					  
	$('.wellcomeRegistration').prepend(html)
	}
	},'json');
	}
}
function loginauthenticated(){
xget({a: 'auth_login',b: G.auth,c: G.id},function (data){
if (data !='NO'){
var domain=G.rc[data['rc']];
s.coo('my.uid',data['uid'],domain);
s.coo('SPNAME',data['name'],domain);
s.coo('my.grp',data['grp'],domain);
s.coo('rc',domain,domain);
//for (i in G.constants){
//s.coo(i,data[G.constants[i]]);
//}
if (data['status'] > 1){
	s.coo('SPSUGROUP',data['status'],domain);
}
//redirect to home or profile according to profile_completance_rate($grp,$spid)
location.href='/'+data['link'];
} else {
s.notify('warn',dic.SECURITY_REASON_NOT_ALLOW)
}
},'json')
}
//********************************POTENTIAL***************************/
function potloop(id){
	var id=!id ? G.id:id,box='',is_agent=false,
	page= !!s.coo('potential_page') && s.coo('potential_page')!=0 ? parseInt(s.coo('potential_page')) : 1,
	order= !!s.coo('potential_order') && s.coo('potential_order') !=0 ? parseInt(s.coo('potential_order')) : 1;
	$.get("/ajax.php",{a: 'potential_companies',b:id,page:page,order:order},d=>{
	c('dir',d)
	var loop= d.loop;
	console.log(loop)
	if(d.res_counter>0){
	for(var i in loop){		
		if (id !=0){var buscat= array_flip(G.buscat)[loop[i].buscat]}else{x('#buscat_'+loop[i].uid).html('<i>Not set</i>')}					
		var is_agent= [1,2,3].includes(loop[i].affiliate) ? true: false,
		blocked= loop[i].blocked!=null ? true : false,                   
		cond1= is_agent ? dic.AGENT_TEXT :'',//is agent                    
		cond2= !d.certified && [3,6].includes(loop[i].certifiedF) ? dic.CERTIFIED_TEXT  :'',//certified filter only                    
		cond3= blocked ? dic.BLOCKED_TEXT:'',//block text                    
		cond4= dic.DEFAULT_TEXT,//default
		cond5= [2,5].includes(loop[i].certifiedF) || [2,5].includes(loop[i].receivedeoiF) ? dic.CERTIFIED_FIRSTPOT  :'',
		cond=cond1!='' ? cond1 : (cond2!='' ? cond2 : (cond3!='' ? cond3 : cond4)),
		flag1=[3,6].includes(loop[i].certifiedF)  ? (d.certified ? dic.OK : dic.CERTIFIED_ONLY):'',
		grpOp=my.grp==1 ? '_post':'_cv',
		flag2=is_agent ? '<img src="/img/starsPot.png" style="margin:-6px 0 0 0;">' :'';
		box +='<div id="icard_'+loop[i].uid+'" class="iMin">' +
			'<div class="iMin2">'+
			'<div class="photoInterview">'+
			'<img src="'+loop[i].img+'" width="100%" class="profile_photo"></div>'+
			(loop[i].sum!=0 ? '<div><a href="/u/'+loop[i].name+'/'+grpOp+'/" class="isTitlePot">' +loop[i].fname+' ('+loop[i].sum+') ['+loop[i].uid+']'+
			'</a></div>' : '<div class="isTitlePot">'+loop[i].fname+'</div>')+
			'<div class="boxesPositionPot">'+
			(flag1+flag2!="" ? '<div class="flagInterviewStat1" style="background-color:#3e466b;">'+flag1+' '+flag2+'</div>':"")+
			'</div></div>' +
			'<div class="potentialTextTopCon1">'+
			'<div class="potentialTextTit" style="font-weight:bold;" id="buscat_'+loop[i].uid+'"></div> '+(loop[i].size!=0 ? '('+G.companysize[loop[i].size]+')':'')+
			'<div class="potentialTextTit" style="font-style:italic;">'+(loop[i].city!=0 ? G.locationbyid[loop[i].city].c+' - '+G.locationbyid[loop[i].city].p:'')+'</div>'+(d.certified== -1 && [3,6].includes(loop[i].certifiedF) ? '':'<ul class="hideSrFreePotentials" style="'+(blocked ? 'color: #bd2230 !important;':'color: #65b452 !important;')+'"><li id="block_'+loop[i].uid+'_'+(blocked ? 1 :0)+'" class="'+(blocked ? "potentialLock":"potentialUnlock")+'" onclick="s.pop(this)" title="'+(blocked ? dic.LINK_SEVERED:dic.LINK_ACCEPTED)+'">'+(blocked ? dic.LINK_SEVERED:dic.LINK_ACCEPTED)+'</li></ul>')+
			'</div><div class="potentialTextTop"><span id="subtext'+loop[i].uid+'" class="potentialTextTopCon" style="display:none">'+(cond1!="" ? cond1: (cond2!='' ? cond2 : cond4))+'</span>'+
			'<span id="text'+loop[i].uid+'" class="potentialTextTopCon">'+cond+'</span><span class="potentialTextTopCon" style="color:#be1e2d;">'+cond5+'</span></div></div>';
	}
	var actual_potential=d.actual_potential;
	var certified_only=d.certified==1 ? 0 :d.cfilter;
	 if(d.certified==1){x('#potential_certifiedOnly').hide();}
	x('#actual_potentiala').html(actual_potential+d.agents);
	var totals={
		total_counter: d.counter,
		total_blocked: d.blocked,
		certified_only: certified_only,					
		actual_potentialb: actual_potential,
		certifiedBlocked: d.certifiedBlocked,
		agents: d.agents,
		allblocked:d.allblocked
	};
	for (j in totals){
		$('#'+j).text(totals[j]);
	}
	var input_province=$('#potential_province').val();
	var totals2=ses('potential_totals'+G.id);
	var cookie_province=s.coo('potential_province');
	if(ses('potential_cv')!=G.id){
		ses.del('potential_totals'+G.id)
		x('#potential_province').val('');
	}
	if(input_province==''){
		ses('potential_totals'+G.id,JSON.stringify(totals));
	}else{
		var totals2=JSON.parse(totals2);
		for (var j in totals2){
			$('#'+j+'2').text(totals2[j]);
		}
	}            
	if(my.grp==1 && !s.coo('affiliate')){ 
	x('#ddc_text').show();
	}
	}else{
	box +='<div class="setboxmesnores">'+dic.NO_RESULTS_FOUNDPOT+'</div>';
	}
	console.log(d.counter)
	x('#wrapper1').html(box);
	pagination(page,d.res_counter,10);
	x('#speedloaderCon').hide();
	},'json');
}
function potlist(param){
if (param !='hide-loader'){
console.log('get potential table loading from db','white','red');
}
xget({a: 'home_employee'},function(res){
var obj ={},cvhtml='',cvs=res.cvs,method,sum=0;
for (var i in cvs){
	console.log(cvs)
method=res.tobesaved.includes(cvs[i].id)
	? (res.pot_save_method=="auto"
		? '<span id="loader'+cvs[i].id+'" class="loaderSmTb">...'+dic.UPDATING+'</span>'
		: (!s.coo('prevent_reload'+cvs[i].id) ? '<span id="loader'+cvs[i].id+'" style="display:none" class="loaderSm"></span>'+
		'<button onclick="potreload('+cvs[i].id+')" class="but11">'+dic.UPDATE+'</button>':''))
	: '';
var certimg='certifyCvSm'+(cvs[i].is_certified=='EXPIRED' ? 'off':'')+'_'+my.lang+'.png';
cvhtml='<tr><td scope="col" style="text-align:left;max-width:160px;">' +
	(cvs[i].is_certified!="NO" ? '<img src="/img/general/'+certimg+'"+ width="100%" class="certifyCv2" onclick="s.pop(this)" data-title="'+dic.PROFILE_CERTIFIED+'">' : "") +
	'EP'+cvs[i].ep+': <strong><a href="/u/'+my.name+'/cv/'+cvs[i].id+'">'+cvs[i].title+'</a></strong></td>' +
	'<td colspan="5" scope="col">'+(cvs[i].pot_access==1 ? cvs[i].des_count : '-')+'</td>' +
	'<td scope="col" class="loadTd">'+(cvs[i].pot_access==1 || cvs[i].pot_access==4 ? method+'<span class="cvId" id="cv'+cvs[i].id+'">'+(cvs[i].agent_link=="1" ? (cvs[i].pot+parseInt(G.a.user2_agents)): cvs[i].pot)+'</span>' : '-')+'</td>' +
	'<td scope="col">' +
	(cvs[i].pot_access==1
			? '<button onclick="viewpot('+ cvs[i].id+')" class="but127">'+dic.VIEW+'</button>'
			: (cvs[i].pot_access==2 ? dic.PUBLISH_VIEW_NO : (cvs[i].pot_access==3 ? '<span class="red" style="font-style:italic;">'+dic.INCOMPLETE+'</span>' : '<span class="red" style="font-style:italic;">0</span>'))
	)
	+ '</td></tr>';
$('#wrapperpot').append(cvhtml);
if (res.pot_save_method=="auto"){
	console.log(res.tobesaved)
	console.log(cvs[i].id)
	if (param =='save' && res.tobesaved.includes(cvs[i].id)){obj.cv=cvs[i].id;savePotential(obj);}
}
sum += parseInt(cvs[i].pot);
$('.potentialCounter').html(sum);
local('potentialCounter',sum);
$('#potentialCounter').html('<em class="c_Top cblue">'+sum+'</em>');
if (i < cvs.length - 1 || cvs.length <= 1){
   $('#sumLoader').css('display','none');
}
}
if (i < cvs.length - 1 || cvs.length <= 1){
x('#sumLoader').css('display','none');
}
if (cvs.length < 3 && my.province!=0){
$('.homeMes2').prepend('<div class="fillInLoc3"><div class="notePreference"><span class="notePreferenceText">'+dic.MAXIMIZE_CHANCES+'</span></div><button id="newprofile" class="but109" onclick="s.pop(this)" data-original-title="'+dic.EMPLOYMENT_PROFILE_CVNEW+'">'+dic.EMPLOYMENT_PROFILE_CVNEW+'</button></div><div class="setBoxBotHb"><div class="setBoxBotH1b"><div class="setBoxBotH2"></div></div></div>');
}
},'json');
}
function get_potential(cv,pot,agent_link){
if (x('#loader'+cv).length>0){
x('#loader'+cv).css('display',"none");
}
if(G.uname=='potential'){
location.reload()
}else{
if (x('#cv'+cv).length>0){
	x('#cv'+cv).innerHTML=(agent_link=="1" ? parseInt(pot)+parseInt(G.a.user2_agents) :parseInt(pot));
}
}
console.log("closed POTENTIAL loader of cv:"+cv,'white','green');
}
function select_button(obj){
for(var i in pfilters){
	if(obj.id==pfilters[i]){
		$(obj).css({'background':'none','color':'#ba222e'});
	}else{
		$('#'+pfilters[i]).css({'background':'none','color':'#6b6b6b','padding': ''});
		s.coodel(pfilters[i]);
	}
}
if(obj.id=='potential_unblocked2' || obj.id=='potential_unblocked'){
	x('.but126').css('display','block');
	x('#reload'+G.id).show();
}else{
	x('#reload'+G.id).hide();
	x('.but126').css('display','none');
}
s.coo(obj.id,1);
s.coo('potential_page',1);
reset('wrapper1');
potloop(G.id)
}
function savePotential(obj){
	console.log("POTENTIAL saving cv:"+obj.cv)
	$.post("/ajax.php",{a: 'save_potential',b: obj.cv},function(res){
	console.log(res);	
	//var res=e.data;
	if (res !='NO'){
		console.log("POTENTIAL reloading cv:"+res.id)
		get_potential(res.id,res.pot,res.agent_link);
		if (obj.param=='update'){
			var second=G.uname=='potential' ? parseInt(x('#actual_potentiala').html()) : parseInt(x('#cv'+obj.cv).html());
			if(G.uname!='potential'){
				location.reload()
			}
			x('#reload'+obj.cv).hide();
		}
	} else {
		console.log('mistake');
	}
	},'json');
}
function potreload(id){	
s.coo('prevent_reload'+id,180);
$('#loader'+id).show();
var obj={};
obj.cv=id;
obj.first=G.uname=='potential' ? parseInt(x('.potential_counter').text()) : parseInt(x('#cv'+id).text());
obj.param='update';
savePotential(obj);
}

function viewpot(id){	
if(my.expires < time()){
s.confirm(dic.SUSPENDED_ACCOUNT3,function(res){if(res){
	location.href=SITE_URL+'u/'+my.name+'/upgrade';}
	})
}else{
s.coo('potential_unblocked2',1);location.href='/potential?id=' +id;
}	 
}
//pagination event
$(document)
.on('change',"#potential_order",function (){
s.coo(this.id,this.value);
s.coo('potential_page',1);
reset('wrapper1');
potloop(G.id)
})
.on('change',"#potential_province",function (){
if(this.value==0){
	s.coodel('potential_province');
}else {
	s.coo(this.id,this.value);
}
s.coo('potential_page',1);
$('.potentialCounter2').text('');
reset('wrapper1');
potloop(G.id)
})
//******************************************STORE******************************/
$(document)
/*service type 1 ---renew certification*/
.on("change keyup","#quantity10,#quantity17,#quantity4,#quantity12,#quantity14",function(){
var service=this.id.replace('quantity','');
var val=parseInt(this.value);		
var get={4:"#buy_newpost",10:"#buy_newoffer",12:"#buy_newprop",14:"#buy_newproplease"}
if(val >0){
if(service==17){
var minquantity= parseInt($('#quantity17').prop('min'));
var newquantity= val - minquantity;
var newquantityprice=newquantity * parseFloat(G.is.priceperauthor);
var expiredquantity=minquantity * parseFloat(G.is.priceperexpiredauthor);
var price=newquantityprice+expiredquantity;
var tprice= price+(price*parseFloat(G.is.vat));				
$('#rprice'+service).val(price)
$('#rtprice'+service).val(tprice)
$('#buy_17').attr('totalprice',tprice.toFixed(2))
}else{
var price= parseFloat($('#rprice'+service).val())*this.value;
var tprice= parseFloat($('#rtprice'+service).val())*this.value;				
}
x('#price'+service).text(price.toFixed(2));
x('#tprice'+service).text(tprice.toFixed(2));		
x(get[service]).attr('totalprice',tprice.toFixed(2));
}		
})	
.on("click","#renew_submit,button[id^='store_agentrenew']",function(){
	if(this.id=='renew_submit'){
	var uid=my.uid;
	}else {
	var uid=this.id.replace('store_agentrenew','');
	}
	location.href='/u/'+my.name+'/services?page=1&uid='+uid;
})
.on("click","button[id^='agentrenew']",function(){
	console.log('agentrenew')
	var id=this.id;
	var uid=this.id.replace('agentrenew','');
	var totalprice= parseFloat(this.getAttribute('totalprice'));
	var orderid=hash()+time();
	var desc=G.services[1]['title_'+LANG];
	var service=1;
	var status= totalprice > 0 ? 3 : 1;
	var payMethod= $("input[name='payMethod']").val();
	var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
	var params=my.grp==1
	?  {a:'cert_renewAB',status:status,price:totalprice,payment_type:payment_type,transaction:orderid,description:desc}
	: {a: 'cert_renew_agentAB',b: uid,status: status,price: totalprice,payment_type: payment_type,transaction:orderid,orderid: orderid,description: desc};
	if(totalprice > 0){
	var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
	checkout.service=1,checkout.uid=uid,checkout.price=totalprice,
	checkout.orderAmount=totalprice,checkout.payMethod=payMethod,
	checkout.orderid=orderid,checkout.orderDesc=desc,checkout.payment_type=payment_type,checkout.transaction=orderid;
	checkout.redirect="/u/"+my.name+"/services?page=payments";
	s.coo('checkout',JSON.stringify(checkout));
	x('#checkout').html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>').show();
	}else{
	xget(params,function(data){if (data=='nobank'){	
		api.ma.my('get',my,['user','aff','affee','certs','agentdata']);	  	  
		s.notify('good',dic.RENEW_CERTIFICATION_SUBMITTED);
		window.setTimeout(()=>{location.reload();},5000);
		} else {s.notify('warn',dic.ERROR);}})
	}
})
/*service type 2 ---newjob submit*/
.on("click","#newjob_submit",function(){
var service= 2;
var renew_val= $('#renew_pay').val();
var renew_val_hint= renew_val==1 ? dic.CHECK_OUT_BANK : dic.PAID_BY_AGENT;
var jobid= $('#job').val();
var totalprice= parseFloat(this.getAttribute('totalprice'));
var orderid=hash()+time();
var desc=G.services[2]['title_'+LANG];
var status= totalprice > 0 && my.agentdata.collect_money=='1' ? 3 : 1;
var payMethod= $("input[name='payMethod']").val();
var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
var params={a:'newjob_submitAB',b:service,c:jobid,status:status,price:totalprice,payment_type:payment_type,orderid:orderid,
description:desc};
if(totalprice > 0 && my.agentdata.collect_money=='1'){
var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
checkout.service=2,checkout.uid=my.uid,checkout['grp']=my.grp,checkout.price=totalprice,
checkout.orderAmount=totalprice,checkout.payMethod=payMethod,checkout.orderid=orderid,checkout.orderDesc=desc,
checkout.payment_type=payment_type,checkout.transaction=orderid,checkout.redirect="/u/"+my.name+"/services?page=payments";
s.coo('checkout',JSON.stringify(checkout));
$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
}else {
$.post("/ajax.php",params,function(data){if (data =='nobank'){
	s.notify('good',"New job service exchange successfull");
	api.ma.my('get',my,['user','aff','affee','certs','agentdata']);	
	api.ma.my('get',my.agent,['agentdata']);		
	window.setTimeout(()=>{location.reload();},5000);	
	} else {s.notify('warn',dic.ERROR);}	
})
}
})
/*service type 3---collect 1/2*/
.on("click","button[id^='payService']",function(){
var jobid=this.id.replace('payService','');
var totalprice= this.getAttribute('totalprice');
var orderid=hash()+time();
var desc=G.services[3]['title_'+LANG];
var service=3;
var status= totalprice > 0 ? 3 : 1;
var payMethod= $("input[name='payMethod']").val();
var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
var params={a: 'pay_collect_serviceAB',b: jobid,status: status,price: totalprice,payment_type:payment_type,orderid:orderid,
description:desc};
if(totalprice > 0){
var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
checkout.service=3,checkout.uid=my.uid,checkout['grp']=my.grp,checkout.price=totalprice,checkout.jobid=jobid,
checkout.orderAmount=totalprice,checkout.payMethod=payMethod,checkout.orderid=orderid,checkout.orderDesc=desc,
checkout.payment_type=payment_type,checkout.transaction=orderid,checkout.redirect="/u/"+my.name+"/services?page=payments";
s.coo('checkout',JSON.stringify(checkout));
$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
}else{
xget(params,function(data){
	if (data =='nobank'){
	s.notify('good',"New job service exchange successfull");
	api.ma.my('get',my,['agentdata']);
	window.setTimeout(()=>{location.reload();},5000);
	}else{s.notify('warn',dic.ERROR);}
})
}
})
/*service type 4--- new post*/
//new add paid new notice paid
.on('click',".newadPaid,.newnoticePaid",function(){
	var type= this.className.includes('newadPaid') ? 'ad':'notice';
	location.href='/u/'+my.name+'/services?page=4&type='+type;
})
.on('click',".newadPaidsubmit,.newnoticePaidsubmit",function(){
	var hint= this.className.includes('newadPaidsubmit') ? dic.BILLING_FORM_NEW_ADV : dic.BILLING_FORM_NEW_NOTICE;
	var product= this.className.includes('newadPaidsubmit') ? 'Ad' : 'Notice';
	if(my.expires < time()){
	location.href= "/u/"+my.name+"/upgrade";
	}else{
	var totalprice= parseFloat(this.getAttribute('totalprice'));
	var orderid=hash()+time();
	var desc=G.services[4]['title_'+LANG];
	var service=4;
	var redirect='/u/'+my.name+'/post';
	var status= totalprice > 0 ? 3 : 1;
	var quantity= x("#quantity4").val();
	var payMethod= x("input[name='payMethod']").val();
	var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
	var params= {a: 'buy_postAB',status:status,price:totalprice,payment_type:payment_type,orderid:orderid,description:desc}
	if(totalprice > 0){
		var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
		checkout.service=4,checkout.uid=my.uid,checkout['grp']=my.grp,checkout.price=totalprice,checkout['weight']=quantity,
		checkout.orderAmount=totalprice,checkout.payMethod=payMethod,checkout.orderid=orderid,checkout.orderDesc=desc,
		checkout.payment_type=payment_type,checkout.transaction=orderid,checkout.redirect=redirect;
		s.coo('checkout',JSON.stringify(checkout));
		$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
	}else{
		$.post("/ajax.php",params,function(data){
			if (data =='nobank'){
				s.notify('good',"New job service exchange successfull");	
				api.ma.my('get',my,['user']);
				window.setTimeout(()=>{location.href=redirect;},5000);
			} else {s.notify('warn',dic.PROBLEM_INSERTING_NEW_AD)}
		})
	}
	}
})
/*service type 5,6,7*/
.on("click","button[id^='proposalBut']",function(){
var exp=explode('_',this.id),pstatus=exp[1],service=exp[2],hint={1: dic.PROPOSAL_ACCEPTED,2: dic.YOU_REQUESTED_NEW_AGENT,3: dic.REQUEST_CANCELLED},
collect= this.getAttribute('collect'),totalprice= parseFloat(this.getAttribute('totalprice')),orderid=hash()+time(),desc=G.services[exp[2]]['title_'+LANG];
var status= totalprice > 0 && collect=='1' ? 3 : 1;
var payMethod=x("input[name='payMethod']").val();
var payment_type=typeof(payMethod) !='undefined' ? payMethod : '';
var params={a: 'serviceAB',b: pstatus,c: service,status: status,price: totalprice,payment_type: payment_type,orderid: orderid,description: desc};
console.log(params)
if (totalprice > 0  && collect=='1'){
var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
checkout.service=service;
checkout.uid=my.uid;
checkout.grp=my.grp;
checkout.price=totalprice;
checkout.orderAmount=totalprice;
checkout.payMethod=payMethod;
checkout.orderid=orderid;
checkout.orderDesc=desc;
checkout.payment_type=payment_type;
checkout.transaction=orderid;
checkout.redirect="/u/"+my.name+"/agent";
console.log(checkout)
s.coo('checkout',JSON.stringify(checkout));
$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
} else {
xget(params,function(data){	if (data =='nobank'){		
	api.ma.my('get',my,['agentdata','user','affee']);
	api.ma.my('get',my.aff.uid2,['agentdata','caff']);
	window.setTimeout(()=>{location.reload();},5000);	
	} else {s.notify('warn',dic.ERROR);	}
});
}
})
//service 8
.on("click","#buy_activesearch",function(){
var totalprice= this.getAttribute('totalprice');
var orderid=hash()+time();
var desc=G.services[8]['title_'+LANG];
var service=8;
var status= totalprice > 0 ? 3 : 1;
var payMethod=$("input[name='payMethod']").val();
var payment_type=typeof(payMethod) !='undefined' ? payMethod : '';
var params={a: 'buy_activesearchAB',b: my.uid,status: status,price: totalprice,payment_type: payment_type,orderid: orderid,description: desc}
if (totalprice > 0){
var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
checkout.service=service;
checkout.uid=my.uid;
checkout.grp=my.grp;
checkout.price=totalprice;
checkout.orderAmount=totalprice;
checkout.payMethod=payMethod;
checkout.orderid=orderid;
checkout.orderDesc=desc;
checkout.payment_type=payment_type;
checkout.transaction=orderid;
checkout.redirect="/u/"+my.name+"/services?page=payments";
s.coo('checkout',JSON.stringify(checkout));
$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
} else {
xget(params,function(data){
	if (data =='nobank'){
		api.ma.my('get',my,['agentdata']);
		window.setTimeout(()=>{location.reload();},5000);
	} else {
		s.notify('warn',dic.ERROR);
	}
})
}
})
/*SERVICE 9*/
.on("click","#buy_eoi",function(){
var totalprice= this.getAttribute('totalprice');
var orderid=hash()+time();
var desc=G.services[9]['title_'+LANG];
var service=9;
var status= totalprice > 0 ? 3 : 1;
var payMethod=$("input[name='payMethod']").val();
var payment_type=typeof(payMethod) !='undefined' ? payMethod : '';
var params={a: 'buy_EOI',b: my.uid,status: status,price: totalprice,payment_type: payment_type,orderid: orderid,description: desc}
if (totalprice > 0){
var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
checkout.service=service;
checkout.uid=my.uid;
checkout['grp']=my.grp;
checkout.price=totalprice;
checkout.orderAmount=totalprice;
checkout.payMethod=payMethod;
checkout.orderid=orderid;
checkout.orderDesc=desc;
checkout.payment_type=payment_type;
checkout.transaction=orderid;
checkout.redirect="/u/"+my.name+"/services?page=payments";
s.coo('checkout',JSON.stringify(checkout));
$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
} else {
$.post("/ajax.php",params,function(data){	if (data.trim() =='nobank'){	
	api.ma.my('get',my,['user','mship']);
	api.ma.N('get',my,['cont','eoi']);
	s.notify('good',"Service 9 - Buy eoi exchange successfull");
	window.setTimeout(()=>{location.reload();},5000);	
		location.reload();	
		} else {
		s.notify('warn',dic.ERROR);	}
})
}
})
/*service type 10--- new offer*/
.on('click',"#buy_newoffer",function(){
var totalprice= parseFloat(this.getAttribute('totalprice'));
var quantity= $("#quantity10").val();
var orderid=hash()+time();
var desc=G.services[10]['title_'+LANG];
var service=10;
var redirect='/u/'+my.name+'/offer';
var status= totalprice > 0 ? 3 : 1;
var payMethod= $("input[name='payMethod']").val();
var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
var params= {a:'buy_offerAB',status:status,price:totalprice,payment_type:payment_type,orderid:orderid,description:desc}
if(totalprice > 0){
var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
checkout.service=10;
checkout.uid=my.uid;
checkout['grp']=my.grp;
checkout.price=totalprice;
checkout['weight']=quantity;
checkout.orderAmount=totalprice;
checkout.payMethod=payMethod;
checkout.orderid=orderid;
checkout.orderDesc=desc;
checkout.payment_type=payment_type;
checkout.transaction=orderid;
checkout.redirect=redirect;
s.coo('checkout',JSON.stringify(checkout));
$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
}else {
$.post("/ajax.php",params,function(data){if (data =='nobank'){
	api.ma.my('get',my,['user','agentdata']);
	s.notify('good',"Service 10 - New offer exchange successfull");
	
	location.href=redirect;
	} else {s.notify('warn',dic.PROBLEM_INSERTING_NEW_AD)}
})
}
})
/*service type 11--- golden offer*/
.on('click',"#buy_goldenoffer",function(){
var totalprice= parseFloat(this.getAttribute('totalprice'));
var orderid=hash()+time();
var desc=G.services[11]['title_'+LANG];
var service=11;
var redirect='/u/'+my.name+'/offer';
s.coo('checkout',JSON.stringify({orderDesc:desc,orderAmount:totalprice,uid:my.uid,service:service}))
var status= totalprice > 0 ? 3 : 1;
var payMethod= $("input[name='payMethod']").val();
var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
var params= {a: 'buy_goldenofferAB',status:status,price:totalprice,payment_type:payment_type,orderid:orderid,description:desc}
if(totalprice > 0){
var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
checkout.service=11;
checkout.uid=my.uid;
checkout.grp=my.grp;
checkout.price=totalprice;
checkout.orderAmount=totalprice;
checkout.payMethod=payMethod;
checkout.orderid=orderid;
checkout.orderDesc=desc;
checkout.payment_type=payment_type;
checkout.transaction=orderid;
checkout.redirect=redirect;
s.coo('checkout',JSON.stringify(checkout));
$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
}else {
$.post("/ajax.php",params,function(data){if (data =='nobank'){	                
	api.ma.my('get',my,['user']);
	s.notify('good',"Service 11 - New golden offer exchange successfull");
	window.setTimeout(()=>{location.href=redirect;},5000);		
	} else {s.notify('warn',dic.PROBLEM_INSERTING_NEW_AD)}
})
}
})
/*service type 12/type 14--- new property*/
.on('click',"#buy_newprop,#buy_newproplease",function(){
var service= this.id=="buy_newproplease" ? 14:12;
var quantity= $("#quantity"+service).val();
var totalprice= parseFloat(this.getAttribute('totalprice'));
var orderid=hash()+time();
var desc=G.services[service]['title_'+LANG];        
var redirect='/u/'+my.name+'/property';
var status= totalprice > 0 ? 3 : 1;
var payMethod= $("input[name='payMethod']").val();
var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
var params={a:'buy_propAB',status:status,service:service,price:totalprice,payment_type:payment_type,orderid:orderid,description:desc}
if(totalprice>0){
	var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
	checkout.service=service;
	checkout.uid=my.uid;
	checkout.grp=my.grp;
	checkout.price=totalprice;
	checkout.weight=quantity;
	checkout.orderAmount=totalprice;
	checkout.payMethod=payMethod;
	checkout.orderid=orderid;
	checkout.orderDesc=desc;
	checkout.payment_type=payment_type;
	checkout.transaction=orderid;
	checkout.redirect=redirect;
	s.coo('checkout',JSON.stringify(checkout));
	$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
}else {
	$.post("/ajax.php",params,function(data){
		if (data =='nobank'){
			api.ma.my('get',my,['user']);
			s.notify('good',"Service "+service+" - "+desc+" exchange successfull");
			window.setTimeout(()=>{location.href=redirect;},5000);				
		} else {
			s.notify('warn',dic.PROBLEM_INSERTING_NEW_AD)
		}
	})
}
})
/*service type 13--- golden prop*/
.on('click',"#buy_goldenprop",function(){
if(parseInt(my.expires) < time()){
location.href= "/u/"+my.name+"/upgrade";
}else {
var totalprice= parseFloat(this.getAttribute('totalprice'));
var orderid=hash()+time();
var desc=G.services[13]['title_'+LANG];
var service=13;
var redirect='/u/'+my.name+'/property';
var status= totalprice > 0 ? 3 : 1;
var payMethod= $("input[name='payMethod']").val();
var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
var params= {a: 'buy_goldenpropAB',status:status,price:totalprice,payment_type:payment_type,orderid:orderid,description:desc}
if(totalprice > 0){
	var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
	checkout.service=13;
	checkout.uid=my.uid;
	checkout['grp']=my.grp;
	checkout.price=totalprice;
	checkout.orderAmount=totalprice;
	checkout.payMethod=payMethod;
	checkout.orderid=orderid;
	checkout.orderDesc=desc;
	checkout.payment_type=payment_type;
	checkout.transaction=orderid;
	checkout.redirect=redirect;
	s.coo('checkout',JSON.stringify(checkout));
	$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
}else {
	$.post("/ajax.php",params,function(data){	if (data =='nobank'){	
	api.ma.my('get',my,['user']);
	s.notify('good',"Service 11 - New golden property exchange successfull");
	window.setTimeout(()=>{location.href=redirect;},5000);	
			} else {
			s.notify('warn',dic.PROBLEM_INSERTING_NEW_AD)		}
	})
}
}
})
/*service type 15---propbitlease*/
.on('click',"#buy_propbitlease",function(){
var totalprice= parseFloat(this.getAttribute('totalprice'));
var orderid=hash()+time();
var desc=G.services[15]['title_'+LANG];
var service=15;
var redirect='/u/'+my.name+'/offer';
s.coo('checkout',JSON.stringify({orderDesc:desc,orderAmount:totalprice,uid:my.uid,service:service}))
var status= totalprice > 0 ? 3 : 1;
var payMethod= $("input[name='payMethod']").val();
var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
var params= {a: 'buy_propbitleaseAB',status:status,price:totalprice,payment_type:payment_type,orderid:orderid,description:desc}
if(totalprice > 0){
var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
checkout.service=15;
checkout.uid=my.uid;
checkout['grp']=my.grp;
checkout.price=totalprice;
checkout.orderAmount=totalprice;
checkout.payMethod=payMethod;
checkout.orderid=orderid;
checkout.orderDesc=desc;
checkout.payment_type=payment_type;
checkout.transaction=orderid;
checkout.redirect=redirect;
s.coo('checkout',JSON.stringify(checkout));
$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
}else {
$.post("/ajax.php",params,function(data){if (data =='nobank'){
	api.ma.my('get',my,['user']);
	window.setTimeout(()=>{location.href=redirect;},5000);	
	} else {s.notify('warn',dic.PROBLEM_INSERTING_NEW_AD)}
})
}
})
/*service type 16---propbitsale*/
.on('click',"#buy_propbitsale",function(){
var totalprice= parseFloat(this.getAttribute('totalprice'));
var orderid=hash()+time();
var desc=G.services[16]['title_'+LANG];
var service=16;
var redirect='/u/'+my.name+'/offer';
s.coo('checkout',JSON.stringify({orderDesc:desc,orderAmount:totalprice,uid:my.uid,service:service}))
var status= totalprice > 0 ? 3 : 1;
var payMethod= $("input[name='payMethod']").val();
var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
var params={a:'buy_propbitsaleAB',status:status,price:totalprice,payment_type:payment_type,orderid:orderid,description:desc}
if(totalprice > 0){
var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
checkout.service=16;
checkout.uid=my.uid;
checkout.grp=my.grp;
checkout.price=totalprice;
checkout.orderAmount=totalprice;
checkout.payMethod=payMethod;
checkout.orderid=orderid;
checkout.orderDesc=desc;
checkout.payment_type=payment_type;
checkout.transaction=orderid;
checkout.redirect=redirect;
s.coo('checkout',JSON.stringify(checkout));
$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
}else{
	console.log(params);
$.post("/ajax.php",params,function(data){	
	if(data =='nobank'){		
	api.ma.my('get',my,['user']);
	window.setTimeout(()=>{location.href=redirect;},5000);	
	}else{
	s.notify('warn',dic.PROBLEM_INSERTING_NEW_AD)
	}
})
}
})
/*service type 17--- add author*/
.on('click',"#buy_17",function(){
var desc=$('#description17').val();
var totalprice= parseFloat(this.getAttribute('totalprice'));
var orderid=hash()+time();
var service=17;
var newlocation='/u/'+my.name+'/membership';            
var status= totalprice > 0 ? 3 : 1;
var quantity= $("#quantity17").val();
var payMethod= $("input[name='payMethod']").val();
var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
var params= {a: 'buy_17',status:status,price:totalprice,payment_type:payment_type,orderid:orderid,orderDesc:desc,weight:quantity}
if(totalprice > 0){
var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
checkout.service=17,checkout.uid=my.uid,checkout.grp=my.grp,checkout.price=totalprice,checkout.weight=quantity,
checkout.orderAmount=totalprice,checkout.payMethod=payMethod,checkout.orderid=orderid,checkout.orderDesc=desc,
checkout.payment_type=payment_type,checkout.transaction=orderid,checkout.redirect=newlocation;
s.coo('checkout',JSON.stringify(checkout));
$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
}else {
$.post("/ajax.php",params,function(data){	if (data =='nobank'){	
	api.ma.my('get',my,['user'],d=>{
	s.notify('good',"Service 17 - Author pack exchange successfull");
	location.href=newlocation	
	});	
	} else {s.notify('warn',dic.PROBLEM_INSERTING_NEW_AD)}
})
}
})
/*service type 18---propbitsale*/
.on('click',"#buy_loan",function(){
var totalprice= parseFloat(this.getAttribute('totalprice'));
var quantity= parseInt($('#quantity18').val());
var orderid=hash()+time();
var desc=G.services[18]['title_'+LANG];
var service=18;
var redirect='/u/'+my.name+'/loan';
s.coo('checkout',JSON.stringify({orderDesc:desc,orderAmount:totalprice,uid:my.uid,service:service}))
var status= totalprice > 0 ? 3 : 1;
var payMethod= x("input[name='payMethod']").val();
var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
var params= {a: 'buy_loan',status:status,price:totalprice,payment_type:payment_type,orderid:orderid,description:desc}
if(totalprice > 0){
var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
checkout.service=18;
checkout.uid=my.uid;
checkout['grp']=my.grp;
checkout.price=totalprice;
checkout['weight']=quantity;
checkout.orderAmount=totalprice;
checkout.payMethod=payMethod;
checkout.orderid=orderid;
checkout.orderDesc=desc;
checkout.payment_type=payment_type;
checkout.transaction=orderid;
checkout.redirect=redirect;
s.coo('checkout',JSON.stringify(checkout));
$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
}else {
$.post("/ajax.php",params,function(data){	if (data =='nobank'){	
	window.setTimeout(()=>{location.href=redirect;},5000);
	
	} else {
		s.notify('warn',dic.PROBLEM_INSERTING_NEW_AD)	}
})
}
})
.on("keyup change","select[id^='storeimg'],textarea[id^='storedesc'],input[id^='storetitle'],input[id^='storeprice'],input[id^='storequantity'],select[id^='storestatus']",function(){
var exp= explode('_',this.id);
var val=this.value;
var b=exp[0].replace('store','');
var c=exp[1].replace('store','');
var params={a:'admin',b:b,c:c,d:val.trim()}
xget(params,function(res){
if(exp[0]=='img'){$('#imgs_'+exp[1]).attr('src',val);}
})
})	
//upgrade membership
.on("click","#membership_upgrade_submit",function(){
this.style.display='none';
var pack=$("input[name=packs]:radio:checked").val();
var membership=$("#mship"+pack).val();
var agentype=$("input[name=packs]:radio:checked").attr('agentype');
var option= $('#mshipOption'+membership).text();
var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
var orderAmount= checkout.orderAmount;
var payMethod= $("input[name='payMethod']").val();
var orderid=hash()+time();
var orderDesc= checkout.orderDesc;
var price=  !orderAmount ? 0.00 : orderAmount;
var payment_type=  typeof(payMethod) !='undefined' ? payMethod : '';
var transaction=  typeof(orderid) !='undefined' ? orderid : '';
var packs=$("input[name^='packs']:checked").val();
var description=  typeof(orderDesc) !='undefined' ? orderDesc : $('#packOption'+packs).text();
var status= price > 0 ? 4 : 1;
var param= {a:'membership_AB',b:parseInt(membership),c:parseInt(pack),d:status,price:price,payment_type:payment_type,transaction:transaction,description:description};

if(checkout.orderAmount > 0){
var checkout=!s.coo('checkout') ? {} : JSON.parse(s.coo('checkout'));
checkout.service=0;
checkout.grp=my.grp;
checkout.price=orderAmount;
checkout.payMethod=payMethod;
checkout.orderid=orderid;
checkout.payment_type=payment_type;
checkout.transaction=orderid;
checkout.redirect="/u/"+my.name;
s.coo('checkout',JSON.stringify(checkout));
$('#checkout').show().html('<iframe scrolling="NO" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-scripts allow-popups allow-forms" style="width:100%;height:100%" frameBorder="0" name="alpha_iframe" src="'+SITE_URL+'public/checkout.php"></iframe>');
}else{

$.post("/ajax.php",param,function(data){
api.ma.my('get',my,["user","mship","agentdata","pack","packdetails","caff"]);
	if (data !='nobank' && data !='error'){		
		if (agentype =='3'){
			s.coo('affiliate',my.uid);
			s.coo('affiliate_grp',my.affiliate);
		}
		$('#readMembership').html(option);
		toggledit('#readMembership','#updateMembership');
		location.href="/u/"+my.name;
	} else if (status==2 && data.trim() =='nobank'){
	location.href="/u/"+my.name;
	} else {
		location.href="/u/"+my.name;
	}
})
}
})
//*****************************TKT***************************************/
function tktsend(){
	$('#tktSubmit').hide();
	var message =x("#messageText").val(),topic=x("#messageTopic").val(),
	name =my.grp==1 ? my.fname : my.official,code=my.code,type=x("#type").val(),               
	group=my.grp==1 ? "e":"r"+my.affiliate,json={topic:topic,request:message,reply:"",group:group,name:name,code:code,uid:my.uid,uid3:0,status:1,department:0,type:type,priority:0,category:0,read1:0,review:0,viewclicks:0,created:time(),gett:0,closed:0,duration:0};
	api.mo.ins("tkt",json,data=>{
		if (data!='NO'){
		s.notify('good',dic.SUP_MES_SUCCESFULLY_SENT+" with id "+data.insertedId);	
		api.ma.N('set',my,['mes'],res=>{location.href='/support/sent';});
		}else{s.notify('warn',dic.PROBLEM_SUP_MES);}
		});
}
//TOPIC
//new message
$(document).on("change","#strSortBy",()=>{s.coo('support',this.value);$('.settingBoxMessages').html('');tktloop();})
.on("click",'#tktSubmit',()=>{tktsend();})	
.on('click',"button[id^='favorite_']",function(){
	var th= $(this);		
	var postid= this.id.replace('favorite_','');
	if(!s.coo('sid')){
		s.modal(dic.COMPLETE_REGISTRATION_FORM_ACCESS_PAGE);
	}else{	
	xget({a:'favorite',b:postid},function(data){
		th.attr('class','goldFavoriteSearch')	
	});
	}
})

//MARK AS READ-UNREAD
.on("click","input[id^='mesid_']",function(){		
var Gmode=s.coo('mesmode');
var exp=explode('_',this.id);
if(G.uname=='support'){
	var tid=exp[1],read=exp[2]=='1'?'0':'1',
	readstatus=$(this).attr('status');
	api.mo.up("tkt",{_id: tid},{$set:{read1: read}},res=>{
		api.ma.N('set',my,['mes'],cache=>{
	if (readstatus=='unread'){
		x("#link"+tid).attr('class','messageMin'),this.style.backgroundColor='transparent',this.title=dic.MARK_AS_UNREAD;		
	} else {
		x("#link"+tid).attr('class','messageMinUnread'),this.style.backgroundColor='rgb(11,92,123)',this.title=dic.MARK_AS_READ;
	}	
	})
	})
}
});
function tktloop(){
var support='',page=!s.coo('page') ? 1: parseInt(s.coo('page')),count=parseInt(my.N["c_support_"+G.mode]),tktstatus={"closed": 0,"sent": 1},
criteria={status:tktstatus[G.mode],uid:my.uid,page:page,limit:20};
api.mo.get("tkt",criteria,function(data){	
console.log(data);	
if (count > 0){
	for (var i in data){				
		var readClass=data[i].read1==1 ? 'messageMin' : 'messageMinUnread';
		var readstatus=data[i].read1==1 ? 'read' : 'unread';
		var style=data[i].read1==1 ? '#FDFDFD' : '#E7F0F4';
		var readDot=data[i].read1==1 ? '' : 'background-color:#0B5C7B';
		var readTitle=data[i].read1==1 ? dic.MARK_AS_UNREAD : dic.MARK_AS_READ;
		support +='<div class="'+readClass+'" style="background-color:'+style+'" id="link'+data[i]._id+'" onclick="mesopen(&quot;'+data[i]._id+'&quot;)">'+
			'<input class="readMesS" status="'+readstatus+'" id="mesid_'+data[i]._id+'_'+data[i].read1+'" title="'+readTitle+'" style="'+readDot+'">' +
			'<div class="fromMesS">'+(G.mode =='closed' ? 'Customer Support' : dic.ME)+'</div>' +
			'<div class="topicMesS1">'+data[i]._id+'</div>' +
			'<div class="topicMesS">'+G.tkt_type[data[i].type]+'</div>' +
			'<div class="topicMesS2">'+data[i].topic+'</div>' +
			'<div class="dateMesS">'+date('Y-m-d',data[i].created)+' ('+timediff(data[i].created)+')</div></a></div>';
	}
	x('#wrapper1').html(support);pagination(page,count,20);	
} else {
	$('.settingBoxMessages').html('<div class="setboxmessupnores">'+dic.NO_RESULTS_FOUNDMES+'</div>');
}	
});
}
function tktget(){
	api.mo.getOne("tkt",{_id:G.id},data=>{
	console.log(data);
	//set category
	x('#topic').text(data.topic);
	x('#request').html(data.request);
	x('#reply').html(data.reply);
	x('.tktcreated').text(date('Y-m-d H:i',data.created));
	x('.name_message').html('<a href="' + G.URL_FILE + '?mid=' + data.uid + '">' + data.name + '</a>');
	x('#category').val(data.category);
	x('#gett').val(data.gett);
	x('#fn').val(data.name);
	x('#uid').val(data.uid);
	x('#category_label').text(G.help_categories[data.category]);
	x('#openerindex').text(G.help_categories[data.category] + ' Index');
	x('#chronotime').text(timediff(data.gett));
	x('#editt').val(data.editt);
	x('#editime').text(data.editt);
	x('#logo2').attr('src', data.img);
	x('.description_message').html(data.request);
  //  if (data.grp == 1) {
		x('#extrabutton').html("<button id='profred' style='display:none'>Professional Redirect</button>");
   // }
//api.mo.count("tkt",{status:0,uid:data.uid},(d)=>{x('#closed').text(d);})
//api.mo.count("tkt",{status:2,uid:data.uid},(d)=>{x('#pending').text(d);})
//api.mo.count("tkt",{status:0,uid:data.uid},(d)=>{x('#sent').text(d);})
//	s.cors(CONF.apimongourl + "tkt",{a:"count",status:0,uid:data.uid}, function (count) {x('#closed').text(count);})
//		s.cors(CONF.apimongourl + "tkt",{a:"count",status:2,uid:data.uid}, function (count) {x('#pending').text(count);})
//s.cors(CONF.apimongourl + "tkt",{a:"count",status:0,uid:data.uid}, function (count) {x('#sent').text(count);})
api.mo.get("tkt",{uid:data.uid},(res)=>{
var html='';
		for(var i in res){html +='<div class="memberHistoryText1b"><small>' +
		'<b>'+dic.DATE+': '+date('Y-m-d H:i',res[i].created)+'- '+dic.CODE+': '+res[i]._id+'</small></b>' +
			'<div class="ratingView"><div class="rateAll'+res[i].review+'"></div></div><br/>'+
		'<div style="width:100%;"><span style="color:red;">Q:&nbsp;</span>'+res[i].request+'</div>'+
		'<div style="width:100%;"><span style="color:green;">A:&nbsp;</span>'+res[i].reply+'</div>'+
		'</div>';
		}
		x('#div_user_history').html(html);
	})
});
}
//residency
$(document)
.on("click",'input[name=residency_local]',function(){
xget('?a=residency_local&b='+this.value);
if(['1','2','3','4','5'].includes(this.value)){x('#residency').css('display','none');}
var plocal= G.residency_local[this.value];        
	var cou= array_flip(G.countries);
	var where=my.residency!=0 ? cou[my.residency] : '';
	var append=['1','2','3','4','5'].includes(this.value) ? plocal : plocal+': '+where;
	x('#read_birth_country').text(plocal);
	x('#birth_countrybx').removeClass('lowop');        
})
.on('change','#residency',function(){
        var thisoption=$("#gender option[value='"+this.value+"']").text();
        xget('?a=residency&b='+this.value);
        var residency_local=$('input[name=residency_local]:radio:checked').val();
        var plocal= G.residency_local[residency_local];
        var cou= array_flip(G.countries);
        var where=cou[this.value];
        var append=['1','2','3'].includes(residency_local) ? plocal+' in Greece' : plocal+': '+where;
        x('#read_birth_country').text(append);
        toggledit('#read_birthCountryBox','#edit_birthCountryBox');
    })
	//gender
.on("change",'#gender',function(){
		var thisval=this.value;
		var thisoption=$("#gender option[value='"+thisval+"']").text();
		xget('?a=sex&b='+thisval);
		x('#readGender').text(thisoption);
       x('#sexbx').removeClass('lowop');
		toggledit('#readGender','#editGender');
	});	
/********************SEARCH SEND EOI***************************************/
const sf={	
	statefree:{type:'drop',col:'offer_state',list:array_flip(G.states),css:[]},
	post:{type:'text',col:'postid',css:[]},
	buscat:{type:'drop',col:'ur.buscat',list:array_flip(G.buscat),css:[]},
	buscatfree:{type:'drop',col:'ur.buscat',list:array_flip(G.buscat),css:[]},
	lastname:{type:'text',col:'ur_lastname',placeholder:dic.LASTNAME,css:[]},	
	post_title:{type:'text',col:'post_title',css:[]},
	what:{type:'text',col:'post_title',placeholder:dic.INSERT_TRADE_COMPANY,css:[]},
	where:{type:'text',col:'ur_city',css:[]},
	range_city:{type:'check',col:'post_city',css:[]},
	pcat:{datatype:"chain",fun:"pcat",params:["pcat1","pcat2","pcat3"]},
	location:{datatype:"chain",fun:"lochain",params:["state","province","city"]},
	locationb:{datatype:"chain",fun:"lochain",params:["stateb","provinceb","cityb"]},
	location4:{datatype:"chain",fun:"lochain",params:["state4","province4","city4"]},
	classification:	{datatype:"chain",fun:"classifchain",type:"drop",params:["classif","subclassif","spec"]},
	experience:{type:'checkbool',col:'post_experience',css:[]},
	classyears:{type:'drop',col:'post_years',css:[]},
	dexperience:{type:'checkbool',col:'post_dexperience',css:[]},	
	subsidy:{type:'checkbool',col:'cv_cert_subsidy_applicable',css:[]},
	agentcode:{type:'text',col:'ur_agentcode',css:[]},
	age:{type:'check',col:'ur_age',list:G.agerange_search,css:[]},
	ptype:{type:'check',col:'cv_type',list:G.post_jobtype,css:[]},
	salary:{type:'drop',col:'post_salary',list:G.salary,css:[]},
	lang:{type:'check',col:'person_lang',list:G.languages,css:[]},
	edu_type:{type:'drop',col:'person_education_type',css:[]},
	edu_insti:{type:'drop',col:'person_education_institution',list:G.education,css:[]},
	edu_level:{type:'drop',col:'edu_size',list:G.edu_level,css:[]},
	edu_grade:{type:'drop',col:'edu_grade',list:G.edu_grade,css:[]},
	expid:{type:'drop',col:'post_experience',list:G.buscat,css:[]},	
	expid2:{type:'drop',col:'exp_id2',placeholder:dic.INDUSTRYB2B,list:G.buscat,css:[]},
	size:{type:'check',col:'ur_size',list:G.companysize,css:[]},
	sex:{type:'check',col:'ur_sex',list:G.genders_search,css:[]},
	marital:{type:'drop',col:'ur_marital',list:G.marital,css:[]},
	link_network:{type:'check',col:'ur_link_network',css:[]},
	dbsize:{type:'checkbool',col:'cv_size_size',css:[]},
	expired:{type:'checkbool',col:'ur_expires',css:[]},
	unpublished:{type:'checkbool',col:'s_unpublished',css:[]},
	relevant:{type:'drop',col:'cv_relevant',list:G.relevant,css:[]},
	skills:{type:'drop',col:'cv_skills',list:G.allskills,css:[]},
	status:{type:'drop',col:'table_status',list:G.cvstatus,css:[]},
	relocate:{type:'checkbool',css:[]},
	mindeposit:{type:'checkbool',css:[]},
	lenderlegal:{type:'number',placeholder:"Lender",css:[]},
	coupontype:{type:'radio',col:'offer_coupontype',list:G.offer_coupontype,css:[]},
	extra:{type:'radio',col:'offer_offerextra',list:G.offer_extra,css:[]},
	certified:{type:'checkbool',col:'cv_cert',css:[]},
	salaryexp:{type:'drop',col:'cv_exp_salary',list:G.salary,css:[]},
	residency:{type:'drop',col:'ur_residency_local',list:G.residency_local,css:[]},
	military:{type:'drop',col:'ur_military',list:G.military,css:[]},
	hiring_time:{type:'check',col:'post_hiring_time',list:G.post_hiring_time,css:[]},
	lastlogin:{type:'radio',col:'ur_login',list:G.lastlogin,css:[]},
	tag:{type:'text',col:'offer_tags_tag',placeholder:dic.DESCRIPTIVE_KEYWORDS,css:[]},
	minprice:{type:'number',placeholder:dic.MINPRICE,col:'offer_price',css:[]},
	maxprice:{type:'number',placeholder:dic.MAXPRICE,col:'offer_price',css:[]},
	coupon:{type:'checkbool',col:'offer_coupon',css:[]},
	offermode:{type:'drop',col:'offer_mode',css:[]},	
	sprod:{type:'drop',col:'prop_sprod',placeholder:dic.OFFER_MODE,list:G.sprod,css:[]},
	offerprod:{type:'radio',col:'offerprod',placeholder:dic.OFFERTYPE,list:{3:dic.PROPERTY_SELLER,4:dic.PROPERTY_BUYER},css:[]},
	grp:{type:'check',col:'ur.grp',placeholder:dic.USERGROUP,list:{1:"INDIVIDUAL",2:"COMPANY"},css:[]},
	proprod:{type:'radio',col:'prop_sprod',list:G.proprod,css:[]},
	smode:{type:'check',col:'offer_smode',list:G.smode,css:[]},
	sload:{type:'check',col:'offer_sload',list:G.sload,css:[]},
	qlevel:{type:'drop',col:'offer_qlevel',list:G.post_education_types,css:[]},
	propgrp:{type:'drop',col:'prop_grp',placeholder:dic.PROPERTYPE,list:G.propgrp,css:[]},
	proptype:{type:'radio',col:'prop_type',list:G.proptype,css:[]},
	minbeds:{type:'number',placeholder:dic.MINBEDS,col:'prop_beds',css:[]},
	maxbeds:{type:'number',placeholder:dic.MAXBEDS,col:'prop_beds',css:[]},
	bath:{type:'drop',col:'prop_bath',list:G.bath,css:[]},
	car:{type:'drop',col:'prop_car',list:G.car,css:[]},
	land:{type:'number',placeholder:dic.LAND,col:'prop_land',css:[]},
	unit:{type:'number',placeholder:dic.UNIT,col:'prop_unit',css:[]},
	established:{type:'drop',col:'prop_established',list:G.established,css:[]},
	indoor:{type:'drop',col:'prop_indoor',list:G.indoor,css:[]},
	outdoor:{type:'drop',col:'prop_outdoor',list:G.outdoor,css:[]},
	heat:{type:'drop',col:'prop_heat',list:G.heat,css:[]},
	water:{type:'checkbool',col:'prop_water',css:[]},
	beach:{type:'checkbool',col:'prop_beach',css:[]},
	tenure:{type:'drop',col:'prop_tenure',list:G.tenure,css:[]},
	propertystatus:{type:'drop',col:'prop_propertystatus',list:G.propertystatus,css:[]},
	address:{type:'text',placeholder:dic.ADDRESSHERE,col:'prop_address',css:[]},
	contacts:{type:'radio',col:'offer_contacts',list:G.b2bcontacts,css:[]},
	purpose:{type:'radio',col:'loan.purpose',list:G.loan_purpose,css:[]},	
	loantype:{type:'check',col:'prop_indoor',list:G.loan_loantype,css:[]},	
	hasoffsetaccount:{type:'checkbool',col:'prop_indoor',css:[]},	
	hasredrawfacility:{type:'checkbool',col:'prop_indoor',css:[]},	
	repaymenttype:{type:'radio',col:'prop_indoor',list:G.loan_repaymenttype,css:[]}	
	};	
const chainext={"state":"province","province":"city","classif":"subclassif","subclassif":"spec"};
const chainextprefix={"classif":"","state":"","province":"sid","city":"pid","subclassif":"clid","spec":"sid"};
const chaiprev={"classif":"","state":"","province":"state","city":"province","subclassif":"classif","spec":"subclassif"};
function filterchain(list,prev,preval){		
	if(prev=='' || preval==''){return list;}else{
		var nlist='';
	for(var i in list){		
		if(list[i][prev]==preval){nlist[i]=list[i];}
	}
	return nlist;
	}
}
/*
$(document).on('change',"#cvformsubclassif,#postformsubclassif",function(){
	      var sel3,text3='<option value=0>'+dic.SPECIFIC_JOBS+'</option>';        
        for(var i in G.prof){
            if(G.prof[i].sid==this.value){
                sel3= G.prof[i].id==specval ? ' selected="selected" ':'';
                text3 +='<option value="'+G.prof[i].id+'" '+ sel3 +'>'+i+'</option>';
            }
        }
		 x('#pf_specific').html();
})
*/
function openloaneoi(e){
	var id=e.id.replace('loanappid_',''),postid=G.uname =='home' ? ses('send_eoi') : G.id,postChoiceAlias=e.innerHTML,uid=$(e).attr('uid');
    $('#eoiDropText'+postid).html(postChoiceAlias);
	$('#loanButton_'+postid).attr('uid',uid).attr('class','sentEoiButtonNew_a').attr('loanapp',id).prop('disabled',false);
	opener2('sentEOIform'+postid);
}  

$(document).on('click',"span[id^='postid_']",function(){
		if  (my.grp==2){sendeoi2(this);}else{opensendeoi(this);}
})
.on('click',"span[id^='loanappid_']",function(){
		openloaneoi(this);
})
.on('click',"button[id^='loanButton_']",function(){
	var id=this.id.replace('loanButton_',''),
		loanapp=parseInt($(this).attr('loanapp')),
		uid=parseInt($(this).attr('uid'));
		console.log({a:'loaneoisent',b:id,c:loanapp})
	$.get('/ajax.php',{a:'loaneoisent',b:id,c:loanapp,d:uid},d=>{
		api.ma.N('get',my,[G.pt+"eoi"]);		
		api.ma.N('get',uid,[G.pt+'eoi'],d=>{soc.send({type:"N",to:uid});});			
		$('#loanButton_'+ses('send_eoi')).text('EOI sent').prop('disabled',true).attr('class','sendOfPropEoiOk');		
	});	
})
.on('click',"span[id^='sendEOIbutton']",function(){sendeoibutton(this);})
.on("click","span[id^='eoiButton_']",function(){ sendeoi1(this)})
.on("click","input[id^='radiopost']",function(){search_matching(this.id.replace('radiopost',''));})
.on("keyup","#what,#f_lastname",function(){
        ses('s_'+this.id,this.value);
        ses('s_mode','free');
		if(G.uname!='home'){
		if(this.id=='lastname'){
        x('#submitFree').attr('class',this.value.length < 2  && $('#where').val()==0 ? 'but18Lock'	: 'but18');
		}
		if(my.grp==1 && this.id=="what"){
		x('#submitFree').attr('class',this.value.length < 2 ? 'but18Lock':'but18');	
		}
		}
    })	
.on("change","#where",function(){
        if(this.value!=0){
            //cityFromProv2(this.value)
            ses('s_where',this.value);
        }else{ses.del('s_where');}
        //ses('s_where',this.value);
        var what1=x("#what1").val();
        if (typeof what1 =='undefined' || what1 ==0){
            ses('s_mode','free') 
			}else{
			ses('s_mode','free_profession')
			}
       x('#submitFree').attr('class',this.value==0 && $('#what').val()==0 ? 'but18Lock' : 'but18');
    })
.on("click","#submitFree",function(){
        if(ses('s_mode')=='free' && this.className!='but18Lock'){
            saveSearchObj();
        }else if(ses('s_mode')=='free_profession' && this.className!='but18Lock'){
            saveSearchObj();
        }
    });
function addcontact(obj){
	var eoicontdone=parseInt(my.N.cont_requests)+parseInt(my.N.total_eoi);
	var exp=explode('_',obj.id);
	var uid=exp[1];
	var postid=exp[2];
	if(eoicontdone >=my.eoiL && my.grp==2) {
		s.modal(dic.EOI_OVERLIMIT + '<a style="color:red" href="/u/' + my.name + '/services?page=9">'+dic.SERVICE_9+'</a>');
	}else {
		s.confirm(dic.CONTACT_SUBMIT,function(res){
			if(res) {
				$.get('/ajax.php',{a:'addContact',b:uid}, function (data) {
					console.log(data)
					if (data == 'OK') {							
						api.ma.N('get',my.uid,['cont','eoi']);
						api.ma.N('get',uid,['eoi','cont'],d=>{soc.send({type:"N",to:uid});});							
						api.ma.my('get',my.uid,['affee']);														
					$("#contactme"+uid).html('<span id="beContact" class="flagBeContact">' + dic.SENT_CONTACT + '</span>');
						//add +1 to total_eoi counter
					  //  my.N.total_eoi_contact +=1;
					} else {
						s.modal(dic.CONTACT_NO_REQUESTED);
					}
				})
			}
		});
	}
}	
function sendeoi2(obj){
	var eoicontdone=parseInt(my.N.cont_requests)+parseInt(my.N.total_eoi);
	console.log('sendeoi2')
	let id=obj.id.replace('postid_',''),uid=$(obj).attr('uid'),postid=G.uname =='home' ?  ses('send_eoi') : G.id;	
	let selectedPostTitle=x('#postid_'+id).text();
	if(eoicontdone >=my.eoiL && my.grp==2){
		s.modal(dic.EOI_OVERLIMIT+'<a style="color:red" href="/u/'+my.name+'/services?page=9">'+G.services[9]['title_'+LANG]+'</a>');
	}else{
		s.confirm(dic.SURE_SEND_EOI_MEMBER2+'<b>'+selectedPostTitle+'</b>. '+dic.SURE,function(result){
			if (result){
				$.get('/ajax.php',{a:'sendEOI',b:id,c:postid},data=>{
						if (data !='NO'){
						api.ma.N('get',uid,['eoi','cont'],d=>{soc.send({type:"N",to:uid});});	
						api.ma.my('get',my,['user','affee']);  						
						api.ma.N('get',my,['eoi','cont'],function(res){
								console.log(res);
								my.N=res;
							 if(G.URL_PAGE=='user'){
								 location.reload()
							 }
							});	
							
						             
							//reload page on profile,append on search results
							// if(G.uname!=''){ location.reload(); }else{
							if (visibleMemo(postid)){ //if memo exist
								$('<div id="memoSubtitle" class="eoiSentFlag"><span class="sentMes1White" title="Sent"></span><span class="adNotFlagMemo01">'+(data.ptype==1 ? "A" : "N")+'</span>'+data.title+'</div>').insertAfter('#memoTitle'+postid).show();
							} else {
								if(G.uname!='home')	{
								$('#memo').append('<div class="eoiSentFlagProfile"><div id="memoTitle'+postid+'" class="eoiSentFlag">EOI</div><div id="memoSubtitle" class="eoiSentFlag"><span class="sentMes1White" title="sent"></span><span class="adNotFlagMemo01">'+(data.ptype==1 ? 'A' : 'N')+'</span>'+data.title+'</div><div class="memoBody"></div></div>');	
								}else{
								$('#memo'+postid).append('<div class="eoiSentFlagProfile"><div id="memoTitle'+postid+'" class="eoiSentFlag">EOI</div><div id="memoSubtitle" class="eoiSentFlag"><span class="sentMes1White" title="sent"></span><span class="adNotFlagMemo01">'+(data.ptype==1 ? 'A' : 'N')+'</span>'+data.title+'</div><div class="memoBody"></div></div>').show();
								}
							}
							x('#sendEoiSr_container'+postid).hide();		//HIDE SEND EOI BUTTON
							
							// }
							//add +1 to total_eoi counter
							// my.N.total_eoi_contact +=1;
						} else {
							s.notify('error',dic.EOI_EXISTS_NOT_SENT);
						}
					},'json')                        
			}                    
		})
	}
		}
/*
SEND EOI function sends eoi and appends html to EOI memo
WORKS FOR PROFILE,HOME,POST PAGES
*/
//SEND EOI
// var eoiMemoClass={0:'deleteBin1',1:'sentMes1',2:'inboxMes1',3:'addToAccepted1'};

function opensendeoi(e){
	console.log('opensendeoi')
	var id=e.id.replace('postid_',''),postid=G.uname =='home' ? ses('send_eoi') : G.id,
	postChoiceAlias=e.innerHTML;	
	$('#postValue').val(id);
   x('#eoiDropText'+postid).html(postChoiceAlias);
	$('#eoiButton_'+postid).attr('class','sentEoiButtonNew_a');
}        
function sendeoi1(obj){
		console.log('sendeoi1')
	var id=obj.id.replace('eoiButton_',''),postid=G.uname =='home' ?  ses('send_eoi') : G.id,uid=$(obj).attr('uid');	
	if (obj.className !='sentEoiButtonNew_aLock'){
		var id=obj.id.replace('eoiButton_','');
		var selectedPostId=x('#postValue').val();
		// s.confirm(dic.SURE_SEND_EOI_MEMBER,(result)=>{
		// if (result){
		 console.log({ a:'sendEOI',b:selectedPostId,c:postid})
		$.post("/ajax.php",{a:'sendEOI',b:selectedPostId,c:postid},data=>{
				console.log(data)
				if (data !='NO'){
					api.ma.N('get',my,['eoi','cont']);		
					api.ma.N('get',uid,['eoi','cont'],d=>{soc.send({type:"N",to:uid});});	
					api.ma.my('get',my,['user','affee']);
					if (visibleMemo(postid)){ 
						$('<div id="memoSubtitle" class="eoiSentFlag"><span class="sentMes1White" title="Sent"></span><span class="adNotFlagMemo01">'+(data.ptype==1 ? "A":"N")+'</span>'+data.title+'</div>').insertAfter('#memoTitle'+postid).show();
					}else{
						
						$('#memo'+postid).append('<div class="eoiSentFlagProfile">' +
							'<div id="memoTitle'+postid+'" class="eoiSentFlag">'+dic.APPLICATION+'</div>' +
							'<div id="memoSubtitle" class="eoiSentFlag"><span class="sentMes1" title="sent"></span>' +
							'<span class="adNotFlagMemo01">'+dic.SENT+'</span>'+data.title+'</div>' +
							'<div class="memoBody"></div></div>').show();						
					}
					//HIDE SEND EOI BUTTON
					if(G.mobile==true || G.URL_PAGE=='post' || G.uname!=''){
					   if(G.uname!='home'){
						   //location.reload();
						  if(G.URL_PAGE=='post'){ x('.toolBoxLeft2p').hide();}else{x('.toolBoxLeft').hide();}
						   s.notify('error',"Application sent")
						   
						   }else{
							   x('#sendEoiSr_container'+postid).hide();
						   }
					   
					}else {
						x('#sendEoiSr_container'+postid).hide();								
					}
					//add +1 to my.total_eoi
				//	my.N.total_eoi_contact +=1;
				}else{
					s.notify('error',dic.EOI_EXISTS_NOT_SENT);
				}
			},'json')
	}
}

function sendeoibutton(e){
let id=e.id.replace('sendEOIbutton','');
let eoicontdone=parseInt(my.N.cont_requests)+parseInt(my.N.total_eoi);
 ses('send_eoi',id);
//open form
if ($('#eoiFormContainer'+id).text().trim() ==''){
	s.notify('error',dic.NO_ACTIVE_ADVERTISEMENT_TO_CONNECT_GO_CREATE_A+"<a style='color:red' href='/u/"+my.name+"'>"+dic.NEW_ADVERTISEMENT2+"</a>"+dic.OR_A+"<a style='color:red' href='/"+my.name+"'>"+dic.NEW_NOTICE2+"</a>.");
}else if(eoicontdone >=my.eoiL && my.grp==2){
		s.modal(dic.EOI_OVERLIMIT+'<a style="color:red" href="/u/'+my.name+'/services?page=9">'+dic.SERVICE_9+'</a>');
} else {
	opener2("sentForm"+id);
	let closeSentEoiTimer;
	if (x('#sentForm'+id).css('display') =='block'){
		$(document).on("mouseleave","#sentForm"+id+",#sendEoiSr_container"+id+"",function(){
			closeSentEoiTimer=setTimeout(closeSentForm,5000);
		}).mouseenter(function (){
			clearTimeout(closeSentEoiTimer);
		})
	}
}
function closeSentForm(){	x("#sentForm"+id).hide();}
}
function visibleMemo(postid){
if (G.uname=='home'){
var isVisible =x('#memo'+postid).css('display') !='none'  ? true : false;
}else{
var isVisible=x('#visibleMemo').length>0 && x('#visibleMemo').val()==1  ? true : false;
}
return isVisible;
}

//UPDATE WITH SEARCH all ids in one (one ajax)
//update 2 eoiAllowed merged at eoiPostForm
//update 3 hasEOI->memo->merged to eoiPostForm
//status1 or status 2=0 deleted/ 1 send /2 received / 3 accepted
function eoiForm(results){
return new Promise(function(resolve,reject){	
var subs=!!ses('s_range_subclassif') ? ses('s_range_subclassif') : '';
console.log({a:'eoiPostForm',b:results,c:subs});
$.get("/ajax.php",{a:'eoiPostForm',b:results,c:subs},function(d){
		for(var i in d){
			console.log(d[i].forma);
			var postid= d[i].id;
			//APPEND MEMO
			if (d[i].memo!=0){
				if (G.mobile){
					x('#memo'+postid).addClass(d[i].memo); //status
				} else {
					x('#memo'+postid).html(d[i].memo); //status
				}
			} else {
				x('#memo'+postid).css('display','none');
			}			
			//APPEND FORM
			if (d[i].forma =='noactivepost'){
				x('#sendEoiSr_container'+postid).css('display','block');
				x('#eoiDropText'+postid).css('color','red').text(dic.NO_PROFILE_AVAILABLE_FOR);
				x('#eoiDropText'+postid).addClass('norelevant');
			} else if (d[i].forma !='noresult' && d[i].forma !='notallowed'){
				var s_post= ses('s_post');
				var s_post_title=ses('s_post_title');
				if(my.grp==2 && !!s_post && !!s_post_title){
					$('#eoiFormContainer'+postid).append('<div style="display:none" id="sentForm'+postid+'" class="menuImgSend'+(my.grp==2 ? '1a' : '1')+'">'+(my.grp==2 ? dic.SELECT_AD_NOTICE : "")+'<div id="sentEOIform'+postid+'"><span class="menuImgTextSend" uid="'+d[i].uid+'" id="postid_'+s_post+'">'+s_post_title+'</span></div></div>');
				}else {
					var posts='';
					for (var j in d[i].forma){
						var post=d[i].forma[j];
						posts +='<span class="menuImgTextSend" uid="'+d[i].uid+'" id="postid_'+post.id+'">'+post.title+'</span>';
					}
					$('#eoiFormContainer'+postid).append('<div style="display:none" id="sentForm'+postid+'" class="menuImgSend'+(my.grp==2 ? '1a' : '1')+'">'+(my.grp==2 ? dic.SELECT_AD_NOTICE : "")+'<div id="sentEOIform'+postid+'">'+posts+'</div></div>');
				}
				$('#sendEoiSr_container'+postid).css('display','block');
			} else {
				console.log(d[i].forma);
			}
		}	
resolve("OK");		
	},'json');		
	})	
}

/*************************SEARCH*************************/
/* search spd6 (v.2)
s.sea [global s at spd.gr]
actions 
1) create form by schemado 2) reset 3) search 4) form events  5) produce crit page (84 filters)
6) produce results counter [session 'sresults'] 7) switch mode [session 's_mode'] 5) produce search results by templates (7 modes+mobile)
*/ //all name:"schemasea"
function seaform(filter,sel){  
//console.log(sf[filter])
		var type=sf[filter].type;		
		var col=sf[filter].col;
		var datatype=sf[filter].datatype;		
	//	var listb=datatype=="chain" 
		//	? filterchain(sf[filter].list,chainextprefix[filter],chaiprev[filter])
			//	:sf[filter].list;	
				//if(datatype=="chain" ){
			//c('warn',listb)			
		//}
var list=sf[filter].list;				
		var css=sf[filter].css;
		var placeholder=!sf[filter].placeholder ? "INSERT "+filter:sf[filter].placeholder;
		var selected=!!ses('s_'+filter) ? ses('s_'+filter):'',html='';
		switch(type){			
		case "check":					
			for (var i in list){				
			selected= !!ses('s_'+filter) && JSON.parse(ses('s_'+filter)).includes(i) ? 'checked':'';
			var listi=typeof list[i]==="object" ? list[i].id:list[i];
			var value= isNaN(parseInt(listi))? i:listi;
			var title=isNaN(parseInt(listi))?listi:i;			
			//var val=typeof list[i]=="object" ? list[i][LANG]:list[i];		
			html +='<div class="checkLine2"><span class="checkValue"><input onclick="seafilter(this)" name="s_'+filter+'" type="checkbox" '+selected+' value="'+value+'" style="margin:0;cursor:pointer;"></span>'+title+'</div>';
			}
		break;
		case "radio":	
			for (var i in list){
			selected= ses('s_'+filter)==i ? 'checked':'';
			var listi=typeof list[i]==="object" ? list[i].id:list[i];
			var value= isNaN(parseInt(listi))? i:listi;
			var title=isNaN(parseInt(listi))?listi:i;	
			html +='<div class="checkLine2"><span class="checkValue"><input onclick="seafilter(this)" name="s_'+filter+'" type="radio" '+selected+' value="'+value+'" style="margin:0;cursor:pointer;"></span>'+title+'</div>';
			}						
		break;
		case "number":	
		html ='<div><input type="number" onkeyup="seafilter(this)" onchange="seafilter(this)" class="labimp" placeholder="'+placeholder+'" id="s_'+filter+'" min=0 value="'+selected+'"></div>';
		break;	
		case "text":
		html ='<div class="'+css[0]+'"><input onkeyup="seafilter(this)" class="'+css[1]+'" placeholder="'+placeholder+'" id="s_'+filter+'" type="text" value="'+selected+'"></div>';
		break;		
		case "checkbool":	
		selected= ses('s_'+filter) ? 'checked':'';
		html +='<input data-type="checkbool" type="checkbox" name="s_'+filter+'" onclick="seafilter(this)" '+selected+' style="margin: 0;cursor: pointer;">';
		break;
		case "drop":		
			var key,val,html='<select onchange="seafilter(this)" id="s_'+filter+'"><option value=0>'+placeholder+'</option>';			
			for (var i in list){				
			var listi=typeof list[i]==="object" ? list[i].id:list[i];
			key=i;val=listi;
			if(isNaN(parseInt(key))){ key=listi;val=i;}			
				selected= ses('s_'+filter)==i ? 'selected=selected':'';
				html +='<option value="'+key+'" '+selected+'>'+val+'</option>';			
			}
			html +="</select>";
		break;			
		}
		return html;
	}
function seaformake(){
for(var i in sf){	
if(sf[i].datatype=='chain'){
x('#f_'+i).html(window[sf[i].fun](sf[i].params,'f_'+i));	
}else{
x('#f_'+i).html(seaform(i));
}}}
//var pms={limit:10,page_num: !s.coo('spage') ? 1: s.coo('spage')};
//run search return 1 if has results 0 is not

/*onload bufAsync φορτώνει crit σελίδας (όχι από ses αλλά από create forms formake όταν αλλάζει crit γίνεται reset_filters */
//EVENTS form event get the form global table from G.mode
$(document)
//.on("change","select[id^='s_'],input[id^='s_'][type='date']",function(){seafilter(this)})
//.on("keyup","input[id^='s_'][type='text'],input[id^='s_'][type='number']",function(){seafilter(this)})
//.on("click","input[id^='s_'][type='number'],input[name^='s_'][type='radio'],input[name^='s_'][type='checkbox']",function(){seafilter(this)})
.on("click","#seasubmit",function(){	
	if(searules()){
	//var but=this.className.replace('search','');
	//var z={},ss=Object.keys(ses()).filter(v=>/^s_/.test(v));
	//pms=ss.length>0 ?ss.map(f=>{z[f]=ses(f);return z})[0]:ss;
	//pms.s_mode=G.searchfiles[but];
	document.querySelectorAll('.but45').forEach(e => e.setAttribute('class',''));
	x('#pagespage_1').attr('class','but45');
	s.coo('spage_page',1);
	seaexe();
	}
	})

function wrap(html,wrapper){
	x('#speedloaderCon').hide();
	wrapper=!wrapper ? 1: wrapper;
	x('#wrapper'+wrapper).append(html)
	}

function seafilter(obj){ 
	var filter=["radio","checkbox"].includes(obj.type) ? obj.name.replace('s_',''):obj.id.replace('s_',''),	
	name=["radio","checkbox"].includes(obj.type) ? obj.name:obj.id,
	frm="s_",
	value=obj.getAttribute('data-type')=='checkbool' ? ($(obj).is(':checked') ? 1:0): (obj.type=='checkbox' ? $("input[name='"+name+"']").map(function(){if(this.checked){return this.value;}}).get():obj.value);
	
	if(value=='0' || value==''){
			ses.del(name);		
		}else{
			ses(name,typeof value=='object' ? JSON.stringify(value):value); //ADD MULTIPLES
		}		
		
	if(obj.getAttribute('datatype')=="chain"){
	var parentf=obj.parentNode.parentNode.id.replace('f_','');		
	var index=sf[parentf].params.indexOf(obj.id.replace('s_',''));
	if(index==1){ses.del('s_'+sf[parentf].params[2])}
	if(index==0){ses.del('s_'+sf[parentf].params[1]);ses.del('s_'+sf[parentf].params[2]);}
	window[sf[parentf].fun](sf[parentf].params,'f_'+parentf);
	if(obj.id=='s_subclassif'){
		var rangesub=[];
		rangesub.push(obj.value);
	s.coo('s_range_subclassif',JSON.stringify(rangesub));
	ses('s_range_subclassif',JSON.stringify(rangesub));
	}	
	//change/
	//	var type=sf[filter].type;
		//chain(frm,filter,filter,type,obj.value);				//if(value=='0'){ses.del(obj.id);ses.del(frm+chainext[filter]);}else{ses(obj.id,value)}
	}
	
	seactive(1);	
}
function seactive(mode){ //activates button
		var classact= "search"+ my.app +(mode==1 ? "Act":"");		
		var thisclass= x('#seasubmit').attr('class');
		if(my.grp==1){
		   if(x('#seasubmit').length > 0){ 
		   if(thisclass=='search1Act' || thisclass=='search1'){
			   thisclass=mode==1 ? 'search1Act': 'search1';	   
			   x('#seasubmit').attr('class',thisclass);	 
		   }else{
			   x('#seasubmit').attr('class',classact);	   
		   }}
		}else{
			if(x('#seasubmit').length > 0){ 
			if(thisclass=='search2Act' || thisclass=='search2'){
			   thisclass=mode==1 ? 'search2Act' :'search2';		   
		   }else{		
			thisclass=classact;
		   }		
		   x('#seasubmit').attr('class',thisclass);	   
		}}
		
	}	
function critbar(bar){
if(!bar){ var bar;
if([1,2].includes(G.app)){bar='crit';
}else if([3,4,6,7,8].includes(G.app) && ses('s_mode')!='crit5'){bar='crit2';
}else if(G.app==5){bar='crit3';
}else if(G.app==9){
	if(s.coo('s_mode')=='crit4'){bar='crit4';}
}else if([3,4,6,7,8].includes(G.app) && ses('s_mode')=='crit5'){bar='crit5';
}else if(G.app==10){bar='crit6';
}
ses('s_mode',bar)
}
bufAsync(0,PVIEWS+"search/"+bar).then(d=>seaformake());
}
function reset_filters(){ 
const extrafields={
	classif:{type:"drop"},
	subclassif:{type:"drop"},
	spec:{type:"drop"},
	state:{type:"drop"},
	stateb:{type:"drop"},
	province:{type:"drop"},
	provinceb:{type:"drop"},
	city:{type:"drop"},
	cityb:{type:"drop"}
}
Object.assign(sf,extrafields);
	for(let i in sf){
			console.log(i+sf[i].type)
		switch(sf[i].type){
		case 'text': $('#s_'+i).val('');break;
		case 'check':
		case 'checkbool':		
		case 'radio': $('input[name="s_'+i+'"]:checked').prop('checked',false);break;
		case 'number': 
		case 'chain': 
		case 'drop': $('#s_'+i).val(0);break;			
	}
	ses.del('s_'+i);					
	}
	seactive(1);
}
function seaexe(pms){	
	if(!pms){
	var z={},ss=Object.keys(ses()).filter(v=>/^s_/.test(v));
	var pms=ss.length>0 ?ss.map(f=>{z[f]=ses(f);return z})[0]:ss;
	}	
	reset('wrapper1');	
	//switch from fav to normal search 									
	//x('#searchResults').show();	
	//x('#'+G.searchfiles[my.app]).show();		
	if([1,2].includes(my.app) && ['free','euser'].includes(pms.s_mode)){
		free_search();	
	}
	//else if(pms.s_mode!=G.searchfiles[my.app]){
	//	ses('s_mode',G.searchfiles[my.app]);
	//	pms.s_mode=G.searchfiles[my.app];
//	}	
	//TEMP search_updated();	
	//TEMP saveSearchObj();
var page=!s.coo('spage_page') ? 1:parseInt(s.coo('spage_page'));
searun('search',pms)
.then(
	r1=>{console.log("r1 "+r1);eoiForm(r1)}
	)
.then(r2=>{
	if(page===1){
	console.log("r2 "+r2);
	console.log("pms "+pms);
	searun('counter',pms);
	}else{			
	pagination(page,parseInt(ses('sresults')),10,'spage');
	}
	})
.catch(err=>{console.log(err);})
.finally(r3=>{console.log('Search completed '+r3);});
	if([3,4,6,7,8,10].includes(my.app)){$('#crit5').hide();}
}
function search_updated(){
    //if exist update
    if([1,2].includes(my.app)){
        if(!!ses('s_subclassif')){
		var subclassifs=JSON.parse(ses('s_subclassif'));		
        for(var i in subclassifs){
            api.mo.ins("search",{"uid": my.uid,"subclassif": subclassifs[i],"counter":1})			
        }}
    }
}
function saveSearchObj(unset){
    var sObj= {};	
    for (var i in sessionStorage){
        if(sf.includes(i)){
            if(sessionStorage[i]!=""){
                sObj[i]=sessionStorage[i]
            }else{
                delete sObj[i];
            }
        }
    }
}

const norecords='<div class="sres1" id="box"><div class="setboxredtop"><div class="sRpositionTitle"></div></div><div class="setboxsr1nores">'+dic.NO_RESULTS_FOUND+'</div><div class="setboxsr2nores"></div></div>';

function searun(a,pms){  //runs a) sealoop b) counter c) 	
	if(!pms){var z={},ss=Object.keys(ses()).filter(v=>/^s_/.test(v));
	pms=ss.length>0 ?ss.map(f=>{z[f]=ses(f);return z})[0]:ss;
	}	
	pms.a=a,pms.limit=10,pms.page_num=!s.coo('spage_page') ? 1: parseInt(s.coo('spage_page'));
	if(my.grp==1){x('#potentialBox').hide();}
	return new Promise(function(resolve,reject){
	$.post("/ajax.php",pms,function(d){	
	console.log(d.res);
	if (a==="counter" && parseInt(d.res)>0){		
	console.log(a+d.res);
	console.log(d.q);
		ses('sresults',d.res);
		x('#search_counter').text(d.res);
		x('#label_mode').show();
		pagination(pms.page_num,parseInt(d.res),10,'spage');		
		resolve(d.res);			
	}else if (a=="search"){							// && typeof(d.res)==="object"
	console.log(d);
	if(pms.s_mode=='crit6'){
		wrap(sealoop(d.html,pms));
	}else{
		wrap(sealoop(d.res,pms));
	}		
		if (!!s.coo('anchor')){
		var off=parseInt($('#box'+s.coo('anchor')). offset(). top);
		$(window).scrollTop(off).scrollLeft();			
		}			
	//run counters with
		var reply={};for(var i in d.res){
		reply[i]={id:d.res[i].id,uid:d.res[i].uid,name:d.res[i].name};
		}
	resolve(reply);			
	//NO DATA
	}else{
	wrap(norecords); x('#search_counter').text("0"); resolve("nores");
	}
	},'json');		
	});
}
function seabut(obj){
var s_mode=obj.id.replace('but_','');
if(s_mode!='crit'){sessionStorage.clear();}
if(s_mode=='matching' || s_mode=='crit'){ses('s_dexperience',1);}	

var pms,z={},ss=Object.keys(ses()).filter(v=>/^s_/.test(v));pms=ss.length>0 ?ss.map(f=>{z[f]=ses(f);return z})[0]:ss;
pms.s_mode=s_mode;
console.log('mode:'+s_mode);
critbar(s_mode);
seactive(1);
if(s_mode!='potential' && s_mode!='crit5'){x('#potentialBox').hide();x('#searchResults').show();}			
if(s_mode=='free'){					
	x('.but30Act').attr('class','but30');obj.className='but30Act';ses.del('s_where');
	opener3('freeEr',['criteriaEr','matchingEr']);
	if(!!ses('s_what')){x('#what').val(ses('s_what'));}
	if(!!ses('s_lastname')){$('#lastname').val(ses('s_lastname'));}
	s.coo('s_mode','free');ses('s_mode','free');	
	x('#crit').hide();x('#seasubmit').attr('class','search2free')
}else if(s_mode=='crit4fav'){
	x('#crit4').hide();ses('pop_search',4);
	ses('s_mode','crit4fav');s.coo('s_mode','crit4fav');				
	if(G.uname!='home'){location.href='/home';}else{seaexe(pms);}
}else if(s_mode=='crit2fav'){
	x('#crit2').hide();	x('#crit5').hide();	ses('pop_search',2);
	ses('s_mode','crit2fav');s.coo('s_mode','crit2fav');
	if(G.uname!='home'){location.href='/home';}else{seaexe(pms);}
}else if(s_mode=='asearch'){	
	location.href='/home/manage';		
}else if(s_mode=='crit5'){			
	if(my.goldenpropE< time() && [155,156,157].includes(my.buscat)){
		s.modal("<a href='/u/"+my.grp+"/services?page=13' class='but146'>GET GOLD PROPERTY</a>");
		}else{	
		x('#potentialBox').hide();		
		x('#searchResults').show();
		ses('s_mode','crit5');s.coo('s_mode','crit5');
		x('#crit2').hide;x('#crit5').show();
		seaexe();
	}
//}else if(s_mode=='alertcontacts'){		
//	x("input[name='contacts'][value='allcontacts']").prop("checked",true);
//	ses('s_contacts','allcontacts');
//	seaexe(pms)			
}else if(s_mode=='potential'){
	x('#searchResults').hide();
	x('#potentialBox').show();
	x('#speedloaderCon').hide();
}else if(s_mode=='clear'){
	x('#seasubmit').show();			
	ses.del(['s_lastname','s_where','s_what','s_buscat']);
	x('#lastname').val('');x('#sbuscat').val(0);x('#where').val(0);x('#what').val('');x('#filter_state3').val(0);
}else if(s_mode=="fav"){	
	reset('wrapper1');		
	x('.but30Act').attr('class','but30');
	obj.className='but30Act';
	x('#matchingEr').hide();x('#freeEr').hide;x('#crit').hide();	
	s.coo('s_mode','fav');
	ses('s_mode','fav');
	x('#seasubmit').hide();			
	seaexe(pms);			
}else if(s_mode=="matching"){
	//s_dexperience by default is on
	x('.but30Act').attr('class','but30');
	obj.className='but30Act';
	x('.speedloaderConM').show();
	opener3('matchingEr',['criteriaEr','matchingEr2','freeEr']);
	readMatching('#radiopostform');
	s.coo('s_mode','matching');ses('s_mode','matching');	
	x('#crit').hide();	
	$('#seasubmit').show().attr('class','search2matching');	
}else if(s_mode=="matching2"){
	x('.but30Act').attr('class','but30')
	obj.className='but30Act';
	x('.speedloaderConM').show();
	opener3('matchingEr2',['criteriaEr','matchingEr','freeEr']);
	readMatching('#radiopostform2');s.coo('s_mode','matching2');
	ses('s_mode','matching2');
	x('#crit').hide();
	x('#seasubmit').attr('class','search2matching2')			
}else if(s_mode=="euser"){
	x('.but30Act').attr('class','but30');
	obj.className='but30Act';
	opener3('filters',['matchingEr','freeEr']);
	s.coo('s_mode','euser');ses('s_mode','euser');
	x('#seasubmit').attr('class','search2');
	x('#crit').hide();
	seaexe(pms);			
}else if(s_mode=="crit4agent"){
	if($('.crit4agent').css('display')=='none'){
		$('.crit4agent').show()
	}else{
		$('.crit4agent').hide();
		bufAsync(0,PVIEWS+"search/crit4").then(d=>seaformake());
		s.coo('s_mode','crit4');ses('s_mode','crit4');
	}
}else if(s_mode=="crit4"){
	$('.crit4agent').hide();
	bufAsync(0,PVIEWS+"search/crit4").then(d=>seaformake());
	s.coo('s_mode','crit4');ses('s_mode','crit4');

}else if(s_mode=="crit"){
	//s_dexperience by default is on
	x('.but30Act').attr('class','but30');
	obj.className='but30Act';					
	opener3('crit',['matchingEr','matchingEr2','freeEr']);			
	s.coo('s_mode','crit');ses('s_mode','crit');
}	

//if(s_mode!='matching'){
	//x('#matchingSearch').hide();	
//}
}

function seareset(){
	var ss=Object.keys(ses()).filter(v=>/^s_/.test(v));for(var i in ss){ses.del(ss[i])};
}
function sealoop(d,pms){ //html 
var mcf=['matching','matching2','crit','filtering','fav','euser'];
var html='',location,blocked='',contactname,adsearch;
const color=i % 2==0 ? "F5F4F4" : "FBFBFB";
for (var i in d){	
	const banner=i==4 || i==9 ? "<div class='bannerMiddle_container cards'><div class='setboxredtop'><a class='sRposTitleAds1'>transport epe</a><div class='sRposTitleAds2'>Sponsored Advertisement</div></div><a class='bannerMiddle_b'><img class='adsearch'></a></div>":"";
if (pms.s_mode =='free'){
	var name=d[i].name,uid=d[i].uid;
if (my.grp==2){ //looking for person cv 							
isContact(uid,'',name); //contact flag-button
//joinLangs(d[i].langs,uid);
	html+="<div class='sres1 cards' id='box"+uid+"'>\
	<div class='setboxsr11'><div class='setboxredtop'>\
	<div class='sRpositionTitle'>"+d[i].fname+"</div>\
	"+([2,3].includes(d[i].locationP) ? "<div class='locationSr'>"+d[i].location+"["+d[i].city+"]</div>" : "")+"</div>\
	<div class='photoProfileSR'>\
	<img src='"+iconic(d[i].img)+"' width='100%' height='100%' class='profile_photo'></div>\
	<div class='dateSr'></div><div id='contactme"+uid+"' class='boxSr1button'></div></div>\
	<div class='setboxsr2fr'><div class='boxesPositionSrFree'>\
	<div class='boxSr1'><span class='p1'>"+dic.REGISTERED+":</span>"+timediff(d[i].registered)+"</span></div>\
	<div class='boxSr'><span class='p1'>"+dic.USER_ID+":</span> "+d[i].code+"</div></div><div class='stoixeiaSrPositionFr'>\
	</div></div></div>"+banner;
} else {
blocked=d[i].blocked!=null ? 1 : 0;
html += "<div class='sres1 cards' id='box"+uid+"'>\
<div class='setboxsr11'><div class='setboxredtop'>\
<div class='companyNameSrFav'><span class='companyNameSr1'>"+dic.COMPANY_NAME+":</span>"+d[i].fname+"</div>\
<div class='locationSr'>"+d[i].location+"</div></div>\
<a class='photoProfileSR'><img src='"+iconic(d[i].img)+"' width='100%' height='100%' class='profile_photo'></a>\
<div id='contactme"+uid+"' class='boxSr1button'></div></div>\
<div class='setboxsr2fr'><div class='boxesPositionSrFree'>"
+(d[i].aposts > 0 ? "<div class='activeSrN boxSr1'>"+d[i].aposts+" <span>"+dic.ACTIVE_POSTS+"</span></span></div>" : "")+
"<div class='boxSr'><span class='p1'>ID:</span> "+d[i].code+"</div></div><div class='stoixeiaSrPositionFr'>\
<div class='stoixeiaSr'><span class='lab'>"+dic.BUSINESS_CATEGORY+":</span>"+d[i].buscat+"</div>\
<div class='stoixeiaSr2' id='classif"+d[i].id+"'>"
+(pms.s_mode !='free' 
	? "<div class='stoixeiaSr2'><span class='lab'>"+dic.CLASSIFICATION+"</span>"+d[i].classif+"</div><div class='stoixeiaSr2'><span class='lab'>"+dic.SUBCLASSIFICATIONSER+"</span>"+d[i].taxonomy+"</div>" : "")+"</div></div>\
<div class='cloakRes'><button id='block_"+uid+"_"+blocked+"_"+blocked+"' class='"+(blocked==1 ? "eyeHidden" : "eyeVisible")+"' d-toggle='tooltip' style='width:100%;'></button><span id='eyehint"+uid+"' style='display:"+(blocked ? "block" :"'none")+"'>"+dic.EYE_HIDDEN2+"</span></div></div></div>"+banner;
}

//--------------------------	CRITERIA2------------
}else if (pms.s_mode=='crit2' || pms.s_mode=='crit2fav'){
	var id=d[i].id,name=d[i].name,uid=d[i].uid;
html+="<div class='sres1 cardsB2b' id='box"+id+"'>\
<div class='adPostTitb2b'><button name='"+d[i].name+"' id='sendoffereoi_"+id+"_"+uid+"_1' class='but165'>"+d[i].title+"</button>\
<div class='flagSpecialPost'>"+(d[i].goldenofferE > 0  && time() < d[i].goldenofferE ? "<span class='goldStars'><img src='/img/profElem/5starH.png' width='100%'></span>" :'')+"</div></div>\
<div class='sendToFsearPr'>"+
(pms.s_mode=='crit2fav' ? "<button id='delFavorite_"+id+"' class='delFavoriteSearch' data-toggle='tooltip' data-original-title='REMOVE_FAVORITE'></button>" : "<button id='favorite_"+id+"' class='addToFavProp' title='Move to Favorite'></button>")+"\
</div><div class='adPostb2b'><button name='"+d[i].name+"' id='sendoffereoi_"+id+"_"+uid+"_1'><img src='"+iconic(d[i].img)+"' width='100%' height='100%'/></button></div><div class='setboxb2b'><div class='setboxredtop'>\
<button name='"+d[i].name+"' id='sendoffereoi_"+id+"_"+uid+"_1' class='but165'>"+d[i].fname+"["+id+"]</button>\
<div class='locationB2b'><strong>"+d[i].buscat+"</strong></div>\
<div class='locationB2bBut'><a onclick='opener(&quot;activemail"+id+"&quot;)' class='mailB2Bs'></a>\
<a onclick='opener(&quot;activephone"+id+"&quot;)' class='phoneB2Bs'></a>\
<a onclick='opener(&quot;activeweb"+id+"&quot;)' class='webB2Bs'></a>\
<a onclick='opener(&quot;activeloc"+id+"&quot;)' class='locationB2Bs'></a></div>\
<div class='locB2bop' id='activemail"+id+"' style='display:none;'><button class='locationB2bL2' data-title='"+d[i].title+"' data-uid0="+my.uid+" data-uid="+uid+" name='"+d[i].name+"' data-cid='"+(!d[i].cid ? 0:d[i].cid)+"' id='sendoffereoi_"+id+"_"+uid+"_3_chat'>MAIL</button><br><button class='locationB2bL2' data-uid0="+my.uid+" data-uid="+uid+" data-cid="+(!d[i].cid ? 0:d[i].cid)+" data-title='"+d[i].title+"' name='"+d[i].name+"' id='sendoffereoi_"+id+"_"+uid+"_3'>"+(!d[i].mail ? '':d[i].mail)+"</button></div>"+
(!d[i].tel ? '': "<div class='locB2bop' id='activephone"+id+"' style='display:none;'>"+d[i].tel+"</div>") +
(!d[i].url ? '': "<div class='locB2bop' id='activeweb"+id+"' style='display:none;'><button name='"+d[i].name+"' id='sendoffereoi_"+id+"_"+uid+"_4_"+d[i].url+"' class='locationB2bLw2' target='_blank'>website</button></div>") +
"<div class='locB2bop' id='activeloc"+id+"' style='display:none;'>"+d[i].location+"</div></div>\
<button class='photoProfileB2b' name='"+d[i].name+"' id='sendoffereoi_"+id+"_"+uid+"_1'>\
<img src='"+d[i].userimg+"' width='100%' height='100%' class='profile_photo'></button>"+
(d[i].link_network==1 ? "<div id='contactme"+uid+id+"' class='boxSr1button'></div>" : '') +"</div>"+
(!d[i].sfee_desc ? '':"<div class='locB2bPrice'>"+
(my.app==4 ? (d[i].price!=0 ? "<span class='locationB2bTit2'>"+dic.SFEE+":</span>"+d[i].price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1."):'')
: (d[i].sfee!=0.00 ? "<span class='locationB2bTit2'>"+dic.SFEE+":</span>"+d[i].sfee:''))
+(!d[i].sfee_desc ? '':" - "+d[i].sfee_desc)+"</div>")+
"<div class='introB2bT'><div class='setboxconttitle1'>"+dic.SUBHEADLINE+"</div>\
<div class='contGenB2bsm'>"+d[i].desc+"</div>\
<button name='"+d[i].name+"' data-title='"+d[i].title+"' data-uid0="+my.uid+" data-uid="+uid+" data-cid="+d[i].cid+" id='sendoffereoi_"+id+"_"+uid+"_5_"+d[i].platform+"_"+d[i].url+"'  class='btnBuyNowB2bS'>"+([5,6].includes(d[i].prod) && d[i].platform==1 ? "Book Now":"Buy Now")+"</button>"+
(d[i].coupon==1 ? "<button name='"+d[i].name+"' id='sendoffereoi_"+id+"_"+uid+"_2' onclick='opener(&quot;pinkbox"+ id+"&quot;);' class='btnMoreB2bSO'>"+(d[i].coupontype==0 ? dic.PINKBOX:G.coupontypes[d[i].coupontype])+"</button>":'')+
"<button name='"+d[i].name+"' id='sendoffereoi_"+id+"_"+uid+"_2' class='btnMoreB2b'>"+dic.DETAILSB2B+"</button></div>\
<div id='pinkbox"+id+"' style='display:none;' class='introB2bS'><div class='cvBoxCouponTitleV'>"+dic.COUPON+"</div>\
<div id='readspecial_desc' class='couponTxt'>"+d[i].special_desc+"</div>\
<div class='cvBoxCouponTitleV2'>"+dic.SPECIAL_EXPIRE+"</div>\
<div id='readspecial_expire' class='couponTxt2'>"+d[i].special_expire+"</div>\
<div id='readcoupon_number' class='couponTxt3'>"+d[i].coupon_number+"</div></div>\
<div id='intropanel"+id+"' style='display:none;' class='introB2b'><div class='contGenB2b'>"+d[i].description+"</div>\
</div><div class='sendOfPropEoi_container'>"+
(uid==my.uid ? '':(!d[i].eoistatus ? "<button name='"+d[i].name+"' id='sendoffereoi_"+id+"_"+uid+"_3' class='sendOfPropEoi'>"+dic.SEND_EOI2+"</button>":(d[i].eoistatus==1 ? "<div class='sendOfPropEoiOk'>eoi sent</div>":"<div class='sendOfPropEoiOk'>accepted</div>")))+"</div></div></div></div>"+banner;

//--------------------------	CRITERIA3------------
}else if (pms.s_mode=='crit3'){ //upskill
var id=d[i].id,name=d[i].name,uid=d[i].uid;
html+="<div class='sres1 cardsEdu' id='box"+id+"'>\
<div class='adPostTitedu'><a href='/post/"+name+"/offer/"+id+"' class='but165'>"+d[i].title+"</a>\
<div class='flagSpecialPost'>"+(d[i].goldenofferE > 0 ? "<span class='goldStars'><img src='/img/profElem/5starH.png' width='100%'></span>" :'')+"</div></div>\
<div class='adPostb2b'>\
<div class='sendToFsearPr'>"+
(pms.s_mode=='crit2fav' ? "<button id='delFavorite_"+id+"' class='delFavoriteSearch' data-toggle='tooltip' data-original-title='REMOVE_FAVORITE'></button>":"<button id='favorite_"+id+"' class='addToFavProp' title='Move to Favorite'></button>")+
"</div><a href='/post/"+name+"/offer/"+id+"'><img src='"+iconic(d[i].img)+"' width='100%' height='100%'/></a></div>\
<div class='setboxedu'><div class='setboxredtop'>\
<a href='/post/"+name+"/offer/"+id+"' class='but165'>"+d[i].fname+"["+id+"]</a>\
<div class='locationB2b'><strong>"+d[i].buscat+"</strong></div>"+
([2,3].includes(d[i].locationP) ? "<div class='locationB2b'>"+d[i].location+"</div>":'') +
"<div class='locationB2bWt'><span class='locationB2bTit'>"+dic.QUALIFICATIONS_LEVEL+":</span>"+(d[i].qlevel!=0 ? G.post_education_types[d[i].qlevel]:'')+"</div>\
<div class='locationB2bWt'><span class='locationB2bTit'>"+dic.STUDY_MODE2+":</span>"+(d[i].smode!=0 ? G.offer_smode[d[i].smode]:'')+"</div>\
<div class='locationB2bWt'><span class='locationB2bTit'>"+dic.STUDY_LOAD+":</span>"+(d[i].sload!=0 ? G.offer_sload[d[i].sload]:'')+"</div>\
<div class='locationB2bWt'><span class='locationB2bTit'>"+dic.COURSE_DURATION+":</span>"+(d[i].course_duration!=null ? d[i].course_duration:'')+"</div>\
<div class='locationB2bWt'><span class='locationB2bTit'>"+dic.COURSE_START+":</span>"+(d[i].course_start!=null ? d[i].course_start:'')+"</div>\
<div class='locationB2bWt'><span class='locationB2bTit'>"+dic.COURSE_PRICE+":</span>"+(d[i].course_price!=null ? d[i].course_price:'')+"</div>\
<div class='locationB2bWt'><span class='locationB2bTit'>"+dic.COURSE_ACCRED+":</span>"+(d[i].course_accred!=null ? d[i].course_accred:'')+"</div>\
<div class='locationB2b'><img src='/img/mailEdu.png' class='contB2Bic' width='18' height='18'><a href='mailto:"+d[i].mail+"' class='locationEduL' target='_blank'>"+(!d[i].mail ? '':d[i].mail)+"</a></div>\
<div class='locationB2b'><img src='/img/phoneEdu.png' class='contB2Bic' width='18' height='18'><span class='locationEduL'>"+d[i].tel+"</span></div>"
+(!d[i].url ? '': "<a href='"+d[i].url+"' class='locationB2bLw' target='_blank'>#website</a>") +"</div>\
<a class='photoProfileB2b' href='/post/"+name+"/offer/"+id+"'>\
<img src='"+d[i].userimg+"' width='100%' height='100%' class='profile_photo'></a>"+
(d[i].link_network==1 ? "<div id='contactme"+uid+id+"' class='boxSr1button'></div>":'')+
"</div><div class='introB2bT'><div class='setboxconttitle1'>"+dic.ADVERTISEMENT_B2B2+"</div>\
<div class='contGenB2bsm'>"+d[i].desc+"</div>"+
([1,2,3].includes(d[i].prod) ? "<button onclick='opener(&quot;pinkbox"+id+"&quot;);' class='btnMoreB2bSO'>"+dic.PINKBOX+"</button>":'')+
"<button id='intropanelbut"+id+"'  class='btnMoreB2b'>"+dic.DETAILSB2B+"</button></div>\
<div id='pinkbox"+id+"' style='display:none;' class='introB2b'>\
<div class='cvBoxCouponTitleV'>"+dic.COUPON+"</div><div id='readspecial_desc' class='couponTxt'>"+d[i].special_desc+"</div>\
<div class='cvBoxCouponTitleV2'>"+dic.SPECIAL_EXPIRE+"</div>\
<div id='readspecial_expire' class='couponTxt2'>"+d[i].special_expire+"</div>\
<div id='readcoupon_number' class='couponTxt3'>"+d[i].coupon_number+"</div>\
</div>\
<div id='intropanel"+id+"' style='display:none;' class='introB2b'><div class='contGenB2b'>"+d[i].description+"</div></div><div class='sendOfPropEoi_container'>"+
(uid==my.uid ? '':(!d[i].eoistatus ? "<button name='"+d[i].name+"' data-uid0="+my.uid+" data-uid="+uid+" data-cid="+d[i].cid+" id='sendoffereoi_"+id+"_"+uid+"_chat' class='sendOfPropEoi'>"+dic.SEND_EOI2+"</button>":(d[i].eoistatus==1 ? "<div class='sendOfPropEoiOk'>eoi sent</div>":"<div class='sendOfPropEoiOk'>accepted</div>")))+
"</div></div></div>"+banner;

//--------------------------	CRITERIA4------------								
}else if (pms.s_mode =='crit4' || pms.s_mode =='crit4fav'){
	var id=d[i].id,name=d[i].name,uid=d[i].uid;
html+="<div class='sres1 cardsProp' id='box"+id+"'>\
<div class='adPostTitProp'><a  data-mode='prop' data-name='"+name+"' data-link='"+id+"' onclick='goto(this,&quot;u&quot;)'  class='searchTitProp'>\
<span class='contactPropTit'>"+d[i].title+"</span></a><div class='flagSpecialPost'>"+
(d[i].goldenofferE > 0  && time() < d[i].goldenofferE ? "<span class='goldStars'><img src='/img/profElem/5starH.png' width='100%'></span>" :'')+"</div></div>\
<div class='adPostPr'><div class='sendToFsearPr'>"+
(pms.s_mode=='crit4fav' ? "<button id='delFavorite_"+id+"' class='delFavoriteSearch' data-toggle='tooltip' data-original-title='REMOVE_FAVORITE'></button>":"<button id='favorite_"+id+"' class='addToFavProp' title='Move to Favorite'></button>")+
"</div><a href='/u/"+d[i].name+"/_prop/"+id+"'><img src='/uploads/"+d[i].img+"' width='100%' height='100%'></a></div>\
<div class='setboxprop'><div class='setBoxPrTop'>\
<button data-mode='prop' data-name='"+name+"' data-link='"+id+"' onclick='goto(this,&quot;u&quot;)' class='companyNameProp'>"+d[i].fname+"</button>\
<div class='comDet3'><span class='comDet3atit'>Property Listing:</span>\
<span class='comDet3lin'>"+(!d[i].address ? "<i>Call agent for address</i>" : d[i].address)+"</span>\
<span class='comDet3lin'><strong>"+d[i].location+"</strong></span></div>"+
(d[i]['price_privacy']==1 ? "<div class='pricePrFlag'><span class='comDet3atit'>"+(d[i].price_type!=0 ? G['price_type'][d[i].price_type]:'')+"</span>$"+(d[i].price!=0 ? d[i].price:'')+"</div>":'')+
(d[i].prod==2 ? "<div class='propDetImgs'>"+d[i].beds+"<img src='../../img/property/bed.png' width='30'>"+d[i].bath+"<img src='/img/property/shower.png' width='30'>"+d[i].car+"<img src='/img/property/car.png' width='30'></div>":'')+
"<div class='comDet3'><small>Size:</small> <strong>"+d[i].unit+"m<sup>2</sup>"+
(d[i].grp!=0 ? (d[i].prod==1 ? G.propgrp[d[i].grp] : G.propgrpres[d[i].grp]) : '')+"</strong></div>\
<div class='comDet3a'><span class='comDet3atit'>Inspection Times:</span>"+(!d[i].inspection?'':d[i].inspection)+"</div></div></div>\
<div class='comBannerS viewImage'><img src='"+d[i].userimg+"' width='100%' class='bg_photo'></div><div class='sendOfPropEoi_container'>"+
(uid==my.uid ? '':(!d[i].eoistatus ? "<button id='sendpropeoi_"+id+"_"+uid+"' class='sendOfPropGr'>"+dic.SEND_EOI2+"</button>":(d[i].eoistatus==1 ? "<div class='sendOfPropEoiOk'>eoi sent</div>":"<div class='sendOfPropEoiOk'>accepted</div>")))+
"</div></div>"+banner;
//--------------------------	CRITERIA6------------																
}else if (pms.s_mode =='crit6'){ 
html += d[i]+banner;
//--------------------------	CRITERIA5------------																
}else if (pms.s_mode =='crit5'){ ///create new 
var id=d[i].id,name=d[i].name,uid=d[i].uid;
html+="<div class='sres1 cardInProp'><div class='adPostRealEst'><a href=''><img src='"+iconic(d[i].img)+"' width='100%' class='bg_photo'></a></div>"+
(!d[i].cid ? "<button name='"+d[i].name+"' data-uid0="+my.uid+" data-uid="+uid+" data-cid="+d[i].cid+" id='sendpropeoi_"+uid+"_"+uid+"_10' class='propSeoi4s'>4. Send EOI- Contact</button>":'')+
"<div class='setboxrealest'><div class='setboxredtop'><div class='setboxretxt'><span class='locationPropTit'>Company Name</span>"+d[i].fname+"</div><div class='setboxretxt'><span class='locationPropTit'>Address</span>"+d[i].address+"</div><div class='setboxretxt'><span class='locationPropTit'>Location</span>"+d[i].location+"</div>\
<div class='setboxretxt'><span class='locationPropTit'>Phone</span>"+d[i].phone+",</div>\
<div class='setboxretxt'><span class='locationPropTit'>Created</span>"+date('Y-m-d',d[i].created)+"</div>\
<div class='setboxretxt'><span class='locationPropTit'>Website</span>"+d[i].website+"</div><div class='setboxretxt'><span class='locationPropTit'>E-mail</span><a href='mailto:"+d[i].mail+"' class='emailRealEst' target='_blank'>"+d[i].mail+"</a></div></div></div></div>"+
banner;
//--------------------------	MATCHING - CRITERIA - FILTERING - FAVORITE------------
} else if (mcf.includes(pms.s_mode)){
	var id=d[i].id,name=d[i].name,uid=d[i].uid;
if (my.grp==2){ //looking for cv
html+="<div class='sres1 cards' id='box"+id+"'><div class='setboxsr11'><div class='setboxredtop'>\
<a class='companyNameSrFav' data-mode='cv' data-name='"+name+"' data-link='"+d[i].id+"'  onclick='goto(this,&quot;u&quot;)'><span class='companyNameSr1'>"+dic.NAME+":</span></span>"+d[i].fname+"["+id+"] "+d[i].title+"</a>\
<div class='locationSr'>"+
([1,3].includes(d[i].locationP) ? d[i].location:'')+([2,3].includes(d[i].locationP) ? d[i].location_city:'')+
"</div><div class='sRlinks'><div class='sendToFSearchContainer'>"+
(pms.s_mode =='fav' ? "<button id='delFavorite_"+id+"' class='delFavoriteSearch' data-toggle='tooltip' data-original-title='REMOVE_FAVORITE'></button>":(d[i].fav==id ? "<span class='goldFavoriteSearch'></span>":"<button id='favorite_"+id+"' class='addToFavoriteSearch' data-toggle='tooltip' data-original-title='ADD_TO_FAVORITE'></button>")) +"</div>\
<span><button data-mode='cv' data-name='"+name+"' data-link='"+d[i].id+"'  onclick='goto(this,&quot;u&quot;)' class='gotoprofile moreAp2 morColor3'>"+dic.PROFILE+"</button></span></div>"+
(d[i].cert==1  ? "<div class='certifyCvSm_"+my.lang+"'></div>" : '')+"</div>\
<a class='photoProfileSR' data-mode='cv' data-name='"+name+"' data-link='"+id+"'  onclick='goto(this,&quot;u&quot;)'>\
<img src='"+iconic(d[i].img)+"' width='100%' height='100%' class='profile_photo'></a>\
<div class='dateSr'></div><div class='dateSr'></div>"+
(d[i].link_network==1 ? "<div id='contactme"+uid+id+"' class='boxSr1button'></div>" : '')+"</div>\
<div class='setboxsr2'><div class='boxesPositionSr'><div class='boxSr1'>\
<span class='p1'>"+dic.LAST_LOGIN+"</span> "+(pms.s_mode=="euser" ? date('Y-m-d H:i',d[i].modified):date('Y-m-d',d[i].login))+"</span></div>\
<div class='boxSr'><span class='p1'>"+dic.USER_ID+":</span> "+d[i].code+"</div>"+
(d[i].job_found==1 ? "<div class='boxSr'><div class='tagFJ'><strong>"+dic.FOUND_JOB+"</strong></div></div>" : '') +
"<div id='memo"+id+"' class='boxSr2'></div></div>"+(d[i].ptype==1 ? "<div class='stoixeiaSrPosition'><div class='stoixeiaSr'><span class='lab'>"+dic.POSITION_TYPES+":</span>\
<span id='posTypes_"+i+"'>"+joinTypes(d[i].types)+"</span></div>" : '') +
"<div class='stoixeiaSrPosition'><div class='stoixeiaSr2c'><span class='lab qualified'>"+(d[i].relevant!=0 && typeof(d[i].relevant) !='undefined' ? G.relevant[d[i].relevant] : "")+"</span>\
<span class='subscroll'>"+d[i].taxonomy+"</span></div>\
<div class='sRexperience'><span class='sRexperience1'>"+dic.EXPERIENCE+":</span>"+(d[i].class_years!=0 ? G.exp_years[d[i].class_years]+dic.YEARS : "")+"</div>"+
(d[i].skills >=4 ? "<div class='textWork4s'><div class='starB"+G.allskills_colors[d[i].skills]+"'></div>"+G.allskills[d[i].skills]+"</div>" : "") +"</div></div>\
<button id='intropanelbut"+id+"' class='btnBoxBlueCloseCont4'>"+dic.INTRODUCTORY_MESSAGESH+"</button>\
<button id='expanelbut"+id+"' class='but134'>"+dic.PROVED_SUMMARY_EXPERIENCE1+"</button>\
<button id='edupanelbut"+uid+"' class='but134'>"+dic.EDUCATION+"</button>\
<div id='intropanel"+id+"' style='display:none;' class='introHideGeneral'><div class='setboxcont2'><div class='setboxconttitle1'>"+dic.INTRODUCTORY_MESSAGESH+"</div><div id='intro"+id+"' class='contGeneralBusAct2'></div></div></div>\
<div id='expanel"+id+"' style='display:none;' class='introHideGeneral'></div>\
<div id='edupanel"+uid+"' style='display:none;' class='introHideGeneral'></div>\
<div class='sendEoiSr_container' style='display:none' id='sendEoiSr_container"+id+"'>\
<div class='prefControls2d'><span id='sendEOIbutton"+id+"' uid='"+d[i].uid+"' class='sentEoiButton_a'>"+dic.SEND_EOI2+"\
<div id='eoiFormContainer"+id+"'></div></span></div></div></div></div></div>"+banner;

} else {	//company
blocked=d[i].blocked!=null ? 1 : 0;
html+="<div class='sres1 cards' id='box"+id+"'><div class='setboxsr11'><div class='setboxredtop'>\
<div class='sRpositionTitle'><span class='sRpositionTitle1'></span> "+d[i].fname+"</div><div class='locationSr'>"+
([1,3].includes(d[i].locationP) ? d[i].location:'')+([2,3].includes(d[i].locationP) ? d[i].location_city:'')+
"</div><a class='sRpositionTitleBl' data-mode='post' data-link='"+d[i].id+"'  onclick='goto(this,&quot;u&quot;)' data-name='"+name+"' ><span class='sRpositionTitle1'><span class='adNotFlag0"+d[i].ptype+"'>"+(d[i].ptype==1?"A":"N")+"</span></span> "+d[i].title+"</a>\
<div class='sRlinks'><div class='sendToFSearchContainer'>"+ (pms.s_mode=='fav' ? "<button id='delFavorite_"+id+"' class='delFavoriteSearch' data-toggle='tooltip' data-original-title='REMOVE_FAVORITE'></button>":(d[i].fav==id ? "<span class='goldFavoriteSearch'></span>":"<button id='favorite_"+id+"' class='addToFavoriteSearch' data-toggle='tooltip' data-original-title='ADD_TO_FAVORITE'></button>"))+"</div>\
<a onclick='ui.view.pdf(this)' class='printWhite  btn-primary view-pdf' href='/public/print/post.php?uname="+name+"&pname="+d[i].uri+"' id='print_"+uid+"' title='"+d[i].title+"'></a>\
<button data-mode='post' data-link='"+d[i].id+"' onclick='goto(this,&quot;u&quot;)' data-name='"+name+"'  class='gotoprofile moreAp morColor2'>"+dic.PROFILE+"</button>\
<button data-mode='post' data-link='"+d[i].id+"' onclick='goto(this,&quot;u&quot;)'  class='gotoprofile moreAp2 morColor1'>#"+(d[i].ptype==1 ? dic.ADV_NOTI_DETAILS : dic.ADV_NOTI_DETAILS)+"</button></div></div>\
<a class='photoProfileSR' data-mode='post' data-link='"+d[i].id+"' onclick='goto(this,&quot;u&quot;)' data-name='"+name+"' >\
<img src='"+iconic(d[i].img)+"' width='100%' height='100%' class='profile_photo'></a>"+
(d[i].ptype==2 ? "<div id='contactme"+uid+id+"' class='boxSr1button'></div>" : '') +"</div>\
<div class='setboxsr2'><div class='boxesPositionSr'><div class='activeSr boxSr'>"+d[i].active_posts+" <span>"+dic.ACTIVE_POSTS+"</span></div>\
<div class='boxSr1'><span class='p1'>"+dic.ACTIVE_S+"</span> "+timediff(d[i].activated) +"</span></div>\
<div class='boxSr'><span class='p1'>"+dic.CODE2+":</span>"+d[i].postcode+"</div>\
<div class='boxSr'><span class='p1'>"+dic.EXPECTED_SALARY3+":</span><span id='readExpSalary'>"+(d[i].salary!=0 ? G.salary[d[i].salary] : '')+"</span></div><div id='memo"+id+"' class='boxSr2'></div></div>\
<div class='stoixeiaSrPosition'><div class='stoixeiaSr'><span class='lab'>"+dic.BUSINESS_CATEGORY+":</span>"+
d[i].buscat+"</span> "+(d[i].size!=0 ? "("+(d[i].size!=undefined ? G.companysize[d[i].size]:'')+")" : '')+"</div>\
<div class='stoixeiaSr'><span class='lab'>"+dic.SUBCLASSIFICATIONSER+":</span>\
<div class='stoixeiaSr2'>"+d[i].taxonomy+"</div></div>"+
(d[i].ptype==1?"<div class='stoixeiaSr'><span class='lab'>"+dic.JOB_TYPE+":</span><span id='posTypes'>"+joinTypes(d[i].types)+"</span></div>":'') 
+"<div class='stoixeiaSr'><span class='lab'>"+dic.EXPERIENCE+":</span>"+(d[i].experience==1 ? "Yes" : "No")+"</div></div></div>\
<button id='intropanelbut"+id+"' class='btnBoxBlueCloseCont4'>"+(d[i].ptype==1 ? dic.JOB_ADVERTISEMENT_DET : dic.JOB_NOTICE_DET)+"</button><ul class='hideSr3'><li id='block_"+uid+"_"+blocked+"_"+id+"' class='"+(blocked==1 ? "visibilityRedSearchLock" : 'visibilityRedSearch')+"' data-toggle='tooltip' title='"+dic.SHOW_HIDE_SEARCH+"'></li>"+dic.SHOW_HIDE_SEARCH+"</ul>\
<div id='intropanel"+id+"' style='display:none;' class='introHideGeneral'><div class='setboxcont2'><div class='setboxconttitle1'>"+(d[i].ptype==1 ? dic.JOB_ADVERTISEMENT : dic.JOB_NOTICE)+"</div><div id='intro"+id+"' class='contGeneralBusAct2'></div></div></div>\
<div id='sendEoiSr_container"+id+"' style='display:none' class='sendEoiSr_containerPr"+(G.uname!="home" ? 4 : 1)+"'>\
<div class='prefControls2d1'><span id='eoiButton_"+id+"' uid='"+d[i].uid+"' class='sentEoiButtonNew_aLock'>"+dic.SEND_APP+"</span><div class='linkArrowApplication'></div>\
<span id='sendEOIbutton"+id+"' class='sentEoiButtonDrop_a'><div class='sendEoiSrLink'>"+dic.LINK+"</div><span id='eoiDropText"+id+"' class='sentEoiButtonDrop_text'>"+dic.SELECT_CV+"</span><input type='hidden' id='postValue'><div id='eoiFormContainer"+id+"'></div></div></span></div></div></div>"+banner;
}}}
return html;
}
//post/cv types get post/cv_id
function joinTypes(array){
    if (array){
        var text=[];
        for(var i in array){text.push(G.employment_type[array[i]]);}
        text=array_unique(text);
        return text.join(', ');
    }else{
        return '<i>'+dic.NOT_SET+'</i>';
    }
}
function back2s(id){
	s.coo('anchor',id);
	if(my.affiliate>0){
		location.href='/home/asearch';
	}else{
		location.href='/home';
	}
}
function readMatching(div){
var matching='';
$.post("/ajax.php",{a: 'matching'},function (mat){   
if(mat.length==0){
 x(div).html('<div class="menuNoth">'+dic.NOTHING_HERE+'</div>');
}else {
 for (i in mat){
	 if (my.grp==2){
		 //   getLocationMatch(mat[i].id,mat[i].city);
	 }
	  //    getSubMatch(mat[i].id,mat[i].subArray);
	 var s_mode=div =='radiopostform' ? 'matching' : 'matching2';
	 matching +='<div class="setboxscontents">' +
		 '<ul class="matchingSearch-now">' +
		 '<li>' +
		 '<input type="hidden" id="post_experience'+mat[i].id+'" value="'+mat[i].experience+'">' +
		 '<input type="hidden" id="s_mode" value="'+s_mode+'">';
	 if (my.grp==2){
		 //matching +='<input type="hidden" id="post_city'+mat[i].id+'" value="">';
		 matching +='<input type="hidden" id="post_province'+mat[i].id+'" value="'+mat[i].province+'">';
	 } else {
		 for (var c in mat[i].province){
			 //matching +='<input type="hidden" id="postcity_'+mat[i].id+'_'+mat[i].city[c]+'" value="'+mat[i].city[c]+'">';
			 matching +='<input type="hidden" id="postprovince_'+mat[i].id+'_'+mat[i].province[c]+'" value="'+mat[i].province[c]+'">';
		 }
	 }
	 for (var p in mat[i].jobtype){
		 matching +='<input type="hidden" id="position_'+mat[i].id +mat[i].jobtype[p].val+'" value="'+mat[i].jobtype[p].val+'">';
	}
	 var subArray=mat[i].subArray;
	 matching +='<input type="hidden" id="classif_'+mat[i].id+'" value="'+mat[i].classif+'">';
	 //fix 1
	 for (var s in subArray){
		 matching +='<input type="hidden" id="postsublassif_'+mat[i].id+'_'+subArray[s]+'" value="'+subArray[s]+'">';
	 }
	 matching +='<input type="hidden" id="title_'+mat[i].id+'" value="'+mat[i].title+'">' +
		 '<input type="radio" id="radiopost'+mat[i].id+'" value="'+mat[i].id+'" name="radioposts" style="margin: 0;cursor: pointer;">' +
		 '<label for="radiopost'+mat[i].id+'">' +
		 '<div class="resadn2b3">' +
		 (my.grp==2 ? '<span class="adNotFlag0'+mat[i].ptype+'">'+(mat[i].ptype==1 ? 'A' : 'N')+'</span>' : '') +
		 '</div>';
	 matching +='<div class="resadn1a">'+(my.grp==1 ? 'EP'+mat[i].ep : mat[i].code)+'</div><div class="resadn2b2">'+mat[i].title+'<div class="resadn1b2">'+(my.grp==2 ? date('D d M Y',mat[i].activated) : '')+'</div></label></div>';
	 matching +='</li></ul><div class="resadn1b3">';
	 if (my.grp==2){
		 matching +='<a href="/u/'+my.grp+'/post/'+mat[i].id +' class="view_my_profile_button" title="PROFILE"></a>';
	 } else {
		 matching +='<a href="/u/'+my.grp+'/cv/'+mat[i].id +' class="view_my_profile_button" title="PROFILE"></a>';
	 }
	 matching +='</div></div>';
 }
 x(div).html(matching);
}
$('.speedloaderConM').hide();
},'json');
}
function search_matching(selected){
	var s_mode=ses('s_mode'),
	formid= s_mode=='matching2' ? 'radiopostform2':'radiopostform',
	title= x('#title_'+selected).val();
	ses('s_post',selected);ses('s_post_title',title);
	if(s_mode=='matching2'){
		ses('s_skills',3);ses('s_certified',1);
	}else{
		ses.del('s_certified');ses.del('s_skills');
	}
	//city and range city
	if(my.grp==2){
	  var province_val=x('#post_province'+selected).val();
	  ses('s_city',0);ses('s_province2',province_val);
	}else{
		var province_val=$("input[id^='postprovince']").map(function(){
			var exp= explode('_',this.id);
			if(exp[1]==selected)
				return exp[2];
		}).get();            
		ses('s_province2',JSON.stringify(province_val));
	}
	//subclacssif //get subclassifs from subclassif and save to session
	var sublassif_val=$("input[id^='postsublassif_"+selected+"']").map(function(){
		return this.value}).get();
	ses('s_classif',$('#classif_'+selected).val());
	ses('s_range_subclassif',JSON.stringify(sublassif_val));
	//TEMP $.when(listJSON('subclassif',sublassif_val,'s_range_subclassif'));        
	var experience_val= x('#post_experience'+selected).val();
	ses('s_experience',experience_val);        
	var ptypes=$("input[id^='position_"+selected+"']").map(function(){return this.value}).get();
	if(ptypes.length>0){ses('s_ptype',JSON.stringify(ptypes));}else{ses.del('s_ptype')}	
	//insert cookie s_range_subclassif post.php use
	if(!!ses('s_range_subclassif')){
		s.coo('s_range_subclassif',ses('s_range_subclassif'));
	}	
}
function free_search(){
    x('.settingBoxS1').css('background-color','rgb(45,59,151)');
    x('.corneredBlueSR2b').attr('class','corneredBlueSR2');
    x('#what').prop('disabled',false);
    x('#where').prop('disabled',false);
}  	
//LANGUAGES
function joinLangs(array,id){
	var text=[];
	for(var i in G.langs){
			if(array.includes(i)){
				text.push(G.langs[i]);
			}}
		text=array_unique(text);
		$('#langs_'+id).html(implode(', ',text));
}