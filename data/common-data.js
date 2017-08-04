var common_data=(function(){
	var header=`
			<a href="html.html" class="logo"><img src="../imgs/logo.jpg"/></a>
			<input type="search" placeholder="搜点什么" class="search" />`,
		nav=`
			<ul>
				<li data-href="html"><a href="html.html">HTML</a></li>
				<li data-href="css"><a href="css.html">CSS</a></li>
				<li data-href="js"><a href="javascript.html">JS</a></li>
				<li data-href="vue"><a href="vue.html">Vue</a></li>
				<li data-href="cssLib"><a href="cssLibrary.html">css库</a></li>
				<li data-href="jsLib"><a href="jsLibrary.html">js库</a></li>
				<li data-href="interview"><a href="interview.html">面试</a></li>
			</ul>`,
		aside_interview=`
			<div class="menu active" data-href="browser">浏览器<i class="nav-active"></i></div>
			<div class="menu" data-href="http">http</div>
			<div class="menu" data-href="tcp/ip">TCP/IP</div>
			<div class="menu" data-href="mode">设计模式</div>
			<div class="menu" data-href="compatibility">兼容性问题</div>`;
	
	return {
		header:header,
		nav:nav,
		aside_interview:aside_interview
	}
})();
