(function() {
	var $nav = $('.nav'),
		$navLi = $('.nav li'),
		$navIActive = $('.nav .nav-active'),
		$navLiActive = $('.nav .active');
		
	//初始化导航栏的宽度
	(function() {
		$navLi.width($nav.width() / $navLi.length);
	})();
	
	$nav.on('mouseenter', 'li', function() {
		let move = ($(this).index() - $navLiActive.index()) * 100;
		$navIActive.css('transform', 'translateX(' + move + '%)');
		$navLi.removeClass('active');
		$(this).addClass('active');
	}).on('mouseleave', 'li', function() {
		$navIActive.removeAttr('style');
		$navLi.removeClass('active');
		$navLiActive.addClass('active');
	});
})();