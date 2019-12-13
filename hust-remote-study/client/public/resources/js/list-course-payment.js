function renderSelectedCoursesPanel(hasData, courseIdsSelected, comboIdsSelected) {
	var mainPanel = $("#selected-courses-panel");
	if(!hasData){
		mainPanel.html('<div>Bạn chưa chọn khoá học nào !</div>');
		return;
	}
	mainPanel.empty();
	courseIdsSelected && courseIdsSelected.forEach(function(courseId) {
		if(mapCourseId[courseId]){
			mainPanel.append(renderSelectedCourseItem(mapCourseId[courseId]));
		}
	});
	comboIdsSelected && comboIdsSelected.forEach(function(comboId) {
		if(mapComboId[comboId]){
			mainPanel.append(renderSelectedComboItem(mapComboId[comboId]));
		}
	});
	
	function renderSelectedCourseItem(course) {
		var html ='<div class="item-course-bought">';
			html += '<div>';
				html += '<label>'+course.name+'</label>';
				html += '<div class="price-html">'+getPrice(course.id, course.realCost, course.cost, course.discountPrice, course.userBought)+'</div>';
			html += '</div>';
			html += '<span class="remove-course-item" onclick="removeCourseItem(this, '+course.id+')"><i class="fa fa-times"></i></span>';
		html +='</div>';
		return $(html);
	}
	
	function renderSelectedComboItem(combo) {
		var html ='<div class="item-course-bought">';
			html += '<div>';
				html += '<label>'+combo.name+'</label>';
				html += '<div class="price-html">'+getPrice(combo.id, combo.realCost, combo.cost, combo.discountPrice, combo.userBought)+'</div>';
			html += '</div>';
			html += '<span class="remove-course-item" onclick="removeComboItem(this, '+combo.id+')"><i class="fa fa-times"></i></span>';
		html +='</div>';
		return $(html);
	}
}

var newversion = 0;
function renderCoursePage(data, version, offset, callback) {
	newversion = version ? version : 0;
	renderCoursesPanel(data);
	$('#label-result').html((data.count ? data.count : 0) + ' khoá học');
	$('#page-panel').empty();
	var page = parseInt(data.count/LIMIT * 10)/10;
	if(page <= 1){
		$('#page-panel').hide();
	} else {
		$('#page-panel').show();
	}
	for(var i = 0; i < page; i++){
		var pagePanel = $('<button data-offset="'+i+'">'+(i + 1)+'</button>');
		if(offset/LIMIT == i){
			pagePanel.addClass('active');
		}
		$('#page-panel').append(pagePanel);
		pagePanel.click(function(){
			callback(parseInt($(this).data('offset') * LIMIT));
		});
	}
}

function renderCoursesPanel(data) {
	var courses = data.courses;
	var combos = data.combos;
	if(typeof showSelectedLabel === 'function'){
		showSelectedLabel();
	}
	var coursesPanel = $('#courses-panel');
	coursesPanel.empty();
	if(courses || combos) {
		courses.forEach(function(course){
			mapCourseId[course.id] = course;
			coursesPanel.append(renderCourseItemPanel(course));
		});
		combos && combos.forEach(function(combo){
			mapCourseId[combo.id] = combo;
			coursesPanel.append(renderComboItemPanel(combo)); // render combo item
		});
	   	var starPanels = document.getElementsByClassName('star-panel');
		for(var is = 0;is < starPanels.length; is++) {
			drawStarPanel(starPanels[is]);
		}
	} else {
		coursesPanel.html('<div>Không có khoá học !</div>');
	}
}

