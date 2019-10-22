commonData.javascript.connect.content = `
#WebSocket

##介绍
HTTP 协议有一个缺陷：通信只能由客户端发起，做不到服务器主动向客户端推送信息
例如聊天室，如果服务器有连续的状态变化，客户端要获知就非常麻烦，只能使用轮询或长连接
WebSocket 协议在 2008 年诞生，2011 年成为国际标准。所有浏览器都已经支持了
最大的特点就是：服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，它们之间存着一条持续打开的数据通道
其他特点：
!!
建立在 TCP 协议之上，服务器端的实现比较容易
与 HTTP 协议有着良好的兼容性。默认端口也是 80 和 443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器
数据格式比较轻量，性能开销小，通信高效
可以发送文本，也可以发送二进制数据
没有同源限制，客户端可以与任意服务器通信，完全可以取代 Ajax
协议标识符是·ws·（如果加密，则为·wss·，对应 HTTPS 协议），服务器网址就是 URL
!!

##握手请求
浏览器发出的 WebSocket 握手请求类似于：
··
GET /¿ HTTP/1.1
Connection: Upgrade // 浏览器通知服务器升级到 WebSocket 协议
Upgrade: websocket // 将通信协议从 HTTP/1.1 转向该字段指定的协议
Host: example.com
Origin: null // 发出的域名，供服务器验证是否许可的范围内（服务器也可以不验证）
Sec-WebSocket-Key: sN9cRrP/n9NdMgdcy2VJFQ== // 握手协议的密钥，是 Base64 编码的16字节随机字符串
Sec-WebSocket-Version: 13
··

服务器的 WebSocket 回应类似于：
··
HTTP/1.1 101 Switching Protocols
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s=
Sec-WebSocket-Origin: null
Sec-WebSocket-Location: ws://example.com/
··

##API

浏览器对 WebSocket 协议的处理就是三件事：
!!
建立连接和断开连接
发送数据和接收数据
处理错误
!!

##构造函数 WebSocket
新建·WebSocket·实例，让客户端与服务器进行连接
··
var ws = new WebSocket('ws://localhost:8080')
··

##webSocket.readyState
实例对象的当前状态：
!!
CONNECTING：值为 0，表示正在连接
OPEN：值为 1，表示连接成功，可以通信了
CLOSING：值为 2，表示连接正在关闭
CLOSED：值为 3，表示连接已经关闭，或者打开连接失败
!!
示例：
··
switch (ws.readyState) {
  case WebSocket.CONNECTING: return code
  case WebSocket.OPEN: return code
  case WebSocket.CLOSING: return code
  case WebSocket.CLOSED: return code
}
··

##webSocket.binaryType
指定接收的二进制数据类型
··
// 收到的是 blob 数据
ws.binaryType = ‘blob‘
ws.onmessage = function(e) {
    console.log(e.data.size)
}

// 收到的是 ArrayBuffer 数据
ws.binaryType = ‘arraybuffer‘
ws.onmessage = function(e) {
    console.log(e.data.byteLength)
}
··

##webSocket.onopen
连接成功后的回调函数
··
ws.onopen = function (e) { }
ws.addEventListener('open', function (e) { })
··

##webSocket.onclose
连接关闭后的回调函数
··
ws.onclose = function (e) { }
ws.addEventListener('close', function (e) { })
··

##webSocket.onmessage
收到服务器数据后的回调函数
··
ws.onmessage = function (event) {
    var data = event.data
    // 处理数据
}
  
ws.addEventListener('message', function (event) {
    var data = event.data
    // 处理数据
})
··

##webSocket.send()
向服务器发送数据
··
ws.send('your message')
··

##webSocket.bufferedAmount
还未发送出去的二进制数据，可以用来判断发送是否结束
··
var data = new ArrayBuffer(10000000)
socket.send(data)

if (socket.bufferedAmount === 0) {
    // 发送完毕
} else {
    // 发送还没结束
}
··

##webSocket.onerror
报错时的回调函数
··
socket.onerror = function (event) {
    // handle error event
}

socket.addEventListener('error', function (event) {
    // handle error event
})
··

&2019/10/22
`