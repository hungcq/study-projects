//var _privateLog = console.log;

function GET(url, params, callback) {
	$.get(getUrlAutoLink(url), params, callback);
}
function POST(url, params, callback) {
	$.post(getUrlAutoLink(url), params, callback);
}
function getUrlAutoLink(url) {
	let href = window.location.href;
	if(href.indexOf('http://127.0.0.1') > -1 || href.indexOf('http://localhost:') > -1){
		//url = 'https://new-dot-e-course.appspot.com/' + (url.startsWith('/') ? '' : '/') + url;
	}
	return url;
}
jQuery(document).ready(function ($) {
	initButtonLoading();
	var c1 = true, c2 = true;
	$(window).scroll(function() { // is not moblie
	    if ($(this).scrollTop() >= 51) {        // If page is scrolled more than 50px
	        if(c1){
	        	$('#return-to-top').fadeIn(200);    // Fade in the arrow
		        $('#btn-searchCard').css("display", 'none');
		        $("#navbar-primary").append($("#ul-login"));
	        }
	        c1 = false;
	        c2 = true;
	    } else {
	       if(c2){
	    	   	$('#return-to-top').fadeOut(200);   // Else fade out the arrow
				$('#btn-searchCard').css("display", 'block');
				$("#navbar-login").append($("#ul-login"));
	       }
	       c1 = true;
	       c2 = false;
	    }
	});
	
	$('#preloader').fadeOut('slow',function(){
	});
	
	$('#return-to-top').click(function() {      // When arrow is clicked
	    $('body,html').animate({
	        scrollTop : 0                       // Scroll to top of body
	    }, 500);
	});

	if($(window).width() <768) {
		$("#navbar-primary").append($("#ul-login"));
		$("#navbar-login").empty();
	}
	
	$( window ).resize(function() {
		if($(window).width() <768) {
			$("#navbar-primary").append($("#ul-login"));
			$("#navbar-login").empty();
		} else {
			$("#navbar-login").append($("#ul-login"));
		}
	});
	$.getJSON("/resources/data/province.json", function(province) {
		$('#res-province').empty();
		province && province.forEach(function(item){
			$('#res-province').append('<option value="'+item.id+'">' + item.name + '</option>')
		});
	});
	
	loadAvatar('.load-avatar-from-facebook');
	editUserInfoProvince();
	editUserInfoSchool();
});
function editUserInfoProvince(){
	$.getJSON("/resources/data/province.json", function(province) {
		$('#user-info-province').empty();
		province && province.forEach(function(item){
			$('#user-info-province').append('<option value="'+item.id+'">' + item.name + '</option>')
			
		});
	});
}
function editUserInfoSchool(){
	$('#user-info-school').append('<option value="0">Chọn trường</option>')
}
function loadAvatar(elem){
	$(elem).each(function(index, element){
		var avatar = $(element);
		avatar.attr('data-avartar', true);
		var url = avatar.attr('data-url');
		if(url && url.length > 0){
			$.get(url, function(data){
				var avatarUrl = data.data.url;
				avatar.attr('src', avatarUrl);
			});
		}
	});
}
function scrollToElement(parentSelector, targetSelector, offsetTop) {
	console.log("ScrolltoElem : " + targetSelector);
	$(parentSelector).animate({
    	scrollTop: $(targetSelector).offset().top - offsetTop
  	}, 300, function(){
    });
}
/* validation function */
function validationPhoneNumber(phone){
	var regEx = /(09|08|02|03|04|05|06|07|01[1|2|3|4|5|6|7|8|9])+([0-9]{8})\b$/;
	return regEx.test(String(phone).toLowerCase());
}
/* format time */
function formatDate(date, showTime) {
	if(!(date instanceof Date)){
		date = new Date(date);
	}
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	
	var timeString = (day < 10 ? "0" + day : day) + '/' + (month < 10 ? "0" + month : month) + '/' + year;
	if(!!showTime){
		var h = date.getHours();
		var m = date.getMinutes();
		var s = date.getSeconds();
		return (h<10?"0"+h:h)+":"+(m<10?"0"+m : m)+":"+(s<10?"0"+s:s)+" "+timeString;
	}
	return timeString;
}
/* format time */

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validateAccount(account) {
	var patternAccount = /^[0-9a-zA-Z]+$/;
	return patternAccount.test(String(account).toLowerCase());
}
/* validation function */
/* avatar */
const defaultAvatarUrl = "https://storage.googleapis.com/ecourse-avatar/default_avatar.png";
function onErrorAvatar(img) {
//	console.log('onErrorAvatar');
	$(img).attr('src', defaultAvatarUrl);
	$(img).attr('data-avartar', true);
}
function getImageUrlAvatar(userId, isFacebookId, BUCKET_NAME) {
	var avatar = "https://storage.googleapis.com/kslearning/avatar%20copy.png";
	if(!userId){
		return avatar;
	}
	var currentTime = new Date().getTime();
	if(isFacebookId){
		avatar = "https://graph.facebook.com/" + userId +"/picture?width=100&redirect=false";
	} else {
		avatar = 'https://storage.googleapis.com/' + BUCKET_NAME + "/images/"+userId+"?t="+currentTime+"&ignoreCache=1";
	}
	return avatar;
}

