function loadAppPage() {
	infoApp();
}

function infoApp() {
	$.ajax({
		url : "/app/info?id=" + $("#appId").val(),
		dataType : 'json',
		async : false,
		cache : false,
		processData : false,
	    contentType: "application/json; charset=utf-8",
		success : function(result) {
			appInfo = result;
		}
	});
	
	
}


$(function() {
	var thumbnailSliderOptions =
	{
		sliderId: "thumbnail-slider",
	    orientation: "horizontal",
	    thumbWidth: "50px",
	    thumbHeight: "150px",
	    showMode: 1,
	    autoAdvance: false,
	    selectable: false,
	    slideInterval: 500,
	    transitionSpeed: 4000,
	    shuffle: false,
	    startSlideIndex: 0, //0-based
	    pauseOnHover: true,
	    initSliderByCallingInitFunc: false,
	    rightGap: 0,
	    keyboardNav: true,
	    mousewheelNav: false,
	    before: null,
	    license: "mylicense"
	};
	
	CommentApp.initCommentApp("http://v11-dot-apptracker102.appspot.com/getcomment?"
			, $("#appStoreId").val(), "all", 5, 8, document.getElementById("commentContent"), document.getElementById("btnNext")
			, document.getElementById("btnPrev"));
	loadAppPage();
	initTracker();
	trackerPage("APP");
});