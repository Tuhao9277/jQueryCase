// rem响应式布局公式
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=750){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);



$(document).ready(function(){
	$("#fullpage").fullpage({
		sectionsColor: ['#fff', '#2b333b', '#1bbc9b', '#b01e2b'],
		navigation: true,
		verticalCentered: false,
		navigationPosition: 'right',
		continuousVertical: true,
		scrollingSpeed: 700,
		easing:'easeInOutCubic',
		anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage'],
		afterLoad: function(anchorLink, index){
			// 进入任何页面的时候，就会调用afterload
			
			// 从无到有的动画效果   开始必须是无，到有   第一次是无，变为了有
			// 第二次进入此页面时候，无到有，无动画
			if(index == 1){
				$('.section1').find('h2').fadeIn(); // display：无   display：有
				$('.section1').find('.section1_p1').delay(500).fadeIn();
				$('.section1').find('.section1_p2').delay(1000).fadeIn();
				$('.section1').find('.section1_div1').delay(1500).fadeIn();
				$('.section1').find('.section1_div2').delay(2000).fadeIn();
				$('.section1').find('.section1_div3').delay(2500).fadeIn();
			}else if(index == 2){
				$('.section2').find('h2').fadeIn();
				$('.section2').find('.section2_p1').delay(500).fadeIn();
				$('.section2').find('.section2_p2').delay(1000).fadeIn();
				$('.section2').find('div').delay(1500).fadeIn();
			}else if(index == 3){
				$('.section3').find('h2').fadeIn();
				$('.section3').find('p').delay(500).fadeIn();
				$('.section3').find('div').delay(1000).fadeIn();
			}else if(index == 4){
				$('.section4').find('div').fadeIn();
				$('.section4').find('h2').delay(500).fadeIn();
				$('.section4').find('p').delay(1000).fadeIn();
			}
		},
		onLeave: function(index, direction){
			// 离开任何页面都会调用此函数
			// 把第一个页面状态重置为无
			
			if(index == 1){
				$('.section1').find('h2').fadeOut();
				$('.section1').find('.section1_p1').fadeOut();
				$('.section1').find('.section1_p2').fadeOut();
				$('.section1').find('.section1_div1').fadeOut();
				$('.section1').find('.section1_div2').fadeOut();
				$('.section1').find('.section1_div3').fadeOut();
			}else if(index == 2){
				$('.section2').find('h2').fadeOut();
				$('.section2').find('.section2_p1').fadeOut();
				$('.section2').find('.section2_p2').fadeOut();
				$('.section2').find('div').fadeOut();
			}else if(index == 3){
				$('.section3').find('h2').fadeOut();
				$('.section3').find('p').fadeOut();
				$('.section3').find('div').fadeOut();
			}else{
				$('.section4').find('div').fadeOut();
				$('.section4').find('h2').fadeOut();
				$('.section4').find('p').fadeOut();
			}
		}
	});
});