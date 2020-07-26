<template>
    <div v-html="format(text)"></div>
</template>

<script>
import img1 from '@/assets/img/website01.png'
import img2 from '@/assets/img/website02.jpg'
import img3 from '@/assets/img/website03.jpg'
export default {
    data () {
        return {
            text: `
# 网站

## 建站

建立一个网站可分为 3 个部分：服务器、域名、网页文件
服务器是网站的容器，域名是网址，输入网址然后解析到服务器对应的 IP 以访问服务器，即展示出来的网页文件，以及背后提供给网页的数据的后台

### 服务器

需要一个想让任何人随时随地可以都可以访问的网站，就需要一个 24 小时不关机的高性能电脑主机存储你所写的网页程序，如果是中小型公司或个人买一个服务器是不划算的，所以买阿里云、腾讯云、百度云等云服务器是蛮划算的，方便扩容和续费
比如购买一个阿里云-云服务器 ECS，选择方便操作的 windows 系统，购买之后会分配一个 IP 地址，在服务器上配置好服务后在浏览器输入 IP 地址即可访问

### 域名

IP 地址是不好记的，所以需要域名来代替，就是网址，在阿里云或 godaddy 等网站可以注册和备案

## 阿里云 Linux

[Linux 操作系统加固](https://help.aliyun.com/knowledge_detail/49809.html)
[操作运维 Linux 服务与应用](https://help.aliyun.com/knowledge_list_page/41090/2.html?spm=a2c4g.11186631.2.27.NFTuDf)
[Linux文件结构学习掌握重点](https://yq.aliyun.com/articles/581710?spm=a2c4e.11155472.0.0.1c325f81ZfRlxX)

### 云服务器异地登录

如果看到的登录地不是常用登录地，甚至是什么美国、英国，登录账号是root或admin，那估计就是被黑了，已经绕过了登录密码和 MFA 安全码，

### 远程连接云服务器

如果普通远程连接软件（比如 SecureCRT）无法使用时，您可以使用云服务器 ECS 管理控制台的 管理终端 连接 ECS 实例，查看云服务器操作界面当时的状态。如果您拥有操作权限，可以连接到服务器进行操作配置。
![800](${img1})
如果不知道密码的话可以重置，若要修改远程连接密码，需要重启才能生效需慎重选择
![800](${img2})
若要修改实例密码（账号名通常为root，这里以Linux为例），也需要重启才能生效需慎重选择
![800](${img3})

### 简单的Linux命令

!!
cd 空格：回到初始
cd ..：回到上一级
cd /home：回到根目录
ll：查看所有文件列表
sh xx.sh：执行sh文件
exit：退出
!!

文件夹后面是斜杠代表是一个文件夹，没有是文件
bin -> usr/bin/：代表子目录是usr，但可直接访问孙目录bin

### 远程连接工具

#### SecureCRT

命令式
百度 SecureCRT 下载或直接在电脑管家的软件管理中也可以（官网下载还要登录），一直点下一步即可
再百度 SecureCRT keygen 下载注册机，比如在[多多软件站](https://www.baidu.com/link?url=DziWjZR39cXFht1SnuhS1RygelmH0W0cW4LbohLmLub2Oiqi2pEfsjsnfPI-3MBgD6csTQe5_-WNrfvHaRGZPq&wd=&eqid=e6a36eba0002a1b0000000035adc5254)下载了一个，在安装的时候注意把附带其他的软件的勾给去掉，不然你懂得，超烦的，运行 SecureCRT keygen.exe，点击左下的 patch，选择安装路径的 SecureCRT.exe，第二次选择 LicenseHelper.exe，成功后点击 Generate 生成许可证，再打开 SecureCRT，第一个大的输入框不填点下一步，对应的框复制粘贴对应的名称、序列号、日期即可，最后的大输入框也不填就可以了

#### WinSCP

文件式
官网下载即可

@@
[阿里云-文档](https://help.aliyun.com/?spm=a2c4g.11186623.201511181.1.EnHOJL)
@@

&2018/4/12
`
        }
    }
}
</script>
