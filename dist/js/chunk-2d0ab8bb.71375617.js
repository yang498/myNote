(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ab8bb"],{1677:function(n,e,t){"use strict";t.r(e);var o=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{domProps:{innerHTML:n._s(n.format(n.text))}})},r=[],c={data:function(){return{text:"\n# demo\n\n## 小技巧\n\n（在团队项目中，还是要少用语义难以理解的小技巧，避免增加沟通成本）\n\n### 一句话\n\n!!\n使用构造函数时如果不传参数则可以省略括号，例如·new Date·\n!!\n\n### 判断数据类型\n\n·Object.prototype.toString()·返回对象的类型字符串，因此可以用来判断一个值的类型\n由于实例对象可能会自定义·toString()·，从而被覆盖掉，所以最好直接使用·Object.prototype.toString()·\n而通过函数的·call()·，可以在任意值上调用\n\n!!\n数值：返回·[object Number]·\n字符串：返回·[object String]·\n布尔值：返回·[object Boolean]·\nundefined：返回·[object Undefined]·\nnull：返回·[object Null]·\n数组：返回·[object Array]·\narguments 对象：返回·[object Arguments]·\n函数：返回·[object Function]·\nError 对象：返回·[object Error]·\nDate 对象：返回·[object Date]·\nRegExp 对象：返回·[object RegExp]·\n其他对象：返回·[object Object]·\n!!\n\n··js\nconst type = obj => {\n    const str = Object.prototype.toString.call(obj)\n    return str.match(/\\[object (.*?)\\]/)[1].toLowerCase()\n}\n\ntype({}) // \"object\"\ntype([]) // \"array\"\ntype(5) // \"number\"\ntype(null) // \"null\"\ntype() // \"undefined\"\ntype(/abcd/) // \"regex\"\ntype(new Date()) // \"date\"\n··\n\n在此基础上可延伸出判断某种数据类型的方法\n\n··js\nconst type = obj => {\n    const str = Object.prototype.toString.call(obj)\n    return str.match(/\\[object (.*?)\\]/)[1].toLowerCase()\n}\n\nconst typeList = ['Null', 'Undefined', 'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'RegExp']\ntypeList.forEach(item => {\n    type['is' + item] = obj => type(o) === item.toLowerCase()\n})\n\ntype.isObject({}) // true\ntype.isNumber(NaN) // true\ntype.isRegExp(/abc/) // true\n··\n\n## 编程模式\n\n### 三元嵌套\n\n··js\n// bad\nlet result = null\nif (conditionA) {\n    if (conditionB) {\n        result = \"A & B\"\n    } else {\n        result = \"A\"\n    }\n} else {\n    result = \"Not A\"\n}\n\n// good\nconst result = !conditionA ? \"Not A\" :\n    conditionB ? \"A & B\" : \"A\"\n··\n\n### object 代替 switch\n\n不必担心·case·或·break·，代码意图明确，当需要用·switch·处理很多逻辑时可以考虑用·object literal·代替\n\n··js\n// switch\nswitch (str) {\n    case 'a': return 'AAA'\n    case 'b': return 'BBB'\n    case 'c': return 'CCC'\n    default: return 'DDD'\n}\n\n// object literal\nconst swap = {\n    a: () => 'AAA',\n    b: () => 'BBB',\n    c: () => 'CCC',\n    default: () => 'DDD'\n}\nconst str = (swap[str] || swap['default'])()\n··\n\n## 小功能\n\n### 空闲计时\n\n!!\n介绍：页面无操作后一段时间后触发事件\n场景：当前页面需要一直展示，但用户也可以临时查看其他页面，所以在用户无操作一段时间后仍然返回当前页面\n思路：设定时间，递减时间，直到为 0 触发事件，监听鼠标、键盘、触摸事件，有任何事件触发都将时间重置为初始时间\n!!\n\n··js\nconst event = 'click dblclick contextmenu mousemove wheel keydown touchstart touchmove'.split(' ')\nconst freeTimer = countdown => {\n    let time = countdown\n    const call = () => {\n        time--\n        time\n            ? setTimeout(call, 1000) : confirm('时间到，是否继续？')\n            ? setTimeout(call, 1000) : removeEvent()\n    }\n    setTimeout(call, 1000)\n    let lowerFrame = null\n    const watch = e => {\n        // 触发频率高的事件降频以减少卡顿\n        if (/mousemove|wheel|keydown|touchmove/.test(e.type)) {\n            if (!lowerFrame) {\n                lowerFrame = setTimeout(() => {\n                    lowerFrame = null\n                    time = countdown\n                }, 100)\n            }\n        } else {\n            time = countdown\n        }\n    }\n    event.forEach(item => document.addEventListener(item, watch))\n    const removeEvent = () => event.forEach(item => document.removeEventListener(item, watch))\n}\nfreeTimer(5 * 60)\n··\n\n&2019/11/10\n"}}},s=c,i=t("2877"),l=Object(i["a"])(s,o,r,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0ab8bb.71375617.js.map