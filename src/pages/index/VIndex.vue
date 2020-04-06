<template>
    <div class="skin-blue">
        <v-header></v-header>
        <main class="flex">
            <v-menu></v-menu>
            <v-aside></v-aside>
            <v-article></v-article>
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
        init () {}
    }
}
</script>

<style lang="scss" scoped>

</style>
