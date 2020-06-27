<template>
    <!-- 头部 -->
    <header class="h40 lh40 tc c-white flex flex-xsb pr z2">
        <!-- 移动端 aside 切换按钮 -->
        <icon-menu class="aside-toggle" :active.sync="asideToggle" v-if="$route.path !== '/'"></icon-menu>

        <!-- 目录 -->
        <menu-list class="menu flex" li1-class="w100 lh40 td2 cp pr" ul-class="of td2 pa p-l0 p-r0" li2-class="lh40 td2">
            <li class="w100 lh40 td2 cp" :class="{ left: $route.path === '/' }">
                <div class="w100 lh40 el-icon-s-home" @click="$router.push('/'), asideToggle = false"></div>
            </li>
        </menu-list>

        <!-- 工具 -->
        <div class="handle flex td3 of" :class="{ active: handleToggle }" @click="handleToggle = false">
            <!-- 皮肤 -->
            <i class="w60 lh40 cp el-icon-magic-stick" @click="visible = true"></i>
            <!-- github -->
            <a class="w60 lh40" href="https://github.com/yang498/note" target="_blank"><icon-git></icon-git></a>
            <!-- 回到顶部 -->
            <i class="w60 lh40 cp el-icon-top" @click="$emit('top')"></i>
            <!-- 回到底部 -->
            <i class="w60 lh40 cp el-icon-bottom" @click="$emit('bottom')"></i>
        </div>

        <!-- 移动端工具切换按钮 -->
        <icon-menu class="handle-toggle" :active.sync="handleToggle"></icon-menu>

        <!-- 切换皮肤 -->
        <el-dialog title="切换皮肤" :visible.sync="visible" append-to-body>
            <ul class="tc">
                <li
                    class="c-white h40 lh30 br4 td2 cp"
                    :class="{ active: skin === item.name }"
                    :style="{backgroundColor: item.color}"
                    v-for="(item, index) in skinList"
                    :key="index"
                    @click="skin = item.name"
                >{{item.title}}</li>
                <li class="br4 td2 cp flex" :class="{ active: skin === 'custom' }" @click="skin = 'custom'">
                    <el-color-picker v-model="color"></el-color-picker>
                    <div class="custom c-white flex-g1 lh40 br4" :style="{backgroundColor: color}">自定义</div>
                </li>
            </ul>
            <template slot="footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="skinSwitch">确 定</el-button>
            </template>
        </el-dialog>
    </header>
</template>

<script>
export default {
    components: {
        MenuList: () => import('../components/MenuList'),
        IconGit: () => import('../components/IconGit'),
        IconMenu: () => import('../components/IconMenu')
    },
    props: {
        aside: { type: Boolean, default: false },
        handle: { type: Boolean, default: false }
    },
    data () {
        return {
            visible: false,
            color: this.$store.state.custom,
            skin: this.$store.state.skin,
            skinList: [
                { title: 'gulp', name: 'red', color: '#CF4647' },
                { title: 'grunt', name: 'orange', color: '#E48632' },
                { title: 'es6', name: 'yellow', color: '#FBDE34' },
                { title: 'vue', name: 'green', color: '#42B983' },
                { title: 'weex', name: 'blue', color: '#00B4FA' },
                { title: 'bootstrap', name: 'purple', color: '#7952b3' },
                { title: 'sass', name: 'pink', color: '#CC6699' }
            ]
        }
    },
    computed: {
        asideToggle: {
            get () {
                return this.aside
            },
            set (toggle) {
                this.$emit('update:aside', toggle)
            }
        },
        handleToggle: {
            get () {
                return this.handle
            },
            set (toggle) {
                this.$emit('update:handle', toggle)
            }
        }
    },
    methods: {
        skinSwitch () {
            if (this.skin !== 'custom') {
                this.$store.commit('skin', this.skin)
                this.visible = false
            } else {
                if (!this.color) {
                    this.$message('请选择颜色')
                } else {
                    this.$store.commit('skin', this.skin)
                    this.$store.commit('custom', this.color)
                    this.visible = false
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.left { margin-left: -100px; }
.menu ::v-deep {
    ul { height: 0; opacity: 0; border-radius: 0 0 4px 4px; }
    li:hover ul { height: auto; opacity: 1; }
}
.handle a { padding-top: 8px; }
.el-dialog ul {
    padding: 0 50px;
    li {
        border: 5px solid transparent;
        &:not(:first-child) {
            margin-top: 10px;
        }
        &.active {
            border-color: #fff;
        }
        &:hover, &.active {
            box-shadow: 0 2px 8px rgba(#000, 0.5)
        }
        .custom {
            margin-left: 5px;
            text-shadow: 0 0 2px #000;
        }
    }
}
</style>
