<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# mobile

建设中。。。
            `
        }
    }
}
</script>
