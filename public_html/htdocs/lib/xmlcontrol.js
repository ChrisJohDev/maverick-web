// Name:			xmlcontrol.js
// Description:		Main xml control script.
// Copyright:		Maverick Webdesign Ltd. (c) 2003-2004
// Date created:	June 18 2004
// Last modified:	June 30 2004
//
// License:		Available under the GPL license, non supported, or
//				a licensed version from Maverick Webdesign Ltd.
//				(sales@maverick-web.com)
//				The product is released as is and
//				Maverick Webdesign Ltd. does NOT accept any
//				responsibility for any damages or costs involved
//				with using this program of any kind.
//				You may copy, distribute, and modify this program
//				as long as it is released under the GPL license and
//				Maverick Webdesign Ltd. is recognized as the original
//				authors of the program. By using the product you accept
//				the licensing terms and conditions.
//
// NOTE:		If you don't accept the above license agreement, don't
//				use the product. By using the product you also agree
//				to the terms and conditions in the licensing. Any
//				violations are punishable by law.
//					


///////////////////////////////
// Global Objects.
///////////////////////////////
var VERSION_MAJOR = "0";
var VERSION_MINOR = "4";
var VERSION_EXTENSION = "02";
var VERSION = VERSION_MAJOR + VERSION_MINOR + VERSION_EXTENSION;
var xRef = new Object(); xRef.xDoc, xRef.xDocRef;
var globVar = new Object();
globVar.counter = 0;			// Counter mainly for debugging.
globVar.currPage = "home";		// Current page.
globVar.lastPage = "home";		// Remembers the last page visited.
globVar.newPage = "default";	// Name of the new page to be loaded.
globVar.currDoc = "doc1.xml";	// Current document, i.e. last document loaded.
globVar.callFunc = "";			// Name of the function from where the request came.
globVar.errors = 0;				// Counter for errors found. errors > 5 give up and use CGI script.
// test and see if these are necessary!
globVar.email_choice = "info"; globVar.f_name; globVar.s_name; globVar.email_addr; globVar.message;
// isOP, isIE check to see if the browser is opera or internet explorer.
globVar.isOP = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
globVar.isIE = (globVar.isOP == false && navigator.userAgent.indexOf("MSIE") != -1) ? true : false;
var adCounter_1 = 0, adCounter_2 = 0;
// Temporary for tests only!
globVar.inMT = 0;
globVar.outMT = 0;



///////////////////////////////
// Page layout & population.
///////////////////////////////
// ***** set_page START *****
// Creates the page layout, and populates it.
function set_page(){
	globVar.callFunc = "set_page";
	// Create all the div elements needed for the page layout.
	var xDocDiv = document.createElement("div");
	xDocDiv.id = "page";
	var xLogoDiv = document.createElement("div");
	xLogoDiv.id = "logoDiv";
	xLogoDiv.className = "logoClass";
	var xNavDivSide = document.createElement("div");
	xNavDivSide.id = "navSide";
	xNavDivSide.className = "navClass";
	var xNavDivTop = document.createElement("div");
	xNavDivTop.id = "navTop";
	xNavDivTop.className = "navClass";
	var xMainDiv = document.createElement("div");
	xMainDiv.id = "main";
	xMainDiv.className = "mainClass";

	// Assemble all the div elements and put them all in the HTML document.
	xDocDiv.appendChild(xLogoDiv);
	xDocDiv.appendChild(xNavDivSide);
	xDocDiv.appendChild(xNavDivTop);
	xDocDiv.appendChild(xMainDiv);
	document.body.appendChild(xDocDiv);

	// Populate the created structure.
	var main = xDoc.getElementsByTagName("page");
	var xmain = make_page(globVar.currPage, main);
	xMainDiv.appendChild(xmain);
	var navigation = xDoc.getElementsByTagName("navigation");
	var nav_top = navigation[0].getElementsByTagName("top");
	var top_nav = navigation_top(nav_top);
	xNavDivTop.appendChild(top_nav);
	var nav_side = navigation[0].getElementsByTagName("side");
	var side_nav = navigation_side(nav_side);
	xNavDivSide.appendChild(side_nav);
	var ad_top = navigation[0].getElementsByTagName("topad");
	var top_ad = advert_top(ad_top);
	xNavDivTop.appendChild(top_ad);
	var xLogo = setLogo();
	xLogoDiv.appendChild(xLogo);
	if (globVar.isIE){
		_correct_positioning_ie();
	}
// Assign events to side menus. (external function in menucontrol.js)
	assignLabelEventsSideMenu();
}
// ***** set_page END *****

