// Name:			menucontrol.js
// Description:		Top and side menus script.
// Copyright:		Maverick Webdesign Ltd. (c) 2003-2004
// Date created:	June 18 2004
// Last modified:	June 20 2004
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
//				authors of the program.
//
// NOTE:		If you don't accept the above license agreement, don't
//				use the product. By using the product you also agree
//				to the terms and conditions in the licensing. Any
//				violations are punishable by law.
//	


// Global Objects.
var VERSION_MAJOR = "0";
var VERSION_MINOR = "2";
var VERSION_EXTENSION = "01";
var VERSION = VERSION_MAJOR + VERSION_MINOR + VERSION_EXTENSION;
if (!globVar){
var globVar = new Object();
// isOP, isIE check to see if the browser is opera or internet explorer.
globVar.isOP = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
globVar.isIE = (globVar.isOP == false && navigator.userAgent.indexOf("MSIE") != -1) ? true : false;
}

/* ***** MENUS COMMON START ***** */
var adCounter_1 = 1;


if (document.images) {
// Image(width, height)
	var imagesNormal = new Array();
	var imagesHilite = new Array();
	var imagesNormalOpen = new Array();
	var imagesHiliteOpen = new Array();
	var imagesAd = new Array();
	
	imagesNormal["plus"] = new Image(12, 12);
	imagesNormal["plus"].src = "graphics/plus_12x12_off.png";
	
	imagesNormalOpen["minus"] = new Image(12, 12);
	imagesNormalOpen["minus"].src = "graphics/minus_12x12_off.png";
	
	imagesNormal["dot"] = new Image(12, 12);
	imagesNormal["dot"].src = "graphics/dot_12x12.png";
	
	imagesHilite["plus"] = new Image(12, 12);
	imagesHilite["plus"].src = "graphics/plus_12x12_on.png";
	
	imagesHiliteOpen["minus"] = new Image(12, 12);
	imagesHiliteOpen["minus"].src = "graphics/minus_12x12_on.png";
	
	imagesHilite["dot"] = new Image(12, 12);
	imagesHilite["dot"].src = "graphics/dot_12x12.png";
	
	imagesAd[1] = new Image(250, 50);
	imagesAd[1].src = "graphics/adTop_1.1.png";
	
	imagesAd[2] = new Image(250, 50);
	imagesAd[2].src = "graphics/adTop_1.2.png";
	
	imagesAd[3] = new Image(250, 50);
	imagesAd[3].src = "graphics/adTop_1.3.png";
	
	imagesAd[4] = new Image(250, 50);
	imagesAd[4].src = "graphics/adTop_1.4.png";
	
}
// Global variables.
var menuReady = false;
var timer;
var cssInitValues = 	{	menuItemHeight: "18px",
							menuItemLineHeight: "1.4em",
							menuWrapperBorderWidth: "2px",
							menuWrapperPadding: "3px",
							defaultBodyFontSize: "10px"
						};

// ***** startMenus START *****
function startMenus(){
var menusLoaded = true;
	try {
		initMenus();
	}
	catch(e){
		menusLoaded = false;
	}
	if (menusLoaded){
		null;
	} else {
		setTimeout("startMenus()", 500);
	}
}
// ***** startMenus END *****


/* ***** MENUS COMMON END ***** */
// ***** TOP MENUS START *****

// ***** getElementStyle START *****
function getElementStyle(elem, IEStyleProp, CSSStyleProp) {
	if (elem.currentStyle) {
		return elem.currentStyle[IEStyleProp];
	} else if (window.getComputedStyle) {
		var compStyle = window.getComputedStyle(elem, "");
		return compStyle.getPropertyValue(CSSStyleProp);
	}
	return "";
}
// ***** getElementStyle END *****


// ***** Menu content START *****
var menus = new Array();
menus[0] =	{	mBarTopId: "navtop_1",
				mBarTop: "true",
				menuItems: [	
							],
				elemId: ""
			};

