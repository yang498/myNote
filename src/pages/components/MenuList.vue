<template>
    <ul>
        <slot></slot>
        <li
            :class="[li1Class, { active: menuActive[0] === parentIndex }]"
            v-for="(parentItem, parentIndex) in list"
            :key="parentIndex"
        >
            <div :class="li11Class">{{parentItem.name}}</div>
            <ul :class="ulClass">
                <li
                    :class="[
                        li2Class,
                        { active: menuActive[0] === parentIndex && menuActive[1] === index },
                        { underway: item.progress === 50 },
                        { complete: item.progress === 100 }
                    ]"
                    v-for="(item, index) in parentItem.list"
                    :key="index"
                    @click="$router.push(item.path)"
                >{{item.name}}</li>
            </ul>
        </li>
    </ul>
</template>

<script>
import list from 'A/js/menuList'
export default {
    props: {
        li1Class: { type: String, default: '' },
        li11Class: { type: String, default: '' },
        ulClass: { type: String, default: '' },
        li2Class: { type: String, default: '' }
    },
    data () {
        return {
            list,
            menuActive: [-1, -1] // 当前目录
        }
    }
}
</script>