// ***** main START *****
function main(page){
	globVar.callFunc = "main";
	var main = xDoc.getElementsByTagName("page");
	var xmain = make_page(page, main);
	document.getElementById("main").appendChild(xmain);
	globVar.lastPage = globVar.currPage;
	globVar.currPage = page;
	if (globVar.isIE){
		_correct_positioning_ie();
	}
}
// ***** main END *****

// ***** advert_top START *****
function advert_top(elm){
	globVar.callFunc = "advert_top";
	var temp = elm[0].getElementsByTagName("data");
	var rv = document.createElement("div");
	rv.className = "adtop";
	rv.id = "adtopwrapper";
	rv.style.textAlign = "center";
	for (var i=0; i<temp.length; i++){
		if (temp[i].nodeType == 1 ){
			var t = make_tag(temp[i], i);
		} else {
			alert("Advert Top problem count= "+count);
		}
		rv.appendChild(t);
	}
	return rv;
}
// ***** advert_top END *****

// ***** setLogo START *****
function setLogo(){
	globVar.callFunc = "setLogo";
	var xLogo = new Object();
	xLogo = xDoc.getElementsByTagName("logo");
	var logo = xLogo[0].firstChild;
	var rv = make_tag(logo);
	var container = document.createElement("a");
	container.id = "logoMain";
	container.href = "http://www.maverick-web.com/";
	container.className = "logo_a";
	container.appendChild(rv);
	return container;
}
// ***** setLogo END *****

// ***** _changeAd START *****
function _changeAd(){
	var imgId = "img_1";
	adCounter_1++;
	if (adCounter_1 < 5){
		var imgHolder = document.getElementById(imgId);
		imgHolder.src = imagesAd[adCounter_1].src;
	} else {
		adCounter_1 = 0;
		_changeAd();
	}
}
// ***** _changeAd END *****

// ***** _changeAd_2 START *****
function _changeAd_2(){
	var imgId = "img_2";
	adCounter_2++;
	if (adCounter_2 < 5){
		var imgHolder = document.getElementById(imgId);
		imgHolder.src = imagesAd[adCounter_2].src;
	} else {
		adCounter_2 = 0;
		_changeAd_2();
	}
}
// ***** _changeAd_2 END *****


///////////////////////////////
// Core functions & page control.
///////////////////////////////
// ***** make_page START *****
function make_page(page, elm){
	globVar.callFunc = "make_page";
	var rendPage;
	var pageTitle, temp, rv;
	rv = document.createElement("div");
	rv.id = "main_inner";
	rv.className = "main_wrapper";
	for (var i=0; i<elm.length; i++){
		if (elm[i].getAttribute("name") == page){
			rendPage = elm[i];
			pageTitle = elm[i].getAttribute("title");
		}
	}
	temp = rendPage.getElementsByTagName("data");
	for (var i=0; i<temp.length; i++){
		if (temp[i].nodeType == 1 ){
			var t = make_tag(temp[i], i);
		} else {
			alert("make_page problem count= "+count);
		}
		rv.appendChild(t);
	}
	return rv;
}
// ***** make_page END *****

// ***** _new_page START *****
function _new_page(page){
	globVar.callFunc = "_new_page";
	if (page == "lastPage"){
		page = globVar.lastPage;
	}
	if (page == globVar.currPage){
	} else {
		var xurl = new Array();
		xurl = _get_url(page);// recives an array;
		globVar.newPage = xurl[1];
		if (testAndLoad(xurl[0])){
			globVar.counter = 0;
			setTimeout("_loaded()", 500);
		} else {
			changePage(globVar.newPage);
		}
	}
}
// ***** _new_page END *****

// ***** changePage START *****
function changePage(pageName) {
	globVar.callFunc = "changePage";
	removePage();
	main(pageName);
}
// ***** changePage END *****

// ***** removePage START *****
function removePage() {
	globVar.callFunc = "removePage";
	document.getElementById("main").removeChild(document.getElementById("main").lastChild);
}
// ***** removePage END *****

