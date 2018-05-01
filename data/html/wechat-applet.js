commonData.html.weex = {
	name: '微信小程序',
	content: `
	#API
	
	##微信支付
	
	###在小程序后台开通微信支付
	!./imgs/html/wechat-applet01.png
	
	###小程序支付的交互过程
	!./imgs/html/wechat-applet02.png
	
	###wx.requestPayment(obj)
	··
	obj: {
		timeStamp{String}!: 时间戳从1970年1月1日00:00:00至今的秒数，即当前的时间
		nonceStr{String}!: 随机字符串，长度为32个字符以下
		package{String}!: 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
		signType{String}!: 签名算法，暂支持 MD5
		paySign{String}!: 签名
		success{Function}: 接口调用成功的回调函数
		fail{Function}: 接口调用失败的回调函数
		complete{Function}: 接口调用结束的回调函数
	}
	··
	了解更多信息查看：α(https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1|小程序支付接口文档)
	
	###示例时间戳秒数：
	··
	// 该方法最好在服务器上运行返回，否则本地时间可能被用户改过或手机获取不准
	const timeStamp = () => Math.floor(Date.now() / 1000)
	··
	
	###示例随机字符串：
	··
	// 如果有指定长度的参数就返回指定长度的随机字符串，不指定就返回随机16-32位
	const getRandomInt = (min, max) => max ? Math.floor(Math.random() * (max - min + 1)) + min : getRandomInt(0, min)
	const nonceStr = length => {
		length = length >= 16 ? length : getRandomInt(16, 32)
		let str = ''
		const nonce = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
		for (let i = 0; i < length; i++) str +=nonce[getRandomInt(nonce.length - 1)]
		return str
	}
	··
	
	###package
	统一下单接口返回的 prepay_id 参数值，格式如：·prepay_id=wx2017033010242291fcfe0db70013231072·
	
	###示例代码：
	··
	wx.requestPayment({
		timeStamp: timeStamp(),
		nonceStr: nonceStr(),
		package: '',
		signType: 'MD5',
		paySign: '',
		success(res){
			res: { requestPayment: ok }: 支付成功
		},
		fail(res){
			res: { requestPayment: ok }: 用户取消支付
		},
		complete(res){
			res: { requestPayment: fail (detail message) }: 调用支付失败，其中 detail message 为后台返回的详细失败原因
		}
	})
	··
	
	
	参考链接：α(https://developers.weixin.qq.com/miniprogram/introduction/index.html?t=2018413|小程序官方文档)
	
	&2018.4.20
	`
}