// JavaScript Document
$(function(){
	falls();
	var data = [{'src':'11.jpg','title':'a new title'},{'src':'12.jpg','title':'a new title'},{'src':'13.jpg','title':'a new title'},{'src':'14.jpg','title':'a new title'},{'src':'15.jpg','title':'a new title'}];
	
	window.onscroll = function(){
		setTimeout(function(){
			//alert(getScroll);
			//getLasth();
			//getScroll();
			if(getScroll()){
				//alert(getScroll());
				for(i in data){
					var box = '<div class="box" style="opacity:0"><div class="info"><div class="pic"><img src="images/'+data[i].src+'" style="height:auto"/></div><div class="title"><a>'+data[i].title+'</a></div></div></div>';
				$("#wrap").append(box);
			}
				falls();
			}else{
				//alert(getScroll());	
			}
		},20)
	}

var getStart = 0;

function getStyle(box,top,left,index){
	if(getStart>=index) return;
	box.css({'position':'absolute',
				'top':top+'px',
				'left':left+'px',
				'opacity':0});
	box.animate({opacity:1},200);
	getStart = index;
}

function getScroll(){
	var winh = document.documentElement.clientHeight;
	var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
	//alert(getLasth());
	if(winh+scrollT>getLasth()){
		return true;
	}else{
		return false;
	}
}

function getLasth(){
	var lastN = $(".box").length-2;
	var minhei = $(".box").eq(lastN).offset().top+$(".box").eq(lastN).height();
	//alert("min"+minhei);
	return minhei;
}
//
function falls(){
	var wrap = $("#wrap");
	var boxs = $(".box");
	//var boxs = document.getElementsByClassName("box");
	//alert(boxs.length);
	//alert(typeof(boxs));
	//console.log(typeof(boxs));
	//var boxw = boxs[0].offsetWidth;
	var boxw = boxs.eq(0).width()+20;
	//console.log(boxw);	
	console.log(boxw);
	var winw = document.documentElement.clientWidth;
	console.log(winw);
	//获得可显示列数
	var colsNum = Math.floor(winw/boxw);
	console.log(colsNum);
	wrap.width(boxw*colsNum+'px');
	console.log($("#wrap").width());
	
	//一个数组用于存储每一列高度
	var everyh = [];
	
	setTimeout(function(){
		for(var i=0;i<colsNum;i++){
			everyh[i] = boxs.eq(i).height();
			//alert(everyh[i]);
			//var minh = Math.min(10000,everyh[i]);
		}
			console.log(everyh);
			
			
		for(var i=colsNum;i<boxs.length;i++){
			var minh = Math.min.apply(null,everyh);
			boxs.eq(i).css("position","absolute").css("top",minh+10);
			var minindex = getIndex(minh,everyh);
			var boxleft = $(".box").eq(minindex).offset().left - $("#wrap").offset().left;
			boxs.eq(i).css("left",boxleft);
			getStyle($(".box").eq(i),minh+10,boxleft,i);
			everyh[minindex] += boxs.eq(i).height()+10;
			//boxs.eq(i).offset().top = minh;
		}
		//var minh = Math.min(10000,everyh);	
		//alert(minh);
	},10);
	
	function getIndex(a,b){
		for(index in everyh){
			if(everyh[index] == a){
				return index;
			}
		}
	}
}
})
