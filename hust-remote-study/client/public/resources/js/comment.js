var CommentApp =
{
	listComment : [],
	urlGetComment : "",
	appId : "",
	platform : "",
	rate : 0,
	pagination : null,
	panelComment : null,
	btnNext : null,
	btnPrev : null,
	
	initCommentApp : function initCommentApp(urlGetComment, appId, platform, rate, limit, panelComment, btnNext, btnPrev){
		this.urlGetComment = urlGetComment;
		this.appId = appId;
		this.platform = platform;
		this.rate = rate;
		this.limit = limit;
		this.panelComment = panelComment;
		this.btnNext = btnNext;
		this.btnPrev = btnPrev;
		
		$(btnNext).click(function(){
//			Pagination.onPage("next");
			CommentApp.loadComments(Pagination.startRecord, Pagination.pageSize);
			trackerEvent("comment");
		});
		
		$(btnPrev).click(function(){
//			Pagination.onPage("prev");
			CommentApp.loadComments(Pagination.startRecord, Pagination.pageSize);
			trackerEvent("comment");
		});
		
		if(appId){
			urlGetComment += "appId=" + appId + "&";
		}
		if(rate){
			urlGetComment += "rate=" + rate + "&";
		}
		if(platform){
			urlGetComment += "platform=" + platform + "&";
		}
		
		this.urlGetComment = urlGetComment;
		var urlGetCountComment = urlGetComment + "count=1";
		$.ajax({
			url : urlGetCountComment,
			dataType : 'json',
			async : true,
			cache : false,
			processData : false,
			success : function(result) {
				totalComment = result["count"];
//				Pagination.initPage(totalComment, limit, CommentApp.btnNext, CommentApp.btnPrev);
//				CommentApp.loadComments(Pagination.startRecord, Pagination.pageSize);
				CommentApp.loadComments(0, 8);
			}
		});
	},
	
	loadComments : function loadComments(offset, limit) {
		console.log("offset " + offset);
		console.log("limit " + limit);
		var url = this.urlGetComment;
		url += "offset=" + offset + "&";
		url += "limit=" + limit;
		
		$.ajax({
			url : url,
			dataType : 'json',
			async : true,
			cache : false,
			processData : false,
			success : function(result) {
				CommentApp.showComment(result);
			}
		});
	},

	showComment : function showComment(listComment) {
		var divParent = document.createElement("DIV");
		divParent.className = "panelprofile"
		for ( var i in listComment) {
			var div = document.createElement("DIV");
			div.className = "col-xs-12 col-sm-6 col-md-3 appCommentPanel";
			/*	var divImg = document.createElement("DIV");
					divImg.classList.add("appImageCommentPanel");*/
					var img = document.createElement("IMG");
					if(listComment[i].avatar){
						img.src = listComment[i].avatar;
					}else {
						img.src = "../resources/images/default_avatar.jpg";
					}
					img.classList.add("appImageComment");
				/*divImg.appendChild(img);*/
				var divInfo = document.createElement("DIV");
					divInfo.classList.add("infoCommentPanel");
						var title = document.createElement("DIV");
						title.classList.add("titleCommentPanel");
							var name = document.createElement("B");
							if(listComment[i].username){
								name.innerHTML = listComment[i].username;
							}else {
								name.innerHTML = "Anomynous";
							}
							title.appendChild(name);
							
						var body = document.createElement("DIV");
						body.style="width: 100%;padding-left: 5px;";
							var topic = document.createElement("B");
							topic.classList.add("appNameComment");
							topic.innerHTML = listComment[i].appname;
							var star = document.createElement("DIV");
							star.classList.add("starComment");
							star.appendChild(this.drawStar(listComment[i].rating));
						body.appendChild(topic);
						body.appendChild(star);
						
						var footer = document.createElement("h6");
						footer.classList.add("footerCommentPanel");
						var commentTxt = "";
						if(listComment[i].comment){
							if(listComment[i].comment.length > 80){
								commentTxt = listComment[i].comment.substring(0, 80) + "...";
							}else {
								commentTxt =listComment[i].comment;
							}
						}
						footer.innerHTML = commentTxt;
						
						var date = document.createElement("DIV");
						date.classList.add("dateComment");
						var dateTxt = "";
						var dateObj = new Date(listComment[i].date);
						if(listComment[i].date){
							dateTxt += dateObj.getDate() +  "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear();
						}
						date.innerHTML = dateTxt;
						
				divInfo.appendChild(title);
				divInfo.appendChild(body);
				divInfo.appendChild(footer);
				divInfo.appendChild(date);
				
			div.appendChild(img);
			div.appendChild(divInfo);
			divParent.appendChild(div);
		}
		this.panelComment.innerHTML = divParent.outerHTML;
	},

	drawStar : function drawStar(star) {
		var divStar = document.createElement("DIV");
		for (var i = 0; i < star; i++) {
			var img = document.createElement("IMG");
			img.classList.add("starPanel");
			img.src="/resources/images/star.png";
			divStar.appendChild(img);
		}
		return divStar;
	},
	
};
