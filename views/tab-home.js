define(function(require, exports, module) {
	mui.init();
	mui.plusReady(function() {

		mui.preload({
			url: 'shop.html',
			id: 'shop.html'
		});
		mui.preload({
			url: 'shoppingCart.html',
			id: 'shoppingCart.html'
		});
		mui.preload({
			url: 'sellerHome.html',
			id: 'sellerHome.html'
		});

		mui('#grid').on('tap', 'li ', function(e) {
			console.log(this.getAttribute("id"));
			mui.fire(plus.webview.getWebviewById('shop.html'), 'fromHome', {
				data: this.getAttribute("id")
			});
			mui.openWindow({
				id: 'shop.html'
			});
		});
	});

});