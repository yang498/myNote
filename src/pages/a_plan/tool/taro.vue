<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# taro

## 建设中

@@
[微信公众号 - 京东Taro框架深度实践](https://mp.weixin.qq.com/s/5YOJtUkoPSg6Y9SpKg-1-g)
@@
`
        }
    }
}
</script>