// ***** make_tag START *****
// Creates the HTML tags.
function make_tag(elm, hasContent){
globVar.inMT ++;
//globVar.callFunc = "make_tag";
//hasContent = (hasContent) ? true : false;
var tag = temp_tag = rtag = table = false, temp;
if (elm.nodeType && elm.nodeType == 1){
	if (elm.hasAttributes || elm.attributes){
	var tagOK=true;
		try {
			elm.getAttribute("tag");
		}catch(e){
			tagOK = false;
		}
		if (tagOK){
			tag = _get_attributes(elm);
			if (tag.tagName == "table" || tag.tagName == "TABLE"){
				temp = tag;
				tag = document.createElement("tbody");
				table = true;
			}
		}
	}
	if (elm.hasChildNodes){
		for (var i =0; i<elm.childNodes.length; i++){
			if (elm.childNodes[i].nodeType && elm.childNodes[i].nodeType == 3){
				if (elm.childNodes[i].nodeValue == "" || elm.childNodes[i].nodeValue == "undefined"){
				}else{
					temp_tag = make_tag(elm.childNodes[i]);
				}
			}else{
				temp_tag = make_tag(elm.childNodes[i]);
			}
			var temp_tagOK = true;
			try {
				tag.appendChild(temp_tag);
			}catch(e){
				temp_tagOK = false;
			}
			if (temp_tagOK){
				tag.appendChild(temp_tag);
			}
		}
	}
} else if (elm.nodeType && elm.nodeType == 3){
	var textOK = true;
	try {
		document.createTextNode(elm.nodeValue);
	}catch(e){
		textOK = false;
	}
	if (textOK){
		tag = document.createTextNode(elm.nodeValue);
	}
}
if (tag.tagName == "tbody" || tag.tagName == "TBODY"){
		temp.appendChild(tag);
		tag = temp;
}
if (tag != false){
	rtag = tag;
}
globVar.outMT++;
if (globVar.inMT == globVar.outMT){
globVar.inMT = 0;
globVar.outMT = 0;
}
return rtag;
}
// ***** make_tag END *****

// ***** _get_attributes START *****
// Reads attributes in xml tags.
function _get_attributes(elm){
	var temp_tag = elm.getAttribute("tag");
	var tagOK =true, rv=false;
	try {
		document.createElement(temp_tag)
	}catch(e) {
		tagOK = false;
	}
	if (tagOK){
		rv = document.createElement(elm.getAttribute("tag"));
	
	var attributes = elm.attributes;
	var temp_name = new Array();
	var temp_value = new Array();
	for (var i=0; i<attributes.length; i++){
		temp_name[i] = attributes[i].name;
		temp_value[i] = attributes[i].value;
		if (temp_name[i] == "name"  || temp_name[i] == "tag" || temp_name[i] == "data_type" || temp_name[i] == "order" || temp_name[i] == "mime_type"){
		} else if (temp_name[i] == "href" && elm.getAttribute("tag") == "a"){
			if (temp_value[i].indexOf("http") != -1){
				rv.setAttribute(temp_name[i], temp_value[i]);
			} else {
				var pattern = new RegExp;
				var temp = attributes[i].value;
				pattern = /\?page\=([a-zA-Z0-9_]*)/;
				temp.match(pattern);
				temp = RegExp.$1;
				rv.setAttribute(temp_name[i], "javascript:_new_page('"+temp+"')");
				temp = rv.getAttribute(temp_name[i]);
			}
		}else if (temp_name[i] == "attr_name"){
			rv.setAttribute("name", temp_value[i]); 
		}else {
			if (temp_name[i] == "class" && globVar.isIE){
				rv.className = temp_value[i];
			}else {
				rv.setAttribute(temp_name[i], temp_value[i]);
			}
		}
	}
	}
	return rv;
}
// ***** _get_attributes END *****


