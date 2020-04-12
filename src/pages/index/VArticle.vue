<template>
    <article>
        <router-view></router-view>
    </article>
</template>

<script>
// map asideList
// aside css
// article h1-2 scroll
// article css
// article code style, 简化 format regexp
// 换肤，加 $vue
// 补齐所有文章
// 对比之前的项目查缺补漏
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
    padding: 0 50px;
}
article ::v-deep {
    a:hover {
        text-decoration: underline;
    }
    h1 {
        font-size: 24px;
        font-weight: bold;
        padding: 15px 0;
        border-bottom: 1px solid #ccc;
        margin-bottom: 15px;
        cursor: pointer;
        transition: 0.2s;
        &:not(:first-child) {
            margin-top: 20px;
        }
    }
    h2 {
        font-size: 20px;
        margin: 10px 0;
        font-weight: bold;
        transition: 0.2s;
        cursor: pointer;
    }
    h1, h2 {
        &:not(:first-child) {
            margin-top: 20px;
        }
    }
    h3 {
        font-size: 18px;
        margin: 20px 0 10px;
        font-weight: bold;
        text-indent: 2em;
    }
    p {
        text-indent: 2em;
        line-height: 30px;
    }
    b {
        font-weight: bold;
    }
    img {
        width: 100%;
        max-width: 1000px;
        margin: 5px 0 5px 2em;
        &.inline {
            margin: 0 5px;
            vertical-align: text-bottom;
        }
    }
    ul {
        margin: 5px 2em 10px 2em;
        padding: 10px 20px;
        border-left: 10px solid #f80;
        border-radius: 10px;
        background-color: #f9f9f9;
        li {
            line-height: 30px;
            &::before {
                content: '●';
                color: #f80;
                margin-right: 10px;
            }
        }
        .attr {
            padding-left: 2em;
        }
        .head {
            color: #f80;
            font-family: consolas;
            word-break: break-all;
        }
        .type {
            color: #08f;
            font-family: consolas;
        }
        .default {
            color: #0c0;
            font-family: consolas;
        }
    }
    table {
        width: 100%;
        max-width: 1000px;
        border-radius: 5px;
        margin: 10px 0 10px 2em;
        border: 1px solid #ccc;
        overflow: hidden;
        text-align: center;
        thead {
            color: #fff;
            background-color: #25A5F7;
        }
        tr {
            height: 40px;
            &:nth-child(2n) {
                background-color: #eee;
            }
            th:not(:last-child),
            td:not(:last-child) {
                border-right: 1px solid #ccc;
            }
        }
        th {
            padding: 0 20px;
        }
        td {
            padding: 0 20px;
            border-top: 1px solid #ccc;
            &.td-left {
                text-align: left;
            }
        }
    }
    .link {
        font-size: 18px;
        line-height: 30px;
        margin-top: 50px;
        padding-top: 20px;
        border-top: 1px dashed #999;
        .pd {
            display: block;
            margin-left: 2em;
        }
    }
    time {
        display: block;
        text-align: right;
        color: #666;
        margin: 20px 0;
    }
    code {
        color: #ff3860;
        margin: 0 3px;
        padding: 3px 6px;
        border-radius: 3px;
        background-color: #f5f5f5;
        font-family: consolas;
        word-break: break-all;
    }
    span {
        font-family: inherit;
    }
    pre {
        width: 100%;
        line-height: 24px;
        border-radius: 8px;
        font-family: consolas;
        border: 1px solid #ccc;
        background-color: #fafafa;
        overflow-y: hidden;
        padding: 20px 30px;
    }
    .code {
        position: relative;
        padding: 0 2em;
        .copy {
            font-size: 14px;
            padding: 1px 8px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-top-right-radius: 8px;
            border-bottom-left-radius: 8px;
            cursor: pointer;
            transition: 0.2s;
            position: absolute;
            top: 0;
            right: 2rem;
            &:hover {
                background-color: #fafafa;
            }
        }
    }
    .copy-success {
        position: absolute;
        top: 5px;
        right: 0;
        opacity: 0;
        color: #0c0;
        font-size: 18px;
    }
    .copy-success-active {
        animation: copy 1s;
    }
    @keyframes copy {
        80% {
            opacity: 1;
            transform: translateY(-30px);
        }
        100% {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
    #copy-textarea {
        position: fixed;
        left: -9999px;
        opacity: 0;
    }
    pre .copy:hover {
        background-color: #f5f5f5;
    }
    pre .copy:active {
        color: #25A5F7;
    }
    .iframe {
        padding: 10px 2em;
        iframe {
            width: 100%;
            padding: 10px;
            background-color: #f5f9fa;
            border: 1px solid #eaf2f4;
        }
    }
}
</style>