function initAvatar(e) {
	var element = e ? e : '.main-avatar';
	element = $(e);
    var mapUserImage = {};
    for(var i = 0; i < element.length; i++){
        var xw = $(element[i]);
        var uId = xw.attr('data-user-id');
        xw.attr('onerror', 'onErrorAvatar(this)');
        xw.attr('data-avartar', true);
        if(mapUserImage[uId]){
            mapUserImage[uId].push(xw);
        } else {
            mapUserImage[uId] = [xw];
        } 
    }
    let listUser = Object.keys(mapUserImage).filter(userId => {
    	return !!userId;
    });
    
    if(listUser.length == 0){
    	console.log('get-avatar-from-user-ids userid empty');
    	return;
    }
//    console.log('mapUserImage', mapUserImage);
    $.post('/get-avatar-from-user-ids', { userIds: listUser }, function(data){
//    	console.log('get-avatar-from-user-ids', data);
    	let time = new Date().getTime();
    	Object.keys(data).forEach(userId => {
    		let value = JSON.parse(data[userId]);
    		mapUserImage[userId].forEach(img => {
    			if(value.isFacebookAccount){
    				img.addClass('load-avatar-from-facebook-new-'+time);
    				img.attr('data-url', value.url);
    			} else {
    				img.attr('src', value.url);
    			}
    		});
    	});
    	loadAvatar('.load-avatar-from-facebook-new-'+time);
    });
}
/* avatar */
/* login function */
function getMd5(s) {
	var hash = md5(s.toLowerCase());
	return hash;
}
function encryptByDES(message, key) {
	var keyHex = CryptoJS.enc.Utf8.parse(key);
	var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
}
function decryptByDES(ciphertext, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    // direct decrypt ciphertext
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
function onSignUpUser(button){
	updateStateButtonLoading(button, 'loading');
	clearErrorClass(button);
	var accountElement = $(button).parent().parent().find('#res-account-input');
	var nameElement = $(button).parent().parent().find('#res-name-input');
	var emailElement = $(button).parent().parent().find('#res-email-input');
	var phoneElement = $(button).parent().parent().find('#res-phone-input');
	var passwordElement = $(button).parent().parent().find('#res-password-input');
	var rePasswordElement = $(button).parent().parent().find('#res-repassword-input');
	var provinceElement = $(button).parent().parent().find('#res-province');
	var errorPanel = $(button).parent().parent().find('.error-login-panel');
	
	var account = accountElement.val();
	var name = nameElement.val();
	var email = emailElement.val();
	var phone = phoneElement.val();
	var password = passwordElement.val();
	var rePassword = rePasswordElement.val();
	var province = provinceElement.children("option:selected").val();
	
	if(!account || !validateAccount(account)) {
		addErrorClass(accountElement);
		errorPanel.text('Tài khoản không hợp lệ !');
		updateStateButtonLoading(button, 'failed', 1000);
		return;
	}
	if(!name) {
		addErrorClass(nameElement);
		errorPanel.text('Tên không hợp lệ !');
		updateStateButtonLoading(button, 'failed', 1000);
		return;
	}
	if(!email || !validateEmail(email)) {
		addErrorClass(emailElement);
		errorPanel.text('Email không hợp lệ !');
		updateStateButtonLoading(button, 'failed', 1000);
		return;
	}
	if(!phone || !validationPhoneNumber(phone)) {
		addErrorClass(phoneElement);
		errorPanel.text('Số điện thoại không hợp lệ !');
		updateStateButtonLoading(button, 'failed', 1000);
		return;
	}
	if(!password) {
		addErrorClass(passwordElement);
		errorPanel.text('Mật khẩu không hợp lệ !');
		updateStateButtonLoading(button, 'failed', 1000);
		return;
	}
	if(!rePassword) {
		addErrorClass(rePasswordElement);
		errorPanel.text('Nhập mật khẩu xác nhận !');
		updateStateButtonLoading(button, 'failed', 1000);
		return;
	}
	if(password !== rePassword){
		addErrorClass(rePasswordElement);
		errorPanel.text('Mật khẩu xác nhận không đúng !');
		updateStateButtonLoading(button, 'failed', 1000);
		return;
	}
	errorPanel.text('');
	var key = getMd5(account +"."+password);
	password = encryptByDES(password, key);
	var postData = {
		account: account,
		name: name,
		email: email,
		phone: phone,
		password: password,
		province: province
	}
	console.log('ok postData', postData);
	$.post('/register', postData, function(data){
		onLoginSuccess(button, data);
	})
}
function clearErrorClass(element) {
	$(element).parent().parent().find('.input-error').removeClass('input-error');
}
function addErrorClass(element) {
	element.addClass('input-error');
	setTimeout(function(){
		element.removeClass('input-error');
	}, 10000);
}
function onLoginUser(button){
	updateStateButtonLoading(button, 'loading');
	clearErrorClass(button);
	var accountElement = $(button).parent().find('#account-input');
	var passwordElement = $(button).parent().find('#password-input');
	
	var account = accountElement.val();
	var password = passwordElement.val();
	
	var errorPanel = $(button).parent().find('.error-login-panel');
	if(!account && (!validateEmail(account) || !validateAccount(account))) {
		addErrorClass(accountElement);
		errorPanel.text('Tài khoản không hợp lệ !');
		updateStateButtonLoading(button, 'failed', 1000);
		return;
	}
	if(!password) {
		addErrorClass(passwordElement);
		errorPanel.text('Mật khẩu không hợp lệ !');
		updateStateButtonLoading(button, 'failed', 1000);
		return;
	}
	errorPanel.text('');
	var password2 = encryptByDES(password, password + "." + password);
	password = encryptPassword(account, password);
	$.post('/login', { account: account, password: password, password2: password2 }, function(data){
		onLoginSuccess(button, data);
	});
}
function encryptPassword(key, password) {
	var key = getMd5(key +"."+password);
	return encryptByDES(password, key);
}
const LOGIN_FAILED = -1;
const LOGIN_SUCCESS = 0;
const LOGIN_ACCOUNT_IS_USED = 1;
const LOGIN_ACCOUNT_NOT_EXIST = 2;
const LOGIN_WRONG_PASSWORD = 3;
const LOGIN_WRONG_PROVIDER = 4;
const LOGIN_ACCOUNT_NOT_ACTIVATED = 5;
const LOGIN_MOBILE_IS_USED = 6;

function onLoginSuccess(button, data) {
	var errorPanel = $(button).parent().find('.error-login-panel');
	if(!data){
		return;
	}
	switch(data.loginFailedReason) {
	case LOGIN_FAILED: 
		errorPanel.text('Đăng nhập không thành công! Thử lại sau!');
		updateStateButtonLoading(button, 'failed', 1000);
		;break;
	case LOGIN_SUCCESS: 
		updateStateButtonLoading(button, 'success');
		setTimeout(function(){
			window.location.reload();
		}, 500);
		;break;
	case LOGIN_ACCOUNT_IS_USED: 
		errorPanel.text('Tài khoản đã được sử dụng!');
		updateStateButtonLoading(button, 'failed', 1000);
		;break;
	case LOGIN_ACCOUNT_NOT_EXIST: 
		errorPanel.text('Không tồn tại!');
		updateStateButtonLoading(button, 'failed', 1000);
		;break;
	case LOGIN_WRONG_PASSWORD: 
		errorPanel.text('Mật khẩu sai!');
		updateStateButtonLoading(button, 'failed', 1000);
		;break;
	case LOGIN_WRONG_PROVIDER: 
		errorPanel.text('LOGIN_WRONG_PROVIDER');
		updateStateButtonLoading(button, 'failed', 1000);
		;break;
	case LOGIN_ACCOUNT_NOT_ACTIVATED: 
		errorPanel.text('Tài khoản không hoạt động!');
		updateStateButtonLoading(button, 'failed', 1000);
		;break;
	case LOGIN_MOBILE_IS_USED: 
		errorPanel.text('Số điện thoại đã được sử dụng!');
		updateStateButtonLoading(button, 'failed', 1000);
		;break;
	}
}
function onForgetPassword(button) {
	
}

function getCookie(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for(var i = 0; i <ca.length; i++) {
	    var c = ca[i];
	    while (c.charAt(0) == ' ') {
	      c = c.substring(1);
	    }
	    if (c.indexOf(name) == 0) {
	      return c.substring(name.length, c.length);
	    }
	  }
	  return "";
}

/* login facebook function */
function onLoginFacebook(button) {
	if(usingSSO === 'true'){
		var currentUrl = window.location.href;
		var url = mainServerSSO + "oauth/authorize?client_id=" + clientIdSSO +"&redirect_uri=" + encodeURIComponent(domainUrlReDirect) 
					+"&response_type=code&state="+ encodeURIComponent(currentUrl);
		window.location.assign(url);
	} else{
		updateStateButtonLoading(button, 'loading');
		loginFacebook(function(accessToken){
			if(!accessToken){
				updateStateButtonLoading(button, 'failed', 1000);
				return;
			}
			$.get('https://graph.facebook.com/me?access_token='+accessToken, function(data){
				if(data){
					onGotFacebookInfo(button, data, accessToken);
				} else {
					updateStateButtonLoading(button, 'failed', 1000);
				}
			})
		});
	}
}
function loginFacebook(callback) {
	if (FB === undefined || FB === null) {
		alert("Có lỗi xảy ra, vui lòng tải lại trang hoặc liên hệ nhân viên tư vấn");
		callback(null)
		return;
	}
	FB.login(function(response) {
		if(response.authResponse && response.status === "connected") {
			callback(response.authResponse.accessToken)
		} else {
			callback(null)
		}
	}, { scope : "email" });
}
function onGotFacebookInfo(button, userInfo, accessToken) {
	userInfo.facebookToken = accessToken;
	getUserIdLogined(accessToken, userInfo.id, function(data) {
		if(data && data.length > 0){
			userInfo.listUserLogined = data;
		}
		doLoginWith3RDApp(button, userInfo);
	});
}
function getUserIdLogined(accessToken, idLoginNow, callback) {
	$.get("https://graph.facebook.com/me/ids_for_business?access_token="+accessToken, function(data){
		if(data && data.data && data.length > 0){
			callback(data.filter(function(item){
				return item.id !== idLoginNow
			}));
		} else 
			callback(null);
	});
}

function doLoginWith3RDApp(button, userInfo) {
	$.post('/login-facebook', userInfo, function(data){
		console.log('login-facebook success', data);
		// nofity and reload
		updateStateButtonLoading(button, 'success');
		setTimeout(function(){
			window.location.reload();
		}, 500);
	});
}
/* login facebook function */
/* login function */
/* cirlce progress */
// html: <div id='topic-progress-id-"+topicId+"' class='topic-progress-circle-point' data-progress='"+progressValue+"'></div>
// init: circleProgress(progresies[i], 0.7, "#00aa0c", "#00aa0c", "#ddd", false, 30, 2);
function circleProgress(el, fontSize, color, percentColor, roundColor, isshowIcon, size, lineWidth) {
	if(el == null || typeof(el) == 'undefined' || el.childNodes.length > 0){
		return;
	}
	var percent = el.getAttribute("data-progress");
	var type = el.getAttribute("data-type");
	percent = parseInt(percent);
	var options = {
	    percent: percent,
	    size: size,
	    lineWidth: lineWidth,
	    rotate: 0
	}
	var canvas = document.createElement('canvas');
	canvas.setAttribute('class', 'progress-canvas');
	var span = document.createElement('span');
	span.setAttribute('class', 'progress-text');
	span.style.width = size + 'px';
	span.style.height = size + 'px';
	span.style.lineHeight = size + 'px';
	span.style.position = 'absolute';
	span.style.fontSize = fontSize +'em';
	span.style.color = color;
	var img = document.createElement('img');
	img.style.width = "calc(100% + 2px)";
	span.style.display = "flex";
	span.style.alignItems = "center";
	span.style.justifyContent = "center";
	if(options.percent >= 100 && type != 2){
		img.src = "/resources/images/classes/icon-smile.png";
		span.appendChild(img);
		span.setAttribute('class', 'progress-text-done');
		span.style.fontSize = fontSize *3 +'em';
		span.appendChild(img);
	} else if(options.percent >= 0){
		if(!isshowIcon){
			span.setAttribute('class', 'progress-text');
			span.textContent = options.percent + '%';
		}
	}
	if(options.percent == 0){
		if(isshowIcon){
			img.src = "/resources/images/classes/icon-un-smile.png";
			span.appendChild(img);
			span.setAttribute('class', 'progress-text-not-done');
			span.style.fontSize = fontSize *3 +'em';
		}
	}
	if (typeof(G_vmlCanvasManager) !== 'undefined') {
	    G_vmlCanvasManager.initElement(canvas);
	}
	var ctx = canvas.getContext('2d');
	canvas.width = canvas.height = options.size;
	el.appendChild(span);
	el.appendChild(canvas);
	ctx.translate(options.size / 2, options.size / 2);
	ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);
	var radius = (options.size - options.lineWidth) / 2;
	var drawCircle = function(color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.lineWidth = lineWidth
        ctx.stroke();
	};
	if(roundColor === undefined || roundColor == null || roundColor.length === 0){
		drawCircle('#efefef', options.lineWidth, 100 / 100);
	} else {
		drawCircle(roundColor, options.lineWidth, 100 / 100);
	}
	if(options.percent > 0){
		if(percentColor === undefined || percentColor == null || percentColor.length === 0){
		drawCircle('#555555', options.lineWidth, options.percent / 100);
		} else {
			drawCircle(percentColor, options.lineWidth, options.percent / 100);
		}
	}
}
/* cirlce progress */
/* button loading */
function updateStateButtonLoading(element, state, exprire) {
	let button = $(element);
	button.css('position', 'relative');
	let buttonHtml = button.attr('data-text');
	let isDisabled = button.attr('data-state-disabled');
	isDisabled = typeof isDisabled === 'undefined' ? true : isDisabled;
	const timeExprireDefault = 2000;
	buttonHtml = buttonHtml ? buttonHtml : button.html();
	button.attr('data-text', buttonHtml);
	let temp = '<span style="visibility:hidden">'+buttonHtml+'</span>';
	let p = 'calc(50% - '+button.css('font-size')+'/2)';
	let style = 'top:'+p+';left:'+p;
	if(state === 'run' || state === 'loading'){
		button.html('<i style="position:absolute;'+style+'" class="fas fa-spinner-third fa-spin"></i>' + temp);
		isDisabled && button.prop('disabled', true);
	} else if(state === 'stop'){
		button.html(buttonHtml);
		isDisabled && button.prop('disabled', false);
	} else if(state === 'success'){
		button.html('<i style="position:absolute;'+style+'" class="far fa-check"></i>' + temp);
		isDisabled && button.prop('disabled', true);
		exprire = exprire ? exprire : timeExprireDefault;
	} else if(state === 'failed'){
		button.html('<i style="position:absolute;'+style+';color:red" class="far fa-times"></i>' + temp);
		isDisabled && button.prop('disabled', true);
		exprire = exprire ? exprire : timeExprireDefault;
	}
	if(exprire && exprire > 0){
		setTimeout(() => {
			button.html(buttonHtml);
			isDisabled && button.prop('disabled', false);
		}, exprire);
	}
}

