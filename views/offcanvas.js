define(function(require, exports, module) {
	mui.init();
	document.getElementById("userInfo").addEventListener('tap', function() {
		console.log(localStorage.getItem('$state'));
		/*if (localStorage.getItem('$state')) {
			mui.toast('已经');
		} else {*/
			mui.openWindow({
				url: 'login.html',
				id: 'login.html',
				extras:{
					targetPage:'shop.html'
				}
			});
	/*	}*/



	});
});