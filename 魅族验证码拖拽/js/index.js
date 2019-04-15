$(function(){
	var verify = {
		main: $('.verify-main'),
		verifyImg: $('.verify-img'),
		verifyMove: $('.verify-move'),
		tip: $('.verify-tip'),
		slice: $('.verify-slice'),
		offsetLeft: $('.verify-main').offset().left,
		status: false, //记录验证状态
		init: function(){
			this.enter();
			this.mousedown();
			this.mouseup();
		},
		//小滑块按下
		mousedown: function(){
			var that = this;
			//鼠标按下事件  mousedown
			this.verifyMove.mousedown(function(){
				//如果验证成功
				if(that.status){
					return;
				}
				//清除verify的鼠标移入移出事件
				$('.verify').off('mouseenter mouseleave');
				
				//改变自身背景  添加  move   class
				$(this).addClass('move');
				//隐藏提示文字
				that.tip.fadeOut();
				//拖拽移动
				that.mousemove();
			});
		},
		//鼠标移动
		mousemove: function(){
			var that = this;
			var left = 0;
			$(document).mousemove(function(ev){
				left = ev.pageX - that.offsetLeft - 22;
				//边界处理
				left = (left < 0) ? 0 : (left>216?216:left);
				//改变拖拽滑块位置
				that.verifyMove.css({
					left: left
				});
				//改变滑块位置
				that.slice.css({
					left: left + 20
				});
			});
		},
		//小滑块按下
		mouseup: function(){
			var that = this;
			//鼠标抬起事件  mouseup
			$(document).mouseup(function(){
				//如果验证成功
				if(that.status){
					return;
				}
				//改变自身背景  去除  move   class
				that.verifyMove.removeClass('move');
				
				//鼠标抬起清除鼠标移动事件
				$(document).off('mousemove');
				//判断是否验证成功
				var left = parseFloat( that.slice.css('left') );
				//验证成功
				if(left >= 147 && left <= 167){
					alert('验证成功');
					that.status = true;
				}else{
					//
					that.verifyMove.animate({
						left: 0
					},600,function(){
						//显示提示文字
						that.tip.fadeIn();
					});
					//滑块还原   先抖两下  在滑回去
					that.slice.fadeOut(50)
						.fadeIn(50)
						.fadeOut(50)
						.fadeIn(50)
						.animate({
							left: 20
						},600,function(){
							that.verifyImg.fadeOut(300);
							//重新添加鼠标移入移出事件
							that.enter();
						});
				}
			});
		},
		//鼠标移入main，显示验证码
		enter: function(){
			var timer1 = null;
			var timer2 = null;
			var that = this;
			$('.verify').hover(function(){
				//清除淡出延时器
				clearTimeout(timer2);
				timer1 = setTimeout(function(){
					that.verifyImg.fadeIn(300);
				},300);
			},function(){
				//清除淡入延时器
				clearTimeout(timer1);
				timer2 = setTimeout(function(){
					that.verifyImg.fadeOut(300);
				},300);
			});
		}
	};
	verify.init();
});