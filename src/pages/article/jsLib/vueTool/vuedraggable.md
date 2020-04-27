# vuedraggable

本文档记录版本：`2.23.2`

## 说明

适用于 `Vue.js` 的列表拖拽组件，基于 `Sortable.js` 封装，所以 `Sortable.js` 的属性方法也是可用的

github：[vuedraggable](https://github.com/SortableJS/Vue.Draggable)，[Sortable.js](https://github.com/SortableJS/Sortable)

安装：

```bash
npm i vuedraggable -S
```

## 常用属性

- `value` {Array}：关联的数据列表，一般和子元素 `v-for` 绑定的列表相同，使用 `v-model` 绑定
- `list` {Array}：关联的数据列表，一般和子元素 `v-for` 绑定的列表相同，注意不能和 `value` 共用
  - 和 `value` 的区别：`value` 使用重新赋值更新数组，`list` 使用 `splice` 更新数组，所以 `list` 适用于当数组不好变更时，例如来自 `props` 的数组
- `group` {String/Object}：定义组可关联相同组名称的列表相互拖动
  - String 类型：组名称
  - Object 类型：
    - `name` {String}：组名称
    - `pull` {Boolean/String/Array/Function} [true]：
      - Boolean 类型：是否可移动
      - String 类型：可填 `'clone'`，是否将移动改为复制
      - Array 类型：由组名组成的数组，指定哪些组可以克隆过去
      - Function 类型：自定义如何返回以上类型的一种
    - `put` {Boolean/Array/Function} [true]：
      - Boolean 类型：是否可以从其他列表添加元素过来
      - Array 类型：由组名组成的数组，指定哪些组才可以添加元素过来
      - Function 类型：自定义如何返回以上类型的一种
    - `revertClone` {Boolean}：移动到另一个列表后，将克隆的元素恢复到初始位置
- `clone` {Function} [o => o]：在 `group` 的 `pull` 中声明克隆后，定义克隆的方式，拖动的对象作为参数，默认返回原数据
- `move` {Function}：拖动时触发的回调，返回 `false` 可取消拖动操作

- `tag` {String} [div]：`draggable` 组件渲染的实际元素
- `sort` {Boolean} [true]：列表内部是否可排序
- `disabled` {Boolean} [true]：是否禁用拖动
- `draggable` {String/Function}：填写元素选择器，指定能拖动的子元素
- `filter` {String/Function}：填写元素选择器，指定不能拖动的子元素
- `handle` {String}：填写元素选择器，指定子元素中触发拖动的元素
- `ghostClass` {String} [sortable-ghost]：拖动时的占位元素类名
- `chosenClass` {String} [sortable-chosen]：选中元素的类名
- `dragClass` {String} [sortable-drag]：跟随鼠标或触摸点的元素类名
- `animation` {Number} [0]：过渡动画时间，单位 ms

## 不常用属性

- `componentData` {Object}：传递给子组件的属性，支持的属性有 `props attrs on`
- `dataIdAttr` {String}：给拖拽容器设置 `data-id`
- `preventOnFilter` {Boolean} [true]：当拖动筛选过的元素时调用 `event.preventDefault()`

- `easing` {String}：过渡动画曲线，支持贝塞尔曲线
- `delay` {Number} [0]：排序延迟时间，单位 ms
- `delayOnTouchOnly` {Boolean} [false]：是否在移动设备触发触摸事件时才会延迟
- `touchStartThreshold` {Number} [0]：至少拖动多少像素才可以取消延迟的拖动事件，建议设置 3~5（某些移动设备即使按着不动也会触发 `touchmove` 事件导致排序不触发）

- `swapThreshold` {Number} [1]：交换区域的阈值，取值范围在 0~1，[示例参考](https://sortablejs.github.io/Sortable/#thresholds)
- `invertSwap` {Boolean} [false]：反将交换区域，以实现对中间项进行排序的效果
- `invertedSwapThreshold` {Number}：反向交换区域的阈值，默认和 `swapThreshold` 的值相同
- `direction` {String}：可排序的方向，如果没有设定则自动检测

- `forceFallback` {Boolean} [false]：是否不使用 HTML5 拖放
- `fallbackClass` {String} [sortable-fallback]：`forceFallback` 设为 `true`时克隆的 DOM 元素类名
- `fallbackOnBody` {Boolean} [false]：是否将克隆的 DOM 元素添加到 body 元素内
- `fallbackTolerance` {Number}：鼠标或触摸点至少移动多少距离才产生拖动，建议设置 3~5，单位 px

- `dragoverBubble` {Boolean} [false]：触发 `dragover` 事件时是否将事件冒泡到父元素
- `removeCloneOnHide` {Boolean} [true]：是否将克隆元素隐藏的方式由设置 `display: none` 改为删除
- `emptyInsertThreshold` {Number}：鼠标或触摸点至少移动距离才可以拖动元素到空的容器内，单位 px

- `store` {Object/Null} [null]：保存和恢复

注意：draggable 组件内的元素除了插槽，必须是属于关联的数据列表，否则会造成顺序错误

建议：在使用带有动画的嵌套排序时，将 `fallbackOnBody` 设为 `true`，并且将 `invertSwap` 设置为 `true` 或 `swapThreshold` 设为低于 1（例如 0.65）

## 事件

- `start`：拖动开始
- `end`：拖动结束
- `choose`：选中元素
- `unchoose`：释放元素
- `update`：列表内更改排序
- `add`：从其他列表添加元素过来
- `remove`：元素从列表中删除移动到另一个列表
- `sort`：列表触发 `update add remove` 时
- `change`：列表触发 `update add remove` 时
- `filter`：尝试拖动筛选过的元素时
- `clone`：克隆元素

## 插槽

- `header`：头部元素，渲染在默认插槽之前
- `footer`：底部元素，渲染在默认插槽之后
  
注意：使用插槽要定义 `draggable` 属性指定可拖动元素，否则拖动插槽会提示错误

提示：插槽元素不参与拖动，如果定义了 `transition-group` 也不参与过渡

## 插件

[MultiDrag 批量移动](https://github.com/SortableJS/Sortable/tree/master/plugins/MultiDrag)

- `multiDrag` {Boolean} [false]：是否开启多选批量移动，默认点击多选
- `multiDragKey` {String}：点击多选前需按住的键，例如 `'ctrl'` 表示按住 ctrl 键时点击多选

[Swap 排序改交换](https://github.com/SortableJS/Sortable/tree/master/plugins/Swap)

- `swap` {Boolean} [false]：是否开启交换模式
- `swapClass` {String} [sortable-swap-highlight]：交换项的类名

## 示例

```html
<draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
   <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
</draggable>
```

```js
import draggable from 'vuedraggable'
export default {
    components: { draggable }
}
```

使用 `transition-group`：

```html
<draggable v-model="myArray">
    <transition-group>
        <div v-for="element in myArray" :key="element.id">
            {{element.name}}
        </div>
    </transition-group>
</draggable>
```

使用 `Vuex` 的数据作为列表：

```html
<draggable v-model='myList'>
```

```js
export default {
    computed: {
        myList: {
            get () {
                return this.$store.state.myList
            },
            set (value) {
                this.$store.commit('updateList', value)
            }
        }
    }
}
```
