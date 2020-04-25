<template>
    <!-- :class="asideToggle?'active':''" -->
    <aside class="td2" ref="aside">
        <ul class="h1">
            <li
                class="h30 lh30 br4 cp td2"
                :class="{ active: h1Index === index }"
                v-for="(item, index) of h1List"
                :key="index"
                @click="h1(index)"
            >{{item}}</li>
        </ul>
        <ul class="h2" :style="{ height: h2Height + 'px' }">
            <li
                class="h30 lh30 br4 cp td2"
                :class="{ active: h2Index === index }"
                v-for="(item, index) of h2List[h1Index]"
                :key="index"
                @click="h2(index)"
            >{{item}}</li>
        </ul>
    </aside>
</template>

<script>
/* global $, $$ */
export default {
    data () {
        return {
            h2Height: 0
        }
    },
    computed: {
        h1List: vm => vm.$store.state.h1List,
        h2List: vm => vm.$store.state.h2List,
        h1Index: vm => vm.$store.state.h1Index,
        h2Index: vm => vm.$store.state.h2Index
    },
    watch: {
        // h1 改变后计算 h2 的高度以适合滚动
        h1List () {
            this.h2Height = this.$refs.aside.offsetHeight - 20 - this.h1List.length * 30 - 20
        }
    },
    methods: {
        h1 (index) {
            this.$store.commit('h1Index', index)
            this.$store.commit('h2Index', 0)
            $$('article h1')[index].click()
            // if (this.asideToggle) this.asideToggle = false // 移动设备上收缩菜单
        },
        h2 (index) {
            this.$store.commit('h2Index', index)
            $(`article .h2-${this.h1Index}-${index}`).click()
            // if (this.asideToggle) this.asideToggle = false // 移动设备上收缩菜单
        }
    }
}
</script>

<style lang="scss" scoped>
aside {
    padding: 10px 20px;
    border-right: 1px solid #ccc;
    .h1 {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
    }
    .h2 {
        font-size: 14px;
        overflow-y: auto;
        li {
            padding-right: 0;
        }
    }
    li {
        padding: 0 10px;
    }
}
</style>
