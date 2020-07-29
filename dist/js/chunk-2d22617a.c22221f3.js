(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22617a"],{e6d7:function(n,B,A){"use strict";A.r(B);var t=function(){var n=this,B=n.$createElement,A=n._self._c||B;return A("div",{domProps:{innerHTML:n._s(n.format(n.text))}})},e=[],i={data:function(){return{text:"\n# 杂谈\n\n## 互联网\n\n### 电脑硬件\n\n!!\nCPU：中央处理器，处理各种数据、逻辑\nGPU：显卡，计算由 CPU 输出的图像信息，普通的是和 CPU 集成在一起，更好的是独立显卡，自己有计算能力\n硬盘：存储文件，普通的是机械，更好的是固态硬盘，更高效的存储\n内存：暂时存放 CPU 的运算数据，例如用记事本打字，CPU 生成的字暂时存在内存中，点击保存才永久保存到硬盘上\n!!\n\n### 数据单位\n\n!!\n1 B = 8 bit\n1 KB = 1024 B\n1 MB = 1024 KB\n1 GB = 1024 MB\n1 TB = 1024 GB\nPB、EB、ZB、YB、BB、NB、DB...\n!!\n\n为什么 1M = 1024k 而不是 1000k？\n因为计算机是 1024 进制，而人习惯使用 10 进制，所以硬件制造厂家使用接近于 1024 的 1000 进制\n所以例如存储容器标明容量是 1G，实际上是 0.93G\n\n!!\n1k = 1000/1024 = 0.98K\n1G = 1000^3/1024^3 = 0.93G\n500G = 500*(1000^3/1024^3) = 465.66G\n!!\n\n### 网络\n\n!!\nWAN：广域网/外网，即运营商的服务器网络\nLAN：局域网/内网，即光猫和路由器转换的网络\nWLAN：无线局域网，一般是大型服务商发出，范围千米以上，例如移动的 CMCC\nWiFi：小型无线局域网，路由器发出，一般范围几十米，WLAN 包括了 WiFi\n以太网：外网转内网的技术实现\n!!\n\n### 本机 IP\n\n!!\n127.0.0.1：本机本地 IP 地址\nlocalhost：域名，它可以被配置为任意的 IP 地址，默认指向·127.0.0.1(ipv4)·和·[::1] (ipv6)·\n192.168.*.*：当前内网（局域网）分配的 IPv4 地址，用于相对的当前局域网的使用管理\n百度【IP 地址】的本地 IP：当前外网的分配的 IP 地址，用于连接互联网时的请求网络的 IP 地址\n!!\n\n### 浏览器\n\n主流浏览器：IE、Firefox、Google Chrome、Safari、Opera\n浏览器最重要的部分是内核，分为渲染引擎用来解析 html、css 等，和 js 引擎用来解析 js（例如 Chrome V8）\n常见浏览器内核：\n\n!!\nChrome：以前是 Webkit，现在是 Blink\nIE：Trident，目前最新的 Edge 已采用 Chromium 引擎\nFirefox：Gecko\nSafari：WebKit\nOpera：跟随 Chrome\n360、猎豹：IE + Chrome 双内核\nQQ、搜狗：Trident（兼容模式） + Webkit（高速模式）\n!!\n\n### 一句话\n\n!!\n宽带和网速：宽带网络的单位是·bit·，计算机的单位是·Byte·，·1Byte=8bit·，即·100M·宽带网速在·12.5MB/s·左右\n手机号：没有 10、11、12 开头是为了区别特殊号码，比如 10086、110、120 等\n电脑的盘符都是从 C 开始而不是 A：最开始的电脑使用的软盘存储器，确实是分成 A 和 B，后来有了硬盘就排到了 C\n!!\n\n## 生活\n\n### 电影\n\n!!\n3D：利用双眼视差产生立体感的原理，在屏幕上同时投放针对左右眼的不同的画面内容，然后通过偏振光眼镜也就是 3D 眼镜来滤掉单方面眼睛不需要看的部分，使得双眼看到不同的内容，产生立体效果\n杜比：在 3D 的基础上有更好的立体音效，色彩亮度更亮更饱和\nIMAX：超巨大屏幕，大概是 3D 两三倍，比 3D 更好的立体音效，色彩亮度更亮更饱和，亮度略低于杜比\n    重要的是如果电影是专门用 IMAX 摄影机拍摄的，那么 IMAX 的画面四边会比 3D 多一点内容\n4D：在 3D 的基础上，加上动感座椅和环境特效模拟仿真而组成的影视产品，比如电影人物被打你坐的椅子就会捅你后背，如果是在开车开飞机椅子就会跟随镜头左右摇晃，如果经过瀑布河流还会喷水雾到脸上等等。目前来说体验大部分不太成熟，在 D-BOX 厅等极个别品牌有不错 4D 体验\n!!\n\n### 药\n\n#### 抗癌药贵\n研发药的成本是巨大的，一旦失败几乎是重新来过，例如卖 1000 元 1 颗，但第一颗可能是用 10 亿研制出来的\n而且专利是有期限的，比如我国 20 年，到时其他药厂仿制价格就降了，所以药厂还得在专利期限内收回成本利润，价格可想而知\n《我不是药神》中印度大部分人比较穷，所以国家放任仿制价格自然就低，当然仿制药和正规药几乎差不了多少，处方是公开的\n但这就是无奈，药厂要挣钱才会研制新药，刚出来的药穷人又吃不起，所以还是需要国家强大把药纳入医保报销，两边都缓解压力\n\n#### 孤儿药\n\n罕见病的药物研究成本太高，市场需求又太小，很少有企业会研制，所以治疗罕见病的药物也被称为孤儿药\n\n### 血\n\n!!\n血型：由血液中红细胞的抗原决定，大致分为只有 A 抗原、只有 B 抗原、A 和 B 都含有，A 和 B 都没有，即·A B AB O·\nRh血型：含有 D 抗原的是阳性，没有的是阴性，大部分人是阳性，少部分是阴性，所以·A B AB O·又分为 Rh 阳性和阴性\n输血：血液不接受其他血型，因为血液中的血清对非自身的抗原会产生抗体，于是凝血，血不流动人就挂了\n    ·A·接受·A O·，·B·接受·B O·，·AB·都接受，·O·只接受·O·\n    Rh 阳性阴阳都接受，Rh 阴性只接受阴性，所以 Rh 阴性血也俗称熊猫血\n血型遗传：假设父是 A 母是 B，遗传时同源染色体会分开重组，所以孩子的血型可以是·A B AB O·其中任意一种\n造血干细胞：血液是由造血干细胞产生的，所以移植正常的造血干细胞可以治疗大部分血液疾病\n    造血干细胞主要处于骨头中，早期造血干细胞移植通常是在屁股上方的骨头中抽取，又成为骨髓移植，副作用大点\n    现在采用外周血的方式，先对捐献者打几天动员剂，让干细胞从骨髓中跑出来，手术时抽血筛出干细胞再还给捐献者\n!!\n\n### 日历\n\n!!\n阳历：以地球绕太阳旋转计算，一年约 365.2422 天，取整和闰年调和，国际通用\n阴历：以月亮绕地球旋转计算，一个月约 29.5306 天，少数国家在用\n农历：也称阴阳历，包含阳历的年和阴历的月，从古一直沿用至今，又以二十四节气划分\n    如今国际节日以阳历为准，传统节日还是以农历为准\n公元：公元 6 世纪时，基督教为了扩大影响，以耶稣诞生之年作为公元元年，后来成为国际标准\n!!\n\n## 数学\n\n### 维度\n\n简单来说就是过一点可以做出几条相互垂直的直线就是几维空间\n\n!!\n零维空间：一个点\n一维空间：一条直线，过一点可做出一条相互垂直的直线\n二维空间：一个平面，过一点可做出两条相互垂直的直线\n三维空间：现在的立体空间，过一点可做出三条相互垂直的直线\n四维空间：过一点可做出四条相互垂直的直线\n更高维度的空间以此类推\n!!\n\n也可以用投影的方式理解，对空间使用降维切割\n\n!!\n一维空间：用点对直线切割，得到一个零维点\n二维空间：用直线对平面切割，得到一条一维直线\n三维空间：用一个面对立方体切割，得到一个二维横截面\n四维空间：用一个立方体对四维空间进行切割，得到一个三维立方体\n更高维度的空间以此类推\n!!\n\n毕竟我们是三维生物，无法理解四维\n不是四维投影成三维，三维再投影成二维进入我们的视网膜，而是得有个四维的眼睛去理解四维的三维投影\n\n### 0.999... = 1\n\n不严谨的推论：\n\n··js\n1/3 = 0.333...\n1/3 * 3 = 1\n0.333... * 3 = 0.9999\n0.999... = 1\n··\n\n使用数学公理化和实数的构造证明：\n\n#### 有理数\n\n·p = m/n·，若 m 和 n 是整数，则 p 是有理数，即这个数的得来是有根据的、有道理的\n\n#### 无理数\n\n画个等腰直角三角形，直角边都是 1，则斜边是 √2，√2 就是无理数，因为它不是任何两个整数之比\n\n#### 18世纪德国戴德金分割\n\n设有理数为 Q，在数轴上有无穷多个有理数，分割成 A 和 B 部分\n·____A____|____B____·\n则·A∩B·是空集，即 A 集合和 B 集合没有重复元素，·A∪B·则是所有的有理数\n再设·a∈A, b∈B·，即 a 和 b 分别是 A 集合和 B 集合的某个元素，则·a<b·\n\n#### 分割结果的可能性\n\n!!\nA 中有最大，B 中无最小，例如以 2 的右边切割，则·A <= 2, B > 2·\nA 中无最大，B 中有最小，例如以 2 的左边切割，则·A < 2, B >= 2·\nA 中无最大，B 中无最小，例如以 √2 为切割点，则·A < √2, B > √2·\n    前两次是在有理数上分割，而第三次是在无理数上分割，所以切割处没有有理数\nA 中有最大，B 中有最小，用 a 表示 A 集合中最大的数，b 表示 B 集合中最大的数，因为·A∩B·是空集，所以·a≠b·\n    又因为 a 和 b 是有理数，则·(a+b)/2·也是个有理数\n    但得到的结果肯定是介于 a 和 b 之间的平均数，既大于 a 小于 b，又不属于 A 集合和 B 集合\n    这就产生了矛盾，所以不存在第四种情况\n!!\n\n第三种情况表明了正好从两个有理数之间进行分割，即两个有理数之间有空隙，而无理数就是填部了有理数的空隙\n\n#### 实数\n\n有理数和无理数的集合，即真实存在的数\n假设再对实数进行分割，则只会出现切割有理数那样的前两种结果，因为实数代表了所有存在的数\n这个过程就是实数的公理化，康托尔和柯西的方法结果也是如此\n\n#### 使用分割法证明 0.999...=1\n\n以 0.999... 的左边切割，则·A < 0.999..., B >= 0.999...·，以 1 的左边切割，则·C < 1, D >= 1·\n现在只要证明·A=C, B=D·则·0.999...=1·，这里先假设·0.999...<=1·\n设 t 是 A 集合中的数，则·t < 0.9...·且·t < 1·，所以 t 又属于 C 集合中的数\n也就是说如果 t 是 A 集合的元素，则一定是 C 中的元素，即 A 是 C 的子集·A∈C·\n反过来，设 t 是 C 集合中的数，则·t < 1·，又设 t 是个有理数，则是两个整数 p 和 q 的结果，即·p/q < 1·，即·p < q·\n由此可得·1-t = 1-p/q = (q-p)/q >= 1/q·\n又总有一个自然数 n 使得·10^n > q·，所以·1 / 10^n < 1 / q·\n则·1-t > 1/10^n·，则·t < 1 - 1/10^n·，则·1 - 1/10^n = 0.9...(n个9) < 0.999...·\n所以 t 又是集合 A 中的元素，也就是说如果 t 是 C 集合的元素，则一定是 A 中的元素，即 C 是 A 的子集·C∈A·\n因为·A∈C·又·C∈A·则·A=C·，所以·0.999...=1·\n\n## 物理\n\n### 恒星的演化\n\n!!\n最初由星际云产生，星际云是一团很大、散落的气体和固体，通过偶然的吸引和聚集逐渐合在一起\n随着不断的增大，引力和压强也增大，最后会收缩\n在星际云聚集的时候会旋转，导致中心温度极高，有可能会引发氢的聚变，也就是恒星的诞生，称之为原恒星\n诞生的情况有多种，以太阳的质量为标准：\n    原恒星的质量若小于 0.08 个太阳质量将无法引发聚变，一个失败的产物，称之为棕矮星\n    质量若介于 0.08 到 0.5 个太阳质量称之为红矮星，因亮度偏红，最近的就是相距 4.2 光年的比邻星\n        内部由氢聚变成氦，一般质量越小寿命越长，即关乎于能量释放，红矮星约几百亿年\n    质量若介于 0.5 到 8 个太阳质量称之为黄矮星，因亮度偏黄白，太阳就属于这类\n        内部由氢聚变成氦，再进一步聚变成碳或氧，太阳的寿命是 100 亿年，现在是 46 亿年\n    质量超过 8 个太阳质量称之为蓝色大恒星，因亮度偏蓝\n        蓝色大恒星的寿命只有 1000 万年左右，内部由氢聚变成氦，再进一步聚变成碳或氧，一直到铁\n因为引力和聚变的平衡恒星能持续稳定的释放能量发光，到后期引力越来越弱，无法控制聚变，导致能量膨胀变成红巨星\n    红巨星将会膨胀到一百多倍，因为膨胀，核心的密度和温度将会下降，聚变也随之减弱，引力重占上风导致收缩\n收缩到稳定状态就是白矮星，直到几千亿年的慢慢释放之后能量没了，称之为黑矮星\n红矮星由于质量小将会跳过红巨星直接变成白矮星\n蓝色大恒星则会变成超红巨星，且能量还会大量喷发，称之为超新星爆发，最后收缩成密度更大的中子星\n    如果蓝色大恒星的质量足够大，最后将会收缩成黑洞\n    霍金辐射表明，空间充满正反粒子，总是成对出现、分离、靠近、消失\n        在黑洞附近其中一个粒子可能掉进黑洞，另一个将以黑洞辐射的形式释放出去\n            随着不断的辐射蒸发，黑洞最后将爆炸消失\n而在红巨星阶段喷发的能量又会形成星际云，所以又可以重新开始演化\n!!\n\n@@\n[B站李永乐老师](https://space.bilibili.com/9458053)\n@@\n\n&2019/5/18\n"}}},C=i,a=A("2877"),r=Object(a["a"])(C,t,e,!1,null,null,null);B["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d22617a.c22221f3.js.map