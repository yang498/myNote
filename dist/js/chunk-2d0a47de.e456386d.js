(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a47de"],{"0756":function(n,e,t){"use strict";t.r(e);var a=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{domProps:{innerHTML:n._s(n.format(n.text))}})},r=[],o={data:function(){return{text:'\n# vue tool\n\n## vuedraggable\n\n本文档记录版本：·2.23.2·\n\n### 说明\n\n适用于 ·Vue.js· 的列表拖拽组件，基于 ·Sortable.js· 封装，所以 ·Sortable.js· 的属性方法也是可用的\n\ngithub：[vuedraggable](https://github.com/SortableJS/Vue.Draggable)，[Sortable.js](https://github.com/SortableJS/Sortable)\n\n安装：\n\n··bash\nnpm i vuedraggable -S\n··\n\n### 常用属性\n\n!!\nvalue {Array}：关联的数据列表，一般和子元素 ·v-for· 绑定的列表相同，使用 ·v-model· 绑定\nlist {Array}：关联的数据列表，一般和子元素 ·v-for· 绑定的列表相同，注意不能和 ·value· 共用\n    和 ·value· 的区别：·value· 使用重新赋值更新数组，·list· 使用 ·splice· 更新数组\ngroup {String/Object}：定义组可关联相同组名称的列表相互拖动\n    String 类型：组名称\n    Object 类型：\n        name {String}：组名称\n        pull {Boolean/String/Array/Function} [true]：\n            Boolean 类型：是否可移动\n            String 类型：可填 ·\'clone\'·，是否将移动改为复制\n            Array 类型：由组名组成的数组，指定哪些组可以克隆过去\n            Function 类型：自定义如何返回以上类型的一种\n        put {Boolean/Array/Function} [true]：\n            Boolean 类型：是否可以从其他列表添加元素过来\n            Array 类型：由组名组成的数组，指定哪些组才可以添加元素过来\n            Function 类型：自定义如何返回以上类型的一种\n        revertClone {Boolean}：移动到另一个列表后，将克隆的元素恢复到初始位置\nclone {Function} [o => o]：在 ·group· 的 ·pull· 中声明克隆后，定义克隆的方式，拖动的对象作为参数\nmove {Function}：拖动时触发的回调，返回 ·false· 可取消拖动操作\n\ntag {String} [div]：·draggable· 组件渲染的实际元素\nsort {Boolean} [true]：列表内部是否可排序\ndisabled {Boolean} [true]：是否禁用拖动\ndraggable {String/Function}：填写元素选择器，指定能拖动的子元素\nfilter {String/Function}：填写元素选择器，指定不能拖动的子元素\nhandle {String}：填写元素选择器，指定子元素中触发拖动的元素\nghostClass {String} [sortable-ghost]：拖动时的占位元素类名\nchosenClass {String} [sortable-chosen]：选中元素的类名\ndragClass {String} [sortable-drag]：跟随鼠标或触摸点的元素类名\nanimation {Number} [0]：过渡动画时间，单位 ms\n!!\n\n### 不常用属性\n\n!!\ncomponentData {Object}：传递给子组件的属性，支持的属性有 ·props attrs on·\ndataIdAttr {String}：给拖拽容器设置 ·data-id·\npreventOnFilter {Boolean} [true]：当拖动筛选过的元素时调用 ·event.preventDefault()·\n\neasing {String}：过渡动画曲线，支持贝塞尔曲线\ndelay {Number} [0]：排序延迟时间，单位 ms\ndelayOnTouchOnly {Boolean} [false]：是否在移动设备触发触摸事件时才会延迟\ntouchStartThreshold {Number} [0]：至少拖动多少像素才可以取消延迟的拖动事件\n    建议设置 3~5（某些移动设备即使按着不动也会触发 ·touchmove· 事件导致排序不触发）\n\nswapThreshold {Number} [1]：交换区域的阈值，取值范围在 0~1，[示例参考](https://sortablejs.github.io/Sortable/#thresholds)\ninvertSwap {Boolean} [false]：反将交换区域，以实现对中间项进行排序的效果\ninvertedSwapThreshold {Number}：反向交换区域的阈值，默认和 ·swapThreshold· 的值相同\ndirection {String}：可排序的方向，如果没有设定则自动检测\n\nforceFallback {Boolean} [false]：是否不使用 HTML5 拖放\nfallbackClass {String} [sortable-fallback]：·forceFallback· 设为 ·true·时克隆的 DOM 元素类名\nfallbackOnBody {Boolean} [false]：是否将克隆的 DOM 元素添加到 body 元素内\nfallbackTolerance {Number}：鼠标或触摸点至少移动多少距离才产生拖动，建议设置 3~5，单位 px\n\ndragoverBubble {Boolean} [false]：触发 ·dragover· 事件时是否将事件冒泡到父元素\nremoveCloneOnHide {Boolean} [true]：是否将克隆元素隐藏的方式由设置 ·display: none· 改为删除\nemptyInsertThreshold {Number}：鼠标或触摸点至少移动距离才可以拖动元素到空的容器内，单位 px\n\nstore {Object/Null} [null]：保存和恢复\n!!\n\n注意：draggable 组件内的元素除了插槽，必须是属于关联的数据列表，否则会造成顺序错误\n\n建议：在使用带有动画的嵌套排序时，将 ·fallbackOnBody· 设为 ·true·，并且将 ·invertSwap· 设置为 ·true· 或 ·swapThreshold· 设为低于 1（例如 0.65）\n\n### 事件\n\n!!\nstart：拖动开始\nend：拖动结束\nchoose：选中元素\nunchoose：释放元素\nupdate：列表内更改排序\nadd：从其他列表添加元素过来\nremove：元素从列表中删除移动到另一个列表\nsort：列表触发 ·update add remove· 时\nchange：列表触发 ·update add remove· 时\nfilter：尝试拖动筛选过的元素时\nclone：克隆元素\n!!\n\n### 插槽\n\n!!\nheader：头部元素，渲染在默认插槽之前\nfooter：底部元素，渲染在默认插槽之后\n!!\n  \n注意：使用插槽要定义 ·draggable· 属性指定可拖动元素，否则拖动插槽会提示错误\n\n提示：插槽元素不参与拖动，如果定义了 ·transition-group· 也不参与过渡\n\n### 插件\n\n[MultiDrag 批量移动](https://github.com/SortableJS/Sortable/tree/master/plugins/MultiDrag)\n\n!!\nmultiDrag {Boolean} [false]：是否开启多选批量移动，默认点击多选\nmultiDragKey {String}：点击多选前需按住的键，例如 ·\'ctrl\'· 表示按住 ctrl 键时点击多选\n!!\n\n[Swap 排序改交换](https://github.com/SortableJS/Sortable/tree/master/plugins/Swap)\n\n!!\nswap {Boolean} [false]：是否开启交换模式\nswapClass {String} [sortable-swap-highlight]：交换项的类名\n!!\n\n### 示例\n\n··html\n<draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">\n   <div v-for="element in myArray" :key="element.id">{{element.name}}</div>\n</draggable>\n··\n\n··js\nimport draggable from \'vuedraggable\'\nexport default {\n    components: { draggable }\n}\n··\n\n使用 ·transition-group·：\n\n··html\n<draggable v-model="myArray">\n    <transition-group>\n        <div v-for="element in myArray" :key="element.id">\n            {{element.name}}\n        </div>\n    </transition-group>\n</draggable>\n··\n\n使用 ·Vuex· 的数据作为列表：\n\n··html\n<draggable v-model=\'myList\'>\n··\n\n··js\nexport default {\n    computed: {\n        myList: {\n            get () {\n                return this.$store.state.myList\n            },\n            set (value) {\n                this.$store.commit(\'updateList\', value)\n            }\n        }\n    }\n}\n··\n\n&2020/06/27\n            '}}},l=o,s=t("2877"),i=Object(s["a"])(l,a,r,!1,null,null,null);e["default"]=i.exports}}]);
//# sourceMappingURL=chunk-2d0a47de.e456386d.js.map