// ***** _email START *****
function _email(x) {
	if (!globVar.isIE){
		for (var i=0; i<document.contact_maverick.email_choice.length; i++){
			if (document.contact_maverick.email_choice[i].checked){
				globVar.email_choice = document.contact_maverick.email_choice[i].value
			}
		}
		globVar.f_name = document.contact_maverick.f_name.value;
		globVar.s_name = document.contact_maverick.s_name.value;
		globVar.email_addr = document.contact_maverick.email.value;
		globVar.message = document.contact_maverick.message.value;
	}
	var content = new Array();
	var content_id = new Array();
	content[0] = globVar.email_choice; // Destination email @ maverick
	content_id[0] = content[0] == "info" ? "cont1_email_1" : (content[0] == "sales" ? "cont1_email_2" : "cont1_email_3");
	content[1] = globVar.f_name; // First Name
	content_id[1] = "cont1_f_name";
	content[2] = globVar.s_name; // Surname
	content_id[2] = "cont1_s_name_inp";
	content[3] = globVar.email_addr; // Email address (visitor)
	content_id[3] = "cont1_email";
	content[4] = globVar.message; // Email message
	content_id[4] = "cont1_message";
	if (_check_form(content, content_id)){
	var temp_message = encodeURIComponent(content[4]);
	var parameters = "choice="+content[0]+";f_name="+content[1]+";s_name="+content[2]+";email="+content[3]+";message="+temp_message;
	//parameters = encodeURIComponent(parameters);
	document.location.replace("http://www.maverick-web.com/cgi-bin/mav_mail.cgi?"+parameters);
	}
//alert("Choice 1 = "+document.contact_maverick.email_choice[0].checked+"\nChoice 2 = "+document.contact_maverick.email_choice[1].checked+"\nChoice 3 = "+document.contact_maverick.email_choice[2].checked);
//alert("Choice = "+globVar.email_choice+"\nF_Name = "+globVar.f_name+"\nS_Name = "+globVar.s_name+"\nEmail = "+globVar.email_addr+"\nMessage = "+globVar.message);
}
// ***** _email END *****

// ***** _check_form START *****
function _check_form(x, y) {
	var rv = true;
	var message = new Array();
	message[1] = "<a id='error' class='warning'>* First name is required!</a>";
	message[2] = "<a id='error' class='warning'>* Last name / Surname is required!</a>";
	message[3] = "<a id='error' class='warning'>* Email address is required!</a>";
	message[4] = "<a id='error' class='warning'>* Message is required!</a>";
	for (var i=0; i<x.length; i++){
		if (!_empty(x[i])){
			var temp = document.getElementById(y[i]).parentNode;
//alert("temp.length= "+temp.childNodes.length);
			if (document.getElementById("error")){
				var t = document.getElementById("error").parentNode;
				var dump = t.removeChild(t.firstChild);
				dump = t.removeChild(t.firstChild);
			}
			var temp_cont = document.getElementById(y[i]).parentNode.innerHTML;
			temp.innerHTML = message[i]+"<br>"+temp_cont;
			temp = document.getElementById(y[i]);
			temp.focus();
			return false;
		}else {
			if (i == 3 && !_check_address(x[i])){
				var temp =document.getElementById(y[i]).parentNode;
				var pr = document.getElementById(y[i]).value;
alert("Value= "+pr);
				if (document.getElementById("error")){
					var t = document.getElementById("error").parentNode;
					var dump = t.removeChild(t.firstChild);
					dump = t.removeChild(t.firstChild);
				}
				var temp_cont = document.getElementById(y[i]).parentNode.innerHTML;
				temp.innerHTML = "<a id='error' class='warning'>Please check your email address, it doesn't conform to standard</a>"+"<br>"+temp_cont;
				document.getElementById(y[i]).value = pr;
				document.getElementById(y[i]).focus();
				return false;
			} else if (i == 4 && !_check_message(x[i])){
				var temp = document.getElementById(y[i]).parentNode;
				if (document.getElementById("error")){
					var t = document.getElementById("error").parentNode;
					var dump = t.removeChild(t.firstChild);
					dump = t.removeChild(t.firstChild);
				}
				var temp_cont = document.getElementById(y[i]).parentNode.innerHTML;
				temp.innerHTML = "<a id='error' class='warning'>*** Your message contains illigal character combinations.</a>"+"<br>"+temp_cont;
				return false;
			}
		}
	}
	return true;
}
// ***** _check_form END *****

// ***** _check_message START *****
function _check_message(x){
	var pattern = /\brm\b | \brmdir\b | \b#! | \b\%/i;
	if (pattern.test(x)){
		return false;
	}else {
		return true;
	}
}
// ***** _check_message END *****

// ***** _check_address START *****
function _check_address(x){
	var pattern = /[\w\.\-\+\*]+\@(?:[\w\-\+]+\.(?:[\w]))+/;
	if (pattern.test(x)){
		return true;
	}else {
		return false;
	}
}
// ***** _check_address END *****

