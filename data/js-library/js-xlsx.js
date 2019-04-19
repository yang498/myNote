commonData.jsLibrary.jsXlsx.content = `
	#介绍
	读取和导出 excel 的工具库，支持·xlsx·、·xls·等多种表格格式
	安装：
	··
	cnpm install xlsx
	··
	dist 目录下的·xlsx.core.min.js·为精简版，·xlsx.full.min.js·为完整版
	引入 js 后将会产生·XLSX·这个全局变量：
	!!
	XLSX.read()：读取表格
	!!

	#XLSX.read()
	·XLSX.read(data [, options])·：读取表格
	!!
	data：表格数据
	option{Object}：配置
		type{String}：以什么方式读取，可选·array·(8位无符号数组)、·base64·、·binary·、·buffer·、·string·、·file·(仅 node 环境支持)
	!!
	··
	// html
	<input id="file" type="file"/>

	// js
	const {log} = console
	const $file = document.querySelector('#file')
	const $img = document.querySelector('#img')
	$file.onchange = function () {
		const reader = new FileReader()
	    if (this.files[0]) reader.readAsBinaryString(this.files[0])
	    reader.onload = () => {
	    	const excel = XLSX.read(reader.result, {type: 'binary'})
	    	log(excel)
	    }
	}
	··
	返回的·excel·对象包含了表格的所有信息，主要看·excel.SheetNames·和·excel.Sheets·属性

	@@
	github|https://github.com/SheetJS/js-xlsx
	官网|https://sheetjs.com
	@@

	&2019/4/18
`