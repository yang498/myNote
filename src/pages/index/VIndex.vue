<template>
    <div class="pf" :class="$store.state.skin">
        <v-header @top="scrollTo(0)" @bottom="scrollTo(1)"></v-header>
        <v-menu v-if="$route.name === 'index'"></v-menu>
        <main class="flex" v-else>
            <v-aside class="w200 h100p flex-s0"></v-aside>
            <v-article class="h100p flex-g1" ref="article"></v-article>
        </main>
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
        return {}
    },
    mounted () {},
    methods: {
        // 回到顶部或底部
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
</style>
