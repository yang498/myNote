var common_data = (()=>{
	let web = `
			<header class="header"></header>
			<nav class="nav"></nav>
			<div class="content">
				<aside class="aside"></aside>
				<article class="article"></article>
			</div>
			<button class="change-section section-pre"><span></span><i>：</i>上一章</button>
			<button class="change-section section-next">下一章<i>：</i><span></span></button>
		`,
		header = `
			<a href="html.html" class="logo"><img src="../imgs/logo.jpg"/></a>
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
			<input type="search" placeholder="搜点什么" class="search" />`,
		nav = `
			<ul>
				<li data-href="html"><a href="html.html">HTML</a></li>
				<li data-href="css"><a href="css.html">CSS</a></li>
				<li data-href="js"><a href="javascript.html">JS</a></li>
				<li data-href="vue"><a href="vue.html">Vue</a></li>
				<li data-href="cssLibrary"><a href="cssLibrary.html">css库</a></li>
				<li data-href="jsLibrary"><a href="jsLibrary.html">js库</a></li>
				<li data-href="mobile"><a href="mobile.html">移动端</a></li>
				<li data-href="interview"><a href="interview.html">面试</a></li>
			</ul>`,
		aside = {
			cssLibrary: ['bootstrap', 'mui'],
			mobile: ['weex'],
			interview: ['浏览器', 'http', 'TCP/IP', '设计模式', '兼容性问题']
		},
		article = {
			interview: interview_data
		};

	return { header, nav, aside, article, web};
})();