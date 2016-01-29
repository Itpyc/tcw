define(function(require, exports, module) {
	mui.init()
	var Vue = require('../js/vue.js');
	mui.plusReady(function() {
		plus.webview.currentWebview().setStyle({
			softinputMode: "adjustResize"
		});
		console.log(document.height)
		mui('.mui-scroll-wrapper').scroll({});
		window.addEventListener('resize', function() {
			console.log("键盘弹出");
			/*console.log(document.getElementById("footer").offsetHeight)*/
			console.log(document.height)
			mui('.mui-scroll-wrapper').scroll().scrollToBottom();
		})
		/*document.getElementById("input").addEventListener('focus', function() {
			mui('.mui-scroll-wrapper').scroll().scrollToBottom();
		});*/
	});
	
	
	
	var vm = new Vue({
		el:'#order',
		data:{
			accounts:[]
		}
	})
	
	window.addEventListener('accountsFromShoopingCart',function(event){
		console.log(JSON.stringify(event.detail.data));
		vm.accounts = event.detail.data;
	});
	
});