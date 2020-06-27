/* eslint-disable brace-style */
/* global $ */
import store from '@/store'
import { Message } from 'element-ui'

let h2List = []
let h3List = []
let copyList = []

// 复制代码块
window.copy = index => {
    $('article').innerHTML += `<textarea id="copy">${copyList[index]}</textarea>`
    $('#copy').select()
    document.execCommand('copy')
    $('#copy').remove()
    Message.success('已复制')
}

// formatString 相关
const addTag = (text, tag) => `<${tag}>${text}</${tag}>`
const addA = (text, href) => `<a href="${href}" target="_blank">${text}</a>`
const addIframe = (height, src) => `~<iframe style="height: ${height}px;" src="${src}"></iframe>`
const addImg = (size, src) => {
    const addPx = n => /^\d+$/.test(n) ? n + 'px' : n
    const sizeList = size.split(',').map(addPx)
    return `<img src="${src}" style="width: ${sizeList[0] || 'auto'}; height: ${sizeList[1] || 'auto'};"/>`
}
const addList = text => {
    text = text.split('\n').map(item => {
        return item.replace(/ {4}/g, '<i class="attr"></i>')
            .replace(/.+?(?=：)/, head =>
                '<span class="head">' + head
                    .replace(/(?<!\\|\([^)]*)\{.+?(?<!\\)\}/, '<i class="type">$&</i>').replace(/\\(?=\{|\})/g, '')
                    .replace(/(?<!\\|\([^)]*)\[.+?(?<!\\)\]/, '<i class="default">$&</i>').replace(/\\(?=\[|\])/g, '')
                    .replace(/(?<!\\)!/, '<b>$&</b>').replace(/\\(?=!)/, '') +
        '</span>').replace(/(.*):$/, '<span class="head">$1</span>')
    }).join('</li><li>')
    return '<li>' + text + '</li>'
}
const addTable = text => {
    const [thead, align, ...tbody] = text.split('\n').map(item => item.slice(1, -1).trim().replace(/ *\| */g, '|'))
    const $thead = '<thead><tr><th>' + thead.replace(/\|/g, '</th><th>') + '</th></tr></thead>'
    const alignList = align.split('|')
    const alignTest = item => /^:-+:$/.test(item) ? 'class="center"' : /^-+:$/.test(item) ? 'class="right"' : ''
    const $tbody = '<tbody>' + tbody.map(tr => {
        tr = tr.split('|').map((td, i) => `<td ${alignTest(alignList[i])}>${td}</td>`).join('')
        return '<tr>' + tr + '</tr>'
    }).join('') + '</tbody>'
    return `%%<table>${$thead + $tbody}</table>%%`
}
const addLink = (text, multi) => '@@学习参考链接：' + (multi ? '<br>' : '') + text.replace(/\n/g, multi ? '<br>' : '，') + '@@'

// 整理行内标识符，多行合并成单行（列表、表格、代码块、底部链接）
const formatString = str => {
    // 标签的左右箭头换成转义符
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
        // 内嵌网页 <iframe>
        .replace(/~\[(.*?)\]\((.+?)\)/g, (res, height, src) => addIframe(height, src))
        // 图片 <img>
        .replace(/!\[(.*?)\]\((.+?)\)/g, (res, size, src) => addImg(size, src))
        // 链接，<a>
        .replace(/\[([^[]+?)\]\((.+?)\)/g, (res, text, href) => addA(text, href))
        // 粗体，<b>
        .replace(/(?<!\\)\*\*(.+?)\*\*/g, (res, text) => addTag(text, 'b')).replace(/\\(?=\*\*)/g, '')
        // 多行代码块
        .replace(/··(.+?)\n··/gs, (res, text) => '‥' + text.replace(/\n/g, 'ˊ') + '‥')
        // 行内代码块 <code>
        .replace(/·(.+?)·/g, (res, text) => addTag(text, 'code'))
        // 列表
        .replace(/!!\n(.+?)\n!!/gs, (res, text) => '!!' + addList(text) + '!!')
        // 表格
        .replace(/%%\n(.+?)\n%%/gs, (res, text) => addTable(text))
        // 多行底部链接
        .replace(/@@@\n(.+?)\n@@@/gs, (res, text) => addLink(text, true))
        // 单行底部链接
        .replace(/@@\n(.+?)\n@@/gs, (res, text) => addLink(text, false))
}

// formatTag 相关
const reg = {
    h1: /^# /,
    h2: /^## /,
    h3: /^### /,
    h4: /^#### /,
    list: /^!!|!!$/g,
    table: /^%%|%%$/g,
    code: /^‥|‥$/g,
    iframe: /^~/,
    link: /^@@|@@$/g,
    time: /^&/
}

// 分割成每一行进行匹配对应的标签
const formatTag = function (str) {
    return str.split('\n').map(item => {
        // h4 标题
        if (reg.h4.test(item)) return `<h4>${item.replace(reg.h4, '')}</h4>`
        // h3 标题
        if (reg.h3.test(item)) {
            const index = h2List.length - 1 + '-' + h3List[h2List.length - 1].length
            h3List[h2List.length - 1].push(item.replace(reg.h3, ''))
            return `<h3 class="h3-${index}" onclick="this.scrollIntoView()">${item.replace(reg.h3, '')}</h3>`
        }
        // h2 标题
        else if (reg.h2.test(item)) {
            h2List.push(item.replace(reg.h2, ''))
            h3List.push([])
            return `<h2 onclick="this.scrollIntoView()">${item.replace(reg.h2, '')}</h2>`
        }
        // h1 标题
        else if (reg.h1.test(item)) return `<h1>${item.replace(reg.h1, '')}</h1>`
        // 列表
        else if (reg.list.test(item)) return `<ul>${item.replace(reg.list, '')}</ul>`
        // 表格
        else if (reg.table.test(item)) return `<div class="table">${item.replace(reg.table, '')}</div>`
        // 代码块
        else if (reg.code.test(item)) {
            item = item.replace(reg.code, '').replace(/ˊ/g, '\n')
            const lang = item.replace(/\n.+/s, '')
            const code = item.replace(/.+?\n/s, '')
            copyList.push(code)
            return `<div class="code">
                        <i class="copy el-icon-copy-document" title="复制" onclick="copy(${copyList.length - 1})"></i>
                        <pre><code class="${lang}">${code}</code></pre>
                    </div>`
        }
        // iframe
        else if (reg.iframe.test(item)) return `<div class="iframe">${item.replace(reg.iframe, '')}</div>`
        // 底部链接
        else if (reg.link.test(item)) return `<div class="link">${item.replace(reg.link, '')}</div>`
        // 最后更新时间
        else if (reg.time.test(item)) return `<time>最后更新时间：${item.replace(reg.time, '')}</time>`
        // 非空行都是段落
        else if (item.trim() !== '') return `<p>${item}</p>`
    }).join('')
}

export default content => {
    h2List = []
    h3List = []
    copyList = []
    content = formatTag(formatString(content))
    store.commit('h2List', h2List)
    store.commit('h3List', h3List)
    return content
}
