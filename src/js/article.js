$(function(){
	//加载已有的购物车信息
	loadCart();
	
	//获取购物车的数量
	var buyNum = $("#rightBar ul:first-child li:nth-of-type(5)").children().eq(0).html();
	
	//给购物车添加一个点击事件
	$("#rightBar #buy").click(function(){
		location.href = "shopping.html";
	})
	
	
	//给加入购物车按钮添加点击事件
	$(".article-all p .addToCart").click(function(e){
		//获取商品的id（用来区分不同的商品）
		var articleId = $(this).parent().parent().attr("article-id");
		console.log(articleId);
		//获取商品的名称
		var articleName = $(this).parent().prev().prev().prev().html();
		console.log(articleName);
		//获取商品的价格
		var articlePrice = parseInt($(this).parent().siblings("h3").find("span").html());
		console.log(articlePrice);
		//获得商品的图片src
		var articleImg = $(this).parent().siblings("img").attr("src");
		console.log(articleImg);
		//获取cookie中的信息
		var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
		console.log(cartStr);
		//将字符串转换成对象
		var cartObj = convertCartStrToObj(cartStr);
		
		
		//判断该商品是否已经在购物车种存在
		if(articleId in cartObj){
			//如果存在，那么该商品的数量加1
			cartObj[articleId].num += 1;
			buyNum ++;
		}else{
			//如果不存在，将获得的物品信息添加进去
			cartObj[articleId] = {
				name : articleName,
				price : articlePrice,
				num : 1,
				src : articleImg
			};
			buyNum ++;
		}
		$("#rightBar ul:first-child li:nth-of-type(5)").children().eq(0).html().val(buyNum);
		alert(cartObj[articleId].num);
		console.log(cartObj);
		
		//将新的购物车信息存回cookie
		//将对象转为字符串
		cartStr = convertObjToCartStr(cartObj);
		//存入cookie
		//document.cookie = "key=value"
		$.cookie("cart",cartStr,{expires : 7,path : "/"});
		
		
		
		//飞入购物车
		// var buyshop = $("#rightBar #buy");
		var clongImg = $(this).siblings("img").clone().css({width:100,height:100});
		clongImg.fly({
			start : {
				top : e.clientY,
				left : e.clientX
			},
			end : {
				top : $("#rightBar #buy").offset().top,
				left : $("#rightBar #buy").offset().left,
				width:0,
				height:0
			},
			autoPlay : true,
			onEnd : function(){
				$("#rightBar #buy").val(function(index,v){
					//"购物车(0)"
					var pattern = /(\d+)/;
					var num = parseInt(v.match(pattern)[1]);
					return "购物车(" + (num + 1) + ")";
				});
				cloneImg.remove();
			}
		})
	})
});

// 
function convertCartStrToObj(cartStr){
	//如果是空字符串，即没有购物车信息，那么购物车喂空，直接返回一个空对象
	if(!cartStr){
		return{};
	}
	var goods = cartStr.split(":");
	var obj = {};
	for(var i = 0; i < goods.length;i ++){
		var data = goods[i].split(",");
		//以商品的id为键，商品的其他信息为值，这个值也设计为一个对象
		obj[data[0]] = {
			name : data[1],
			price : parseFloat(data[2]),
			num : parseInt(data[3]),
			src : data[4]
		}
	}
	return obj;
}
function convertObjToCartStr(obj){
	var cartStr = "";
	//遍历对象
	for(var id in obj){
		if(cartStr){
			cartStr += ":";
		}
		cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src;
	}
	return cartStr;
}

//加载购物车中的信息(使商品页与购物车页中的购物车数量同步)
function loadCart(){
	var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
	var cartObj = convertCartStrToObj(cartStr);
	//获取到购物车中所有商品的数量
	var total = 0;
	for(var id in cartObj){
		total += cartObj[id].num;
	}
	$("#buy").val("购物车(" + total + ")");
}