// ***** _empty START *****
function _empty(x){
//alert("X= "+x);
	var pattern = /[\w]+/;
	var pattern2 = /\bundefined\b/;
	if (pattern.test(x) && !pattern2.test(x)){
		return true;
	}else {
		return false;
	}
}
// ***** _empty END *****

// ***** _onchange START *****
function _onchange(evt) {
	if (globVar.isIE){
	evt = (evt) ? evt : ((event) ? event : null);
//alert("evt = "+evt);
		if (evt){
			var elm = (evt.target) ? evt.target : evt.srcElement;
			var formInput = new Array();
			for (var i=0; i<elm.attributes.length; i++){
				if (elm.attributes[i].name == "id"){
					var x_id = elm.attributes[i].value;
					if ((x_id == "cont1_email_1" || x_id == "cont1_email_2" || x_id == "cont1_email_3") && elm.value != "undefined"){
						globVar.email_choice = elm.value;
					}else if (x_id == "cont1_f_name"){
						globVar.f_name = elm.value;
					}else if (x_id == "cont1_s_name_inp"){
						globVar.s_name = elm.value;
					}else if (x_id == "cont1_email"){
						globVar.email_addr = elm.value;
					}else if (x_id == "cont1_message"){
						globVar.message = elm.value;
					}
//alert("Attr Name = "+elm.attributes[i].name+"\nAttr Name Value = "+elm.attributes[i].value+"\ni = "+i);
				}
			}
		}
	}
//alert("Choice = "+globVar.email_choice+"\nF_Name = "+globVar.f_name+"\nS_Name = "+globVar.s_name+"\nEmail = "+globVar.email_addr+"\nMessage = "+globVar.message);
}
// ***** _onchange END *****

///////////////////////////////
// Document loading and control.
///////////////////////////////
// ***** testAndLoad START *****
// Loads xml documents and stores in internal document.
function testAndLoad(xFile) {
	xDoc =  undefined;
	if (document.implementation && document.implementation.createDocument) {
		xDoc = document.implementation.createDocument("", "", null);
		if (globVar.callFunc == "init"){
			xDocRef = document.implementation.createDocument("", "", null);
		}
	} else if (typeof ActiveXObject != "undefined") {
		if (window.ActiveXObject) {
			xDoc = new ActiveXObject("Msxml.DOMDocument");
			if (globVar.callFunc == "init"){
				xDocRef = new ActiveXObject("Msxml.DOMDocument");
			}
		}
	}
	if (xFile.indexOf("http:") !== -1){
	var loadFile = xFile;
	} else {
	var loadFile =  "http://www.maverick-web.com/htdocs/data/xml/" + xFile;
	}
	if (xDoc && typeof xDoc.load != "undefined") {
		// Load the xml document, standards compliant implementation.
		xDoc.load(loadFile);
		currentDocument = xFile;
		if (globVar.callFunc == "init"){
			loadFile = "http://www.maverick-web.com/htdocs/data/xml/pageRef.xml";
			xDocRef.load(loadFile);
		}
		return true;
	} else if (typeof xDoc.URL != "undefined") {
		// Load xml document IE implementation.
		xDoc.URL = loadFile;
		currentDocument = xFile;
		if (globVar.callFunc == "init"){
			loadFile = "http://www.maverick-web.com/htdocs/data/xml/pageRef.xml";
			xDocRef.URL = loadFile;
		}
		return true;
	} else {
		return false;
	}
}
// ***** testAndLoad END *****

// ***** _loaded START *****
// Check if document has finnished loading.
function _loaded(){
	var t1, t2, x;
	t1 = true;
	t2 = false;

	try {
		xDoc.getElementsByTagName("loaded");
	}
	catch(e){
		globVar.counter++;
		t1 = false;
	}
	
	if (t1){
		t2 = true;
		x = xDoc.getElementsByTagName("loaded");
		try {
			x[0].firstChild.nodeValue;
		}
		catch(e){
			globVar.counter++;
			t2 = false;
		}
	}
	
	if (t2){
		if (globVar.callFunc == "_new_page" || globVar.callFunc == "_get_url"){
			changePage(globVar.newPage);
		}else if (globVar.callFunc == "init"){
			set_page();
		}
	}else if (globVar.counter >= 20){
		alert("timed out\nt1= "+t1+"\nt2= "+t2+"\nx= "+x+"\nx[0]= "+x[2]+"\nglobVar.callFunc= "+globVar.callFunc+"\nx.length= "+x.length+"\ncounter= "+globVar.counter);
	}else{
		setTimeout("_loaded()", 100);
	}
}
// *****_loaded END *****

