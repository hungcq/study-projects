var listAppLang = [];
var listAppExam = [];
var listComments = [];
var sizeListApp = 16;
var sizeComment = 8;
var checkTapPanel = true;
// ---------------- load DATA --------------------

function loadHome() {
//	var listBackground = [];
//	for(var i = 1;i < 11; i++){
//		listBackground[i] = "/resources/images/screenshot/Screenshot" + i + ".png";
//	}
//
//	sliderInit(listBackground);
	document.getElementById("btnHome").style.display = "inline-block";
	document.getElementById("btnFeature").style.display = "inline-block";
	document.getElementById("btnApp").style.display = "inline-block";
	document.getElementById("btnComment").style.display = "inline-block";
	CommentApp.initCommentApp("http://v11-dot-apptracker102.appspot.com/getcomment?"
			, "null", "all", 5, 8, document.getElementById("commentContent"), document.getElementById("btnNext")
			, document.getElementById("btnPrev"));
	loadApps();
	initTracker();
	trackerPage("HOME");
}

function loadApps() {
	$.ajax({
		url : "home/listApp",
		dataType : 'json',
		async : false,
		cache : false,
		processData : false,
		success : function(result) {
			console.log
			var j = 0, k = 0;
			for ( var i in result) {
				if(result[i].type == 1){
					listAppLang[j] = result[i];
					j++;
				}else if(result[i].type == 2){
					listAppExam[k] = result[i];
					k++;
				}
			}
		}
	});
	showListApp();
}
//-------------------- show list app (start) ----------

function showListApp() {
		if(listAppLang.length > 5){
			document.getElementById("viewMoreLanguge").style.display = "inline-block";
			AppDetail.loadListApp(listAppLang.slice(0, 8), listAppLang.slice(8, listAppLang.length), "listTopLanguge", "listAllLanguge");
		}else {
			document.getElementById("viewMoreLanguge").style.display = "inline-block";
			AppDetail.loadListApp(listAppLang.slice(0, 8), null, "listTopLanguge", "listAllLanguge");
		}
		if(listAppExam.length > 5){
			document.getElementById("viewMoreExam").style.display = "inline-block";
			AppDetail.loadListApp(listAppExam.slice(0, 8), listAppExam.slice(7, listAppExam.length), "listTopExam", "listAllExam");
		}else {
			AppDetail.loadListApp(listAppExam.slice(0, 8), null, "listTopExam", "listAllExam");
			document.getElementById("viewMoreExam").style.display = "none";
		}
}


//-------------------- change language ----------------------------

function onChangeLanguage(elem) {
	var languageImg = "";
	switch (elem) {
	case 0:
		language = "/resources/images/usa.png";
		break;
	case 1:
		language = "/resources/images/vietnam.png";
		break;
	case 2:
		language = "/resources/images/english.png";
		break;
	case 3:
		language = "/resources/images/france.png";
		break;
	case 4:
		language = "/resources/images/germany.png";
		break;
	case 5:
		language = "/resources/images/rusia.png";
		break;
	}
	document.getElementById("img-lang").src = language;
	document.getElementById("menuLanguage").style.display = "none";
}

function onClickImg() {
	var x = document.getElementById("img-lang");
	var menuList = document.getElementById("menuLanguage");
	menuList.style.display = "block";
}

//------------------- change Tappanel --------------------------

function createAppUrl(appInformation){
	console.log("createAppUrl !");
	var names = appInformation.name.split(" ");
	var createAppUrl = "";
	for(i =0 ; i < names.length; i ++){
		if(i == (names.length - 1)){
			createAppUrl += names[i];
		}else {
			createAppUrl += names[i] + "-";
		}
		
	}
	if(appInformation.appIdSystem){
		createAppUrl +=  "-" + appInformation.appIdSystem;
	}
	
	return createAppUrl;
}  

$(window).scroll(function() {
	   if($(window).scrollTop() > 100) {
		   document.getElementById("upTopPanel").style.display = "block";
	   }else{
		   document.getElementById("upTopPanel").style.display = "none";
	   }
});

function upTop(){
    $("html, body").animate({ scrollTop: 0 }, 600);
}

function gotoFeature(){
	 $("html, body").animate({ scrollTop: document.getElementById("imgPanelHome").offsetHeight-40}, 600);
}
function gotoApps(){
	 $("html, body").animate({ scrollTop: document.getElementById("imgPanelHome").offsetHeight + document.getElementById("information").offsetHeight +
		 document.getElementById("feature").offsetHeight-40}, 600);
}
function gotoComment(){
	$("html, body").animate({ scrollTop: document.getElementById("imgPanelHome").offsetHeight + document.getElementById("information").offsetHeight +
		 document.getElementById("feature").offsetHeight + document.getElementById("imgScreenSort").offsetHeight}, 600);
}

$(function() {
	$("#viewMoreLanguge").click( function(){
		if($("#viewMoreLanguge").attr("aria-expanded") == "true"){
			$("#viewMoreLanguge").text("View more");
		}else {
			$("#viewMoreLanguge").text("View less");
		}
	});
	$("#viewMoreExam").click( function(){
		if($("#viewMoreExam").attr("aria-expanded") == "true"){
			$("#viewMoreExam").text("View more");
		}else {
			$("#viewMoreExam").text("View less");
		}
	});
	loadHome();
	initTracker();
	trackerPage("HOME");
});








