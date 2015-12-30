define(function(require, exports, module) {
	mui.init();
	/*window.addEventListener('details',function(event){
		vm.title = event.detail.id;
		console.log(vm.title)
	});*/
	
	mui.plusReady(function(){
		vm.title = plus.webview.currentWebview().data;
		console.log(vm.title);
	});
	
	var Vue = require('../js/vue.js');
	var vm = new Vue({
		el:'#details',
		data:{
			title:''
		},
		methods:{
			chat:function(){
				mui.openWindow({
					url:'chat.html',
					id:'chat'
				})
			}
		}
	});
	
});