menus[1] =	{	mBarTopId: "navtop_2",
				mBarTop: "true",
				menuItems: [
							],
				elemId: ""
			};
menus[2] =	{	mBarTopId: "navtop_3",
				mBarTop: "true",
				menuItems: [	
							],
				elemId: ""
			};
menus[3] = {	mBarTopId: "navtop_4",
				mBarTop: "true",
				menuItems: [	
								{text: "News", href: "javascript: _new_page('news')"},
								{text: "Server Scripts", href: "javascript: _new_page('serverside')"},
								{text: "Client Scripts", href: "javascript: _new_page('clientside')"},
								{text: "Web Design", href: "javascript: _new_page('webdesign')"},
								{text: "Hosting", href: "javascript: _new_page('hosting')"},
								{text: "Issues", href: "javascript: _new_page('issues')"}
							],
				elemId: ""
			};
menus[4] =	{	mBarTopId: "navtop_5",
				mBarTop: "true",
				menuItems: [	
							],
				elemId: ""
			};
menus[5] = {	mBarTopId: "navtop_6",
				mBarTop: "true",
				menuItems: [
								{text: "Presentation", href: "javascript: _new_page('presentation')"},
								{text: "Contact Us", href: "javascript: _new_page('contact')"},
								{text: "Downloads", href: "javascript: _new_page('downloads')"},
								{text: "Jobs", href: "javascript: _new_page('jobs')"},
								{text: "Links", href: "javascript: _new_page('links')"},
								{text: "Legal", href: "javascript: _new_page('legal')"}
							],
				elemId: ""
			};
menus[6] =	{	mBarTopId: "navtop_7",
				mBarTop: "true",
				menuItems: [	
							],
				elemId: ""
			};
// ***** Menu content END *****

// ***** makeHashes START *****
function makeHashes() {
	for (var i = 0; i < menus.length; i++) {
		menus[menus[i].mBarTopId] = menus[i];
		menus[menus[i].elemId] = menus[i];
	}
}
// ***** makeHashes END *****


// ***** assignLabelEvents START *****
function assignLabelEvents() {
	var elem;
	for (var i = 0; i < menus.length; i++) {
		elem = document.getElementById(menus[i].mBarTopId);
		if (elem){
		elem.onmouseover = toggleTopMenu;
		elem.onmouseout = toggleTopMenu;
		}
	}
}
// ***** asignLabelEvents END *****


