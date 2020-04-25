<template>
    <article class="pr" @scroll="watchScroll" ref="article">
        <router-view></router-view>
    </article>
</template>

<script>
// article code style, 简化 format regexp
// 换肤，加 $vue
// 补齐所有文章
// canvas
// 兼容移动端
// 对比之前的项目查缺补漏
// demo 合并过来
/* global $$ */
export default {
    data () {
        return {
            scrollTimer: null
        }
    },
    mounted () {
        this.watchScroll()
    },
    methods: {
        // 监听文章滚动响应左边的当前标题
        watchScroll () {
            // 降低滚动触发频率，至少间隔 100ms 再触发
            if (!this.scrollTimer) {
                this.scrollTimer = setTimeout(() => {
                    this.scrollTimer = null
                    const h1Index = this.findIndex($$('h1'))
                    if (h1Index > -1) this.$store.commit('h1Index', h1Index)
                    const h2Index = this.findIndex($$(`article [class^="h2-${h1Index}-"]`))
                    if (h2Index > -1) this.$store.commit('h2Index', h2Index)
                }, 100)
            }
        },
        // 找出当前标题（第一个未被卷去标题的上一个）
        findIndex ($el) {
            for (let i = 0; i < $el.length; i++) {
                if ($el[i].offsetTop > this.$refs.article.scrollTop + 100) {
                    return i && i - 1
                } else if (i === $el.length - 1) {
                    return i // 最后一个标题后面无元素，则卷去即表示当前
                }
            }
            return -1
        }
    }
}
</script>

<style lang="scss" scoped>
article {
    overflow-y: auto;
    padding: 0 50px;
}
article ::v-deep {
    h1 {
        font-size: 24px;
        line-height: 60px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ccc;
        &:not(:first-child) {
            margin-top: 20px;
        }
    }
    h2 {
        font-size: 20px;
        line-height: 40px;
    }
    h1, h2 {
        cursor: pointer;
        transition-duration: 0.2s;
    }
    h3 {
        font-size: 18px;
        text-indent: 2em;
        margin: 20px 0 10px;
    }
    p {
        text-indent: 2em;
        line-height: 30px;
    }
    a:hover {
        text-decoration: underline;
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
