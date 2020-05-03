<template>
    <!-- 头部 -->
    <header class="h40 lh40 tc c-white flex flex-xsb pr z1">
        <!-- 移动端 aside 切换按钮 -->
        <icon-menu class="aside-toggle" :active.sync="asideToggle" v-if="$route.path !== '/'"></icon-menu>

        <!-- 目录 -->
        <menu-list class="menu flex" li1-class="w100 lh40 td2 cp pr" ul-class="of td2 pa p-l0 p-r0" li2-class="lh40 td2">
            <li
                class="w100 lh40 td2 cp el-icon-s-home"
                :class="{ left: $route.path === '/' }"
                @click="$router.push('/'), asideToggle = false"
            ></li>
        </menu-list>

        <!-- 工具 -->
        <div class="handle flex td3 of" :class="{ active: handleToggle }" @click="handleToggle = false">
            <!-- 皮肤 -->
            <i class="w60 lh40 cp el-icon-magic-stick" title="切换皮肤" @click="visible = true"></i>
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
            <ul class="flex flex-xc">
                <li class="br4 td2">
                    <div class="lh40">主色</div>
                    <div class="lh40">次色</div>
                </li>
                <li
                    class="br4 td2 cp"
                    :class="{ active: skin === item.name }"
                    v-for="(item, index) in skinList"
                    :key="index"
                    @click="skin = item.name"
                >
                    <div class="w40 h40 br4" :style="{backgroundColor: item.color[0]}"></div>
                    <div class="w40 h40 br4" :style="{backgroundColor: item.color[1]}"></div>
                </li>
                <li class="br4 td2 cp" :class="{ active: skin === 'custom' }" @click="skin = 'custom'">
                    <el-color-picker class="block" v-model="color" show-alpha></el-color-picker>
                    <el-color-picker class="block" v-model="bgColor" show-alpha></el-color-picker>
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
            color: this.$store.state.custom[0],
            bgColor: this.$store.state.custom[1],
            skin: this.$store.state.skin,
            skinList: [
                { name: 'blue', color: ['#00B4FA', '#08f'] },
                { name: 'green', color: ['#42B983', '#393'] }
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
                    this.$message('请选择主色')
                } else if (!this.bgColor) {
                    this.$message('请选择次色')
                } else {
                    this.$store.commit('skin', this.skin)
                    this.$store.commit('custom', [this.color, this.bgColor])
                    this.visible = false
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.left { transform: translateX(-100%); }
.menu ::v-deep {
    ul { height: 0; opacity: 0; border-radius: 0 0 4px 4px; }
    li:hover ul { height: auto; opacity: 1; }
}
.handle a { padding-top: 8px; }
.el-dialog ul {
    padding: 0 50px;
    li {
        margin: 0 20px;
        padding: 20px;
        border: 1px solid #fff;
        &.active {
            border-color: #ccc;
        }
        &:not(:first-child):hover {
            box-shadow: 0 2px 8px rgba(#000, 0.5)
        }
        & > div + div {
            margin-top: 20px;
        }
    }
}
</style>