function renderCourseItemPanel(course) {
	var itemInfo = course.itemInfo;
	var mainPanel = $('<div class="row course-item-panel"></div>');
	var avatarPanel = $('<div class="col-xs-12 col-sm-3 avatar-course-wrapper"><img src="'+(course.avatar ? course.avatar : "/resources/images/background-course.jpg")+'"></div>');
	mainPanel.append(avatarPanel);
	var contentPanel = $('<div class="col-xs-12 col-sm-6 course-content-panel"></div>');
		var labelPanel = $('<div class="label-panel"><div class="dot-2" title="'+course.name+'">'+course.name+'</div></div>');
		contentPanel.append(labelPanel);
		var infoPanel = $('<div class="course-info-panel"></div>');
			var info0Panel=$('<div></div>')
			var info1Panel = $('<div class="info1-panel"></div>');
			var info2Panel = $('<div class="dot-2" title="'+course.shortDescription+'"></div>');
			info2Panel.text($('<span>'+course.shortDescription+'</span>').html());
			var info3Panel = $('<div class="note-text">(*) Hạn sử dụng: 90 ngày kể từ ngày kích hoạt.</div>');
				var starPanel = $('<span class="star-panel" data-show-total="true" data-show-score="false" data-total="'+itemInfo.rateCount+'" data-score="'+itemInfo.rateValue+'"></span>');
				info1Panel.append(starPanel);
			info0Panel.append(info1Panel);
			info0Panel.append(info2Panel);
			infoPanel.append(info0Panel);
			infoPanel.append(info3Panel);
		contentPanel.append(infoPanel);
		
	mainPanel.append(contentPanel);
	var paymentPanel = $('<div class="col-xs-12 col-sm-3 course-payment-panel"></div>');
		var pricePanel = $('<span class="price-panel">'+getPrice(course.id, course.realCost, course.cost, course.discountPrice, course.userBought)+'</span>');
		paymentPanel.append(pricePanel);
		var buttonPayment = null;
		if(newversion) {
			buttonPayment = $('<button class="button-payment button-payment-'+course.id+'" onclick="removeCourse(this, '+course.id+')">x</button>');
		} 
		else if(isJoinedClass(course.id)){
				paymentPanel.empty();
				buttonPayment = $('<button class="button-payment button-payment-'+course.id+'"><i class="fa fa-check"></i> Đã tham gia</button>');
			} else {
				if(course.free){
					buttonPayment = $('<button class="button-payment button-payment-'+course.id+'">Tham gia</button>');
					buttonPayment.click(function(){
						onJoinCourse(buttonPayment, course);
					});
				} else {
					buttonPayment = $('<button class="button-payment button-payment-'+course.id+'" onclick="onSelectCourse(this, '+course.id+')">Mua</button>');
				}
			}
		paymentPanel.append(buttonPayment);
	mainPanel.append(paymentPanel);
	if(courseIdsSelected.indexOf(course.id) > -1){
		$(buttonPayment).addClass('active');
		$(buttonPayment).html('<span>Bỏ chọn</span>');
	}
	return mainPanel;
}

function renderComboItemPanel(combo) {
	var mainPanel = $('<div class="row course-item-panel"></div>');
	var avatarPanel = $('<div class="col-xs-12 col-sm-3 avatar-course-wrapper"><img src="'+(combo.avatar ? combo.avatar : "/resources/images/background-course.jpg")+'"></div>');
	mainPanel.append(avatarPanel);
	var contentPanel = $('<div class="col-xs-12 col-sm-6 course-content-panel"></div>');
		var labelPanel = $('<div class="label-panel"><div class="dot-2" title="'+combo.name+'">'+combo.name+'</div></div>');
		contentPanel.append(labelPanel);
		var infoPanel = $('<div class="course-info-panel"></div>');
			var info0Panel=$('<div></div>')
			var info1Panel = $('<div class="info1-panel"></div>');
			var info2Panel = $('<div class="dot-2" title="'+combo.description+'">'+combo.description+'</div>');
			var info3Panel = $('<div class="note-text">(*) Hạn sử dụng: 90 ngày kể từ ngày kích hoạt.</div>');
			info0Panel.append(info1Panel);
			info0Panel.append(info2Panel);
			if(combo.courses){
				var cl = combo.courses.length;
				var courseName = 'Combo ' + cl + ' khoá học: ';
				combo.courses && combo.courses.forEach(function(c, index){
					courseName += c.name + (cl - 1 == index ?  '' : '; ');
				});
				info0Panel.append($('<div class="combo-name-panel">'+courseName+'</div>'));
			}
			infoPanel.append(info0Panel);
			infoPanel.append(info3Panel);
		contentPanel.append(infoPanel);
		
	mainPanel.append(contentPanel);
	var paymentPanel = $('<div class="col-xs-12 col-sm-3 course-payment-panel"></div>');
		var pricePanel = $('<span class="price-panel">'+(combo.price > 0 ? combo.price : 'Free')+'</span>');
		paymentPanel.append(pricePanel);
		var buttonPayment = null;
		if(newversion)
			buttonPayment = $('<button class="button-payment button-payment-'+course.id+'" onclick="removeCombo(this, '+course.id+')">X</button>');
		else
		if(isJoinedClasses(combo.itemIds)){
			buttonPayment = $('<button class="button-payment button-payment-'+combo.id+'"><i class="fa fa-check"></i> Đã mua</button>');
		} else {
			buttonPayment = $('<button class="button-payment button-payment-'+combo.id+'" onclick="onSelectCombo(this, '+combo.id+')">Mua</button>');
		}
		paymentPanel.append(buttonPayment);
	mainPanel.append(paymentPanel);
	if(comboIdsSelected.indexOf(combo.id) > -1){
		$(buttonPayment).addClass('active');
		$(buttonPayment).html('<span>Bỏ chọn</span>');
	}
	return mainPanel;
}

