var common_data = (() => {
	let aside = {
			cssLibrary: ['bootstrap', 'mui'],
			mobile: ['weex'],
			interview: ['浏览器', 'http']
		},
		article = {
			interview: interview_data
		},
		web = `
			<header class="header"></header>
			<aside class="aside"></aside>
			<article class="article"></article>
			<footer class="footer">
				<button class="prev">
					<i class="iconfont icon-arrowhead-left left"></i>
					<span></span>
				</button>
				<button class="next">
					<span></span>
					<i class="iconfont icon-arrowhead-right right"></i>
				</button>
			</footer>
			<i class="web-icon iconfont icon-arrowhead-top back-top"></i>
			<div class="web-icon web-skin">
				<i class="iconfont icon-skin-fill skin-icon"></i>
				<ul>
					<li data-color="#f00"></li>
					<li data-color="#f80"></li>
					<li data-color="#fe0"></li>
					<li data-color="#0e0"></li>
					<li data-color="#0cc"></li>
					<li data-color="#08f"></li>
					<li data-color="#80f"></li>
					<li data-color="#f08"></li>
				</ul>
			</div>
		`,
		header = `
			<a href="html.html" class="logo"><img src="../imgs/logo.jpg"/></a>
			<ul class="menu">
				<li data-href="html">
					<span>HTML</span>
					<ul class="menu-link">
						<li data-href="html"><a href="html.html">HTML</a></li>
						<li data-href="mobile"><a href="mobile.html">移动端</a></li>
					</ul>
				</li>
				<li data-href="css">
					<span>CSS</span>
					<ul class="menu-link">
						<li data-href="css"><a href="css.html">CSS</a></li>
						<li data-href="cssLibrary"><a href="cssLibrary.html">CSS库</a></li>
					</ul>
				</li>
				<li data-href="js">
					<span>JavaScript</span>
					<ul class="menu-link">
						<li data-href="javascript"><a href="javascript.html">javascript</a></li>
						<li data-href="jsLibrary"><a href="jsLibrary.html">javascript库</a></li>
						<li data-href="vue"><a href="vue.html">vue</a></li>
					</ul>
				</li>
				<li data-href="tool">
					<span>工具</span>
					<ul class="menu-link">
						<li data-href="tool"><a href="tool.html">工具</a></li>
					</ul>
				</li>
				<li data-href="other">
					<span>其他</span>
					<ul class="menu-link">
						<li data-href="interview"><a href="interview.html">面试</a></li>
					</ul>
				</li>
			</ul>
			<div class="search"><i class="iconfont icon-search"></i><input type="search"/></div>
		`;

	return {
		web,
		header,
		aside,
		article
	};
})();