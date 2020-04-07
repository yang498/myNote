<template>
    <article>
        <p>article</p>
    </article>
</template>

<script>
export default {
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
article {
    overflow-y: auto;
}
p {
    height: 3000px;
    background-image: linear-gradient(red, orange, yellow, green, blue);
}
</style>