// ***** makeMenus START *****
function makeMenus() {
	var menuDiv, menuItem, itemLink, mbarImg, textNode, offsetLeft, offsetTop;
	var menuItemH = 0;
	var bodyFontSize = parseInt(getElementStyle(document.body, "fontSize", "font-size"));
	var heightAdjust = parseInt(cssInitValues.menuWrapperPadding) + 
		parseInt(cssInitValues.menuWrapperBorderWidth);

	if (bodyFontSize == parseInt(cssInitValues.defaultBodyFontSize)) {
		menuItemH = (parseFloat(cssInitValues.menuItemHeight));
	} else { 
		menuItemH = parseInt(parseFloat(cssInitValues.menuItemLineHeight) * bodyFontSize);
	}
	
	if (navigator.appName == "Microsoft Internet Explorer" &&
		navigator.userAgent.indexOf("Win") != -1 &&
		(typeof document.compatMode == "undefiend" ||
		document.compatMode == "BackCompat")) {
			heightAdjust = -heightAdjust;
	}

	for (var i = 0; i < menus.length; i++) {
		if (menus[i].mBarTop == "true") {
			menuDiv = document.createElement("div");
			menuDiv.id = "popupmenu" + i;
			menus[i].elemId = "popupmenu" + i;
			menuDiv.className = "menuWrapper";
			if (menus[i].menuItems.length > 0 && menus[i].mBarTop == "true") {
				menuDiv.style.height = (menuItemH * menus[i].menuItems.length) - heightAdjust + "px";
			} else {
				menuDiv.style.display = "none";
			}
		
			menuDiv.onmouseover = keepMenu;
			menuDiv.onmouseout = hideMenu;
			menuDiv.style.zIndex = 100;
		
			for (var j = 0; j < menus[i].menuItems.length; j++) {
				menuItem = document.createElement("div");
				menuItem.id = "popupmenuItem_" + i + "_" + j;
				menuItem.className = "menuItem";
				menuItem.onmouseover = toggleTopMenu2;
				menuItem.onmouseout = toggleTopMenu2;
				menuItem.onclick = hideMenus;
				menuItem.style.top = (menuItemH * j) + "px";
				itemLink = document.createElement("a");
				itemLink.href = menus[i].menuItems[j].href;
				itemLink.className = "menuItem";
				textNode =document.createTextNode(menus[i].menuItems[j].text);
				itemLink.appendChild(textNode);
				menuItem.appendChild(itemLink);
				menuDiv.appendChild(menuItem);
			}
			document.getElementById("navTop").appendChild(menuDiv);
		} else {
			//Side menu creation.
		}
	}
	makeHashes();
	assignLabelEvents();
	
	for (i = 0; i < menus.length; i++) {
		positionMenu(menus[i].mBarTopId);
	}
	menuReady = true;
	var ad1 = window.setInterval("_changeAd()", 8500);
	if (globVar.isIE){
		var ad2 = window.setInterval("_changeAd_2()", 6875);
	}
}
// ***** makeMenus END *****

// ***** keepMenu START *****
function keepMenu() {
	clearTimeout(timer);
}
// ***** keepMenu END *****

// ***** cancelAll START *****
function cancelAll() {
	keepMenu();
	menuReady = false;
}
// ***** cancelAll END *****

// ***** hideMenu START *****
function hideMenu() {
	timer = setTimeout("hideMenus()", 250);
}
// ***** hideMenu END *****

// ***** hideMenus START *****
function hideMenus() {
	for (var i =0; i < menus.length; i++) {
		// There is only a need to hide the Top menus.
		if (menus[i].mBarTop == "true") {
			var menu = document.getElementById(menus[i].elemId);
			menu.style.visibility = "hidden";
		}
	}
}
// ***** hideMenus END *****

// ***** positionMenu START *****
function positionMenu(menuId) {
	var mBarTopId = true;
	try {
		menus[menuId].mBarTopId;
	}
	catch(e){
		mBarTopId = false;
	}
	if (mBarTopId){
		var mBarTop = document.getElementById(menus[menuId].mBarTopId);
		var offsetTrail = mBarTop;
		var offsetLeft = 0;
		var offsetTop = 0;

		while (offsetTrail) {
			offsetLeft += offsetTrail.offsetLeft;
			offsetTop += offsetTrail.offsetTop;
			offsetTrail = offsetTrail.offsetParent;
		}
		if (navigator.userAgent.indexOf("Mac") != -1 &&
		   typeof document.body.leftMargin != "undefined") {
			offsetLeft += document.body.leftMargin;
			offsetTop += document.body.topMargin;
		}
		var menuDiv = document.getElementById(menus[menuId].elemId);
		offsetLeft = offsetLeft-180;
		menuDiv.style.left = offsetLeft + "px";
		menuDiv.style.position = "absolute";
		menuDiv.style.zIndex = "100";
	}
}
// ***** positionMenu END *****


// ***** toggleTopMenu2 START *****
function toggleTopMenu2(evt){
//alert("tTM2");
evt = (evt) ? evt : ((event) ? event : null);
	if (typeof menuReady != "undefined") {
		if (menuReady && evt) {
			var elem = (evt.target) ? evt.target : evt.srcElement;
			if (elem.nodeType == 3 && elem.parentNode.className != "navtop") {
				elem = elem.parentNode;
			}
			if (evt.type == "mouseover") {
				keepMenu();
				elem.className = "menuItemOn";
			} else {
				elem.className = "menuItem";
				hideMenu();
			}
			evt.cancelBubble = true;
		}
	}
}
// ***** toggleTopMenu2 END *****

