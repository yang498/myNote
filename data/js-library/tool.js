commonData.jsLibrary.tool.content = `
	#js-xlsx

	##介绍
	读取和导出 excel 的工具库，支持·xlsx·、·xls·等多种表格格式
	由于表格的数据是以二进制保存的，所以应以二进制形式读取或导出
	安装：
	··
	cnpm install xlsx
	··
	dist 目录下的·xlsx.core.min.js·为精简版，·xlsx.full.min.js·为完整版
	引入 js 后将会产生·XLSX·这个全局变量：
	!!
	XLSX.read(excel)：读取表格返回表格对象
		data：表格数据
		option{Object}：配置
			type{String}：以什么方式读取，可选·array·(8位无符号数组)、·base64·、·binary·、·buffer·、·string·、·file·(仅 node 环境支持)

	xlsx.write(workBook, option)：转换成表格格式的字符串数据

	XLSX.utils：转换工具
		XLSX.utils.sheet_to_json(sheet)：生成 json 格式，即数组对象，成员是每一行组成的对象，第一行为 key，第二行开始为 value
		XLSX.utils.sheet_to_html(sheet)：生成 html 格式，注意是以·<html></html>·作为起始和结束的
		XLSX.utils.sheet_to_csv(sheet)：生成 csv 格式，以逗号分隔的文本
		XLSX.utils.sheet_to_txt(sheet)：生成 txt 格式，以 tab 分隔的文本

		XLSX.utils.json_to_sheet(data)：将数组对象转成 sheet
		XLSX.utils.aoa_to_sheet(data)：将二维数组转成 sheet
		XLSX.utils.table_to_sheet(data)：将 table 元素转成 sheet

		XLSX.utils.book_new()：创建一个空的工作簿对象
		XLSX.utils.book_append_sheet(workBook, workSheet, sheetName)：给工作簿添加一个工作表
	!!

	##XLSX.read()
	·XLSX.read(data [, options])·：读取表格
	··
	// html
	<input id="file" type="file"/>

	// js
	const [$, {log}] = [document.querySelector.bind(document), console]
	$('#file').onchange = function () {
		const reader = new FileReader()
		if (this.files[0]) reader.readAsBinaryString(this.files[0])
		reader.onload = () => {
			const excel = XLSX.read(reader.result, {type: 'binary'})
			log(excel)
		}
	}
	··
	返回的·excel·对象包含了表格的所有信息，主要看·excel.SheetNames·和·excel.Sheets·属性
	·SheetNames·是所有·sheet·名字组成的数组
	·Sheets·是所有 sheet 组成的对象，所以通过·SheetNames·可以取到指定的 sheet
	·Sheets·中的主要属性：
	!!
	!¿ref{String}：当前表的范围，例如·A1:H8·
	!¿merges{Array}：单元格合并的信息，例如·[{s: {c: 0, r: 1}, e: {c: 0, r: 4}}]·，表示有 1 个合并单元格，范围是·A2~A5·
		s{Object}：(start) 起始
		e{Object}：(end) 结束
			c{Number}：(column) 列，从 0 开始，即 0 代表 A，1 代表 B，以此类推
			r{Number}：(row) 行，从 0 开始，即 0 代表 1，1 代表 2，以此类推
	A1...{Object}：每个单元格，若是合并的单元格只显示起始的子单元格，主要的属性有：
		v{String}：原始值
		t{String}：类型，·b·(Boolean)，·e·(Error)，·n·(Number)，·d·(Date)，·s·(Text)，·z·(Stub)
		f{String}：公式
		r{String}：富文本
		h{String}：HTML 类型富文本
		l{String}：单元格超链接对象
	!!

	##XLSX.utils
	·XLSX.utils.sheet_to_*·：读取表格并转换为可视对象
	··
	// html
	<input id="file" type="file"/>
	
	// js
	const [$, {log}] = [document.querySelector.bind(document), console]
	$('#file').onchange = function () {
		const reader = new FileReader()
		if (this.files[0]) reader.readAsBinaryString(this.files[0])
		reader.onload = () => {
			const excel = XLSX.read(reader.result, {type: 'binary'})
			const sheet1 = excel.Sheets[excel.SheetNames[0]]
			log(XLSX.utils.sheet_to_json(sheet1))
			log(XLSX.utils.sheet_to_html(sheet1))
		}
	}
	··
	·XLSX.utils.*_to_sheet·：将 js 数据转换为表格数据并下载
	··
	// html
	<div class="demo">下载表格</div>

	// js
	const [$, {log}] = [document.querySelector.bind(document), console]
	$('.demo').onclick = function () {
		// 下载的数据
		const arr = [
			['姓名',  '性别', '年龄', '注册时间'],
			['李雷',   '男',   22,    new Date],
			['韩梅梅', '女',   20,    new Date]
		]
		// 转换成表对象，格式和 XLSX.utils.sheet_to_json 返回的一样
		const excel = {
			SheetNames: ['sheet1'],
			Sheets: {
				sheet1: XLSX.utils.aoa_to_sheet(arr)
			}
		}
		// 转换成表格格式的字符串数据
		const data = XLSX.write(excel, {bookType: 'xlsx', type: 'binary'})
		// 转换成 ArrayBuffer
		function s2ab(s) {
			var buf = new ArrayBuffer(s.length);
			var view = new Uint8Array(buf);
			for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
			return buf;
		}
		// 转换成可下载的 blob 对象
		const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		const url = URL.createObjectURL(new Blob([s2ab(data)], {type}))
		// 用 a 链接下载
		const a = document.createElement('a')
		a.href = url
		a.download = '用户表'
		a.click()
	}
	··

	@@
	github|https://github.com/SheetJS/js-xlsx
	官网|https://sheetjs.com
	@@

	&2019/4/18
`