// ***** _get_url START *****
// References the requested page to
// the document it's available in.
function _get_url(page){
globVar.callFunc = "_get_url";
var url;
var data = xDocRef.getElementsByTagName("page_ref");
for (var i=0; i<data.length; i++){
	if(data[i].getElementsByTagName("page_name")[0].firstChild.nodeValue == page){
		if (data[i].getAttribute("page") == "on"){
			url = data[i].getElementsByTagName("page_url")[0].firstChild.nodeValue;
		} else {
			page = "default";
			break;
		}
	}
}
if (page == "default"){
	url = "doc1.xml";
}
return [url, page];
}
// ***** _get_url END *****


///////////////////////////////
// Browser specific functions.
///////////////////////////////

// ***** _correct_positioning_ie START *****
function _correct_positioning_ie(){
if (globVar.currPage == "home"){
	var i = document.getElementById("home_table_1");
	i.style.position = "static";
}else if (globVar.currPage == "contact"){
	var i1 = document.getElementById("cont1_s_name");
	var i2 = document.getElementById("cont1_s_name_inp");
	i1.style.position = "relative";
	i2.style.position = "relative";
	
	var iform = document.getElementById("form1");
	var i3 = document.getElementById("cont1_email_3");
	i1 = document.getElementById("cont1_email_1");
	i2 = document.getElementById("cont1_email_2");
	i1.checked = true;
	i1.setAttribute("onclick", "_ie_form(1)");
	i2.setAttribute("onclick", "_ie_form(2)");
	i3.setAttribute("onclick", "_ie_form(3)");
	var temp = iform.innerHTML;
	iform.innerHTML = "";
	iform.innerHTML = temp;
}
var mov1 = document.getElementById("adtopwrapper");
mov1.innerHTML = '<div id="adtop_1" class="adtop1"><img id="img_2" src="http://www.maverick-web.com/htdocs/graphics/adTop_1.1.png" /></div><div id="adtop_2" class="adtop2"><img id="img_1" src="http://www.maverick-web.com/htdocs/graphics/adTop_1.4.png" class="adtop1_1" /></div>';

if (document.getElementById("path")){
	var path = document.getElementById("path");
	path.style.top = "0px";
}
if (document.getElementById("pathbar")){
	var pathbar = document.getElementById("pathbar");
	pathbar.style.top = "-15px";
}
}
// ***** _correct_positioning_ie END *****

// ***** _ie_form START *****
function _ie_form(x){
// Correct behavior for radio buttons in IE 6.0
var i = new Array();
i[0] = document.getElementById("cont1_email_1");
i[1] = document.getElementById("cont1_email_2");
i[2] = document.getElementById("cont1_email_3");
	
	i[x -1].checked = true;
	if (x == 1){
		i[x].checked = false;
		i[x+1].checked = false;
	}
	if (x == 2){
		i[x].checked = false;
		i[x-2].checked = false;
	}
	if (x == 3){
		i[x-2].checked = false;
		i[x-3].checked = false;
	}
}
// ***** _ie_form END *****


///////////////////////////////
// Initialization
///////////////////////////////

// ***** init START *****
// Initializes the program.
function init(xPage) {
	globVar.callFunc="init";
	if (testAndLoad(xPage)) {
		setTimeout("_loaded()", 500);
	}
	setTimeout("startMenus()", 1000);
}
// ***** init END *****


///////////////////////////////
// Test functions, debugging only.
///////////////////////////////

// ***** _test_obj START *****
// Takes an object input and prints out
// all its content.
function _test_obj(elm){
globVar.callFunc = "_test_obj";
var i=0;
var name = new Array();
var value = new Array();
for (var temp in elm){
	name[i] = temp;
	value[i] = elm[temp];
	i++;
}
document.open();
for (var i=0; i<name.length; i++){
document.write("Name: "+name[i]+"<br>Value: "+value[i]+"<hr>");
}
}
// ***** _test_obj END *****
