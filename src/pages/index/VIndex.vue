<template>
    <div class="skin skin-blue">
        <v-header @top="scrollTo(0)" @bottom="scrollTo(1)"></v-header>
        <main class="flex">
            <v-menu v-if="false"></v-menu>
            <v-aside class="h100p"></v-aside>
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
            const $el = this.$refs.article.$el
            $el.scrollTo({ top: top && $el.scrollHeight, behavior: 'smooth' })
        }
    }
}
</script>

<style lang="scss" scoped>
main {
    height: calc(100% - 40px);
    aside {
        width: 200px;
    }
}
</style>