function initButtonLoading(){
	$('.buttonLoading').each(function(index, elem){
		let button = $(elem);
		button.attr('data-text', button.text());
		let state = button.data('state');
		if(state){
			updateStateButtonLoading(button, state);
		}
	});
}
/* button loading */
/* star panel */
function drawSelectStarPanel(starPanel, callback) {
	var fontSize = starPanel.getAttribute('data-size');fontSize = fontSize ? fontSize : "14px";
	starPanel.setAttribute('data-size', fontSize);
	var color = starPanel.getAttribute('data-color');color = color ? color : "#ffc639";
	starPanel.setAttribute('data-color', color);
	const colorNoneSelect = "#ddd";
	starPanel.setAttribute('data-color-none', colorNoneSelect);
	starPanel.style.fontSize = fontSize;
	var starContent = document.createElement('span');
	for(var j = 0; j < 5; j++) {
		var star = document.createElement('i');
		star.className = "fa fa-star";
		star.style.cursor = 'pointer';
		star.style.color = colorNoneSelect;
		starContent.appendChild(star);
		addClickHandle(star, j);
	}
	starPanel.appendChild(starContent);
	function addClickHandle(star, index) {
		star.onmouseover = function() {
			resetStar();
			starContent.childNodes.forEach((e, i) => {
				if(i <= index){
					e.style.color = color;
				}
			});
		};
		var selected = false;
		star.onmouseout = function() {
			!selected && resetStar();
		};
		star.onclick = function (){
			callback && callback(index + 1);
			selected = true;
		};
	}
	function resetStar() {
		starContent.childNodes.forEach(e => {
			e.style.color = colorNoneSelect;
		});
	}
}
function drawStarPanel(starPanel, callback) {
	var total = starPanel.getAttribute('data-total');total = total ? parseInt(total) : 0;total = isNaN(total) ? 0 : total;
	var score = starPanel.getAttribute('data-score');score = score ? parseFloat(score) : 0;score = isNaN(score) ? 0 : score;
	var showTotal = starPanel.getAttribute('data-show-total');showTotal = !showTotal || showTotal === 'true';
	var showScore = starPanel.getAttribute('data-show-score');showScore = !showScore || showScore === 'true';
	var color = starPanel.getAttribute('data-color');color = color ? color : "#f5af00";
	const colorNoneSelect = "#ddd";
	var fontSize = starPanel.getAttribute('data-size');fontSize = fontSize ? fontSize : "14px";
	starPanel.style.fontSize = fontSize;
	if(showScore) {
		var s = document.createElement('span');
		s.innerHTML = "("+score+")";
		s.style.fontSize = "0.8em";
		s.style.marginRight = "3px";
		starPanel.appendChild(s);
	}
	var scoreInt = parseInt(score);
	var starContent = document.createElement('span');
	if(callback){
		starContent.style.cursor = 'pointer';
	}
	for(var j = 0; j < 5; j++) {
		var star = document.createElement('i');
		star.className = "fa fa-star";
		if(scoreInt > j){
			star.style.color = color;
		} else {
			star.style.color = colorNoneSelect;
		}
		star.setAttribute('data-index', j);
		starContent.appendChild(star);
		if(callback){
			star.addEventListener("click", function(){
				callback(this.getAttribute('data-index'));
			});
		}
	}
	starPanel.appendChild(starContent);
	if(score - scoreInt > 0.3){
		var halfStar = starContent.childNodes[scoreInt];
		if(halfStar){
			halfStar.className = "fa fa-star-half-o";
			halfStar.style.color = color;
		}
	}
	if(showTotal) {
		var t = document.createElement('span');
		t.innerHTML = "("+total+")";
		t.style.fontSize = "0.8em";
		t.style.marginLeft = "3px";
		starPanel.appendChild(t);
	}
}
/* star panel */
/* evaluate panel */
function drawChartEvaluate(evaluatePanel, data, callback){
	evaluatePanel.innerHTML = "";
	const colors = { 1:'#ff6f31', 2:'#ff9f02', 3:'#ffcf02', 4:'#9ace6a', 5:'#57bb8a' };
    evaluatePanel.style.width = "500px";
    evaluatePanel.style.display = "flex";
    evaluatePanel.className = "main-evaluate-panel";
    var leftPanel = document.createElement('div');
    leftPanel.className = "left-panel";
    var centerLine = document.createElement('div');
    centerLine.className = "center-line";
    var rightPanel = document.createElement('div');
    rightPanel.className = "right-panel";
    evaluatePanel.appendChild(leftPanel);
    evaluatePanel.appendChild(centerLine);
    evaluatePanel.appendChild(rightPanel);

    var totalNumber = document.createElement('h1');
    var starPanel = document.createElement('div');
    starPanel.className = "star-panel";
    var totalEvaluate = document.createElement('div');
    leftPanel.appendChild(totalNumber);
    leftPanel.appendChild(starPanel);
    leftPanel.appendChild(totalEvaluate);
    var total = 0;
    var keys = Object.keys(data);
    var maxValue = Math.max.apply(Math, Object.values(data));
    var totalValue = 0;
    keys.forEach(key => {
        total += key * data[key];
        totalValue += data[key];
    });
    var rateStar = 0;
    if(totalValue > 0){
    	rateStar = total/totalValue;
    }
    var rateStarValue = Math.round(rateStar * 10) / 10;
    totalNumber.innerHTML = rateStarValue;
    starPanel.setAttribute('data-total', totalValue);
    starPanel.setAttribute('data-score', rateStarValue);
    starPanel.setAttribute('data-show-total', false);
    starPanel.setAttribute('data-show-score', false);
    starPanel.setAttribute('data-size', "16px");
    starPanel.classList.add('star-panel-eveluate');
    drawStarPanel(starPanel, callback);
    totalEvaluate.innerHTML = "<i class='fa fa-user'></i> " + totalValue + " đánh giá";
    totalEvaluate.style.color = "#555";
    totalEvaluate.style.paddingTop = "10px";
    keys.reverse().forEach(key => {
        var evaluateItem = document.createElement('div');
        evaluateItem.className = "evaluate-item";
        var label = document.createElement('label');
        var evaluateContentPanel = document.createElement('div');
        var evaluateContent = document.createElement('div');
        label.innerHTML = key;
        var v = data[key];
        var cc = (v / maxValue) * 100;
        if(cc > 0){
        	evaluateContent.style.width = cc + "%";
        } else {
        	evaluateContent.style.width = "";
        }
        evaluateContent.style.backgroundColor = colors[key];
        evaluateContent.innerHTML = "(" + v + ")";
        evaluateContentPanel.appendChild(evaluateContent);
        evaluateItem.appendChild(label);
        evaluateItem.appendChild(evaluateContentPanel);
        rightPanel.appendChild(evaluateItem);
    });
}
/* evaluate panel */

