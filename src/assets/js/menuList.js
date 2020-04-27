export default [
    {
        name: 'html',
        list: [
            { name: 'html', path: 'html/html' },
            { name: 'mobile', path: 'html/mobile' },
            { name: '优化', path: 'html/optimize' },
            { name: '微信小程序', path: 'html/applet', progress: 100 },
            { name: 'weex', path: 'html/weex', progress: 50 },
            { name: 'electron', path: 'html/electron' }
        ]
    },
    {
        name: 'css',
        list: [
            { name: 'css', path: 'css/css', progress: 50 }
        ]
    },
    {
        name: 'javascript',
        list: [
            { name: '语法', path: 'js/grammar', progress: 50 },
            { name: 'function', path: 'js/function' },
            { name: '浏览器', path: 'js/browser', progress: 50 },
            { name: '网络请求', path: 'js/connect', progress: 50 },
            { name: 'node', path: 'js/node', progress: 50 },
            { name: 'demo', path: 'js/demo', progress: 100 }
        ]
    },
    {
        name: 'js 标准库',
        list: [
            { name: 'object', path: 'jsType/object', progress: 100 },
            { name: 'array', path: 'jsType/array', progress: 100 },
            { name: 'string', path: 'jsType/string', progress: 100 },
            { name: 'regexp', path: 'jsType/regexp', progress: 100 },
            { name: 'math', path: 'jsType/math', progress: 100 },
            { name: 'date', path: 'jsType/date', progress: 100 },
            { name: 'es6', path: 'jsType/es6' }
        ]
    },
    {
        name: 'js 框架',
        list: [
            { name: 'jquery', path: 'jsLib/jquery', progress: 100 },
            { name: 'vue', path: 'jsLib/vue', progress: 50 },
            { name: 'vue 工具', path: 'jsLib/vueTool', progress: 50 },
            { name: '工具', path: 'jsLib/tool', progress: 50 }
        ]
    },
    {
        name: '工具',
        list: [
            { name: 'sass', path: 'tool/sass' },
            { name: 'git', path: 'tool/git', progress: 100 },
            { name: 'gulp', path: 'tool/gulp', progress: 100 },
            { name: 'webpack', path: 'tool/webpack' },
            { name: 'taro', path: 'tool/taro' },
            { name: '其他', path: 'tool/other' }
        ]
    },
    {
        name: '数据库',
        list: [
            { name: 'SQL Server', path: 'database/sql', progress: 50 }
        ]
    },
    {
        name: '其他',
        list: [
            { name: '资源链接', path: 'other/link', progress: 100 },
            { name: '网站', path: 'other/website' },
            { name: '面试', path: 'other/interview' },
            { name: '电脑操作', path: 'other/office', progress: 50 },
            { name: '杂谈', path: 'other/article', progress: 50 },
            { name: '英语', path: 'other/english' }
        ]
    }
]
