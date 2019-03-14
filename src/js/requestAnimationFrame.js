(function(){
	var lastTime = 0;
	var vendors = ['webkit','moz'];
	for(var x = 0;x < vendors.length && !window.requestAnimationFrame; ++x){
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancleAnimationFrame = window[vendors[x] + 'cancelAnimationFrame'] || window[vendors[x] + 'cancelRequestAnimationFrame'];
	}
	
	if(!window.requestAnimationFrame){
		window.requestAnimationFrame = function(callback,element){
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0,16 - (currTime - lastTime));
			var id = window.setTimeout(function(){
				callback(currTime + timeToCall);
			},
			timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	if(!window.cancelAnimationFrame){
		aindow.cancelAnimationFrame = function(id){
			clearTimeout(id);
		};
	}
	
	
}());