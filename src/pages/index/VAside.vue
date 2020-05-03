<template>
    <aside class="bg-white td3 z1" :class="{ active: asideToggle }" ref="aside">
        <ul class="h2">
            <li
                class="h30 lh30 br4 cp td2"
                :class="{ active: h2Index === index }"
                v-for="(item, index) of h2List"
                :key="index"
                @click="h2(index)"
            >{{item}}</li>
        </ul>
        <ul class="h3 ofy" :style="{ height: h3Height + 'px' }">
            <li
                class="h30 lh30 br4 cp td2"
                :class="{ active: h3Index === index }"
                v-for="(item, index) of h3List[h2Index]"
                :key="index"
                @click="h3(index)"
            >{{item}}</li>
        </ul>
    </aside>
</template>

<script>
/* global $, $$ */
export default {
    props: {
        toggle: { type: Boolean, default: false }
    },
    data () {
        return {
            h3Height: 0
        }
    },
    computed: {
        h2List: vm => vm.$store.state.h2List,
        h3List: vm => vm.$store.state.h3List,
        h2Index: vm => vm.$store.state.h2Index,
        h3Index: vm => vm.$store.state.h3Index,
        asideToggle: {
            get () {
                return this.toggle
            },
            set (toggle) {
                this.$emit('update:toggle', toggle)
            }
        }
    },
    watch: {
        h2List () {
            this.h3Height = this.$refs.aside.offsetHeight - 20 - this.h2List.length * 30 - 20
        }
    },
    methods: {
        h2 (index) {
            this.$store.commit('h2Index', index)
            this.$store.commit('h3Index', 0)
            $$('article h2')[index].click()
            this.asideToggle = false
        },
        h3 (index) {
            this.$store.commit('h3Index', index)
            $(`article .h3-${this.h2Index}-${index}`).click()
            this.asideToggle = false
        }
    }
}
</script>

<style lang="scss" scoped>
aside {
    padding: 10px 20px;
    border-right: 1px solid #ccc;
    .h2 {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
    }
    .h3 {
        font-size: 14px;
        li {
            padding-right: 0;
        }
    }
    li {
        padding: 0 10px;
    }
}
</style>
