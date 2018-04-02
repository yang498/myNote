let commonData = {
	html: { name: 'html' },
	css: { name: 'css' },
	cssLibrary: { name: 'css库' },
	js: { name: 'js' },
	jsLibrary: { name: 'js库' },
	tool: { name: '工具' },
	other: { name: '其他' }
}
let menuParent = location.hash.replace(/^#|\/[^]*/g, '')
let menuChild = location.hash.replace(/[^]*\//, '')