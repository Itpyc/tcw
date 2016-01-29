mui.plusReady(function() {
	mui('.mui-scroll-wrapper').scroll({});
	//弹出面板函数
	var pop = $('.my-popover');
	var mask = mui.createMask();
	//显示弹出
	var show = function() {
			mask.show();
			pop.addClass('active');
			//重写返回键，按返回按钮时关闭弹出
			self._back = mui.back;
			mui.back = function() {
				self.hide();
			}
		}
		//隐藏弹出
	var hide = function() {
		mask.close();
		pop.removeClass('active');
		mui.back = self._back;
	}
	mask[0].addEventListener('tap', function() {
		hide();
	});
	var buyOptions = {
		num: 0,
		pay: '',
		send: ''
	};
	var targetPay = null;
	$('.howToPay').on('tap', 'li', function(e) {
		if (targetPay == null) {
			targetPay = $(this);
			console.log("target==null");
		}
		if (targetPay != $(this)) {
			targetPay.removeClass('chosen');
			$(this).addClass('chosen');
		}
		targetPay = $(this);
		buyOptions.pay = e.target.innerText;
		console.log(e.target.innerText);
	});
	var targetGet = null;
	$('.howToGet').on('tap', 'li', function(e) {
		if (targetGet == null) {
			targetGet = $(this);
			console.log("target==null");
		}
		if (targetGet != $(this)) {
			targetGet.removeClass('chosen');
			$(this).addClass('chosen');
		}
		targetGet = $(this);
		buyOptions.send = e.target.innerText;
		console.log(e.target.innerText);
	});
	document.getElementById("chat").addEventListener('tap', function() {
		mui.openWindow({
			url: 'chat.html',
			id: 'chat'
		})
	});
	document.getElementById("submit").addEventListener('tap', function() {
		mui.toast('已经加入购物车');
		buyOptions.num = $('.mui-input-numbox').val();
		hide();
	});
	document.getElementById("shopCart").addEventListener('tap', function() {
		show();
	});
	document.getElementById("buyNow").addEventListener('tap', function() {
		mui.openWindow({
			url: 'order.html',
			id: 'order.html'
		})
	});
});