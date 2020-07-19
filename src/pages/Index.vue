<template>
    <div
        class="skin pf w100p"
        :class="skin"
        :style="skin === 'custom' ? `--c: ${custom};` : '' ">
        <v-header
            :aside.sync="aside"
            :handle.sync="handle"
            @top="scrollTo('top')"
            @bottom="scrollTo('bottom')"
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
let timer = null
export default {
    components: {
        VHeader: () => import('./index/VHeader'),
        VMenu: () => import('./index/VMenu'),
        VAside: () => import('./index/VAside'),
        VArticle: () => import('./index/VArticle')
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
        scrollTo (position) {
            if (timer) clearInterval(timer)
            const $article = this.$refs.article.$el
            const topHeight = $article.scrollHeight - $article.offsetHeight
            const methods = {
                top () {
                    const speed = Math.ceil($article.scrollTop / 5)
                    $article.scrollTop -= speed
                    if (!$article.scrollTop) clearInterval(timer)
                },
                bottom () {
                    const speed = Math.ceil((topHeight - $article.scrollTop) / 5)
                    $article.scrollTop += speed
                    if (topHeight - $article.scrollTop < 1) clearInterval(timer)
                }
            }
            timer = setInterval(methods[position], 20)
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
