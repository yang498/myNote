<template>
    <div v-html="format(text)"></div>
</template>

<script>
import img1 from '@/assets/img/interview01.jpg'
import img2 from '@/assets/img/interview02.jpg'
export default {
    data () {
        return {
            text: `
# 面试

## 浏览器

### w3c 规范

所有的标签都使用小写字母，成对出现，单标签要自闭合

### 性能优化

!!
1、将脚本放在底部，让网页先显示出来
2、http 请求流程简述：
    在浏览器中输入网址并搜索，浏览器就与这个 URL 指向的服务器建立连接
    然后向服务器发送请求信息，服务器在接受到请求的信息后再返回相应的信息
    浏览器接收到来自服务器的应答信息后，对这些数据解释执行
    而当我们请求的网页文件中有很多图片、CSS、JS 等信息时，将会频繁的与服务器建立连接
        所以要减少 http 请求次数，比如图片做成雪碧图，代码、图片压缩
3、网站的静态资源比如 css、js 和图片使用 CND 分发
4、减少对 dom 的直接操作，获取 dom 时把它存在变量里面
5、改变 class 类名而不直接操作 style
6、代码精简，避免无意义的代码占资源
7、使用 get 完成 ajax 请求，缓存请求的数据在本地
8、可以用·transform: translateZ(0)·来开启硬件加速
!!

··js
// header初始化：下边框白块，皮肤
$headerMenuActive.append('<i></i>').find(li[data-href=]).addClass('active')
var a = /ab\\/c/g
$headerMenu.on({
    'mouseenter': function() {
        if(/[^]*/g.test(a)) {
            let move = $(this).index() - $headerMenuActive.index()
            $headerMenuActive.find('i').css('transform', 'translateX(100%)')
        } else {
            return false
        }
    },
    'mouseleave': function() {
        $headerMenuActive.find('i').removeAttr('style')
    }
})
··

··js
// header初始化：下边框白块，皮肤
$headerMenuActive.append('<i></i>').find(li[data-href=]).addClass('active')
··

··js
$headerMenu.on({
    'mouseenter': function() {
        let move = $(this).index() - $headerMenuActive.index()
        $headerMenuActive.find('i').css('transform', 'translateX(100%)')
    },
    'mouseleave': function() {
        $headerMenuActive.find('i').removeAttr('style')
    }
})
··

## http

### http 请求

计算机通过网络进行通信的规则，也就是客户端向服务端请求数据和服务，一种无状态的协议：不建立持久的连接，客户
端发送一次请求然后服务端返回信息，接着连接就关闭了，这个过程没有记忆，所以每次都要重新传递。

### 请求共7个步骤

!!
1、建立TCP连接
2、浏览器向服务器发送请求命令
3、浏览器发送请求头信息
4、服务器做出应答
5、服务器发送应答头信息
6、服务器向浏览器发送数据
7、服务器关闭TCP连接
!!

### 请求由4部分组成

!!
1、请求的方法，是get还是post
2、请求的url地址
3、请求头，包含客户端环境信息、身份验证信息等
4、请求体，可以是提交的字符串或表单信息，和请求头隔一行，表示请求头已结束
!!

![700](${img1})

### 响应由3部分组成

!!
1、一个数字和文字组成的状态码，表示请求成功还是失败
2、响应头，比如服务器类型、时间日期、类型和长度等
3、响应体，也就是响应正文，由服务器传过来的数据，也是要和响应头空一行
!!

![300](${img2})

### 状态码

!!
1XX：信息类，收到web浏览器请求，正在进一步处理中
2XX：成功，比如200 OK
3XX：失败或重定向
4XX：客户端请求错误，比如403资源不可用，服务器拒绝了，404 Not Found
5XX：服务器错误，不能完成对请求的处理
!!

&2017/8/1（面试上了，不搞了🛴🙃
`
        }
    }
}
</script>