// ***** toggleTopMenu START *****
function toggleTopMenu(evt){
	evt = evt ? evt : (event ? event : null);
	if (typeof menuReady != "undefined") {
		if (evt && (document.getElementById && document.styleSheets) && menuReady) {
			var elem = (evt.target) ? evt.target : evt.srcElement;
			if (elem.className == "navtop") {
				if (evt.type == "mouseover") {
					var v = document.getElementById("adtopwrapper");
					v.visibility = "hidden";
					var v2 = document.getElementById("adtop_1");
					v2.visibility = "hidden";
					showMenu(elem.id);
				} else if (evt.type == "mouseout") {
					var v = document.getElementById("adtopwrapper");
					v.visibility = "visible";
					var v2 = document.getElementById("adtop_1");
					v2.visibility = "visible";
					hideMenu();
				}
				evt.cancelBubble = true;
			}
		}
	}
}
// ***** toggleTopMenu END *****

// ***** showMenu START *****
function showMenu(menuId) {
	var elemId = true;
	try {
		menus[menuId].elemId;
	}
	catch(e){
		elemId = false;
	}
	if (menuReady) {
		keepMenu();
		hideMenus();
		positionMenu(menuId);
		if (elemId){
			var menu = document.getElementById(menus[menuId].elemId);
			menu.style.visibility = "visible";
		}
	}
}
// ***** showMenu END *****


// ***** evenNumber START *****
function evenNumber(n){
	var number = n.split("_");
	if (number[1]%2 == 0){
		return true;
	} else {
		return false;
	}
}
// ***** evenNumber *****


// ***** initMenus START *****
function initMenus() {
	if (document.getElementById && document.styleSheets) {
		setTimeout("makeMenus()", 5);
		window.onunload = cancelAll;
	}
}
// ***** initMenus END *****

/* ***** TOP MENUS END ***** */


/* ***** SIDE MENUS START ***** */

var sideMenus = new Array();

// Holds the information for the whole side menu setup.
sideMenus[0] = {	mBarImgId: "sideMenuImg_1",
					mBarImgNormal: imagesNormal["dot"],
					mBarImgHilite: imagesHilite["dot"],
					mBarImgNrmlOpn: imagesNormalOpen["minus"],
					mBarImgHltOpn: imagesHiliteOpen["minus"], 
					mBarTop: "false",
					menuItems: [
								],
					elemId: ""
			};

sideMenus[1] = {	mBarImgId: "sideMenuImg_2",
					mBarImgNormal: imagesNormal["plus"],
					mBarImgHilite: imagesHilite["plus"],
					mBarImgNrmlOpn: imagesNormalOpen["minus"],
					mBarImgHltOpn: imagesHiliteOpen["minus"], 
					mBarTop: "false",
					menuItems: [
									{img: "graphics/dot_12x12.png", text: "News", href: "javascript: _new_page('news')", title: "Links to News page", klass: "subMenuItem", sub: "false", id: "100"},
									{img: "graphics/dot_12x12.png", text: "Server Scripts", href: "javascript: _new_page('serverside')", title: "Links to Sever Side Scripting page", klass: "subMenuItem", sub: "false", id: "100"},
									{img: "graphics/dot_12x12.png", text: "Client Scripts", href: "javascript: _new_page('clientside')", title: "Links to Client Side Scripting page", klass: "subMenuItem", sub: "false", id: "100"},
									{img: "graphics/dot_12x12.png", text: "Web Design", href: "javascript: _new_page('webdesign')", title: "Links to the Web Design page", klass: "subMenuItem", sub: "false", id: "100"},
									{img: "graphics/dot_12x12.png", text: "Hosting", href: "javascript: _new_page('hosting')", title: "Links to Products page", klass: "subMenuItem", sub: "false", id: "100"},
									{img: "graphics/dot_12x12.png", text: "Issues", href: "javascript: _new_page('issues')", title: "Links to Issues page", klass: "subMenuItem", sub: "false"}
								],
					elemId: ""
			};

