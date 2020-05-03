<template>
    <div
        class="skin pf w100p"
        :class="skin"
        :style="skin === 'custom' ? `--c: ${custom[0]}; --bgc: ${custom[1]};` : '' ">
        <v-header
            :aside.sync="aside"
            :handle.sync="handle"
            @top="scrollTo(0)"
            @bottom="scrollTo(1)"
        ></v-header>
        <v-menu v-if="$route.path === '/'"></v-menu>
        <main class="flex" v-else>
            <v-aside class="w200 h100p flex-s0" :toggle.sync="aside"></v-aside>
            <v-article class="h100p flex-g1" ref="article"></v-article>
        </main>
        <transition name="el-fade-in">
            <div
                class="shade pf p-t0 p-l0 p-r0 p-b0"
                @click="aside = handle = false"
                v-if="aside || handle"></div>
        </transition>
    </div>
</template>

<script>
export default {
    components: {
        VHeader: () => import('./VHeader'),
        VMenu: () => import('./VMenu'),
        VAside: () => import('./VAside'),
        VArticle: () => import('./VArticle')
    },
    data () {
        return {
            aside: false,
            handle: false
        }
    },
    computed: {
        skin: vm => vm.$store.state.skin,
        custom: vm => vm.$store.state.custom
    },
    methods: {
        scrollTo (top) {
            const $article = this.$refs.article.$el
            $article.scrollTo({ top: top && $article.scrollHeight, behavior: 'smooth' })
        }
    }
}
</script>

<style lang="scss" scoped>
main {
    height: calc(100% - 40px);
}
.shade {
    background-color: rgba(#000, 0.5);
}
</style>
