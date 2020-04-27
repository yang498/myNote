<template>
    <div v-html="format(text)"></div>
</template>

<script>
// import vuedraggable from './vuedraggable.md'
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText)
    }
}
xhr.open('GET', 'vuedraggable.md')
xhr.send()
export default {
    data () {
        return {
            text: ''
        }
    }
}
</script>
