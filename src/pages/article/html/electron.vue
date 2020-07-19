<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# electron

建设中。。。
            `
        }
    }
}
</script>
