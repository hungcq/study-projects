const useCookie = false;
jQuery(document).ready(function ($) {
	if(!USER_ALL_INFO.isLoggedIn){
		return;
	}
	if(useCookie){
		var cartItemsStr = Cookies.get('cart-items');
		if(cartItemsStr){
			var cartItems = JSON.parse(cartItemsStr);
			if($.isArray(cartItems)) {
				updateCartItem(cartItems);
				return;
			}
		}
	}
	$.post('/count-cart-items', { userId: USER_ALL_INFO.id }, function(data){
		console.log('count-cart-items', USER_ALL_INFO.id, data);
		updateCartItem(data);
	});
});
function updateCartItem(data) {
	if(!data){
		data = [];
	}
	var _elem = $('#count-cart-html ._count');
	if(data.length > 0){
		_elem.show();
		_elem.html(data.length);
		useCookie && Cookies.set('cart-items', data);
	} else {
		_elem.hide();
		useCookie && Cookies.remove('cart-items');
	}
}
function addCartItem(itemId, itemType, callback) {
	if(!USER_ALL_INFO.id || !USER_ALL_INFO.isLoggedIn){
		openLoginDialog();
		return;
	}
	$.post('/add-cart-item', { userId: USER_ALL_INFO.id, itemId: itemId, itemType: itemType }, function(data){
		console.log('add-cart-item', data);
		callback && callback(data);
		if(typeof data.status !== 'undefined'){
			if(data.status == -2){
				openLoginDialog();
			}
			if(data.status == -1){
				showError('Khoá học đã có trong giỏ hàng!');
			}
			return;
		}
		showSuccess('Đã thêm vào giỏ hàng!');
		updateCartItem(data.items);
	});
}
