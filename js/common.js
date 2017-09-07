//按照高德地图排版，菜单背景都为0.1粉色，上面移动，左边可展开，只分为4个：html、css、js、工具，h5移动端在html下
//当前导航高亮，先把页面的基础功能做出来再说，以后再加效果
(() => {
	//初始化载入数据
	$(".web").html(common_data.web);
	$('.header').html(common_data.header);
	$('.nav').html(common_data.nav);
	
	let thisPage = $('.web').attr('data-page'), //当前是哪个页面
		asideData = common_data.aside[thisPage], //左边菜单栏
		articleData = common_data.article[thisPage], //内容
		$skin = $('.skin-icon'),	//皮肤icon
		$skinList = $('.web-skin ul'),	//皮肤列表
		$aside = $('.aside'), //左边菜单栏
		$article = $('.article'), //内容
		$secPre = $('.section-pre'), //上一章
		$secNext = $('.section-next'), //下一章
		secPreText, //上一章的标题
		secNextText; //下一章的标题

	for(let i = 0; i < asideData.length; i++) $aside.append(`<div class="menu"><a href="javascript:;">${asideData[i]}</a></div>`);
	$('.aside .menu').eq(0).addClass('active').append('<ul class="menu-title"></ul>');
	articleData && $article.html(articleData[Object.keys(articleData)[0]]);

	let $navLi = $('.nav li'), //导航栏的子元素li
		$navLiActive = $(`.nav li[data-href=${thisPage}]`), //导航栏当前页面的li
		$navIActive, //导航栏的移动背景块，初始化才创建
		$asideUl = $('.menu-title'),
		$articleTitle = $('.article .title');

	//初始化导航栏和左边菜单栏ul
	$navLi.width(100 / $navLi.length + '%');
	$navLiActive.addClass('li-active').append('<i class="i-active"></i>');
	$navIActive = $('.nav .i-active');
	$articleTitle.each(function() {
		$asideUl.append(`<li>${$(this).html()}</li>`);
	});
	$('.aside li').eq(0).addClass('active');
	
	//皮肤
	$('.skin-icon').on('click',function(){
		$('.web-skin ul').toggleClass('hide-i');
	});

	//移动背景块
	$navLi.on({
		'mouseenter': function() {
			var move = ($(this).index() - $navLiActive.index()) * 100;
			$navIActive.css('transform', `translateX(${move}%)`); //背景块移动
			$navLi.removeClass('li-active');
			$(this).addClass('li-active');
		},
		'mouseleave': function() {
			$navIActive.removeAttr('style');
			$navLi.removeClass('li-active');
			$navLiActive.addClass('li-active');
		}
	});

	//上一章和下一章，显示对应的标题，点击切换
	let secChangeEnter = (self, sec) => {
			if(!sec) return;
			self.addClass('active').find('span').html(sec);
		},
		secChangeClick = (self, sec) => {
			if(!sec) return;
		},
		secChangeLeave = (self, sec) => {
			if(!sec) return;
			self.removeClass('active').find('span').html('');
		};
	$secPre.on({
		'mouseenter': function() {
			secPreText = $('aside .menu.active').prev().html();
			secChangeEnter($(this), secPreText);
		},
		'click': function() {
			secChangeClick($(this), secPreText);
		},
		'mouseleave': function() {
			secChangeLeave($(this), secPreText);
		}
	});
	$secNext.on({
		'mouseenter': function() {
			secNextText = $('aside .menu.active').next().html();
			secChangeEnter($(this), secNextText);
		},
		'click': function() {
			secChangeClick($(this), secNextText);
		},
		'mouseleave': function() {
			secChangeLeave($(this), secNextText);
		}
	});

	//左侧导航栏点击事件
	$aside.on('click', '.menu', function() {
		let content = interview_data[$(this).attr('data-href')];
		$article.html(content);
		$aside.find('.menu').removeClass('active');
		$(this).addClass('active');
	});

	//左侧导航栏点击事件
	$aside.on('click', 'li', function() {
		$aside.find('li').removeClass('active');
		$(this).addClass('active');
	});
})();