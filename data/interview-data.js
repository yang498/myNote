var interview_data=(function(){
	var browser=`
			<h1>浏览器内核引擎</h1>
			<p>IE：Trident</p>
			<p>Firefox：Gecko</p>
			<p>Safari&Chrome：WebKit</p>
			<p>Opera：Blink</p>
			
			<h1>w3c规范</h1>
			<p>所有的标签都使用小写字母，成对出现，单标签要自闭合</p>
			
			<div class=edit-time>编辑于：<time>2017.8.1</time></div>
		`,
		http=`
			<h1>http请求</h1>
			<p>计算机通过网络进行通信的规则，也就是客户端向服务端请求数据和服务，一种无状态的协议：不建立持久的连接，客户
			端发送一次请求然后服务端返回信息，接着连接就关闭了，这个过程没有记忆，所以每次都要重新传递。</p>
			<h2>http请求请求共7个步骤：</h2>
			<p>1、建立TCP连接</p>
			<p>2、浏览器向服务器发送请求命令</p>
			<p>3、浏览器发送请求头信息</p>
			<p>4、服务器做出应答</p>
			<p>5、服务器发送应答头信息</p>
			<p>6、服务器向浏览器发送数据</p>
			<p>7、服务器关闭TCP连接</p>
			<h2>http请求由4部分组成：</h2>
			<p>1、请求的方法，是get还是post</p>
			<p>2、请求的url地址</p>
			<p>3、请求头，包含客户端环境信息、身份验证信息等</p>
			<p>4、请求体，可以是提交的字符串或表单信息，和请求头隔一行，表示请求头已结束</p>
			<img src="../imgs/interview/http01.jpg" class="w700" title="http请求的组成" alt="http01.jpg"/>
			<h2>http响应由3部分组成：</h2>
			<p>1、一个数字和文字组成的状态码，表示请求成功还是失败</p>
			<p>2、响应头，比如服务器类型、时间日期、类型和长度等</p>
			<p>3、响应体，也就是响应正文，由服务器传过来的数据，也是要和响应头空一行</p>
			<img src="../imgs/interview/http02.jpg" class="w300" title="http响应的组成" alt="http02.jpg"/>
			<h2>状态码：</h2>
			<p>1XX：信息类，收到web浏览器请求，正在进一步处理中</p>
			<p>2XX：成功，比如200 OK</p>
			<p>3XX：失败或重定向</p>
			<p>4XX：客户端请求错误，比如403资源不可用，服务器拒绝了，404 Not Found</p>
			<p>5XX：服务器错误，不能完成对请求的处理</p>
			
			<div class=edit-time>编辑于：<time>2017.8.1</time></div>
		`;
		
	return {
		browser:browser,
		http:http
	}
})();
