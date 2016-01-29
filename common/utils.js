define(function(require, exports, module) {
	var self = exports;
	var element = null;

	self.fireWindow = function(targetPage, eventName, id, data) {
		mui.fire(targetPage, eventName, {
			data: data
		});
		mui.openWindow({
			id: id
		});
	}

	self.copyToClip = function(text) {
		var Context = plus.android.importClass("android.content.Context");
		var main = plus.android.runtimeMainActivity();
		var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
		plus.android.invoke(clip, "setText", text);
	}

	var options = {};
	var mask = mui.createMask();
	self.init = function(args) {
			options = options;
			console.log(args.el);
			element = args.el;
		}
		//显示面板
	self.show = function() {
			if (element == null) {
				return;
			}
			mask.show();
			element.classList.add('active');
			self._back = mui.back;
			mui.back = function() {
				self.hide();
			}
		}
		//隐藏面板
	self.hide = function() {
		if (element == null) {
			return;
		}
		mask.close();
		element.classList.remove('active');
		mui.back = self._back;
	}
	mask[0].addEventListener('tap', function() {
		self.hide();
	}, false);

	//判断是否已经登陆
	self.isLogin = function(){
		var state = localStorage.getItem('$state');
		if(state == null){
			mui.confirm('您未登陆，是否立即登陆','登陆状态',['立即登陆','取消'],function(){
				if(e.index == 0){
					mui.openWindow({
						url:'login.html',
						id:'login.html'
					})
				}
			});
		}
	}
	//注销登陆
	self.logout = function(){
		localStorage.removeItem('$state');
	}
	

});