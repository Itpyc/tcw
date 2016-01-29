define(function(require,exports,module){
	var Vue = require('../js/vue.js');
	mui.init();
	mui.previewImage();
	mui('.mui-scroll-wrapper').scroll({
		indicators:true
	})
	window.addEventListener('viliageName',function(event){
		vm.viliageName = event.detail.data;
		console.log(vm.viliageName);
		
	});
	
	var vm = new Vue({
		el:'#cunzhiInner',
		data:{
			viliageName:''
		}
	})
	
});