/* format time */
function formatDate(date, showTime) {
	if(!(date instanceof Date)){
		date = new Date(date);
	}
	var day = date.getDate();
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	
	var timeString = (day < 10 ? "0" + day : day) + '/' + (month < 10 ? "0" + month : month) + '/' + year;
	if(!!showTime){
		var h = date.getHours();
		var m = date.getMinutes();
		var s = date.getSeconds();
		return (h<10?"0"+h:h)+":"+(m<10?"0"+m : m)+":"+(s<10?"0"+s:s)+" "+timeString;
	}
	return timeString;
}
/* format time */

/* encode for html */
function encodeForHTML(value) {
	if(!value){
		return value;
	}
	var lt = /</g, gt = />/g, ap = /'/g, ic = /"/g;
	return value.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
}

/* dropdown panel */
function dropdownPanel(b, mp, onFadeToggle, styleName) {
	var button = $(b);
	var mainPanel = $(mp);
	if(!button.hasClass('button-widget-ks-dropdown')){
		button.addClass("button-widget-ks-dropdown");
	}
	if(mainPanel.hasClass('menu-widget-ks-dropdown')){
		mainPanel.addClass("menu-widget-ks-dropdown");
	}
	if(styleName){
		mainPanel.addClass(styleName);
	} else {
		mainPanel.css('width', "300px");
		mainPanel.css('height', "400px");
	}
	if(button.parent().hasClass('main-ks-dropdown')){
		button.parent().addClass("main-ks-dropdown");
	}
	button.off('click').click(function () {
		mainPanel.fadeToggle('fast', 'linear', function () {
			onFadeToggle && onFadeToggle();
		});
        return false;
    });
    $(document).click(function () {
        mainPanel.hide();
    });
    mainPanel.off('click').click(function (e) {
        return false;
    });
}
/* dropdown panel */
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, pos) {
            pos = !pos || pos < 0 ? 0 : +pos;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}

