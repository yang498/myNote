(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e941e"],{"8d84":function(n,r,e){"use strict";e.r(r);var a=function(){var n=this,r=n.$createElement,e=n._self._c||r;return e("div",{domProps:{innerHTML:n._s(n.format(n.text))}})},t=[],i={data:function(){return{text:"\n# array\n\n## 概述\n\n### 定义\n\n一组有序值的集合，索引从 0 开始，以中括号包裹，值之间以逗号·,·分隔\n\n··js\nvar arr = ['a', 'b', 'c']\narr[0] // 'a'\narr[1] // 'b'\narr[0] = 'A' // 重新赋值\n··\n\n### 特殊的对象\n\n本质上数组属于一种特殊的对象，索引值为键名\n\n··js\ntypeof [1, 2, 3] // 'object'\n\nvar arr = ['a', 'b', 'c']\narr['0'] // 'a'\narr[0] // 'a\n··\n\n### length\n\n数组的·length·属性为所有成员数量\n·length·属性可写，若设置的长度小于当前长度则相当于把多余的数组成员删除，若大于则会用空位代替\n\n··js\n['a', 'b', 'c'].length // 3\n\nvar arr = [ 'a', 'b', 'c' ]\narr.length = 2\narr // [\"a\", \"b\"]\n\nvar a = ['a']\na.length = 3\na[1]  // undefined\n··\n\n由于数组本质上是一种对象，所以可以为数组添加属性，但不影响·length·，·length·只等于最大的整数键名加 1\n\n··js\nvar a = []\n\na['p'] = 'abc'\na.length // 0\n\na[2.1] = 'abc'\na.length // 0\n··\n\n### 类似数组的对象\n\n对象的键名为非负正整数且有·length·属性\n因为本质是个对象，所以·length·不会随着成员的变化而变化，也不具备数组的方法\n常见的类似数组的对象为函数的参数·arguments·，DOM 元素集，字符串\n\n··js\nvar obj = {\n    0: 'a',\n    1: 'b',\n    2: 'c',\n    length: 3\n}\n··\n\n可将类似数组的对象转换为真正的数组：\n\n··js\n// slice\nArray.prototype.slice.call(arrayLike)\n// ...\n[...arrayLike]\n··\n\n或通过·call·使用数组的方法\n\n··js\nArray.prototype.forEach.call(arrayLike, (value, index) => {\n    console.log(index + ' : ' + value)\n})\n··\n\n## 构造函数\n\n··js\nvar arr = new Array(2)\n// 等同于\nvar arr = Array(2)\n··\n\n不同的参数的行为不一致\n\n··js\nArray() // []\nArray(2) // [ empty x 2 ]\nArray(3.2) // RangeError: Invalid array length\nArray('abc') // ['abc']\nArray(1, 2) // [1, 2]\n··\n\n所以直接使用数组字面量是更好的做法\n\n··js\nvar arr = [1, 2]\n··\n\n## 方法\n\n### 静态方法\n\n!!\nArray.isArray(obj)：返回一个布尔值，判断参数是否为数组，可以弥补·typeof·运算符的不足\n!!\n\n### 实例方法\n\n以下方法前面省略·Array.prototype.·\n\n!!\nvalueOf()：返回数组本身\ntoString()：将数组转换为字符串，相当于把数组内所有的·[·和·]·去掉\n\npush(...obj)：在数组的最后添加元素，并返回添加后的数组长度。注意会改变原数组\npop()：删除数组的最后一个元素，并返回该元素。注意会改变原数组\nunshift(...obj)：在数组的第一个位置添加元素，并返回添加后的数组长度。注意会改变原数组\nshift()：删除数组的第一个元素，并返回该元素。注意会改变原数组\nreverse()：颠倒数组元素，返回改变后的数组。注意会改变原数组\nsort(fn)：对数组排序，返回改变后的数组，默认按照字典顺序从小到大排序。注意会改变原数组\n    排序时数值会被先转成字符串再按照字典顺序比较，所以·101·会排在·11·的前面\n    fn(a, b) {Function}：接受两个参数分别为当前比较的两个元素，假设参数是·a·和·b·，·return a - b·：\n        如果返回值大于·0·则·a·排在·b·后面，否则·a·排在·b·前面，即从小到大，可以·return b - a·从大到小\nsplice(start, count, ...add)：删除指定位置元素并在该位置添加元素，返回被删除的元素数组。注意会改变原数组\n    start {Number} [0]：开始删除的位置，可以是负数表示倒数\n    count {Number} [length - start]：删除的个数，默认从·start·开始全都删除，如果只想添加可以设为·0·\n    ...add：要添加的元素\n\njoin(str)：将所有数组元素转换为字符串，并以参数字符串连接为一个字符串返回，参数默认为·,·\nconcat(...obj)：将所有参数合并到数组中，返回一个新数组，如果参数是数组则是合并里面的元素\nslice(start, end)：提取目标数组的一部分，参数可以是负数表示倒数，若·start·大于·end·则返回空数组\n    start {Number} [0]：开始位置\n    end {Number} [length]：结束位置（不含该位置）\n\nmap(fn(item, index, arr), thisObj)：遍历数组，把每次函数返回的结果组成一个新数组返回\n    fn(item, index, arr) {Function}：回调函数\n        item：当前循环的元素\n        index {Number} ：当前循环的索引\n        arr：原数组\n    thisObj：将回调函数内部的·this·指向此参数\nforEach(fn(item, index, arr), thisObj)：遍历数组，参数同·map()·\n    注意，·forEach·不能通过·break·或·return·中断，可以抛出错误中断，例如·throw new Error()·\nfilter(fn(item, index, arr), thisObj)：过滤数组，把每次返回为·true·的元素组成新数组返回，参数同·map()·\n\nsome(fn(item, index, arr), thisObj)：若函数返回有一次·true·则返回·true·，否则·false·，参数同·map()·\nevery(fn(item, index, arr), thisObj)：若函数返回全是·true·则返回·true·，否则·false·，参数同·map()·\n    注意，空数组也返回·true·\n\nreduce(fn(a, b, index, arr), initial)：遍历数组返回累计值，参数·index·和·arr·同·map()·\n    fn(a, b, index, arr) {Function}：回调函数\n        a：累积值，默认为数组的第一个元素\n        b：当前元素，默认为数组的第二个元素\n    initial：对累积值指定初始值，注意当空数组使用此方法时会报错，设定初始值可以防止报错\nreduceRight(fn(a, b, index, arr), initial)：从右到左遍历数组返回累计值，参数同·reduce()·\n\nindexOf(obj, start)：遍历查找参数在数组中第一次出现的索引，若没找到返回·-1·\n    注意，此方法内部使用·===·进行比较\n    obj：查找的值\n    start {Number}：起始查找位置，可以是负数表示倒数\nlastIndexOf(obj, start)：从右到左遍历查找第一次出现的索引，参数同·indexOf()·\n!!\n\n### sort()\n\n··js\n['d', 'c', 'b', 'a'].sort() // ['a', 'b', 'c', 'd']\n\n[4, 3, 2, 1].sort() // [1, 2, 3, 4]\n\n[11, 101].sort() // [101, 11]\n\n[10111, 1101, 111].sort((a, b) => a - b) // [111, 1101, 10111]\n\n// 使用 localeCompare 可按拼音排序中文\n[...'北上广深'].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN')) // [\"北\", \"广\", \"上\", \"深\"]\n··\n\n### reduce()\n\n··js\n[1, 2, 3, 4].reduce((a, b) => {\n    console.log(a, b)\n    return a + b\n})\n// 1 2\n// 3 3\n// 6 4\n// 结果：10\n\n// 参数若为对象内部相加需使用初始值，否则相加不了\n[{ count: 1 }, { count: 2 }].reduce((a, b) => a + b.count, 0)\n// 结果：3\n\n// 找出字符长度最长的数组成员\nstrArr.reduce((long, item) => long.length > item.length ? long : item, '')\n··\n\n## es6 方法\n\n### 静态方法\n\n!!\nArray.from(obj, fn(item, index), thisObj)：将类似数组或可遍历（iterable）的对象转换为数组，参数同·map()·\nArray.of(...obj)：将一组值转换为数组，主要是弥补·Array()·因参数个数不同而导致的差异\n!!\n\n### 实例方法\n\n以下方法前面省略·Array.prototype.·\n\n!!\ncopyWithin(target, start, end)：复制指定位置的成员到目标位置，返回当前数组。注意会改变原数组\n    注意，若目标位置中有元素会被覆盖，包括复制的元素本身\n    target：从该位置开始替换数据。可以是负数表示倒数\n    start [0]：从该位置开始复制。可以是负数表示倒数\n    end [length]：到该位置前停止复制。可以是负数表示倒数（不含该位置）\n\nfind(fn(item, index, arr), thisObj)：找出第一个返回·true·的元素，没有则返回·undefined·，参数同·map()·\nfindIndex(fn(item, index, arr), thisObj)：找出第一个返回·true·的位置，没有则返回·-1·，参数同·map()·\nincludes(obj, start)：判断数组是否有参数值，可以比较·NaN·，第二个参数为起始查找位置\n    obj：查找的值\n    start {Number}：起始查找位置，可以是负数表示倒数\n\nfill(value, start, end)：使用给定值填充数组\n    value：填充的值\n    start [0]：填充的起始位置。可以是负数表示倒数\n    end [length]：填充的结束位置。可以是负数表示倒数（不含该位置）\nflat(n)：将 n 维数组拉平成一维数组，返回一个新数组，会跳过数组空位\n    n[1]：指定要拉平的层数，可以用·Infinity·表示拉平所有层\nflatMap(fn(item, index, arr), thisObj)：相当于先·map()·再·flat()·，因为不能指定层数所以只能拉平一层\n\nkeys()：返回数组键名的遍历器对象（Iterator）\nvalues()：返回数组键值的遍历器对象（Iterator）\nentries()：返回数组键值对的遍历器对象（Iterator）\n!!\n\n### Array.from()\n\n任何有·length·属性的对象都可以通过·Array.from·方法转为数组，而扩展运算符无法转换\n\n··js\nArray.from({ length: 3 })\n// [ undefined, undefined, undefined ]\n··\n\n对于还没有部署该方法的浏览器，可以用·Array.prototype.slice·替代\n\n··js\nconst toArray = (() => Array.from || obj => [].slice.call(obj))()\n··\n\n### copyWithin()\n\n··js\n[1, 2, 3, 4, 5].copyWithin(0, 3) \n// [4, 5, 3, 4, 5]\n// 复制第 3 个元素直到最后（4 5），替换掉从第 0 个开始的元素（1 2）\n// 即复制 4 5 替换了 1 2\n\n[1, 2, 3, 4, 5].copyWithin(0, 2) \n// [3, 4, 5, 4, 5]\n// 复制 3 4 5 替换了 1 2 3\n\n[1, 2, 3, 4, 5].copyWithin(0, 1)\n// [2, 3, 4, 5, 5]\n··\n\n## es6\n\n### 扩展运算符\n\n扩展运算符是三个点·...·，用于将一个数组或遍历器（Iterator）对象转为用逗号分隔的参数序列\n\n··js\nconsole.log(...[1, 2, 3])\n// 1 2 3\n··\n\n也可用于函数的参数，传入参数时表示将数组转为参数序列，接受参数时表示接收剩余的所有参数\n\n··js\nfunction push(array, ...items) {\n    array.push(...items)\n}\n\nfunction add(x, y) {\n    return x + y\n}\nadd(...[1, 2]) // 3\n··\n\n注意只能在数组中或给方法传参时使用，否则会报错，即要有可使用的容器接收，以下写法错误\n\n··\n...[1, 2]\n(...[1, 2])\nconsole.log((...[1, 2]))\n··\n\n### 扩展运算符的应用\n\n··js\n// 获取最大值\nMath.max(...[14, 3, 77])\n\n// 合并数组\nconst arr1 = ['a', 'b']\nconst arr2 = ['c']\n[...arr1, ...arr2]\n// [ 'a', 'b', 'c']\n\n// 解构赋值（只能放在最后，因为代表了之后的所有参数）\nconst [first, ...rest] = [1, 2, 3, 4, 5]\nfirst // 1\nrest  // [2, 3, 4, 5]\n\n// 分割字符串\n[...'hello']\n// [ \"h\", \"e\", \"l\", \"l\", \"o\" ]\n\n// NodeList 对象实现了 Iterator\nlet nodeList = document.querySelectorAll('div')\nlet array = [...nodeList]\n// [<div>, ...]\n\n// 没有部署 Iterator 接口的类似数组的对象无法转换\nlet arrayLike = {\n    '0': 'a',\n    '1': 'b',\n    '2': 'c',\n    length: 3\n}\n[...arrayLike]\n// TypeError: Cannot spread non-iterable object.\n··\n\n### 数组的空位\n\n数组的某个位置是空元素，即两个逗号之间没有任何值\n数组的空位不影响·length·属性，如果最后一个元素后面有逗号，并不会产生空位\n例如，·Array·构造函数返回的数组都是空位，或使用·delete·删除元素也会形成空位\n\n··js\nArray(3) // [, , ,]\n··\n\n读取空位返回·undefined·，但值是空位和·undefined·不一样，空位某些方法遍历时会跳过，而·undefined·不会\nES5 对空位的处理：\n\n!!\n跳过：·forEach()· ·filter()· ·reduce()· ·every()· ·some()· ·for...in· ·Object.keys·\n循环时跳过但返回结果保留：·map()·\n将空位视为·undefined·再被当成空字符串：·join()· ·toString()·\n!!\n\nES6 则是明确将空位转为·undefined·，除了·copyWithin()·会连空位一起拷贝\n\n## demo\n\n### 快速生成数组\n\n··js\n// 0-9，可根据 index 进行增减\nArray.from(Array(10), (item, index) => index)\n\n// 0-9\n[...Array(10).keys()]\n\n// 数组成员都是 undefined\n[...Array(10)]\n\n// 数组成员都是 ''\nArray(10).fill('')\n\n// 数组成员都是空格\n[...(''.padEnd(10))]\n··\n\n&2019/07/15\n            "}}},o=i,s=e("2877"),l=Object(s["a"])(o,a,t,!1,null,null,null);r["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0e941e.fc46b691.js.map