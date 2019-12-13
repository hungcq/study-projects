var paramsOptionDefault = {
	id: 'my-modal',
	style: '',  // object css or inline css
	hiddenHeader: false,
	hiddenFooter: false,
	hiddenBody: false,
	styleFooter: '',
	styleHeader: '',
	styleBody: '',
	htmlBody: '',
	htmlFooter: '',
	title: '',
	okText: '',
	cancelText: '',
	styleOkText: '',
	styleCancelText: '',
	hiddenClose: false,
	styleModalContent: '',
	styleModalDialog: '',
	showNow: false,
	onConfirm: function(){}
}

function createModal(params) {
	if (params) {
		var mainPanel = $("#modal-main-template").clone();
		mainPanel.addClass('my-modal');
		if (params.id) {
			mainPanel.attr("id", params.id);
		} else {
			var id = "modal-" + new Date().getTime() + "-" + Math.random();
			mainPanel.attr("id", id);
		}
		if (params.style) {
			mainPanel.addClass(params.style);
		}
		$("body").append(mainPanel);
		if (params.hiddenHeader) {
			// hidden header
			mainPanel.find(".modal-header").remove();
		}
		if (params.hiddenFooter) {
			// hidden footer
			mainPanel.find(".modal-footer").remove();
		}
		if (params.hiddenBody) {
			// hidden body
			mainPanel.find(".modal-body").remove();
		} else {
			mainPanel.on("click", "button, a", function (event) {
				if(params.onConfirm){
					params.onConfirm({ type: "event-from-child", event: event, result: false });
				}
			});
		}
		if (params.styleFooter) {
			// add style footer
			if (isObject(params.styleFooter)) {
				mainPanel.find(".modal-footer").css(params.styleFooter);
			} else {
				mainPanel.find(".modal-footer").addClass(params.styleFooter);
			}
		}
		if (params.styleHeader) {
			// add style header
			if (isObject(params.styleHeader)) {
				mainPanel.find(".modal-header").css(params.styleHeader);
			} else {
				mainPanel.find(".modal-header").addClass(params.styleHeader);
			}
		}
		if (params.htmlBody) {
			// // add style body
			if(isObject(params.htmlBody)){
				mainPanel.find(".modal-body").append(params.htmlBody);
			} else {
				mainPanel.find(".modal-body").html(params.htmlBody);
			}
		}
		if (params.styleBody) {
			// // add style body
			if (isObject(params.styleBody)) {
				mainPanel.find(".modal-body").css(params.styleBody);
			} else {
				mainPanel.find(".modal-body").addClass(params.styleBody);
			}
		}
		if (params.title) {
			// set title
			if(isObject(params.title)){
				mainPanel.find(".modal-title").append(params.title);
			} else {
				mainPanel.find(".modal-title").html(params.title);
			}
		} else {
			mainPanel.find(".modal-title").remove();
		}
		if (params.okText) {
			// add ok text
			if(isObject(params.okText)){
				mainPanel.find(".ok-btn").append(params.okText);
			} else {
				mainPanel.find(".ok-btn").html(params.okText);
			}
			mainPanel
				.find(".ok-btn")
				.off("click")
				.on("click", function () {
					if (params.onConfirm) {
						mainPanel.on("hidden.bs.modal", function () {
							params.onConfirm({ type: 'click', result: true });
						});
					}
				});
		} else {
			mainPanel.find(".ok-btn").remove();
		}
		if (params.cancelText) {
			// add cancel text
			if(isObject(params.cancelText)){
				mainPanel.find(".cancel-btn").append(params.cancelText);
			} else {
				mainPanel.find(".cancel-btn").html(params.cancelText);
			}
			mainPanel
				.find(".cancel-btn")
				.off("click")
				.on("click", function () {
					if (params.onConfirm) {
						mainPanel.on("hidden.bs.modal", function () {
							params.onConfirm({ type: 'click', result: false });
						});
					}
				});
		} else {
			mainPanel.find(".cancel-btn").remove();
		}
		if (params.styleOkText) {
			// add class name .modal-dialog
			if (isObject(params.styleOkText)) {
				mainPanel.find(".ok-btn").css(params.styleOkText);
			} else {
				mainPanel.find(".ok-btn").addClass(params.styleOkText);
			}
		}
		if (params.styleCancelText) {
			// add class name .modal-dialog
			if (isObject(params.styleCancelText)) {
				mainPanel.find(".cancel-btn").css(params.styleCancelText);
			} else {
				mainPanel.find(".cancel-btn").addClass(params.styleCancelText);
			}
		}
		if (params.htmlFooter) {
			// set html footer
			if(isObject(params.htmlFooter)){
				mainPanel.find(".modal-footer").append(params.htmlFooter);
			} else {
				mainPanel.find(".modal-footer").html(params.htmlFooter);
			}
		}
		if (params.hiddenClose) {
			// hidden close button poisition: top-right
			mainPanel.find(".close").remove();
		}
		if (params.styleModalContent) {
			// add class name .modal-content
			if (isObject(params.styleModalContent)) {
				mainPanel.find(".modal-content").css(params.styleModalContent);
			} else {
				mainPanel.find(".modal-content").addClass(params.styleModalContent);
			}
		}
		if (params.styleModalDialog) {
			// add class name .modal-dialog
			if (isObject(params.styleModalDialog)) {
				mainPanel.find(".modal-dialog").css(params.styleModalDialog).css('margin-left', 'auto').css('margin-right', 'auto');
			} else {
				mainPanel.find(".modal-dialog").addClass(params.styleModalDialog);
			}
		}
		if (params.showNow) {
			// show dialog now
			if (params.showNow === "backdrop-keyboard") {
				mainPanel.modal({
					backdrop: "static",
					keyboard: false
				});
			} else {
				mainPanel.modal("show");
			}
		}
		if (params.onConfirm) {
			mainPanel.on("hidden.bs.modal", function () {
				params.onConfirm({type: "only-hide", result: false});
			});
		}
		return mainPanel;
	}
	alert("create modal params == null");
	return null;
}
function isObject(content) {
	return typeof content === "object";
}
function showNotice(msg) {
	var mainPanel = $('<div class="icon-notice-panel '+msg.style+'"></div>');
	mainPanel.append($('<div class="modal-icon-box">'+msg.icon+'</div>'));
	if(msg.title){
		mainPanel.append($('<div class="m-title">'+msg.title+'</div>'));
	}
	if(msg.msg){
		var _msg = $('<div class="m-msg"></div>');
		_msg.append($("<span>"+msg.msg+"</span>"));
		mainPanel.append(_msg);
	}
	var controlPanel = $('<div style="display:flex;align-items:center"></div>');
		var buttonCancel = $('<button class="btn-close-bottom" data-result="false">Đóng</button>');
		controlPanel.append(buttonCancel);
		if(msg.onAnswer){
			var buttonOk = $('<button class="btn-close-bottom" data-result="true">Đồng ý</button>');
			controlPanel.append(buttonOk);
		}
		mainPanel.append(controlPanel);
		var modal = createModal({
			htmlBody: mainPanel,
			showNow: true,
			style: 'modal-notice',
			okText: msg.okText ? msg.okText : "",
			cancelText: msg.cancelText ? msg.cancelText : "Đóng",
			styleFooter: { padding: "7px" },
			styleHeader: { padding: "7px" },
			styleModalDialog: { marginTop: '100px' },
			hiddenHeader: true,
			hiddenFooter: true,
		});
		if(msg.onAnswer){
			buttonOk.on('click', function(){
				modal.modal('hide');
				msg.onAnswer(true);
			});
		}
		buttonCancel.on('click', function(){
			modal.modal('hide');
			msg.onAnswer && msg.onAnswer(false);
		});
	return modal;
}
function showSuccess(title, msg) {
	return showNotice({ style: 'showSuccess', icon: '<i class="far fa-check icon__"></i>', title: title, msg: msg });
}
function showError(title, msg) {
	return showNotice({ style: 'showError', icon: '<i class="far fa-times icon__"></i>', title: title, msg: msg });
}
function showInfo(title, msg) {
	return showNotice({ style: 'showInfo', icon: '<i class="fal fa-info icon__"></i>', title: title, msg: msg });
}
function showQuestion(question, msg, onAnswer) {
	return showNotice({ style: 'showQuestion', icon: '<i class="fal fa-question icon__"></i>', title: question, msg:msg, onAnswer });
}
function showModal(html) {
	return createModal({ hiddenFooter: true, hiddenHeader: true, showNow: true, htmlBody: html });
}