commonData.other.office = {
	name: '电脑操作',
	content: `
	#常用运行命令
	快捷键：win+R
	cmd：命令提示符（也可以在文件夹的目录栏输入cmd回车可直接进入当前文件夹）
	mstsc：远程连接

	#cmd常用命令
	ipconfig：查看IP地址

	#小技巧
	##电脑微信多开
	###手动式
	1、点击微信图标使其聚焦
	2、快速点击enter键，能开几个就看手速咯

	###命令式
	1、新建一个文本
	2、复制以下内容进去：
	··
	TASKKILL /F /IM wechat.exe
	start "" "文件路径"
	··
	3、在微信图标上右键，点击属性，复制目标位置的内容路径，将【文件路径】替换成你复制的路径
	5、将第二行复制，想要打开几个微信就复制几行
	6、保存后将文件后缀修改为【.bat】
	7、双击打开即可运行
	此方法来自知乎问题@[电脑上怎么登录几个微信（微信多开）？|https://www.zhihu.com/question/41110715]

	##桌面和文件夹右键
	###右键反应慢
	删除注册表，运行·regedit·，找到·HKEY_CLASSES_ROOT\\Directory\\Background\\shellex\\ContextMenuHandlers·，删掉·igfx·开头的即可
	###删除右键菜单
	在注册表中也可以修改，不过更方便的是在·电脑管家 > 工具箱 > 其他 > 管理右键菜单·中可设置

	#office
	ctrl+z后退，ctrl+y前进
	按alt会出现快捷方式，所以按alt+对应字母就是快捷键，alt+数字为自定义快捷键

	##word
	设置目录

	##excel
	鼠标：
	!!
	鼠标移动到当前单元格的右下角![./img/other/office01.jpg,150]
		按住鼠标左键拖动：复制
		按住鼠标左键往内拖动：清除内容
		单元格为非文本类型且包含数字：按住拖动往右或下是累加，往左或上是累减，再按住·ctrl·键可以原样复制
		拖动时按住·shift·键：插入空白单元格
	鼠标移动到单元格边缘会出现十字箭头![./img/other/office03.jpg,150]
		按住鼠标左键拖动：移动，如果目标单元格有内容则会提示是否覆盖
		拖动时按住·ctrl·键：复制，如果目标单元格有内容不会提示是否覆盖
		拖动时按住·shift·键：移动插入单元格
		拖动时按住·ctrl+shift·键：复制插入单元格
	!!
	键盘：
	!!
	tab：切换到右一个单元格
	shift+tab：切换到左一个单元格
	enter：切换到下一个单元格
	shift+enter：切换到上一个单元格
	ctrl+D：复制上一个单元格
	ctrl+鼠标左键：选择多个单元格
	ctrl+A：全选，若当前单元格有内容则会全选所有有内容的单元格
	home：回到当前行首
	ctrl+home：回到表格的第一个单元格
	ctrl+end：回到表格的最后一个单元格
	end：进入结束模式
		home：回到表格的最后一个单元格
		方向键：对应方向的同类型的最后一个单元格，若该方向之后没有内容则会直到 excel 表格的镜头
		其他键：取消结束模式
	!!
	固定单元格：视图>冻结窗格
	隔行变色：开始>套用表格格式（表头会变成固定，点击下拉箭头可筛选）
	自定义隔行变色：选择要变色的单元格>开始>条件格式>新建规则>选择使用公式确定>输入=MOD(ROW(),2)=0>格式>填充>选择要填充的颜色
	!./img/other/office05.jpg,400
	删除空白单元格：ctrl+G>定位条件>空值>确定>在空白的单元格上右键删除（注意不是整行或整列的空白单元格，删除后会改变顺序）
	!./img/other/office06.jpg,auto,400
	!./img/other/office07.jpg,auto,400
	繁体转简体：审阅>繁转简

	##打印
	点击打印或打印预览会出现虚线，这是打印的边界，多出的内容将会换行，调整表格大小再打印，也可以在预览的时候调整大小，或点击分页预览拖动边界线

	#打印机
	##共享打印机
	取消禁用 Guest 用户：计算机>管理>用户>双击【Guest】>取消勾选【账户已禁用】
	共享打印机：开始>设备和打印机>在当前打印机上右键选择【打印机属性】>切换到【共享】选项卡>勾选【共享这台打印机】
	网络共享：在网络图标上右键点击【打开网络和共享中心】>选择家庭组和共享选项>更改高级共享设置>选【家庭或工作】下面的>【文件和打印机共享】下面勾选【启用】>【密码保护的共享】下面勾选【关闭】>如果是公用网络就选【公用】下面的勾选【启用共享】【关闭密码】

	##连接打印机
	开始>设备和打印机>添加打印机>添加网络或无线打印机>如果长时间搜不到或不想等就点击【不在列表中】>浏览打印机>如果还是长时间搜不到或不想等就点击目录栏手动输入【\\\\共享的电脑名称】（比如\\\\dayin）>选择共享打印机的主电脑>选择共享的打印机

	##无法打印
	注意主电脑睡眠休眠状态下无法打印
	如果没有打印机驱动可以直接百度【打印机型号 驱动下载】或去打印机的官网下
	如果发现连接上打印机却无法打印，可能是共享打印机的主电脑没有开启服务：计算机>管理>服务>将【Print Spooler】启动，如果已经启动了还不行就删掉设备再来一次
	如果共享打印机的主电脑重启之后无法打印，可能是没有激活打印机，在主电脑上打印测试页之后再在其他电脑上打印试试
	不行的话可能是主电脑重启后，其他电脑不能自动连接到主电脑，需要添加windows凭据：
	开始>控制面板>用户账户和家庭安全>凭据管理器>添加windows凭据>Internet地址或网络地址：主电脑的电脑名称，用户名：主电脑的账户名（没改默认是Administrator），密码：主电脑的密码（没有就不填）

	#共享文件
	将电脑的文件或盘共享可以让其他电脑查看和修改，这需要在同一 局域网/WiFi 下才能连接
	要共享电脑的操作：
	!!
	网络共享：网络和共享中心 > 把【网络发现】【文件和打印机共享】【公用文件夹共享】启用，【密码保护】关闭
	文件共享：右键要分享的盘或文件夹 > 共享 > 高级共享 > 高级共享 > 勾选【共享此文件夹】（可以设置共享名） > 权限 > 勾选【完全控制】
	添加权限：右键要分享的盘或文件夹 > 属性 > 选择【安全】选项卡 > 编辑 > 添加 > 输入【Everyone】 > 将 Everyone 的权限勾选【完全控制】
	!!
	访问共享的电脑：打开我的电脑，在目录路径栏熟输入【\\\\共享电脑的名字或 IP 地址】
	电脑名字在【我的电脑 > 右键 > 属性】中查看，电脑 IP 即 IPv4 地址，在【网络和共享中心 > 点击连接的网络 > 详细信息】中查看

	#上不了网
	windows+x查看是否关闭无线
	最简单直接的如果有电脑管家的话：工具箱>测试网速>网络修复>
	如果没有或不行的话，点击右下角网络>网络和共享中心>查看活动网络 连接>属性>internet 协议版本 6和4>属性>自动获取地址
	重装网卡驱动：下个驱动精灵或驱动人生等重新安装
	网络和共享中心>更改适配器设置>看网络链接的设备名，也就是驱动名，在计算机右键>管理>设备管理器>网络适配器>卸载对应名字的网络驱动
	打开驱动大师检测安装即可

	#重装系统

	##名词解释
	BIOS（Basic Input Output System）：基本输入输出系统，一组固化到计算机内主板上一个 ROM 芯片上的程序，说白了就是系统管理设置
	Boot：系统引导界面，电脑以哪种模式启动，在 BIOS 中可以设置
	UEFI（Unified Extensible Firmware Interface）：统一的可扩展固件接口，说白了就是 BIOS 的升级版

	##准备
	这一步之前做过的话可以跳过
	这里以@[通用pe工具箱|http://www.tongyongpe.com/]为例
	准备一个U盘（最好是空的），先下载好系统安装包，百度就可以了
	安装好通用pe工具箱程序
	!./img/other/reinstall01.jpg,800
	安装完选择好U盘，点击一键制作USB启动盘（默认勾选NTFS格式，让U盘可以容纳4G以上大文件），注意这会清空U盘，然后把系统安装包放到GHO文件夹内
	!./img/other/reinstall03.jpg,400

	##操作
	插好U盘，重启电脑，在开机画面出来的时候按住快捷键，比如联想按F12，不知道就去百度，就可以进入选择boot设备窗口了
	按方向键"↑↓"选择到u盘，然后按回车键进入通用pe主界面
	!./img/other/reinstall02.jpg,800
	进入通用pe主菜单后，选择第一个回车
	要是"通用PE一键装机"工具没有自动运行的话，我们就手动双击该软件运行它即可
	该软件会自动识别ISO镜像文件（即U盘的系统安装包），并自动提取里面的GHO文件，然后点击开始，注意这会清空电脑的C盘
	然后就会慢慢解压系统安装包，解压完毕后会提示重启电脑，点击确定即可，可以拔出U盘了
	重装完成！一般就是20分钟左右

	##分区
	在 pe 系统选择快速分区，左边可选择几个分区，右边可调整大小
	一般分区完需要重启一下才能继续重装系统

	##手动安装
	在 pe 系统：·Local>Partition>From image·，选择gho文件，选择第一个，最后Rest Computer

	##进不了pe系统
	方法一：在系统BIOS中设置·Devices>ATA Drive Setup>IDE·
	方法二：以运行“硬盘安装.exe”的形式重装
	方法三：下载·diskgenius·将硬盘重新分区
	方法四：试试其他的U盘启动工具

	##重启失败
	开机显示：windows boot manager has been blocked by the current security policy
	一般这种问题出现在 win10 或 win8 重装成 win7 的时候，意思是 Windows 启动管理器已被当前安全策略阻止。因为原来装的是 win8 或 win10 系统，所以会开启 UEFI 安全启动选项
	以联想笔记本为例，刚开机时按 F12 是进入 boot 界面，即重装系统的 pe 界面，在解压 GHO 文件后会提示重启电脑，然后就会开机显示上面的一长串英文，此时需要再次重启电脑，刚开机时按 F2 进入 bios 界面，在右边的界面可以看到选项说明，底部是按键说明，进行操作：
	!!
	Security 菜单：选择 Secure BOOT，改为 Disabled，表示关闭安全策略
	Boot 菜单：
		选择 boot mode，改为 Legacy First 或 legacy support 或 AUTO，表示修改引导模式为传统优先或其他
		选择 boot priority，改为 Legacy First 或 legacy support 或 AUTO，表示修改引导优先级为传统优先或其他
		选择 Launch CSM（如果有这个选项），改为 Enabled
	Exit 菜单：选择 OS Optimized Defaults，改为 OTHER OS，表示修改默认优先系统为其他系统
	!!
	基本上都改为第二个选项就行了，完成后按 F10、选 Yes 保存退出即可
	再次进入 pe 工具箱，选择快速分区，在左边选择 MBR 类型，GUID类型 主要是针对 win8 以上系统和 UIFI 引导模式，优势是启动速度较快。注意得两个条件齐备才选择 GUID。
	再次重启电脑就可以了

	##更快捷的方法
	解压系统安装包到^^电脑上^^，右键以管理员身份运行“硬盘安装.exe”，选择需要备份的数据后点击“立即重装”，系统将自动安装，若重启失败，可手动重启
	这是电脑可以启动的前提下，如果像系统文件损坏连开机都开不了的话只能用U盘重装了

	&2018/8/11
	`
}