function addUrlWithParams(params) {
	var rootUrl = window.location.pathname.substr(0);
	var hash = window.location.hash;
	var search = window.location.search;
	if(params){
		if(search && params.startsWith('\?')){
			params = params.replace('?', '');
		} else if(search && !params.startsWith('&')) {
			params = '&'+params;
		} else if(!search && !params.startsWith('\?')) {
			params = '?' + params;
		} else if(!search && params.startsWith('&')) {
			params = params.replace('&', '?');
		}
	}
	window.history.pushState({},"", rootUrl + search + (params ? params : "") + (hash ? hash : ""), "", "");
}

function replaceUrlWithParams(params) {
	var rootUrl = window.location.pathname.substr(0);
	var hash = window.location.hash;
	if(params && !params.startsWith('?')){
		params = '?' + params;
	}
	window.history.pushState({},"", rootUrl + (params ? params : "") + (hash ? hash : ""), "", "");
}

function replaceUrlWithParamsAndHash(params, hash) {
	var rootUrl = window.location.pathname.substr(0);
	if(params && !params.startsWith('?')){
		params = '?' + params;
	}
	if(hash && !hash.startsWith('#')){
		hash = '#' + hash;
	}
	window.history.pushState({},"", rootUrl + (params ? params : "") + (hash ? hash : ""), "", "");
}

