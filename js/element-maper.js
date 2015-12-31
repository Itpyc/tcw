define(function(require, exports, module) {
	exports.init = function(handler, holder) {
		//查找映射的元素,传来的参数
		holder = holder || document.body;
		//将handler中的el传给elMap
		var elMap = handler.el;
		//清空handler.el
		handler.el = {};
		for (var name in elMap) {
			handler.el[name] = holder.querySelector(elMap[name]);
			console.log(name);
		}
	};
});