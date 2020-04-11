<template>
    <header class="h40 lh40 tc c-white flex flex-xsb">
        <!-- aside 收缩菜单触发按钮 -->
        <icon-menu :active.sync="asideToggle"></icon-menu>

        <!-- 左边的目录 -->
        <ul class="menu flex">
        <!-- 一级目录 -->
            <li class="w100 lh40 td2 cp el-icon-s-home" :class="{ active: isHome }" @click="$router.push('/')"></li>
            <li
                class="w100 lh40 td2 cp pr"
                :class="{ active: menuActive[0] === parentIndex }"
                v-for="(parentItem, parentIndex) in menuList"
                :key="parentIndex"
            >
                <span>{{parentItem.name}}</span>
                <ul class="of td2 pa p-l0 p-r0">
                    <li
                        class="lh40 td2"
                        :class="{ active: menuActive[0] === parentIndex && menuActive[1] === index }"
                        v-for="(item, index) in parentItem.list"
                        :key="index"
                        @click="$router.push(item.path)"
                    >{{item.name}}</li>
                </ul>
            </li>
        </ul>

        <!-- 右边的菜单 :class="['option', optionToggle ? 'active' : '' ]" -->
        <div class="handle flex" @click="hideOption">
            <!-- 皮肤 -->
            <i class="w60 lh40 el-icon-magic-stick"></i>
            <!-- 搜索框 -->
            <a class="w60 lh40" href="https://github.com/yang498/note" target="_blank"><icon-git></icon-git></a>
            <!-- 回到顶部 -->
            <i class="w60 lh40 el-icon-top" @click="$emit('top')"></i>
            <!-- 回到底部 -->
            <i class="w60 lh40 el-icon-bottom" @click="$emit('bottom')"></i>
        </div>

        <!-- 右边的菜单收缩触发按钮 -->
        <icon-menu :active.sync="optionToggle"></icon-menu>
    </header>
</template>

<script>
export default {
    components: {
        IconGit: () => import('../components/IconGit'),
        IconMenu: () => import('../components/IconMenu')
    },
    data () {
        return {
            isHome: false, // 切换目录和文章
            menuActive: [-1, -1], // 当前菜单
            asideToggle: false, // aside 切换
            optionToggle: false // 顶部右侧菜单切换
        }
    },
    mounted () {},
    methods: {
        // 移动设备上收缩右侧菜单
        hideOption () {
            if (this.optionToggle) this.optionToggle = false
        }
    }
}
</script>

<style lang="scss" scoped>
.menu {
    ul {
        top: 100%;
        border-radius: 0 0 4px 4px;
        height: 0;
        opacity: 0;
    }
    & > li:hover ul {
        height: auto;
        opacity: 1;
    }
}
.handle a { padding-top: 8px; }
</style>