const SPECIAL_CHARACTERS = {"À":0,"Á":1,"Â":2,"Ã":3,"È":4,"É":5,"Ê":6,"Ì":7,"Í":8,"Ò":9,"Ó":10,"Ô":11,"Õ":12,"Ù":13,"Ú":14,"Ý":15,"à":16,"á":17,"â":18,"ã":19,"è":20,"é":21,"ê":22,"ì":23,"í":24,"ò":25,"ó":26,"ô":27,"õ":28,"ù":29,"ú":30,"ý":31,"Ă":32,"ă":33,"Đ":34,"đ":35,"Ĩ":36,"ĩ":37,"Ũ":38,"ũ":39,"Ơ":40,"ơ":41,"Ư":42,"ư":43,"Ạ":44,"ạ":45,"Ả":46,"ả":47,"Ấ":48,"ấ":49,"Ầ":50,"ầ":51,"Ẩ":52,"ẩ":53,"Ẫ":54,"ẫ":55,"Ậ":56,"ậ":57,"Ắ":58,"ắ":59,"Ằ":60,"ằ":61,"Ẳ":62,"ẳ":63,"Ẵ":64,"ẵ":65,"Ặ":66,"ặ":67,"Ẹ":68,"ẹ":69,"Ẻ":70,"ẻ":71,"Ẽ":72,"ẽ":73,"Ế":74,"ế":75,"Ề":76,"ề":77,"Ể":78,"ể":79,"Ễ":80,"ễ":81,"Ệ":82,"ệ":83,"Ỉ":84,"ỉ":85,"Ị":86,"ị":87,"Ọ":88,"ọ":89,"Ỏ":90,"ỏ":91,"Ố":92,"ố":93,"Ồ":94,"ồ":95,"Ổ":96,"ổ":97,"Ỗ":98,"ỗ":99,"Ộ":100,"ộ":101,"Ớ":102,"ớ":103,"Ờ":104,"ờ":105,"Ở":106,"ở":107,"Ỡ":108,"ỡ":109,"Ợ":110,"ợ":111,"Ụ":112,"ụ":113,"Ủ":114,"ủ":115,"Ứ":116,"ứ":117,"Ừ":118,"ừ":119,"Ử":120,"ử":121,"Ữ":122,"ữ":123,"Ự":124,"ự":125,"Ỹ":126,"Ỳ":127};
const REPLACEMENTS = ["A","A","A","A","E","E","E","I","I","O","O","O","O","U","U","Y","a","a","a","a","e","e","e","i","i","o","o","o","o","u","u","y","A","a","D","d","I","i","U","u","O","o","U","u","A","a","A","a","A","a","A","a","A","a","A","a","A","a","A","a","A","a","A","a","A","a","A","a","E","e","E","e","E","e","E","e","E","e","E","e","E","e","E","e","I","i","I","i","O","o","O","o","O","o","O","o","O","o","O","o","O","o","O","o","O","o","O","o","O","o","O","o","U","u","U","u","U","u","U","u","U","u","U","u","U","u","Y","Y"];	
function stringReplaceUrl(str, regexReplace) {
	var result = '';
	for(var i = 0; i < str.length; i++){
		var c = str.charAt(i);
		if(SPECIAL_CHARACTERS[c]){
			c = REPLACEMENTS[SPECIAL_CHARACTERS[c]];
		}
		result += c;
	}
	return result.replace(/[^a-zA-Z0-9]/g,regexReplace ? regexReplace : '-').toLowerCase();
}
function stringReplaceText(str) {
	return stringReplaceUrl(str, ' ');
}
function initTable(element, titles, dataSet, renderItemCallback, searchPlaceholder) {
	var _ts = [];
	titles.forEach(function(t, i){
		_ts.push({
			title: t, 
			className: "column-" + i
		});
	});
	var _renderItemO = {};
	if(_renderItemO){
		_renderItemO = {"targets": renderItemCallback.target,  render: renderItemCallback.callback }
	}
	var _is = $(element).DataTable({
		"searching": false,
		"dom": '<"top"f>rt<"bottom"ipl><"clear">',
		data: dataSet,
		columns: _ts,
		"columnDefs": [ {
			"searchable": false,
            "orderable": false,
            "targets": 0
        	},
        	_renderItemO
        ],
        "order": [[ 1, 'asc' ]],
        "language": {
            "lengthMenu": "Hiển thị  _MENU_  /Trang",
            "zeroRecords": "Không tìm thấy kết quả phù hợp!",
            "info": "Hiển thị _START_ - _END_ / tổng số _TOTAL_",
            "search":"Tìm kiếm:",
            "infoEmpty": "",
            "infoFiltered": "",
            "paginate": {
                "first":      "Đầu",
               "last":       "Cuối",
                "next":       "Sau",
                "previous":   "Trước"
            },
            "searchPlaceholder": searchPlaceholder ? searchPlaceholder : "Nhập tên"
        },
	});
	$('.dataTables_filter').addClass('dataTables-filter-edit');
	$('.dataTables_length').addClass('dataTables-length-edit');
	$('.dataTables_info').addClass('dataTables-info-edit');
	$('.bottom').addClass('pull-flex');
	_is.on('order.dt search.dt', function () {
		_is.column(0, { search:'applied', order:'applied' }).nodes().each( function (cell, i) {
			cell.innerHTML = i+1;
		});
	}).draw();
	return _is;
}