sideMenus[2] = {	mBarImgId: "sideMenuImg_3",
					mBarImgNormal: imagesNormal["plus"],
					mBarImgHilite: imagesHilite["plus"],
					mBarImgNrmlOpn: imagesNormalOpen["minus"],
					mBarImgHltOpn: imagesHiliteOpen["minus"], 
					mBarTop: "false",
					menuItems: [
									{img: "graphics/dot_12x12.png", text: "Presentation", href: "javascript: _new_page('presentation')", title: "Links to the Company Presentation page", klass: "subMenuItem", sub: "false"},
									{img: "graphics/dot_12x12.png", text: "Contact Us", href: "javascript: _new_page('contact')", title: "Links to Contact Us page", klass: "subMenuItem", sub: "false"},
									{img: "graphics/dot_12x12.png", text: "Downloads", href: "javascript: _new_page('downloads')", title: "Links to the Downloads page", klass: "subMenuItem", sub: "false"},
									{img: "graphics/dot_12x12.png", text: "Jobs", href: "javascript: _new_page('jobs')", title: "Links to available Jobs page", klass: "subMenuItem", sub: "false"},
									{img: "graphics/dot_12x12.png", text: "Links", href: "javascript: _new_page('links')", title: "Links to the Link page", klass: "subMenuItem", sub: "false"},
									{img: "graphics/dot_12x12.png", text: "Legal", href: "javascript: _new_page('legal')", title: "Links to the Leagl notification page", klass: "subMenuItem", sub: "false"}
								],
					elemId: ""
			};


function toggleSideMenu(evt) {

	evt = (evt) ? evt : ((event) ? event : null);
	var elem = (evt.target) ? evt.target : evt.srcElement;
	var temp = elem.id.split("_");
	var menuNumber = temp[1]-1;
	if (evt.type == "mouseover"){
		if (elem.src.indexOf("plus")!= -1){
			elem.src = sideMenus[menuNumber].mBarImgHilite.src;
		} else if (elem.src.indexOf("minus") != -1){
			elem.src = sideMenus[menuNumber].mBarImgHltOpn.src;
		}
	} else if (evt.type == "mouseout"){
		if (elem.src.indexOf("plus") != -1){
			elem.src = sideMenus[menuNumber].mBarImgNormal.src;
		} else if (elem.src.indexOf("minus") != -1){
			elem.src = sideMenus[menuNumber].mBarImgNrmlOpn.src;
		}
	} else if (evt.type == "click"){
		if (elem.src.indexOf("plus") != -1){
			showSideMenu(elem.id);
		} else if (elem.src.indexOf("minus") != -1){
			removeSideMenu(elem.id);
		}
	}
	evt.cancelBubble=true;
	return false;
}

