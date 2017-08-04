(function() {
	var thisPage = $('.web').attr('data-page'),
		$header = $('.header'),
		$nav = $('.nav'),
		$aside = $('.aside'),
		$article = $('.article'),
		$secPre = $('.section-pre'),
		$secNext = $('.section-next'),
		secPreText,
		secNextText;

	//载入数据
	$header.html(common_data.header);
	$nav.html(common_data.nav);
	$aside.html(common_data.aside_interview);
	$article.html(interview_data.browser);

	var $navLi = $('.nav li'),
		$navLiActive = $(`.nav li[data-href=${thisPage}]`),
		$navIActive,
		$asideMenu = $('.aside .menu'),
		$asideMenuActive = $('.aside .menu.active'),
		$asideIActive = $('.aside i.nav-active');

	//初始化导航栏
	$navLi.width(100 / $navLi.length + '%');
	$navLiActive.addClass('active').append('<i class="nav-active"></i>');
	$navIActive = $('.nav i.nav-active');

	//切换上一章和下一章
	function secChangeEnter(sec, self, text) {
		console.log(secPreText);
		if(!sec) return;
		self.html(sec + ':' + text).width('auto');
	}

	function secChangeClick(sec, self) {
		if(!sec) return;
	}

	function secChangeLeave(sec, self, text) {
		if(!sec) return;
		self.html(text).width('75');
	}
	$secPre.on({
		'mouseenter': function() {
			secPreText = $asideMenuActive.prev().html();
			secChangeEnter(secPreText, $(this), $(this).html());
		},
		'click': function() {
			secChangeClick(secPreText, $(this));
		},
		'mouseleave': function() {
			secChangeLeave(secPreText, $(this), $(this).html());
		}
	});
	$secNext.on({
		'mouseenter': function() {
			secPreText = $asideMenuActive.next().html();
			secChangeEnter(secPreText, $(this), $(this).html());
		},
		'click': function() {
			secChangeClick(secPreText, $(this));
		},
		'mouseleave': function() {
			secChangeLeave(secPreText, $(this), $(this).html());
		}
	});

	//导航栏背景移动
	function MoveActive($parent, $child, $liAct, $iAct, isXY = true) {
		var $ch = isXY ? 'li' : '.menu',
			dir = isXY ? 'X' : 'Y';
		$parent.on('mouseenter', $ch, function() {
			var move = ($(this).index() - $liAct.index()) * 100;
			$iAct.css('transform', `translate${dir}(${move}%)`);
			$child.removeClass('active');
			$(this).addClass('active');
		}).on('mouseleave', $ch, function() {
			$iAct.removeAttr('style');
			$child.removeClass('active');
			$liAct.addClass('active');
		});
	}

	new MoveActive($nav, $navLi, $navLiActive, $navIActive);
	new MoveActive($aside, $asideMenu, $asideMenuActive, $asideIActive, false);

	//左侧导航栏点击事件
	$aside.on('click', '.menu', function() {
		var self = $(this);
		if(self.has('.nav-active').length) return;
		$asideMenuActive = $('.aside .menu.active');
		$asideIActive.removeAttr('style').appendTo($asideMenuActive);
		new MoveActive($aside, $asideMenu, $asideMenuActive, $asideIActive, false);
		$article.html(interview_data[self.attr('data-href')]);
	});
})();