function scrollToTop() {
	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	}
}

function fomatMoney(money){
	money = Math.round(money * 10)/10;
	return Intl.NumberFormat().format(money);
}
function getLinkTopic(name, id) {
	return "/bai-hoc/"+stringReplaceUrl(name)+"-" + id;
}

/* import js */
const mapScriptImported = [];
var mapCountLoadScript = {
	datas: [],
	maxCount: 0,
	count: 0
};
function importJsUrls(...urls) {
	mapCountLoadScript.maxCount += 1;
	mapCountLoadScript.datas = mapCountLoadScript.datas.concat(urls.filter(function(url){
		return mapCountLoadScript.datas.indexOf(url) < 0;
	}));
	setTimeout(function(){
		var scripts = document.getElementsByTagName('script');
		$.each(scripts, function(index, script){
			var src = script.getAttribute('src');
			src && mapScriptImported.indexOf(src) < 0 && mapScriptImported.push(src);
		});
		mapCountLoadScript.count += 1;
		if(mapCountLoadScript.count == mapCountLoadScript.maxCount){
			mapCountLoadScript.datas.forEach(function(url){
				if(mapScriptImported.indexOf(url) < 0){
					var imported = document.createElement('script');
					imported.src = url;
					document.head.appendChild(imported);
				}
			});
		}
	}, 2000);
}
/* import js */
/* exitFullscreen */
function exitFullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.documentElement;
    console.log('docElm: '+ JSON.stringify(docElm))
    if (!isInFullScreen) {
        /* if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        } */
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
/* exitFullscreen */

/* get -thumbnail */
function getThumbnailYoutubeById(videoId) {
	return "https://img.youtube.com/vi/"+videoId+"/0.jpg";
}

function getThumbnailFacebookById(id) {
	return "https://graph.facebook.com/"+id+"/picture";
}

function getThumbnailVimeoById(urlVideo, callback) {
	if(!urlVideo || urlVideo.indexOf("http") == -1){
		callback();
		return;
	}
	var url = "https://vimeo.com/api/oembed.json?url="+urlVideo;
	$.get(url, {}, function(data){
		if(data){
			if(data.thumbnail_url){
				callback(data.thumbnail_url);
				return;
			}
		}
		callback();
	});
}
/* get -thumbnail */
function getLoadingHtml(color){
	return "<div class=\"lds-spinner\" style=\"margin: 0 auto;display:block;"+(color ? "color: "+color : "")+"\"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>";
}