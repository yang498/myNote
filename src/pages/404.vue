<template>
    <div class="tc skin" :class="$store.state.skin">
        <v-header></v-header>
        <h1>404</h1>
    </div>
</template>

<script>
export default {
    components: {
        VHeader: () => import('@/pages/index/VHeader')
    }
}
</script>

<style lang="scss" scoped>
h1 {
    font-size: 100px;
    margin-top: 100px;
}
</style>
