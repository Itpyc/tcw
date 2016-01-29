define(function(require, exports, module) {
	var self = exports;
	var Vue = require('../js/vue.js');
	var target1 = document.querySelector('.amount-active');
	//改变颜色
	Vue.directive('change', function(value) {
		this.el.addEventListener('tap', function() {
			console.log(this.parentElement.id);
			if (this.parentElement.id == "distance") {
				vm.distance = this.innerText;
			}
			if (this.parentElement.id == "amount") {
				vm.deliveryCapacity = this.innerText;
				vm.amount = value;
			}
			if (this != target1) {
				target1.classList.remove('amount-active');
				this.classList.add('amount-active');
			}
			target1 = this;
		});
	});
	//获取来自于城市选择界面的信息
	/*window.addEventListener('getCity', function(event) {
		console.log("选择的城市为" + event.detail.city);
		vm.sellerPos = event.detail.city;
	});*/

	var cityPicker3 = new mui.PopPicker({
		layer: 3
	});
	cityPicker3.setData(cityData3);
	document.getElementById("location").addEventListener('tap', function() {
	/*	$('.filter').addClass('mui-hidden');*/
		cityPicker3.show(function(items) {
			//返回 false 可以阻止选择框的关闭
			$('.filter').removeClass('mui-hidden');
			console.log(items[0].text+"  "+items[1].text+"  "+items[2].text);
			vm.sellerPos = items[0].text+"  "+items[1].text+"  "+items[2].text;
			//return false;
		});
	});
	//获取价格区间
	document.getElementById("minPrice").addEventListener('change', function() {
		vm.minPrice = this.value;
		console.log(this.value);
	});
	document.getElementById("maxPrice").addEventListener('change', function() {
		vm.maxPrice = this.value;
		console.log(this.value);
	});

	var vm = new Vue({
		el: '#details-menu',
		data: {
			productName: '',
			sellerPos: '不限',
			amount: {
				min: 0,
				max: 9999999
			},
			deliveryCapacity: '',
			distance: '不限',
			minPrice: 0,
			maxPrice: 9990,
		}
	});

	mui.plusReady(function() {
		document.getElementById("button").addEventListener('tap', function() {
			mui.fire(plus.webview.getWebviewById('sort.html'), 'filterFromMenu', {
				data: {
					sellerPos: vm.sellerPos,
					distance: vm.distance,
					amount: vm.amount,
					minPrice: vm.minPrice,
					maxPrice: vm.maxPrice
				}
			})

		});
	});
	
});