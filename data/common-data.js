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
			<i class="iconfont icon-arrowhead-top back-top"></i>
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
			<div class="web-skin">
				<i class="iconfont icon-skin-fill skin-icon"></i>
				<ul class="hide-i">
					<li><i></i><span>红#f00</span></li>
					<li><i></i><span>橙#fc0</span></li>
					<li><i></i><span>黄#fe0</span></li>
					<li><i></i><span>绿#0e0</span></li>
					<li><i></i><span>青#0cc</span></li>
					<li><i></i><span>蓝#08f</span></li>
					<li><i></i><span>紫#80f</span></li>
					<li><i></i><span>粉#f08</span></li>
				</ul>
			</div>
		`;

	return {
		web,
		header,
		aside,
		article
	};
})();