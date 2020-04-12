<template>
    <!-- 头部 -->
    <header class="h40 lh40 tc c-white flex flex-xsb">
        <!-- 移动端 aside 切换按钮 -->
        <icon-menu :active.sync="asideToggle"></icon-menu>
        <!-- 目录 -->
        <menu-list class="menu flex" li1-class="w100 lh40 td2 cp pr" ul-class="of td2 pa p-l0 p-r0" li2-class="lh40 td2">
            <li class="w100 lh40 td2 cp el-icon-s-home" :class="{ active: isHome }" @click="$router.push('/')"></li>
        </menu-list>
        <!-- 工具 -->
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
        <!-- 移动端工具切换按钮 -->
        <icon-menu :active.sync="optionToggle"></icon-menu>
    </header>
</template>

<script>
export default {
    components: {
        MenuList: () => import('../components/MenuList'),
        IconGit: () => import('../components/IconGit'),
        IconMenu: () => import('../components/IconMenu')
    },
    data () {
        return {
            isHome: false, // 切换目录和文章
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
.menu ::v-deep {
    ul { height: 0; opacity: 0; border-radius: 0 0 4px 4px; }
    li:hover ul { height: auto; opacity: 1; }
}
.handle a { padding-top: 8px; }
</style>
