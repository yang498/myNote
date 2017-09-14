//读取：根据每个页面的web容器定义的thisPage填充article
//aside：asideData自带数组对应这个页面章节，根据article的h1对应多少个小标题
//缺点：asideData填充不灵活，小标题只能展示当前章节的
//优点：做好了数据归类只要写文档就好了
//注意：数据的全局变量为thisPage_data形式，将文档转成html可能会和内容有冲突
//待做：table设置每一栏的宽不灵活，皮肤，反馈和提醒上次放到右下角，记录最后一次停留的地方，每次打开页面右上角询问，也可以选择关闭提示
(() => {
	//初始化载入数据
	let $web = $(".web");
	$web.html(common_data.web);
	$('.header').html(common_data.header);

	let thisClassify = $web.attr('data-classify'), //当前是哪个分类
		thisPage = $web.attr('data-page'), //当前是哪个页面
		asideData = common_data.aside[thisPage], //左边菜单栏
		articleData = common_data.article[thisPage], //内容
		$window = $(window),
		$html = $('html'),
		$headerMenu = $('.header .menu>li'), // 头部主菜单
		$headerMenuActive = $(`.header .menu>li[data-href=${thisClassify}]`), // 当前子菜单
		$backTop = $('.back-top'), // 回到顶部
		$skinList = $('.web-skin ul'), //皮肤列表
		$aside = $('.aside'), //左边菜单栏
		$article = $('.article'), //内容
		$secPrev = $('.footer .prev'), //上一章
		$secNext = $('.footer .next'), //下一章
		secCut;	// 当前章节序号

	// header初始化：下边框白块，皮肤
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

	// aside和article初始化：数据，article的h1对应aside，默认显示第一个，点击切换数据
	for(let i = 0; i < asideData.length; i++) $aside.append(`<div class="menu"><span>${asideData[i]}<i class="iconfont icon-arrow-bottom"></i></span><ul></ul></div>`);
	$article.html(formatHtml(Object.values(articleData)[0])).find('h1').each(function() {
		$aside.find('ul').append(`<li>${$(this).html()}</li>`);
	});
	$('.aside span:first,.aside ul:first,.aside li:first').addClass('active');
	$aside.find('i').eq(0).removeClass('icon-arrow-bottom').addClass('icon-arrow-top');
	$aside.on('click', 'span', function() {
		if($(this).hasClass('active')) {
			$(this).removeClass('active').find('i').removeClass('icon-arrow-top').addClass('icon-arrow-bottom');
			$(this).next().removeClass('active');
			return;
		}
		$aside.find('span').removeClass('active');
		$aside.find('i').removeClass('icon-arrow-top').addClass('icon-arrow-bottom');
		$(this).addClass('active').find('i').removeClass('icon-arrow-bottom').addClass('icon-arrow-top');
		$aside.find('ul').removeClass('active').html('');
		$article.html(formatHtml(Object.values(articleData)[$(this).index('.aside span')])).find('h1').each(function() {
			$aside.find('ul').append(`<li>${$(this).html()}</li>`);
		});
		$(this).next().addClass('active').find('li').eq(0).addClass('active');
		secShow();
	});
	$aside.on('click', 'li', function() {
		$aside.find('li').removeClass('active');
		$(this).addClass('active');
		$article.find('h1').eq($(this).index()).click();
	});
	$article.on('click', 'h1', function() {
		var top = $(this).offset().top;
		$html.stop(true).animate({
			scrollTop: top
		});
	});

	// 固定aside，返回顶部
	$window.on('scroll', function() {
		$(this).scrollTop() >= 80 ? $aside.addClass('fixed') : $aside.removeClass('fixed');
		$(this).scrollTop() > 600 ? $backTop.addClass('show-i') : $backTop.removeClass('show-i');
	});
	$backTop.on('click', function() {
		$html.stop(true).animate({
			scrollTop: 0
		});
	});
	$skinList.on('click','li',function(){
		console.log($(this).attr('data-color'))
	});

	// 切换上一章和下一章初始化：显示对应的标题，点击切换
	secShow();
	function secShow() {
		secCut = $('.aside span.active').index('.aside span');
		if(secCut - 1 < 0) {
			$secPrev.addClass('hide');
		} else {
			$secPrev.removeClass('hide').find('span').html($aside.find('span').eq(secCut - 1).text());
		}
		if(secCut + 1 > $aside.find('span').length - 1) {
			$secNext.addClass('hide');
		} else {
			$secNext.removeClass('hide').find('span').html($aside.find('span').eq(secCut + 1).text());
		}
		$backTop.click();
	}
	$secPrev.on('click', function() {
		$aside.find('span').eq(secCut - 1).click();
	});
	$secNext.on('click', function() {
		$aside.find('span').eq(secCut + 1).click();
	});
})();