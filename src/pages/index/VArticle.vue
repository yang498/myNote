<template>
    <article class="ofy pr" @scroll="watchScroll" ref="article">
        <router-view class="content"></router-view>
    </article>
</template>

<script>
/* global $$ */
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css' // 代码块主题：https://highlightjs.org/static/demo
export default {
    data () {
        return {
            scrollTimer: null
        }
    },
    computed: {
        h2List: vm => vm.$store.state.h2List
    },
    watch: {
        h2List () {
            this.$nextTick(() => {
                $$('pre code').forEach(block => hljs.highlightBlock(block))
            })
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
                    const h2Index = this.findIndex($$('h2'))
                    if (h2Index > -1) this.$store.commit('h2Index', h2Index)
                    const h3Index = this.findIndex($$(`article [class^="h3-${h2Index}-"]`))
                    if (h3Index > -1) this.$store.commit('h3Index', h3Index)
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

<style lang="scss">
article {
    padding: 0 50px;
    .content {
        max-width: 1000px;
        margin: 0 auto;
        & > :not(h1):not(h2):not(h3):not(h4):not(p) {
            margin: 10px 2em;
        }
    }
    h1 {
        font-size: 30px;
        padding-top: 15px;
        margin-bottom: 20px;
    }
    h2 {
        font-size: 24px;
        line-height: 60px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ccc;
        &:not(:first-child) {
            margin-top: 20px;
        }
    }
    h3 {
        font-size: 20px;
        line-height: 40px;
        margin: 20px 0 10px;
        & + h4 {
            margin-top: 0;
        }
    }
    h2, h3 {
        cursor: pointer;
        transition-duration: 0.2s;
    }
    h4 {
        font-size: 18px;
        margin: 20px 2em 10px;
    }
    p {
        padding: 0 2em;
        line-height: 30px;
    }
    a:hover {
        text-decoration: underline;
    }
    img {
        vertical-align: text-bottom;
        &:only-child {
            width: 100%;
        }
    }
    ul {
        padding: 5px 10px;
        border-left: 10px solid var(--c);
        border-radius: 8px;
        background-color: #f9f9f9;
        li {
            line-height: 30px;
            &::before {
                content: '●';
                color: var(--c);
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
            color: #42B983;
            font-family: consolas;
        }
    }
    .table {
        border-radius: 8px;
        border: 1px solid #ccc;
        overflow: hidden;
        table {
            width: 100%;
            thead {
                color: #fff;
                background-color: var(--c);
            }
            tr {
                &:nth-child(2n) {
                    background-color: #eee;
                }
                th:not(:last-child), td:not(:last-child) {
                    border-right: 1px solid #ccc;
                }
            }
            td {
                border-top: 1px solid #ccc;
                &.center {
                    text-align: center;
                }
                &.right {
                    text-align: right;
                }
            }
            th, td {
                padding: 10px 20px;
            }
        }
    }
    code:not(.hljs) {
        color: #ff3860;
        margin: 0 3px;
        padding: 3px 6px;
        border-radius: 2px;
        background-color: #f5f5f5;
        font-family: consolas;
        word-break: break-all;
    }
    .code {
        position: relative;
        pre code {
            font-family: consolas;
            line-height: 24px;
            border-radius: 8px;
            padding: 10px 15px !important;
        }
        .copy {
            font-size: 14px;
            padding: 5px 10px;
            border-top-right-radius: 8px;
            border-bottom-left-radius: 8px;
            border: 1px solid #fff;
            color: #fff;
            cursor: pointer;
            transition-duration: 0.2s;
            position: absolute;
            top: 0;
            right: 0;
            margin: -1px;
        }
    }
    #copy {
        position: fixed;
        left: -9999px;
        opacity: 0;
    }
    iframe {
        width: 100%;
        padding: 10px;
        background-color: #f5f9fa;
        border: 1px solid #eaf2f4;
    }
    .link {
        font-size: 18px;
        line-height: 30px;
        margin-top: 50px !important;
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
        padding: 20px 0;
    }
}
</style>
