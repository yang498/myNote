<template>
    <div v-html="format(text)"></div>
</template>

<script>
export default {
    data () {
        return {
            text: `
# 其他

## GraphQL

## REST

## APIJSON

## gRPC-Web

## Redux

## Koala
`
        }
    }
}
</script>