function showSideMenu(id) {

	var menuDiv, sideMenuItem, imgItemSide, itemLink, mbarImg, textNode, textContent, offsetLeft, offsetTop;
	var elem = document.getElementById(id);
	var nodeId = id.split("_");
	nodeId[1]--;


	if (sideMenus[nodeId[1]].mBarTop != "true") {
		var node = document.getElementById(id);
		menuDiv = document.createElement("div");
		menuDiv.style.zIndex = "100";
		var image = document.getElementById(id);
		for (var j = 0; j < sideMenus[nodeId[1]].menuItems.length; j++) {
			sideMenuItem = document.createElement("div");
			sideMenuItem.className = "subMenu";
			sideMenuItem.style.zIndex = "100";
			imgItemSide = document.createElement("img");
			imgItemSide.src = sideMenus[nodeId[1]].menuItems[j].img;
			imgItemSide.style.zIndex = "100";
			if (sideMenus[nodeId[1]].menuItems[j].sub == "true") {
				sideMenuItem.id = sideMenus[nodeId[1]].menuItems[j].id;
				imgItemSide.onclick = toggleSideMenu;
				imgItemSide.onmouseover = toggleSideMenu;
				imgItemSide.onmouseover = toggleSideMenu;
				imgItemSide.id = "sidemenuImg_" + sideMenuItem.id;
			}
			itemLink = document.createElement("a");
			itemLink.setAttribute("class", "sideMenuItem");
			itemLink.href = sideMenus[nodeId[1]].menuItems[j].href;
			itemLink.title = sideMenus[nodeId[1]].menuItems[j].title;
			itemLink.style.zIndex = "100";
			itemLink.style.left = "16px";
			itemLink.style.width = "100%";
			textNode = document.createTextNode(sideMenus[nodeId[1]].menuItems[j].text);
			itemLink.appendChild(textNode);
			sideMenuItem.appendChild(imgItemSide);
			sideMenuItem.appendChild(itemLink);
			if (node.nodeName != "div" && node.nodeName != "DIV"){
				node = node.parentNode;
			}

			node.appendChild(sideMenuItem);
			image.src = "graphics/minus_12x12_off.png";
		}
	}
	var ua = navigator.userAgent;
	if (ua.indexOf("Opera") == -1) {
	var temp = node.innerHTML;
	node.innerHTML = temp;
	}
	
	image.onmouseover = toggleSideMenu;
	image.onmouseout = toggleSideMenu;
	image.onclick = toggleSideMenu;
	assignLabelEventsSideMenu();
}

function removeSideMenu(id) {
	var n = document.getElementById(id);
	var node = n.parentNode;
	var kids = node.childNodes;
	var numkids = kids.length;
	var image = document.getElementById(id);
	image.src = "graphics/plus_12x12_off.png"
	for (var i = numkids-1; i>1; i--) {
		node.removeChild(kids[i]);
	}
}

// ***** assignLabelEventsSideMenu START *****
function assignLabelEventsSideMenu(){
	for (var i=1; i<4; i++){
		var temp = document.getElementById("sideMenuImg_"+(i));
		temp.onmouseover = toggleSideMenu;
		temp.onmouseout = toggleSideMenu;
		temp.onclick = toggleSideMenu;
	}
}
// ***** assignLabelEventsSideMenu END *****

// ***** navigation_side START *****
function navigation_side(elm){
	var rv = document.createElement("div");
	rv.id = "sidenavcontainer";
	rv.className = "navsidediv";
	var holder;
	var temp = elm[0].getElementsByTagName("data");
	for (var i=0; i<temp.length; i++){
		if (temp[i].nodeType == 1 && temp[i].firstChild.nodeValue && temp[i].getAttribute("data_type") == "0"){
			var content = true;
			var t = make_tag(temp[i], content);
		}else if (temp[i].nodeType == 1 && temp[i].getAttribute("data_type") == "1"){
			if (temp[i].getAttribute("tag")){
				var content = true;
				var t = make_tag(temp[i], content);
			}
		}else {
			alert("Navigation Side problem");
		}
		rv.appendChild(t);
	}
	return rv;
}
// ***** navigation_side END *****

// ***** navigation_top START *****
function navigation_top(elm){
	var temp = elm[0].getElementsByTagName("data");
	var rv = document.createElement("div");
	rv.style.textAlign = "center";
	for (var i=0; i<temp.length; i++){
		t = make_tag(temp[i], "true");
		rv.appendChild(t);
	}
	return rv;
}
// ***** naviagtion_top END *****

// ***** SIDE MENUS END *****

// ***** TOP AD START *****


