(() => {
	//初始化载入数据
	$(".web").html(common_data.web);
	$('.header').html(common_data.header);

	let thisClassify = $('.web').attr('data-classify'), //当前是哪个分类
		thisPage = $('.web').attr('data-page'), //当前是哪个页面
		asideData = common_data.aside[thisPage], //左边菜单栏
		articleData = common_data.article[thisPage], //内容
		$window = $(window),
		$body = $('body'),
		$backTop = $('.back-top'), // 回到顶部
		$skin = $('.skin-icon'), //皮肤icon
		$skinList = $('.web-skin ul'), //皮肤列表
		$aside = $('.aside'), //左边菜单栏
		$article = $('.article'), //内容
		$secPre = $('.section-pre'), //上一章
		$secNext = $('.section-next'), //下一章
		secPreText, //上一章的标题
		secNextText; //下一章的标题

	// header初始化：下边框白块，皮肤
	let $headerMenu = $('.header .menu>li');
	let $headerMenuActive = $(`.header .menu>li[data-href=${thisClassify}]`);
	$headerMenuActive.append('<i></i>').find(`li[data-href=${thisPage}]`).addClass('active');
	$headerMenu.on({
		'mouseenter': function() {
			let move = $(this).index() - $headerMenuActive.index();
			$headerMenuActive.find('i').css('transform', `translateX(${move}00%)`);
		},
		'mouseleave': function() {
			$headerMenuActive.find('i').removeAttr('style');
		}
	});
	$('.skin-icon').on('click', function() {
		$('.web-skin ul').toggleClass('hide-i');
	});

	// aside和article初始化：数据，article的title对应aside，默认显示第一个，点击切换数据
	for(let i = 0; i < asideData.length; i++) $aside.append(`<div class="menu"><span>${asideData[i]}<i class="iconfont icon-arrow-bottom"></i></span><ul></ul></div>`);
	$article.html(Object.values(articleData)[0]).find('.title').each(function() {
		$aside.find('ul').append(`<li>${$(this).html()}</li>`);
	});
	$('.aside span:first,.aside ul:first,.aside li:first').addClass('active');
	$('.aside i:first').removeClass('icon-arrow-bottom').addClass('icon-arrow-top');
	$aside.on('click', 'span', function() {
		if($(this).hasClass('active')){
			$(this).removeClass('active').find('i').removeClass('icon-arrow-top').addClass('icon-arrow-bottom');
			$(this).next().removeClass('active');
			return;
		}
		$aside.find('span').removeClass('active');
		$aside.find('i').removeClass('icon-arrow-top').addClass('icon-arrow-bottom');
		$(this).addClass('active').find('i').removeClass('icon-arrow-bottom').addClass('icon-arrow-top');
		$aside.find('ul').removeClass('active').html('');
		$(this).next().addClass('active');
		$article.html(Object.values(articleData)[$(this).index('.aside span')]).find('.title').each(function() {
			$aside.find('ul').append(`<li>${$(this).html()}</li>`);
		});
		$aside.find('li').eq(0).addClass('active');
	});
	$aside.on('click', 'li', function() {
		$aside.find('li').removeClass('active');
		$(this).addClass('active');
		var top = $article.find('.title').eq($(this).index()).offset().top;
		$body.animate({
			scrollTop: top
		});
	});
	$article.on('click', '.title', function() {
		var top = $(this).offset().top;
		$body.animate({
			scrollTop: top
		});
	});
	
	// 固定aside，返回顶部
	$window.on('scroll', function() {
		$(this).scrollTop() >= 80 ? $aside.addClass('fixed') : $aside.removeClass('fixed');
		$(this).scrollTop() > 600 ? $backTop.addClass('show-i') : $backTop.removeClass('show-i');
	});
	$backTop.on('click',function(){
		$body.animate({
			scrollTop: 0
		});
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
})();