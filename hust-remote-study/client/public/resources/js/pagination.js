var Pagination =
{
	startRecord : 0,
	totalRecord : 0,
	totalPage : 0,
	pageSize : 1,
	pageCurrent : 0,
	btnNext : null,
	btnPrev : null,

	initPage : function initPage(totalRecord, pageSize, btnNext, btnPrev){
		this.totalRecord = totalRecord;
		this.pageSize = pageSize;
		this.totalPage = totalRecord / pageSize;
		this.pageCurrent = 1;
		this.btnNext = btnNext;
		this.btnPrev = btnPrev;
	},

	onPage : function onPage(paginationTxt){
		if(paginationTxt == "next" && this.pageCurrent < this.totalPage){
			this.pageCurrent ++;
		}else if(paginationTxt == "prev" && this.pageCurrent > 1){
			this.pageCurrent --;
		}
		console.log("this.totalPage " + this.totalPage);
		console.log("this.pageCurrent " + this.pageCurrent);
		this.startRecord = (this.pageCurrent - 1) * this.pageSize;
		console.log("this.startRecord " + this.startRecord);
		if(this.pageCurrent == this.totalPage && this.btnNext){
			$(this.btnNext).hide();
		}else{
			$(this.btnNext).show();
		}
		
		if(this.pageCurrent == 1 && this.btnPrev){
			$(this.btnPrev).hide();
		}else{
			$(this.btnPrev).show();
		}
	},
	
};
